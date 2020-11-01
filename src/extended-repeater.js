const CustomError = require("../extensions/custom-error");

module.exports = function repeater(str, options) {
  const repeatTimes =
    options.repeatTimes === undefined ? 1 : options.repeatTimes;
  const separator = options.separator === undefined ? "+" : options.separator;
  let addition =
    options.addition === undefined
      ? ""
      : options.addition === null
      ? `${options.addition}`
      : options.addition.toString();
  const additionRepeatTimes =
    options.additionRepeatTimes !== undefined ? options.additionRepeatTimes : 1;
  const additionSeparator =
    options.additionSeparator !== undefined ? options.additionSeparator : "|";
  const initStr = str === null ? `${str}` : str.toString();
  let result = "";
  let resultAddition = "";
  if (addition !== "") {
    for (i = 0; i < additionRepeatTimes; i++) {
      if (i + 1 === additionRepeatTimes) resultAddition += addition;
      else resultAddition += addition + additionSeparator;
    }
  }
  for (i = 0; i < repeatTimes; i++) {
    if (i + 1 === repeatTimes) result += initStr + resultAddition;
    else result += initStr + resultAddition + separator;
  }

  return result;
};
  
