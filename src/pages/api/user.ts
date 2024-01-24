import type { NextApiRequest, NextApiResponse } from "next";
import { type RegisterForm, createUser } from "~/components";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    try {
      const { registerName, registerEmail, registerPassword } = req.body as RegisterForm;

      const createdUser = await createUser({ registerName, registerEmail, registerPassword });
      // console.log(createdUser)
      res.status(200).json(createdUser);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error creating user: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }



  }
}
