"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const db_1 = require("../lib/db");
const schemas_1 = require("../schemas");
const users_1 = require("../data/users");
const tokens_1 = require("../lib/tokens");
const mail_1 = require("../lib/mail");
// Controlador para manejar la actualización de configuraciones de usuario
exports.updateUser = (0, express_async_handler_1.default)(async (req, res) => {
    // Validar los campos de entrada con el esquema definido
    const validateFields = schemas_1.UpdateSchema.safeParse(req.body);
    if (!validateFields.success) {
        res.status(400).json({ error: "Datos inválidos" });
        return;
    }
    const values = validateFields.data;
    const userId = req.body.userId; // El id del usuario es recibido desde la app móvil en el cuerpo de la solicitud
    // Verifica si el usuario existe en la base de datos
    const dbUser = await (0, users_1.getUserById)(userId);
    if (!dbUser) {
        res.status(403).json({ error: "Acción no permitida" });
        return;
    }
    // Verifica si el correo ha cambiado y si ya está en uso
    if (values.email && values.email !== dbUser.email) {
        const existingUser = await (0, users_1.getUserByEmail)(values.email);
        if (existingUser && existingUser.id !== dbUser.id) {
            res.status(400).json({ error: "El correo ya está en uso!" });
            return;
        }
        // Genera y envía un token de verificación al nuevo correo
        const verificationToken = await (0, tokens_1.generateVerificationToken)(values.email);
        await (0, mail_1.sendVerificationEmail)(verificationToken.email, verificationToken.token);
        res.status(200).json({ success: "Correo de verificación enviado!" });
        return;
    }
    // Verifica la contraseña actual antes de permitir un cambio de contraseña
    if (values.password && values.newPassword && dbUser.password) {
        const passwordsMatch = await bcryptjs_1.default.compare(values.password, dbUser.password);
        if (!passwordsMatch) {
            res.status(400).json({ error: "Contraseña incorrecta!" });
            return;
        }
        // Hashea la nueva contraseña
        const hashedPassword = await bcryptjs_1.default.hash(values.newPassword, 10);
        values.password = hashedPassword;
        values.newPassword = undefined;
    }
    // Actualiza los datos del usuario en la base de datos
    const updatedUser = await db_1.db.user.update({
        where: { id: dbUser.id },
        data: {
            ...values, // Esto incluye name, email y otros campos que pueden ser enviados
        },
    });
    // Devuelve una respuesta de éxito con el usuario actualizado
    res.status(200).json({
        success: true,
        message: "Cambios realizados correctamente",
        user: updatedUser
    });
});
