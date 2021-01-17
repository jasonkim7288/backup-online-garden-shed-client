// This test is unit testing in src/utilities/date.js
import { convertDateToString, getCurrentDate, dayCount, convertStringToDateString } from '../../src/utilities/date';

describe('convertDateToString', () => {
  it('should convert date to string', () => {
    const date = new Date();
    const strResult = convertDateToString(date);
    expect(typeof strResult).to.equal('string');
  });
  
  it('should return empty string if there is no argument', () => {
    const strResult = convertDateToString();
    expect(strResult).to.be.equal('');
  });
  
  // when creating new Date(), month is started with 0
  it('should get the date and the month with 2 digits even if it is 1 digit', () => {
    for (let i = 0; i < 12; i++) {
      for (let j = 1; j < 32; j++) {
        const date = new Date(2010, i, j);
        const strResult = convertDateToString(date);
        expect(strResult).to.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
      }
    }
  });
});

describe('getCurrentDate', () => {
  it('should return a string', () => {
    const strResult = getCurrentDate();
    expect(typeof strResult).to.equal('string');
  });
  
  it('should get the date and the month with 2 digits even if it is 1 digit', () => {
    const strResult = getCurrentDate();
    expect(strResult).to.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
  });
});

describe('dayCount', () => {
  it('should return a number', () => {
    // This is GMT
    const strStart = '2021-01-04T03:00:00.000Z';
    const strTarget = '2021-01-04T05:00:00.000Z';
    const strResult = dayCount(strStart, strTarget);
    expect(typeof strResult).to.equal('number');
    expect(strResult).to.equal(1);
  });

  it('should return 1 if the start date is later than the target date', () => {
    const strStart = '2021-01-05T05:00:00.000Z';
    const strTarget = '2021-01-01T03:00:00.000Z';
    const strResult = dayCount(strStart, strTarget);
    expect(strResult).to.equal(1);
  });  
  
  it('should return 1 if the date string is not the date format', () => {
    const strNotDate = 'not a date';
    const strDate = '2021-01-01T03:00:00.000Z';
    let strResult = dayCount(strNotDate, strDate);
    expect(strResult).to.equal(1);
    strResult = dayCount(strDate, strNotDate);
    expect(strResult).to.equal(1);
  });  
  
  it('should calculate based on the local timezone not GMT', () => {
    // strStart is 04/01 11pm with Australian Eastern Standard Time (GMT +10)
    const strStart = '2021-01-04T13:00:00.000Z';
    // strTarget is 04/02 1am with Australian Eastern Standard Time (GMT +10)
    let strTarget = '2021-01-04T15:00:00.000Z';
    let strResult = dayCount(strStart, strTarget);
    // it should be day 2
    expect(strResult).to.equal(2);
    
    // strTarget is 04/01 11:30pm with Australian Eastern Standard Time (GMT +10)
    strTarget = '2021-01-04T13:30:00.000Z';
    strResult = dayCount(strStart, strTarget);
    // it should be day 1
    expect(strResult).to.equal(1);    
  });
});

describe('convertStringToDateString', () => {
  it('should return a string', () => {
    const strDate = '2021-01-04T13:00:00.000Z';
    const strResult = convertStringToDateString(strDate);
    expect(typeof strResult).to.equal('string');
  });
  
  
  it('should get the date and the month with 2 digits', () => {
    const numberTo2digit = num => {
      return num > 9 ? '' + num : '0' + num;
    };
    
    // string formatted month is started with 01
    for (let i = 1; i < 13; i++) {
      for (let j = 1; j < 32; j++) {
        const strDate = `2021-${numberTo2digit(i)}-${numberTo2digit(j)}T03:00:00.000Z`;
        const strResult = convertStringToDateString(strDate);
        expect(strResult).to.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
      }
    }
  });
});