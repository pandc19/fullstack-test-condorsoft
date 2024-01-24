

'use client';

import Link from 'next/link'
import type { SimplePokemon } from '..';
import Image from 'next/image';
import { CgPokemon } from 'react-icons/cg';
import { MdCatchingPokemon } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '~/store';
import { toggleTeam } from '~/store/pokemons/pokemonSlice';

interface Props {
    pokemon: SimplePokemon;
}

export const PokemonCard = ({ pokemon }: Props) => {

    const { id, name } = pokemon;
    const isInTeam = useAppSelector(state => !!state.pokemons.team[id]);
    const dispatch = useAppDispatch();

    const onToggle = () => {
        dispatch(toggleTeam(pokemon));
    }

    return (
        <div className="mx-auto right-0 mt-2 w-[276px] h-[271px]">
            <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-[#272727] border-b">
                    <div className="w-[144px] h-[135px] relative">

                        <Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                            alt={name}
                            fill={true}
                            priority={true} />

                    </div>
                    <p className="text-sm font-semibold text-white pt-8">N° {id}</p>
                    <p className="p1-2 text-lg font-bold text-white capitalize">{name}</p>
                    <div className="mt-5">
                        <Link
                            href={`/pokedex/${name}`}
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-white"
                        >
                            Más información
                        </Link>
                    </div>
                </div>
                <div className="border-b">
                    <div className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer">
                        <div onClick={onToggle} className="text-red-600">
                            {
                                isInTeam
                                    ? (<MdCatchingPokemon />)
                                    : (<CgPokemon />)
                            }
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                {
                                    isInTeam
                                        ? 'Es de mi equipo'
                                        : 'No es de mi equipo'
                                }
                            </p>
                            <p className="text-xs text-gray-500">Click para cambiar</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
