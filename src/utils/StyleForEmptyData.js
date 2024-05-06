export const returnStyleForEmptyData = sneakers => {
  if (sneakers.length === 0) {
    return {flex: 1, justifyContent: 'center', alignItems: 'center'};
  } else {
    return null;
  }
};
