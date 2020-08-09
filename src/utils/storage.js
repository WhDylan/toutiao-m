/* 封装本地存储操作模块 */

/* 存储数据 */
export const setItem = (key, value) => {
  //将数组、对象类型的数据转换为JSON格式字符串进行存储
  if (typeof value === 'object') {
  }
  window.localStorage.setItem(key, JSON.stringify(value))
}

/* 获取数据 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

/* 删除数据 */
