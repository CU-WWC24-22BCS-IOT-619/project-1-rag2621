let mon=require('mongoose');

let sch=new mon.Schema({name:String,img:Object});

module.exports=mon.model('image',sch);