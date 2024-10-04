"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwoFactorTokenByEmail = exports.getTwoFactorTokenByToken = void 0;
const db_1 = require("../lib/db");
// Buscar un token de autenticación de dos factores específico por su valor de token
const getTwoFactorTokenByToken = async (token) => {
    try {
        const twoFactorToken = await db_1.db.twoFactorToken.findUnique({
            where: { token }
        });
        return twoFactorToken;
    }
    catch {
        return null; // Retornar null si ocurre un error en la búsqueda
    }
};
exports.getTwoFactorTokenByToken = getTwoFactorTokenByToken;
// Buscar un token de autenticación de dos factores asociado a un email específico
const getTwoFactorTokenByEmail = async (email) => {
    try {
        const twoFactorToken = await db_1.db.twoFactorToken.findFirst({
            where: { email }
        });
        return twoFactorToken;
    }
    catch {
        return null; // Retornar null si ocurre un error en la búsqueda
    }
};
exports.getTwoFactorTokenByEmail = getTwoFactorTokenByEmail;
