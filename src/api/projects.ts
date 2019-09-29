import { Project } from '../model/projects';
import { ApiRequest } from './model';

const COLLECTION = 'projects';

const mapSnapshotToModel = (snapshot: firebase.firestore.QueryDocumentSnapshot): Project => {
  const data = snapshot.data();
  return {
    id: snapshot.id,
    name: data.name,
    ownerId: data.ownerId
  };
};

export const getProjects = (): ApiRequest<Project[]> => async db => {
  const result = await db
    .collection(COLLECTION)
    .orderBy('name')
    .get();
  return result.docs.map(mapSnapshotToModel);
};
