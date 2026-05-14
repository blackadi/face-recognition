import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-column items-center justify-center vh-100">
      <h1 className="f1 mb3">404</h1>
      <p className="f3 mb4 tc">Page not found</p>
      <Link to="/" className="link dim blue underline f4">
        Go back to home
      </Link>
    </div>
  );
}
