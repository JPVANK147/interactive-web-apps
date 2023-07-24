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

const book1Status = document.getElementById('book1').querySelector('.status')
const book1Reserve = document.getElementById('book1').querySelector('.reserve')
const book1Checkout = document.getElementById('book1').querySelector('.checkout')
const book1Checkin = document.getElementById('book1').querySelector('.checkin')

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

const book2Status = document.getElementById('book2').querySelector('.status')
const book2Reserve = document.getElementById('book2').querySelector('.reserve')
const book2Checkout = document.getElementById('book2').querySelector('.checkout')
const book2Checkin = document.getElementById('book2').querySelector('.checkin')

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

const book3Status = document.getElementById('book3').querySelector('.status')
const book3Reserve = document.getElementById('book3').querySelector('.reserve')
const book3Checkout = document.getElementById('book3').querySelector('.checkout')
const book3Checkin = document.getElementById('book3').querySelector('.checkin')

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