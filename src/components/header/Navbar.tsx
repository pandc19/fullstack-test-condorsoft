'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const menuItems = [
    {
        path: '/auth',
        title: 'Login',
    },
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
    {
        path: '/logout',
        title: 'Logout',
    },
]

export const Navbar = () => {
    const currentPath = usePathname();

    return (
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


    );
}
