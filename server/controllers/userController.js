const express = require('express')
const app = express()
const fs = require('fs')
const bodyParser = require('body-parser');
const path = require('path')
const mongoose = require('mongoose');
const e = require('express');
mongoose.connect('mongodb://localhost:27017/Users', {useNewUrlParser: true})
const db = mongoose.connection
mongoose.set('autoIndex', true)


db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log(`db connected`)
})


const userSchema = new mongoose.Schema({
        rowNum: Number,
        username: String,
        name: String,
        email: String,
        age: Number
})


let usersModel = mongoose.model('UserManager', userSchema)


//View users
exports.view = (req,res) => {
    usersModel.find({}, (err, doc) => {
        if(err) {
            throw err
        } else {
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

//add user page is generated
exports.form = (req,res)=> {
    res.render('add-user')
}

//add user
exports.create = (req,res) => {
    const newU = new usersModel()
    newU.username = req.body.username
    newU.name = req.body.name
    newU.email = req.body.email
    newU.age = req.body.age

    newU.save((err, data)=> {
        if(err) {
            console.log(err)
        } else {
            res.redirect('/')
        }
    })

}


//Edit User
exports.edit = (req,res)=> {
    
    let userEdit = req.params.id
    console.log(req.query)
    usersModel.findOne( { id: userEdit}, (err, oneDoc) => {
        if(!err) {
            
            res.render('edit-user', { oneDoc })
        } else {
            throw err
        }

       
    }).lean()
}

//Save User
exports.update = (req,res)=> {
    let userEdit = req.body.id
    let newusername = req.body.username
    let newname = req.body.name
    let newemail = req.body.email
    let newage = req.body.age
    //^^might not be the best way, might be a way to 2-way bind with react or angular

    usersModel.findOneAndUpdate( { id: userEdit}, { $set: { 
        username: newusername,
        name: newname,
        email: newemail,
        age: newage 

    }}, {new: true}, (err, oneDoc) => {
        if(!err) {
            res.redirect('/')
        } else {
            throw err
        }
    }).lean()
}

exports.delete = (req,res)=> {
    let userDelete = req.params.id
    usersModel.findOneAndDelete({id: userDelete}, (err)=> {
        if(err) {
            throw err
        } else {
            res.redirect('/')
        }
    }).lean()
}