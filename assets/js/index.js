$(function(){
    // 调用获取用户信息的函数
    getUserInfo()

    // 退出按钮退出登录
    $('#btnLogout').click(() => {
        // 弹出确认框提示用户
        layer.confirm('确定退出登录？',{icon: 3,title: '提示'},(index) => {
            // 清空浏览器中的token
            localStorage.removeItem('token')
            // 跳转到登录注册界面
            location.href = '/login.html'
            // 关闭confirm确认框
            layer.close(index)
        })
    })

    
})



// 获取用户基本信息的函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url: '/my/userinfo',
        success: (res) => {
            if(res.status !== 0) return layer.msg('获取用户信息失败')
            console.log(res.data)
            // 渲染用户信息
            renderUserinfo(res.data)
        }
    })
}


// 渲染用户信息
function renderUserinfo(user){
    // 获取用户名称
    let name = user.nickname || user.username
    // 设置欢迎文字
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if(user.user_pic !== null){
        // 存在自定义头像渲染用户头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 不存在渲染用户文本头像
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()  //表示拿到名字的第一个字母，name为字符串，加上[0]可以直接变为使用,toUpperCase()表示将其改为大写
        $('.text-avatar').html(first).show()
    }
}