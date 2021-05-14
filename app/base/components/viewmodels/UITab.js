/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    //require('jqxtree');
    //
    //var common = require('Common'),
    //    grid = require('Grid');
    //if (!$('#jqxBaseCss')[0]) {
    //    common.loadCss([
    //        {
    //            id: 'jqxBaseCss',
    //            uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.base.css'
    //        }
    //    ]);
    //}
    return {
        init: function (id, params) {
            base = params.viewModel;
            setTimeout(function () {
                //var $JqxTree = $('#' + base.id());
                //
                //// on to 'expand', 'collapse' and 'select' events.
                //$JqxTree.on('expand', function (event) {
                //    var args = event.args;
                //    var item = $JqxTree.jqxTree('getItem', args.element);
                //    if (base.onExpand) {
                //        base.onExpand(item, args);
                //    }
                //});
                //$JqxTree.on('collapse', function (event) {
                //    var args = event.args;
                //    var item = $JqxTree.jqxTree('getItem', args.element);
                //    if (base.onCollapse) {
                //        base.onCollapse(item, args);
                //    }
                //});
                //$JqxTree.on('select', function (event) {
                //    var args = event.args;
                //    var item = $JqxTree.jqxTree('getItem', args.element);
                //    if (base.onSelect) {
                //        base.onSelect(item, args);
                //    }
                //});
            }, 100);
        }
    };
});