import { ComponentTree } from '../model/component';
import { ApiRequest } from './model';

const getCollectionPath = (projectId: string) => `projects/${projectId}/components`;

const mapSnapshotToModel = (snapshot: firebase.firestore.DocumentSnapshot): ComponentTree => {
  const data = snapshot.data();
  if (!data) {
    throw new TypeError('Document does not exist.');
  }

  return data.tree;
};

export const getTree = (
  projectId: string,
  diagramId: string
): ApiRequest<ComponentTree | null> => async db => {
  const result = await db
    .collection(getCollectionPath(projectId))
    .doc(diagramId)
    .get();
  if (!result.exists) {
    return null;
  }

  return mapSnapshotToModel(result);
};

export const saveTree = (
  projectId: string,
  diagramId: string,
  tree: ComponentTree
): ApiRequest<void> => async db => {
  await db
    .collection(getCollectionPath(projectId))
    .doc(diagramId)
    .set({ tree });
};
