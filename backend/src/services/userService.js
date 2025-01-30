import { db } from '../config/db.js';
import crypto from 'crypto';

/**
 * Encripta una contraseña utilizando SHA-256.
 * @param {string} password - La contraseña a encriptar.
 * @returns {Buffer} - La contraseña encriptada como un Buffer.
 */
const encriptar = (password) => {
  if (!password) throw new Error('La contraseña es requerida para encriptar.');
  
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest();
};

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {string} username - El nombre de usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} role - El rol del usuario.
 * @returns {Promise<object>} - Información del usuario registrado.
 */
export const registerUser = async (username, email, password) => {
  if (!username || !email || !password) {
    throw { code: 400, message: 'Todos los campos son obligatorios.' };
  }

  const encryptedPassword = encriptar(password);

  try {
    const query = `INSERT INTO confin_web.users (username, email, password) VALUES (?, ?, ?)`;
    const result = await new Promise((resolve, reject) => {
      db.query(query, [username, email, encryptedPassword], (err, result) => {
        if (err) {
          console.error('Error al registrar la cuenta:', err);
          if (err.code === 'ER_DUP_ENTRY') {
            return reject({ code: 409, message: 'El nombre de usuario ya está en uso.' });
          }
          return reject({ code: 500, message: 'Error interno en el servidor al registrar la cuenta.' });
        }
        resolve(result);
      });
    });

    return { id: result.insertId, username, email };
  } catch (error) {
    // Lanza el error para que sea manejado por la capa superior.
    throw error;
  }
};

/**
 * Verifica las credenciales de un usuario.
 * @param {string} username - El nombre de usuario.
 * @param {string} password - La contraseña ingresada por el usuario.
 * @returns {Promise<object>} - Los datos del usuario si las credenciales son correctas.
 */
export const loginUser = async (username, password) => {
  if (!username || !password) {
    throw { code: 400, message: 'El nombre de usuario y la contraseña son obligatorios.' };
  }

  try {
    const user = await new Promise((resolve, reject) => {
      const query = `SELECT * FROM confin_web.users WHERE username = ?`;
      db.query(query, [username], (err, results) => {
        if (err) {
          console.error('Error al buscar usuario:', err);
          return reject({ code: 500, message: 'Error interno en el servidor.' });
        }

        if (results.length === 0) {
          return reject({ code: 404, message: 'Usuario no encontrado.' });
        }

        resolve(results[0]);
      });
    });

    // Encriptar la contraseña ingresada para compararla
    const encryptedPassword = encriptar(password);

    if (Buffer.compare(encryptedPassword, user.password) !== 0) {
      throw { code: 401, message: 'El usuario/contraseña no son correctos.' };
    }

    // Si la contraseña coincide, devolver el usuario (excluyendo la contraseña)
    const { password: _, ...userWithoutPassword } = user; // Eliminar la contraseña de la respuesta
    return userWithoutPassword;
  } catch (error) {
    throw error;
  }
};

// Funcion para consultar usuarios online
export const onlineUsers = async () => {
  try {
      const count = await new Promise((resolve, reject) => {
          const query = `
              SELECT COUNT(*) AS count 
              FROM confin_web.users 
              WHERE online = 1
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
