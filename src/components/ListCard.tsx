import React from 'react';
import { Link } from '@reach/router';

interface Props {
  title: string;
  link: string;
}

const ListCard: React.FC<Props> = ({ title, link }) => {
  return (
    <div className="col-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <Link className="stretched-link" to={link}></Link>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
