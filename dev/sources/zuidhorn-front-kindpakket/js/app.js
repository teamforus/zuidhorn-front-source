(function($) {
    $.prototype.slowScroll = function() {
        if (this.length == 0) return;

        var slowScroll = function($root) {
            var target = $root.attr('href');

            $root.unbind('click').bind('click', function() {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 1600);
            });
        };

        for (var i = 0; i < this.length; i++) {
            new slowScroll($(this[i]));
        }
    };

    $.prototype.tabulation = function() {
        if (this.length == 0) return;

        var tabulation = function($root) {
            var $tabs = $root.find('[tabulation-tab]');
            var $panes = $root.find('[tabulation-pane]');

            $tabs.unbind('click').bind('click', function(e) {
                e.preventDefault() && e.stopPropagation();

                var wasActive = $(this).hasClass('active');

                $panes.removeClass('active');
                $tabs.removeClass('active');

                var activeIndex = $(this).attr('tabulation-tab');

                if (!wasActive) {
                    $root.find(
                        '[tabulation-pane="' + activeIndex + '"]').addClass('active');
                    $(this).addClass('active');
                }

            });

            $tabs[0].click();
        };

        for (var i = 0; i < this.length; i++) {
            new tabulation($(this[i]));
        }
    };
})(jQuery);