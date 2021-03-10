import {createSlice} from '@reduxjs/toolkit'
import FirebaseClass from '../service/firebase';

export const slice = createSlice({
  name: 'pokemons',
  initialState: {
    isLoading: false,
    data: {},
    error: null,
  },
  reducers: {
    fetchPokemons: state => ({
      ...state,
      isLoading: true,
    }),
    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isloading: false,
      data: action.payload,
    }),
    fetchPokemonsReject: (state, action) => ({
      ...state,
      isloading: false,
      data: action.payload,
      error: action.payload,
    })
  }
})


export const {fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject} = slice.actions; 

export const selectPokemonLoading = state => state.pokemons.isLoading;
export const selectPokemonData = state => state.pokemons.data;

export const getPokemonsAsync = () => async dispatch => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));

}

export default slice.reducer;