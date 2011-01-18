///////////////////////////////////////////////////////////////////////////////////////////
// Nested Decimal Lists 1.0
// Version 1.0
// @requires jQuery v1.3.2
// 
// Copyright (c) 2009 Mark Ashley Bell
// Examples and docs at: http://markashleybell.com/jquery/jquery.nesteddecimallist.html
// 
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html
///////////////////////////////////////////////////////////////////////////////////////////

(function($)
{
    $.fn.nestedDecimalList = function(settings)
    {
        var config = { 'trailingPeriod': false, 'numberClass': 'nesteddecimallistnumber', 'zeroStart': false };

        if (settings) $.extend(config, settings);

        this.each(function()
        {
            var t = $(this);

            t.css({ 'list-style-type': 'none' });
            t.find('ol').css({ 'list-style-type': 'none' });

            t.find('li').each(function()
            {
                var item = $(this);
                item.css({ 'position': 'relative' });

                var parent = item.parent();

                var num = new Array();
                var o = item;

                while (o.is('li'))
                {
                    num.push((o.prevAll('li').length + ((config['zeroStart']) ? 0 : 1)));
                    o = o.parent().parent();
                }

                item.prepend('<span><span class="' + config['numberClass'] + '">' + num.reverse().join('.') + ((config['trailingPeriod']) ? '.' : '') + '</span></span>');

                var span = item.find('span:first');
                var w = span.width();

                if ((w + 10) > parseInt(item.parent().css('margin-left'))) item.parent().css('margin-left', (w + 15) + 'px');

                span.css({ 'text-align': 'right', 'position': 'absolute', 'top': item.css('padding-top'), 'left': '-' + (w + 10) + 'px' });

            });
        });

        return this;
    };

})(jQuery);