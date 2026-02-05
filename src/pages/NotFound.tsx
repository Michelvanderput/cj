import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="section-container pb-20 text-center py-32">
      <h1 className="text-display text-brand-main mb-4">404</h1>
      <p className="text-body-lg text-tx-secondary mb-8">
        Deze pagina bestaat niet.
      </p>
      <Link to="/" className="btn btn-primary btn-md">
        Terug naar Home
      </Link>
    </div>
  );
};

export default NotFound;
