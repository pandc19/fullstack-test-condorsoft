import { SimplePokemon } from '~/components';
import { PayloadAction } from '../../../node_modules/@reduxjs/toolkit/dist/createAction';
import { createSlice } from '@reduxjs/toolkit'


/*
{
    pokemons: [],
    favorites: {
        '1': {id: 1, name: 'bulbasaur'},
        '3': {id: 3, name: 'venasaur'},
        '2': {id: 2, name: 'ivysaur'},
    }
}
*/

interface PokemonsState {
    team: { [key: string]: SimplePokemon },
}

// const getInitialState = (): PokemonsState => {
//     // if (typeof localStorage === 'undefined') return {};
//     const favorites = JSON.parse(localStorage.getItem('favorite-pokemons') ?? '{}');
//     return favorites;
// }

const initialState: PokemonsState = {
    team: {},
    // ...getInitialState(),
    // '1': { id: '1', name: 'bulbasaur' },
    // '2': { id: '2', name: 'ivysaur' },
    // '3': { id: '3', name: 'venasaur' },
}

export const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        setTeamPokemons(state, action: PayloadAction<{ [key: string]: SimplePokemon }>) {
            state.team = action.payload;
        },
        toggleTeam(state, action: PayloadAction<SimplePokemon>) {
            const pokemon = action.payload;
            const { id } = pokemon;

            if (!!state.team[id]) {
                delete state.team[id];
                // return;
            } else {
                state.team[id] = pokemon;
            }
        }
    }
});

export const { toggleTeam, setTeamPokemons } = pokemonsSlice.actions
