import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import { Button, styled } from '@mui/material';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AiFillLinkedin } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LogoNegativo from '../assets/icone-negativo/logo.png';
import FolhinhaPositiva from '../assets/folhinha-positiva.png';

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const ColorButton = styled(Button)(({ theme }) => ({
    color: '#ffe3d5',
    backgroundColor: '#946a56',
    '&:hover': {
      backgroundColor: '#a87861',
      color: '#e2c8bc'
    },
  }));

  return (
    <div className='container2 center'>

      <motion.div className='login' initial={{ x: 0, opacity: 1, display: 'block' }}>
        <AnimatePresence>

          <br /><br />
          <span className='login-txtTitulo' onClick={() => { }}>Login</span>
          <br /><br /><br />

          <FormControl className='login-divUsuario' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <span className='login-txtLabels'>Usuário</span>
            <OutlinedInput className='login-inputUsuario' id="usuario" type='text' />
          </FormControl>

          <br />

          <FormControl className='login-divSenha' sx={{ m: 1, width: '25ch' }} variant="outlined">
            <span className='login-txtLabels'>Senha</span>
            <OutlinedInput className='login-inputSenha' id="senha" type={showPassword ? 'text' : 'password'}
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

          <Link to='/app'><ColorButton className='login-btnAcessar' variant="contained">Acessar</ColorButton></Link>

          <br /><br /><br /><br />

          <div className='rights-container'>
            <a href='https://www.linkedin.com/in/thaleslj' className='no-decoration'>
              <span className='rights'>Thales Lima </span>
              <AiFillLinkedin className='rights-linkedin' />
            </a>
          </div>
          <br /><br />

        </AnimatePresence>
      </motion.div>

      <div className='login-logo'>
        <img alt='OrganizandoTudo' src={LogoNegativo} />
        <span>OrganizandoTudo</span>
      </div>

      <div className='login-folhinha'>
        <img alt='' src={FolhinhaPositiva} />
      </div>

    </div>
  );
}
