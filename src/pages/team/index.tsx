

import Swal from "sweetalert2";
import { TeamsPokemons } from "~/components";
import { useAuth } from "~/hooks";
import { useAppSelector } from "~/store";



export default function PokeTeam() {

    useAuth();

    const teamPokemonsState = useAppSelector(state => state.pokemons.team);
    const teamPokemons = Object.values(teamPokemonsState);

    const onSaveTeam = async () => {
        if (teamPokemons.length !== 6) {
            await Swal.fire('Advertencia', 'Tu equipo debe tenere exactamente 6 pokémon', 'warning');
            return;
        }
    }

    return (
        <>
            <div className="flex flex-col rounded-lg bg-black/70">

                <div className="mx-10 mt-12">
                    <div className="flex justify-between">
                        <span className="text-2xl text-bold text-white">Equipo Pokémon</span>

                        <button
                            onClick={onSaveTeam}
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