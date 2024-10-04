import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user?: any; // Interfaz extendida para incluir la propiedad 'user'
}

// Middleware para verificar si el usuario está autenticado
export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]; // Obtener el token del encabezado de autorización

  if (!token) {
    return res.status(401).json({ error: "No autorizado, falta token" }); // Respuesta si no hay token
  }

  try {
    const decoded = jwt.verify(token, "anyKey"); // Verificar el token
    req.user = decoded; // Almacenar la información del usuario en la solicitud
    next(); // Pasar al siguiente middleware o ruta
  } catch (err) {
    res.status(401).json({ error: "Token no válido" }); // Respuesta si el token no es válido
  }
};
