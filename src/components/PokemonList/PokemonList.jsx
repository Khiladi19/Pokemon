import { useEffect } from 'react';
import axios from 'axios';
import './PokemonList.css'
import { useState } from 'react';
import Pokemon from '../Pokemon/Pokemon.jsx';



export  function PokemonList(){


    const [pokedexUrl,setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon")
    const [ pokemonList, setPokemonList] = useState([]);
    const [ isLoading, setIsLoading] = useState(true);

    const  [prevUrl,setPrevUrl] = useState('');

    const [nextUrl,setNextUrl] = useState('');




    async function downloadPokemon(){
        setIsLoading(true)
        const response = await axios.get(pokedexUrl);
        const pokemonRestult = response.data.results;
        console.log(response.data);
        const PokekonRestltPromise =  pokemonRestult.map((Pokemon)=> axios.get(Pokemon.url))
        const pokemondata = await axios.all(PokekonRestltPromise)
        const res = pokemondata.map((PokeData)=>{
            const pokemon = PokeData.data;
            return {
                id:pokemon.id,
                key:pokemon.id,
                name:pokemon.name,
                image:(pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types:pokemon.types,

            } 
        })
        // console.log(res);
        setPokemonList(res);
        setIsLoading(false);
        setNextUrl(response.data.next)
        setPrevUrl(response.data.previous)
    }
    useEffect(()=>{
        downloadPokemon();
    },[pokedexUrl])
    return(
        <div className="pokemon-list-wrapper">
            <div>List of Pokemon</div>
            <div className='pokemon-wrapper'>
            {
            (isLoading) ? 'Loading....': 
             pokemonList.map((p)=>
                <Pokemon 
                name={p.name} 
                image={p.image} 
                key={p.id}
                id={p.id}
                />
             )
            }
            </div>
        <div className="controls">
            <button disabled={prevUrl == null}onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
            <button disabled={nextUrl == null}onClick={()=>setPokedexUrl(nextUrl)}>Next</button>      
        </div>
        </div>
    )
}

