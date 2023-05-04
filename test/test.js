import * as chai from 'chai';
const should = (chai.should?chai:window.chai).should();
import { Grid } from '../prime-intersection-grid.js';

describe('prime-intersection-grid', ()=>{
   describe('performs a simple test suite', ()=>{
        it('works as expected', ()=>{
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
            should.exist(result.x.digits);
            should.exist(result.x.digits[0]);
            result.x.digits[0].should.equal(7);
            
            //Y
            should.exist(result.y);
            should.exist(result.y.primes);
            should.exist(result.y.primes['13']);
            result.y.primes['13'].should.equal(1);
            should.exist(result.y.digits);
            should.exist(result.y.digits[0]);
            result.y.digits[0].should.equal(1);
            should.exist(result.y.digits[1]);
            result.y.digits[1].should.equal(3);
        });
    });
});
