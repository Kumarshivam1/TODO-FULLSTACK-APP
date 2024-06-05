const express = require("express");
const app = express();
const {schemaPut,schemaPost} = require("./types.js");
const Todo = require("./schema/Schema.js");
const {connectDB} = require("./config/db.js");
const cors = require("cors");
app.use(express.json());

//allow frontend to hit backend even if then have diff port no

app.use(cors({origin:"http://localhost:5173"}))

connectDB();

app.post("/todo", async (req,res)=>{
    try{
    let {title, description} = req.body;
    console.log(req.body);
    const check = schemaPost.safeParse(req.body);
    if(!check.success){
        return res.status(400).json({
            message:"Invalid Inputs"
        })
    }
    //put in DB
    const response = await Todo.create({title:title,description:description,completed:false});

    return res.status(200).json({
        message:"Todo created Successfully"
    })

    }
    catch(err){
        return res.status(400).json({
            message:"Todo creation Unsuccessfull",
            error:err.message
        })
    }
    

});

app.delete("/delete", async(req,res)=>{
    try{
    let {id} = req.body;
    const check = schemaPut.safeParse(req.body);
    if(!check.success){
        return res.status(400).json({
            message:"Invalid Inputs"
        })
    }
    const respomse = await Todo.findOneAndDelete({_id:id},{new:true});
    return res.status(200).json({
        message:"Deletion Successfull"
    })
    }
    catch(err){
        return res.status(400).json({
            message:"Todo Deletion Unsuccessfull",
            error:err.message
        });
    }
})

app.put("/completed",async (req,res)=>{
    try{
    let {id} = req.body;
    const check = schemaPut.safeParse(req.body);
    if(!check.success){
        return res.status(400).json({
            message:"Invalid Inputs"
        })
    }
    const response = await Todo.findOneAndUpdate({_id:id},{completed:true});
    return res.status(200).json({
        message:"Todo successfully Updated"
    });
    }
    catch(err){
        return res.status(400).json({
            message:"Todo Updation Unsuccessfull",
            error:err.message
        });
    }
})

app.get("/todos",async (req,res)=>{
    try{
        const response = await Todo.find({});
        return res.status(200).json({
            response
        });
    }
    catch(err){
        return res.status(400).json({
            message:"Todo retrival Unsuccessfull",
            error:err.message
        });
    }
})

app.listen(3000,()=>{
    console.log("App running on port 3000");
})