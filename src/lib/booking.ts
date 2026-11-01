export function getAvailableBookingDays(startDate = new Date(), count = 5): Date[] {
  const days: Date[] = [];
  const date = new Date(startDate);

  while (days.length < count) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      days.push(new Date(date));
    }
  }

  return days;
}
