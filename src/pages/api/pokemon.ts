import type { NextApiRequest, NextApiResponse } from "next";
import { getPokemonByName, getPokemonsByName } from "~/components";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {

    try {
      const { name, type } = req.query;

      switch (type) {
        case '1':
          const pokemons = await getPokemonsByName(name as string);
          res.status(200).json(pokemons);
          break;

        case '2':
          const pokemon = await getPokemonByName(name as string);
          res.status(200).json(pokemon);
          break;

      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      console.error(`[${new Date().toISOString()}] Error fetching Pokémon data: `, error);
      res.status(500).json({
        message: errorMessage
      });
    }



  }
}
