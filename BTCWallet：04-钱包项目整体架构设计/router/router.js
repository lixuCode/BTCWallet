
let router = require('express').Router();

router.get("/wallet.html", (req, res) => {
    res.render("wallet.html");
})

module.exports = router
