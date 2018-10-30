
let router = require('express').Router();

let walletController = require("../controllers/wallet")

//钱包
router.post("/wallet/create", walletController.walletCreate)

router.get("/wallet.html", (req, res) => {
    res.render("wallet.html");
})

module.exports = router
