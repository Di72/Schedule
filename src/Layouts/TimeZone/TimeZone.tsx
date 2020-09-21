import moment from 'moment-timezone';

export const timeRenderer = (timeZone: string) => (value: string) => {
  console.log('timeZone: ', timeZone, '\nvalue:', value);
  return value
    ? moment(value, 'YYYY-MM-DD HH:mmZ').tz(timeZone).format('HH:mm')
    : '';
};
