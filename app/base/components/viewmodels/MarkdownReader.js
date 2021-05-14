/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel'),
        koOperation = require('KoOperation'),
        common = require('Common'),
        showdown = require('showdown'),
        highlight = require('highlight'),
        converter = new showdown.Converter(),
        addMarkDownTab = function (i) {
            if (!($('#' + i.tabId)[0]) && $.trim(i.mdIndexPath) != '') {
                $.get(i.mdIndexPath + '?timeStemp=' + (new Date()).getTime(), function (mdString) {
                    setTimeout(function () {
                        koOperation.addBootStrapTab({
                            tabsId: i.tabsId,
                            tabId: i.tabId,
                            tabName: i.tabName,
                            tabContent: converter.makeHtml(mdString)
                        });
                        //程式高亮度處理
                        $('pre code', '#' + i.tabId).each(function (i, block) {
                            hljs.highlightBlock(block);

                            var lines = $(this).text().split('\n').length - 1;
                            var $numbering = $('<ul/>').addClass('pre-numbering');
                            $(this)
                                .addClass('has-numbering')
                                .parent()
                                .append($numbering);
                            for (i = 1; i <= lines; i++) {
                                $numbering.append($('<li/>').text(i));
                            }
                        });
                        //Table 轉換為 Bootstrap Table Style
                        $('table', '#' + i.tabId).each(function (i, block) {
                            $(this).addClass('table table-bordered table-striped table-hover table-condensed');
                        });
                        $('a', '#' + i.tabId).each(function (i, block) {
                            $(this).attr('target', '_blank');
                        });
                    }, 50);
                });
            }
            if ($('#' + i.tabId)[0]) {
                $('#' + i.tabsId + ' a[href="#' + i.tabId + '"]').tab('show');
            }
        },
        addIndexTab = function () {
            addMarkDownTab({
                mdIndexPath: base.readMePath(),
                tabsId: 'docTabs',
                tabId: 'docIndex',
                tabName: 'SMVVM簡介'
            });
        },
        base;
    converter.setOption('tables', true);

    if (!$('#highlightCss')[0]) {
        common.loadCss([
            {
                id: 'highlightCss',
                uri: SS.app.baseUrl + 'app/base/resources/css/highlight/monokai.css'
            },
            {
                id: 'highlightLineNumberCss',
                uri: SS.app.baseUrl + 'app/base/resources/css/highlightLineNumber.css'
            }
        ]);
    }


    var model = {
        init: function (id, params) {
            base = params.viewModel;
            base.treeData.subscribe(function(newValue){
                //viewModel.menuSection.jqxtree1.setData(newValue);
                viewModel.menuSection.jqxtree1.data(newValue);
            });
            base.readMePath.subscribe(function(newValue){
                addIndexTab();
            });
            addIndexTab();
        },
        menuSection: {
            type: 'section',
            jqxtree1: {
                type:'jqxTree',
                id: 'jqxtree1',
                width: '100%',
                data: [],
                itemId: 'id',
                parentId: 'parentid',
                isVisible: true,
                itemMapping: [
                    {name: 'text', map: 'label'},
                    {name: 'path', map: 'value'}
                ],
                onExpand: function (item, args) {
                    //console.dir(item);
                    //console.dir(args);
                },
                onCollapse: function (item, args) {
                    //console.dir(item);
                    //console.dir(args);
                },
                onSelect: function (item, args) {
                    //console.dir(item);
                    //console.dir(args);
                    addMarkDownTab({
                        mdIndexPath: item.value,
                        tabsId: 'docTabs',
                        tabId: 'doc' + item.id,
                        tabName: item.label
                    });
                }
            },
            tab1: {
                id: 'docTabs',
                panelCss: 'col-xs-12 col-sm-9 col-md-9'
            },
            closeTab: {
                type: 'button',
                label: '關閉頁籤',
                width: '80px',
                ui: 'btn-default btn-sm',
                //isEnable:true,
                event: {
                    click: function () {
                        koOperation.closeActiveBootStrapTab('docTabs');
                    }
                }
            },
            closeNav: {
                type: 'button',
                label: '隱藏目錄',
                width: '80px',
                ui: 'btn-default btn-sm',
                //isEnable:true,
                event: {
                    click: function () {
                        if (viewModel.menuSection.jqxtree1.isVisible()) {
                            viewModel.menuSection.jqxtree1.isVisible(false);
                            viewModel.menuSection.tab1.panelCss('col-xs-12 col-sm-12 col-md-12');
                            viewModel.menuSection.closeNav.label('顯示目錄');
                        } else {
                            viewModel.menuSection.tab1.panelCss('col-xs-12 col-sm-9 col-md-9');
                            viewModel.menuSection.jqxtree1.isVisible(true);
                            viewModel.menuSection.closeNav.label('隱藏目錄');
                        }
                    }
                }
            },
            headerClick: function () {
                addIndexTab();
            }
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    console.dir(viewModel);
    //console.dir(viewModel.menuSection.closeTab);
    return viewModel;
});