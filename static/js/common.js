
$(function(){
if (!window.console) {
    window.console = {log: function(){
        var i = $('.log');
        i.val([].concat(arguments).join(' ') + '\n' + i.val());
    }};
}
        return;
cur = 1;
count = 1;
    /*
    $('.wrapper').bind('DOMMouseScroll', function(e){
        //e.preventDefault();
        console.log('mw_wrapper');
            //$('.body').focus();
    });
    */
var i2 = $('.i2')[0];

console.log(i2.scrollHeight, i2.clientHeight);

var res1 = 0;
console.time('sc');
for (var i = 0; i < 10000; i++) {
    res1 = i2.scrollHeight - i2.clientHeight;
}
console.timeEnd('sc');
console.log(res1);

var res2 = 0;
console.time('$');
for (var j=0; j < 1000; j++) {
    res2 = i2.children.length * i2.children[0].offsetHeight - i2.clientHeight;
}
console.timeEnd('$');
console.log(i2.children.length , i2.children[0].offsetHeight, i2.clientHeight);

console.log(res2);

    $('.i2').bind('DOMMouseScroll', function(e){
        var scroll = $(this).scrollTop();
        if (scroll > 0 && scroll < 600) {
            e.preventDefault();
        }
    });

    $('.i2').bind('MozMousePixelScroll', function(e){
        $(this).scrollTop($(this).scrollTop() + e.detail);
    });

});

$(function(){
    $('.i2').bind('mousewheel', function(){
    });
});

$(function(){
    var zx = window.zx;
    var res = [];
    for (var k in zx) {
        res.push(k + ': ' + zx[k]);
    }
    $('#info').val(res.join('\n'));
})
