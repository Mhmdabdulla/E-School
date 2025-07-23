// export const formatDate = (date: Date | string, format: string = "dd/MM/yyyy", includeTime: boolean = false) => {
//   if (!date) return "";
//   const d = new Date(date);

//   const options: Record<string, any> = {
//     year: "numeric",
//     month: "2-digit",
//     day: "2-digit",
//   };

//   if (includeTime) {
//     options.hour = "2-digit";
//     options.minute = "2-digit";
//     options.hour12 = true;
//   }

//   if (!includeTime) {
//     return new Intl.DateTimeFormat("en-GB", options).format(d);
//   }

//   return new Intl.DateTimeFormat("en-US", options).format(d);
// };

export const formatDate = (
  date: Date | string,
  format: string = "dd/MM/yyyy",
  includeTime: boolean = false
): string => {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return ""; 

  const pad = (n: number) => n.toString().padStart(2, "0");

  const map: Record<string, string> = {
    dd: pad(d.getDate()),
    MM: pad(d.getMonth() + 1),
    yyyy: d.getFullYear().toString(),
    hh: pad(d.getHours() % 12 || 12),
    HH: pad(d.getHours()),
    mm: pad(d.getMinutes()),
    ss: pad(d.getSeconds()),
    a: d.getHours() >= 12 ? "PM" : "AM",
  };

  if (!includeTime) {
    format = format
      .replace(/(hh|HH|mm|ss|a)/g, "")
      .replace(/[:\s]+/g, " ")  
      .trim()
      .replace(/\s{2,}/g, " "); 
  }

  let formatted = format;
  for (const token in map) {
    formatted = formatted.replace(new RegExp(token, "g"), map[token]);
  }

  return formatted;
};


export const formatTimeFromSeconds = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const padded = (num: number): string => String(num).padStart(2, '0');

  if (hours > 0) {
    return `${padded(hours)}h ${padded(minutes)}m ${padded(seconds)}s`;
  } else if (minutes > 0) {
    return `${padded(minutes)}m ${padded(seconds)}s`;
  } else {
    return `${padded(seconds)}s`;
  }
};

export function timeAgo(dateInput: Date | string): string {
  const now = new Date();
  const date = new Date(dateInput);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const intervals = [
    { seconds: 60, label: "minute" },
    { seconds: 60 * 60, label: "hour" },
    { seconds: 60 * 60 * 24, label: "day" },
    { seconds: 60 * 60 * 24 * 7, label: "week" },
    { seconds: 60 * 60 * 24 * 30, label: "month" },
    { seconds: 60 * 60 * 24 * 365, label: "year" },
  ];

  for (let i = intervals.length - 1; i >= 0; i--) {
    const { seconds, label } = intervals[i];
    if (diffInSeconds >= seconds) {
      const value = Math.ceil(diffInSeconds / seconds);
      return `${value} ${label}${value !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}