export const calculateMinDateOfBirth = () => {
  const theYear = new Date().getFullYear() - 15;
  return `${theYear}-01-01`;
}