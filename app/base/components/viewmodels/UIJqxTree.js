/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jqxtree');

    var common = require('Common'),
        grid = require('Grid'),
        base,
        setData=function(data){
            var source =
            {
                datatype: "json",
                datafields: grid.getDataFieldsFromColumns([], data),
                id: base.itemId(),
                localdata: data
            };

            // create data adapter.
            var dataAdapter = new $.jqx.dataAdapter(source);
            // perform Data Binding.
            dataAdapter.dataBind();
            // get the tree items. The first parameter is the item's id. The second parameter is the parent item's id. The 'items' parameter represents
            // the sub items collection name. Each jqxTree item has a 'label' property, but in the JSON data, we have a 'text' field. The last parameter
            // specifies the mapping between the 'text' and 'label' fields.
            var records = dataAdapter.getRecordsHierarchy(
                base.itemId(),
                base.parentId(),
                'items', base.itemMapping()
            );
            var $JqxTree = $('#' + base.id());

            $JqxTree.jqxTree({
                source: records,
                width: base.width()
            });
        };
    if (!$('#jqxBaseCss')[0]) {
        common.loadCss([
            {
                id: 'jqxBaseCss',
                uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.base.css'
            }
        ]);
    }
    return {
        init: function (id, params) {
            base = params.viewModel;
            base.data.subscribe(function(newData){
                setData(newData);
            });
            setTimeout(function () {
                setData(base.data());

                var $JqxTree = $('#' + base.id());
                // on to 'expand', 'collapse' and 'select' events.
                $JqxTree.on('expand', function (event) {
                    var args = event.args;
                    var item = $JqxTree.jqxTree('getItem', args.element);
                    if (base.onExpand) {
                        base.onExpand(item, args);
                    }
                });
                $JqxTree.on('collapse', function (event) {
                    var args = event.args;
                    var item = $JqxTree.jqxTree('getItem', args.element);
                    if (base.onCollapse) {
                        base.onCollapse(item, args);
                    }
                });
                $JqxTree.on('select', function (event) {
                    var args = event.args;
                    var item = $JqxTree.jqxTree('getItem', args.element);
                    if (base.onSelect) {
                        base.onSelect(item, args);
                    }
                });
            }, 100);
        }
    };
});