import PAF from 'primes-and-factors';
const { isPrime, getPrimeExponentObject } = PAF;

const indexMap = [
    null,
    { indices: ['x', 'y'] },
    { indices: ['x', 'y', 'z'] }
];

const primesIndex = {
    wilson : [5, 13, 563],
    cullen : [3, 393050634124102232869567034555427371542904833],
    cuban: [
        //first form
        7, 19, 37, 61, 127, 271, 331, 397, 547, 631, 919, 1657, 1801, 1951, 2269, 2437, 2791, 3169, 3571, 4219, 4447, 5167, 5419, 6211, 7057, 7351, 8269, 9241, 10267, 11719, 12097, 13267, 13669, 16651, 19441, 19927, 22447, 23497, 24571, 25117, 26227, 27361, 33391, 35317,
        //second form
        13, 109, 193, 433, 769, 1201, 1453, 2029, 3469, 3889, 4801, 10093, 12289, 13873, 18253, 20173, 21169, 22189, 28813, 37633, 43201, 47629, 60493, 63949, 65713, 69313, 73009, 76801, 84673, 106033, 108301, 112909, 115249
    ],
    circular : [
        2, 3, 5, 7, 11, 13, 17, 31, 37, 71, 73, 79, 97, 113, 131, 197, 199, 311, 337, 373, 719, 733, 919, 971, 991, 1193, 1931, 3119, 3779, 7793, 7937, 9311, 9377, 11939, 19391, 19937, 37199, 39119, 71993, 91193, 93719, 93911, 99371, 193939, 199933, 319993, 331999, 391939, 393919, 919393, 933199, 939193, 939391, 993319, 999331, 1111111111111111111, 11111111111111111111111
    ],
    circlet : [
        2, 3, 5, 7, 11, 13, 17, 37, 79, 113, 197, 199, 337, 1193, 3779, 11939, 19937, 193939, 199933, 1111111111111111111, 11111111111111111111111
    ],
    bell : [
        2, 5, 877, 27644437, 35742549198872617291353508656626642567, 359334085968622831041960188598043661065388726959079837
    ],
    balanced : [
        5, 53, 157, 173, 211, 257, 263, 373, 563, 593, 607, 653, 733, 947, 977, 1103, 1123, 1187, 1223, 1367, 1511, 1747, 1753, 1907, 2287, 2417, 2677, 2903, 2963, 3307, 3313, 3637, 3733, 4013, 4409, 4457, 4597, 4657, 4691, 4993, 5107, 5113, 5303, 5387, 5393
    ],
    cluster : [
        3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 
        67, 71, 73, 79, 83, 89, 101, 103, 107, 109, 113, 131, 137, 139, 
        151, 157, 163, 167, 173, 179, 181, 193, 197, 199, 233, 239, 
        241, 271, 277, 281, 283, 311, 313, 317, 353, 359, 389, 401, 
        421, 433
    ],
    dihedral : [
        2, 5, 11, 101, 181, 1181, 1811, 18181, 108881, 110881, 118081, 120121, 121021, 121151, 150151, 151051, 151121, 180181, 180811, 181081
    ],
    einstein : [
        2, 5, 11, 17, 23, 29, 41, 47, 53, 59, 71, 83, 89, 101, 107, 113, 131, 137, 149, 167, 173, 179, 191, 197, 227, 233, 239, 251, 257, 263, 269, 281, 293, 311, 317, 347, 353, 359, 383, 389, 401
    ],
    euclid : [
        3, 7, 31, 211, 2311, 200560490131
    ],
    euler : [
        19, 31, 43, 47, 61, 67, 71, 79, 101, 137, 139, 149, 193, 223, 241, 251, 263, 277, 307, 311, 349, 353, 359, 373,379, 419, 433, 461, 463, 491, 509, 541, 563, 571, 577, 587
    ],
    factorial : [
        2, 3, 5, 7, 23, 719, 5039, 39916801, 479001599, 87178291199, 10888869450418352160768000001, 265252859812191058636308479999999, 263130836933693530167218012159999999, 8683317618811886495518194401279999999
    ],
    fermat : [
        3, 5, 17, 257, 65537 
    ],
};




function factorial(n){
  let result = 1;
  if (n == 0 || n == 1) return result;
  else if(n > 1){
    for(var i = n; i >= 1; i--) result = result * i;
    return result;
  }
  else throw new Error('');
}

const isPowerOfTwo = (n) => (n && !(n & (n - 1)));
const isProthNumber = (n)=>{
    let k = 1;
    while (k < parseInt(n / k)){
        if (n % k == 0 && isPowerOfTwo(parseInt(n / k))) return true;
        k = k + 2;
    }
    return false;
}


export class Grid{
    constructor(options={}){
        this.options = options;
        this.offsets = options.offsets || [
            Math.random(Math.random()*5000),
            Math.floor(Math.random()*5000),
            Math.floor(Math.random()*5000)
        ];
        this.origins = options.origins || [
            [0, 0, 0],
            [
                Math.floor(Math.random()*5000),
                Math.floor(Math.random()*5000),
                Math.floor(Math.random()*5000)
            ]
        ]
    }
    
    cell(...coordinates){
        const isPrimes = []; //2d array: origin, coordinate
        const originIsPrime = [];
        const isFullyPrime = coordinates.reduce(
            (agg, coordinate, index)=>{
                return agg || this.origins.reduce(
                    (coordinateIsPrime, origin, axisIndex)=>{
                        const offset = -1 * origin[axisIndex];
                        const localValue = coordinate + offset;
                        originIsPrime[axisIndex] = PAF.isPrime(localValue)
                        return coordinateIsPrime || originIsPrime[axisIndex];
                    }, false
                )
            }, false
        );
        const allOriginsPrime = originIsPrime.reduce(((agg, isPrime)=> agg || isPrime ), false);
        if(allOriginsPrime){ //are all the coords prime?
            const has = {};
            const allIs = { twin: true, cousin: true, sexy: true, identity: true};
            const allDigits = [];
            const result = coordinates.reduce((agg, coordinate, index)=>{
                const primes = PAF.getPrimeExponentObject(coordinate);
                const primesList = Object.keys(primes);
                const digits = [];
                Object.keys(primes).forEach((prime)=>{
                    (""+prime).split('').forEach((char)=>{
                        if(digits.indexOf(char) === -1) digits.push(parseInt(char));
                    })
                });
                digits.forEach((digit)=>{
                    if(allDigits.indexOf(digit) === -1) allDigits.push(digit);
                });
                const is = {};
                Object.keys(primesIndex).forEach((type)=>{
                    is[type] = primesIndex[type].indexOf(coordinate) !== -1;
                    allIs[type] = true;
                });
                is.twin = (isPrime(coordinate-2) || isPrime(coordinate+2));
                is.cousin = (isPrime(coordinate-4) || isPrime(coordinate+4));
                is.sexy = (isPrime(coordinate-4) || isPrime(coordinate+4));
                is.identity = primesList.length === 1 && primesList[0] === ''+coordinate;
                Object.keys(is).forEach((type)=>{
                    has[type] = has[type] || is[type];
                    allIs[type] = allIs[type] && is[type];
                });
                agg[
                    (indexMap[coordinates.length] && this.options.map)?
                    indexMap[coordinates.length].indices[index]:
                    index
                ] = {
                    primes,
                    digits,
                    is
                };
                return agg;
            }, {});
            result.digits = allDigits;
            result.has = has;
            result.is = allIs;
            result.isFullyPrime = isFullyPrime;
            result.primeAxes = isPrimes;
            return result;
        }
        return {}
    }
}