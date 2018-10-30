
//获取子地址
function createSubAddress() {
    //地址
    let params = {"walletname":currentwallet}
    $.post("/wallet/newsubaddress", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            updateWalletAddressList()
        }
    })
}

//导出私钥
function exportPrivatekey(walletName,path) {
    console.log(walletName)
    let password = prompt("请输入该钱包的密码")
    if (password) {
        let params = { 
            "walletname": walletName,
            "password": password, 
            "childpath":path
        }
        $.post("/export/privatekey", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                alert(res.data)
            }
        })
    }
}

//获取钱包子账号地址
function updateWalletAddressList() {
    let params = {"walletname":currentwallet}
    $.post("/wallet/address", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            if (res.data.length > 0) {
                let mainAddress = res.data[0].address
                $("#main-address").text(mainAddress)
            } else {
                $("#main-address").text("Error：未建账号地址")
            }

            let addressTable = $("#address-list-table")
            addressTable.empty()
            for (let i = 0; i < res.data.length; i++) {
                let account = res.data[i]
                let accountTr = `<tr>
                    <td>${account.path.slice(2)}</td>
                    <td>${account.address}</td>
                    <td><button onclick="exportPrivatekey('${currentwallet}','${account.path}')">导出私钥</button></td>
                </tr>`
                addressTable.append(accountTr)
            }
        }
    })
}

let currentwallet = localStorage.getItem("currentwallet")

$(document).ready(function () {
    if (!currentwallet) {
        return
    }
    $("h1").text(currentwallet.slice(currentwallet+" 钱包"))

    let params = {"walletname":currentwallet}
    //余额
    $.post("/wallet/balance", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#balance").text(res.data.availableAmount/100000000)
            $("#unc_balance").text(res.data.lockedAmount/100000000)
        }
    })

    //地址
    updateWalletAddressList()
})