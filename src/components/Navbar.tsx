import React from 'react';
import clsx from 'clsx';
import { Link, LinkGetProps } from '@reach/router';

const getNavLinkProps = ({ isCurrent }: LinkGetProps) => ({
  className: clsx('nav-link', isCurrent && 'active')
});

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-light bg-light border-bottom">
      <Link to="/" className="navbar-brand mb-0 h1">
        <i className="fa fa-cubes"></i> React Ride
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/demo" getProps={getNavLinkProps}>
            Demo
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/signin" getProps={getNavLinkProps}>
            Sign in
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
