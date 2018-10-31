

function formatDateTime(inputTime) {  
    var date = new Date(inputTime);
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;  
    second = second < 10 ? ('0' + second) : second; 
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
}

function updateTransactionList(wallet) {

    let params = { "walletname": wallet }
    //地址
    $.post("/transaction/record", params, function (res, status) {
        console.log("/transaction/record:\n", status + JSON.stringify(res),"\n")
        if (res.code == 0) {

            let transactionListTable　= $("#transaction-list-table")
            if (res.data.length > 0) {
                transactionListTable.empty()
                for (let i = 0; i < res.data.length; i++) {
                    let transaction = res.data[i]
                    let isReceived = transaction.action == "received" ? true : false
                    let transactionTr = `<tr>
                        <td>${isReceived ? "收入" : "支出"}</td>
                        <td>${isReceived ? "+" : "-"}${transaction.amount/100000000}</td>                        
                        <td>${isReceived ? transaction.inputs[0].address : transaction.addressTo}</td>
                        <td>${formatDateTime(transaction.time*1000)}</td>
                        <td>${transaction.confirmations}</td>
                    </tr>`
                    transactionListTable.append(transactionTr)
                }
            } else {
                transactionListTable.text("暂无交易记录")
            }
        }
    })
}

$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")

    //钱包列表
    let walletList = localStorage.getItem("walletlist")
    walletList = JSON.parse(walletList)
    console.log("accountList", walletList,currentwallet)

    let addressSelectList = $("#transaction-record-wallet-select")
    for (let i = 0; walletList && i < walletList.length; i++) {
        let walletname = walletList[i]
        let showWalletname = walletname.slice(walletname.indexOf("-")+1)
        let walletOption
        if (walletname == currentwallet) {
            walletOption = `<option selected="selected" value="${walletname}">${showWalletname}</option>`
        } else {
            walletOption = `<option value="${walletname}">${showWalletname}</option>`
        }
        addressSelectList.append(walletOption)
    }

    //更新交易记录
    updateTransactionList(currentwallet)

    //选择不同的钱包
    addressSelectList.change(function () {
        console.log(this.value)
        localStorage.setItem("currentwallet", this.value)
        updateTransactionList(this.value)
    })
})