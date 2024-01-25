

import Swal from "sweetalert2";
import { type Pokemon, type SimpleUser, TeamsPokemons, type UserTeam } from "~/components";
import { useAuth } from "~/hooks";
import { useAppSelector } from "~/store";

const saveTeamMember = async (team: UserTeam[]) => {

    const response = await fetch('/api/user-team', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(team),
    });

    if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
    }
}

const deleteTeam = async (userId: number) => {

    const response = await fetch(`/api/user-team?userId=${userId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
    }
}

const fetchPokemonData = async (id: string): Promise<Pokemon> => {
    const response = await fetch(`/api/pokemon?name=${id}&type=2`);

    if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
    }

    const data = await response.json() as Pokemon;

    return data;
};

const getReapeatedTypePokemons = (arr: UserTeam[]): UserTeam[] => {
    const subPropertySet = new Set<string>();

    for (const obj of arr) {
        if (subPropertySet.has(obj.pokemonType)) {
            return arr.filter(a => a.pokemonType === obj.pokemonType);
        }

        if (obj.pokemonType)
            subPropertySet.add(obj.pokemonType);
    }

    return [];
};


export default function PokeTeam() {

    useAuth();

    const user = useAppSelector(state => state.auth.user) as SimpleUser;
    const teamPokemonsState = useAppSelector(state => state.pokemons.team);
    const teamPokemons = Object.values(teamPokemonsState);

    const onSaveTeam = async () => {
        const pokemonsToTeamList: UserTeam[] = [];
        try {
            if (teamPokemons.length !== 6) {
                await Swal.fire('Advertencia', 'Tu equipo debe tener exactamente 6 pokémon', 'warning');
                return;
            }

            const fetchPokemonPromises = teamPokemons.map(async (member) => {
                const pokemon = await fetchPokemonData(member.id);
                pokemonsToTeamList.push({
                    userId: user.id,
                    pokemonId: pokemon.id,
                    pokemonName: member.name,
                    pokemonType: pokemon.types.length > 0 ? pokemon.types[0]?.type.name ?? '' : '',
                });
            });

            await Promise.all(fetchPokemonPromises);

            const repeatedTypePokemons = getReapeatedTypePokemons(pokemonsToTeamList);

            if (repeatedTypePokemons.length > 0) {
                await Swal.fire('Advertencia', `Pokémon de tipo ${repeatedTypePokemons[0]?.pokemonType.toUpperCase()} repetidos: ${repeatedTypePokemons.map(pokemon => pokemon.pokemonName.toUpperCase()).join(',')}`, 'warning');
                return;
            }

            await deleteTeam(user.id);

            void saveTeamMember(pokemonsToTeamList);

            await Swal.fire('Correcto', 'Tu equipo se registró correctamente', 'success');


        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
            await Swal.fire('Error', errorMessage, 'error');
        }
    }


    return (
        <>
            <div className="flex flex-col rounded-lg bg-black/70">

                <div className="mx-10 mt-12">
                    <div className="flex justify-between">
                        <span className="text-2xl text-bold text-white">Equipo Pokémon</span>

                        {
                            teamPokemons.length > 0 &&
                            <button
                                onClick={onSaveTeam}
                                className="flex items-center justify-center p-2 rounded-xl bg-white text-black hover:bg-gray-400 transition-all w-[150px] mr-2">
                                Confirmar equipo
                            </button>
                        }

                    </div>


                    <TeamsPokemons />
                </div>

            </div>
        </>
    );
}