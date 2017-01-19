var chai = require('chai');
var expect = chai.expect;
var converter = require("./converter");
const {test: describe, test: it} = require('m.test')

describe('Converter orderedPattern', function() {
  it('empty array should return empty string', function() {
    expect(converter.sort([])).to.equal("");
  });

  it('array with one elemnt should return the element', function(){
    expect(converter.sort([2])).to.equal("2")
  });

  it('[5,2] should return "2<5"', function(){
    expect(converter.sort([5,2])).to.equal("2<5");
  });

  it('[2,1,4] should return 1<4>2', function(){
    expect(converter.sort([2,1,4])).to.equal("1<4>2");
  })

  it('try sorting with min number duplicates', function(){
    expect( converter.sort([1,1,1,1,2,3,4,8]) ).to.equal( "1<2>1<3>1<4>1<8" );
    expect( converter.sort([1,1,1,1,2,3,4,5]) ).to.equal( "1<2>1<3>1<4>1<5" );
  });

  it('try sorting with greather number duplicates', function(){
    expect( converter.sort([1,2,5,4,7,7,7,7]) ).to.equal( "5<7>2<7>4<7>1<7" );
  });

  it('try sorting with other options', function(){
    expect( converter.sort([1,2,3,3,3,3,4,5]) ).to.equal( "3<4>3<5>1<3>2<3" );
    expect( converter.sort([1,2,12,12,2,2,12,5,10,15,4,9]) ).to.equal( "1<12>2<12>2<12>2<10>5<15>4<9" );
  });

  it('sorting with too much duplicates should throw an error', function(){
    expect( () => { converter.sort([1,2,3,3,3,3,4]) }).to.throw("Too much duplicates");
  });
});
