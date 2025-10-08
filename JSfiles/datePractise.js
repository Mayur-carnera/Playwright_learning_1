const utcDate = new Date();
console.log(utcDate)
const timestamp = utcDate.toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false, // Use 24-hour format
}).replace(/[\/,\s:.]/g, '-');

console.log(timestamp)