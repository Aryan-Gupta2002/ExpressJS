const express = require("express");
const app = express();
const cors = require('cors')
// cors is used for different (cross) origin resource sharing

app.use(express.json());
app.use(cors());
// we can manually give selected domains inside cors() as parameters to 
// give acces of backend only to those selected domains.

app.post('/sum',function(req,res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);
    res.json({
        "ans":a+b
    })
})

app.listen(3000);