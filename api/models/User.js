const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: [5, 'Username must be atleast 5 characters']
    },
    password: {
        type: String,
        required: true,
        min: [8, 'Password must be atleast 8 characters']
    }
})

// enrypt password later

const User = mongoose.model('User', userSchema);

module.exports = User;