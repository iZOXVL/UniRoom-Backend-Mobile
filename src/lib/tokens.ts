import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

import { db } from "../lib/db";
import { getVerificationTokenByEmail } from "../data/verification-token";
import { getPasswordResetTokenByEmail } from "../data/password-reset-token";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";

// Generar un token de autenticación de dos factores
export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  
  // Eliminar el token existente si lo hay
  if (existingToken) {
    await db.twoFactorToken.delete({
      where: {
        id: existingToken.id,
      }
    });
  }

  // Crear y devolver el nuevo token
  const twoFactorToken = await db.twoFactorToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return twoFactorToken;
}

// Generar un token de recuperación de contraseña
export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);
  
  // Eliminar el token existente si lo hay
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  }

  // Crear y devolver el nuevo token
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return passwordResetToken;
}

// Generar un token de verificación de correo
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  
  // Eliminar el token existente si lo hay
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // Crear y devolver el nuevo token
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    }
  });

  return verificationToken;
};
