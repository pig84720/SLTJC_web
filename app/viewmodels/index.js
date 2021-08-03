define(function (require) {
    'use strict';
    var modelToViewModel = require('ModelToViewModel');

    var model = {
        id: '',
        init: function (programId, initVar, callback) {
            firebase.initializeApp({
                databaseURL: "https://sltjc-video-default-rtdb.firebaseio.com/"
              });
            var db = firebase.database();
            var currentMonth = moment().format('YYYYMM');
            db.ref("202104").orderByChild("date").on('value',function(snapshot) {
                var data = snapshot.val();
                if(!data) {
                    alert("當前月份尚無資料");
                    setGridDate([]);
                    return;
                };
                var dataAry = [];
                Object.entries(data).forEach(([key, value]) => {
                    var date = value.date.split("");
                    date.splice(4, 0, "/");
                    date.splice(7, 0, "/");
                    date = date.join("");
                    value.date = date;
                    dataAry.push(value);
                });
                setGridDate(dataAry);
            });
            
            function setGridDate(dataSource) {
                $("#k-grid").kendoGrid({
                    dataSource: {
                        data: dataSource,
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
                        field: "date",
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
                        field: "type",
                        title: "類別",
                        width: 160,
                        headerAttributes: {
                            "class": "table-header-cell",
                            style: "line-height: 50px"
                        },
                        attributes: {
                          "class": "table-cell",
                          style: "line-height: 40px; font-size: 15px;"
                        }
                    }, {
                        field: "topic",
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
                        field: "name",
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
                        template: "<div style='width: 30px; height: 30px; background-image: url(../image/338113.png); background-size: cover; cursor: pointer' onclick='$(`.iframe`).attr(`src`,`#: youtubeEmbedUrl #`); $(`.modal-vedio-player`).css(`display`,`flex`); $(`.modal-vedio-player`).modal(`show`);'></div>"
                    }]
                });
            };
            callback();
        },
        searchSection: {
            type: 'section',
            kMothSelect: {
                type: 'datepicker',
                value: '',
                isEnable: true,
                hasFocus: false,
                width: '',
                maxlength: '',
                label: '年月',
                id: '',
                cls: '',
                event: {}
            }
        }
    };

    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});