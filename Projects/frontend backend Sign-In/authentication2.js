const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "actonide";

app.use(express.json());
users = [];

function authMiddleware(req,res,next){
    // const username = req.body.username;
    // const password = req.body.password;
    const token = req.headers.token;
    const decodedInfo = jwt.verify(token,JWT_SECRET);
    if(decodedInfo.username){
        req.username = decodedInfo.username;
        next();
    }else{
        res.json({
            msg:"You are not logged in"
        });
    }
}

// One major change we are going to do in our backend for this fullstack app is that we are going to pass the index.html (frontend file)
// Whenever user hits a URL "localhost:3000", so that we can avoid the complexities which comes with CORS
app.get('/',function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post('/signup',function(req,res){
    const userID = req.body.username;
    const pass = req.body.password;

    // Ideally we should only allow a user to have unique username and apply a check condition

    users.push({
        username:userID,
        password:pass
    });
    res.json({
        msg:"Sign-up Done"
    });
});

app.post('/signin',function(req,res){
    const userID = req.body.username;
    const pass = req.body.password;
    const foundUser = users.find(function(u){
        if(u.username === userID && u.password === pass)
            return true;
        else
            return false;
    })
    if(!foundUser){
        res.json({
                msg:"User does not exist"
        });
    }else{
        const token = jwt.sign({
            username:userID 
        },JWT_SECRET);
        // to send token as resonsse headers
        res.header("jwt",token);

        res.json({
            token:token
        })
    }
});

app.get('/me',authMiddleware,function(req,res){
    const foundUser = users.find(function(u){
        if(u.username === req.username){
            return true;
        }
    })
    res.json({
        username:foundUser.username,
        password:foundUser.password
    });
})

app.listen(3000);