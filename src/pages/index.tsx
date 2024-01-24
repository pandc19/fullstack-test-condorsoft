import Image from "next/image";

import pokedex from "../assets/JEXmMJ-800_1.png";


export default function Home() {

  return (
    <>
      <Image src={pokedex.src}
        width={713}
        height={520}
        alt="pokedex"
      />
    </>
  );
}
