'use client';

import { PokemonGrid } from "..";
import { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useAppSelector } from "~/store";

export const TeamsPokemons = () => {

    const favoritePokemonsState = useAppSelector(state => state.pokemons.team);
    const favoritePokemons = Object.values(favoritePokemonsState);
    const [pokemons, setPokemons] = useState(favoritePokemons);


    return (
        <>
            {
                pokemons.length
                    ? <PokemonGrid pokemons={favoritePokemons} />
                    : <NoTeamPokemons />

            }
        </>
    );
}

export const NoTeamPokemons = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <IoHeartOutline size={100} className="text-red-500" />
            <span>No tienes pokémon en tu equipo</span>
        </div>
    )
}
