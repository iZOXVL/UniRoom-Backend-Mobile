import { db } from "../lib/db";

// Buscar un usuario específico por su correo electrónico
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null; // Retornar null si ocurre algún error en la búsqueda
  }
};

// Buscar un usuario específico por su ID
export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null; // Retornar null si ocurre algún error en la búsqueda
  }
};
