$(function(){
    // 实现基本裁剪效果
    var $image = $('#image')
    // 配置选项
    const options = {
        // 纵横比
        aspectRatio:1,
        // 指定预览区域
        preview:'.img-preview'
    }

// 创建裁剪区域
$image.cropper(options)


// 为上传文件绑定点击事件
$('#btnChooseImage').on('click',() => {
    $('#file').click() 
})

// 为文件选择框绑定change事件
$('#file').on('change',(e) => {
    // 获取用户选择的文件
    let fileList = e.target.files
    if(fileList.length === 0) return layer.msg('请选择图片')

    // 拿到用户选择的文件
    let file = e.target.files[0]
    // 将文件转化为路径
    let imgUrl = URL.createObjectURL(file)
    // 重新初始化裁剪区域
    // cropper('destroy')销毁旧的裁剪区域
    // attr('src',imgUrl)重新设置图片路径
    // cropper(options)重新初始化裁剪区域
    $image.cropper('destroy').attr('src',imgUrl).cropper(options)
})

// 为确定按钮绑定点击事件
$('#btnUpload').click(() => {
    // 拿到用户自己裁剪的头像
    let dataUrl = $image.cropper('getCroppedCanvas',{
        // 创建canvas画布
        width: 100,
        height: 100
    }).toDataURL('image/png')   //将Canvas画布上的内容转化为base64字符串
    console.log(dataUrl)
    // 调用接口上传头像
    $.ajax({
        method: 'POST',
        url: '/my/updatePic',
        data: {
            avatar: dataUrl
        },
        success: (res) => {
            if(res.status !== 0) return layer.msg('上传头像失败！')
            layer.msg('上传头像成功！')
            window.parent.getUserInfo()
        }

    })
})
})