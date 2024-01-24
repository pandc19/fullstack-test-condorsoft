import { useEffect, useState } from "react";

import Swal from 'sweetalert2';

import { TeamsPokemons } from "~/components";
import { useAppDispatch } from "~/store";


export default function PokeTeam() {

    const dispatch = useAppDispatch();


    return (
        <>
            <div className="flex flex-col rounded-lg bg-black/70">

                <div className="mx-10 mt-12">
                    <div className="flex justify-between">
                        <span className="text-2xl text-bold text-white">Equipo Pokémon</span>

                        <button
                            onClick={() => dispatch(() => { })}
                            className="flex items-center justify-center p-2 rounded-xl bg-white text-black hover:bg-gray-400 transition-all w-[150px] mr-2">
                            Confirmar equipo
                        </button>
                    </div>


                    <TeamsPokemons />
                </div>

            </div>
        </>
    );
}