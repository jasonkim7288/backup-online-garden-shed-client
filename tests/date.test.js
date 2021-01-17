import { convertDateToString, getCurrentDate, dayCount, convertStringToDateString } from '../src/utilities/date';

describe('convertDateToString', () => {
  test('should convert date to string', () => {
    const date = new Date();
    const str = convertDateToString(date);
    expect(typeof str).toBe('string');
  })
});