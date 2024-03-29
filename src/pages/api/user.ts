import type { NextApiRequest, NextApiResponse } from "next";
import { type RegisterForm, createUser, generateJWT } from "~/components";

import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    try {
      const { registerName, registerEmail, registerPassword } = req.body as RegisterForm;

      // Encriptar contraseña
      const salt = bcrypt.genSaltSync();
      const encryptedPassword = bcrypt.hashSync(registerPassword, salt);

      const createdUser = await createUser({ registerName, registerEmail, registerPassword: encryptedPassword });

      const token = await generateJWT(createdUser.id!, createdUser.name);

      res.status(200).json({
        id: createdUser.id,
        name: createdUser.name,
        token
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error creating user: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }



  }
}
