$(function(){
    
    let form  = layui.form
        form.verify({
            nickname: (value) => {
                if(value.length > 12) return '昵称不能超过12个字符'
            }
        })

    initUserinfo()
    //初始化用户信息 
    function initUserinfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success: (res) => {
                if(res.status !== 0) return layer.msg('获取用户资料失败')
                // 调用layui里面的form.val()快速为表单复制赋值
                form.val('form-userinfo',res.data)
            }
        })
    }

    //重置按钮重置信息
    $('#btnReset').click((e) => {
        // 阻止按钮默认事件
        e.preventDefault()
        // 初始化用户信息
        initUserinfo()
    })


    // 监听表单提交事件
    $('.layui-form').on('submit',function(e){
        // 阻止表单默认事件
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updateUserinfo',
            data:$(this).serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg('更新信息失败！')
                layer.msg('更新信息成功！')
                // 调用父界面即index里面的getUserinfo()函数。window表当前的iframe框架
                window.parent.getUserinfo()
            }
        })  
    })
})