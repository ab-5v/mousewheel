(function($, d, w){

var dim = {
    client: {},
    full: {},
    scroll: {}
};
var method = (function(){
    if ('onmousewheel' in w) {
        return 'mw';
    } else {
        try {
            // в FF3.5 появился MozPixelScroll и одновременно с ним MouseScrollEvents
            var e = d.createEvent("MouseScrollEvents");
            e.initMouseEvent("DOMMouseScroll", true, true, window,
                    0, 0, 0, 0, 0, false, false, false, false, 0, null);

            var x = e.HORIZONTAL_AXIS;
            var y = e.VERTICAL_AXIS;

            dim.client[x] = 'clientWidht';
            dim.client[y] = 'clientHeight';

            dim.full[x] = 'scrollWidth';
            dim.full[y] = 'scrollHeight';

            dim.scroll[x] = 'scrollLeft';
            dim.scroll[y] = 'scrollTop';

            dim.x = x;
            dim.y = y;

            e = null;

            return 'mpx';
        } catch (ex) {
            if (d.addEventListener) {
                return 'dms';
            }
        }
    }
    return 'none';
})();

var setup = {
    mpx: function(data, ns, handle){
        this.addEventListener('DOMMouseScroll', function(e){
            var a = e.axis;
            var full = this[dim.full[a]];
            var client = this[dim.client[a]];
            var scroll = this[dim.scroll[a]] + e.detail;

            if (scroll > 0 && scroll < full - client) {
                e.preventDefault();
            }
        }, false);

        this.addEventListener('MozMousePixelScroll', function(e){
            var delta = e.detail;
            var a = e.axis;

            this[dim.scroll[a]] = this[dim.scroll[a]] + delta;

            handle.call(this, fix(e));
        }, false);
    },
    dms: function(data, ns, handle){
        this.addEventListener('DOMMouseScroll', function(e){
            handle.call(this, fix(e));
        }, false);
    }
};

var add = {};
add.mw = add.mpx = add.dms = function(handleObj){
    handleObj.handler = normolize(handleObj.handler)
}

$.event.special.mousewheel = {
    setup: setup[method],
    add: add[method]
}


var normolize = function(handler){
    return function(e) {
        var dX = 'wheelDeltaX' in e ? e.wheelDeltaX : e.originalEvent.wheelDeltaX;
        var dY = 'wheelDeltaY' in e ? e.wheelDeltaY : e.originalEvent.wheelDeltaY;

        handler.call(this, e, e.wheelDelta, dX, dY);
    }
}

var fix = function(e){
    var delta = 0 - e.detail;
    var a = e.axis;
    var e = $.event.fix(e);
    e.type = 'mousewheel';
    e.wheelDelta = delta;
    e.wheelDeltaX = a === dim.x ? delta : 0;
    e.wheelDeltaY = a === dim.y ? delta : 0;

    return e;
}
})(jQuery, document, window)
