import React, { ReactNode } from 'react';
import { ButtonProps } from '@mui/material';
import { Col, Form, Row } from 'react-bootstrap';
import ColorButton from './ColorButton';

interface FormButtonProps extends ButtonProps {
    children: ReactNode;
    width?: string;
}

const FormButton: React.FC<FormButtonProps> = ({ children, type = 'submit', variant = 'contained', width = '100%', onClick, ...rest }) => {
    return (
        <Form.Group controlId="formSave" className="mt-4">
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <ColorButton type='submit' variant={variant} width={width}>
                        {children}
                    </ColorButton>
                </Col>
            </Row>
        </Form.Group>
    );
};

export default FormButton;
