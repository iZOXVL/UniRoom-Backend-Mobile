"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
// Middleware para parsear JSON
app.use(express_1.default.json());
// Usar las rutas de usuario
app.use("/api/users", userRoutes_1.default);
// Exportar la aplicación como función
exports.default = (req, res) => {
    app(req, res);
};
