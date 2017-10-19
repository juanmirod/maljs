 

const Reader = {
  init: function (tokens = []) {
    this.tokens = tokens
    this.position = 0
  },

  next: function () {
    if(this.position === this.tokens.length) return undefined
    return this.tokens[this.position++].trim()
  },

  peek: function () {
    return this.tokens[this.position].trim()
  }
}


function tokenizer(str) {
  const tokensRegex = /[\s,]*(~@|[\[\]{}()'`~^@]|"(?:\\.|[^\\"])*"|;.*|[^\s\[\]{}('"`,;)]*)/g
  return str.match(tokensRegex) 
}

function read_form(reader) {
  const token = reader.peek()
  if(token === ')') {
    return null
  }
  if(token === '(') {
    return read_list(reader)
  } else {
    return read_atom(token)
  }
}

function read_list(reader) {
  let list = []
  let token = reader.next()
  let result = null
  while(token && token !== ')') {
    result = read_form(reader)
    if(result) list.push(result)
    token = reader.next()
  }
  if(token === '') throw new Error('Syntax error, expected ")"')
  if(token === ')') return list
}

function read_atom(token) {
  if(Number.isNaN(Number.parseInt(token))) {
    return { name: token }
  }
  return Number.parseInt(token)
}

module.exports.read_str = function read_str(str) {
  const reader = Object.create(Reader)
  reader.init(tokenizer(str))
  return read_form(reader)
}
