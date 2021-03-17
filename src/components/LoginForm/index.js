import { useEffect, useState } from "react";
import s from './style.module.css';




const LoginForm = ({ onSubmit, isResetField = false }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setLogin] = useState(true);

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, [isResetField]);



  const handleSubmit = (e) => {
    e.preventDefault();

      
    onSubmit && onSubmit({
      type: isLogin ? 'login': 'signup',
      email,
      password
    });
    setEmail('');
    setPassword('');
  }


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input 
          value={email}
          type="text" 
          name="email" 
          onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input 
          value={password}
          type="password" 
          name="password" 
          onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={s.flex}>
        <button 
          className={s.button}>
          {isLogin ? 'Login': 'Signup'}
        </button>
        <div 
          className={s.link}
          onClick={() => setLogin(!isLogin)}
          >
          {isLogin ? 'Register' : 'Login' }
        </div>
      </div>
    </form>
  )
};



export default LoginForm;