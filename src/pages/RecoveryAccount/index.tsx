import "./styles.css";
import { useLanguage } from '../../context/LanguageContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function RecoveryAccount() {
  const { strings } = useLanguage();

  return (
    <div style={{ paddingTop: '70px' }}>
      <AnimatePresence>
        <motion.div className='app-container' style={{ marginTop: '20px' }} initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} exit={{ y: window.innerHeight + 1000 }} >
          <span>{strings.recoveryAccount_title}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
