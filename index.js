import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import mysql from "mysql2"
const app=express()

app.use(express.json())
app.use(cors())
const uri=process.env.uri

const port=process.env.port||2000
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
let userSchema={

    name:String,
    phone:String,
    orders:[{quantity:Number,item:{id:String,name:String,description:String,price:Number,image:String}}]
}

let appetisers=mongoose.model("appetisers",menuSchema)
let mainCourse=mongoose.model("mainCourse",menuSchema)
let desserts=mongoose.model("desserts",menuSchema)
let users=mongoose.model("users",userSchema)
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

app.post("/signIn",async(req,res)=>{
    // console.log(req.body)
    let body=req.body
    let user= await users.find({phone:body.phone_no})
    // console.log("user",user)

    if(user.length>0){
        // console.log(user[0].orders)
        body.orders.forEach(order => {
            users.updateOne({phone:body.phone_no},{$set:{
                orders:[...user[0].orders,{quantity:body.orders[0].quantity,item:{
                id:body.orders[0].item.id,name:body.orders[0].item.name,description:body.orders[0].item.description,price:body.orders[0].item.price,image:body.orders[0].item.image
                }}]
            }}).then((succ)=>{
                console.log(succ)
                res.send(user[0])}
        )
            .catch((err)=>console.log(err))
            // console.log(order)
        });
    }
    else{
        res.send("user not found")
    }
})

app.post("/signUp",async(req,res)=>{
    let body=req.body
    // console.log(body)
    let user1=new users(
        { name:body.name,
         phone:body.phone_no,
         orders:body.orders[0]}
     )
     user1.save()
     .then((out)=>{console.log(out)
        res.send("registered successfully")
    })
     .catch((err)=>console.log(err))
})


app.get("/history/:phone",(req,res)=>{
    const {phone}=req.params
    // console.log(req.params)
    users.find({phone:phone})
    .then((out)=>res.send(out))
})

app.listen(port,console.log("started"))