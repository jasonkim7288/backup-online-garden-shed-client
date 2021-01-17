export const convertDateToString = paramDate => {
  if (paramDate) {
    const date = paramDate.getDate();
    const month = paramDate.getMonth() + 1;
    const year = paramDate.getFullYear();
    return `${date < 10 ? `0${date}` : `${date}`}/${month < 10 ? `0${month}` : `${month}`}/${year}`;
  } else {
    return '';
  }
}

export const getCurrentDate = () => {
  const newDate = new Date();
  return convertDateToString(newDate);
};

export const dayCount = (paramStartingDate, paramTargetDate) => {
  // console.log('paramStartingDate: ', paramStartingDate)
  paramStartingDate = new Date(paramStartingDate);
  // console.log('paramStartingDate after creating new: ', paramStartingDate)
  paramTargetDate = new Date(paramTargetDate);
  const startingDate = paramStartingDate.getDate();
  const startingMonth = paramStartingDate.getMonth();
  const startingYear = paramStartingDate.getFullYear();
  const targetDate = paramTargetDate.getDate();
  const targetMonth = paramTargetDate.getMonth();
  const targetYear = paramTargetDate.getFullYear();
  const newStartingDate = new Date(startingYear, startingMonth, startingDate);
  const newTargetDate = new Date(targetYear, targetMonth, targetDate);

  const resultDay = (newTargetDate - newStartingDate) / (1000 * 3600 * 24) + 1;
  return resultDay > 0 ? resultDay : 1;
};

export const convertStringToDateString = str => {
  const convertedDate = new Date(str);
  return convertDateToString(convertedDate);
};