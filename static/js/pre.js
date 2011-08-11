(function(d, w){
var zx = window.zx = {};

zx.addEventListener = typeof d.addEventListener;
zx.attachEvent = typeof d.attachEvent;
zx.MutationEvent = typeof w.MutationEvent;
zx.onmousewheel = 'onmousewheel' in window;

if (d.addEventListener) {
    try {
        document.createEvent("MouseScrollEvents");
    } catch(e) {
    }
}
})(document, window);


