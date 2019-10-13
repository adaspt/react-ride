import React from 'react';

import { Diagram } from '../../../model/diagrams';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import ListCard from '../../../components/ListCard';

interface Props {
  projectId: string;
  error: string | null;
  loading: boolean;
  diagrams: Diagram[] | null;
  onNewDiagram: () => void;
}

const DiagramList: React.FC<Props> = ({ projectId, error, loading, diagrams, onNewDiagram }) => {
  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!diagrams) {
    return null;
  }

  const handleNewDiagramClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNewDiagram();
  };

  if (!diagrams.length) {
    return (
      <p>
        You have no diagrams yet.{' '}
        <button type="button" className="btn btn-outline-secondary" onClick={onNewDiagram}>
          <i className="fa fa-plus"></i> Create new
        </button>
      </p>
    );
  }

  return (
    <div className="row">
      {diagrams.map(x => (
        <ListCard key={x.id} title={x.name} link={`/projects/${projectId}/${x.id}`} />
      ))}
      <div className="col-4">
        <div className="card bg-light">
          <div className="card-body">
            <h5 className="card-title">
              <i className="fa fa-plus"></i> Add new diagram
            </h5>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <a href="#create" className="stretched-link" onClick={handleNewDiagramClick}></a>{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramList;
