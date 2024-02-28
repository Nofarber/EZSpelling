const express = require('express');
const app = require('./app');
const dotenv = require("dotenv");
require ('dotenv').config({path:"./.env"})
const mongoose = require('mongoose')
const port = 8000


mongoose
.connect(process.env.URI)
.then(()=>{
    console.log('database conect')
})
.catch((err) => {
console.log(err)})



app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});