let ex=require("express");
let f=require("fs");
let con=require('./connection.js');
let url='mongodb+srv://raghavdhiman2006:123@raghav.loyrcrt.mongodb.net/';
let cn=require('mongoose');
let twili=require('twilio');
const cli=twili('AC56f7229f2567828301ef89151829d81e','9cdd6d2fffc70cc8fa6375e6466cf428');
let eu=require('./upload.js');
let mon=require("mongoose");
let b=require('body-parser');
let prp=require('./formconnect.js');




let s= new mon.Schema({Name:String,Phone:String,Email:String,City:String,Pname:String});

let fr=mon.model('pinfo',s);

//let con1=require('./news.js');

const mongoose = require('mongoose');
const bodyParser = require("body-parser");

// Define schema

const imageSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});




const Image = mongoose.model('imge', imageSchema);

// Save an image
/*
const fs = require('fs');
const newImage = new Image({
  name: 'example',
  img: {
    data: fs.readFileSync('./sobha atlus.jpg'),
    contentType: 'image/jpeg',
  },
});

newImage.save()
  .then(() => console.log('Image saved'))
  .catch((err) => console.error(err));

*/
const app=ex();
app.use(ex.json());
app.use(b.json());
app.get('/load',(req,res)=>{
    Image.find({}).then((r)=>{
        res.json(r);
        res.end();
    })
})
app.get('/', (req, res) => {
    
    f.readFile('\html.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the HTML file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});
app.get('/explore',(req,res)=>{

    f.readFile('\explore.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the HTML file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });

});

app.get('/data',(req,res)=>{
    res.send({"name":"Raghav"});
    res.end();
})
app.get('/explore/:name',(req,res)=>{
    let {name}=req.params;
    console.log(req.params);

    eu.find({name:name}).then((ress)=>{
      
        res.json(ress);
        res.end();
    })
   
});


app.post('/datapost',(req,res)=>{
    console.log('hello');
    const {name,tele,email,cii,pname}=req.body;
    console.log(tele);
    console.log(req.body);

    prp.create({Name:name,Phone:tele,Email:email,City:cii,Pname:pname}).then(()=>{
        console.log("hello");
    })
  
})

app.post('/otp',(req,res)=>{

    const {tele,otp}=req.body;

    console.log(req.body);

    const client = twili('AC56f7229f2567828301ef89151829d81e','9cdd6d2fffc70cc8fa6375e6466cf428');
        const message = `Your OTP is: ${otp}`;
        client.messages
            .create({
                body: message,
                from: '+16202209659',
                to: tele,
            })
            .then(()=>{
                console.log('hello');
            })
           
    

   
    
})

cn.connect(url).then(()=> console.log('connected') );


    


app.listen(5000,()=>{
    console.log("server is listening");
});