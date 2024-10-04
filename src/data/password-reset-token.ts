import { db } from "../lib/db";

// Buscar un token de restablecimiento de contraseña específico por su valor de token
export const getPasswordResetTokenByToken = async (token: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findUnique({
      where: { token }
    });

    return passwordResetToken;
  } catch {
    return null; // Retornar null si ocurre algún error en la búsqueda
  }
};

// Buscar un token de restablecimiento de contraseña asociado a un email
export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const passwordResetToken = await db.passwordResetToken.findFirst({
      where: { email }
    });

    return passwordResetToken;
  } catch {
    return null; // Retornar null si ocurre algún error en la búsqueda
  }
};
