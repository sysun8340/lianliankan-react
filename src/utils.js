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

const isHorizontalLinkable = (p1, p2, matrix) => {
  // 判断p1和p2是否是同一点
  if(p1[0] === p2[0] && p1[1] === p2[1]) return false
  // 判断p1和p2是否在同一行
  if(p1[1] !== p2[1]) return false
  // 调整p1和p2的顺序
  let newP1 = p1
  let newP2 = p2
  if(p2[0] < p1[0]) {
     newP1 = [...p2]
     newP2 = [...p1]
  } 
  // 判断p1和p2中间的值是否为0
  for(let i=1; i<newP2[0]-newP1[0]; i++) {
    const p = [newP1[0]+i, newP1[1]]
    if(getValueByPonit(p, matrix) !== 0) return false
  }
  return true
}

// p2的纵坐标大于p1,传参时注意！
const isVerticalLinkable = (p1, p2, matrix) => {
  // 判断p1和p2是否是同一点
  if(p1[0] === p2[0] && p1[1] === p2[1]) return false
  // 判断p1和p2是否在一列
  if(p1[0] !== p2[0]) return false
  let newP1 = p1
  let newP2 = p2
  // 调整p1和p2的顺序
  if(p2[1] < p1[1]) {
    newP1 = [...p2]
    newP2 = [...p1]
  }
  // 判断p1和p2的中间值是否为0
  for(let j=1; j< newP2[1]-newP1[1]; j++) {
    const p = [newP1[0], newP1[1]+j]
    if(getValueByPonit(p, matrix) !==0) return false
  }
  return true
}

// 是否可以用一条折线连接
const isOnePolygonalLineLinkable = (p1, p2, matrix) => {
  // 先调整p1和p2的顺序
  let newP1 = p1
  let newP2 = p2
  if(p2[1] < p1[1]) {
    newP1 = [...p2]
    newP2 = [...p1]
  }
  // 先找出p1和p2交叉点p3、p4
  const p3 = [newP2[0], newP1[1]]
  const p4 = [newP1[0], newP2[1]]
  // 判断交叉点是否为0
  if(getValueByPonit(p3, matrix) === 0 &&
    isHorizontalLinkable(newP1, p3, matrix) && 
    isVerticalLinkable(p3, newP2, matrix)
  ) return true
  if(getValueByPonit(p4, matrix) === 0 && 
    isVerticalLinkable(newP1, p4, matrix) && 
    isHorizontalLinkable(p4, newP2, matrix)
  ) return true
  return false
}

// 是否可用两条折线连接，不包括边缘折线
const isTwoPolygonalLineLinkable = (p1, p2, matrix) => {
    // 先调整p1和p2的顺序
    let newP1 = p1
    let newP2 = p2
    if(p2[1] < p1[1]) {
      newP1 = [...p2]
      newP2 = [...p1]
    }
    // 同时从newP1往下找一个可以跟newP1连接的点p3，从newP2往上找一个可以跟newP1连接的店p4
    // 分别判断p3、p4是否可以和newP2、newP1用一条折线连接
    for(let i=1; i<newP2[1]-newP1[1]; i++) {
      const p3 = [newP1[0], newP1[1] + i]
      const p4 = [newP2[0], newP2[1] - i]
      if(getValueByPonit(p3, matrix) === 0 && isOnePolygonalLineLinkable(p3, newP2, matrix)) return true
      if(getValueByPonit(p4, matrix) === 0 && isOnePolygonalLineLinkable(newP1, p4, matrix)) return true
    }
    // 沿着newP1的横轴找
    // 1、从左向右找
    if(newP1[0] < newP2[0]) {
      for(let i=1; i<newP2[0]-newP1[0]; i++) {
        const p = [newP1[0] + i, newP1[1]]
        if(getValueByPonit(p, matrix) === 0 && isOnePolygonalLineLinkable(p, newP2, matrix)) return true
      }
    }
    // 2、从右向左找
    else {
      for(let i=1; i<newP1[0]-newP2[0]; i++) {
        const p = [newP1[0] - i, newP1[1]]
        if(getValueByPonit(p, matrix) === 0 && isOnePolygonalLineLinkable(p, newP2, matrix)) return true
      }
    }
    // 遍历整个矩阵寻找一遍
    for(let y=0; y< matrix.length; y++) {
      for( let x=0; x<matrix[0].length; x++) {
        const p = [x, y]
        if(getValueByPonit(p, matrix) !== 0) continue
        if(isHorizontalLinkable(newP1, p, matrix) || isVerticalLinkable(newP1, p, matrix)) {
          if(isOnePolygonalLineLinkable(p, newP2, matrix)) return true
        }
      }
    }
    return false
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
    isOnePolygonalLineLinkable(p1, p2, matrix) || 
    isTwoPolygonalLineLinkable(p1, p2, matrix)
  ) {
    return true
  }
  return false
}