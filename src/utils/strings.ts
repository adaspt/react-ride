const alphabet = 'bjectSymhasOwnProp-0123456789ABCDEFGHIJKLMNQRTUVWXYZ_dfgiklquvxz';

export const uniqueId = (size = 21) => {
  let id = '';
  while (0 < size--) {
    id += alphabet[(Math.random() * 64) | 0];
  }

  return id;
};
