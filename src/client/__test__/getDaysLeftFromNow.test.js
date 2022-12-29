const { getDaysLeftFromNow } = require("../../server/getDaysLeftFromNow");

test("getDaysLeftFromNow should returns correct days", () => {
  expect(getDaysLeftFromNow("1/1/2023")).toBe(3);
});
