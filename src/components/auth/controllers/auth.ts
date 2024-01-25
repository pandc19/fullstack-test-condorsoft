import { PrismaClient } from '@prisma/client';
import { type User } from '../interfaces/user';

const prisma = new PrismaClient()

export const login = async (email: string): Promise<User | undefined> => {
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        // console.log(createdUser)

        return user as User;
    } catch (error) {
        console.error("Error authenticating: ", error);
        throw new Error("Internal Server Error");
    }
}

