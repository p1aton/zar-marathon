import { useState } from 'react'; 

import Menu from '../../components/Menu/index.js';
import NavBar from '../../components/Navbar/index.js';

const MenuHeader  = ({bgActive}) => {
  const [isOpen, setOpen] = useState(null);

  const handleClickHamburg = () => {
    setOpen(prevState => !prevState);
  }

  return (
    <>
      <Menu isOpen={isOpen} onChangeActive={handleClickHamburg}/>
      <NavBar isOpen={isOpen} bgActive={bgActive} onClickHamburg={handleClickHamburg} />
    </>
  )
}

export default MenuHeader;