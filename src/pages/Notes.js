import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Notes() {
  return (
    <AnimatePresence>
      <motion.div className='container' initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} >
        <span>Notes</span>
      </motion.div>
    </AnimatePresence>
  );
}
