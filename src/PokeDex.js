import React, { useState, useReducer } from 'react';
import axios from 'axios';
import pokedexReducer from './pokedexReducer';
import 'tachyons';

const PokeDex = () => {
  const [pokemonId, setPokemonId] = useState('');
  const initialState = { pokemonInfo: null, isShiny: false };
  const [state, dispatch] = useReducer(pokedexReducer, initialState);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      dispatch({ type: `SET_POKEMON_INFO`, payload: response.data });
    } catch (error) {
      console.error(`Error Fetching Pokemon Information`, error);
    }
  };

  const toggleShinyButton = () => {
    dispatch({ type: `TOGGLE_SHINY_IMAGE` });
  };

  return (
    <>
      <h1>PokeDex App</h1>
      <div>
        <input
          type="text"
          value={pokemonId}
          onChange={e => setPokemonId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        {state.pokemonInfo && (
          <div>
            <h2>{state.pokemonInfo.name}</h2>
            <img
              src={
                state.isShiny
                  ? state.pokemonInfo.sprites.front_shiny
                  : state.pokemonInfo.sprites.front_default
              }
              alt={state.pokemonInfo.name}
            />
            <button onClick={toggleShinyButton}>
              {state.isShiny
                ? `Show me ${state.pokemonInfo.name}`
                : `Show me shiny ${state.pokemonInfo.name}`}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PokeDex;
