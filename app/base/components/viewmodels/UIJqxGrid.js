/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jqxgrid.edit');
    require('jqxglobalize.culture.ZH-TW');

    var common = require('Common'),
        grid = require('Grid'),
        i18n = require('i18n').i18n,
        gettheme = require('jqxgettheme');
    //console.log(gettheme);
    if (!$('#jqxBaseCss')[0]) {
        common.loadCss([
            {
                id: 'jqxBaseCss',
                uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.base.css'
            }
        ]);
    }
    if (!$('#jqxBootstrapCss')[0]) {
        common.loadCss([
            {
                id: 'jqxBootstrapCss',
                uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.bootstrap.css'
            }
        ]);
    }
    return {
        init: function (id, params) {
            var base = params.viewModel;
            setTimeout(function () {
                grid.initGridWithArray({
                    localdata: base.data == null ? [] : base.data,
                    targetGrid: $('#' + base.id),
                    width: base.width,
                    height: base.height,
                    selectionmode: base.selectionmode,
                    autoheight: base.autoheight,
                    editable: base.editable,
                    pageable: base.pageable,
                    localization: i18n.getLocalization(),
                    theme: gettheme.getDemoTheme(),
                    showstatusbar: base.showstatusbar,
                    sortable: base.sortable != null ? base.sortable : true,
                    showaggregates: base.showaggregates,
                    statusbarheight: base.statusbarheight,
                    datafield: grid.getDataFieldsFromColumns(base.columns, base.data),
                    columns: grid.getColumns(base.columns, base)
                });
                if (base.editable == true) {
                    grid.setGridActionWithJSON({
                        addEnable: base.addEnable,
                        delEnable: base.delEnable,
                        addCallback: base.addCallback,
                        delCallback: base.delCallback,
                        targetId: base.id,
                        defaultData: base.defaultData,
                        enterAddColumn: base.enterAddColumn,
                        focusColumn: base.focusColumn,
                        procdColumn: base.procdColumn,
                        enable: i.enable || true,
                        columns: base.columns
                    });
                }
            }, 100);
        }
    };
});