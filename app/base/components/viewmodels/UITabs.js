define(function (require) {
    var common = require('Common'),
        modelToViewModel = require('ModelToViewModel');
    require('rubytabs');

    var resetBodyHeight = function () {
        var height = common.getWH('').height,
            width = common.getWH('').width,
            minusVal = 140;
        height = height - minusVal;
        $('.programTabFrame').css('height', height);
    };
    $(document).ready(function () {
        resetBodyHeight();
        window.addEventListener('resize', function () {
            resetBodyHeight();
        });
    });
    if (!$('#rubyTabsCss')[0]) {
        common.loadCss([{
            id: 'rubyTabsCss',
            uri: SS.app.baseUrl + 'app/base/components/resources/scripts/ruby/rubytabs.css'
        }]);
    }
    var model = {
        init: function (id, vm) {
            var base = vm.viewModel,
                codeRuby = {},
                initialTabs = function (vm) {
                    if ($('#' + vm.viewModel.id())[0] == null) {
                        setTimeout(function () {
                            initialTabs(vm);
                        }, 100);
                        return;
                    }
                    $('#' + vm.viewModel.id()).rubytabs({
                        "fx": "cssOne",
                        "cssOne": "moveHor",
                        "speed": 400,
                        "width": "100%",
                        "isSwipe": false
                    });
                    codeRuby = $('#' + vm.viewModel.id()).data('rubytabs');
                    base.isInitial(true);
                };
            initialTabs(vm);

            base.addTab.subscribe(function (newValue) {
                if (newValue != '') {
                    //goto dashboard
                    if (newValue == 'dashboard') {
                        console.log('goto dashboard');
                        codeRuby.goto(0);
                        base.addTab('');
                        return;
                    }

                    var tabsData = base.tabsData();
                    var index = -1,
                        tabs = $.grep(base.tabsData(), function (row, i) {
                            if (row.id == newValue.id) {
                                index = i;
                            }
                            return row.id == newValue.id;
                        });
                    if (tabs.length > 0 && index > -1) {
                        codeRuby.goto(index + 1);
                    } else {
                        tabsData.push(newValue);
                        base.tabsData(tabsData);
                        codeRuby.addSlide(newValue.content, tabsData.length);
                        codeRuby.goto(tabsData.length);
                        resetBodyHeight();
                        $('button', '.' + newValue.id + 'Title').click(function () {
                            var programId = $(this).attr('tabProgramId');
                            if ($.trim(programId) != '') {
                                removeTab(programId);
                            }
                        });
                    }
                    base.addTab('');
                    $('.rt01pagitem', '#' + vm.viewModel.id()).unbind('touchend');
                }
            });
            var removeTab = function (newValue) {
                var index = -1,
                    tabsData = base.tabsData(),
                    tabs = $.grep(tabsData, function (row, i) {
                        if (row.id == newValue) {
                            index = i;
                        }
                        return row.id == newValue;
                    });
                if (tabs.length > 0 && index > -1) {
                    codeRuby.removeSlide(index + 1);
                    tabsData.splice(index, 1);
                    base.tabsData(tabsData);
                }
                $('.rt01pagitem', '#' + vm.viewModel.id()).unbind('touchend');
            };
            base.removeTab.subscribe(function (newValue) {
                if (newValue != '') {
                    removeTab(newValue);
                    base.addTab('');
                }
            });
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});
