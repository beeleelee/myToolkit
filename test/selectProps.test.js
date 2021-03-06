const test = require('tape')
const mytoolkit = require('../dist/mytoolkit.cjs')
const {
  selectProps
} = mytoolkit

test('selectProps', t => {
  const o = { a: 1, b: 2, c: 3, d: 4 }
  t.deepEqual(selectProps(o, 'a'), { a: 1 })
  t.deepEqual(selectProps(o, ['a', 'd']), { a: 1, d: 4 })

  t.deepEqual(selectProps(o, name => name === 'd'), { d: 4 })
  t.deepEqual(selectProps(o, name => name !== 'd'), { a: 1, b: 2, c: 3 })

  t.end()
})