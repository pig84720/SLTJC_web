/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var common = require('Common'),
        rs=require('jquery.royalslider');
    if (!$('#jqueryRoyalsliderCss')[0]) {
        common.loadCss([
            {
                id: 'jqueryRoyalsliderCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/css/jquery.royalslider/royalslider.css'
            }
        ]);
    }
    return {
        init: function (id, vm) {
            //用此種require的引入方式，可以延遲引入時間
            require(['jquery.marquee'],function(){
                // console.log(vm.viewModel.id());
                $('#' + vm.viewModel.id()).marquee();
            });
        }
    };
});