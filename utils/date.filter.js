export default (date, format) => {
  if (format === 'date') {
    return date.toLocaleDateString()
  } else if (format === 'time') {
    return date.toLocaleTimeString()
  }
  return date.toLocaleString()
}
