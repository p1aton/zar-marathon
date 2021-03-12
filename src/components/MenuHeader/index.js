import { useState } from 'react';
import Menu from '../../components/Menu/index.js';
import NavBar from '../../components/Navbar/index.js';
import LoginForm from '../LoginForm/index.js';
import Modal from '../Modal/index.js';

import {NotificationManager} from 'react-notifications';

const MenuHeader = ({ bgActive }) => {
  const [isOpen, setOpen] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleClickHamburg = () => {
    setOpen(prevState => !prevState);
  }

  const handleClickLogin = () => {
    setOpenModal(prevState => !prevState);
  }

  const handleSubmitLoginForm = async ({email, password}) => {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      })
    }
    const responce = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDuLSTvajHJ_NH4Ton-KtdLifW2xUzbsDQ', requestOptions).then(res => res.json());
    console.log("🚀 ~ file: index.js ~ line 30 ~ handleSubmitLoginForm ~ responce", responce)
    if (responce.hasOwnProperty('error')) {
      NotificationManager.error(responce.error.message, 'Wrong!');
    } else {
      localStorage.setItem('idToken', responce.idToken);
      NotificationManager.success('Success message');
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
        onSubmit={handleSubmitLoginForm}
      />
      </Modal>
    </>
  )
}

export default MenuHeader;