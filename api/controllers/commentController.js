const db = require('../models/index');

exports.postComment = (req, res) => {
    const { userId, text } = req.body;
    const postId = req.params.postId;

    const comment = new db.Comment({
        text,
        _creator: userId,
        _post: postId
    });

    comment.save()
        .then((newComment) => {
            db.Post.findByIdAndUpdate(
                postId, {
                    $push: {
                        '_comments': newComment._id
                    }
                }
            ).then(existingPost => {
                res.status(200).json({
                    success: true,
                    data: newComment,
                    existingPost
                })
            }).catch(err => res.status(500).json({
                success: false,
                message: err
            }))
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err
            })
        });
}