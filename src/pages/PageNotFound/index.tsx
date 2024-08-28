import "../../index.css";
import { useLanguage } from '../../context/LanguageContext';

export default function PageNotFound() {
  const { strings } = useLanguage();

  return (
    <div className="error-page">
      <h1>{strings.notFound_title}</h1>
      <p>{strings.notFound_description}</p>
    </div>
  );
}