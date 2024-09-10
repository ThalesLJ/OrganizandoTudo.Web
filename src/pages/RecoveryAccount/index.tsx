import "../../index.css";
import { AnimatePresence, motion } from 'framer-motion';

export default function RecoveryAccount() {
  return (
    <div style={{ paddingTop: '70px' }}>
      <AnimatePresence>
        <motion.div className='app-container' style={{ marginTop: '20px' }} initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} exit={{ y: window.innerHeight + 1000 }} >
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
