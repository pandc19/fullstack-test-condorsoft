import { useDispatch, useSelector } from "react-redux"
import { type LoginForm, type RegisterForm, type SimpleUser } from "~/components";
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
                const data = await response.json() as SimpleUser;

                localStorage.setItem('token', data.token!);
                localStorage.setItem('token-init-date', new Date().getTime().toString());

                dispatch(onLogin({ name: data.name, id: data.id }));
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
                const data = await response.json() as SimpleUser;

                localStorage.setItem('token', data.token!);
                localStorage.setItem('token-init-date', new Date().getTime().toString());

                dispatch(onLogin({ name: data.name, id: data.id }));
            } else {
                throw Error();
            }
        } catch (error) {
            dispatch(onLogout('Error al registrar usuario'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        try {

            const token = localStorage.getItem('token');
            if (!token || token === 'undefined') return dispatch(onLogout());

            const response = await fetch(`/api/auth?token=${token}`);

            if (response.ok) {
                const data = await response.json() as SimpleUser;
                localStorage.setItem('token', data.token!);
                localStorage.setItem('token-init-date', new Date().getTime().toString());

                dispatch(onLogin({ name: data.name, id: data.id }));
            } else {
                throw Error();
            }
        } catch (error) {
            dispatch(onLogout('Error al validar sesión'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }




    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
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