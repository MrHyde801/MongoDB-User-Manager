const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true})
const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log(`db connected`)
})



const userSchema = new mongoose.Schema({
        id: mongoose.ObjectId,
        username: String,
        name: String,
        email: String,
        age: Number
})

let usersModel = mongoose.model('UserManager', userSchema)


//View usersModel
exports.view = (req,res) => {
    usersModel.find({}, (err, doc) => {
        if(err) {
            throw err
        } else {
            res.render('home', {rows: doc})
        }
    }).lean()
    
}
exports.find = (req,res)=> {
    let searchTerm = req.body.search

    usersModel.find({ name: {"$regex": searchTerm, "$options": "i" }}, (err, doc) => {
        if(err) {
            throw err
        } else {
            res.render('home', {rows: doc})
        }
    }).lean()
    
}

exports.form = (req,res)=> {
    res.render('add-user')
}

exports.create = (req,res) => {
    res.render('add-user')
    console.log(req.params.number)
}


//edit user
exports.edit = (req,res) => {
    res.render('edit-user')
}

