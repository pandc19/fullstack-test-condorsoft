import { PrismaClient } from '@prisma/client';
import { type UserTeam } from '~/components';

const prisma = new PrismaClient()

export const createUserTeam = async (team: UserTeam): Promise<UserTeam> => {
    try {
        const createdTeam: UserTeam = await prisma.userTeam.create({
            data: {
                ...team
            },
        });
        console.log(createdTeam)

        return createdTeam;

    } catch (error) {
        console.error("Error creating team member: ", error);
        throw new Error("Internal Server Error");
    }
}

export const getUserTeam = async (userId: number): Promise<UserTeam[]> => {
    try {
        const team = await prisma.userTeam.findMany({
            where: { userId },
        });

        return team as UserTeam[];
    } catch (error) {
        console.error("Error authenticating: ", error);
        throw new Error("Internal Server Error");
    }
}

export const deleteUserTeam = async (userId: number) => {
    try {
        console.log('delete')
        await prisma.userTeam.deleteMany({
            where: { userId },
        });

    } catch (error) {
        console.error("Error deleting team: ", error);
        throw new Error("Internal Server Error");
    }
}