import type { NextApiRequest, NextApiResponse } from "next";
import { type LoginForm, login, generateJWT, type SimpleUser, decodeJWT } from "~/components";

import bcrypt from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    try {
      const { loginEmail, loginPassword } = req.body as LoginForm;

      const user = await login(loginEmail);

      if (!user) {
        return res.status(400).json({
          message: `E-mail ${loginEmail} does not exist`,
        });
      }

      const validPassword = bcrypt.compareSync(loginPassword, user.password);

      if (!validPassword) {
        return res.status(400).json({
          message: 'Invalid credentials'
        });
      }

      const token = await generateJWT(user.id!, user.name);

      res.status(200).json({
        id: user.id,
        name: user.name,
        token
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error authenticating: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }

  if (req.method === 'GET') {

    try {
      const { token } = req.query;
      const decodedToken = decodeJWT(token as string);
      const user = decodedToken as SimpleUser;

      const newToken = await generateJWT(user.id, user.name);

      res.status(200).json({
        id: user.id,
        name: user.name,
        token: newToken
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error validating token: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }
}
