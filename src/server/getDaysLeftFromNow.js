module.exports = {
  getDaysLeftFromNow(departingDate) {
    const departingDateInMiliSeconds = new Date(departingDate).getTime();
    const differenceInMiliseconds =
      departingDateInMiliSeconds - new Date().getTime();
    const days = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));
    return days;
  },
};
