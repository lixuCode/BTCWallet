
let config = require("../config/config")

module.exports = {
    getWalletClient: () => {
        var Client = require('bitcore-wallet-client');
        
        var client = new Client({
            baseUrl: config.BWS_URL,
            verbose: false,
        });
        return client
    },

}