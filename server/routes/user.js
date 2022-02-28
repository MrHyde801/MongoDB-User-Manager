const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController') //db where json is store
const fs = require('fs')

//create, find, update, delete

router.get('/', userController.view);
router.get('/add-user', userController.form);
router.post('/add-user', userController.create);
router.get('/edit-user/:id', userController.edit);


module.exports = router;