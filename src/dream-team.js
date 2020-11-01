const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (!members || !Array.isArray(members)) return false;
  const names = members
    .filter((el) => typeof el === "string")
    .map((el) => el.trim().substring(0, 1).toUpperCase() || "");

  return names.sort().join("");
};
