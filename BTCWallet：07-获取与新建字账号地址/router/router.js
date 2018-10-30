
let router = require('express').Router();

let walletController = require("../controllers/wallet")
let webController = require("../controllers/web")

//钱包
router.post("/wallet/create", walletController.walletCreate)
router.get("/wallet/list", walletController.walletList)
router.post("/wallet/address", walletController.walletAddress)
router.post("/wallet/balance", walletController.walletBalance)
router.post("/wallet/newsubaddress", walletController.walletNewSubAddress)

router.post("/import/mnemonic", walletController.walletImportWithMnemonic)
router.post("/export/mnemonic", walletController.walletExportMnemonic)
router.post("/export/privatekey", walletController.walletExportPrivateKey)

//页面
router.get("/wallet.html", webController.getWalletHtml)
router.get("/walletinfo.html", webController.getWalletInfoHtml)

module.exports = router
