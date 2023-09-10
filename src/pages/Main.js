import React from 'react';
import { Outlet } from "react-router-dom";
import "../styles/Main.css";
import { AnimatePresence, motion } from 'framer-motion';

export default function Main() {
    return (
        <div className='app-background'>
            <AnimatePresence>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} exit={{ opacity: 0 }} >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
