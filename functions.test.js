const functions = require('./functions.js');

test('test iterative function: fibo(1)',() => {
    expect(functions.fiboIterative(1)).toBe(1);
});

test('test iterative function: fibo(0)',() => {
    expect(functions.fiboIterative(0)).toBe(1);
});