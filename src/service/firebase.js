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
  
  export const fire = firebase;
  export const database = firebase.database();

  export default database;

