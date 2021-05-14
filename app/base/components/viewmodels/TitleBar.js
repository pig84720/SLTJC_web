/**
 * Created by jerryhuang on 15/7/29.
 */

define(function (require) {
    var common = require('Common');
    if (!$('#TitleBarCss')[0]) {
        common.loadCss([
            {
                id: 'TitleBarCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/css/TitleBar.css'
            }
        ]);
    }

    return {
        init: function (id) {
        }
    };
});