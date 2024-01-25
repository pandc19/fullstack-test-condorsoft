'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react'
import { BiLogOut } from 'react-icons/bi';
import { useAuthStore } from '~/hooks';

const menuItems = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/pokedex',
        title: 'Pokedex',
    },
    {
        path: '/team',
        title: 'Mi Equipo',
    },
]

export const Navbar = () => {
    const currentPath = usePathname();

    const { status, startLogout, checkAuthToken } = useAuthStore();

    useEffect(() => {
        void checkAuthToken();
    }, []);

    if (status !== 'authenticated') {
        return (
            <></>
        );
    }

    return (
        <div className="flex space-x-28">
            <div className="flex space-x-28 pt-2.5">
                {
                    menuItems.map(item => (
                        <Link key={item.path}
                            href={`${item.path}`}
                            className={` text-white text-base ${currentPath === item.path ? 'underline font-semibold' : 'font-medium'}`}
                        >
                            {item.title}
                        </Link>
                    ))
                }
            </div>

            <button className="flex items-center justify-center rounded-xl bg-white text-black text-base font-medium hover:bg-gray-400 transition-all w-[100px] mr-2"
                onClick={startLogout}
            >
                <BiLogOut />
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    );
}
