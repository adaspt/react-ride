import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  authenticated: boolean;
  onSignInWithGoogle: () => void;
}

const SignInPage: React.FC<Props> = ({ authenticated, navigate, onSignInWithGoogle }) => {
  useEffect(() => {
    if (authenticated && navigate) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  if (authenticated) {
    return null;
  }

  return (
    <div className="mx-auto my-auto">
      <button type="button" className="btn btn-danger btn-lg" onClick={onSignInWithGoogle}>
        <i className="fa fa-google mr-2" /> Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
