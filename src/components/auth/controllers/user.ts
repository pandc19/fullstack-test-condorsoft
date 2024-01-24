import { PrismaClient } from '@prisma/client';
import { type User } from '../interfaces/user';
import { type RegisterForm } from '../interfaces/register-form';

const prisma = new PrismaClient()

export const createUser = async ({ registerEmail, registerName, registerPassword }: RegisterForm): Promise<User> => {
    try {
        const createdUser: User = await prisma.user.create({
            data: {
                name: registerName,
                email: registerEmail,
                password: registerPassword
            },
        })
        // console.log(createdUser)

        return createdUser;

    } catch (error) {
        console.error("Error creating user: ", error);
        throw new Error("Internal Server Error");
    }
}
