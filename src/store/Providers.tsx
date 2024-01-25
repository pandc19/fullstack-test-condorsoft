'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { setTeamPokemons } from './pokemons/pokemonSlice';
import { type SimplePokemon } from '~/components';

interface Props {
    children: React.ReactNode;
}


export const Providers = ({ children }: Props) => {

    useEffect(() => {
        const team = JSON.parse(localStorage.getItem('pokemon-team') ?? '{}') as Record<number, SimplePokemon>;
        store.dispatch(setTeamPokemons(team));
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
