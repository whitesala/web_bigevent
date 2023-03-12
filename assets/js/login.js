$(function() {
    // 点击链接切换登录/切换页面
    $('#link-reg').on('click', () => {
        $('.reg-box').show()
        $('.login-box').hide()
    })
    $('#link-login').on('click', () => {
        $('.login-box').show()
        $('.reg-box').hide()
    })


    //通过layui获取form对象
    // form.verify()自定义验证规则
    let form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'], 
        repwd:(value) => {
            // 此处的value是确认密码中值
            let pwd = $('.reg-box [name = password').val()
            if(pwd !== value) return '两次密码不一致！'
        }
    })

    
    // 监听注册表单的提交事件
    $('#form-reg').submit((e) => {
        // 阻止表单默认提交事件，在验证未通过前不会提交表单信息
        e.preventDefault()
        $.ajax({
            // 每次执行$.ajax之前系统都会执行ajaxPrefilter的函数
            url:'/api/regUser',
            method: 'POST',
            // 快速获取表单中数据
            data: $('#form-reg').serialize(),
            success: (res) => {
                if(res.status !== 0) return layer.msg(res.message)
                // layui里面的方法layer.msg()弹出消息
                layer.msg('注册成功!请登录')
                // 注册成功后让其自动点击跳转到登陆界面的链接
                $('#link-login').click()
            }
        })


        // // 输入后端对应的api注册接口地址
        // const url = 'http://localhost:3007/api/regUser'
        // let paramsObj = {username: $('#form-reg [name = username]').val(),password: $('#form-reg [name = password]').val()}
        // axios.post(url,paramsObj).then((res) => {
        //     if(res.status !== 0) return console.log(res.message)
        //     console.log('注册成功！')
        // })
    })

    // 为登录注册提交事件
    $('#form-login').submit((e) => {
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method: 'POST',
            // 使用的箭头函数需要注意this指向的并非是表单，而是其父级元素document html，这里可以直接$('#form-login')或者$(event.target)
            data: $('#form-login').serialize(),
            success: (res) => {
                // layui里面的方法layer.msg()弹出消息
                if(res.status !== 0) return layer.msg(res.message)
                layer.msg('登录成功！')
                // 将登录成功后获得的token字符串保存到localStorage中
                localStorage.setItem('token',res.token)
                // 登录成功后跳转到后台主页
                location.href = '/index.html'
            }
            
        })        
    })

})

// // 输入后端对应的api注册接口地址
        // const url = 'http://localhost:3007/api/regUser'
        // let paramsObj = {username: $('#form-reg [name = username]').val(),password: $('#form-reg [name = password]').val()}
        // axios.post(url,paramsObj).then((res) => {
        //     if(res.status !== 0) return console.log(res.message)
        //     console.log('注册成功！')
        // })