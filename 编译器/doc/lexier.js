let tokens = []
let Numbers = /[0-9]/
let currentToken = {}
function emitToken(token) {
  tokens.push(token)
}
function number(char) {
  if (Numbers.test(char)) {
    currentToken.value += char

    return number
  } else if (char === '+') {
    emitToken(currentToken)
    emitToken({ type: 'Punctuator', value: char })
    currentToken = {
      type: 'Numeric',
      value: '',
    }
    return number
  }
}
function start(char) {
  if (Numbers.test(char)) {
    currentToken = {
      type: 'Numeric',
      value: '',
    }
    return number(char)
  }
}
function tokenizer(input) {
  let state = start
  for (let char of input) {
    state = state(char)
  }
  if (currentToken.value.length > 0) {
    emitToken(currentToken)
  }
}

tokenizer('10+20')

console.log(tokens)
