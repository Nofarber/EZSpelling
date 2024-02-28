const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

module.exports = mongoose.model('Teacher', teacherSchema);
