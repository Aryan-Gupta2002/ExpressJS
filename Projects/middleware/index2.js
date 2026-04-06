const express = require('express');
const app = express();

let count =0;
//Let's log request method, requestURL and timestamp of the requests 
function logger(req,res,next){
    console.log(`Method is: ${req.method}`);
    console.log(`Host is ${req.hostname}`);
    console.log(new Date());
    next();
}

//Now we want to access req.name in other middleware or endpoint function
function add(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        "Sum":a+b
    });
}

function mult(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        "Multiply":a*b
    });
}

app.get("/sum",logger,add);
app.get("/multiply", logger,mult);
app.listen(3000);