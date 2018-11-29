var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    class_id: String,
    class_name : String,
    professor: String,
    max_students: Number,
    credit: Number,
    registered: Number
});

module.exports = mongoose.model('course', UserSchema);