import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import type { Pokemon, Type, PokemonsResponse } from "~/components";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import type { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";

interface Props {
    params: {
        name: string;
    };
}

export const getStaticPaths: GetStaticPaths = async () => {

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

        if (!response.ok) {
            const errorData = (await response.json()) as { message: string };
            throw new Error(errorData.message);
        }

        const data = await response.json() as PokemonsResponse;
        const paths = data.results.map(({ name }) => ({
            params: { name },
        }));

        return { paths, fallback: true };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error fetching Pokémon data: `, error);
        throw new Error('Failed to generate static paths');
    }

};

export const getStaticProps: GetStaticProps<Props> = async ({ params }: GetStaticPropsContext) => {
    try {
        if (!params?.name) {
            throw new Error('Name parameter is missing');
        }

        return {
            props: {
                params: {
                    name: params?.name as string,
                }
            },
        };
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error fetching Pokémon data: `, error);
        return {
            props: {
                params: { name: '' },
            },
        };
    }
};

const fetchData = async (name: string): Promise<Pokemon> => {
    const response = await fetch(`/api/pokemon?name=${name}&type=2`, {
        next: {
            revalidate: 60 * 60 * 30 * 6
        }
    });

    if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
    }

    const data = await response.json() as Pokemon;

    return data;
};


export default function PokemonPage({ params }: Props) {

    const router = useRouter();


    const [pokemon, setPokemon] = useState<Pokemon>();

    useEffect(() => {

        const fetchDataAndHandleError = async () => {
            try {
                const fetchedData = await fetchData(params.name);
                setPokemon(fetchedData);
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
                await Swal.fire('Error', errorMessage, 'error');
            }
        };

        void fetchDataAndHandleError();
    }, [params]);

    const navigateToPreviousRoute = () => {
        router.back();
    };


    return (
        <>
            {
                pokemon &&
                (
                    <div className="relative flex items-center justify-around rounded-lg w-[1280px] h-[599px] mx-auto bg-black/70 bg-clip-border shadow-lg p-3">
                        <div className="mt-2 mb-8">
                            <div className="flex flex-col ">

                                <div className="flex justify-start py-2 px-4 text-xs font-semibold text-white cursor-pointer" >

                                    <IoArrowBack onClick={navigateToPreviousRoute} size={25} />
                                </div>

                                <div className="w-[476px] h-[447px] relative">
                                    <Image
                                        src={pokemon.sprites.other?.dream_world.front_default ?? ''}
                                        fill={true}
                                        alt={`Imagen del pokemon ${pokemon.name}`}
                                        priority={true}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col px-2 w-[566px] h-[421px] bg-[#272727] rounded-lg">

                            <div className="flex justify-between mt-5 mx-4">
                                <h1 className="px-2 text-2xl font-semibold text-white capitalize">
                                    {pokemon.name}
                                </h1>
                                <span className="text-base font-normal text-white">N° {pokemon.id}</span>
                            </div>

                            <div className="text-sm font-normal text-[#F79328] mt-4 mx-4 flex">
                                {
                                    pokemon.types.map((type: Type) => (
                                        <p key={type.slot} className="mr-2 capitalize">{type.type.name}</p>
                                    ))
                                }
                            </div>

                            <div className="flex flex-wrap text-base font-normal text-white mt-4 mx-4">
                                {
                                    pokemon.moves.slice(0, 10).map(move => (
                                        <p key={move.move.name} className="mr-2 capitalize">{move.move.name}</p>
                                    ))
                                }
                            </div>

                            <div className="flex items-start space-x-40 mt-4 mx-4">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-white">Height</p>
                                    <span className="text-sm font-normal text-white flex">
                                        {pokemon.height} dm
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-white">Weight</p>
                                    <span className="text-sm font-normal text-white flex">
                                        {pokemon.weight} hg
                                    </span>
                                </div>

                            </div>

                            <div className="flex items-start space-x-40 mt-4 mx-4">
                                <div className="flex flex-col">
                                    <p className="text-sm font-semibold text-white">Abilities</p>
                                    <span className="text-sm font-normal text-white flex">
                                        {
                                            pokemon.abilities.slice(0, 10).map(ability => (
                                                <p key={ability.ability.name} className="mr-2 capitalize">{ability.ability.name}</p>
                                            ))
                                        }
                                    </span>
                                </div>

                            </div>

                            <div className="flex flex-col justify-center mx-4 py-2  drop-shadow-lg">
                                <p className="text-sm font-semibold text-white">Regular Sprites</p>
                                <div className="flex justify-center">

                                    <Image
                                        src={pokemon.sprites.front_default}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />

                                    <Image
                                        src={pokemon.sprites.back_default}
                                        width={100}
                                        height={100}
                                        alt={`sprite ${pokemon.name}`}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>


    );
}