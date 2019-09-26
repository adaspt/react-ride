import React from 'react';
import { RouteComponentProps, Redirect } from '@reach/router';

interface Props extends RouteComponentProps {
  authenticated: boolean;
}

const SignInPage: React.FC<Props> = ({ authenticated }) => {
  if (authenticated) {
    return <Redirect to="/" noThrow />;
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
