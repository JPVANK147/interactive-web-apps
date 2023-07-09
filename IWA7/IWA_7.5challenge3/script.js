const leoName = 'Leo'
const leoSurname = 'Musvaire'
const leoBalance = '-9394'

const sarahName = 'Sarah'
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.21000111'

const divider = '----------------------------------'

// Only change below this line

const owed = 'R' + (parseInt(leoBalance) + parseInt(sarahBalance))
const leo = `${leoName} ${leoSurname} (Owed:R${leoBalance})`
const sarah = `${sarahName} ${sarahSurname} (Owed:R${sarahBalance})`
const total = `    Total amount owed: ${owed}`
const result = `${leo}\n${sarah}\n\n${divider}\n${total}\n${divider}`

console.log(result)