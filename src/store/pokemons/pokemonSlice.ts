import { type SimplePokemon } from '~/components';
import { type PayloadAction } from '../../../node_modules/@reduxjs/toolkit/dist/createAction';
import { createSlice } from '@reduxjs/toolkit'



interface PokemonsState {
    team: { [key: string]: SimplePokemon },
}


const initialState: PokemonsState = {
    team: {},
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
