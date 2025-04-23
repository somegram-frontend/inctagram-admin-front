import {
  differenceInSeconds,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  differenceInMinutes,
} from "date-fns";

export function calculateRemainingTime(endDate: string) {
  const currentDate = new Date();
  const endDateOfSubscription = new Date(endDate);

  let remainingTime;
  let timeUnit;

  const seconds = differenceInSeconds(endDateOfSubscription, currentDate);
  const minutes = differenceInMinutes(endDateOfSubscription, currentDate);
  const hours = differenceInHours(endDateOfSubscription, currentDate);
  const days = differenceInDays(endDateOfSubscription, currentDate);
  const months = differenceInMonths(endDateOfSubscription, currentDate);
  const years = differenceInYears(endDateOfSubscription, currentDate);

  if (seconds < 60) {
    remainingTime = seconds;
    timeUnit = "second";
  } else if (minutes < 60) {
    remainingTime = minutes;
    timeUnit = "minute";
  } else if (hours < 24) {
    remainingTime = hours;
    timeUnit = "hour";
  } else if (days < 30) {
    remainingTime = days;
    timeUnit = "day";
  } else if (months < 12) {
    remainingTime = months;
    timeUnit = "month";
  } else {
    remainingTime = years;
    timeUnit = "year";
  }

  if (remainingTime < 1) {
    return "Expired";
  }

  if (remainingTime === 1) {
    return `${remainingTime} ${timeUnit}`;
  }

  return `${remainingTime} ${timeUnit}s`;
}
