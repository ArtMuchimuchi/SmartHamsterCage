const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Item = require('./models/item.js')
const Log = require('./models/log.js')

const user = "artaoom21"
const password = "NKZrLQHi1HvRfG6x"
const dburl = `mongodb+srv://${user}:${password}@back-end.mgsficj.mongodb.net/?retryWrites=true&w=majority&appName=Back-end`

var isFeed = false;
var remainFood = 0;

const app = express()

app.use(express.json())

const corsOptions = {
    origin: 'http://localhost:4007',
    credentials: true,
  };

app.use(cors(corsOptions));

const server = app.listen(8080, () => {
    console.log("server Connected!")
})

const io = require('socket.io')(server, {
    cors: {
     origin: "*",
     methods: ["GET", "POST"],
     transports: ["websocket", "polling"],
     credentials: true,
    },
     allowEIO3: true,
})

io.on('connection', (socket) => {
    console.log('New connection')
    socket.emit('connectaaa', "sdfds")
})

app.get('/',(req,res)=>{
    console.log("main")
    res.send("main")
})

app.post('/update', async (req,res)=>{
    try{
        const log = await Log.create(req.body)
        console.log(req.body)
        res.status(200).json(log)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

app.get('/getLog', async (req,res) => {
    try{
        const logs = await Log.find({})
        res.status(200).json(logs)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

app.get('/checkFeedStatus',(req,res)=>{

    res.send(isFeed)
})

app.get('/feeding',(req,res)=>{
    console.log("Feeding!")
    isFeed = true
    res.send(isFeed)
})

app.get('/getRemainingFood',(req,res)=>{
    res.send(remainFood.toString())
})

app.post('/doneFeeding',(req,res)=>{
    try{
        remainFood = req.body.remainingFood
        isFeed = false
        console.log(remainFood)
        res.status(200).send(isFeed)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

mongoose.connect(dburl)
.then(() => {
    console.log("Connected to Database!")
})
.catch((e)=>{
    console.log(e)
})