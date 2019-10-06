import React from 'react';

interface Props {}

const Content: React.FC<Props> = ({ children }) => {
  return (
    <div className="row no-gutters flex-fill">
      <div className="col-9">{children}</div>
      <div className="col-3 border-left d-flex flex-column flex-fill"></div>
    </div>
  );
};

export default Content;
