import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PokemonCard from '../../../../components/PokemonCard/index.js';
// import { FireBaseContext } from '../../../../context/firebaseContext.js';
import { PokemonContext } from '../../../../context/pokemonContext.js';
import { getPokemonsAsync, selectPokemonData, selectPokemonLoading } from '../../../../Store/pokemons.js';
import s from './style.module.css';




const StartPage = () => {
    // const firebase = useContext(FireBaseContext); 
    const pokemonsContext = useContext(PokemonContext)
    const history = useHistory();
    const isLoading = useSelector(selectPokemonLoading)
    const pokemonsRedux = useSelector(selectPokemonData); 
    const dispatch = useDispatch();
    const [pokemons, setPokemons] = useState({});
    


    useEffect(() => {
      dispatch(getPokemonsAsync());
  
    }, []);

    useEffect(() => {
      setPokemons(pokemonsRedux);
    }, [pokemonsRedux]);
    


    const handleChangeSelected = (key) => {
      const pokemon = { ...pokemons[key] };
      pokemonsContext.onSelectedPokemons(key, pokemon);
      setPokemons(prevState => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          selected: !prevState[key].selected,
        }
      }
      ))
    };

    const handleStartGameClick = () => {
      history.push('/game/board');
    }


   
  return (
    <>
      <button 
      className={s.button} 
      onClick={handleStartGameClick}
      disabled={Object.keys(pokemonsContext.pokemons).length < 5}
      >Start Game
      </button>
      <div className={s.flex}>
          {
            Object.entries(pokemons).map(([key, {name, img, id, type, values, selected}]) => 
            <PokemonCard 
            className={s.card}
            isActive={true}
            key={key}
            id={id}
            name={name}
            img={img}
            type={type}
            values={values}
            isSelected={selected}
            onClickCard={() => {
              if (Object.keys(pokemonsContext.pokemons).length < 5 || selected) { 
                  handleChangeSelected(key) }
          }}
          />)}
        </div>
    </>
  );
};


export default StartPage;