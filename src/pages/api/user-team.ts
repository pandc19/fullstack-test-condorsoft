import type { NextApiRequest, NextApiResponse } from "next";
import { createUserTeam, deleteUserTeam, type UserTeam } from "~/components";
import { getUserTeam } from "~/components/auth/controllers/user-team";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {

    try {
      const team = req.body as UserTeam[];

      team.forEach((member) => {

        void createUserTeam(member);
      });

      res.status(200).json({
        message: 'ok'
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error creating user: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }

  if (req.method === 'DELETE') {

    try {
      const { userId } = req.query;

      await deleteUserTeam(parseInt(userId as string, 10));
      res.status(200).json({
        message: 'ok'
      });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error creating user: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }

  if (req.method === 'GET') {

    try {
      const { userId } = req.query;

      const team = await getUserTeam(parseInt(userId as string, 10));
      res.status(200).json(team);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
      console.error(`[${new Date().toISOString()}] Error creating user: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }
  }
}
