import React from 'react';
import clsx from 'clsx';
import { Link, LinkGetProps } from '@reach/router';

import { User } from '../hooks/useSession';

interface Props {
  user: User | null;
  onSignOut: () => void;
}

const getNavLinkProps = ({ isCurrent }: LinkGetProps) => ({
  className: clsx('nav-link', isCurrent && 'active')
});

const Navbar: React.FC<Props> = ({ user, onSignOut }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light border-bottom">
      <Link to="/" className="navbar-brand mb-0 h1">
        <i className="fa fa-cubes"></i> React Ride
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/diagram" getProps={getNavLinkProps}>
            Diagrams
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/sandbox" getProps={getNavLinkProps}>
            Sandbox
          </Link>
        </li>
      </ul>

      {user && (
        <div>
          <span className="navbar-text">{user.displayName}</span>
          <button type="button" className="btn btn-outline-danger ml-2" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      )}
      {!user && (
        <div>
          <Link to="/signin" className="btn btn-outline-success">
            Sign in
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
