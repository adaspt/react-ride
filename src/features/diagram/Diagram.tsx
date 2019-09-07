import React from 'react';
import Component from './components/component/Component';
import ComponentDetails from './components/componentDetails/ComponentDetails';
import Panel from '../../components/panel/Panel';

const Diagram: React.FC = () => {
  return (
    <div className="row no-gutters flex-fill">
      <div className="col-9">
        <div className="absolute-fill overflow-auto small">
          <nav className="ml-3 mt-3 mr-3">
            <ol className="breadcrumb mb-0 py-2">
              <li className="breadcrumb-item">Home</li>
              <li className="breadcrumb-item">App</li>
              <li className="breadcrumb-item">Layout</li>
              <li className="breadcrumb-item active">Menu</li>
            </ol>
          </nav>
          <div className="row no-gutters p-2">
            <Component name="App" width={6} hooks={[]}>
              <Component name="Diagram" width={6} hooks={[]}>
                <Component name="Designer" width={4} hooks={[]}>
                  <Component name="Path" width={6} hooks={[]} />
                  <Component name="Component" width={6} hooks={[]} />
                </Component>
                <Component name="SideBar" width={2} hooks={[]}>
                  <Component name="ComponentDetails" width={6} hooks={[]} />
                  <Component name="AdditionalDetails" width={6} hooks={[]} />
                </Component>
              </Component>
            </Component>
          </div>
        </div>
      </div>
      <div className="col-3 border-left d-flex">
        <div className="d-flex flex-column flex-fill">
          <ComponentDetails />
          <Panel continuous>
            <div className="card-header">Prop</div>
            <div className="card-body">Selected prop/hook</div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default Diagram;
