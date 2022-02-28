const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('db connected')
})

const userSchema = new mongoose.Schema({
    number: Number,
    userid: String,
    name: String,
    email: String,
    age: { type: Number, min: 1, max: 100},
    createdDate: { type: Date, default: Date.now}
    
})

const user = mongoose.model('UserManager', userSchema)

//connection to pool


let data
//View Users
exports.view = (req,res) => {
    // res.render('home', {rows: data.users}) pulling data
    // user.findOne({name: userName}, (err, data)=> {
    //     if(err) return console.log(`oops! ${err}`)
    //     console.log(`data -- ${JSON.stringify(data)}`)
    //     let returnMsg = `user name: ${userName} role: ${data.role}`
    //     console.log(returnMsg)
    // })
    res.render('home')
    console.log('POST /')
    
}

exports.form = (req,res)=> {
    res.render('add-user')
}

exports.create = (req,res) => {
    res.render('add-user')
    console.log(req.params.number)
    // let user = {
    //             uniqeId: uuid.v4(),
    //             number: 0,
    //             userid: req.body.userid,
    //             name: req.body.name,
    //             email: req.body.email,
    //             age: req.body.age
    //         }

    // console.log(user)
}


//edit user
exports.edit = (req,res) => {
    res.render('edit-user')
}


