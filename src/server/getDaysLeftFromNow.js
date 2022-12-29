module.exports = {
  getDaysLeftFromNow(arrivalDate) {
    const arrivalDateInMiliSeconds = new Date(arrivalDate).getTime();
    const differenceInMiliseconds =
      arrivalDateInMiliSeconds - new Date().getTime();
    const days = Math.ceil(differenceInMiliseconds / (1000 * 60 * 60 * 24));
    return days;
  },
};
