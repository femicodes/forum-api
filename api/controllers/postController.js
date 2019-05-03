const db = require('../models/index');

exports.createPost = (req, res) => {
    const {
        title,
        text,
        link,
        userId
    } = req.body;

    // Validation Pending

    const post = new db.Post({
        title,
        text,
        link,
        _creator: userId
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
                        link: post.link,
                        text: post.text,
                        dateCreated: post.createdAt,
                        comments: post._comments
                    }
                })
            }
            res.status(200).json(response);
        })
        .catch(err => res.status(500).json({
            success: false,
            message: err
        }));
}