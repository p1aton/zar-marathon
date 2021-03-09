import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PokemonContext } from '../../../../context/pokemonContext.js';
import { FireBaseContext } from '../../../../context/firebaseContext.js';
import PokemonCard from '../../../../components/PokemonCard';
import s from './style.module.css';
import Button from '../../../../components/UI/Controls/Button/index.js';

const FinishPage = () => {
  const history = useHistory();
  
  const firebase = useContext(FireBaseContext);
  const { cardsInGame, gameResult } = useContext(PokemonContext);
  console.log("🚀 ~ file: index.js ~ line 13 ~ FinishPage ~ cardsInGame", cardsInGame)
  console.log("🚀 ~ file: index.js ~ line 13 ~ FinishPage ~ gameResult", gameResult)
  
  // const [isPokemonAdded, setPokemonAdded] = useState(false);
  // console.log("🚀 ~ file: index.js ~ line 18 ~ FinishPage ~ setPokemonAdded", setPokemonAdded)
  // console.log("🚀 ~ file: index.js ~ line 17 ~ FinishPage ~ isPokemonAdded", isPokemonAdded)

  const [selectedCard, setSelectedCard] = useState(null);
  console.log("🚀 ~ file: index.js ~ line 22 ~ FinishPage ~ setSelectedCard", setSelectedCard)
  console.log("🚀 ~ file: index.js ~ line 22 ~ FinishPage ~ selectedCard", selectedCard)


  const handleClickCard = (card) => () => {
    if (selectedCard === card) setSelectedCard(null);
    else setSelectedCard(card);
}

const handleClickEndGame = () => {
    if (gameResult === "WIN") {
      history.push('/game');
      firebase.addPokemon(selectedCard, () => console.log( 'new pokemon added'));
    }
    
    
}


  if (gameResult !== "WIN") {
    history.replace('/game');
  }


//   const handleEndGameClick = () => {
//     history.push('/game');
//   };


// /**
//  * 
//  * Не отправляет в базу покемона
//  */
//   const handleAddNewPokemon = async (card) => {
//     if (gameResult === 'WIN') { 
//       setPokemonAdded(true);
//       await firebase.addPokemon(card, () => console.log( 'new pokemon added' ));
//     }
//   };

  


  return(
    <>
      <div className={s.flex}>
        {
          cardsInGame.player1Cards.map(card =>
            <PokemonCard
              key={card.id}
              id={card.id}
              className={s.card}
              name={card.name}
              type={card.type}
              values={card.values}
              img={card.img}
              isActive />
          )
        }
      </div>
      <div className={s.buttonWrapper}>
        <Button
          name="End Game"
          primary
          onClick={handleClickEndGame}
        />
      </div>
      <div className={s.flex}>
        {
          cardsInGame.player2Cards.map(card =>
            <PokemonCard
              key={card.id}
              id={card.id}
              className={s.card}
              name={card.name}
              type={card.type}
              values={card.values}
              img={card.img}
              isActive
              onClickCard={handleClickCard(card)}
              // onCardClick={ () => {
              //   if (gameResult === 'WIN') {
              //     handleAddNewPokemon(card)
              //   }
              // }}
            />
          )
        }
      </div>
    </>
  );
};

export default FinishPage;