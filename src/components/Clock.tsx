import { useEffect, useState } from "react";
import { ClockProps } from "./Clock.type";

const Clock = (props: ClockProps) => {
  const {
    twoLines,
    timeFirst,
    trim,
    hour12 = true,
    dateFormat = "long" as const,
    weekday = undefined,
    second = "numeric",
    color = "white",
    fontSize = "1rem",
    textAlign = "center",
    fontWeight = "400",
    fontFamily = "sans-serif",
  } = props;

  const [date, setDate] = useState(new Date());
  const containerStyles = {
    textAlign: textAlign,
    color: color,
    fontFamily: fontFamily,
    fontSize: fontSize,
    fontWeight: fontWeight,
  };

  const defaultDateOptions = {
    weekday: weekday,
    year: "numeric" as const,
    month: dateFormat,
    day: "numeric" as const,
  };
  const defaultTimeOptions = {
    second: second,
    hour: "numeric" as const,
    minute: "numeric" as const,
    hour12: hour12,
  };

  const dateString = new Intl.DateTimeFormat(
    "en-US",
    defaultDateOptions
  ).format(date);
  const time = new Intl.DateTimeFormat("en-US", defaultTimeOptions).format(
    date
  );

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
        {timeFirst ? (
          <>
            <span>
              {trim !== "time" ? (
                <>
                  {time}
                  {trim === undefined ? <>&nbsp;</> : null}
                </>
              ) : null}
            </span>
            {twoLines && trim === undefined ? <br /> : null}
            <span>{trim !== "date" ? dateString : null}</span>
          </>
        ) : (
          <>
            <span>
              {trim !== "date" ? (
                <>
                  {dateString}
                  {trim === undefined ? <>&nbsp;</> : null}
                </>
              ) : null}
            </span>
            {twoLines && trim === undefined ? <br /> : null}
            <span>{trim !== "time" ? time : null}</span>
          </>
        )}
      </p>
    </>
  );
};

export default Clock;
