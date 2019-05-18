const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: String,
    text: String,
    postImage: {
        type: String,
        required: true
    },
    _creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    likes: [{
        type: Schema.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    _comments: [{
        type: Schema.ObjectId,
        ref: 'Comment'
    }]
})

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;