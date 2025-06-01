const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authroute = require("./routes/Auth");
const bookroute = require("./routes/Books")

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use('/api/auth', authroute);
app.use('/api/books', bookroute);

mongoose.connect(process.env.MON_URL)
.then(()=>{
    console.log("Mongodb connected");
})
.catch((err)=>{
    console.error("mongodb error", err);
})

app.get('/', (req,res)=> [
    res.send("server connected")
]);

const port  = process.env.PORT || 3002

app.listen(port, ()=>{
    console.log(`listening to port ${port}`)
});