
function fiboRecursive(n){
    if (n === 0 || n  === 1)
        return 1;
    return fiboRecursive(n-1) + fiboRecursive(n-2);
}

function fiboIterative(n){
    const fibo = {};
    fibo[0] = 1;
    fibo[1] = 1;
    for (let i =2 ; i<=n;i++){
        fibo[i] = fibo[i-1] + fibo[i-2];
    }
    return fibo[n];
}

module.exports = {
    fiboRecursive: fiboRecursive,
    fiboIterative: fiboIterative
}