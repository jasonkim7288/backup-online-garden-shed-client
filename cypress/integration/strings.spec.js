// This test is unit testing for src/utilities/strings.js
import { removeDomain, getUniquePlantName } from '../../src/utilities/strings';

describe('removeDomain', () => {
  it('should return id with string type without domain', () => {
    const strAddr = 'abc.def@a.com';
    const strResult = removeDomain(strAddr);
    expect(typeof strResult).to.equal('string');
    expect(strResult).to.equal('abc.def');
  });

  it('should return the original string if there is no "@"', () => {
    const strAddr = 'abc.def';
    const strResult = removeDomain(strAddr);
    expect(strResult).to.equal('abc.def');
  });

  it('should return an empty string if there is no string on the left side of "@"', () => {
    let strAddr = '@a.com';
    let strResult = removeDomain(strAddr);
    expect(strResult).to.equal('');
    
    strAddr = '@';
    strResult = removeDomain(strAddr);
    expect(strResult).to.equal('');
    
  });

  it('should return an empty string if there is no argument', () => {
    const strResult = removeDomain();
    expect(strResult).to.equal('');
  });
  
  it('should return an empty string if the argument is not a string', () => {
    const strResult = removeDomain(1234);
    expect(strResult).to.equal('');
  });
});

describe('getUniquePlantName', () => {
  beforeEach(() => {
    cy.fixture('plantRecords').as('records');
  });
  
  // if 'this' keyword is needed, we cannot use an arrow function.
  it('should return common name without number if the recordNum is 1', function () {
    const strResult = getUniquePlantName(this.records[0]);
    expect(strResult).to.equal('rose');
  });

  it('should return common name with number if the recordNum is greater than 1', function () {
    const strResult = getUniquePlantName(this.records[1]);
    expect(strResult).to.equal('banana (2)');
  });

  it('should return an empty string if there is no argument', () => {
    const strResult = getUniquePlantName();
    expect(strResult).to.equal('');
  });
});

