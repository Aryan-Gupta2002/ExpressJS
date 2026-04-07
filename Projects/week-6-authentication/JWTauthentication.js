const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "actonide500";
const app = express();

app.use(express.json());
const users =[];

// We don't need a generate random string funtion to generate tokens as we installed a dependancy for JWT

app.post('/signup',function(req,res){
    const username = req.body.username;
    const pass = req.body.password;
    // we can add input validations (using zod), but to keep code simple for now, we are avoiding it
    users.push({
        "username":username,
        "password":pass
    })
    res.json({
        "msg": "You have successfuly signed up"
    })
})

app.post('/signin',function(req,res){
    const username = req.body.username;
    const pass = req.body.password;

    // We are using find() method to identify a preexisting user or reject the non-user request
    const foundUsers = users.find(function(u){
        if(u.username === username && u.password === pass)
            return true;
        else return false;
    })

    if(foundUsers){
        // Instead of generating tokens, we will encode the username with JWT
        const token = jwt.sign({
            username:username
        },JWT_SECRET);
        // JWT is stateless
        // foundUsers.token = token;
        res.json({
            token:token
        })
    }
    else{
        res.status(403).send({
            "msg":"Invalid password or username"
        })
    }
    console.log(users);
})

app.get('/showusers',function(req,res){
    console.log(users);
    res.send({});
})

// We will use tokens as authorization in headers
app.get('/me',function(req,res){
    const token = req.headers.token; // JWT
    const decodedInfo = jwt.verify(token,JWT_SECRET);
    const username = decodedInfo.username;

    // if /me only wanted if the this is a user, we could send res.json({username;usenamr})
    // but we will have to hit DB for password.

    let foundUsers = users.find(function(u){
        if(u.username === username)
            return true;
        else return false;
    })

    if(foundUsers){
        res.json({
            username:foundUsers.username,
            password:foundUsers.password
        })
    }
    else{
        res.json({
            "msg":"User not found or Invalid token"
        })
    }
})

app.listen(3000);