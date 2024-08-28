import "./styles.css";
import React from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useColors } from "../../context/ColorContext";
import { AnimatePresence, motion } from 'framer-motion';

export default function Settings() {
  const { strings } = useLanguage();
  const { setColors } = useColors();

  const changeColor = () => {
    const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;

    setColors({
      primary: randomColor(),
      secondary: randomColor(),
    });
  };

  return (
    <div style={{ paddingTop: '70px' }}>
      <AnimatePresence>
        <motion.div className='app-container' style={{ marginTop: '20px' }} initial={{ y: -1000 }} animate={{ y: 0 }} transition={{ duration: 0.2 }} exit={{ y: window.innerHeight + 1000 }} >
          <span>{strings.settings_title}</span>
          <button onClick={changeColor}>Random Color Test</button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
