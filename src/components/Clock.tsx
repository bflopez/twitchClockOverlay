import {useEffect, useState} from "react";

interface ClockProps{
  hour12?: boolean;
  dateFormat?: 'long' | 'numeric' | 'short';
  weekday?: 'long' | 'short' | 'narrow' | undefined;
  second?: boolean;
}

const Clock = (props:ClockProps) => {
  const {hour12 = true, dateFormat = 'long' as const, weekday = undefined, second = undefined} = props;
  const [date, setDate] = useState(new Date());
  const defaultDateOptions = {
    weekday: weekday,
    year: 'numeric' as const,
    month: dateFormat,
    day: 'numeric' as const
  };
  const defaultTimeOptions = {
    second: second ? 'numeric' as const : undefined,
    hour: 'numeric' as const,
    minute: 'numeric' as const,
    hour12: hour12
  };

  const dateString = new Intl.DateTimeFormat('en-US', defaultDateOptions).format(date)
  const time = new Intl.DateTimeFormat('en-US',defaultTimeOptions).format(date)

  const refreshClock = () => {
    setDate(new Date());
  };

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  return (
      <>
        <p>{dateString}</p>
        <p>{time}</p>
      </>
  )

};

export default Clock