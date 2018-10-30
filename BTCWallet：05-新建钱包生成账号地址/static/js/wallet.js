
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

})