const CustomError = require("../extensions/custom-error");

// addLink, reverseChain and removeLink methods are chainable, while the another ones are not.
// If addLink is called with no arguments, it adds an empty link ('( )') to the chain.
// If removeLink accepts invalid position (e.g. not a number, or a fractional number, or corresponding to a nonexistent link),
// it must throw an Error. After calling the finishChain method, the existing chain must be deleted, as if an Error was thrown.

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    if (value === undefined) this.chain.push(`( )`);
    else if (value === null || value === NaN) this.chain.push(`( ${value} )`);
    else if (typeof value === "function")
      this.chain.push(`( ${value.toString()} )`);
    else this.chain.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    if (!Number.isInteger(position)) {
      this.chain = [];
      throw new CustomError("Not integer");
    }
    if (position <= this.getLength()) {
      this.chain.splice(position - 1, 1);
    } else {
      this.chain = [];
      throw new CustomError("Not existing position");
    }
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const tmp = this.chain.join("~~");
    this.chain = [];
    return tmp;
  },
};

module.exports = chainMaker;
