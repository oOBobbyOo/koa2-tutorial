//时间转换
function formatDate(now) {
  var now = new Date(now * 1000)
  var year = now.getFullYear()
  var month = now.getMonth() + 1
  var date = now.getDate()
  var hour = now.getHours()
  var minute = now.getMinutes()
  var second = now.getSeconds()
  return (
    year +
    '/' +
    fixZero(month, 2) +
    '/' +
    fixZero(date, 2) +
    '/' +
    fixZero(hour, 2) +
    ':' +
    fixZero(minute, 2) +
    ':' +
    fixZero(second, 2)
  )
}

//时间如果为单位数补0
function fixZero(num, length) {
  var str = '' + num
  var len = str.length
  var s = ''
  for (var i = length; i-- > len; ) {
    s += '0'
  }
  return s + str
}

module.exports = formatDate
