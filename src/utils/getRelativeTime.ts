export function getRelativeTime(date: Date) {
  const now = new Date();
  const diffTime = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  ); // Difference in days

  if (diffTime < 1) {
    // Less than a day
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } else if (diffTime < 7) {
    // Within a week
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  } else {
    // More than a week
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }
}
