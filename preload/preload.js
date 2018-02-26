(function ($) {
    function Preload(imgs, handler) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.handler = $.extend({}, Preload.DEFAULTS, handler);
        this._myHandler();
    }
    Preload.DEFAULTS = {
        each: null,
        all: null
    };
    Preload.prototype._myHandler = function () {
        var imgs = this.imgs,
            handler=this.handler,
            len = imgs.length,
            count = 0;
        $.each(imgs, function () {
            var imgObj = new Image();
            imgObj.src = imgs;
            $(imgObj).on('load error', function () {
                count++;
                handler.each && handler.each(count);
                if (count >= len - 1) {
                    handler.all && handler.all();
                }
            })
        })
    };
    $.extend({
        Preload: function (imgs, handler) {
            new Preload(imgs, handler);
        }
    })
})(jQuery);