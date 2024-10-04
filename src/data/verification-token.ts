import { db } from "../lib/db";

// Buscar un token de verificación específico por su valor de token
export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token }
    });

    return verificationToken;
  } catch {
    return null; // Retornar null si ocurre un error en la búsqueda
  }
};

// Buscar un token de verificación asociado a un email específico
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email }
    });

    return verificationToken;
  } catch {
    return null; // Retornar null si ocurre un error en la búsqueda
  }
};
