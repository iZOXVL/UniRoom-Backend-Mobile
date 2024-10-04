"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../lib/db");
const schemas_1 = require("../schemas");
const tokens_1 = require("../lib/tokens");
const users_1 = require("../data/users");
const mail_1 = require("../lib/mail");
const client_1 = require("@prisma/client");
// Controlador para manejar el registro de nuevos usuarios
exports.register = (0, express_async_handler_1.default)(async (req, res) => {
    // Validar los campos de entrada con el esquema de registro
    const validatedFields = schemas_1.RegisterSchema.safeParse(req.body);
    if (!validatedFields.success) {
        res.status(400).json({ error: "Campos inválidos" });
        return;
    }
    const { email, password, name } = validatedFields.data;
    // Generar la contraseña encriptada
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    // Comprobar si el correo ya está registrado
    const existingUser = await (0, users_1.getUserByEmail)(email);
    if (existingUser) {
        res.status(400).json({ error: "El correo ya está en uso" });
        return;
    }
    // Crear el nuevo usuario en la base de datos
    await db_1.db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: client_1.UserRole.ESTUDIANTE,
        },
    });
    // Generar un token de verificación y enviar el correo de confirmación
    const verificationToken = await (0, tokens_1.generateVerificationToken)(email);
    await (0, mail_1.sendVerificationEmail)(verificationToken.email, verificationToken.token);
    // Responder con éxito y notificar al usuario que revise su correo
    res.status(201).json({ success: true, message: "Correo de confirmación enviado" });
});
