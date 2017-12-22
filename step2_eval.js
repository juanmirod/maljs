const readline = require('readline')
const reader = require('./read')
const printer = require('./print')

const rl = readline.createInterface({
  terminal: false,
  input: process.stdin,
  output: process.stdout,
  prompt: 'user> '
});

rl.on('line', line => {
  if(line == null) process.exit(0)
  rep(line.trim())
  rl.prompt()
})

rl.on('close', () => process.exit(0))

var READ = line => reader.read_str(line)

var EVAL = line => line

var PRINT = line => console.log(printer.print_str(line))

const repl_env = {
  '+': (a,b) => a + b,
  '-': (a,b) => a - b,
  '*': (a,b) => a * b,
  '/': (a,b) => a / b,
}

function eval_ast(ast) {
  
}

function rep(line) {
  PRINT(EVAL(READ(line), rep_env))
}

rl.prompt()