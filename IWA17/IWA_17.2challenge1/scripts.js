// scripts.js

const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() // 2023 - 08 -0

// Only edit below 

/**
 * So this let you add the days of the week 
 */
const createArray = (length) => {
    const result = []

    for (let i = 0; i < length; i = i + 1) {
        result.push(i)
    }

    return result
}

const createData = () => {
    const currentDate = new Date() // Represents the current date and time
    currentDate.setDate(1) // Tue Aug 01 2023 12:11:16 GMT+0200 (Central Africa Time). So the getDate(1) this will make that the month begin with 01.

    const startDay = currentDate.getDay() // Get the day of the week for a specific date.  2 
    const daysInMonth = getDaysInMonth(currentDate) // calculates and assigns the number of days in the month of the currentDate. Exp 31

    const weeks = createArray(5)
    /** this wili make a array 0-5 for the weeks of the calendar in the createArray for statement
     * Array(5) [ 0, 1, 2, 3, 4 ]
        0: 0
        1: 1
        2: 2
        3: 3
        4: 4
        length: 5
     */
    const days = createArray(7)
    /** this wil make a array 0-7 for the days of the calendar in the createArray for statement
     * Array(7) [ 0, 1, 2, 3, 4, 5, 6 ]
        0: 0
        1: 1
        2: 2
        3: 3
        4: 4
        5: 5
        6: 6
        length: 7
     */
    const result = []
    /** 
     *  this is a for.. of statement that represent the weeks in the month. 
     *  week - represents the week number. 
     *  weekIndex + 1 used here to make a week number, it start by 1.
     *  days - it  a empty array that will be filled with days for each week.
     */
    for (const weekIndex of weeks) {
        result.push({
            week: weekIndex + 1,
            days: []
        })
        /**
         * this is a for.. of statement that represent the days in the weeks. 
         * (dayIndex - startDay) - adjusts for the day of the week that the month starts on. like  Tuesday (dayIndex 2) subtraction first day of the month would be 1.  
         * (weekIndex * 7) - move the dayIndex to the correct day within the current week.
         * isValid - check whether the calculated day value is within the range of valid days for the current month.
         * 
         * dayOfWeek -  Represents the day of the week index (0 to 6)
         * value - Represents the day of the month. If the calculated day is valid 
         * isValid is true - day number is used. Otherwise, an empty string is used to represent an invalid day.
         */

        for (const dayIndex of days) {
            const day = (dayIndex - startDay) + (weekIndex * 7) + 1
            const isValid = day > 0 && day <= daysInMonth

            result[weekIndex].days.push({
                dayOfWeek: dayIndex + 1,
                value: isValid ? day : '',
            })
        }
    }

    return result
}

const addCell = (existing, classString, value) => {
    const result = /* html */ `
        ${existing}
        <td class="${classString}">
            &nbsp;${value}&nbsp;
        </td>
    `

    return result
}

const createHtml = (data) => {
    let result = ''

    for (const { week, days } of data) {
        let inner = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${week}`)

        for (const { dayOfWeek, value } of days) {
            const isToday = new Date().getDate() === value
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
            const isAlternate = week % 2 === 0

            let classString = 'table__cell'

            if (isToday) classString = `${classString} table__cell_`
            if (isWeekend) classString = `${classString} table__cell_`
            if (isAlternate) classString = `${classString} table__cell_`
            inner = addCell(inner, classString, value)
        }

        result = `
            ${result}
            <tr>${inner}</tr>
        `
    }

    return result
}

// Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)