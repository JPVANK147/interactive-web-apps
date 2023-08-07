// scripts.js

const data = {
	lists: [
		['first', [15, 11, 13, 7, 5]],
		['second', [2, 6, 8, 4, 14, 12, 10]],
		['third', [9, 3, 1]],
	]
}

// Only edit below

const first = data.lists.find(item => item[0] === 'first')[1]
const second = data.lists.find(item => item[0] === 'second')[1]
const third = data.lists.find(item => item[0] === 'third')[1]

const result = []

const extractBiggest = () => {
	if (first.length > 0 && (second.length === 0 || first[first.length - 1] > second[second.length - 1]) && (third.length === 0 || first[first.length - 1] > third[third.length - 1])) {
	  return first.pop()
	}
  
	if (second.length > 0 && (third.length === 0 || second[second.length - 1] > third[third.length - 1])) {
	  return second.pop()
	}
  
	if (third.length > 0) {
	  return third.pop()
	}
}

// Only edit above

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())
result.push(extractBiggest())

console.log(result)