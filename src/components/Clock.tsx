import {CSSProperties, useEffect, useState} from "react";

interface ClockProps{
  twoLines?: boolean | undefined;
  timeFirst?: boolean | undefined;
  trim? : 'date' | 'time' | undefined

  color?: CSSProperties['color'];
  fontFamily?: CSSProperties['fontFamily']; //Google Font Type
  fontSize?: CSSProperties['fontSize'];
  fontWeight?: CSSProperties['fontWeight'];
  textAlign?: CSSProperties['textAlign']

  hour12?: boolean | undefined;
  dateFormat?: 'long' | 'numeric' | 'short';
  weekday?: 'long' | 'short' | 'narrow' | undefined;
  second?: 'numeric' | '2-digit' | undefined;
}

const Clock = (props:ClockProps) => {
  const {
    twoLines,
    timeFirst,
    trim,
    hour12 = true,
    dateFormat = 'long' as const,
    weekday = undefined,
    second = 'numeric',
    color = 'white',
    fontSize = '1rem',
    textAlign = 'center',
    fontWeight = '400',
    fontFamily = 'sans-serif'} = props;

  const [date, setDate] = useState(new Date());
  const containerStyles = {
    textAlign: textAlign,
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontWeight,
  }

  const defaultDateOptions = {
    weekday: weekday,
    year: 'numeric' as const,
    month: dateFormat,
    day: 'numeric' as const
  };
  const defaultTimeOptions = {
    second: second,
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
        <p id="clock" style={containerStyles}>
          {
            timeFirst ?
                <>
                  {trim !== 'time' ? <span>{time}{trim === undefined ? <>&nbsp;</> : null}</span> : null}
                  {
                    twoLines && trim === undefined ? <br/> : null
                  }
                  {trim !== 'date' ? <span>{dateString}</span> : null}
                </>
                :
                <>
                  {trim !== 'date' ? <span>{dateString}{trim === undefined ? <>&nbsp;</> : null}</span> : null}
                  {
                    twoLines && trim === undefined ? <br/> : null
                  }
                  {trim !== 'time' ? <span>{time}</span> : null}
                </>
          }
        </p>
      </>
  )

};

export default Clock