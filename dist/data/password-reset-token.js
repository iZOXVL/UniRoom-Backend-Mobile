"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPasswordResetTokenByEmail = exports.getPasswordResetTokenByToken = void 0;
const db_1 = require("../lib/db");
// Buscar un token de restablecimiento de contraseña específico por su valor de token
const getPasswordResetTokenByToken = async (token) => {
    try {
        const passwordResetToken = await db_1.db.passwordResetToken.findUnique({
            where: { token }
        });
        return passwordResetToken;
    }
    catch {
        return null; // Retornar null si ocurre algún error en la búsqueda
    }
};
exports.getPasswordResetTokenByToken = getPasswordResetTokenByToken;
// Buscar un token de restablecimiento de contraseña asociado a un email
const getPasswordResetTokenByEmail = async (email) => {
    try {
        const passwordResetToken = await db_1.db.passwordResetToken.findFirst({
            where: { email }
        });
        return passwordResetToken;
    }
    catch {
        return null; // Retornar null si ocurre algún error en la búsqueda
    }
};
exports.getPasswordResetTokenByEmail = getPasswordResetTokenByEmail;
