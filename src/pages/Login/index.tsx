import "../../index.css";
import * as React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import { CircularProgress, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import ILogin from '../../types/ILogin';
import { useNavigate } from "react-router-dom";
import Api from '../../services/Api';
import Auth from '../../context/Auth';
import CustomAlert from "../../components/CustomAlert";
import CustomButton from "../../components/CustomButton";
import CustomLink from "../../components/CustomLink";
import CustomFloatingBtn from "../../components/CustomFloatingBtn";

export default function Login() {
  const { strings, changeLanguage, language } = useLanguage();

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLogging, setIsLogging] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');

  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Login = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLogging(true);
    setShowAlert(false);

    const login: ILogin = {
      username: username,
      password: password
    };

    Api.Login(login)
      .then((result) => {
        if (result.token) {
          Auth.login({ username: result.username, email: result.email, token: result.token });
          if (result.token != null) navigate("/Notes");
        } else {
          setAlertMessage(strings.login_AccountNotFound);
          setShowAlert(true);
          setIsLogging(false);
        }
      })
      .catch((error) => {
        setAlertMessage(strings.login_AccountNotFound);
        setShowAlert(true);
        setIsLogging(false);
      });

    event.preventDefault();
  }

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'pt'>) => {
    changeLanguage(event.target.value as 'en' | 'pt');
  };

  return (
    <Observer>
      {() => (
        <div className='app-unique-containers'>
          {showAlert && <CustomAlert message={alertMessage} severity="error" />}

          <AnimatePresence key='divLogin'>
            <motion.div className='app-unique-container' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >

              <br /><br />
              <span className='login-txtTitulo'>{strings.login_title}</span>
              <br /><br />

              <form onSubmit={Login}>

                <FormControl className='login-divUsuario' sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <span className='login-txtLabels'>{strings.login_username}</span>
                  <OutlinedInput className='login-inputUsuario' id="usuario" type='text' required
                    onChange={(e) => { setUsername(e.target.value) }}
                  />
                </FormControl>

                <br />

                <FormControl className='login-divSenha' sx={{ m: 1, width: '25ch' }} variant="outlined">
                  <span className='login-txtLabels'>{strings.login_password}</span>
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

                <CustomButton type='submit' className='login-btnAcessar' variant="contained" width="80%">
                  {isLogging ? (<CircularProgress size={24} color="inherit" />) : (strings.login_btnLogin)}
                </CustomButton>

              </form>

              <div className="login-redirects">
                <CustomLink to="/AddAccount" className='login-txtCriar'>{strings.login_create}</CustomLink>
                <CustomLink to="/RecoveryAccount" className='login-txtRecuperar'>{strings.login_recovery}</CustomLink>
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

          <AnimatePresence key='divLoginFloatingButton'>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <CustomFloatingBtn className="custom-select">
                <Select value={language} onChange={handleLanguageChange} displayEmpty inputProps={{ 'aria-label': 'Select Language' }} className="MuiSelect-select">
                  <MenuItem value={'en'} className="custom-select-menu-item">EN</MenuItem>
                  <MenuItem value={'pt'} className="custom-select-menu-item">PT</MenuItem>
                </Select>
              </CustomFloatingBtn>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </Observer>
  )
}
