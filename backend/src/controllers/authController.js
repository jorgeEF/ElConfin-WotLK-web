import { registerUser, loginUser } from '../services/authService.js';

// Registrar usuario
export const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    const result = await registerUser(username, password, email);
    res.status(200).json({ message: "Cuenta registrada con éxito.", user: result });
  } catch (error) {
    console.error("Error al registrar la cuenta:", error);

    // Verifica si el error es un error relacionado con duplicados
    if (error.code === 409) {
      return res.status(409).json({ message: error.message });
    }

    // Para otros errores, enviar 500
    return res.status(500).json({ message: "Error al registrar la cuenta.", error: error.message });
  }
};

// Iniciar sesión de usuario
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Faltan datos necesarios.");
  }

  try {
    const user = await loginUser(username, password);
    if (user) {
      res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } else {
      res.status(401).send("Credenciales incorrectas.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al iniciar sesión.");
  }
};
