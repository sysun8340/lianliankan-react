export const genMatrix = (rows = 8, cols = 8, n = 16) => {
  if(rows*cols%2 !== 0) throw Error('rows*cols必须为偶数')
  const halfArray = [...Array(rows*cols/2)].map(value => value = Math.floor(Math.random()*n) + 1)
  const array = [...halfArray, ...halfArray].sort((a, b) => Math.random() - 0.5)
  return [...Array(rows)].map((value, index) => 
    value = array.slice(cols*index, cols*(index + 1))
  )
}

export const frameMatrix = matrix => {
  const length = matrix[0].length + 2
  const arr0 = [...Array(length)].map(value => value = 0) // 用0填充外围值
  return [arr0, ...matrix.map(arr => [0, ...arr, 0]), arr0]
}

export const handleCountDown = () => {
  
}