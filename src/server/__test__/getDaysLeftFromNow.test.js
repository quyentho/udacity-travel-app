const { getDaysLeftFromNow } = require("../getDaysLeftFromNow");

test("getDaysLeftFromNow should returns correct days", () => {
  expect(getDaysLeftFromNow("1/1/2023", new Date("12/29/2022"))).toBe(3);
});
