import type { NextApiRequest, NextApiResponse } from "next";
import { type LoginForm, login } from "~/components";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    try {
      const { loginEmail, loginPassword } = req.body as LoginForm;

      const users = await login({ loginEmail, loginPassword });

      if (users.length == 0)
        throw Error('Credenciales incorrectas');

      // console.log(createdUser)
      res.status(200).json(users[0]);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error authenticating: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }
}
