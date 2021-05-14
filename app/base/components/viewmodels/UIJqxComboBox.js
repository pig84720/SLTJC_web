/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jqxcombobox');

    var common = require('Common'),
        grid = require('Grid'),
        setData = function (data, base) {
            $jqxComboBox = $('#' + base.id());
            if ($jqxComboBox[0]) {
                var source =
                {
                    datatype: "json",
                    datafields: grid.getDataFieldsFromColumns([], data),
                    localdata: data
                };

                // create data adapter.
                var dataAdapter = new $.jqx.dataAdapter(source);
                $jqxComboBox.jqxComboBox({
                    //selectedIndex: 0,
                    source: dataAdapter,
                    displayMember: base.optionsText,
                    valueMember: base.optionsValue,
                    width: base.boxWidth(),
                    height: base.boxHeight()
                });
            } else {
                setTimeout(function () {
                    setData(data, base);
                }, 50);
            }
        };
    if (!$('#jqxBaseCss')[0]) {
        common.loadCss([
            {
                id: 'jqxBaseCss',
                uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.base.css'
            }
        ]);
    }
    var selectedItem, $jqxComboBox;
    var initial = function (data, base) {
        $jqxComboBox = $('#' + base.id());
        if ($jqxComboBox[0]) {
            setData(data, base);
            $jqxComboBox.on('select', function (event) {
                var args = event.args;
                if (args != undefined) {
                    var item = event.args.item;
                    if (item != null) {
                        selectedItem = item;
                    }
                }
            });
            $('input', $jqxComboBox).on('blur', function (event) {
                $jqxComboBox = $('#' + base.id());
                $jqxComboBox.jqxComboBox({selectedIndex: $jqxComboBox.jqxComboBox('getSelectedIndex')});
                base($jqxComboBox.val());
                $jqxComboBox.jqxComboBox("close");
            });
            $jqxComboBox.on('close', function (event) {
                base.event.close(event);
            });
            $jqxComboBox.on('bindingComplete', function (event) {
                base.event.bindingComplete(event);
            });
            $jqxComboBox.on('checkChange', function (event) {
                base.event.checkChange(event);
            });
            $jqxComboBox.on('change', function (event) {
                base.event.change(event);
            });
            $jqxComboBox.on('open', function (event) {
                base.event.open(event);
            });
            $jqxComboBox.on('select', function (event) {
                base.event.select(event);
            });
            $jqxComboBox.on('unselect', function (event) {
                base.event.unselect(event);
            });
            $jqxComboBox.val(base());

        } else {
            setTimeout(function () {
                initial(data, base)
            }, 50);
        }
    };
    return {
        init: function (id, params) {
            var base = params.viewModel;
            base.options.subscribe(function (newData) {
                $jqxComboBox = $('#' + base.id());
                if ($jqxComboBox[0]) {
                    setData(newData, base);
                }
            });
            base.subscribe(function (newData) {
                $jqxComboBox = $('#' + base.id());
                if ($jqxComboBox[0]) {
                    $jqxComboBox.val(newData);
                }
            });
            base.isEnable.subscribe(function (newData) {
                $jqxComboBox = $('#' + base.id());
                if ($jqxComboBox[0]) {
                    $jqxComboBox.jqxComboBox({disabled: !newData});
                }
            });
            initial(base.options(), base);
        }
    };
});