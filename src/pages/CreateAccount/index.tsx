import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgress, FormControl } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import Api from '../../services/Api';
import IUserData from "../../types/IUserData";
import CustomButton from "../../components/CustomButton";
import CustomLink from "../../components/CustomLink";

export default function CreateAccount() {
  const { strings } = useLanguage();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigningUp, setIsSigningUp] = React.useState(false);

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const SignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsSigningUp(true);

    let newUser: IUserData = {
      username: username,
      email: email,
      password: password
    };

    Api.CreateAccount(newUser)
      .then(() => {
        setIsSigningUp(false);
        navigate("/");
      })
      .catch((error) => {
        setIsSigningUp(false);
        alert('Error: ' + error);
      });

    event.preventDefault();
  }

  return (
    <div className='app-unique-containers'>
      <AnimatePresence key='divCreateAccount'>
        <motion.div className='app-unique-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
          <br /><br />
          <span className='login-txtTitulo'>{strings.createAccount_title}</span>
          <br /><br />

          <form onSubmit={SignUp}>
            <FormControl className='login-divUsuario' sx={{ m: 1, width: '25ch' }} variant="outlined">
              <span className='login-txtLabels'>{strings.createAccount_username}</span>
              <OutlinedInput className='login-inputUsuario' id="usuario" type='text' required
                onChange={(e) => { setUsername(e.target.value) }}
              />
            </FormControl>
            <br />
            <FormControl className='login-divEmail' sx={{ m: 1, width: '25ch' }} variant="outlined">
              <span className='login-txtLabels'>{strings.createAccount_email}</span>
              <OutlinedInput className='login-inputEmail' id="email" type='text' required
                onChange={(e) => { setEmail(e.target.value) }}
              />
            </FormControl>
            <br />
            <FormControl className='login-divSenha' sx={{ m: 1, width: '25ch' }} variant="outlined">
              <span className='login-txtLabels'>{strings.createAccount_password}</span>
              <OutlinedInput className='login-inputSenha' id="senha" required
                onChange={(e) => { setPassword(e.target.value) }}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <CustomButton type='submit' variant="contained" width="80%">
              {isSigningUp ? (<CircularProgress size={24} color="inherit" />) : (strings.createAccount_title)}
            </CustomButton>
          </form>
          <div className="login-divCriar">
            <CustomLink to="/" className='login-txtCriar'>{strings.createAccount_accessAccount}</CustomLink>
          </div>
          <br /><br />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
