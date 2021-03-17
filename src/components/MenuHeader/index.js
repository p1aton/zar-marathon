import { useState } from 'react';
import Menu from '../../components/Menu/index.js';
import NavBar from '../../components/Navbar/index.js';
import LoginForm from '../LoginForm/index.js';
import Modal from '../Modal/index.js';
import {NotificationManager} from 'react-notifications';


const loginSignupUser = async ({email, password, type}) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    })
  };

  switch (type) {
    case 'signup': 
      return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuLSTvajHJ_NH4Ton-KtdLifW2xUzbsDQ', requestOptions).then(res => res.json());
    case 'login':
      return await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDuLSTvajHJ_NH4Ton-KtdLifW2xUzbsDQ', requestOptions).then(res => res.json());
    default:
      return 'I cannot login user';
  }

}

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleClickHamburg = () => {
    setOpen(prevState => !prevState);
  }

  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  }

  const handleSubmitLoginForm = async (props) => {
  
    const response = await loginSignupUser(props);
    console.log("🚀 ~ file: index.js ~ line 45 ~ handleSubmitLoginForm ~ responce", response)

    if (response.hasOwnProperty('error')) {
      NotificationManager.error(response.error.message, 'Wrong!');
    } else {
      if (props.type === 'signup') {
        const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res => res.json());
        console.log("🚀 ~ file: index.js ~ line 52 ~ handleSubmitLoginForm ~ pokemonsStart", pokemonsStart)

        for (const item of pokemonsStart.data) {
          await fetch(`https://pocemon-game-dfe23-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}` , {
              method: 'POST',
              body: JSON.stringify(item)
          });
        }
      }
      localStorage.setItem('idToken', response.idToken);
      NotificationManager.success('Success message');
      handleClickLogin(); 
    }
  }

  return (
    <>
      <Menu
        isOpen={isOpen}
        onChangeActive={handleClickHamburg}
      />
      <NavBar
        isOpen={isOpen}
        bgActive={bgActive}
        onClickHamburg={handleClickHamburg}
        onClickLogin={handleClickLogin}
      />
      <Modal
        isOpen={isOpenModal}
        title='Log in'
        onCloseModal={handleClickLogin}
      >
      <LoginForm
        isResetField={!isOpenModal}
        onSubmit={handleSubmitLoginForm}
      />
      </Modal>
    </>
  )
}

export default MenuHeader;