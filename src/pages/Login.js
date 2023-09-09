import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';

export default function Login() {

  const [login, setLogin] = useState(true);

  const toogle = () => {
    if (login === true) {
      setLogin(false);
    } else {
      setLogin(true);
    }
  };

  return (
    <div className='container2 center'>
      <div className="loginForm">

        <div className='welcome'>
          <span>welcome</span>
        </div>

        <div id='login' className={login === true ? 'vis fade' : 'invis'}>
          <span onClick={() => toogle()}>login</span>
        </div>

        <div id='create' className={login === true ? 'invis' : 'vis'}>
          <span onClick={() => toogle()}>create</span>
        </div>

      </div>

      <div className='rights-container'>
        <span className='rights'>by Thales Lima </span>
        <a href='https://www.linkedin.com/in/thaleslj/'><AiFillLinkedin className='rights-linkedin' /></a>
      </div>
    </div>
  );
}
