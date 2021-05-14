/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    return {
        init: function (id, vm) {
            require('jquery.bootstrap-autohidingnavbar');
            var smartMenu = require('SmartMenu');
            smartMenu.generateMenu($('.navbar-collapse'), vm.viewModel.treeLevel);
            //用此種require的引入方式，可以延遲引入時間
            require(['jquery.smartmenus.bootstrap'],function(){
            });
            $("div .navbar-fixed-top").autoHidingNavbar();
            //$('div .navbar-fixed-top').autoHidingNavbar('hide');
        }
    };
});