import "./index.css";
import PokemonCard from "./PokemonCard";
import { useEffect, useState } from "react";


const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const API = `https://pokeapi.co/api/v2/pokemon?limit=124`;

  const FetchPockmon = async () => {
    try {
      const res = await fetch(API); //Data fetch kra liya ha hum na API wala
      const data = await res.json(); //
      //   console.log(data);
      const DetailedPockData = data.results.map(async (curpokemon) => {
        const res = await fetch(curpokemon.url); //API wala jo data ha us ka ander wala
        const data = await res.json(); //bhe fetch kr liya data hum ha map array chala kr
        return data;
      });
      // console.log(DetailedPockData);
      const Detailedresponse = await Promise.all(DetailedPockData); //jo data hum ko promise
      setPokemon(Detailedresponse); //ka rupe ma mil ha husdata ko convert krana kaliya ak method chalta ha Promises .all method ha
      // console.log(Detailedresponse);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false)
      setError(error);
    }
  };

  useEffect(() => {
    FetchPockmon();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //search functionality

  const searchData = pokemon.filter((curPokemon) =>
    curPokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>{error.message}</h1>
      </div>
    );
  }

  return (
    <>
      <section className="container">
        <header>
          <h1>Lets Catch Pokémon</h1>
        </header>
        <div className="pokemon-search">
          <input
            type="text"
            placeholder="search Pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div>
          <ul className="cards">
                    {searchData.map((curpokemon) => {
                        return(
                            <PokemonCard key={curpokemon.id} PokemonData={curpokemon} />
                        )
                    })}
                
          </ul>
        </div>
      </section>
    </>
  );
};
export default Pokemon;
