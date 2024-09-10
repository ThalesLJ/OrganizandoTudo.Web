import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, Snackbar } from '@mui/material';

type CustomAlertProps = {
    message: string;
    duration?: number;
    severity?: 'success' | 'info' | 'warning' | 'error';
    position?: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' };
    backgroundColor?: string;
    textColor?: string;
    onClose?: () => void;
};

const CustomAlert: React.FC<CustomAlertProps> = ({
    message,
    duration = 3000,
    severity = 'info',
    position = { vertical: 'top', horizontal: 'center' },
    backgroundColor,
    textColor,
    onClose,
}) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            if (onClose) onClose();
        }, duration);

        return () => clearTimeout(timer); // Limpa o timeout ao desmontar o componente
    }, [duration, onClose]);

    const handleClose = () => {
        setOpen(false);
        if (onClose) onClose();
    };

    return (
        <AnimatePresence key='divLogin'>
            <motion.div className='login' initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
                <Snackbar open={open} onClose={handleClose} anchorOrigin={position}>
                    <Alert icon={undefined} severity={severity} onClose={handleClose}
                        sx={{ backgroundColor: backgroundColor || '', color: textColor || '' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </motion.div>
        </AnimatePresence>
    );
};

export default CustomAlert;
