import React from 'react';
import { OutlinedInput, FormControl, InputProps } from '@mui/material';
import { Form } from 'react-bootstrap';

interface FormInputProps extends InputProps {
    id?: string;
    type?: string;
    variant?: 'outlined' | 'filled' | 'standard';
    width?: string;
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({ id, type = 'text', value = '', placeholder = '', variant = 'outlined', required = false, width = '100%', label = 'Texto', onChange, ...rest }) => {
    return (
        <Form.Group style={{ marginTop: '10px' }}>
            <Form.Label className="select-none">{label}</Form.Label>
            <FormControl sx={{ width: width }} variant={variant}>
                <OutlinedInput id={id} type={type} value={value} placeholder={placeholder} onChange={onChange} {...rest} required={required} />
            </FormControl>
        </Form.Group>
    );
};

export default FormInput;
