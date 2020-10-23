// const express= require("express");
// const mongoose = require("mongoose");
// const bodyparser = require("body-parser");
// const app = express();
// app.set("view engine","ejs");
// app.use(bodyparser.urlencoded({extended:true}));
// mongoose.connect(("mongodb://localhost:27017/projectsDB"), { useNewUrlParser: true, useUnifiedTopology: true }) ;
// const itemSchema = new mongoose.Schema({
//     name:String
// } );
// const Item = mongoose.model("Item", itemSchema);
// const item1 = new Item({
//     name:"welcome to home",
// });
// const item2 = new Item({
//     name:"welcome to home",
// });
// const item3 = new Item({
//     name:"welcome to home",
// });
// const d=[item1,item2,item3];

// app.get("/", function(req,res){
//     Item.find({},function(err,f){
//         if(f.length === 0){
//             Item.insertMany(d,function(err){
//                 if(err){
//                 console.log(err);
//                 }
//                 else{
//                     console.log("success");
//                 }
//             });
//             res.render("/");
//         }
//         else{

//             res.render("list",{newListItem:f});
//         }
      
//     })
// })
// app.post("/",function(req,res){
//     const i= req.body.n;
//    const item = new Item({
//        name:i
//    })
//    item.save();
// })

// app.listen(3000,function(){
//     console.log("start");
// });