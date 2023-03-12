$.ajaxPrefilter(function(options){
    options.url = 'http://localhost:3007' + options.url
})