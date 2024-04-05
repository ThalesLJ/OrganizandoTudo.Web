import React, { useState } from 'react';
import { AiFillLinkedin } from 'react-icons/ai';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {

  const [slide, setSlide] = useState(true);
  const infoControl = useAnimation();
  const formControl = useAnimation();

  const welcomeBack = useAnimation();
  const welcome = useAnimation();
  const loginAction = useAnimation();
  const createAction = useAnimation();

  const toogle = () => {
    setSlide(!slide);

    if (slide) {
      welcome.start({ x: 650, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      createAction.start({ x: -420, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      welcomeBack.start({ x: -650, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      loginAction.start({ x: 420, opacity: 0, display: 'none' }, { duration: 0 }); // Hide

      welcome.start({ opacity: 1, display: 'block' }, { duration: 1 }); // Show
      welcome.start({ x: 0 }, { duration: 1 }); // Show
      createAction.start({ opacity: 1, display: 'block' }, { duration: 1 }); // Show
      createAction.start({ x: 0 }, { duration: 1 }); // Show

      infoControl.start({ x: '60.3vh' }, { duration: 1 }); // Slide
      formControl.start({ x: '-40vh' }, { duration: 1 }); // Slide
    } else {
      welcomeBack.start({ x: -650, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      loginAction.start({ x: 420, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      welcome.start({ x: 650, opacity: 0, display: 'none' }, { duration: 0 }); // Hide
      createAction.start({ x: -420, opacity: 0, display: 'none' }, { duration: 0 }); // Hide

      welcomeBack.start({ opacity: 1, display: 'block' }, { duration: 1 }); // Show
      welcomeBack.start({ x: 0 }, { duration: 1 }); // Show
      loginAction.start({ opacity: 1, display: 'block' }, { duration: 1 }); // Show
      loginAction.start({ x: 0 }, { duration: 1 }); // Show

      infoControl.start({ x: '0%' }, { duration: 1 }); // Slide
      formControl.start({ x: '0%' }, { duration: 1 }); // Slide
    }
  };

  const [width, setWidth] = useState(window.innerWidth);

  setTimeout(() => {
    // alert('Width: ' + width)
  }, 0);

  return (
    <div className='container2 center'>

      {width === 2134 && (
        <div className='login-form'>
          <AnimatePresence>
            <motion.div className='info' animate={infoControl}>

              <AnimatePresence>
                <motion.div initial={{ x: 0, opacity: 1, display: 'block' }} animate={welcomeBack}>
                  <span className='info-txt' onClick={() => toogle()}>Welcome back!</span>
                </motion.div>
              </AnimatePresence>


              <AnimatePresence>
                <motion.div initial={{ x: 650, opacity: 0, display: 'none' }} animate={welcome}>
                  <span className='info-txt' onClick={() => toogle()}>Welcome!</span>
                </motion.div>
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            <motion.div className='login' animate={formControl}>

              <AnimatePresence>
                <motion.div initial={{ x: 0, opacity: 1, display: 'block' }} animate={loginAction}>
                  <span className='login-txt' onClick={() => toogle()}>Login</span>
                  <br /><br /><Link to='/app'><button>Acessar</button></Link>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence>
                <motion.div initial={{ x: -420, opacity: 0, display: 'none' }} animate={createAction}>
                  <span className='login-txt' onClick={() => toogle()}>Create Account</span>
                </motion.div>
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {width < 2134 && width >= 1000 && (
        <div className='login-form2'>

        </div>
      )}

      {width <= 1000 && (
        <div className='login-form3'>

        </div>
      )}

      <div className='rights-container'>
        <a href='https://www.linkedin.com/in/thaleslj/' className='no-decoration'>
          <span className='rights'>by Thales Lima </span>
          <AiFillLinkedin className='rights-linkedin' />
        </a>
      </div>
    </div>
  );
}
