const express = require('express');
const app = express();

app.use(express.json());
const users =[];

// Creating a generate random string funtion to generate tokens
function generateRandomToken(){
    let options = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'];
    let token ="";
    for(let i = 0; i<20;i++){
        token += options[Math.floor(Math.random()*options.length)];
    }
    return token;
}

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
        const token = generateRandomToken();
        foundUsers.token = token;
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
    const token = req.headers.token;
    let foundUsers = users.find(function(u){
        if(u.token === token)
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