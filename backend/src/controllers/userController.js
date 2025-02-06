import { registerUser, loginUser } from '../services/userService.js';

// Registrar usuario
export const register = async (req, res) => {
  const { username, email, password, captchaToken } = req.body;  

  if (!username || !password || !email || !captchaToken) {
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
    
    const result = await registerUser(username, email, password);
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
    return res.status(400).json({ message: "Faltan datos necesarios." });
  }

  try {
    const user = await loginUser(username, password);
    if (user) {
      return res.status(200).json({ message: "Inicio de sesión exitoso", user });
    } else {
      return res.status(401).json({ message: "El usuario/contraseña no son correctos." });
    }
  } catch (error) {
    console.error(error);

    // Aquí capturamos el error lanzado en el service y usamos el mensaje del error.
    if (error.code && error.message) {
      return res.status(error.code).json({ message: error.message });
    }

    // Si no hay código ni mensaje personalizado, usamos un mensaje genérico
    return res.status(500).json({ message: "Error al iniciar sesión." });
  }
};

