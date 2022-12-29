// we need parameters for testing purpose.
export default function get16DaysFromNow(now = new Date(), numberOfDays = 16) {
  now.setDate(now.getDate() + numberOfDays);
  return now;
}
