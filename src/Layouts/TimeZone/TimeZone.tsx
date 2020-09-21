import moment from 'moment-timezone';

export const timeRenderer = (timeZone: string) => (value: string) => {
  return value
    ? moment(value, 'YYYY-MM-DD HH:mmZ').tz(timeZone).format('HH:mm')
    : '';
};
