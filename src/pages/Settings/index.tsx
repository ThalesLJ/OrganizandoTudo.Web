import "../../index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useColors } from "../../context/ColorContext";
import { AnimatePresence, motion } from 'framer-motion';
import { Form } from 'react-bootstrap';
import { FormControl, MenuItem, Select, SelectChangeEvent, styled, CircularProgress } from "@mui/material";
import Auth from '../../context/Auth';
import Api from '../../services/Api';
import TokenValidator from '../../services/TokenValidator';
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import ColorButton from "../../components/ColorButton";

export default function Settings() {
  TokenValidator();
  const { strings, changeLanguage, language } = useLanguage();
  const { setColors } = useColors();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [initialUsername, setInitialUsername] = useState<string>('');
  const [initialEmail, setInitialEmail] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);

  // Função para gerar uma cor aleatória em formato HEX
  const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;

  // Função para mudar as cores e salvá-las na sessão
  const changeColor = () => {
    const newColors = {
      primary: randomColor(),
      secondary: randomColor(),
    };
    setColors(newColors);
  };

  // Função para voltar às cores originais
  const resetColors = () => {
    const defaultColors = {
      primary: "#946a56", // Cor original
      secondary: "#ffe3d5", // Cor original
    };
    setColors(defaultColors);
  };

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'pt'>) => {
    changeLanguage(event.target.value as 'en' | 'pt');
  };

  // Aplicando as cores salvas na sessão (se existirem) no carregamento
  useEffect(() => {
    const savedColors = sessionStorage.getItem('colors');
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }

    // Carregar os dados iniciais do usuário
    Api.GetUser(Auth.user)
      .then((user) => {
        setUsername(user.username);
        setInitialUsername(user.username);
        setEmail(user.email);
        setInitialEmail(user.email);
      })
      .catch((error) => {
        console.error('Failed to fetch user data: ', error);
      });
  }, [setColors]);

  const hasChanges = username !== initialUsername || email !== initialEmail;

  const handleSave = useCallback(() => {
    setIsSaving(true);

    Api.UpdateUser({ username, email, password: currentPassword }, Auth.user.token)
      .then(() => {
        setInitialUsername(username);
        setInitialEmail(email);
        setIsSaving(false);
        //alert(strings.settings_updateSuccess);
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
        setIsSaving(false);
        //alert(strings.settings_updateError);
      });
  }, [username, email, currentPassword]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasChanges) {
      handleSave();
    }
  };

  const FloatingButton = styled(FormControl)(({ theme }) => ({
    position: 'fixed',
    top: 76,
    right: 16,
    width: 100,
  }));

  return (
    <div style={{ paddingTop: '70px' }}>
      <AnimatePresence key='divSettings'>
        <motion.div initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }}>
          <div className="app-container-settings">
            <Form ref={formRef} onSubmit={handleFormSubmit}>
              <FormInput value={username} placeholder={strings.settings_usernamePlaceholder} required
                onChange={(e) => setUsername(e.target.value)} label={strings.settings_username} />

              <FormInput value={email} placeholder={strings.settings_emailPlaceholder} required
                onChange={(e) => setEmail(e.target.value)} label={strings.settings_email} type="email" />

              {hasChanges && (
                <FormInput value={currentPassword} placeholder={strings.settings_currentPasswordPlaceholder} required
                  onChange={(e) => setCurrentPassword(e.target.value)} label={strings.settings_currentPassword} type="password" />
              )}

              <FormButton>
                {isSaving ? (<CircularProgress size={24} color="inherit" />) : (strings.settings_btnSaveChanges)}
              </FormButton>
            </Form>

            <hr />

            <ColorButton style={{marginBottom: '10px'}} onClick={changeColor}>
              {strings.settings_btnGenerateRandomColors}
            </ColorButton>

            <ColorButton onClick={resetColors}>
              {strings.settings_btnResetColors}
            </ColorButton>
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence key='divSettingsFloatingButton'>
        <motion.div key='language-dropdown' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <FloatingButton variant="outlined" className="custom-select">
            <Select value={language} onChange={handleLanguageChange} displayEmpty inputProps={{ 'aria-label': 'Select Language' }} className="MuiSelect-select">
              <MenuItem value={'en'} className="custom-select-menu-item">EN</MenuItem>
              <MenuItem value={'pt'} className="custom-select-menu-item">PT</MenuItem>
            </Select>
          </FloatingButton>
        </motion.div>
      </AnimatePresence>
    </div >
  );
}
