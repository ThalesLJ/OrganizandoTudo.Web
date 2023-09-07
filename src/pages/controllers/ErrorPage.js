import { useRouteError } from "react-router-dom";
import '../styles/ErrorPage.css';

export default function ErrorPage() {
  
  const error = useRouteError();
  if (error == null || error.statusText == null || error.message == null) {
    error.statusText = "Not Found";
    error.message = "Not Found";
  }

  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}