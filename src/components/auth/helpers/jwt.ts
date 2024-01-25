import jwt from 'jsonwebtoken';
import { env } from "~/env";

export const generateJWT = (id: number, name: string) => {

    return new Promise((resolve, reject) => {

        const payload = { id, name };

        jwt.sign(payload, env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err: Error | null, token?: string) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);
        });
    })
}

export const decodeJWT = (token: string) => {
    const decoded = jwt.verify(token, env.SECRET_JWT_SEED);

    return decoded;
}
