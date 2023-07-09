const leoName = 'Leo'
const leoSurname = 'Musvaire'
const leoBalance = '-9394'

const sarahName = 'Sarah'
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.21000111'

const divider = '----------------------------------'

// Only change below this line

const newleoBalance = leoBalance.replace(/-/gi, "")
const newsarahBalance = sarahBalance.replace(/-/gi, "")

const owed = 'R' + (parseFloat(newleoBalance) + parseFloat(newsarahBalance)).toFixed(2)
const leo = `${leoName} ${leoSurname} (Owed: R ${parseInt(newleoBalance).toFixed(2)})`
const sarah = `${sarahName} ${sarahSurname} (Owed: R ${parseFloat(newsarahBalance).toFixed(2)})`
const total = `    Total amount owed: ${owed}`
const result = `${leo}\n${sarah}\n\n${divider}\n${total}\n${divider}`

console.log(result)

