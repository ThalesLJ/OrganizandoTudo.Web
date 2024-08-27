import "./styles.css";
import * as React from 'react';
import { Observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, CircularProgress, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import ILogin from '../../types/ILogin';
import { Link, useNavigate } from "react-router-dom";
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import TokenValidator from '../../services/TokenValidator';

export default function Login() {
  TokenValidator();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogging, setIsLogging] = React.useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLogging(true);

    const login: ILogin = {
      username: username,
      password: password
    };

    Api.Login(login)
      .then((result) => {
        Auth.login({ username: result.username, email: result.email, token: result.token });
        setIsLogging(false);
        if (result.token != null) navigate("/Notes");
      })
      .catch((error) => {
        setIsLogging(false);
        alert('Promise rejected with error: ' + error);
      });

    event.preventDefault();
  }

  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffe3d5',
    backgroundColor: '#946a56',
    '&:hover': {
      backgroundColor: '#a87861',
      color: '#e2c8bc'
    },
  }));

  return (
    <Observer>
      {() => (
        <div className='app-container'>
          <AnimatePresence key='divLogin'>
            <motion.div className='login' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >

              <br /><br />
              <span className='login-txtTitulo'>Login</span>
              <br /><br />

              <form onSubmit={Login}>

                <FormControl className='login-divUsuario' sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <span className='login-txtLabels'>Usuário</span>
                  <OutlinedInput className='login-inputUsuario' id="usuario" type='text' required
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
                </FormControl>

                <br />

                <FormControl className='login-divSenha' sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <span className='login-txtLabels'>Senha</span>
                  <OutlinedInput className='login-inputSenha' id="senha" required
                    onChange={(e) => { setPassword(e.target.value) }}
                    type={
                      showPassword ? 'text' : 'password'
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end" >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>

                <br />

                <ColorButton type='submit' className='login-btnAcessar' variant="contained">
                  {isLogging ? (<CircularProgress size={24} color="inherit" />) : ('Acessar')}
                </ColorButton>

              </form>

              <div className="login-redirects">
                <Link to="/AddAccount" className='login-txtCriar'>Criar Conta</Link>
                <Link to="/RecoveryAccount" className='login-txtRecuperar'>Recuperar Senha</Link>
              </div>

              <div className='login-rightsContainer'>
                <span>
                  <a href='https://www.linkedin.com/in/thaleslj' className='no-decoration'>
                    <AiFillLinkedin className='login-rightsLinkedin' />
                  </a>
                  <a href='https://github.com/ThalesLJ' className='no-decoration'>
                    <AiFillGithub className='login-rightsLinkedin' />
                  </a>
                </span>
              </div>
              <br /><br />

            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Observer>
  )
}
