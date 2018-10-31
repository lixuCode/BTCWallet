
let router = require('express').Router();

let walletController = require("../controllers/wallet")
let webController = require("../controllers/web")
let transactionController = require("../controllers/transaction")

//钱包
router.post("/wallet/create", walletController.walletCreate)
router.get("/wallet/list", walletController.walletList)
router.post("/wallet/address", walletController.walletAddress)
router.post("/wallet/balance", walletController.walletBalance)
router.post("/wallet/newsubaddress", walletController.walletNewSubAddress)

//导入导出
router.post("/import/mnemonic", walletController.walletImportWithMnemonic)
router.post("/export/mnemonic", walletController.walletExportMnemonic)
router.post("/export/privatekey", walletController.walletExportPrivateKey)

//转账交易
router.post("/transaction/send", transactionController.transactionSend)
router.post("/transaction/record", transactionController.transactionRecord)

//页面
router.get("/wallet.html", webController.getWalletHtml)
router.get("/walletinfo.html", webController.getWalletInfoHtml)
router.get("/transaction.html", webController.getTransactionHtml)
router.get("/transactionrecord.html", webController.getTransactionRecordHtml)

module.exports = router
