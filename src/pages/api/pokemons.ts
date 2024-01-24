import type { NextApiRequest, NextApiResponse } from "next";
import { getPokemons } from "~/components";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if (req.method === 'GET') {

        try {
            const pokemons = await getPokemons(151);

            res.status(200).json(pokemons);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
            console.error(`[${new Date().toISOString()}] Error fetching Pokémon data: `, error);
            res.status(500).json({
                message: errorMessage
            });
        }
    }
}