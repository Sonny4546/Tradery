import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <div class="error">
        <a href="#">
        <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
        <polyline
              fill="none" 
              stroke="#777777" 
              stroke-width="0.1" 
              points="0.9,0.1 0.1,0.5 0.9,0.9" 
        />
        </svg> Home
        </a>
        <div class="background-wrapper">
          <h1 id="visual">Error!</h1>
        </div>
        <p>The page you’re looking for does not exist.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}
