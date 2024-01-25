import Image from "next/image";

import { useAuth } from "~/hooks";

import pokedex from "../assets/JEXmMJ-800_1.png";

export default function Home() {


  useAuth();


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
