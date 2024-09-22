import React from 'react';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import CustomFloatingBtn from './CustomFloatingBtn';
import { useLanguage } from '../context/LanguageContext';

interface LanguageFloatingButtonProps {
  className?: string;
}

const LanguageFloatingButton: React.FC<LanguageFloatingButtonProps> = ({ className }) => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (event: SelectChangeEvent<'en' | 'pt'>) => {
    changeLanguage(event.target.value as 'en' | 'pt');
  };

  return (
    <CustomFloatingBtn className={className}>
      <Select
        value={language}
        onChange={handleLanguageChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Language' }}
        className="MuiSelect-select"
      >
        <MenuItem value={'en'} className="custom-select-menu-item">EN</MenuItem>
        <MenuItem value={'pt'} className="custom-select-menu-item">PT</MenuItem>
      </Select>
    </CustomFloatingBtn>
  );
};

export default LanguageFloatingButton;
