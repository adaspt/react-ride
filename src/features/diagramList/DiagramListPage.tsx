import React from 'react';
import { RouteComponentProps, Link } from '@reach/router';

import { User } from '../../hooks/useSession';
import { withAuthentication } from '../../components/withAuthentication';
import { useDiagramList } from './hooks/useDiagramList';

interface Props extends RouteComponentProps {
  user: User;
}

const DiagramListPage: React.FC<Props> = ({ user }) => {
  const { list } = useDiagramList(user);

  return (
    <table className="table">
      <tbody>
        {list.map(x => (
          <tr key={x.id}>
            <td>
              <Link to={`/diagram/${x.id}`}>{x.name}</Link>
            </td>
            <td>{x.ownerId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default withAuthentication(DiagramListPage);
