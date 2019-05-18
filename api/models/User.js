const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true
        //min: [5, 'Username must be atleast 5 characters']
    },
    password: {
        type: String,
        required: true
        //min: [8, 'Password must be atleast 8 characters']
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;