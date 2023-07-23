const pokedexReducer = (state, action) => {
  switch (action.type) {
    case `SET_POKEMON_INFO`:
      return { ...state, pokemonInfo: action.payload };
    case `TOGGLE_SHINY_IMAGE`:
      return {
        ...state,
        isShiny: !state.isShiny,
      };
    default:
      return state;
  }
};

export default pokedexReducer;
