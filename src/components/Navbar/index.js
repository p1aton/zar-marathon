import cn from 'classnames';
import s from './style.module.css';
import { ReactComponent as LoginSVG } from '../../assets/login.svg'

const NavBar = ({ isOpen, bgActive = false, onClickHamburg, onClickLogin }) => {
  return (
    <nav id={s.navbar} className={cn({
      [s.bgActive]: bgActive
    })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>
          LOGO
        </p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap}>
            <LoginSVG
              onClick={onClickLogin}
            />
          </div>

          <div
            className={cn(s.menuButton, {
              [s.active]: isOpen
            })}
            onClick={onClickHamburg}>
            <span />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;