import React, { ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { useColors } from '../context/ColorContext';

interface CustomButtonProps extends ButtonProps {
    children: ReactNode;
    width?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, type = 'button', variant = 'contained', width = '100%', onClick, ...rest }) => {
    const { colors } = useColors();

    return (
        <Button 
            type={type} 
            variant={variant} 
            onClick={onClick} 
            sx={{
                width: {width},
                backgroundColor: colors.primary,
                color: colors.primaryText,
                '&:hover': {
                    backgroundColor: colors.primary,
                    color: colors.primaryTextTint,
                },
            }}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default CustomButton;
