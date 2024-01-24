'use client';

import { PokemonGrid, type SimplePokemon } from "..";
import { useEffect, useState } from "react";
import { MdCatchingPokemon } from "react-icons/md";
import { useAppSelector } from "~/store";

export const TeamsPokemons = () => {

    const teamPokemonsState = useAppSelector(state => state.pokemons.team);
    const teamPokemons = Object.values(teamPokemonsState);
    const [pokemons, setPokemons] = useState<SimplePokemon[]>([]);

    useEffect(() => {
        if (!arraysAreEqual(teamPokemons, pokemons)) {
            setPokemons(teamPokemons);
        }
    }, [teamPokemons, pokemons]);

    // Utility function to compare arrays
    const arraysAreEqual = (array1: SimplePokemon[], array2: SimplePokemon[]) => {
        return JSON.stringify(array1) === JSON.stringify(array2);
    };

    return (
        <>
            {
                pokemons.length
                    ? <PokemonGrid pokemons={pokemons} />
                    : <NoTeamPokemons />

            }
        </>
    );
}

export const NoTeamPokemons = () => {
    return (
        <div className="flex flex-col h-[50vh] items-center justify-center">
            <MdCatchingPokemon size={100} className="text-red-500" />
            <span className="text-white text-base font-normal">No tienes pokémon en tu equipo</span>
        </div>
    )
}
