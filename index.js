import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import mysql from "mysql2"
const app=express()

app.use(express.json())
app.use(cors())
const uri=process.env.uri
mongoose.connect(uri)
.then((msg)=>console.log("connected"))
.catch((err)=>console.log(err))


let menuSchema={
    id:String,
    name:String,
    description:String,
    price:Number,
    image:String
}

let appetisers=mongoose.model("appetisers",menuSchema)
let mainCourse=mongoose.model("mainCourse",menuSchema)
let desserts=mongoose.model("desserts",menuSchema)
app.get("/",async(req,res)=>{
    let items=await mainCourse.find({})
    res.send(items)
})
app.get("/appetite",async(req,res)=>{
    let items=await appetisers.find({})
    res.send(items)
})
app.get("/desserts",async(req,res)=>{
    let items=await desserts.find({})
    res.send(items)
})

app.post("/addItem",(req,res)=>{
    console.log(req.body)
      const item=new appetisers({
        id:req.body.id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image
      })
      item.save()
      .then((res1)=>console.log(res1))
      .catch((err)=>console.log(err))
})

app.listen(2000,console.log("started"))