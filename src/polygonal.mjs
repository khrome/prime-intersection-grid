export const getPolygonalNumber = (s, nn)=>{
    const n = Math.abs(nn);
    if(s === 1 || s === 0) return null;
    return ( s - 2 ) * (n*(n-1)/2) + n;
}
export const isPolygonalNumberFor = (x, s)=>{
    if(s === 1 || s === 0) return null;
    if(s === 2 ) return x;
    let can = 0;
    let pos = 2;
    while(can < x){
        can = getPolygonalNumber(s, pos);
        if(x === can) return pos;
        pos++;
    }
    return null;
}

export const getSGonalityDetailUpTo = (x, s, byPrefix)=>{
    let lcv=0;
    let value=null;
    const results = {};
    const list = [];
    for(;lcv <= s; lcv++){ // # of sides
        value = isPolygonalNumberFor(x, lcv);
        //value = Math.round(value*100)/100;
        if(byPrefix){
            results[prefixes[lcv]] = value;
        }else{
            results[lcv] = value;
        }
    }
    return results;
}

export const getSGonalityUpTo = (x, s, byPrefix)=>{
    const sGonalityDetail = getSGonalityDetailUpTo(x, s, byPrefix);
    let results = Object.keys(
        sGonalityDetail
    ).filter((key)=>!!sGonalityDetail[key]);
    if(!byPrefix){
        results = results.map((key)=>parseInt(key));
    }
    return results;
}

export const getStandardPolygonality = (x, byPrefix)=>{
    return getSGonalityUpTo(x, prefixes.length, byPrefix);
}

export const isSGonalNumberUpTo = (x, s)=>{
    const sGonality = getSGonalityUpTo(x, s);
    return Object.keys(sGonality).length > 0;
}


export const prefixes = [
    'singular', 'linear', 'triangular', 'square', 'pentagonal',
    'hexagonal', 'heptagonal', 'octagonal', 'nonagonal', 'decagonal',
    'hendecagonal', 'dodecagonal', 'tridecagonal', 'tetradecagonal', 'pentadecagonal',
    'hexadecagonal', 'heptadecagonal', 'octadecagonal', 'enneadecagonal', 'icosagonal'
];
//named, because the other package did this
export const getLinearNumber = (n)=>getPolygonalNumber(2, n);
export const getTriangularNumber = (n)=>getPolygonalNumber(3, n);
export const getSquareNumber = (n)=>getPolygonalNumber(4, n);
export const getPentagonalNumber = (n)=>getPolygonalNumber(5, n);
export const getHexagonalNumber = (n)=>getPolygonalNumber(6, n);
export const getHeptagonalNumber = (n)=>getPolygonalNumber(7, n);
export const getOctagonalNumber = (n)=>getPolygonalNumber(8, n);
export const getNonagonalNumber = (n)=>getPolygonalNumber(9, n);
export const getEnneagonalNumber = (n)=>getPolygonalNumber(9, n);
export const getDecagonalNumber  = (n)=>getPolygonalNumber(10, n);
export const getHendecagonalNumber  = (n)=>getPolygonalNumber(11, n);
export const getDodecagonalNumber  = (n)=>getPolygonalNumber(12, n);
export const getTridecagonalNumber  = (n)=>getPolygonalNumber(13, n);
export const getTetradecagonalNumber  = (n)=>getPolygonalNumber(14, n);
export const getPentadecagonalNumber  = (n)=>getPolygonalNumber(15, n);
export const getHexadecagonalNumber  = (n)=>getPolygonalNumber(16, n);
export const getHeptadecagonalNumber  = (n)=>getPolygonalNumber(17, n);
export const getOctadecagonalNumber  = (n)=>getPolygonalNumber(18, n);
export const getEnneadecagonalNumber  = (n)=>getPolygonalNumber(19, n);
export const getIcosagonalNumber  = (n)=>getPolygonalNumber(20, n);
export const getTriacontagonalNumber  = (n)=>getPolygonalNumber(23, n);
export const getTetracontagonalNumber  = (n)=>getPolygonalNumber(24, n);
export const getPentacontagonalNumber  = (n)=>getPolygonalNumber(25, n);
export const getHexacontagonalNumber  = (n)=>getPolygonalNumber(26, n);
export const getHeptacontagonalNumber  = (n)=>getPolygonalNumber(27, n);
export const getOctacontagonalNumber  = (n)=>getPolygonalNumber(28, n);
export const getEnneacontagonalNumber  = (n)=>getPolygonalNumber(29, n);
export const getHectagonalNumber  = (n)=>getPolygonalNumber(100, n);
export const getChiliagonalNumber  = (n)=>getPolygonalNumber(1000, n);
export const getMyriagonalNumber  = (n)=>getPolygonalNumber(10000, n);