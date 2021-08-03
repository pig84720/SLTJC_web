define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');
    var jqxgridEdit = require('jqxgrid.edit');

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            var etag = [{
                "col_01": "2020/11/27",
                "col_02": "唱詩祈禱會",
                "col_03": "撒母耳記上十七章",
                "col_04": "陳俊安",
                youtubeUrl: "https://www.youtube.com/watch?v=ulPx0Gcmxcg"
            }, {
                "col_01": "2020/11/28",
                "col_02": "晚間聚會(三)",
                "col_03": "甘心奉獻",
                "col_04": "陳俊安",
                youtubeUrl: "https://www.youtube.com/watch?v=ulPx0Gcmxcg"
            }, {
                "col_01": "2020/11/29",
                "col_02": "晚間聚會(五)",
                "col_03": "向標竿直跑",
                "col_04": "陳俊安",
                youtubeUrl: "https://www.youtube.com/watch?v=ulPx0Gcmxcg"
            }];
            $("#k-grid-etag").kendoGrid({
                dataSource: {
                    data: etag,
                    schema: {
                        model: {
                            fields: {
                                col_01: { type: "string" },
                                col_02: { type: "string" },
                                col_03: { type: "string" }
                            }
                        }
                    },
                    pageSize: 10
                },
                pageable: true,
                height: 500,
                resizable: true,
                persistSelection: true,
                pageable: {
                    refresh: false,
                    pageSizes: true,
                    buttonCount: 5,
                    messages: {
                        display: "第 {0} - {1} 項，共 {2} 項",
                        input: true,
                        itemsPerPage: "個項目/每頁",
                        empty: "無資料"
                    }
                },
                columns: [{
                    field: "col_01",
                    title: "聚會日期",
                    width: 200,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; font-size: 15px"
                    }
                }, {
                    field: "col_02",
                    title: "類別",
                    width: 120,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; font-size: 15px;"
                    }
                }, {
                    field: "col_03",
                    title: "講道主題",
                    width: "auto",
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; font-size: 15px"
                    }
                }, {
                    field: "col_04",
                    title: "主領人",
                    width: 180,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; font-size: 15px"
                    }
                },
                {
                    field: "col_05",
                    title: "youtube連結",
                    width: 120,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; display: flex; justify-content: center; padding-top: 12px"
                    },
                    template: "<div style='width: 30px; height: 30px; background-image: url(../image/2875384.png); background-size: cover; cursor: pointer' onclick='window.open(`#: youtubeUrl #`)'></div>"
                },
                {
                    field: "col_06",
                    title: "點擊觀看",
                    width: 120,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; padding-left: 45px"
                    },
                    template: "<div style='width: 30px; height: 30px; background-image: url(../image/338113.png); background-size: cover; cursor: pointer' onclick='$(`.modal-vedio-player`).modal(`show`);'></div>"
                }]
            });
            $('.modal-vedio-player').modal('show');
            callback();
        },
    };

    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});