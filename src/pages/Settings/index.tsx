import "../../index.css";
import React, { useEffect } from "react";
import { useLanguage } from '../../context/LanguageContext';
import { useColors } from "../../context/ColorContext";
import { AnimatePresence, motion } from 'framer-motion';

export default function Settings() {
  const { strings } = useLanguage();
  const { setColors } = useColors();

  // Função para gerar uma cor aleatória em formato HEX
  const randomColor = () => `#${Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')}`;

  // Função para mudar as cores e salvá-las na sessão
  const changeColor = () => {
    const newColors = {
      primary: randomColor(),
      secondary: randomColor(),
    };
    setColors(newColors);
  };

  // Função para voltar às cores originais
  const resetColors = () => {
    const defaultColors = {
      primary: "#946a56", // Cor original
      secondary: "#ffe3d5", // Cor original
    };
    setColors(defaultColors);
  };

  // Aplicando as cores salvas na sessão (se existirem) no carregamento
  useEffect(() => {
    const savedColors = sessionStorage.getItem('colors');
    if (savedColors) {
      setColors(JSON.parse(savedColors));
    }
  }, [setColors]);

  return (
    <div style={{ paddingTop: '70px' }}>
      <AnimatePresence>
        <motion.div
          className='app-container'
          style={{ marginTop: '20px' }}
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.2 }}
          exit={{ y: window.innerHeight + 1000 }}
        >
          <span>{strings.settings_title}</span>
          <div style={{ marginTop: '20px' }}>
            <button onClick={changeColor}>Generate Random Colors</button>
            <button onClick={resetColors} style={{ marginLeft: '10px' }}>Reset to Default Colors</button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
