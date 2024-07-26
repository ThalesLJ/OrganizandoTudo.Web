import "./styles.css";
import { AnimatePresence, motion } from 'framer-motion';

export default function Settings() {
  return (
    <AnimatePresence>
      <motion.div className='app-container' style={{ marginTop: '20px' }} initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} exit={{ y: window.innerHeight + 1000 }} >
        <span>Settings</span>
      </motion.div>
    </AnimatePresence>
  );
}
