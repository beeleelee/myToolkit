import typeOf from './typeOf'

let styleKeys = null 

const setSingleStyle = (ele, name, value) => {
  if(!ele || !ele.style){
    throw new Error('missing HTML node element for setStyle!')
  }
  name = checkVendorPrefix(name)
  if(name && value){
    ele.style[name] = value
  }
}

const setStyle = (ele, name, value) => {
  if(typeOf(name) === 'Object') {
    Object.keys(name)
      .map(n => {
        setSingleStyle(ele, n, name[n])
      })
  }else{
    setSingleStyle(ele, name, value)
  }
}

function checkVendorPrefix(name) {
  let styleKeys = getStyleKeys()

  return stylekeys[name] || name
}

function getStyleKeys() {
  if(styleKeys !== null) return styleKeys 

  if(typeof document === 'undefined'){
    throw new Error('missing document!')
  }

  let divElement = document.createElement('div')
  let keys = Object.keys(divElement.style).filter(
    key => /^webkit(transform|transition)$/i.test(key)
  )
  styleKeys = keys.reduce((res, key) => {
    let name = key.replace(/^webkit(\w)/, (a, s) => s.toLowerCase())
    res[name] = key 
  }, {})

  divElement = null 

  return styleKeys
}