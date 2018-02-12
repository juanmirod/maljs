
function peek (tokens, position) {
  if(position >= tokens.length) {
    return undefined
  }
  return tokens[position].trim()
}

function tokenizer(str) {
  const tokensRegex = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g
  return str.match(tokensRegex) 
}

function read_form (tokens, position) {
  const token = peek(tokens, position)
  if(token === ')') {
    return { result: null, position: position }
  }
  if(token === '(') {
    return read_list(tokens, position)
  } else {
    return { result: read_atom(token), position: position }
  }
}

function read_list (tokens, position) {
  let list = []
  position++
  let token = peek(tokens, position)
  let result = null
  while(token && token !== ')') {
    result = read_form(tokens, position)
    position = result.position
    if (result.result) {
      list.push(result.result)
    }
    position++
    token = peek(tokens, position)
  }
  if(token === '') {
    throw new Error('Syntax error, expected ")"')
  }
  if(token === ')') {
    return { result: list, position: position }
  }
}

function read_atom(token) {
  if(Number.isNaN(Number.parseInt(token))) {
    return { name: token }
  }
  return Number.parseInt(token)
}

module.exports.read_str = function read_str(str) {
  return read_form(tokenizer(str), 0).result
}
