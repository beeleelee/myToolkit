import typeOf from './typeOf'

export default function addComma(num) {
  let numberToAddComma = parseFloat(num)
  if (typeOf(numberToAddComma) !== 'Number') {
    throw new TypeError('addComma need number form its parameter!')
  }
  let sign = numberToAddComma < 0 ? '-' : ''
  let base = parseInt(Math.abs(numberToAddComma)) + ''
  let decimal = (numberToAddComma + '').replace(/\-?\d*/, '')
  let mod = base.length > 3 ? base.length % 3 : 0
  return sign + (mod ? base.substr(0, mod) + ',' : '') + base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1,') + decimal
}