
let router = require('express').Router();

let walletController = require("../controllers/wallet")
let webController = require("../controllers/web")

//钱包
router.post("/wallet/create", walletController.walletCreate)
router.get("/wallet/list", walletController.walletList)

router.post("/import/mnemonic", walletController.walletImportWithMnemonic)
router.post("/export/mnemonic", walletController.walletExportMnemonic)

//页面
router.get("/wallet.html", webController.getWalletHtml)

module.exports = router
