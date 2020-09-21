export const dataModification = (date: string) => {
  const taskStaretDate = date.split('/');
  const day = Number(taskStaretDate[0]);
  const month = Number(taskStaretDate[1]) - 1;
  const year = Number(taskStaretDate[2]);

  return new Date(year, month, day);
};

export const modificationDateForPost = (date: Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = String(date.getFullYear());

  return [day, month, year].join('/');
};

export const addOneDay = (date: Date) => date.setDate(date.getDate() + 1);
