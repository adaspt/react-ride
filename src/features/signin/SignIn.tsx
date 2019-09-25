import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

interface Props extends RouteComponentProps {
  authenticated: boolean;
}

const SignIn: React.FC<Props> = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to="/" noThrow />;
  }

  const handleSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  return (
    <div>
      <button type="button" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
