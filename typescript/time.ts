/**
 * CHARIOT/TIME
 *
 * Chariot Time is a little time library which can be used in precise time calculations using UNIX timestamps.
 * Version: 1.5 (TS Refactor)

 */

import moment from "moment";
moment.locale("tr");

console.log("[TIME] Zaman kütüphanesi hazır.");

export async function convertTimestampToEpochDate(
  timestampDate: string | Date
): Promise<number | void> {
  if (!timestampDate) {
    console.log("Lütfen bir zaman verisi girin.");
    return;
  }
  return moment(timestampDate).unix();
}

export async function convertToHumanDateAsObjects(epochDate: number): Promise<{
  day: number;
  hour: number;
  minute: number;
  second: number;
}> {
  const eeee = moment.unix(epochDate);
  const time = moment();
  const duration = moment.duration(time.diff(eeee));

  return {
    day: Math.floor(duration.asDays()),
    hour: Math.floor(duration.asHours() % 24),
    minute: Math.floor(duration.asMinutes() % 60),
    second: Math.floor(duration.asSeconds() % 60),
  };
}

export async function reallyIsBetween(
  date1: number,
  date2: number
): Promise<boolean> {
  const currentEpoch = moment().unix();
  return currentEpoch >= date1 && currentEpoch <= date2;
}

export async function pickARandom2Dates(): Promise<{
  start: number;
  stop: number;
  current: number;
}> {
  const crnt = moment().startOf("day");
  const currentTime = moment();
  let randomTime1: moment.Moment;
  let randomTime2: moment.Moment;

  do {
    const rndm1 = Math.floor(Math.random() * 24);
    const rndm2 = Math.floor(Math.random() * 24);

    randomTime1 = crnt.clone().add(rndm1, "hours");
    randomTime2 = crnt.clone().add(rndm2, "hours");

    [randomTime1, randomTime2] = [randomTime1, randomTime2].sort(
      (a, b) => a.valueOf() - b.valueOf()
    );
  } while (randomTime2.isBefore(currentTime));

  if (randomTime1.isBefore(currentTime)) {
    randomTime1 = currentTime;
  }

  return {
    start: randomTime1.unix(),
    stop: randomTime2.unix(),
    current: currentTime.unix(),
  };
}

export async function convertToHumanDate(
  unix: number
): Promise<{ convertion: string }> {
  const tm = moment.unix(unix).format("DD/MM/YYYY - hh:mm:ss");
  return { convertion: tm };
}

export async function beforeAWeek(duration: number): Promise<{ week: number }> {
  const week = duration - 604800;
  return { week };
}

export async function currentTime(): Promise<{ current: number }> {
  return { current: moment().unix() };
}

export async function durationBetweenGivenTwoTimes(
  duration1: number,
  duration2: number
): Promise<
  | string
  | {
      minute: number;
      hour: number;
      day: number;
      week: number;
      month: number;
      year: number;
    }
> {
  const time1 = moment.unix(duration1);
  const time2 = moment.unix(duration2);
  const durationBetween = moment.duration(time1.diff(time2));

  if (durationBetween.milliseconds().toString().startsWith("-")) {
    return "Zaman hesaplaması hatası";
  }

  return {
    minute: Math.floor(durationBetween.asMinutes()),
    hour: Math.floor(durationBetween.asHours()),
    day: Math.floor(durationBetween.asDays()),
    week: Math.floor(durationBetween.asWeeks()),
    month: Math.floor(durationBetween.asMonths()),
    year: Math.floor(durationBetween.asYears()),
  };
}

export async function durationBetweenGivenTime(
  durationToBeCompared: number
): Promise<{
  minute: number;
  hour: number;
  day: number;
  week: number;
  month: number;
  year: number;
}> {
  const now = moment();
  const end = moment.unix(durationToBeCompared);
  const diff = moment.duration(now.diff(end));

  return {
    minute: Math.floor(diff.asMinutes()),
    hour: Math.floor(diff.asHours()),
    day: Math.floor(diff.asDays()),
    week: Math.floor(diff.asWeeks()),
    month: Math.floor(diff.asMonths()),
    year: Math.floor(diff.asYears()),
  };
}

// Bu method kullanımdan kaldırıldı, sadece örnek amaçlı tutuluyor.
export async function deprecated_compare(
  TimeWillComparedTimeAsEpoch: number
): Promise<boolean | string> {
  if (typeof TimeWillComparedTimeAsEpoch !== "number") {
    return "Geçerli UNIX zaman verisi giriniz. UNIX zaman verileri SADECE rakamlarla belirtilir.";
  }

  const moment1 = moment(TimeWillComparedTimeAsEpoch);
  const current = moment().unix();
  const moment2 = moment(current);

  const diff = moment2.diff(moment1, "weeks");

  return diff >= 1;
}
