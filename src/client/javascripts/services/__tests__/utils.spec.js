import { getNumberLevel, formatNumberByLevel } from '../utils'

describe('Utils Component', () => {
  describe('formatNumberByLevel', () => {
    it('should handle similiar number', () => {
      const level = getNumberLevel(1000)
      expect(formatNumberByLevel(1010, level)).toBe(1.01)
    })

    it('should handle smaller number', () => {
      const level = getNumberLevel(1000000)
      expect(formatNumberByLevel(10, level)).toBe(0)
    })

    it('should handle larger number', () => {
      const level = getNumberLevel(10)
      expect(formatNumberByLevel(1000000, level)).toBe(1000000)
    })
  })

  describe('getNumberLevel', () => {
    it('should handle thousands', () => {
      const level = getNumberLevel(1000)
      expect(level).toEqual({
        division: 1000,
        number: 1,
        plural: 'thousands',
        single: 'thousand',
      })
    })

    it('should handle millions', () => {
      const level = getNumberLevel(1000000)
      expect(level).toEqual({
        division: 1000000,
        number: 1,
        plural: 'millions',
        single: 'million',
      })
    })

    it('should handle billions', () => {
      const level = getNumberLevel(1000000000)
      expect(level).toEqual({
        division: 1000000000,
        number: 1,
        plural: 'billions',
        single: 'billion',
      })
    })

    it('should handle fractions', () => {
      const level = getNumberLevel(1520)
      expect(level).toEqual({
        division: 1000,
        number: 1.52,
        plural: 'thousands',
        single: 'thousand',
      })
    })
  })
})
