let date = "month"
let status = "student"
let count = 0
let year = 2050

if (date = "month") {
	console.log("January", 'New Year’s Day')
	console.log("March", 'Women’s Day')
	date = 'April'
	console.log(date, 'Family Day')
	console.log(date, 'Freedom Day')
	count = count + 4

	if (status = "student") {
	  	console.log('August', 'Youth Day')
		count = count + 1
  	}

	console.log('September', 'Heritage Day')
	date = 'December'
	console.log(date, 'Human Rights Day')
	console.log(date, 'Day of Reconciliation')
	count = count + 3

	if (status = "parent") {
	  	console.log(date, 'Christmas Day')
		count = count + 1
  	}

	console.log(date, 'Day of Goodwill')
	count = count + 1
}

console.log('Your status is:', status)
console.log('The year is:', year)
console.log('The total holidays is:', count)