import { string, bool } from 'prop-types';
import cn from 'classnames';

import s from './style.module.css';

const Button = ({ name, primary, disabled,  ...props }) => {
  const btnClass = cn(
    s.btn,
    {
      [s.btnPrimary]: primary
    }
  );

  return(
    <>
      <button className={btnClass} disabled={disabled} {...props}>
        { name }
      </button>
    </>
  );
};

Button.propTypes = {
  name: string.isRequired,
  primary: bool,
  disabled: bool
};

export default Button;