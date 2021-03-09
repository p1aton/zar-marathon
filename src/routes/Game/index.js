import { useRouteMatch, Route, Switch, useHistory  } from "react-router-dom";
import { useState, useEffect  } from 'react';


import StartPage from './routes/Start/index.js';
import BoardPage from './routes/Board/index.js';
import FinishPage from './routes/Finish/index.js';
import { PokemonContext } from "../../context/pokemonContext.js";





const GamePage = () => {
  const [selectedPokemons, setSelectedPokemons] = useState({});
 
  
  const match = useRouteMatch();
  const history = useHistory();
  
  const [gameResult, setGameResult] = useState(null);
  const [cardsInGame, setCardsInGame] = useState({ player1Cards: [], player2Cards: []});

  
  useEffect(() => {
    const unlisten = history.listen(({ pathname }) => {
      if (pathname === '/game') {
        setSelectedPokemons({});
        setGameResult(null);
        setCardsInGame({ player1Cards: [], player2Cards: []});
      }
    });

    return () => {
      unlisten();
    }
  }, [history]);  




  const handleSelectedPokemons = (key, pokemon) => {
    setSelectedPokemons(prevState => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];

        return copyState;
      }

      return {
        ...prevState,
        [key]: pokemon,
      }
    })
  }

  //   const clearPokemonContext = () => {
  //     setSelectedPokemons({});
  //     setGameResult([]);
  // }

  const handlePlayersCardsFetched = (player1Cards, player2Cards) => {
    setCardsInGame({ player1Cards: player1Cards, player2Cards: player2Cards });
  };

  const handleGameFinished = (result) => {
    setGameResult(result);
    history.push('/game/finish');
  };


  return (
    <PokemonContext.Provider value={{
      pokemons: selectedPokemons,
      cardsInGame,
      gameResult,
      onSelectedPokemons: handleSelectedPokemons,
      onPlayersCardsFetched: handlePlayersCardsFetched,
      onGameFinished: handleGameFinished

    }}>
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};

export default GamePage;