export const removeDomain = (email) => {
  if (email && typeof email === 'string') {
    return email.split('@')[0];
  } else {
    return '';
  }
}

export const getUniquePlantName = (plantRecord) => {
  if (plantRecord) {
    if (plantRecord.recordNum > 1) {
      return `${plantRecord.commonName} (${plantRecord.recordNum})`;
    } else {
      return plantRecord.commonName;
    }
  } else {
    return '';
  }
}