const { application } = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    applications:Array
},{
    timestamps: true
});

const usermoel = mongoose.model('users',userSchema);
module.exports = usermoel;