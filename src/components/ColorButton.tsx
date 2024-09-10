import React, { ReactNode } from 'react';
import { Button, styled, ButtonProps } from '@mui/material';
import { useColors } from '../context/ColorContext';

interface ColorButtonProps extends ButtonProps {
    children: ReactNode;
    width?: string;
}

const ColorButton: React.FC<ColorButtonProps> = ({ children, type = 'button', variant = 'contained', width = '100%', onClick, ...rest }) => {
    const { colors } = useColors();

    const StyledButton = styled(Button)(({ theme }) => ({
        width: width,
        color: colors.secondary,
        backgroundColor: colors.primary,
        '&:hover': {
            backgroundColor: colors.primary,
            color: colors.secondary,
        },
    }));

    return (
        <StyledButton type={type} variant={variant} onClick={onClick} {...rest}>
            {children}
        </StyledButton>
    );
};

export default ColorButton;
