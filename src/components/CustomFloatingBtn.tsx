import React, { ReactNode } from 'react';
import { FormControl, styled } from '@mui/material';
import { useColors } from '../context/ColorContext';

interface CustomFloatingBtnProps {
  children: ReactNode;
  className?: string;
}

const FloatingButton = styled(FormControl)(({ theme }) => ({
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 1000,
}));

const CustomFloatingBtn: React.FC<CustomFloatingBtnProps> = ({ children, className }) => {
  const { colors } = useColors();

  return (
    <FloatingButton
      variant="outlined"
      className={className}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: colors.primary,
          },
          '&:hover fieldset': {
            borderColor: colors.primary,
          },
          '&.Mui-focused fieldset': {
            borderColor: colors.primary,
          },
        },
        '& .MuiSelect-select': {
          color: colors.primary,
        },
        '& .MuiSvgIcon-root': {
          color: colors.primary,
        },
      }}
    >
      {children}
    </FloatingButton>
  );
};

export default CustomFloatingBtn;
