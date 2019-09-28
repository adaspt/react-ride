export interface User {
  id: string;
  displayName: string;
  email: string;
}

export const mapFirebaseUserToUser = (user: firebase.User): User => ({
  id: user.uid,
  displayName: user.displayName || 'Unknown',
  email: user.email || 'unknown'
});
