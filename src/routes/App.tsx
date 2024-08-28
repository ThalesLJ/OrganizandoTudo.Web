import { LanguageProvider } from '../context/LanguageContext';
import './App.css';
import AppRoutes from './AppRoutes';

export default function App() {
    return (
        <LanguageProvider>
            <AppRoutes />
        </LanguageProvider>
    )
}
