export const removeDomain = (email) => {
  return email.split('@')[0];
}

export const getUniquePlantName = (plantRecord) => {
  if (plantRecord.recordNum > 1) {
    return `${plantRecord.commonName} (${plantRecord.recordNum})`;
  } else {
    return plantRecord.commonName;
  }
}