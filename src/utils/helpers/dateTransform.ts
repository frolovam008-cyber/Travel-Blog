export const dateTransform = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // месяцы 0-11
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};