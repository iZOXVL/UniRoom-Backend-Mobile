"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_1 = require("../controllers/register");
const login_1 = require("../controllers/login");
const resetPassword_1 = require("../controllers/resetPassword");
const updateUser_1 = require("../controllers/updateUser");
const router = (0, express_1.Router)();
// Ruta para registrar un nuevo usuario
router.post("/register", register_1.register);
// Ruta para iniciar sesión
router.post("/login", login_1.login);
// Ruta para restablecer la contraseña
router.post("/reset-password", resetPassword_1.resetPassword);
//Ruta para actualizar la información del usuario
router.put("/update", updateUser_1.updateUser);
exports.default = router;
