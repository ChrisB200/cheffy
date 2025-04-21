export function convertTime(time) {
  const hours = Math.floor(time / 60);
  const mins = time % 60;

  let text = ""
  if (hours !== 0) {
    text = `${hours}h`
  }

  if (mins !== 0) {
    if (hours !== 0) {
      text = `${text} ${mins}m`
    } else {
      text = `${mins}m`
    }
  } else {
    if (hours === 0) {
      text =`${mins}m`
    }
  }

  return text
}

export function convertUnit(unit) {
  if (unit.length === 1) {
    return unit.toUpperCase();
  } else if (unit.length > 1) {
    const firstLetter = unit[0].toUpperCase();
    const restOfLetters = String(unit).slice(1);
    return firstLetter + restOfLetters
  } else {
    return ""
  }
}

export function compare( a, b ) {
  if ( a.order < b.order ){
    return -1;
  }
  if ( a.order > b.order ){
    return 1;
  }
  return 0;
}

export function toUpper(text) {
  if (text.length > 1) {
    const firstLetter = text[0].toUpperCase();
    const restOfLetters = String(text).slice(1);
    return firstLetter + restOfLetters;
  }

  return "";
}
