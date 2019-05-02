const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { Schema } = mongoose;

const commentSchema = new Schema({
    text: {
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
    createdAt: {
        type: Date,
        default: Date.now()
    },
    _post: {
        type: Schema.ObjectId,
        ref: 'Post'
    }
});

const autoPopulateCreator = function (next) {
    this.populate({
        path: '_creator',
        select: 'username createdAt -_id'
    });
    next();
};

commentSchema.pre('find', autoPopulateCreator);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;