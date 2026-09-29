
const express=require("express");
const app=express();
const port=3000;
const path=require("path");
const { v4: uuidv4 }=require("uuid");
const methodOverride=require("method-override");

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let blogs= [
{
  id:uuidv4(),

    username:"rajkumar ahirwar",
    blog:"an online publishing platform where individuals or businesses share ",
},

{
id:uuidv4(),
    username: "ram kumar",
    blog:  "doing work in silent",

},

];
app.get("/",(req,res)=>{
    res.send("Server working well!");

});
app.get("/blog",(req,res)=>{
    res.render("index.ejs", {blogs});
});
app.get("/blog/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/blogs",(req,res)=>{
let {username,blog}= req.body;
let id=uuidv4();
blogs.push({ id,username,blog});

    res.redirect("/blog");
    
});
app.get("/blogs/:id",(req,res)=>{
  
    let{id}=req.params;
  
    let blog=blogs.find((p)=>id===p.id);
   
    
    res.render("show.ejs", {blog});
});

app.patch("/blogs/:id",(req,res)=>{
     let{id}=req.params;
     let newBlog=req.body.Blog;
     let blog=blogs.find((p)=>id===p.id);
     blog.blog=newBlog;
     console.log(blog);
     res.redirect("/blog");
     

});

app.get("/blog/:id/edit",(req,res)=>{
     let{id}=req.params;
     let blog=blogs.find((p)=>id===p.id);
      res.render("edit.ejs",{blog});

});
app.delete("/blogs/:id",(req,res)=>{
    let {id}=req.params;

    blogs=blogs.filter((p)=>id !== p.id);

    res.redirect("/blog");
});







app.listen(port,()=>{
    console.log("listening to port:3000");
    
});