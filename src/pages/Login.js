import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {

  const [login, setLogin] = useState(true);
  const [sign, setSign] = useState(false);

  const toogleLogin = () => {
    if (login === true) {
      setLogin(false);
      setSign(true);
    } else {
      setLogin(true);
      setSign(false);
    }
  };

  const toogleSign = () => {
    if (sign === true) {
      setSign(false);
      setLogin(true);
    } else {
      setSign(true);
      setLogin(false);
    }
  };

  return (
    <div className='container2 center'>
      <div className="loginForm">

        {login === true && (
          <AnimatePresence>
            <motion.div className="width100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ scale: 0 }} >
              <span onClick={() => toogleLogin()}>login</span><br/><br/>
              <Link to="/app"><button>Login</button></Link>
            </motion.div>
          </AnimatePresence>
        )}

        {sign === true && (
          <AnimatePresence>
            <motion.div className="width100"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              exit={{ scale: 0 }} >
              <span onClick={() => toogleSign()}>create</span>
            </motion.div>
          </AnimatePresence>
        )}

      </div>

      <a href='https://www.linkedin.com/in/thaleslj/' className='rights-container'>
        <span className='rights'>by Thales Lima </span>
        <AiFillLinkedin className='rights-linkedin' />
      </a>
    </div>
  );
}
