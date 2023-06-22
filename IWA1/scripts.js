const MAX_NUMBER = 15
const MIN_NUMBER = -5
const STEP_AMOUNT = 5



const number = document.querySelector('[data-key="number"]')
const subtract = document.querySelector('[data-key="subtract"]')
const add = document.querySelector('[data-key="add"]')

// console.log(typeof 123, typeof "123", typeof true); //

"hello World"
"Schalk"
"100"

"hello" + "World" // "helloWorld"
"schalk" + "100" // Schalk100

100 + 50 // 150
"100" + "50" // 10050

100
50

const subtractHandler = () => {
    const newValue = parseInt(number.value) - STEP_AMOUNT
    number.value = newValue

    if (add.disabled === true) {
        add.disabled = false
    }

    if (newValue <= MIN_NUMBER) {
        subtract.disabled = true
    }
}

const addHandler = () => {
    const newValue = parseInt(number.value) + STEP_AMOUNT
    number.value = newValue

    if (subtract.disabled === true) {
        subtract.disabled = false
    }

    if (newValue >= MAX_NUMBER) {
        add.disabled = true
    }

}

subtract.addEventListener('click', subtractHandler)

add.addEventListener('click', addHandler)