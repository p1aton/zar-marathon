import { useState } from 'react';
import Layout from '../../components/Layout';
import PokemonCard from '../../components/PokemonCard';

import s from './style.module.css';

import POKEMONS from '../../components/Data/pokemon.json';

const GamePage = () => {
    const [pokemons, setPokemons] = useState(POKEMONS);

    const handleClickCard = (id) => {
        setPokemons(prevState => {
            const stateCopy = JSON.parse(JSON.stringify(prevState));
            return stateCopy.map(pokemons => {
                if (pokemons.id === id) {
                    pokemons.isActive = !pokemons.isActive;
                }
                return pokemons;
            });
        })
    };

  return (
    <>

<Layout id={2}  title='Layout 2 title' descr='description' colorBg='#777' >
      <div className={s.flex}>
          {pokemons.map((item, index) => <PokemonCard 
            onCardClick={handleClickCard}
            isActive={item.isActive}
            key={index}
            id={item.id}
            name={item.name}
            img={item.img}
            type={item.type}
            values={item.values}
          />)}
        </div>
      </Layout>
    </>
  );
};

export default GamePage;