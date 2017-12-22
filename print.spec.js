const print_str = require('./print').print_str

describe('Print', () => {
  it('returns integers', () => {
    expect(print_str(3)).toBe('3')
  })

  it('returns strings', () => {
    expect(print_str('hello')).toBe('hello')
  })

  it('returns arrays', () => {
    expect(print_str([{name: '+'}, 2, 3])).toBe('(+ 2 3)')
  })
})