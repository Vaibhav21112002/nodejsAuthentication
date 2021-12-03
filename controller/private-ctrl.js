module.exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        status:true,
        message: 'You have successfully accessed private data'
    });
}