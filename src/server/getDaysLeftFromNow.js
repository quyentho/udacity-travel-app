module.exports = {
  getDaysLeftFromNow(departingDate, now = new Date()) {
    const departingDateInMiliSeconds = new Date(departingDate).getTime();
    const differenceInMiliseconds = departingDateInMiliSeconds - now.getTime();
    const days = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));

    return days;
  },
};
