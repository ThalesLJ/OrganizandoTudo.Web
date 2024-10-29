import React from 'react';
import { OutlinedInput, FormControl, InputProps } from '@mui/material';
import { Form } from 'react-bootstrap';
import { useColors } from '../context/ColorContext';

interface FormInputProps extends Omit<InputProps, 'onChange'> {
    id?: string;
    type?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    width?: string;
    label?: string;
    labelFontSize?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ id, type = 'text', value,
    placeholder = '', variant = 'outlined', required = false, width = '100%',
    label = 'Texto', labelFontSize = '16px', onChange, ...rest
}) => {
    const { colors } = useColors();

    return (
        <Form.Group className="form-input-group">
            <div style={{ width: width, display: 'flex', flexDirection: 'column' }}>
                <Form.Label className="form-input-label" style={{ fontSize: labelFontSize }}>{label}</Form.Label>
                <FormControl variant={variant} style={{ width: '100%' }}>
                    <OutlinedInput
                        id={id} type={type} value={value} placeholder={placeholder}
                        onChange={onChange} {...rest} required={required}
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
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: colors.primary, // Prevent border color change on hover
                            },
                            '& .MuiOutlinedInput-input::placeholder': {
                                color: colors.primary,
                            }
                        }}
                    />
                </FormControl>
            </div>
        </Form.Group>
    );
};

export default FormInput;
