/*
The MIT License (MIT)

Copyright (c) 2016 Sebastian Duque Restrepo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

const primeFactor = {

  isPrime: function isPrime(num) {
    // Non integer or any number less than 2 is not prime
    if (!Number.isInteger(num) || num < 2) return false;
    // Even number: only prime if it is 2
    if (num % 2 === 0) return num === 2;
    // Odd number divisible by 3: only prime if it is 3
    if (num % 3 === 0) return num === 3;
    // Search for factor 5, 7, 11, 13, 17, 19, 23, 25, 29, 31, 35, 37...
    // up to and including square root of input number
    const floorSqrt = Math.floor(Math.sqrt(num));
    for (let i = 5; i <= floorSqrt; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  },

  calculate: function calculate(inputNum, result = [], repeat = true) {
    if (!Number.isInteger(inputNum)) return result;
    const num = Math.abs(inputNum);
    if (num < 2) return result;
    const theSqrt = Math.sqrt(num);
    let x = 2;
    if (num % x) {
      x = 3;
      if (num % x) {
        x = 5;
        let add = 2;
        while ((num % x) && (x < theSqrt)) {
          // search numbers: 5, 7, 11, 13, 17, 19, 23...
          x += add;
          // add each time: 2, 4, 2, 4, 2, 4, 2...
          add = 6 - add;
        }
      }
    }

    x = (x <= theSqrt) ? x : num;

    if (!repeat) {
      const index = result.indexOf(x);
      if (index < 0) result.push(x);
    } else result.push(x);

    return (x === num) ? result : primeFactor.calculate(num / x, result, repeat);
  },

  getFactors: function getFactors(num) {
    return primeFactor.calculate(num, [], true);
  },

  getUniqueFactors: function getUniqueFactors(num) {
    return primeFactor.calculate(num, [], false);
  },

  getPrimeExponentObject: function getPrimeExponentObject(num) {
    const factors = primeFactor.calculate(num);
    const countObject = {};
    for (const factor of factors) {
      if (Number.isFinite(countObject[factor])) {
        countObject[factor] += 1;
      } else {
        countObject[factor] = 1;
      }
    }
    return countObject;
  },

  getFrequency: function getFrequency(num) {
    const countObject = primeFactor.getPrimeExponentObject(num);
    const result = [];

    for (const key in countObject) {
      if ({}.hasOwnProperty.call(countObject, key)) {
        const obj = {
          factor: Number(key),
          times: countObject[key],
        };
        result.push(obj);
      }
    }
    return result;
  },

};

export const isPrime = primeFactor.isPrime;
export const getPrimeExponentObject = primeFactor.getPrimeExponentObject;
export const getFactors = primeFactor.getFactors;
export const getUniqueFactors = primeFactor.getUniqueFactors;