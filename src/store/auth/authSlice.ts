import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SimpleUser } from '~/components';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated', 'not-authenticated'
        user: {} as SimpleUser | {},
        errorMessage: '',
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = '';
        },
        onLogin: (state, { payload }: PayloadAction<SimpleUser>) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = '';
        },
        onLogout: (state, { payload }: PayloadAction<string>) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = '';
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;