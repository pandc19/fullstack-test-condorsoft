import { useDispatch, useSelector } from "react-redux"
import type { LoginForm, RegisterForm, User } from "~/components";
import type { RootState } from "~/store";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "~/store/auth/authSlice";


export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ loginEmail, loginPassword }: LoginForm) => {
        dispatch(onChecking());

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ loginEmail, loginPassword }),
            });

            if (response.ok) {
                const data = await response.json() as User;
                console.log('Login:', data);

                dispatch(onLogin({ name: data.name, id: data.id! }));
            } else {
                throw Error();
            }

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ registerName, registerEmail, registerPassword }: RegisterForm) => {
        dispatch(onChecking());

        try {

            const response = await fetch('/api/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ registerName, registerEmail, registerPassword }),
            });

            if (response.ok) {
                const data = await response.json() as User;
                // console.log('Post created:', data);

                dispatch(onLogin({ name: data.name, id: data.id! }));
            } else {
                throw Error();
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch data';
            dispatch(onLogout(errorMessage || '--'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout('Sesión caducada'));

        try {
            // const { data } = await calendar Api.get('/auth/renew');
            const data = { token: '', name: '', id: 0 }
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime().toString());

            dispatch(onLogin({ name: data.name, id: data.id }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout('Sesión cerrada'));
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout('Sesión cerrada'));
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}