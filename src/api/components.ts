import { Component } from '../model/component';
import { ApiRequest } from './model';

const getCollectionPath = (projectId: string) => `projects/${projectId}/components`;

const mapSnapshotToModel = (snapshot: firebase.firestore.DocumentSnapshot): Record<string, Component> => {
  const data = snapshot.data();
  if (!data) {
    throw new TypeError('Document does not exist.');
  }

  return data.components;
};

export const getComponents = (
  projectId: string,
  diagramId: string
): ApiRequest<Record<string, Component> | null> => async db => {
  const result = await db
    .collection(getCollectionPath(projectId))
    .doc(diagramId)
    .get();
  if (!result.exists) {
    return null;
  }

  return mapSnapshotToModel(result);
};
