"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVerificationTokenByEmail = exports.getVerificationTokenByToken = void 0;
const db_1 = require("../lib/db");
// Buscar un token de verificación específico por su valor de token
const getVerificationTokenByToken = async (token) => {
    try {
        const verificationToken = await db_1.db.verificationToken.findUnique({
            where: { token }
        });
        return verificationToken;
    }
    catch {
        return null; // Retornar null si ocurre un error en la búsqueda
    }
};
exports.getVerificationTokenByToken = getVerificationTokenByToken;
// Buscar un token de verificación asociado a un email específico
const getVerificationTokenByEmail = async (email) => {
    try {
        const verificationToken = await db_1.db.verificationToken.findFirst({
            where: { email }
        });
        return verificationToken;
    }
    catch {
        return null; // Retornar null si ocurre un error en la búsqueda
    }
};
exports.getVerificationTokenByEmail = getVerificationTokenByEmail;
