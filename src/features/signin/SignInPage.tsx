import React, { useEffect } from 'react';
import { RouteComponentProps } from '@reach/router';

interface Props extends RouteComponentProps {
  authenticated: boolean;
}

const SignInPage: React.FC<Props> = ({ authenticated, navigate }) => {
  useEffect(() => {
    if (authenticated && navigate) {
      navigate('/');
    }
  }, [authenticated, navigate]);

  if (authenticated) {
    return null;
  }

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div className="mx-auto my-auto">
      <button type="button" className="btn btn-danger btn-lg" onClick={handleSignInWithGoogle}>
        <i className="fa fa-google mr-2" /> Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;
