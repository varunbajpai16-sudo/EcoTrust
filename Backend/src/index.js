import dotenv from  "dotenv"
dotenv.config()
import app from "./app.js"

app.listen(5000,()=>{
    console.log("App is listning on port 5000")
})

app.get("/",(req,res)=>{
    res.send("App is Running on port 5000")
})