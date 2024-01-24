import type { PokemonsResponse, SimplePokemon } from "~/components";


export const getPokemons = async (limit = 100000, offset = 0): Promise<SimplePokemon[]> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon data. Status: ${response.status}`);
        }

        const data = await response.json() as PokemonsResponse;

        const pokemons = data.results.map(pokemon => ({
            id: pokemon.url.split('/').at(-2)!,
            name: pokemon.name
        }));

        return pokemons;
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        throw new Error("An error occurred while fetching Pokemon data");
    }
};
