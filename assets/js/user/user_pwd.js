$(function() {
    
    let form = layui.form
    form.verify({
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6到12位,且不能出现空格'
        ],
        samePwd:function(value){
            if(value === $('[name=oldPwd]').val()) return '新旧密码不能一致'
        },
        rePwd:function(value){
            if(value !== $('[name=newPwd]').val()) return '两次输入的新密码不一致'
        },
    }) 

    // 清空按钮清空密码框
    $('#btnReset').click((e) => {
        e.preventDefault()
        $('.layui-form')[0].reset()
    })


    // 提交修改密码请求
    $('.layui-form').submit((e) => {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url:'/my/updatePwd',
            data: $('.layui-form').serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg('修改密码失败！')
                layer.msg('修改密码成功！')
                $('#btnReset').click()
            }
        })
    })
})