import { db } from "../lib/db";

// Buscar un token de autenticación de dos factores específico por su valor de token
export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token }
    });

    return twoFactorToken;
  } catch {
    return null; // Retornar null si ocurre un error en la búsqueda
  }
};

// Buscar un token de autenticación de dos factores asociado a un email específico
export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email }
    });

    return twoFactorToken;
  } catch {
    return null; // Retornar null si ocurre un error en la búsqueda
  }
};
