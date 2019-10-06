import React from 'react';

interface Props {
  message: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="alert alert-danger">
      <h4 className="alert-heading">Error</h4>
      <p>{message}</p>
    </div>
  );
};

export default Error;
