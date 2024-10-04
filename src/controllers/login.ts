import * as z from "zod";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { db } from "../lib/db";
import { LoginSchema } from "../schemas";
import { getUserByEmail } from "../data/users";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { 
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "../lib/mail";
import { 
  generateVerificationToken,
  generateTwoFactorToken
} from "../lib/tokens";
import { 
  getTwoFactorConfirmationByUserId
} from "../data/two-factor-confirmation";

// Controlador para manejar el inicio de sesión de usuarios
export const login = asyncHandler(async (req: Request, res: Response) => {
  // Validar los campos de entrada con el esquema definido
  const validateFields = LoginSchema.safeParse(req.body);

  if (!validateFields.success) {
    res.status(400).json({ error: "Credenciales inválidas" });
    return;
  }

  const { email, password, code } = validateFields.data;
  const existingUser = await getUserByEmail(email);

  // Si el usuario no existe en la base de datos
  if (!existingUser || !existingUser.email || !existingUser.password) {
    res.status(404).json({ error: "Credenciales inexistentes" });
    return;
  }

  // Verificar si el usuario ya ha confirmado su correo
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);
    res.status(200).json({ emailVerify: true, message: "Correo de confirmación enviado" });
    return;
  }

  // Comparar la contraseña proporcionada con la almacenada
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    res.status(400).json({ error: "Contraseña incorrecta" });
    return;
  }

  // Comprobar si 2FA está habilitado y gestionar el código de verificación
  if (existingUser.isTwoFactorEnabled) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

      if (!twoFactorToken || twoFactorToken.token !== code) {
        res.status(400).json({ error: "Código inválido" });
        return;
      }

      // Verificar si el código ha expirado
      if (new Date(twoFactorToken.expires) < new Date()) {
        res.status(400).json({ error: "El código ha expirado" });
        return;
      }

      // Eliminar el token usado para evitar reusos
      await db.twoFactorToken.delete({ where: { id: twoFactorToken.id } });

      // Registrar la confirmación 2FA si es válida
      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({ where: { id: existingConfirmation.id } });
      }
      await db.twoFactorConfirmation.create({ data: { userId: existingUser.id } });

      res.status(200).json({
        success: true,
        message: "Inicio de sesión exitoso con 2FA",
        user: { id: existingUser.id, email: existingUser.email, name: existingUser.name },
      });
      return;
    } else {
      // Si no hay código, generar y enviar uno nuevo por correo
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token);

      res.status(200).json({ twoFactor: true, message: "Código 2FA enviado al correo" });
      return;
    }
  }

  // Si 2FA no está habilitado, iniciar sesión normalmente
  res.status(200).json({
    success: true,
    message: "Inicio de sesión exitoso",
    user: { id: existingUser.id, email: existingUser.email, name: existingUser.name },
  });
});
