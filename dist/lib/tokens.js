"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateVerificationToken = exports.generatePasswordResetToken = exports.generateTwoFactorToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const uuid_1 = require("uuid");
const db_1 = require("../lib/db");
const verification_token_1 = require("../data/verification-token");
const password_reset_token_1 = require("../data/password-reset-token");
const two_factor_token_1 = require("../data/two-factor-token");
// Generar un token de autenticación de dos factores
const generateTwoFactorToken = async (email) => {
    const token = crypto_1.default.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);
    const existingToken = await (0, two_factor_token_1.getTwoFactorTokenByEmail)(email);
    // Eliminar el token existente si lo hay
    if (existingToken) {
        await db_1.db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }
    // Crear y devolver el nuevo token
    const twoFactorToken = await db_1.db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return twoFactorToken;
};
exports.generateTwoFactorToken = generateTwoFactorToken;
// Generar un token de recuperación de contraseña
const generatePasswordResetToken = async (email) => {
    const token = (0, uuid_1.v4)();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await (0, password_reset_token_1.getPasswordResetTokenByEmail)(email);
    // Eliminar el token existente si lo hay
    if (existingToken) {
        await db_1.db.passwordResetToken.delete({
            where: { id: existingToken.id }
        });
    }
    // Crear y devolver el nuevo token
    const passwordResetToken = await db_1.db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });
    return passwordResetToken;
};
exports.generatePasswordResetToken = generatePasswordResetToken;
// Generar un token de verificación de correo
const generateVerificationToken = async (email) => {
    const token = (0, uuid_1.v4)();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    const existingToken = await (0, verification_token_1.getVerificationTokenByEmail)(email);
    // Eliminar el token existente si lo hay
    if (existingToken) {
        await db_1.db.verificationToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    // Crear y devolver el nuevo token
    const verificationToken = await db_1.db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        }
    });
    return verificationToken;
};
exports.generateVerificationToken = generateVerificationToken;
