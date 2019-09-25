import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useDiagramList } from './hooks/useDiagramList';
import { User } from '../../hooks/useSession';

interface Props extends RouteComponentProps {
  user: User | null;
}

const DiagramList: React.FC<Props> = ({ user }) => {
  // if (!user) {
  //   return <Redirect to="/signin" />;
  // }

  const { list } = useDiagramList(user!);

  return (
    <table className="table">
      <tbody>
        {list.map(x => (
          <tr key={x.id}>
            <td>{x.name}</td>
            <td>{x.ownerId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DiagramList;
