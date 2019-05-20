const db = require('../models/index');

exports.createPost = (req, res) => {
    const post = new db.Post({
        title: req.body.title,
        postImage: req.file.path,
        text: req.body.text,
        link: req.body.link,
        _creator: req.params.userId
    });

    post.save()
        .then((newPost) => res.status(200).json({
            success: true,
            data: newPost
        }))
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
}

exports.getAllPosts = (req, res) => {
    db.Post.find({})
        .populate({
            path: '_creator',
            select: 'username _id'
        })
        .populate({
            path: '_comments',
            select: 'text createdAt _creator',
            match: {
                'isDeleted': false
            }
        })
        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(post => {
                    return {
                        id: post._id,
                        creator: post._creator,
                        title: post.title,
                        likes: post.likes,
                        likesCount: post.likes.length,
                        postImage: post.postImage,
                        link: post.link,
                        text: post.text,
                        dateCreated: post.createdAt,
                        comments: post._comments,
                        commentCount: post._comments.length
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
};

exports.likePost = (req, res) => {
    let user = req.params.user;
    const post = req.body.postId
    db.Post.findByIdAndUpdate(post,
        { $addToSet: { likes: user } },
        { new: true })
        .then(data => {
            res.status(200).json({
                success: true,
                data: data
            })
        }).catch(err => res.status(500).json({
            success: false,
            message: err
        }));
}