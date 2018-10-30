
module.exports = {

    getWalletHtml: (req, res) => {
        res.render("wallet.html");
    },
    
    getWalletInfoHtml: (req, res) => {
        res.render("walletInfo.html")
    },
}