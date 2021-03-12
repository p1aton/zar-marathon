import { useState } from "react";




const LoginForm = ({ onSubmit }) => {

  const [email, setEmail] = useState('some@mail.ru');
  const [password, setPassword] = useState('');



  const handleSubmit = (e) => {
    e.preventDefault();

      
    onSubmit && onSubmit({
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
      <button>
        Login
      </button>
    </form>
  )
};



export default LoginForm;