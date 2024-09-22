import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';
import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import Api from '../../services/Api';
import IUserData from "../../types/IUserData";
import CustomButton from "../../components/CustomButton";
import CustomLink from "../../components/CustomLink";
import LanguageFloatingButton from "../../components/LanguageFloatingBtn";
import FormInput from "../../components/FormInput";

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
        <motion.div className='app-unique-container create-user-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
          <span className='login-txtTitulo'>{strings.createAccount_title}</span>

          <form onSubmit={SignUp}>
            <FormInput label={strings.login_username} type='text' required width="80%"
              onChange={(e) => { setUsername(e.target.value) }}
            />

            <FormInput label={strings.createAccount_email} type='text' required width="80%"
              onChange={(e) => { setEmail(e.target.value) }}
            />

            <FormInput label={strings.login_password} required width="80%"
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

            <br />
            <CustomButton type='submit' variant="contained" width="80%">
              {isSigningUp ? (<CircularProgress size={24} color="inherit" />) : (strings.createAccount_title)}
            </CustomButton>
          </form>

          <div className="login-redirects">
            <CustomLink to="/" className='login-txtCriar'>{strings.createAccount_accessAccount}</CustomLink>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence key='divLoginFloatingButton'>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <LanguageFloatingButton className="custom-select" />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
