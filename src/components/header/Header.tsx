import Image from 'next/image';
import React from 'react'

import pokemonLogo from "../../assets/image_3.png";
import { Navbar } from './Navbar';


export const Header = () => {
    return (
        <div className="flex flex-col h-28 items-center justify-center text-center bg-black/70">
            <Image src={pokemonLogo.src}
                width={108.51}
                height={40}
                alt="logo"
                priority={true}
            />

            <Navbar />
        </div>
    );
}
