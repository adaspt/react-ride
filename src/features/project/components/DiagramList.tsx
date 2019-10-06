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
}

const DiagramList: React.FC<Props> = ({ projectId, error, loading, diagrams }) => {
  if (error) {
    return <Error message={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!diagrams) {
    return null;
  }

  if (!diagrams.length) {
    return <p>You have no diagrams yet. Create a new one.</p>;
  }

  return (
    <div className="row">
      {diagrams.map(x => (
        <ListCard key={x.id} title={x.name} link={`/projects/${projectId}/${x.id}`} />
      ))}
    </div>
  );
};

export default DiagramList;
