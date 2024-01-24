import type { Pokemon, SimplePokemon } from "~/components";

export const getPokemonsByName = async (name: string): Promise<SimplePokemon[]> => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon data. Status: ${response.status}`);
        }

        const data = await response.json() as Pokemon;

        const pokemon = {
            id: data.id.toString(),
            name: data.name
        };

        return [pokemon];
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        throw new Error("An error occurred while fetching Pokemon data");
    }
}

export const getPokemonByName = async (name: string): Promise<Pokemon> => {

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch Pokemon data. Status: ${response.status}`);
        }

        const data = await response.json() as Pokemon;

        return data;
    } catch (error) {
        console.error("Error fetching Pokemon data:", error);
        throw new Error("An error occurred while fetching Pokemon data");
    }
}