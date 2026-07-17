/**
 * CHARIOT/TIME (native)
 */

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;

function to_date(input) {
  if (input instanceof Date) return new Date(input);
  if (typeof input === "number") return new Date(input * 1000);
  return new Date(input);
}

function to_unix(date) {
  return Math.floor(to_date(date).getTime() / 1000);
}

function from_unix(unix) {
  return new Date(unix * 1000);
}

function now_unix() {
  return Math.floor(Date.now() / 1000);
}

function now_iso() {
  return new Date().toISOString();
}

function is_valid(date) {
  return !isNaN(to_date(date).getTime());
}

function format(date) {
  const d = to_date(date);
  return d.toLocaleString("tr-TR");
}

function add_seconds(date, v) {
  return new Date(to_date(date).getTime() + v * SECOND);
}

function add_minutes(date, v) {
  return new Date(to_date(date).getTime() + v * MINUTE);
}

function add_hours(date, v) {
  return new Date(to_date(date).getTime() + v * HOUR);
}

function add_days(date, v) {
  return new Date(to_date(date).getTime() + v * DAY);
}

function add_weeks(date, v) {
  return new Date(to_date(date).getTime() + v * WEEK);
}

function subtract_days(date, v) {
  return add_days(date, -v);
}

function start_of_day(date) {
  const d = to_date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function end_of_day(date) {
  const d = start_of_day(date);
  return new Date(d.getTime() + DAY - 1);
}

function diff_seconds(a, b) {
  return Math.floor((to_date(a) - to_date(b)) / SECOND);
}

function diff_minutes(a, b) {
  return Math.floor((to_date(a) - to_date(b)) / MINUTE);
}

function diff_hours(a, b) {
  return Math.floor((to_date(a) - to_date(b)) / HOUR);
}

function diff_days(a, b) {
  return Math.floor((to_date(a) - to_date(b)) / DAY);
}

function is_before(a, b) {
  return to_date(a) < to_date(b);
}

function is_after(a, b) {
  return to_date(a) > to_date(b);
}

function is_between(date, start, end) {
  const d = to_date(date).getTime();
  return d >= to_date(start).getTime() && d <= to_date(end).getTime();
}

function is_today(date) {
  const d = to_date(date);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

function is_weekend(date) {
  const day = to_date(date).getDay();
  return day === 0 || day === 6;
}

function days_in_month(date) {
  const d = to_date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function calculate_age(birthdate) {
  const b = to_date(birthdate);
  const now = new Date();
  let age = now.getFullYear() - b.getFullYear();
  const m = now.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < b.getDate())) age--;
  return age;
}

function clamp(date, min, max) {
  const d = to_date(date).getTime();
  const minT = to_date(min).getTime();
  const maxT = to_date(max).getTime();
  return new Date(Math.min(Math.max(d, minT), maxT));
}

function generate_date_range(start, end) {
  const result = [];
  let current = start_of_day(start);
  const last = start_of_day(end);

  while (current <= last) {
    result.push(new Date(current));
    current = add_days(current, 1);
  }

  return result;
}

function add_business_days(date, days) {
  let d = to_date(date);
  while (days > 0) {
    d = add_days(d, 1);
    if (!is_weekend(d)) days--;
  }
  return d;
}

module.exports = {
  now_unix,
  now_iso,
  to_unix,
  from_unix,
  is_valid,
  format,
  add_seconds,
  add_minutes,
  add_hours,
  add_days,
  add_weeks,
  subtract_days,
  start_of_day,
  end_of_day,
  diff_seconds,
  diff_minutes,
  diff_hours,
  diff_days,
  is_before,
  is_after,
  is_between,
  is_today,
  is_weekend,
  days_in_month,
  calculate_age,
  clamp,
  generate_date_range,
  add_business_days,
};
