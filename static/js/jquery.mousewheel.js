(function($, d, w){

var method = (function(){
    if ('onmousewheel' in w) {
        return 'mw';
    } else {
        try {
            // в FF3.5 появился MozPixelScroll и одновременно с ним MouseScrollEvents
            d.createEvent("MouseScrollEvents");
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
            var scrollHeight = this.scrollHeight;
            var clientHeight = this.clientHeight;
            var scrollTop = $(this).scrollTop() + e.detail;

            if (scrollTop > 0 && scrollTop < scrollHeight - clientHeight) {
                e.preventDefault();
            }
        }, false);

        this.addEventListener('MozMousePixelScroll', function(e){
            var axis = e.axis;
            var detail = e.detail;

            if (axis === e.HORIZONTAL_AXIS) {
                $(this).scrollLeft($(this).scrollLeft() + detail);
            } else if (axis === e.VERTICAL_AXIS) {
                $(this).scrollTop($(this).scrollTop() + detail);
            }

            normolize(handle).call(this, e);
        }, false);
    },
    dms: function(data, ns, handle){
        this.addEventListener('DOMMouseScroll', normolize(handle), false);
    }
};

var add = {
    mw: function(handleObj){
        handleObj.handler = normolize(handleObj.handler)
    }
}
$.event.special.mousewheel = {
    setup: setup[method],
    teardown: function() {
        return false;
    },
    add: add[method]
}


var normolize = function(handler){
    return function(e) {
        handler.call(this, e, (0-e.detail) || e.wheelDelta);
    }
}

})(jQuery, document, window)
