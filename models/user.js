var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    student_id: String,
    password : String,
    name: String,
    birth: Date,
    department: String
});

module.exports = mongoose.model('user', UserSchema);