import { useEffect, useState } from "react";

import Swal from 'sweetalert2';

import { PokemonGrid, SearchPokemon } from "~/components";
import type { SimplePokemon } from "~/components";
import { useAuth } from "~/hooks";


export default function Pokedex() {

  useAuth();

  const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

  useEffect(() => {
    const fetchDataAndHandleError = async () => {
      try {
        await fetchData('/api/pokemons');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
        await Swal.fire('Error', errorMessage, 'error');
      }
    };

    void fetchDataAndHandleError();
  }, []);

  const fetchData = async (url: string) => {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json() as { message: string };
      throw new Error(errorData.message);
    }

    const data = await response.json() as SimplePokemon[];
    setPokemons(data);
  };

  const onNewSearch = async (name: string) => {
    try {
      if (name.length > 0)
        await fetchData(`/api/pokemon?name=${name}&type=1`);
      else
        await fetchData('/api/pokemons');

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
      await Swal.fire('Error', errorMessage, 'error');
    }
  }

  return (
    <>
      <div className="flex flex-col rounded-lg bg-black/70">

        <div className="mx-10 mt-12">
          <span className="text-2xl text-bold text-white">Pokedex</span>

          <div className="mt-5 mb-10">
            <SearchPokemon onNewSearch={onNewSearch} />
          </div>

          <PokemonGrid pokemons={pokemons} />
        </div>

      </div>
    </>

  );
}