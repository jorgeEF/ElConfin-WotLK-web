import { db } from '../../config/db.js';
import crypto from 'crypto';

// Función para generar salt (32 bytes aleatorios)
function generateSalt() {
  return crypto.randomBytes(32);  // Genera un salt de 32 bytes aleatorios
}

// Función para calcular h1 (SHA1 de "USERNAME:PASSWORD" en mayúsculas)
function calculateH1(username, password) {
  const h1Input = `${username.toUpperCase()}:${password.toUpperCase()}`;
  return crypto.createHash('sha1').update(h1Input).digest();
}

// Función para calcular h2 (SHA1 de salt || h1)
function calculateH2(salt, h1) {
  return crypto.createHash('sha1').update(Buffer.concat([salt, h1])).digest();
}

// Función para calcular el verifier usando exponentiación modular
function calculateVerifier(salt, h1) {
  const h2 = calculateH2(salt, h1);
  const h2Buffer = Buffer.from(h2);
  let h2Int = BigInt(0);
  for (let i = 0; i < h2Buffer.length; i++) {
    h2Int |= BigInt(h2Buffer[i]) << (8n * BigInt(i));
  }
  const gBigInt = BigInt(7);  // Valor de g
  const NBigInt = BigInt('0x894B645E89E1535BBDAD5B8B290650530801B18EBFBF5E8FAB3C82872A3E9BB7');  // N como BigInt

  const result = modularExponentiation(gBigInt, h2Int, NBigInt);

  const resultBuffer = Buffer.from(result.toString(16), 'hex');
  let verifierBuffer = resultBuffer.reverse();
  while (verifierBuffer.length < 32) {
    verifierBuffer.push(0);
  }
  return Buffer.from(verifierBuffer);
}

// Función de exponenciación modular
function modularExponentiation(base, exponent, modulus) {
  let result = 1n;
  base = base % modulus;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent / 2n;
    base = (base * base) % modulus;
  }

  return result;
}

// Función para registrar un nuevo usuario
export const registerUser = async (username, password, email) => {
  const salt = generateSalt();
  const h1 = calculateH1(username, password);
  const verifier = calculateVerifier(salt, h1);

  return new Promise((resolve, reject) => {
    const query = `INSERT INTO acore_auth.account (username, salt, verifier, email) VALUES (?, ?, ?, ?)`;
    db.query(query, [username, salt, verifier, email], (err, result) => {
      if (err) {
        // Mostrar detalles del error en la consola del servidor
        console.error("Error al registrar la cuenta:", err);

        // Si el error es de clave duplicada (usuario ya existe)
        if (err.code === 'ER_DUP_ENTRY') {
          return reject({ code: 409, message: "El nombre de usuario ya está en uso." });
        }

        // Otro tipo de error
        return reject({ code: 500, message: "Error interno en el servidor al registrar la cuenta." });
      }
      resolve({ id: result.insertId, username, email });
    });
  });
};

// Función para verificar las credenciales de un usuario
export const loginUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM acore_auth.account WHERE username = ?`;
    db.query(query, [username], (err, results) => {
      if (err || results.length === 0) {
        return reject("Usuario no encontrado.");
      }

      const user = results[0];
      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (passwordMatch) {
        resolve(user);
      } else {
        reject("Credenciales incorrectas.");
      }
    });
  });
};

// Funcion para consultar usuarios online (excluyendo bots)
export const onlineUsers = async () => {
  try {
      const count = await new Promise((resolve, reject) => {
          const query = `
              SELECT COUNT(*) AS count 
              FROM acore_auth.account 
              WHERE online = 1 AND username NOT LIKE '%RNDBOT%'
          `;
          db.query(query, (error, results) => {
              if (error) return reject(error);
              resolve(results[0].count); // Retorna el número de cuentas online (sin bots)
          });
      });

      return count;
  } catch (error) {
      console.error("Error al consultar usuarios online:", error);
      throw new Error("No se pudieron obtener los usuarios online");
  }
};

// Funcion para consultar usuarios y bots online
export const onlineUsersAndBots = async () => {
  try {
      const count = await new Promise((resolve, reject) => {
          const query = `
              SELECT COUNT(*) AS count 
              FROM acore_auth.account 
              WHERE online = 1
          `;
          db.query(query, (error, results) => {
              if (error) return reject(error);
              resolve(results[0].count); // Retorna el número de cuentas online (con bots)
          });
      });

      return count;
  } catch (error) {
      console.error("Error al consultar usuarios y bots online:", error);
      throw new Error("No se pudieron obtener los usuarios y bots online");
  }
};
