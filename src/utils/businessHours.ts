export interface BusinessStatus {
  isOpen: boolean;
  message: string;
}

export function getAnaheimBusinessStatus(date: Date = new Date()): BusinessStatus {
  // Convert date to America/Los_Angeles timezone representation
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  let weekday = "";
  let hour = 0;
  let minute = 0;

  parts.forEach((p) => {
    if (p.type === "weekday") weekday = p.value;
    if (p.type === "hour") hour = parseInt(p.value, 10);
    if (p.type === "minute") minute = parseInt(p.value, 10);
  });

  // Handle midnight 24 format edge cases
  if (hour === 24) hour = 0;
  const timeInMinutes = hour * 60 + minute;

  // Closed on Sunday
  if (weekday === "Sun") {
    return { isOpen: false, message: "Closed Today (Opens Monday 8:30 AM)" };
  }

  // Saturday: 8:30 AM (510 min) to 4:30 PM (990 min)
  if (weekday === "Sat") {
    const openMinutes = 8 * 60 + 30; // 510
    const closeMinutes = 16 * 60 + 30; // 990
    if (timeInMinutes >= openMinutes && timeInMinutes < closeMinutes) {
      return { isOpen: true, message: "Open Today until 4:30 PM" };
    }
    if (timeInMinutes < openMinutes) {
      return { isOpen: false, message: "Closed (Opens Today at 8:30 AM)" };
    }
    return { isOpen: false, message: "Closed (Opens Monday at 8:30 AM)" };
  }

  // Weekdays (Mon-Fri): 8:30 AM (510 min) to 5:30 PM (1050 min)
  const openMinutes = 8 * 60 + 30; // 510
  const closeMinutes = 17 * 60 + 30; // 1050

  if (timeInMinutes >= openMinutes && timeInMinutes < closeMinutes) {
    return { isOpen: true, message: "Open Today until 5:30 PM" };
  }
  if (timeInMinutes < openMinutes) {
    return { isOpen: false, message: "Closed (Opens Today at 8:30 AM)" };
  }

  const nextDayMsg = weekday === "Fri" ? "Opens Saturday at 8:30 AM" : "Opens Tomorrow at 8:30 AM";
  return { isOpen: false, message: `Closed (${nextDayMsg})` };
}
