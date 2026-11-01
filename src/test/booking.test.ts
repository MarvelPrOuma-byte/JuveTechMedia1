import { describe, expect, it } from "vitest";

import { getAvailableBookingDays } from "../lib/booking";

describe("strategy call booking dates", () => {
  it("offers five upcoming weekdays and never includes Saturday or Sunday", () => {
    const startDate = new Date(2026, 9, 30);
    const dates = getAvailableBookingDays(startDate);

    expect(dates).toHaveLength(5);
    expect(dates.map((date) => date.getDay())).toEqual([1, 2, 3, 4, 5]);
    expect(startDate).toEqual(new Date(2026, 9, 30));
  });
});
