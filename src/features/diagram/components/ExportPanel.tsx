import React from 'react';

import { Diagram } from '../../../model/diagrams';
import { ComponentTree } from '../../../model/component';
import Panel from '../../../components/Panel';
import { useExport } from '../hooks/useExport';

interface Props {
  diagram: Diagram;
  tree: ComponentTree | null;
}

const ExportPanel: React.FC<Props> = ({ diagram, tree }) => {
  const { loading, download } = useExport(diagram);

  const handleDownload = () => tree && download(tree);

  return (
    <Panel continuous>
      <div className="card-header">Export</div>
      <div className="card-body">
        <button
          type="button"
          disabled={!tree || loading}
          className="btn btn-secondary"
          onClick={handleDownload}
        >
          {loading && <i className="fa fa-circle-o-notch fa-spin"></i>} Download
        </button>
      </div>
    </Panel>
  );
};

export default ExportPanel;
