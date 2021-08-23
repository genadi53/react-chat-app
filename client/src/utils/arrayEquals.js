export const arrayEquals = (a, b) => {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, idx) => {
    return element[idx] === b[idx];
  });
};
