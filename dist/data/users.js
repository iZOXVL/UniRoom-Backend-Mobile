"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmail = void 0;
const db_1 = require("../lib/db");
// Buscar un usuario específico por su correo electrónico
const getUserByEmail = async (email) => {
    try {
        const user = await db_1.db.user.findUnique({ where: { email } });
        return user;
    }
    catch {
        return null; // Retornar null si ocurre algún error en la búsqueda
    }
};
exports.getUserByEmail = getUserByEmail;
// Buscar un usuario específico por su ID
const getUserById = async (id) => {
    try {
        const user = await db_1.db.user.findUnique({ where: { id } });
        return user;
    }
    catch {
        return null; // Retornar null si ocurre algún error en la búsqueda
    }
};
exports.getUserById = getUserById;
