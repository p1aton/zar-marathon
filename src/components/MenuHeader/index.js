import { useState } from 'react'; 

import Menu from '../../components/Menu/index.js';
import NavBar from '../../components/Navbar/index.js';

const MenuHeader  = () => {
  const [isActiveMenu, setActiveMenu] = useState(false)
  const handleToggleMenuActive = () => {
    setActiveMenu(!isActiveMenu);
  }

  return (
    <>
      <Menu isActiveMenu={isActiveMenu} />
      <NavBar isActiveMenu={isActiveMenu} toggleMenuActive={handleToggleMenuActive} />
    </>
  )
}

export default MenuHeader;