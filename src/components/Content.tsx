import React from 'react';

interface Props {
  renderSideBarContent?: () => React.ReactNode;
}

const renderEmtpySideBar = () => null;

const Content: React.FC<Props> = ({ children, renderSideBarContent = renderEmtpySideBar }) => {
  const sideBarContent = renderSideBarContent();
  return (
    <div className="row no-gutters flex-fill">
      <div className="col-9">{children}</div>
      <div className="col-3 border-left d-flex flex-column flex-fill">{sideBarContent}</div>
    </div>
  );
};

export default Content;
