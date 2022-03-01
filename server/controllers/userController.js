const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')
const path = require('path')
const {MongoClient} = require('mongodb')
const mongoose = require('mongoose')
const { runInNewContext } = require('vm')
mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true})
const db = mongoose.connection
mongoose.set('autoIndex', true)

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log(`db connected`)
})



const userSchema = new mongoose.Schema({
        id: Number,
        username: String,
        name: String,
        email: String,
        age: Number
})

let usersModel = mongoose.model('UserManager', userSchema)

let dcount 

//View users
exports.view = (req,res) => {
    usersModel.find({}, (err, doc) => {
        if(err) {
            throw err
        } else {
            usersModel.countDocuments({}, (err,count) => {
                dcount = count
            })
            res.render('home', {rows: doc})
        }
    }).lean()
    
}

//search users
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

//add user page is created
exports.form = (req,res)=> {
    res.render('add-user')
}

//add user
exports.create = (req,res) => {
    const newU = new usersModel()
    newU.id = dcount
    newU.username = req.body.username
    newU.name = req.body.name
    newU.email = req.body.email
    newU.age = req.body.age

    newU.save((err, data)=> {
        if(err) {
            console.log(err)
        }
    })
    
}


//Edit User
exports.edit = (req,res)=> {
    
    let userEdit = req.params.id
    console.log(userEdit)
    usersModel.findOne({ id : userEdit}, (err, oneDoc) => {
        if(!err) {
            console.log(oneDoc)
            res.render('edit-user', { oneDoc })
        } else {
            throw err
        }
    }).lean()

}

