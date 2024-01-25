import Image from "next/image";

import { useAuth } from "~/hooks";

import pokedex from "../assets/JEXmMJ-800_1.png";
import { useEffect } from "react";
import { setTeamPokemons } from "~/store/pokemons/pokemonSlice";
import { useAppDispatch, useAppSelector } from "~/store";
import { SimplePokemon, SimpleUser, UserTeam } from "~/components";

export default function Home() {




  useAuth();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user) as SimpleUser;

  useEffect(() => {
    const getTeam = async (userId: number): Promise<UserTeam[]> => {

      const response = await fetch(`/api/user-team?userId=${userId}`);

      if (!response.ok) {
        const errorData = await response.json() as { message: string };
        throw new Error(errorData.message);
      }

      return response.json();
    }

    const fetchData = async () => {
      try {
        const team = await getTeam(user.id);

        const userTeamObject = team.reduce((result, teamMember) => {
          result[teamMember.pokemonId] = {
            id: teamMember.pokemonId.toString(),
            name: teamMember.pokemonName,
          };
          return result;
        }, {} as Record<number, SimplePokemon>);

        localStorage.setItem('pokemon-team', JSON.stringify(userTeamObject));

        dispatch(setTeamPokemons(userTeamObject));
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    void fetchData();
  }, []);


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
