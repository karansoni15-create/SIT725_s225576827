const expect = require("chai").expect;
const calculateTotalTime = require("../utils/calculatetime");

describe("Calculation Function Tests", () => {

  it("should calculate total time correctly", () => {
    const result = calculateTotalTime(10, 20);
    expect(result).to.equal(30);
  });

  it("should throw error for negative values", () => {
    expect(() => calculateTotalTime(-5, 10)).to.throw();
  });

});
