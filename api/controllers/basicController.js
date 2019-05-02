exports.home = (req, res) => {
    res.status(200).json({
        message: "welcome to the forum api"
    });
}
