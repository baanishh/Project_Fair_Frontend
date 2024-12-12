import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Pnf = () => {
  return (
    <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-light text-center">
      <div className="display-1 fw-bold text-danger">404</div>
      <h1 className="fw-bold text-dark">Oops! Page Not Found</h1>
      <p className="text-muted">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary btn-lg mt-3">
        Back to Home
      </Link>
      <img
        src="https://via.placeholder.com/600x400?text=404+Error" 
        alt="Page Not Found"
        className="img-fluid mt-4"
        style={{ maxHeight: '300px' }}
      />
    </div>
  );
};

export default Pnf;
