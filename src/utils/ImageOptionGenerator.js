export const options = (length = 1) => ({
  mediaType: 'photo',
  includeBase64: false,
  maxHeight: 2000,
  maxWidth: 2000,
  selectionLimit: length,
  quality: 1,
});
