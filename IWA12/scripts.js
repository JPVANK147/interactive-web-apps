// scripts.js

const STATUS_MAP = {
    shelf: {
        color: 'green',
        canReserve: true,
        canCheckout: true,
        canCheckIn: false,
    },
    reserved: {
        color: 'blue',
        canReserve: false,
        canCheckout: true,
        canCheckIn: false,
    },
    overdue: {
        color: 'red',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    },
    checkedOut: {
        color: 'orange',
        canReserve: false,
        canCheckout: false,
        canCheckIn: true,
    }
}

// Edit below line

const book1Doc = document.getElementById('book1')
const book1Status = book1Doc.querySelector('.status')
const book1Reserve = book1Doc.querySelector('.reserve')
const book1Checkout = book1Doc.querySelector('.checkout')
const book1Checkin = book1Doc.querySelector('.checkin')

book1Status.style.color = STATUS_MAP.overdue.color

book1Reserve.disabled = STATUS_MAP.overdue.canReserve
book1Checkout.disabled = STATUS_MAP.overdue.canCheckout
book1Checkin.disabled = STATUS_MAP.overdue.canCheckIn
book1Reserve.style.color = 'black'
book1Checkout.style.color = 'black'
book1Checkin.style.color = 'black'
book1Reserve.style.background = 'none'
book1Checkout.style.background = 'none'
book1Checkin.style.background = 'none'

const book2Doc = document.getElementById('book2')
const book2Status = book2Doc.querySelector('.status')
const book2Reserve = book2Doc.querySelector('.reserve')
const book2Checkout = book2Doc.querySelector('.checkout')
const book2Checkin = book2Doc.querySelector('.checkin')

book2Status.style.color = STATUS_MAP.reserved.color

book2Reserve.disabled = !STATUS_MAP.reserved.canReserve
book2Checkout.disabled = !STATUS_MAP.reserved.canCheckout
book2Checkin.disabled = !STATUS_MAP.reserved.canCheckIn
book2Reserve.style.color = 'black'
book2Checkout.style.color = 'black'
book2Checkin.style.color = 'black'
book2Reserve.style.background = 'none'
book2Checkout.style.background = 'none'
book2Checkin.style.background = 'none'

const book3Doc = document.getElementById('book3')
const book3Status = book3Doc.querySelector('.status')
const book3Reserve = book3Doc.querySelector('.reserve')
const book3Checkout = book3Doc.querySelector('.checkout')
const book3Checkin = book3Doc.querySelector('.checkin')

book3Status.style.color = STATUS_MAP.shelf.color

book3Reserve.disabled = !STATUS_MAP.shelf.canReserve
book3Checkout.disabled = !STATUS_MAP.shelf.canCheckout
book3Checkin.disabled = !STATUS_MAP.shelf.canCheckIn
book3Reserve.style.color = 'black'
book3Checkout.style.color = 'black'
book3Checkin.style.color = 'black'
book3Reserve.style.background = 'none'
book3Checkout.style.background = 'none'
book3Checkin.style.background = 'none'