import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user'
import pokemonsReducer from './pokemons'


export default configureStore({
  reducer: {
    user: userReducer,
    pokemons: pokemonsReducer
  }
});