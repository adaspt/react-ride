export type ApiRequest<T = void> = (db: firebase.firestore.Firestore) => Promise<T>;
