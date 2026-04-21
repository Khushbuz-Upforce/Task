import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container py-5 text-center">
      <h1 className="display-6">404 - Page Not Found</h1>
      <p className="text-muted">The page you requested does not exist.</p>
      <Link className="btn btn-primary" to="/products">
        Go to Products
      </Link>
    </section>
  );
};

export default NotFound;
