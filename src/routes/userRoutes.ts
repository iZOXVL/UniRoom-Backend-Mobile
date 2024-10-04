import { Router } from "express";
import { register } from "../controllers/register";
import { login } from "../controllers/login";
import { resetPassword } from "../controllers/resetPassword";

const router = Router();

// Ruta para registrar un nuevo usuario
router.post("/register", register);

// Ruta para iniciar sesión
router.post("/login", login);

// Ruta para restablecer la contraseña
router.post("/reset-password", resetPassword);

export default router;
