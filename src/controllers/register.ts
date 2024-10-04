import * as z from "zod";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import { db } from "../lib/db";
import { RegisterSchema } from "../schemas";
import { generateVerificationToken } from "../lib/tokens";
import { getUserByEmail } from "../data/users";
import { sendVerificationEmail } from "../lib/mail";
import { UserRole } from "@prisma/client";

// Controlador para manejar el registro de nuevos usuarios
export const register = asyncHandler(async (req: Request, res: Response) => {
  // Validar los campos de entrada con el esquema de registro
  const validatedFields = RegisterSchema.safeParse(req.body);

  if (!validatedFields.success) {
    res.status(400).json({ error: "Campos inválidos" });
    return;
  }

  const { email, password, name } = validatedFields.data;

  // Generar la contraseña encriptada
  const hashedPassword = await bcrypt.hash(password, 10);

  // Comprobar si el correo ya está registrado
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    res.status(400).json({ error: "El correo ya está en uso" });
    return;
  }

  // Crear el nuevo usuario en la base de datos
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: UserRole.ESTUDIANTE,
    },
  });

  // Generar un token de verificación y enviar el correo de confirmación
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // Responder con éxito y notificar al usuario que revise su correo
  res.status(201).json({ success: true, message: "Correo de confirmación enviado" });
});
