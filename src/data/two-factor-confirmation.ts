import { db } from "../lib/db";

// Buscar la confirmación de autenticación de dos factores asociada a un usuario específico
export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findUnique({
      where: { userId }
    });

    return twoFactorConfirmation;
  } catch {
    return null; // Retornar null si ocurre algún error durante la búsqueda
  }
};
