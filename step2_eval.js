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

var EVAL = (line, env) => {
  if(line && line.length > 0) {
    const evaled_list = eval_ast(line, env)
    return evaled_list[0].apply(null, evaled_list.slice(1))
  }
  if(line && line.length === 0) {
    return line
  }
  return eval_ast(line, env)
}

var PRINT = line => console.log(printer.print_str(line))

const repl_env = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

function eval_ast(ast, env) {
  if (ast && ast.name) {
    return env[ast.name]
  } else if (Array.isArray(ast)) {
    return ast.map(elem => EVAL(elem, env))
  }
  return ast
}

function rep(line) {
  PRINT(EVAL(READ(line), repl_env))
}

rl.prompt()