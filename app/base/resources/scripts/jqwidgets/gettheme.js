define(function (require) {
    function getDemoTheme() {
        var theme = $.data(document.body, 'theme');
        if (theme == null) {
            theme = '';
        }
        else {
            return theme;
        }
        var themestart = window.location.toString().indexOf('?');
        if (themestart == -1) {
            return '';
        }

        var theme = 'base';//window.location.toString().substring(1 + themestart);
        //var url = "/Context/jqwidgets/styles/jqx." + theme + '.css';
        var url = SS.app.baseUrl + "app/base/resources/scripts/jqwidgets/styles/jqx." + theme + '.css';

        if (document.createStyleSheet != undefined) {
            var hasStyle = false;
            $.each(document.styleSheets, function (index, value) {
                if (value.href != undefined && value.href.indexOf(theme) != -1) {
                    hasStyle = true;
                    return false;
                }
            });
            if (!hasStyle) {
                document.createStyleSheet(url);
            }
        }
        else $(document).find('head').append('<link rel="stylesheet" href="' + url + '" media="screen" />');

        return theme;
    };
    return {
        getDemoTheme: getDemoTheme
    };
});