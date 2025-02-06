import { registerUser, loginUser, onlineUsers, onlineUsersAndBots } from '../../services/wow/authService.js';

// Registrar usuario
export const register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    // 1️⃣ Validar reCAPTCHA con Google
    const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${RECAPTCHA_SECRET_KEY}&response=${captchaToken}`,
    });

    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ message: "Verificación de reCAPTCHA fallida." });
    }

    // 2️⃣ Si el CAPTCHA es válido, continuar con el registro
    
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

// Usuarios online (excluyendo bots)
export const online = async (req, res) => {
  try {
      const count = await onlineUsers();
      res.status(200).json({ count });
  } catch (error) {
      console.error("Error al obtener usuarios online:", error);
      res.status(500).json({
          message: "Error al obtener usuarios online",
          error: error.message,
      });
  }
};

// Usuarios + bots online
export const onlineAll = async (req, res) => {
  try {
      const count = await onlineUsersAndBots();
      res.status(200).json({ count });
  } catch (error) {
      console.error("Error al obtener usuarios y bots online:", error);
      res.status(500).json({
          message: "Error al obtener usuarios y bots online",
          error: error.message,
      });
  }
};
