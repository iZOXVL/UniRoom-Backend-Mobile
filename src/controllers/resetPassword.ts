import { Request, Response } from "express";
import * as z from "zod";
import asyncHandler from "express-async-handler";
import { db } from "../lib/db"; 
import { ResetSchema } from "../schemas";
import { getUserByEmail } from "../data/users";
import { sendPasswordResetEmail } from "../lib/mail";
import { generatePasswordResetToken } from "../lib/tokens";

// Controlador para manejar la solicitud de recuperación de contraseña
export const resetPassword = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  // Validar el campo de correo electrónico recibido
  const validatedFields = ResetSchema.safeParse(req.body);

  if (!validatedFields.success) {
    res.status(400).json({ error: "Correo inválido" });
    return;
  }

  const { email } = validatedFields.data;

  // Verificar si el usuario existe en la base de datos
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    res.status(404).json({ error: "Correo no encontrado" });
    return;
  }

  // Generar el token de recuperación y enviarlo por correo
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

  // Notificar al usuario que el correo de recuperación ha sido enviado
  res.json({ success: true, message: "Correo de recuperación enviado" });
});
