import { useState } from 'react';

import { Diagram } from '../../../model/diagrams';
import { ComponentTree } from '../../../model/component';

const generateFile = async (tree: ComponentTree) => {
  await new Promise(resolve => window.setTimeout(resolve, 2000));
  // TODO: jszip
  return 'Not implemented yet';
};

export const useExport = (diagram: Diagram) => {
  const [loading, setLoading] = useState(false);

  const download = async (tree: ComponentTree) => {
    setLoading(true);
    try {
      const file = await generateFile(tree);
      console.log('Generated file', file);
    } catch (ex) {
      console.error('Failed to export diagram', ex);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    download
  };
};
