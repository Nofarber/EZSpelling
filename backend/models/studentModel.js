
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' } 
});

module.exports = mongoose.model('Student', studentSchema);
