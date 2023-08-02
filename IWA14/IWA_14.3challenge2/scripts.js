// script.js

function add(a, b) {
	return a + b 
    //example1 = add(2 + 4) = 6
    //example2 = multiply(2 * 4) = 8
    //add * multiply = 6*8 = 48

}

function multiply(a, b) { 
	return a * b 
    //example1 = add(2 + 2) = 4
    //example2 = multiply(2 * 2) = 4
    //add * multiply = 4*4 = 16
}


function internal () {
	const added = add(this.internal.a, this.internal.b)
	const multiplied = multiply(this.internal.a, this.internal.b)
	console.log(added * multiplied)
	return this
}

// Not allowed to change below this

const example1 = {
	internal: {
		a: 2,
		b: 4,
		c: 8,
	},
	add,
	multiply,
  calculate: internal
}

const example2 = {
	internal: {
		a: 2,
		b: 2,
		c: 3,
	},
	add,
	multiply,
  calculate: internal
}

example1.calculate()
example2.calculate()