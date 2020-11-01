const CustomError = require("../extensions/custom-error");

module.exports = function getSeason(date) {

  if (!date) return "Unable to determine the time of year!";
  if (date instanceof Date && !isNaN(date))
    throw new CustomError("Not valid date format");

  const month = date.getMonth();
  if (month > 2 && month < 6) return "spring";
  if (month > 5 && month < 10) return "summer";
  if (month > 9 && month < 12) return "autumn";
  if (month > 11 && month < 3) return "winter";
};
