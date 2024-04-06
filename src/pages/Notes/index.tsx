import * as React from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";
import { AnimatePresence, motion } from 'framer-motion';

export default function Notes() {
  return (
    <AnimatePresence key='divNotes'>
      <motion.div className='container' initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} >
        <span>Notes</span>
      </motion.div>
    </AnimatePresence>
  );
}
