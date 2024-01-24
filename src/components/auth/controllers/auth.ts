import { PrismaClient } from '@prisma/client';
import { type User } from '../interfaces/user';
import { type LoginForm } from '../interfaces/login-form';

const prisma = new PrismaClient()

export const login = async ({ loginEmail, loginPassword }: LoginForm): Promise<User[]> => {
    try {
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    { email: loginEmail },
                    { password: loginPassword },
                    // Add more fields as needed for your search
                ],
            },
        });
        // console.log(createdUser)

        return users as User[];

    } catch (error) {
        console.error("Error authenticating: ", error);
        throw new Error("Internal Server Error");
    }
}
