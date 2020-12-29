module.exports = (req, res) => {
    res.status(req.status).json(req.result);
};
