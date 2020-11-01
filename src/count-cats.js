const CustomError = require("../extensions/custom-error");

module.exports = function countCats(matrix) {
  let counter = 0;
  matrix.forEach((massiv) => {
    const foundCats = massiv.filter((el) => el === "^^");
    counter += foundCats.length;
  });
  return counter;
};

