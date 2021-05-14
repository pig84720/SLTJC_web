/**
 * Created by jerryhuang on 15/7/29.
 */
define(function(require) {
    var common = require('Common');
    if (!$('#jqueryMarqueeCss')[0]) {
        common.loadCss([{
            id: 'jqueryMarqueeCss',
            uri: SS.app.baseUrl + 'app/base/components/resources/css/jquery.marquee.css'
        }]);
    }
    return {
        init: function(id, vm) {
            //用此種require的引入方式，可以延遲引入時間
            require(['jquery.marquee'], function() {
                // console.log(vm.viewModel.id());
                $('#' + vm.viewModel.id()).marquee();
            });
            vm.viewModel.kaUrlItems.subscribe(function(newValue) {
                // console.log(newValue);
                // console.log(vm.viewModel.id());
                setTimeout(function() {
                    $('#' + vm.viewModel.id()).marquee('update');
                }, 500);
            });
        }
    };
});