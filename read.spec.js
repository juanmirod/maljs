const read_str = require('./read').read_str

describe('Read', () => {
  it('reads a string and returns an array of tokens', () => {
    expect(read_str('()')).toEqual([])
  })

  it('reads a list', () => {
    expect(read_str('(1 2 3)')).toEqual([1,2,3])
  })

  it('reads a number', () => {
    expect(read_str('1123')).toEqual(1123)
  })

  it('reads strings and turn them into symbols', () => {
    expect(read_str('abc')).toEqual({ name: 'abc' })
  })

  it('reads expressions', () => {
    expect(read_str('(+ 2 3)')).toEqual([{ name: '+' }, 2, 3])
  })

  it('reads complex expressions', () => {
    expect(read_str('(+ 2 (* 3 4))')).toEqual([{ name: '+' }, 2, [{ name: '*'}, 3, 4]])
  })
})
