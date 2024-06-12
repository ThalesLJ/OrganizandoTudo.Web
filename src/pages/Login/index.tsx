import * as React from 'react';
import "./styles.css";
import { AnimatePresence, motion } from 'framer-motion';
import { Button, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AiFillLinkedin } from 'react-icons/ai';
import ILogin from '../../types/ILogin';
import useSimplePost from '../../services/useSimplePost.ts';

export default function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const { send, sucess, error } = useSimplePost();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    const login: ILogin = {
      apelido: username,
      senha: password
    };

    try {
      send({ url: 'Login', data: login });
      if (!sucess) alert(error);
    } catch (ex) {
      ex && alert(ex);
    }

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
    <div className='container'>
      <AnimatePresence key='divLogin'>
        <motion.div className='login' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
          <br /><br />
          <span className='login-txtTitulo' onClick={() => { }}>Login</span>
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
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end" > {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>

            <br /><br />

            <ColorButton type='submit' className='login-btnAcessar' variant="contained">Acessar</ColorButton>

          </form>

          <br /><br /><br /><br />

          <div className='login-rightsContainer'>
            <a href='https://www.linkedin.com/in/thaleslj' className='no-decoration'>
              <span className='login-rights'>Thales Lima </span>
              <AiFillLinkedin className='login-rightsLinkedin' />
            </a>
          </div>
          <br /><br />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
