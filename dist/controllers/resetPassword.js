"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const schemas_1 = require("../schemas");
const users_1 = require("../data/users");
const mail_1 = require("../lib/mail");
const tokens_1 = require("../lib/tokens");
// Controlador para manejar la solicitud de recuperación de contraseña
exports.resetPassword = (0, express_async_handler_1.default)(async (req, res) => {
    // Validar el campo de correo electrónico recibido
    const validatedFields = schemas_1.ResetSchema.safeParse(req.body);
    if (!validatedFields.success) {
        res.status(400).json({ error: "Correo inválido" });
        return;
    }
    const { email } = validatedFields.data;
    // Verificar si el usuario existe en la base de datos
    const existingUser = await (0, users_1.getUserByEmail)(email);
    if (!existingUser) {
        res.status(404).json({ error: "Correo no encontrado" });
        return;
    }
    // Generar el token de recuperación y enviarlo por correo
    const passwordResetToken = await (0, tokens_1.generatePasswordResetToken)(email);
    await (0, mail_1.sendPasswordResetEmail)(passwordResetToken.email, passwordResetToken.token);
    // Notificar al usuario que el correo de recuperación ha sido enviado
    res.json({ success: true, message: "Correo de recuperación enviado" });
});
