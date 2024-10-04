"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwoFactorConfirmationByUserId = void 0;
const db_1 = require("../lib/db");
// Buscar la confirmación de autenticación de dos factores asociada a un usuario específico
const getTwoFactorConfirmationByUserId = async (userId) => {
    try {
        const twoFactorConfirmation = await db_1.db.twoFactorConfirmation.findUnique({
            where: { userId }
        });
        return twoFactorConfirmation;
    }
    catch {
        return null; // Retornar null si ocurre algún error durante la búsqueda
    }
};
exports.getTwoFactorConfirmationByUserId = getTwoFactorConfirmationByUserId;
