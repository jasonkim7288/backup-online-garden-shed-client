export const removeDomain = (email) => {
  return email.split('@')[0];
}