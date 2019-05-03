const db = require('../models/index');

exports.signup = (req, res) => {
    const {
        username,
        password
    } = req.body;

    const user = new db.User({
        username,
        password
    });

    user
        .save()
        .then(newUser => {
            return res.status(200).json({
                sucess: true,
                data: newUser
            });
        })
        .catch(err => {
            return res.status(500).json({
                meessage: err
            });
        });
}