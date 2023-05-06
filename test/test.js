import * as chai from 'chai';
const should = (chai.should?chai:window.chai).should();
import { Grid } from '../prime-intersection-grid.js';

describe('prime-intersection-grid', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works with primes', ()=>{
            const grid = new Grid({
               map: true,
               origins: [
                  [0, 0, 0],
                  [13, 12, 45]
               ]
            });
            const result = grid.cell(7, 13);
            
            //X
            should.exist(result.x);
            should.exist(result.x.primes);
            should.exist(result.x.primes['7']);
            result.x.primes['7'].should.equal(1);
            should.exist(result.x.primeDigits);
            should.exist(result.x.primeDigits[0]);
            result.x.primeDigits[0].should.equal(7);
            
            //Y
            should.exist(result.y);
            should.exist(result.y.primes);
            should.exist(result.y.primes['13']);
            result.y.primes['13'].should.equal(1);
            should.exist(result.y.primeDigits);
            should.exist(result.y.primeDigits[0]);
            result.y.primeDigits[0].should.equal(1);
            should.exist(result.y.primeDigits[1]);
            result.y.primeDigits[1].should.equal(3);
        });
        
        it('works with composites', ()=>{
            const grid = new Grid({
                 map: true,
                 origins: [
                    [0, 0, 0],
                    [13, 12, 45]
                 ]
            });
            const result = grid.cell(8, 25);
            
            //X
            should.exist(result.x);
            should.exist(result.x.primes);
            should.exist(result.x.primes['2']);
            result.x.primes['2'].should.equal(3);
            should.exist(result.x.digits);
            should.exist(result.x.digits[0]);
            result.x.digits[0].should.equal(8);
              
            //Y
            should.exist(result.y);
            should.exist(result.y.primes);
            should.exist(result.y.primes['5']);
            result.y.primes['5'].should.equal(2);
            should.exist(result.y.digits);
            should.exist(result.y.digits[0]);
            result.y.digits[0].should.equal(2);
            should.exist(result.y.digits[1]);
            result.y.digits[1].should.equal(5);
        });
          
        it('profile of 100 x 100', ()=>{
            const grid = new Grid({
                map: true,
                origins: [
                    [0, 0, 0],
                    [13, 12, 45]
                ]
            });
            let stats = {
                num: 0,
                numBothPrime: 0,
                numBothComposite: 0,
                numWithStates: 0,
                numWithoutStates: 0,
                avgStates: 0,
            }
            let x = 0;
            let y = 0;
            let cell = null;
            let numStates = null;
            for(; x< 100; x++){
                y = 0;
                for(; y< 100; y++){
                    cell = grid.cell(x, y);
                    stats.num++;
                    if(cell.isFullyPrime) stats.numBothPrime++;
                    if(cell.x.composite && cell.y.composite) stats.numBothComposite++;
                    numStates = Object.keys(cell.has).filter((key)=>cell.has[key]).length;
                    //console.log(Object.keys(cell.has), Object.keys(cell.has).filter((key)=>cell.has[key]))
                    if(numStates > 1){
                        stats.numWithStates++;
                    }else{
                        stats.numWithoutStates++;
                    }
                    stats.avgStates = (stats.num-1 * stats.avgStates + numStates) /stats.num;
                    if(stats.avgStates === NaN) stats.avgStates = 0; 
                    
                }
            }
            stats.num.should.equal(10000);
            stats.numBothPrime.should.equal(625);
            stats.numBothComposite.should.equal(5625);
            stats.numWithStates.should.equal(9324);
            stats.numWithoutStates.should.equal(676);
            stats.avgStates.should.equal(1.0000000000050013);
        });
    });
});
