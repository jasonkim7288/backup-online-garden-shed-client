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

export const dayCount = (paramStartingDate, paramTargetDate) => {
  paramStartingDate = new Date(paramStartingDate);
  paramTargetDate = new Date(paramTargetDate);
  const startingDate = paramStartingDate.getDate();
  const startingMonth = paramStartingDate.getMonth();
  const startingYear = paramStartingDate.getFullYear();
  const targetDate = paramTargetDate.getDate();
  const targetMonth = paramTargetDate.getMonth();
  const targetYear = paramTargetDate.getFullYear();
  const newStartingDate = new Date(startingYear, startingMonth, startingDate);
  const newTargetDate = new Date(targetYear, targetMonth, targetDate);

  return (newTargetDate - newStartingDate) / (1000 * 3600 * 24) + 1;
};

export const convertStringToDateString = str => {
  const convertedDate = new Date(str);
  return convertDateToString(convertedDate);
};