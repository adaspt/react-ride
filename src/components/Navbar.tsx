import React from 'react';
import clsx from 'clsx';
import { Match, Link, LinkGetProps } from '@reach/router';

import { User } from '../model/auth';

interface Props {
  user: User | null;
  onSignOut: () => void;
}

const getNavLinkProps = (matchPartial: boolean) => ({ isCurrent, isPartiallyCurrent }: LinkGetProps) => ({
  className: clsx('nav-link', (isCurrent || (matchPartial && isPartiallyCurrent)) && 'active')
});

const Navbar: React.FC<Props> = ({ user, onSignOut }) => {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light border-bottom">
      <Link to="/" className="navbar-brand mb-0 h1">
        <i className="fa fa-cubes"></i> React Ride
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/projects" getProps={getNavLinkProps(false)}>
            Projects
          </Link>
        </li>
        <Match<{ projectId: string }> path="/projects/:projectId/*">
          {({ match }) =>
            match && (
              <li className="nav-item">
                <Link to={`/projects/${match.projectId}`} getProps={getNavLinkProps(true)}>
                  Diagrams
                </Link>
              </li>
            )
          }
        </Match>
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
