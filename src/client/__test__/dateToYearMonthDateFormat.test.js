import dateToYearMonthDateFormat from "../js/DateToYearMonthDateFormat";

test("convert js date to yyyy-mm-dd string format", () => {
  expect(dateToYearMonthDateFormat(new Date(2022, 11, 29))).toBe("2022-12-29");

  expect(dateToYearMonthDateFormat(new Date(2023, 0, 14))).toBe("2023-01-14");
});
