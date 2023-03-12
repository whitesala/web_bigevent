$.ajaxPrefilter(function(options){
    options.url = 'http://localhost:3007' + options.url


    // 统一为需要权限的接口设置headers的请求头
    if(options.url.indexOf('/my') !== -1){
        // 注意是headers而不是header！
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        // 挂载complete回调函数，无论ajax请求成功亦或是失败都会执行的函数
        options.complete = (res) => {
            // res.responseJSON
            console.log(res)
            if(res.responseJSON.status === 1 && res.responseJSON.message === 'user identified failed!'){
                // 强制清空token
                localStorage.removeItem('token')
                // 强制跳转到登录注册页面
                location.href = '/login.html'
            }
        }
    }
})