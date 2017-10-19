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

function rep(line) {
  PRINT(EVAL(READ(line)))
}

rl.prompt()