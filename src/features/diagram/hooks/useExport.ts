import { useState } from 'react';
import JSZip from 'jszip';

import { Diagram } from '../../../model/diagrams';
import { ComponentTree, Component, ComponentProperty, ComponentHook } from '../../../model/component';

const writeProps = (props: ComponentProperty[]): string => {
  if (!props.length) {
    return '';
  }

  return `{ ${props.map(x => x.name).join(', ')} }`;
};

const writeComponent = (component: Component, prefix: string): string[] => [
  `import React from 'react';`,
  ``,
  ...component.hooks.map(x => `import { ${x.name} } from '${prefix}/hooks/${x.name}';`),
  ``,
  `interface Props {`,
  ...component.properties.map(x => `  ${x.name}: ${x.type};`),
  `}`,
  ``,
  `const ${component.name}: React.FC<Props> = (${writeProps(component.properties)}) => {`,
  ...component.hooks.map(x => `  ${x.name}();`),
  `  return <>${component.name}</>;`,
  `};`,
  ``,
  `export default ${component.name};`,
  ``
];

const writeHook = (hook: ComponentHook): string[] => [
  `export const ${hook.name} = () => {`,
  `  return {`,
  `  };`,
  `};`,
  ``
];

const generateFile = async (tree: ComponentTree) => {
  const zip = new JSZip();
  const components = zip.folder('components');
  const hooks = zip.folder('hooks');

  let component = tree.components.root;
  zip.file(`${component.name}.tsx`, writeComponent(component, '.').join('\r\n'));
  component.hooks.forEach(x => hooks.file(`${x.name}.ts`, writeHook(x).join('\r\n')));

  for (component of Object.values(tree.components).filter(x => x.id !== 'root')) {
    components.file(`${component.name}.tsx`, writeComponent(component, '..').join('\r\n'));
    component.hooks.forEach(x => hooks.file(`${x.name}.ts`, writeHook(x).join('\r\n')));
  }

  return await zip.generateAsync({ type: 'blob' });
};

export const useExport = (diagram: Diagram) => {
  const [loading, setLoading] = useState(false);

  const download = async (tree: ComponentTree) => {
    setLoading(true);
    try {
      const file = await generateFile(tree);

      const download = window.document.createElement('a');
      download.href = window.URL.createObjectURL(file);
      download.download = `${diagram.name}.zip`;
      document.body.appendChild(download);
      download.click();
      document.body.removeChild(download);
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
