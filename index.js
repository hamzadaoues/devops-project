const express = require('express')
const app = express()
const functions = require('./functions.js');

let port = process.env.PORT || 8901;

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/fiboRecursive',(req,res)=>{
    const n = req.query['n'];
    const result = functions.fiboRecursive(n);
    res.send({result: result});
})

app.get('/fiboIter',(req,res)=>{
    const n = req.query['n'];
    const result = functions.fiboIterative(n);
    res.send({result: result});
})



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})