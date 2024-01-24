import { PokemonCard } from '..';
import type { SimplePokemon } from '..';

interface Props {
    pokemons: SimplePokemon[];
}

export const PokemonGrid = ({ pokemons }: Props) => {
    return (
        <div >
            <div className="flex flex-wrap gap-y-28 gap-x-14 items-center justify-center h-[869px] overflow-y-auto">
                {
                    pokemons.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))
                }

            </div>
        </div>

    );
}
