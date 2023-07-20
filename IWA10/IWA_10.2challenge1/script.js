const currentYear = new Date().getFullYear()

const holidays = {
    0: {
        id: 0,
        name: 'Day of Reconciliation',
        date: `16 December ${currentYear}`,
    },
    1: {
        id: 1,
        name: 'Workers Day',
        date: new Date(`1 April ${currentYear}`),
    },
    2: {
        id: 2,
        name: 'Day of Goodwill',
        date: new Date(`26 December ${currentYear}`),
    },
    3: {
        id: 3,
        name: 'New Year Day',
        date: new Date(`1 January ${currentYear}`),
    },
    4: {
        id: 4,
        name: 'Womens Day',
        date: new Date(`9 August ${currentYear}`),
    },
    5: {
        id: 5,
        name: 'Heritage Day',
        date: new Date(`24 September ${currentYear}`),
    },
    6: {
        id: 6,
        name: 'Christmas Day',
        date: new Date(`25 December ${currentYear} 13:25`),
    },
    7: {
        id: 7,
        name: 'Youth Day',
        date: new Date(`16 June ${currentYear}`),
    },
    8: {
        id: 8,
        name: 'Human Rights Day',
        date: new Date(`21 March ${currentYear}`)
    },
}

const christmas = 6
const futureId = 9

// Do not change code above this comment

console.log(holidays[futureId]?.name || `ID ${futureId} not created yet`)

let copied = {...holidays}
copied[6].name = 'X-mas'
const correctDate = new Date(copied[6].date)
correctDate.setHours(0, 0, 0)
correctDate.getHours()
const isEarlier = copied[6].date.getHours() < correctDate.getHours()
console.log('New date is earlier:', isEarlier)
if (isEarlier) copied[6].date = correctDate
console.log('ID change:', copied[6].id != holidays[6].id)
console.log('Name change:', copied[6].name != copied[6].name || copied[6].name)
const newDate = copied[6].date != copied[6].date || copied[6].date
const originalDate = new Date(newDate)
const day = originalDate.getDate()
const month = originalDate.getMonth() + 1
const year = originalDate.getFullYear()
console.log('Date change:', `${day}/${month}/${year}`)

const newHolidays = [
    { date: new Date(2023, 0, 1) },
    { date: new Date(2023, 11, 26) },
    { date: new Date(2023, 3, 15) },
    { date: new Date(2023, 4, 1) },
    { date: new Date(2023, 6, 4) },
    { date: new Date(2023, 10, 24) },
    { date: new Date(2023, 7, 15) },
    { date: new Date(2023, 2, 17) },
];

const timestamps = newHolidays.map(holiday => holiday.date.getTime());

const firstHolidayTimestamp = Math.min(...timestamps);
const lastHolidayTimestamp = Math.max(...timestamps);

const firstHolidayDate = new Date(firstHolidayTimestamp);
const lastHolidayDate = new Date(lastHolidayTimestamp);

const firstDay = String(firstHolidayDate.getDate()).padStart(2, '0');
const firstMonth = String(firstHolidayDate.getMonth() + 1).padStart(2, '0');
const lastDay = String(lastHolidayDate.getDate()).padStart(2, '0');
const lastMonth = String(lastHolidayDate.getMonth() + 1).padStart(2, '0');

const sameCurrentYear = firstHolidayDate.getFullYear();

console.log(`${firstDay}/${firstMonth}/${sameCurrentYear}`);
console.log(`${lastDay}/${lastMonth}/${sameCurrentYear}`);

const randomIndex = Math.floor(Math.random() * newHolidays.length);
const randomHolidayDate = newHolidays[randomIndex].date;
const randomDay = String(randomHolidayDate.getDate()).padStart(2, '0');
const randomMonth = String(randomHolidayDate.getMonth() + 1).padStart(2, '0');
console.log(`${randomDay}/${randomMonth}/${sameCurrentYear}`);