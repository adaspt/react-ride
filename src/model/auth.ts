export interface User {
  uid: string;
  displayName: string;
}

export const mapFirebaseUserToUser = (user: firebase.User | null): User | null => {
  if (user == null) {
    return null;
  }

  return {
    uid: user.uid,
    displayName: user.displayName || user.email || 'Unknown'
  };
};
