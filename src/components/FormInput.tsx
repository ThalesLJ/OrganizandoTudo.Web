import React from 'react';
import { OutlinedInput, FormControl, InputProps } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useColors } from '../context/ColorContext';

interface FormInputProps extends InputProps {
    id?: string;
    type?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    width?: string;
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ id, type = 'text', value = '', placeholder = '', variant = 'outlined', required = false, width = '100%', label = 'Texto', onChange, ...rest }) => {
    const { colors } = useColors();

    return (
        <Form.Group style={{ marginTop: '10px' }}>
            <Form.Label className="select-none" style={{ color: colors.primaryText }}>{label}</Form.Label>
            <FormControl sx={{ width: width }} variant={variant}>
                <OutlinedInput 
                    id={id} type={type}  value={value} placeholder={placeholder} 
                    onChange={onChange} {...rest}  required={required}
                    sx={{
                        '& .MuiOutlinedInput-input': {
                            color: colors.secondaryText,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: colors.primary,
                        },
                    }}
                />
            </FormControl>
        </Form.Group>
    );
};

export default FormInput;
