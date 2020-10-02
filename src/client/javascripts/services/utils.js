import roundTo from 'round-precision'

export function formatNumberByLevel(number, level, precision = 2) {
  return roundTo(number / level.division, precision)
}

export function getNumberLevel(number) {
  let single = ''
  let plural = ''
  let division = 1
  if (number >= 1000000000) {
    single = 'billion'
    plural = 'billions'
    division = 1000000000
  } else if (number >= 1000000) {
    single = 'million'
    plural = 'millions'
    division = 1000000
  } else if (number >= 1000) {
    single = 'thousand'
    plural = 'thousands'
    division = 1000
  }

  return { single, division, plural, number: formatNumberByLevel(number, { division }) }
}
