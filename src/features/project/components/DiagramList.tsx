import React from 'react';

import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import ListCard from '../../../components/ListCard';

interface Props {
  projectId: string;
  diagrams: any[] | null;
  error: string | null;
  loading: boolean;
}

const DiagramList: React.FC<Props> = ({ projectId, diagrams, error, loading }) => {
  if (error) {
    return <Error message={error} />;
  }

  if (!diagrams || loading) {
    return <Loading />;
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
