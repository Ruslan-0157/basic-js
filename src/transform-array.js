const CustomError = require("../extensions/custom-error");

const commandsPREV = ["--discard-prev", "--double-prev"];
const commandsNEXT = ["--double-next", "--discard-next"];
const commands = [...commandsPREV, ...commandsNEXT];

module.exports = function transform(arr) {
  if (!arr || !Array.isArray(arr)) throw new Error("Not valid array type");
  // console.log("000arr", arr);

  let tmpArr = [];
  let startIndex = 0;
  let discardNext = false;
  let missed = -1;
  let hasCommand = false;

  arr.forEach((el, index, thisArr) => {
    const isCommand = commands.includes(el);
    if (isCommand && !hasCommand) hasCommand = true;
    if (commandsPREV.includes(el) && index === 0) return;
    if (!isCommand && missed === 1) {
      discardNext = false;
      missed = -1;
    }
    if (isCommand) {
      const endIndex = index;
      switch (el) {
        case "--discard-prev":
          if (discardNext && missed >= 1) {
            discardNext = false;
            missed = -1;
            return;
          }
          tmpArr.pop();
          break;
        case "--double-prev":
          if (discardNext && missed >= 1) {
            discardNext = false;
            missed = -1;
            return;
          }
          tmpArr.push(tmpArr.slice(-1)[0]);
          break;
        case "--double-next":
          if (discardNext && missed >= 1) {
            discardNext = false;
            missed = -1;
          }
          if (index + 1 < thisArr.length) tmpArr.push(thisArr[index + 1]);
          break;
        case "--discard-next":
          if (endIndex + 1 > thisArr.length) break;
          else {
            discardNext = true;
            missed = 0;
          }
          break;
      }
    } else if (!discardNext || missed === -1 || missed > 1) {
      tmpArr.push(el);
    } else if (discardNext && missed === 0) return (missed += 1);
  });

  if (!hasCommand) return arr;
  else return tmpArr;
};

