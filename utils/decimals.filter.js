export default (number, words) => {
  let _number = number % 100

  if (number > 19) {
    _number = number % 10
  }

  switch (_number) {
    case 1: {
      return `${number} ${words[0]}`
    }
    case 2:case 3:case 4: {
      return `${number} ${words[1]}`
    }
    default: {
      return `${number} ${words[2]}`
    }
  }
}
