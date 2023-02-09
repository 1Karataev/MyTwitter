import formatDistance from 'date-fns/formatDistance';
import ruLang from 'date-fns/locale/ru';

export const formDataFromFile = (file: Blob) => {
  const formData = new FormData();
  formData.append('image', file);
  return formData;
};

export const formDate = (date: Date): string => {
  return formatDistance(
    date,
    new Date(),
    {locale: ruLang}
  );
};
