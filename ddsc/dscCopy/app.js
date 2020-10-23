const express= require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();
app.set("view engine","ejs" );
app.use(bodyparser.urlencoded({extended:true}));
app.use( express.static( "public" ) );
mongoose.connect("mongodb://localhost:27017/dscakg",{ useNewUrlParser: true});
app.get("/",function(req,res){
    res.render("home");
});
app.get("/login",function(req,res){
    res.render("login");
});
app.get("/adminlogin",function(req,res){
    res.render("adminlogin");
});
app.get("/register",function(req,res){
    res.render("register");
});
app.get("/item",function(req,res){
    res.render("item");
});
app.get("/team",function(req,res){
    res.render("team");
});

const projectSchema = new mongoose.Schema({
    name:String,
    description:String
} );
const Project = mongoose.model("Project", projectSchema);
const userSchema = new mongoose.Schema( {
    username:String,
    email: String,
    branch:String,
    year:Number,
    password: String
});
const User = mongoose.model("User",userSchema);
const itemSchema = new mongoose.Schema({
    name:String,
    description:String
} );
const Item = mongoose.model("Item", itemSchema);
app.post("/register", function(req,res){
const newuser = new User({
   username:req.body.username,
   email : req.body.email,
   branch : req.body.branch,
   year : req.body.year,
   password:req.body.password
    });
    newuser.save(function(err){
    if(err)
    {
        console.log(err);
    }
    else
    {
         res.render("secrets");
    }
});
});
app.post("/login",function(req,res){
    const  email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}, function(err,founduser){
        if(!err){ 
            if(founduser.password === password)
             {
                res.render("secrets");
            }
        }
        else{
            console.log(err);
        }
    })
});
app.post("/adminlogin",function(req,res){
    const  email = req.body.email;
    const password = req.body.password;
    User.findOne({email:email}, function(err,founduser){
        if(!err){
            if(founduser.password === password) {
                res.render("item");
            }
        }
        else{
            console.log(err);
        }
    })   
});

const item1 = new Item({
    name:"python",
    description:"this is the project based on python",
});
const item2 = new Item({
    name:"cpp",
    description:"this is the project based on c++",
});
const item3 = new Item({
    name:"ml",
    description:"this is the project based on machine learning",
});
const d=[item1,item2,item3];
app.get("/event", function(req,res){
    Item.find({},function(err,f){
    if(f.length === 0){
    Item.insertMany(d,function(err){
    if(err){
     console.log(err);
       }
          else{
         console.log("success");
                }
    });
        res.render("/event");
    }
        else{
            res.render("event",{newListItem:f});
        }
    })
})
app.post("/event",function(req,res){
    const i= req.body.n;
    const dis = req.body.dis;
    const item = new Item({
        name:i,
        description:dis
    })
item.save();
 });
 app.post("/item",function(req,res){
    const i= req.body.n;
    const dis = req.body.dis;
    const item = new Item({
        name:i,
        description:dis
    });
item.save();
res.render("event");
 });
const project1 = new Project({
    name:"python",
    description:"at eval (eval at compile (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/ejs/lib/ejs.js:618:12), :13:21) at returnedFn (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/ejs/lib/ejs.js:653:17) at tryHandleCache (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/ejs/lib/ejs.js:251:36) at View.exports.renderFile [as engine] (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/ejs/lib/ejs.js:482:10) at View.render (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/express/lib/view.js:135:8) at tryRender (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/express/lib/application.js:640:10) at Function.render (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/express/lib/application.js:592:3) at ServerResponse.render (/Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/express/lib/response.js:1008:7) at /Users/rohandahima/Desktop/todolist-v2-starting-files/app.js:95:7 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/mongoose/lib/model.js:4876:16 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/mongoose/lib/model.js:4876:16 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/mongoose/lib/helpers/promiseOrCallback.js:24:16 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/mongoose/lib/model.js:4899:21 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/mongoose/lib/query.js:4380:11 at /Users/rohandahima/Desktop/todolist-v2-starting-files/node_modules/kareem/index.js:135:16 at processTicksAndRejections (internal/process/task_queues.js:79:11)",
});
const  project2 = new Project({
    name:"cpp",
    description:"this is the project based on c++",
});
const  project3 = new Project({
    name:"ml",
    description:"this is the project based on machine learning",
});
const d2=[item1,item2,item3];

app.get("/secrets", function(req,res){
    Project.find({},function(err,fi){
        if(fi.length === 0){
         Project.insertMany(d2,function(err){
            if(err){
             console.log(err);
               }
                  else{
                 console.log("success");
                        }
            });
                res.render("/secrets");
            }
                else{
            res.render("secrets",{newProject:fi});
                }
   })
});
app.post("/secrets",function(req,res){
    const p= req.body.n;
    const disc = req.body.dis;
    const project = new Project({
        name:p,
        description:disc
    });
project.save();
res.render("secrets");
});
app.listen(3000,function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("successfully started");
    }
});