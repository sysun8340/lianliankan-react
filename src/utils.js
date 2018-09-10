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

const getValueByPonit = (p, matrix) => {
  return matrix[p[1]][p[0]]
}

export const resetMatrix = (p1, p2, matrix) => {
  matrix[p1[1]][p1[0]] = 0
  matrix[p2[1]][p2[0]] = 0
  return matrix
}

// p2的横坐标大于p1,传参时注意！
const isHorizontalLinkable = (p1, p2, matrix) => {
  // 判断p1和p2是否在同一行
  if(p1[1] !== p2[1]) return false
  // 判断p1和p2中间的值是否为0
  for(let i=1; i<p2[0]-p1[0]; i++) {
    if(matrix[p1[1]][p1[0]+i] !== 0) return false
  }
  return true
}

// p2的纵坐标大于p1,传参时注意！
const isVerticalLinkable = (p1, p2, matrix) => {
  // 判断p1和p2是否在一列
  if(p1[0] !== p2[0]) return false
  // 判断p1和p2的中间值是否为0
  for(let j=1; j< p2[1]-p1[1]; j++) {
    if(matrix[p1[1]+j][p1[0]] !==0) return false
  }
  return true
}

const isHVLinkable = (p1, p2) => {

}

const isVHLinkable = (p1, p2) => {

}

const isHVHLinkable = (p1, p2) => {

}

const isVHVLinkable = (p1, p2) => {

}

export const isLinkable = (p1, p2, matrix) => {
  if(p1[0] === undefined || p1[1] === undefined) return false
  const v1 = getValueByPonit(p1, matrix)
  const v2 = getValueByPonit(p2, matrix)
  // 判断v1和v2是否相等
  if(v1 !== v2) return false
  // 判断是否可以连接
  if(isHorizontalLinkable(p1, p2, matrix) || 
    isVerticalLinkable(p1, p2, matrix) ||
    isHVLinkable(p1, p2, matrix) ||
    isVHLinkable(p1, p2, matrix) || 
    isHVHLinkable(p1, p2, matrix) ||
    isVHVLinkable(p1, p2, matrix)
  ) {
    return true
  }
  return false
}