
var client = require("../models/walletClient").getWalletClient()
var path = require('path');
var fs = require('fs');
var config = require("../config/config")
var { success, fail } = require("../utils/myUtils")
let myUtils = require("../utils/myUtils")

module.exports = {
    walletCreate: (req, res) => {
        let { walletname, password } = req.body
        console.log(req.body)

        client.seedFromRandomWithMnemonic({
            passphrase: password,
            network: config.networkType,
            coin: config.coinType,
        })
        console.log(client.credentials.mnemonic)
        client.createWallet(walletname, config.coinType, 1, 1, {
            network: config.networkType,
            withMnemonics: client.credentials.mnemonic,
            coin: config.coinType,

        }, function (err, ret) {
            console.log(err, ret)
            if (err) {
                res.send(fail(err.message))
                return
            }
            let filePath = path.join(config.walletFilePath, walletname + ".dat")
            fs.writeFileSync(filePath, client.export());

            client.createAddress({}, function (err, addr) {
                console.log(err, addr)
                if (err) {
                    res.send(fail(err.message))
                    return
                }
                res.send(success({ "address": addr.address }))
            });
        })
    },

    walletList: (req, res) => {

        let wallets = []
        var files = fs.readdirSync(config.walletFilePath);
        files.forEach(function (ele, index) {
            if (myUtils.stringWithSubstrEnd(ele, ".dat")) {
                wallets.push(ele.slice(0, -4))
            }
        })

        res.send(success(wallets))
    },

    walletImportWithMnemonic: (req, res) => {
        let { mnemonic, walletname, password } = req.body
        console.log(req.body)
        client.seedFromMnemonic(mnemonic, {
            network: config.networkType,
            passphrase: password,
            coin: config.coinType,
        });
        client.createWallet(walletname, config.copayerName, 1, 1, {
            network: config.networkType,
            withMnemonics: mnemonic,
            coin: config.coinType,
        }, function (err, ret) {
            console.log(err, ret)
            if (err) {
                res.send(fail(err.message))
                return
            }
            let filePath = path.join(config.walletFilePath, walletname + ".dat")
            fs.writeFileSync(filePath, client.export());

            client.createAddress({}, function (err, addr) {
                console.log(err, addr)
                if (err) {
                    res.send(fail(err.message))
                    return
                }
                res.send(success("导入成功"))
            });
        })
    },

    walletExportMnemonic: (req, res) => {
        let { walletname, password } = req.body
        let filePath = path.join(config.walletFilePath, walletname + ".dat")
        client.import(fs.readFileSync(filePath));
        res.send(success(client.credentials.mnemonic))
    },

    walletAddress: (req, res) => {

        let { walletname } = req.body

        let filePath = path.join(config.walletFilePath, walletname + ".dat")
        client.import(fs.readFileSync(filePath));

        client.getMainAddresses({}, function (err, addressData) {
            console.log(err, addressData)
            if (err) {
                res.send(fail(err.message))
                return
            }
            res.send(success(addressData))
        });
    },

    walletBalance: (req, res) => {
        let { walletname } = req.body
        console.log("walletname:", walletname)

        let filePath = path.join(config.walletFilePath, walletname + ".dat")
        client.import(fs.readFileSync(filePath));

        client.getBalance({}, (err, balanceData) => {
            console.log(err, balanceData)
            if (err) {
                res.send(fail(err.message))
                return
            }
            res.send(success(balanceData))
        })
    },
        
    walletNewSubAddress: (req, res) => {

        let { walletname } = req.body

        let filePath = path.join(config.walletFilePath, walletname + ".dat")
        client.import(fs.readFileSync(filePath));

        client.createAddress({}, function (err, addr) {
            console.log(err, addr)
            if (err) {
                res.send(fail(err.message))
                return
            }
            res.send(success(addr))
        });
    },
        
    walletExportPrivateKey: (req, res) => {
        let { walletname, childpath, password } = req.body
        let filePath = path.join(config.walletFilePath, walletname + ".dat")
        client.import(fs.readFileSync(filePath));

        let derivedXPrivKey = client.credentials.getDerivedXPrivKey(null);
        let privateKey = derivedXPrivKey.deriveChild(childpath).privateKey
        res.send(success(privateKey.toWIF()))
    },
}
