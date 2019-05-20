const db = require('../models/index');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {

    let username = req.body.username ? req.body.username.trim() : '';
    let password = req.body.password ? req.body.password.trim() : '';

    db.User.find({
        username
    })
        .exec()
        .then(user => {
            if (user >= 1) {
                return res.status(409).json({
                    success: false,
                    message: 'User exists'
                });
            } else {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err
                        });
                    } else {
                        const user = new db.User({
                            _id: new mongoose.Types.ObjectId(),
                            username: username,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({
                                    success: true,
                                    message: 'User created'
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    success: false,
                                    message: "Username already taken"
                                });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            });
        });
};

exports.login = (req, res) => {

    let username = req.body.username ? req.body.username.trim() : '';
    let password = req.body.password;

    if (!(username && password))
        return res.status(400).json({ success: false, message: 'username and password are required' });

    db.User.find({
        username
    })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    success: false,
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        success: false,
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].email,
                        userID: user[0]._id
                    }, process.env.THE_KEY, {
                            expiresIn: '1h'
                        });
                    return res.status(200).json({
                        success: true,
                        message: 'Auth successful',
                        token: token
                    });
                }
                res.status(401).json({
                    success: false,
                    message: 'Auth failed'
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            });
        })
};

exports.getUserPosts = (req, res) => {
    const { userId } = req.params;
    db.Post.findById(userId)
        .exec()
        .then(posts => {
            const postCount = posts.length;
            if (postCount == 0) {
                return res.status(200).json({
                    success: true,
                    message: 'You have no posts, yet.'
                });
            }
            return res.status(200).json({ success: true, message: `You have ${postCount} posts`, posts })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: err
            });
        })
}