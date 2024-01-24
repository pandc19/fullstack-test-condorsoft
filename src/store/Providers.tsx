'use client';

import { Provider } from 'react-redux';
import { store } from './index';
import { useEffect } from 'react';
import { setTeamPokemons } from './pokemons/pokemonSlice';

interface Props {
    children: React.ReactNode;
}

export const Providers = ({ children }: Props) => {

    useEffect(() => {
        const team = {
            1: { id: '1', name: 'bulbasaur' },
            2: { id: '2', name: 'ivysaur' },
            3: { id: '3', name: 'venasaur' },
        };
        // console.log(favorites);
        store.dispatch(setTeamPokemons(team));
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
