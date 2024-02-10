const currentDate = new Date();
const options = {
  timeZone: 'Africa/Algiers',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};

const formattedDate = new Intl.DateTimeFormat('en-US', options).format(currentDate);
console.log(formattedDate);
