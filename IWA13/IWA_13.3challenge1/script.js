let state = 'idle'
let user = null
let calculated = '1'

// Only allowed to change below

const logCalc = () => {
    const isString = typeof calculated === 'string'
    const calculatedAsNumber = isString ? calculated : parseFloat(calculated)
    return calculated === calculatedAsNumber + 1 
}

const calcUser = () => {
  const userCalc = logCalc()
  if (userCalc && user === null) {
    user = 'John'
    calculated = '3'
    console.log(`User: ${user} (${calculated})`)
  }

  if (calculated > 3) {
    state = 'idle'
  }
}

const checkUser = () => {
    if (user === null && state === 'idle') {
      user = 'John'
      state = 'requesting'
      calculated = '3'
      console.log(`User: ${user} (${calculated})`);
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