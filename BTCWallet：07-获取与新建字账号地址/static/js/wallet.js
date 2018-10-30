
//导出助记词
function exportMnemonic(walletName) {
    console.log(walletName)
    let password = prompt("请输入该钱包的密码")
    if (password) {
        let params = { "walletname": walletName, "password": password }
        $.post("/export/mnemonic", params, function (res, status) {
            console.log(status, JSON.stringify(res))

            if (res.code == 0) {
                alert(res.data)
            }
        })
    }
}

$(document).ready(function () {

    //创建钱包
    $("#wallet-create-form").validate({
        rules: {
            walletname: {
                required: true,
            },
            password: {
                required: true,
            },
        },
        messages: {
            walletname: {
                required: "请输入新建的钱包名称",
            },
            password: {
                required: "请输入新建的钱包密码",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/wallet/create",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                        window.location.reload()
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

    //获取钱包列表
    $.get("/wallet/list", function (res, status) {
        console.log(status, JSON.stringify(res))

        if (res.code == 0) {
            let walletTable = $("#wallet-list-table")
            localStorage.setItem("walletlist", JSON.stringify(res.data))
            res.data.forEach(wallet => {
                console.log(wallet)

                let walletTr = `<tr>
                    <td class="wallet-ele" id="${wallet}">${wallet}</td>
                    <td><button onclick="exportMnemonic('${wallet}')">导出助记词</button></td>
                </tr>`
                walletTable.append(walletTr)

                $(".wallet-ele").click(function () {
                    console.log($(this).attr("id"))
                    localStorage.setItem("currentwallet", $(this).attr("id"))
                    window.location.href = "/walletinfo.html"
                })
            });
        }
    })

    //助记词导入钱包
    $("#wallet-mnemonic-import-form").validate({
        rules: {
            walletname: {
                required: true,
            },
            password: {
                required: true,
            },
            mnemonic: {
                required: true,
            },
        },
        messages: {
            walletname: {
                required: "请输入要设置的钱包名称",
            },
            password: {
                required: "请输入钱包新密码",
            },
            mnemonic: {
                required: "请输入要导入的助记词",
            },
        },
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                url: "/import/mnemonic",
                type: "post",
                dataType: "json",
                success: function (res, status) {
                    console.log(status + JSON.stringify(res))
                    alert(JSON.stringify(res.data))
                    if (res.code == 0) {
                        window.location.reload()
                    }
                },
                error: function (res, status) {
                    console.log(status + JSON.stringify(res))
                }
            });
        }
    })

})