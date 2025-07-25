import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const myStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    fontFamily: "Eczar",
    fontSize: "30vmax",
    color: "rgb(255 174 174)",
    letterSpacing: "0.025em",
    margin: "0",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textShadow: "rgba(255,0,0,0.9) 0px 0px 59px",
    transition: "750ms ease-in-out",
  };
  return (
    <div id="error-page">
      <div class="error">
        <a class="HomeButton" href="#/Home">
          <svg height="0.8em" width="0.8em" viewBox="0 0 2 1" preserveAspectRatio="none">
          <polyline
                fill="none" 
                stroke="#ffffff" 
                stroke-width="0.1" 
                points="0.9,0.1 0.1,0.5 0.9,0.9" 
          />
          </svg> Home
        </a>
        <div class="background-wrapper">
          <h1 style={myStyle} id="visual">Error!</h1>
        </div>
        <p class="errorText">The page you’re looking for does not exist.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  )
}