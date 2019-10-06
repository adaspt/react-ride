import { Project } from '../model/projects';
import { ApiRequest } from './model';

const getCollectionPath = () => 'projects';

const mapSnapshotToModel = (snapshot: firebase.firestore.DocumentSnapshot): Project => {
  const data = snapshot.data();
  if (!data) {
    throw new TypeError('Document does not exist.');
  }

  return {
    id: snapshot.id,
    name: data.name,
    ownerId: data.ownerId
  };
};

export const getProjects = (): ApiRequest<Project[]> => async db => {
  const result = await db
    .collection(getCollectionPath())
    .orderBy('name')
    .get();
  return result.docs.map(mapSnapshotToModel);
};

export const getProject = (projectId: string): ApiRequest<Project> => async db => {
  const result = await db
    .collection(getCollectionPath())
    .doc(projectId)
    .get();
  if (!result.exists) {
    throw new TypeError('Project does not exist.');
  }

  return mapSnapshotToModel(result);
};
