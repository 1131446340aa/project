const LETTERS = /[a-z0-9]/
const LeftParentheses = 'LeftParentheses'
const JSXIdentifier = 'JSXIdentifier'
const RightParentheses = 'RightParentheses'
const JSXText = 'JSXText'
const BackSlash = 'BackSlash'
const String = 'String'
const AttributeKey = 'AttributeKey'
let currentToken = {
  type: '',
  value: '',
}
let tokens = []
function emit(token) {
  tokens.push(token)
  currentToken = {
    type: '',
    value: '',
  }
}
function foundLeftParentheses(char) {
  if (LETTERS.test(char)) {
    currentToken.type = JSXIdentifier
    currentToken.value += char
    return jsxIdentifier
  }
}
function attribute(char) {
  if (LETTERS.test(char)) {
    currentToken.type = AttributeKey
    currentToken.value += char
    return attributeKey
  }
}
function attributeKey(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char
    return attributeKey
  } else if (char === '=') {
    emit(currentToken)
  }
}
function jsxIdentifier(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char
    return jsxIdentifier
  } else if (char === ' ') {
    emit(currentToken)
    return attribute
  }
}
function start(char) {
  if (char === '<') {
    emit({ type: LeftParentheses, value: '<' })
    return foundLeftParentheses
  } else {
    throw new Error('第一个字符串必须是左括号')
  }
}

function eof() {
  if (currentToken.value.length > 0) {
    emit(currentToken)
  } else {
    return
  }
}
function tokenizer(input) {
  let state = start
  for (let char of input) {
    if (state) state = state(char)
  }
  if (currentToken.value.length > 0) {
    emitToken(currentToken)
    return eof
  }
  return tokens
}
let sourceCode = ` <h1 id="app"><span>hello</span>world</h1>`
console.log(tokenizer(sourceCode))
module.exports = {
  tokenizer,
}
