exports.home = (req, res) => {
    res.status(200).json({
        success: true,
        message: "welcome to the forum api"
    });
}
