(function($) {
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

    moment.locale('nl');
})(jQuery);