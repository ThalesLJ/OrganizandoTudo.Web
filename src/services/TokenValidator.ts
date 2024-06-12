import { useEffect } from 'react';
import Auth from './Auth';
import { useNavigate } from "react-router-dom";

// 5 * 60 * 1000 // Verifica a cada 5 minutos
function TokenValidator() {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (!Auth.isTokenValid()) {
        Auth.logout();
        navigate("/");
      }
    }, 5 * 1000);
    return () => clearInterval(interval);
  }, []);
}

export default TokenValidator;