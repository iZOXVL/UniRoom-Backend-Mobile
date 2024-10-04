"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSchema = exports.LoginSchema = exports.ResetSchema = exports.NewPasswordSchema = exports.UpdateSchema = void 0;
const z = __importStar(require("zod"));
const client_1 = require("@prisma/client");
exports.UpdateSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([client_1.UserRole.ARRENDADOR, client_1.UserRole.ESTUDIANTE]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
    if (data.password && !data.newPassword) {
        return false;
    }
    return true;
}, {
    message: "La nueva contraseña es requerida!",
    path: ["newPassword"]
})
    .refine((data) => {
    if (data.newPassword && !data.password) {
        return false;
    }
    return true;
}, {
    message: "La contraseña es requerida!",
    path: ["password"]
});
exports.NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimo 6 caracteres requeridos!",
    }),
});
exports.ResetSchema = z.object({
    email: z.string().email({
        message: "Correo electrónico requerido!",
    }),
});
exports.LoginSchema = z.object({
    email: z.string().email({
        message: "Correo electrónico requerido!",
    }),
    password: z.string().min(1, {
        message: "la contraseña es requerida!",
    }),
    code: z.optional(z.string()),
});
exports.RegisterSchema = z.object({
    email: z.string().email({
        message: "Correo electrónico requerido!",
    }),
    password: z.string().min(6, {
        message: "6 caracteres requeridos!",
    }),
    name: z.string().min(1, {
        message: "El nombre es requerido!",
    }),
    role: z.enum(["ARRENDADOR", "ESTUDIANTE"]).optional(),
});
