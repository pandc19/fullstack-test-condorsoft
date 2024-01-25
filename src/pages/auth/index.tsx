import React, { type FormEvent, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '~/hooks';
import type { LoginForm, RegisterForm } from '~/components';
import { useRouter } from 'next/router';


const loginFormFields: LoginForm = {
    loginEmail: '',
    loginPassword: '',
}

const registerFormFields: RegisterForm = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

export default function LoginPage() {

    const router = useRouter();


    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm<LoginForm>(loginFormFields);
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm<RegisterForm>(registerFormFields);

    const loginSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await startLogin({ loginEmail, loginPassword });

        await router.push('/');

    }

    const registerSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (registerPassword !== registerPassword2) {
            await Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error');
            return;
        }

        await startRegister({ registerName, registerEmail, registerPassword, registerPassword2 });

        await router.push('/');
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            void Swal.fire('Error', errorMessage, 'error');
        };

    }, [errorMessage]);


    return (
        <div className="flex justify-center items-center rounded-lg w-[1280px] h-[599px] mx-auto bg-black/70 bg-clip-border shadow-lg p-3">
            <div className="flex gap-10">
                <div className="flex flex-col items-center text-center p-6 bg-[#272727] w-[566px] h-[421px] rounded-lg">
                    <h3 className="py-10 text-white text-xl font-semibold">Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="bg-white text-black text-base font-normal rounded-[15px] h-[35px] w-full"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-[#272727] w-[566px] h-[421px] rounded-lg">
                    <h3 className="py-10 text-white text-xl font-semibold">Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control pl-2 rounded w-[300px] h-[35px]"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="bg-white text-black text-base font-normal rounded-[15px] h-[35px] w-full"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}