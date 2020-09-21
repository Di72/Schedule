import moment from 'moment-timezone';
import { Itime } from 'src/types/types';

export const timer = (
  currentTimeZone: string,
  dateTime: string,
  deadline: string,
  handleTime: {
    [x: string]: React.Dispatch<React.SetStateAction<Itime | null>>;
  }
) => {
  const { setTimeLeft, setStartsIn } = handleTime;

  const setDateToEnd = (
    date: moment.Moment,
    now: moment.Moment,
    state: React.Dispatch<React.SetStateAction<Itime | null>>
  ) => {
    const data = {
      days: date.diff(now, 'days'),
      hours: date.diff(now, 'hours') % 24,
      minutes: date.diff(now, 'minutes') % 60,
    };

    state((prevState: Itime | null) => {
      if (JSON.stringify(prevState) !== JSON.stringify(data)) {
        return data;
      }
      return prevState;
    });
  };

  const deadlineTime = deadline && moment(+deadline);
  const dateTimeStartsIn = moment(+dateTime);
  const timerInterval = setInterval(() => {
    const now = moment().tz(currentTimeZone, true);
    const showTimeLeft = +moment(+dateTime).format('x') < +now.format('x');
    const showStartsIn = +moment(+dateTime).format('x') > +now.format('x');

    if (deadlineTime && showTimeLeft) {
      setDateToEnd(deadlineTime, now, setTimeLeft);
      if (deadlineTime.diff(now) < 0) {
        setTimeLeft(null);
        clearInterval(timerInterval);
      }
    }
    if (dateTimeStartsIn && showStartsIn) {
      setDateToEnd(dateTimeStartsIn, now, setStartsIn);
      if (dateTimeStartsIn.diff(now) < 0) {
        setTimeLeft(null);
        clearInterval(timerInterval);
      }
    }
  }, 1e3);

  return () => {
    clearInterval(timerInterval);
  };
};
