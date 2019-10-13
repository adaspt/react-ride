import { Diagram } from '../model/diagrams';
import { ApiRequest } from './model';

const getCollectionPath = (projectId: string) => `projects/${projectId}/diagrams`;

type Dto = Omit<Diagram, 'id' | 'projectId'>;

const mapSnapshotToModel = (projectId: string) => (
  snapshot: firebase.firestore.DocumentSnapshot
): Diagram => {
  const data = snapshot.data();
  if (!data) {
    throw new TypeError('Document does not exist.');
  }

  return {
    id: snapshot.id,
    projectId,
    name: data.name
  };
};

export const getDiagrams = (projectId: string): ApiRequest<Diagram[]> => async db => {
  const result = await db
    .collection(getCollectionPath(projectId))
    .orderBy('name')
    .get();
  return result.docs.map(mapSnapshotToModel(projectId));
};

export const getDiagram = (projectId: string, diagramId: string): ApiRequest<Diagram> => async db => {
  const result = await db
    .collection(getCollectionPath(projectId))
    .doc(diagramId)
    .get();
  if (!result.exists) {
    throw new TypeError('Diagram does not exist.');
  }

  return mapSnapshotToModel(projectId)(result);
};

export const createDiagram = (projectId: string, data: Dto): ApiRequest<Diagram> => async db => {
  const result = await db.collection(getCollectionPath(projectId)).add(data);
  return {
    id: result.id,
    projectId,
    ...data
  };
};
