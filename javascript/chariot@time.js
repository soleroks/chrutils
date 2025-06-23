/**
 * CHARIOT/TIME
 *
 * Chariot Time is a little time library which can be used in precise time calculations using UNIX timestamps.
 * Version: 1.4

 */
let directives = require("./../../config/chariotDirectives.json");
const moment = require("moment");
const { ChariotNativeError } = require("./chariot@util");
moment.locale("tr");
console.log("[TIME] Zaman kütüphanesi hazır.");

module.exports = {
  convertTimestampToEpochDate: async function (timestampDate) {
    if (!timestampDate)
      throw new ChariotNativeError("Lütfen bir zaman verisi girin.");
    const chariotTime = moment(timestampDate).unix();

    return chariotTime;
  },
  convertToHumanDateAsObjects: async function (epochDate) {
    let eeee = moment.unix(epochDate);

    let time = moment();
    let duration = moment.duration(time.diff(eeee));

    const days = Math.floor(duration.asDays());
    const hours = Math.floor(duration.asHours() % 24);
    const minutes = Math.floor(duration.asMinutes() % 60);
    const seconds = Math.floor(duration.asSeconds() % 60);

    return (ChariotNativeTime = {
      day: days,
      hour: hours,
      minute: minutes,
      second: seconds,
    });
  },
  reallyIsBetween: async function (date1, date2) {
    const currentEpoch = moment().unix();
    if (currentEpoch >= date1 && currentEpoch <= date2) {
      return true;
    } else {
      return false;
    }
  },
  pickARandom2Dates: async function () {
    let crnt = moment().startOf("day");
    const currentTime = moment();

    let randomTime1, randomTime2;

    do {
      const rndm1 = Math.floor(Math.random() * 24);
      const rndm2 = Math.floor(Math.random() * 24);

      randomTime1 = crnt.clone().add(rndm1, "hours");
      randomTime2 = crnt.clone().add(rndm2, "hours");

      [randomTime1, randomTime2] = [randomTime1, randomTime2].sort(
        (a, b) => a - b
      );
    } while (randomTime2.isBefore(currentTime));

    if (randomTime1.isBefore(currentTime)) {
      randomTime1 = currentTime;
    }

    let ChariotNativeTime = {
      start: randomTime1.unix(),
      stop: randomTime2.unix(),
      current: currentTime.unix(),
    };

    return ChariotNativeTime;
  },
  convertToHumanDate: async function (unix) {
    let tm = moment.unix(unix).format("DD/MM/YYYY - hh:mm:ss");
    let chariotTime = { convertion: tm };
    return chariotTime;
  },

  beforeAWeek: async function (duration) {
    let time = moment.unix(duration);

    const week = duration - 604800;

    let chariotTime = { week: week };

    return chariotTime;
  },

  currentTime: async function () {
    let chariotTime = { current: moment().unix() };
    return chariotTime;
  },

  durationBetweenGivenTwoTimes: async function (duration1, duration2) {
    let time1 = moment.unix(duration1);
    let time2 = moment.unix(duration2);

    let durationBetween = moment.duration(time1.diff(time2));

    if (durationBetween.milliseconds.toString().startsWith("-"))
      return "Zaman hesaplaması hatası";
    let hours = Math.floor(durationBetween.asHours());
    let days = Math.floor(durationBetween.asDays());
    let minutes = Math.floor(durationBetween.asMinutes());
    let weeks = Math.floor(durationBetween.asWeeks());
    let months = Math.floor(durationBetween.asMonths());
    let years = Math.floor(durationBetween.asYears());
    let chariotTime = {
      minute: minutes,
      hour: hours,
      day: days,
      week: weeks,
      month: months,
      year: years,
    };

    return chariotTime;
  },
  // NOT: compare() fonksiyonunun yerine geçti. Daha kesin sonuçlar veriyor ve object döndürüyor. Oldukça ideal.
  durationBetweenGivenTime: async function (durationtoBeCompared) {
    var now = moment();
    let end = moment.unix(durationtoBeCompared);
    let sure = moment.duration(now.diff(end));
    let hours = Math.floor(sure.asHours());
    let days = Math.floor(sure.asDays());
    let minutes = Math.floor(sure.asMinutes());
    let weeks = Math.floor(sure.asWeeks());
    let months = Math.floor(sure.asMonths());
    let years = Math.floor(sure.asYears());

    let chariotTime = {
      minute: minutes,
      hour: hours,
      day: days,
      week: weeks,
      month: months,
      year: years,
    };

    return chariotTime;
  },
  // Bu method kullanımdan kaldırıldı, istersen hafta verisi hesaplamak için kullanabilirsin. Çok bir olayı yok ama olsun.
  deprecated_compare: async function (TimeWillComparedTimeAsEpoch) {
    if (typeof TimeWillComparedTimeAsEpoch !== "number")
      return "Geçerli UNIX zaman verisi giriniz. UNIX zaman verileri SADECE rakamlarla belirtilir.";

    let moment1 = moment(TimeWillComparedTimeAsEpoch);
    let current = moment().unix();
    let moment2 = moment(current);

    const diff = moment2.diff(moment1, "weeks");

    if (diff >= 1) {
      return true;
    } else {
      return false;
    }
  },
};
