import get16DaysFromNow from "../js/get16DaysFromNow";

test("should get correct 16 days from now", () => {
  const now = new Date("12/29/2022");
  const result = get16DaysFromNow(now, 16);
  expect(result.toDateString()).toBe(new Date(2023, 0, 14).toDateString());
});
