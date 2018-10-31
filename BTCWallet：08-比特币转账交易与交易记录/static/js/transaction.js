

//账号金额
function updateWalletBalance(wallet) {
    $("#balance").text("加载中...")
    
    let params = {"walletname":wallet}
    //余额
    $.post("/wallet/balance", params, function (res, status) {
        console.log(status + JSON.stringify(res))
        if (res.code == 0) {
            $("#balance").text(res.data.availableAmount/100000000)
        }
    })
}
    
$(document).ready(function () {
    let currentwallet = localStorage.getItem("currentwallet")
    
    //选择付款地址列表
    let walletList = localStorage.getItem("walletlist")
    walletList = JSON.parse(walletList)
    console.log("accountList",walletList)

    let addressSelectList = $("#transaction-send-address-select")
    for(let i = 0; walletList && i < walletList.length; i++) {
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
    
    //钱包金额和地址
    updateWalletBalance(currentwallet)

    //选择不同的钱包
    addressSelectList.change(function() {
        console.log(this.value)
        localStorage.setItem("currentwallet", this.value)
        updateWalletBalance(this.value)
    })

    //发送交易
    $("#transaction-send-form").validate({
        rules: {
            from: {required: true,},
            to: {required: true,},
            amount: {required: true,},
            password: {required: true,},
        },
        messages: {
            from: {required: "请选择转出的账号",},
            to: {required: "请输入对方账号名称",},
            amount: {required: "请输入转账的数量",},
            password: {required: "请输入该钱包的密码",},
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/transaction/send",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(res.data)
                }
            });
        }
    })
})