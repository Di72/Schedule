export const dataModification = (date:string) => {
  const taskStaretDate = date.split('/');
  const day = Number(taskStaretDate[0]);
  const month = Number(taskStaretDate[1]) - 1;
  const year = Number('20' + taskStaretDate[2]);

  return  new Date(year, month, day)
}

export const modificateDateForPost = (date:Date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = String(date.getFullYear()).slice(2);

  return [day,month,year].join('/');
}

export const uuidv4 = () => {
  return 'xxxxxxxxxxxx4xyx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}