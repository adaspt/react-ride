import { Diagram } from '../model/diagrams';
import { ApiRequest } from './model';

const getCollectionPath = (projectId: string) => `projects/${projectId}/diagrams`;

const mapSnapshotToModel = (projectId: string) => (
  snapshot: firebase.firestore.QueryDocumentSnapshot
): Diagram => {
  const data = snapshot.data();
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
