const FREE_WARNING = 'Free shipping only applies to single customer orders'
const BANNED_WARNING = 'Unfortunately, we do not ship to your country of residence'
const NONE_SELECTED = '0'

let shipping = null
let currency = '$'

const userLocation = 'RSA'
const customers = 1

let shoes = 300 * 1
let toys = 100 * 5
let shirts = 150 * parseInt(NONE_SELECTED)
let batteries = 35 * 2
let pens = 5 * parseInt(NONE_SELECTED)

if (userLocation === 'RSA') {
  shipping = 400
  currency = 'R'
}

if (userLocation === 'NAM') {
  shipping = 600
} else {
  shipping = 800
}

if (shoes + toys + batteries + pens + shirts > 1000 ) {
	if (userLocation = NAM && customers < 2) {
			if (userLocation = RSA)
		    shipping = 0 || calcShipping
		}
	}

if (shipping === 0 && customers !== 1) {
  console.log(FREE_WARNING)
}

if (userLocation === 'NK') {
  console.log(BANNED_WARNING)
} else {
  console.log('Price:', currency + (shoes + batteries + pens + shirts + shipping))
}