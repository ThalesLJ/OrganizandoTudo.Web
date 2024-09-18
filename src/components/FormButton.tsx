import React, { ReactNode } from 'react';
import { ButtonProps } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import CustomButton from './CustomButton';
import { useColors } from '../context/ColorContext';

interface FormButtonProps extends ButtonProps {
    children: ReactNode;
    width?: string;
}

const FormButton: React.FC<FormButtonProps> = ({ children, type = 'submit', variant = 'contained', width = '100%', onClick, ...rest }) => {
    const { colors } = useColors();

    return (
        <Form.Group controlId="formSave" className="mt-4">
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <CustomButton
                        type='submit'
                        variant={variant}
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
                    </CustomButton>
                </Col>
            </Row>
        </Form.Group>
    );
};

export default FormButton;
