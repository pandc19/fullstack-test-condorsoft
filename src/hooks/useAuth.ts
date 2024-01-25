
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '.';

export const useAuth = () => {
    const router = useRouter();

    const { status, checkAuthToken } = useAuthStore();


    useEffect(() => {
        void checkAuthToken();
    }, []);

    if (status === 'not-authenticated') {
        void router.push('/auth');
    }
};
