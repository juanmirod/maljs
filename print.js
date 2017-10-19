module.exports.print_str = function print_str(data) {
  if(Array.isArray(data)) {
    return '(' + data.map(token => print_str(token)).join(' ') + ')'
  }
  if(Number.isInteger(data)) {
    return '' + data
  }
  return data.name
}