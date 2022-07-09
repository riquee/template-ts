import * as moment from "moment";

export const currentDateDiff = (diff: number, format: string = "YYYY-MM-DD") => {
  const today = moment().add(1, 'day').format(format);
  const diffDay = moment().add(-diff, "day");
  return { today, lastDay: diffDay.format(format) };
};

export const formatDate = (date: string) =>
  date.substring(0, 4) + "-" + date.substring(4, 6) + "-" + date.substring(6, 8);
