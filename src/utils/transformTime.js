export default function transformTime (val) {
  if (!val) {
    return ''
  }
  const now = new Date(val * 1000)
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  let hour = now.getHours()
  if (hour.toString().length === 1) {
    hour = '0' + hour
  }
  let minute = now.getMinutes()
  if (minute.toString().length === 1) {
    minute = '0' + minute
  }
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute
}
