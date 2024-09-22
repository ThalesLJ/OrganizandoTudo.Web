import "../../index.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useColors } from "../../context/ColorContext";
import { AnimatePresence, motion } from 'framer-motion';
import { Form } from 'react-bootstrap';
import { MenuItem, Select, SelectChangeEvent, CircularProgress, Grid, Typography, Paper, List, ListItem, ListItemText } from "@mui/material";
import Auth from '../../context/Auth';
import Api from '../../services/Api';
import FormInput from "../../components/FormInput";
import FormButton from "../../components/FormButton";
import CustomButton from "../../components/CustomButton";
import { ChromePicker } from 'react-color';
import CustomFloatingBtn from "../../components/CustomFloatingBtn";

export default function Settings() {
  const { strings, changeLanguage, language } = useLanguage();
  const { setColors } = useColors();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [initialUsername, setInitialUsername] = useState<string>('');
  const [initialEmail, setInitialEmail] = useState<string>('');
  const [activeSection, setActiveSection] = useState<'profile' | 'account' | 'appearance' | 'notifications'>('profile');

  const formRef = useRef<HTMLFormElement>(null);

  const resetColors = () => {
    const defaultColors = {
      primary: "#946a56",
      secondary: "#ffe3d5",
      primaryText: "#ffffff",
      primaryTextTint: "#e2c8bc",
      secondaryText: "#000000",
      secondaryTextTint: "#946a56",
      background: "#ffffff",
      appBackground: "#ffe3d5",
    };
    setColors(defaultColors);
    sessionStorage.setItem('colors', JSON.stringify(defaultColors));
  };

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'pt'>) => {
    changeLanguage(event.target.value as 'en' | 'pt');
  };

  useEffect(() => {
    const savedColors = sessionStorage.getItem('colors');
    if (savedColors) {
      const parsedColors = JSON.parse(savedColors);
      setColors(parsedColors);
    }

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
      })
      .catch((error) => {
        console.error('Error updating user: ', error);
        setIsSaving(false);
      });
  }, [username, email, currentPassword]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (hasChanges) {
      handleSave();
    }
  };

  const handleColorChange = (color: any, type: 'primary' | 'secondary' | 'primaryText' | 'secondaryText' | 'background' | 'titleText' | 'titleSecondaryText' | 'appBackground') => {
    const newColors = {
      ...JSON.parse(sessionStorage.getItem('colors') || '{}'),
      [type]: color.hex,
    };
    sessionStorage.setItem('colors', JSON.stringify(newColors));
    setColors(newColors);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
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
        );
      case 'appearance':
        return (
          <>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_primaryColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').primary || '#946a56'}
                  onChange={(color) => handleColorChange(color, 'primary')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_secondaryColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').secondary || '#ffe3d5'}
                  onChange={(color) => handleColorChange(color, 'secondary')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_primaryTextColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').primaryText || '#000000'}
                  onChange={(color) => handleColorChange(color, 'primaryText')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_secondaryTextColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').secondaryText || '#ffffff'}
                  onChange={(color) => handleColorChange(color, 'secondaryText')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_backgroundColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').background || '#ffffff'}
                  onChange={(color) => handleColorChange(color, 'background')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_titleTextColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').titleText || '#946a56'}
                  onChange={(color) => handleColorChange(color, 'titleText')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_titleSecondaryTextColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').titleSecondaryText || '#ffe3d5'}
                  onChange={(color) => handleColorChange(color, 'titleSecondaryText')}
                />
              </div>
              <div style={{ marginBottom: '20px', width: '48%' }}>
                <p>{strings.settings_appBackgroundColor}</p>
                <ChromePicker
                  color={JSON.parse(sessionStorage.getItem('colors') || '{}').appBackground || '#f0f0f0'}
                  onChange={(color) => handleColorChange(color, 'appBackground')}
                />
              </div>
            </div>
            <CustomButton onClick={resetColors} style={{ marginTop: '10px' }}>
              {strings.settings_btnResetColors}
            </CustomButton>
          </>
        );
      default:
        return <Typography>Select an option from the sidebar</Typography>;
    }
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <Grid className="settings-container" container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ height: '100%' }}>
            <List component="nav">
              <ListItem button selected={activeSection === 'profile'} onClick={() => setActiveSection('profile')}>
                <ListItemText primary={strings.settings_profile} />
              </ListItem>
              <ListItem button selected={activeSection === 'appearance'} onClick={() => setActiveSection('appearance')}>
                <ListItemText primary={strings.settings_appearance} />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              {strings[`settings_${activeSection}Title`]}
            </Typography>
            {renderContent()}
          </Paper>
        </Grid>
      </Grid>

      <AnimatePresence key='divSettingsFloatingButton'>
        <motion.div key='language-dropdown' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CustomFloatingBtn className="custom-select-logged">
            <Select value={language} onChange={handleLanguageChange} displayEmpty inputProps={{ 'aria-label': 'Select Language' }} className="MuiSelect-select">
              <MenuItem value={'en'} className="custom-select-menu-item">EN</MenuItem>
              <MenuItem value={'pt'} className="custom-select-menu-item">PT</MenuItem>
            </Select>
          </CustomFloatingBtn>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}