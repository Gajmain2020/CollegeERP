import ErrorImage from "../Images/error-404.png";

export default function PageNotFound() {
  return (
    <div>
      <div className="not-found-container">
        <img
          src={ErrorImage}
          alt="404 - Page Not Found"
          className="not-found-image"
        />
        <h1 className="error-code">404 !!</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
}
