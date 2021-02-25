exports = module.exports = function (req, res) {
    console.log(req.query);
    res.render("minions",req.query);
};
