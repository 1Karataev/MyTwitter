export const formDataFromFile = (file: Blob) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};
