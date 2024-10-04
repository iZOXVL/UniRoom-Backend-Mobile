"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado de autorización
    if (!token) {
        return res.status(401).json({ error: "No autorizado, falta token" }); // Respuesta si no hay token
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, "anyKey"); // Verificar el token
        req.user = decoded; // Almacenar la información del usuario en la solicitud
        next(); // Pasar al siguiente middleware o ruta
    }
    catch (err) {
        res.status(401).json({ error: "Token no válido" }); // Respuesta si el token no es válido
    }
};
exports.isAuthenticated = isAuthenticated;
