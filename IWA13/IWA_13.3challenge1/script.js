let state = 'idle'
let user = null
let calculated = '1'

// Only allowed to change below

const logCalc = () => {
    const isString = typeof calculated === 'string'
    const calculatedAsNumber = isString ? Number(calculated) : parseFloat(calculated)
    return calculated === calculatedAsNumber + 1
}


const calcUser = () => {
   const userCalc = logCalc()
    if (userCalc) {
        user = 'John'
        state = 'requesting'
    }
    if (calculated > 3) {
        state = 'idle'
    }
  }


const checkUser = () => {
    let userTruly = false

    if (user === null) {
        user = 'John'
        userTruly = true
    }
    if (userTruly && state === 'requesting') {
        calculated = '3'
    console.log(`User: ${user} (${calculated})`)
    }
}
  
// Only allowed to change code above
  
checkUser()
calcUser()
  
checkUser()
calcUser()

checkUser()
calcUser()
  
checkUser()
calcUser()
  
checkUser()
calcUser()