import { CSSProperties } from "react";

export interface ClockProps {
  twoLines?: boolean | undefined;
  timeFirst?: boolean | undefined;
  trim?: "date" | "time" | undefined;

  color?: CSSProperties["color"];
  fontFamily?: CSSProperties["fontFamily"]; //Google Font Type
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  textAlign?: CSSProperties["textAlign"];

  hour12?: boolean | undefined;
  dateFormat?: "long" | "numeric" | "short";
  weekday?: "long" | "short" | "narrow" | undefined;
  second?: "numeric" | "2-digit" | undefined;
}
