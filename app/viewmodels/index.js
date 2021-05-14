define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');
    var jqxgridEdit = require('jqxgrid.edit');

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            var etag = [{
                "col_01": "2020/11/27 14:58:40",
                "col_02": "國一北上364-高雄(九如、建國路)-鼎金系統(連接國10、大中路)",
                "col_03": "北上",
                "col_04": "5.1"
            }, {
                "col_01": "2020/11/27 15:02:00",
                "col_02": "國一北上359-鼎金系統(連接國10、大中路)-楠梓(鳳楠路)",
                "col_03": "北上",
                "col_04": "6.2"
            }, {
                "col_01": "2020/11/27 15:03:50",
                "col_02": "國一北上355.9-楠梓(鳳楠路)-楠梓(旗楠路)",
                "col_03": "北上",
                "col_04": "2.1"
            }, {
                "col_01": "2020/11/27 15:05:49",
                "col_02": "國一北上352.5-楠梓(旗楠路)-岡山",
                "col_03": "北上",
                "col_04": "7.0"
            }, {
                "col_01": "2020/11/27 15:09:29",
                "col_02": "國一北上346-岡山-高科",
                "col_03": "北上",
                "col_04": "8.4"
            }, {
                "col_01": "2020/11/27 15:13:09",
                "col_02": "國一北上339.8-高科-路竹",
                "col_03": "北上",
                "col_04": "4.9"
            }, {
                "col_01": "2020/11/27 15:14:09",
                "col_02": "國一北上364-高雄(九如、建國路)-鼎金系統(連接國10、大中路)",
                "col_03": "北上",
                "col_04": "5.0"
            }, {
                "col_01": "2020/11/27 14:58:40",
                "col_02": "國一北上364-高雄(九如、建國路)-鼎金系統(連接國10、大中路)",
                "col_03": "北上",
                "col_04": "5.1"
            }, {
                "col_01": "2020/11/27 15:02:00",
                "col_02": "國一北上359-鼎金系統(連接國10、大中路)-楠梓(鳳楠路)",
                "col_03": "北上",
                "col_04": "6.2"
            }, {
                "col_01": "2020/11/27 15:03:50",
                "col_02": "國一北上355.9-楠梓(鳳楠路)-楠梓(旗楠路)",
                "col_03": "北上",
                "col_04": "2.1"
            }, {
                "col_01": "2020/11/27 15:02:00",
                "col_02": "國一北上359-鼎金系統(連接國10、大中路)-楠梓(鳳楠路)",
                "col_03": "北上",
                "col_04": "6.2"
            }, {
                "col_01": "2020/11/27 15:03:50",
                "col_02": "國一北上355.9-楠梓(鳳楠路)-楠梓(旗楠路)",
                "col_03": "北上",
                "col_04": "2.1"
            }, {
                "col_01": "2020/11/27 15:05:49",
                "col_02": "國一北上352.5-楠梓(旗楠路)-岡山",
                "col_03": "北上",
                "col_04": "7.0"
            }, {
                "col_01": "2020/11/27 15:09:29",
                "col_02": "國一北上346-岡山-高科",
                "col_03": "北上",
                "col_04": "8.4"
            }, {
                "col_01": "2020/11/27 15:13:09",
                "col_02": "國一北上339.8-高科-路竹",
                "col_03": "北上",
                "col_04": "4.9"
            }, {
                "col_01": "2020/11/27 15:14:09",
                "col_02": "國一北上364-高雄(九如、建國路)-鼎金系統(連接國10、大中路)",
                "col_03": "北上",
                "col_04": "5.0"
            }, {
                "col_01": "2020/11/27 14:58:40",
                "col_02": "國一北上364-高雄(九如、建國路)-鼎金系統(連接國10、大中路)",
                "col_03": "北上",
                "col_04": "5.1"
            }, {
                "col_01": "2020/11/27 15:02:00",
                "col_02": "國一北上359-鼎金系統(連接國10、大中路)-楠梓(鳳楠路)",
                "col_03": "北上",
                "col_04": "6.2"
            }, {
                "col_01": "2020/11/27 15:03:50",
                "col_02": "國一北上355.9-楠梓(鳳楠路)-楠梓(旗楠路)",
                "col_03": "北上",
                "col_04": "2.1"
            }, {
                "col_01": "2020/11/27 15:02:00",
                "col_02": "國一北上359-鼎金系統(連接國10、大中路)-楠梓(鳳楠路)",
                "col_03": "北上",
                "col_04": "6.2"
            }, {
                "col_01": "2020/11/27 15:03:50",
                "col_02": "國一北上355.9-楠梓(鳳楠路)-楠梓(旗楠路)",
                "col_03": "北上",
                "col_04": "2.1"
            }];
            $("#k-grid-etag").kendoGrid({
                dataSource: {
                    data: [],
                    schema: {
                        model: {
                            fields: {
                                col_01: { type: "string" },
                                col_02: { type: "string" },
                                col_03: { type: "string" },
                                col_04: { type: "number" }
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
                    width: 140,
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
                    field: "col_06",
                    title: "點擊觀看",
                    width: 100,
                    headerAttributes: {
                        "class": "table-header-cell",
                        style: "line-height: 50px"
                    },
                    attributes: {
                      "class": "table-cell",
                      style: "line-height: 40px; font-size: 15px"
                    }
                }]
            });
            $('.modal-vedio-player').modal('show');
            callback();
        },
    };

    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});