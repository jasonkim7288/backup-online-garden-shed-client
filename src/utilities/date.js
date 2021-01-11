export const convertDateToString = paramDate => {
  const date = paramDate.getDate();
  const month = paramDate.getMonth() + 1;
  const year = paramDate.getFullYear();
  return `${date < 10 ? `0${date}` : `${date}`}/${month < 10 ? `0${month}` : `${month}`}/${year}`
}

export const getCurrentDate = () => {
  const newDate = new Date();
  return convertDateToString(newDate);
};

export const dayCount = startingDate => {
  
};

export const convertStringToDateString = str => {
  const convertedDate = new Date(str);
  return convertDateToString(convertedDate);
};