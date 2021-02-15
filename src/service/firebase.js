import firebase from "firebase/app";
import 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyDuLSTvajHJ_NH4Ton-KtdLifW2xUzbsDQ",
    authDomain: "pocemon-game-dfe23.firebaseapp.com",
    databaseURL: "https://pocemon-game-dfe23-default-rtdb.firebaseio.com",
    projectId: "pocemon-game-dfe23",
    storageBucket: "pocemon-game-dfe23.appspot.com",
    messagingSenderId: "403311329751",
    appId: "1:403311329751:web:07e1ccb43501979bc64b92"
  };

  
  firebase.initializeApp(firebaseConfig);
  

  class Firebase {
    constructor() {

      this.fire = firebase;
      this.database = this.fire.database();
    }

    getPokemonSocet = (cb) => {
      this.database.ref('pokemons').on('value', (snapshot) => {
        cb(snapshot.val());
      })
    }

    offPokemonSocet = () => {
      this.database.ref('pokemons').off();
    }

    getPokemonsOnce = async () => {
      return await this.database.ref('pokemons').once('value').then(snapshot => snapshot.val());
    }

    postPokemon = (key, pokemon) => {
      this.database.ref(`pokemons/${key}`).set(pokemon);
    }

    addPokemon = (data, cb) => {
      const newKey = this.database.ref().child('pokemons').push().key;
      this.database.ref('pokemons/' + newKey).set(data);
    }

    

  }
  


  export default Firebase;

