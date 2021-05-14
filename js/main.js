$(function () {
    // login.html
    // ==========================================================
    $("#textbox_login_account").kendoValidator();
    $("#textbox_login_account").kendoTextBox({
        placeholder: "帳號",
    });

    $("#textbox_login_password").kendoValidator();
    $("#textbox_login_password").kendoTextBox({
        placeholder: "密碼",
    });

    // car-surrounding-inspection.html
    // ==========================================================
    $(".car-surrounding-inspection-toolbar-btn-group").kendoButtonGroup({
        index: 0
    });

    var notification_duration = 5000;

    var notification_car_surrounding_inspection = $("#notification_car_surrounding_inspection").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 64,
            left: "50%" // 另有在CSS修正transform屬性
        },
    }).data("kendoNotification");
    $("#show_notification_car_surrounding_inspection").click(function () {
        notification_car_surrounding_inspection.show(kendo.toString('照片已刪除'), "secondary");
    });

    // index.html
    // ==========================================================
    $("#kanban_datepicker").kendoTextBox({
        placeholder: "看板日期"
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    // Aside Panel (請Luke繼續改寫QQ)
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var aside_list_btn = $(".aside").find("#aside-list-btn-contract");
    var aside_panel = $(".aside").find(".aside-panel");
    var aside_panel_backdrop = $(".aside").find(".aside-panel-backdrop");
    var body = $("body");

    aside_list_btn.on("click", function () {
        aside_panel.toggleClass("open");

        if (aside_panel.hasClass("open")) {
            body.append("<div class='modal-backdrop aside-panel-backdrop fade in'></div>");
        } else {
            body.remove("<div class='modal-backdrop aside-panel-backdrop fade in'></div>");
        }
    });

    // 點擊aside_panel_backdrop後backdrop會消失，panel會關閉
    aside_panel_backdrop.on("click", function () {
        aside_panel_backdrop.hide();
        aside_panel.removeClassClass("open");
    });

    // Popup (需要另設id)
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 若 .popup-kanban-chip-vehicle-delivery 和 .popup-kanban-chip-vehicle-return 另設 id ,則此兩個 class 可刪除
    $(".popup-kanban-chip-vehicle-delivery").kendoPopup({
        anchor: $("#kanban-chip-1-1"),
        position: "top right",
        origin: "bottom right"
    });
    $(".popup-btn-of-kanban-chip-vehicle-delivery").click(function () {
        $(".popup-kanban-chip-vehicle-delivery").data("kendoPopup").toggle();
    });

    $(".popup-kanban-chip-vehicle-return").kendoPopup({
        anchor: $("#kanban-chip-3-1"),
        position: "top right",
        origin: "bottom right"
    });
    $(".popup-btn-of-kanban-chip-vehicle-return").click(function () {
        $(".popup-kanban-chip-vehicle-return").data("kendoPopup").toggle();
    });

    // Notification
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var notification_contract_voided = $("#notification_contract_voided").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 32,
            left: "50%"
        },
    }).data("kendoNotification");
    $("#show_notification_contract_voided").click(function () {
        notification_contract_voided.show(kendo.toString('合約已作廢'), "secondary");
    });

    var notification_appointment_voided = $("#notification_appointment_voided").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 32,
            left: "50%"
        },
    }).data("kendoNotification");
    $("#show_notification_appointment_voided").click(function () {
        notification_appointment_voided.show(kendo.toString('預約已作廢'), "secondary");
    });

    // vehicle-delivery.html 交車
    // ==========================================================
    // tab-details 交車明細
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_delivery_tab_1_01").kendoTextBox({
        placeholder: "預約單號",
        label: {
            content: "預約單號",
            floating: true
        },
        value: "X011-H09070057"
    });

    $("#textbox_vehicle_delivery_tab_1_02").kendoTextBox({
        placeholder: "合約編號",
        label: {
            content: "合約編號",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_1_03").kendoValidator();
    $("#textbox_vehicle_delivery_tab_1_03").kendoTextBox({
        placeholder: "身分證字號",
        label: {
            content: "身分證字號",
            floating: true
        },
        value: "A22***9527"
    });

    $("#textbox_vehicle_delivery_tab_1_04").kendoValidator();
    $("#textbox_vehicle_delivery_tab_1_04").kendoTextBox({
        placeholder: "客戶姓名",
        label: {
            content: "客戶姓名",
            floating: true
        },
        value: "陳鮮昇"
    });

    $("#textbox_vehicle_delivery_tab_1_05").kendoValidator();
    $("#textbox_vehicle_delivery_tab_1_05").kendoTextBox({
        placeholder: "手機號碼",
        label: {
            content: "手機號碼",
            floating: true
        },
        value: "0912-345678"
    });

    $("#textbox_vehicle_delivery_tab_1_06").kendoTextBox({
        placeholder: "出車專員",
        label: {
            content: "出車專員",
            floating: true
        },
        value: "王小明"
    });

    $("#datepicker_vehicle_delivery_tab_1_01").kendoValidator();
    $("#datepicker_vehicle_delivery_tab_1_01").kendoTextBox({
        placeholder: "出車日期",
        label: {
            content: "出車日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#timepicker_vehicle_delivery_tab_1_01").kendoTextBox({
        placeholder: "出車時間",
        label: {
            content: "出車時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true,
        value: "15:30"
    });

    $("#datepicker_vehicle_delivery_tab_1_02").kendoValidator();
    $("#datepicker_vehicle_delivery_tab_1_02").kendoTextBox({
        placeholder: "預還日期",
        label: {
            content: "預還日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#timepicker_vehicle_delivery_tab_1_02").kendoTextBox({
        placeholder: "預還時間",
        label: {
            content: "預還時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true,
        value: "15:30"
    });

    $("#textbox_vehicle_delivery_tab_1_07").kendoTextBox({
        placeholder: "天數",
        label: {
            content: "天數",
            floating: true
        },
        value: 1
    });

    $("#textbox_vehicle_delivery_tab_1_08").kendoValidator();
    $("#textbox_vehicle_delivery_tab_1_08").kendoTextBox({
        placeholder: "專案別",
        label: {
            content: "專案別",
            floating: true
        },
        value: "P975和雲勁夏1+1"
    });

    $("#dropdownlist_vehicle_delivery_tab_1_01, #dropdownlist_vehicle_delivery_tab_1_02, #dropdownlist_vehicle_delivery_tab_1_03, #dropdownlist_vehicle_delivery_tab_1_04").kendoDropDownList({
        height: 400
    });

    $("#textbox_vehicle_delivery_tab_1_09").kendoValidator();
    $("#textbox_vehicle_delivery_tab_1_09").kendoTextBox({
        placeholder: "車牌號碼",
        label: {
            content: "車牌號碼",
            floating: true
        },
        value: "RBJ-7990"
    });

    $("#textbox_vehicle_delivery_tab_1_18").kendoTextBox({
        placeholder: "他站還車費用",
        label: {
            content: "他站還車費用",
            floating: true
        },
        value: 100
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_delivery_tab_1_19").kendoTextBox({
        placeholder: "優惠券/回饋金",
        label: {
            content: "優惠券/回饋金",
            floating: true
        },
        value: 100
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textarea_vehicle_delivery_tab_1_01").kendoTextArea({
        label: {
            content: "交還車備註",
            floating: true
        },
        rows: 3,
        maxLength: 50,
        placeholder: "交還車備註"
    });

    $("#textbox_vehicle_delivery_tab_1_10").kendoTextBox({
        placeholder: "贈(物)品",
        label: {
            content: "贈(物)品",
            floating: true
        },
        value: "短租券"
    });

    $("#textbox_vehicle_delivery_tab_1_11").kendoTextBox({
        placeholder: "券號",
        label: {
            content: "券號",
            floating: true
        },
        value: "A19003764653"
    });

    $("#textbox_vehicle_delivery_tab_1_12").kendoTextBox({
        placeholder: "名稱",
        label: {
            content: "名稱",
            floating: true
        },
        value: "VIOS/YARIS免費租車券"
    });

    $("#textbox_vehicle_delivery_tab_1_13").kendoTextBox({
        placeholder: "金額",
        label: {
            content: "金額",
            floating: true
        },
        value: "NT$ 100"
    });

    $("#textbox_vehicle_delivery_tab_1_14").kendoTextBox({
        placeholder: "短租券",
        label: {
            content: "短租券",
            floating: true
        },
        value: "短租券"
    });

    $("#textbox_vehicle_delivery_tab_1_15").kendoTextBox({
        placeholder: "券號",
        label: {
            content: "券號",
            floating: true
        },
        value: "A1829485756"
    });

    $("#textbox_vehicle_delivery_tab_1_16").kendoTextBox({
        placeholder: "收款編號",
        label: {
            content: "收款編號",
            floating: true
        },
        value: "X011-978374"
    });

    $("#textbox_vehicle_delivery_tab_1_17").kendoTextBox({
        placeholder: "金額",
        label: {
            content: "金額",
            floating: true
        },
        value: "NT$ 200"
    });

    $("#textbox_vehicle_delivery_tab_1_20").kendoMaskedTextBox({
        mask: "0.00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "折扣",
        label: {
            content: "折扣",
            floating: true
        },
        value: "1.00"
    });

    $("#textbox_vehicle_delivery_tab_1_21").kendoTextBox({
        placeholder: "租金小計",
        label: {
            content: "租金小計",
            floating: true
        },
        value: "2,345"
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    // tab-car-surrounding-inspection 車輛外觀
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#dropdownlist_vehicle_delivery_tab_2_01").kendoDropDownList({
        height: 400
    });

    $("#textbox_vehicle_delivery_tab_2_03").kendoValidator();
    $("#textbox_vehicle_delivery_tab_2_03").kendoTextBox({
        placeholder: "出車里程*",
        label: {
            content: "出車里程*",
            floating: true
        }
    });

    $("#textarea_vehicle_delivery_tab_2_01").kendoTextArea({
        label: {
            content: "出車備註說明",
            floating: true
        },
        rows: 3,
        maxLength: 30,
        placeholder: "出車備註說明"
    });

    // tab-cost 交車費用
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#dropdownlist_vehicle_delivery_tab_4_01, #dropdownlist_vehicle_delivery_tab_4_02, #dropdownlist_vehicle_delivery_tab_4_03, #dropdownlist_vehicle_delivery_tab_4_04").kendoDropDownList({
        height: 400
    });
    $("#dropdownlist_vehicle_delivery_tab_4_02").after("<span class='k-form-error k-invalid-msg' data-for='' id='-error'>非會員不可選擇會員載具</span>");

    // 選項 disabled (出不來，請Luke繼續改寫QQ)
    $("#dropdownlist_vehicle_delivery_tab_4_04-listbox").find(".k-item:nth-child(2)").addClass("k-state-disabled");

    $("#textbox_vehicle_delivery_tab_4_01").kendoValidator();
    $("#textbox_vehicle_delivery_tab_4_01").kendoTextBox({
        placeholder: "憑證條碼",
        label: {
            content: "憑證條碼",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_4_02").kendoTextBox({
        placeholder: "愛心碼",
        label: {
            content: "愛心碼",
            floating: true
        },
        value: "0000001"
    });

    $("#textbox_vehicle_delivery_tab_4_03").kendoTextBox({
        placeholder: "統一編號",
        label: {
            content: "統一編號",
            floating: true
        },
        value: "878378467563"
    });

    $("#textbox_vehicle_delivery_tab_4_04").kendoTextBox({
        placeholder: "公司抬頭",
        label: {
            content: "公司抬頭",
            floating: true
        },
        value: "輝葉股份有限公司"
    });

    // tab-payment 付款作業
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_delivery_tab_5_01").kendoTextBox({
        placeholder: "會員密碼",
        label: {
            content: "會員密碼",
            floating: true
        }
    });

    $("#dropdownlist_vehicle_delivery_tab_5_01").kendoDropDownList({
        height: 400
    });

    $("#combobox_vehicle_delivery_tab_5_01").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {
                text: "2394-9527-2266-2883",
                value: "1"
            },
            {
                text: "卡號2",
                value: "2"
            },
            {
                text: "卡號3",
                value: "3"
            }
        ],
        filter: "contains",
        suggest: true,
        index: 0
    });

    $("#textbox_vehicle_delivery_tab_5_02").kendoValidator();
    $("#textbox_vehicle_delivery_tab_5_02").kendoMaskedTextBox({
        mask: "00/00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "有效月/年*",
        label: {
            content: "有效月/年*",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_5_03").kendoValidator();
    $("#textbox_vehicle_delivery_tab_5_03").kendoMaskedTextBox({
        mask: "000"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "背面末三碼*",
        label: {
            content: "背面末三碼*",
            floating: true
        }
    });

    // tab-contract 租賃合約 - 交車資訊
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_delivery_tab_6_01").kendoTextBox({
        placeholder: "交車專員",
        label: {
            content: "交車專員",
            floating: true
        },
        value: "王小明"
    });

    $("#textbox_vehicle_delivery_tab_6_02").kendoTextBox({
        placeholder: "廠牌／車型",
        label: {
            content: "廠牌／車型",
            floating: true
        },
        value: "TOYOTA CARMY 2.0雅致"
    });

    $("#textbox_vehicle_delivery_tab_6_03").kendoTextBox({
        placeholder: "牌照號碼",
        label: {
            content: "牌照號碼",
            floating: true
        },
        value: "RBK-9296"
    });

    $("#textbox_vehicle_delivery_tab_6_04").kendoTextBox({
        placeholder: "引擎(車身)號碼",
        label: {
            content: "引擎(車身)號碼",
            floating: true
        },
        value: "OAKI240805"
    });

    $("#textbox_vehicle_delivery_tab_6_05").kendoTextBox({
        placeholder: "顏色",
        label: {
            content: "顏色",
            floating: true
        },
        value: "銀"
    });

    $("#textbox_vehicle_delivery_tab_6_06").kendoTextBox({
        placeholder: "出車里程數",
        label: {
            content: "出車里程數",
            floating: true
        },
        value: "36,492"
    });

    $("#textbox_vehicle_delivery_tab_6_07").kendoTextBox({
        placeholder: "出車時間",
        label: {
            content: "出車時間",
            floating: true
        },
        value: "2020/12/29 15:30"
    });

    $("#textbox_vehicle_delivery_tab_6_08").kendoTextBox({
        placeholder: "預計還車地點",
        label: {
            content: "預計還車地點",
            floating: true
        },
        value: "iRent捷運後山埤站"
    });

    $("#textbox_vehicle_delivery_tab_6_09").kendoTextBox({
        placeholder: "預計還車時間",
        label: {
            content: "預計還車時間",
            floating: true
        },
        value: "2020/12/31 15:30"
    });

    $("#textbox_vehicle_delivery_tab_6_10").kendoTextBox({
        placeholder: "預計承租日數",
        label: {
            content: "預計承租日數",
            floating: true
        },
        value: "2 天"
    });

    $("#textbox_vehicle_delivery_tab_6_11").kendoTextBox({
        placeholder: "承租人姓名 / 共同承租人 1",
        label: {
            content: "承租人姓名 / 共同承租人 1",
            floating: true
        },
        value: "陳鮮昇"
    });

    $("#textbox_vehicle_delivery_tab_6_12").kendoTextBox({
        placeholder: "護照 / 身份證字號",
        label: {
            content: "護照 / 身份證字號",
            floating: true
        },
        value: "A123456789"
    });

    $("#textbox_vehicle_delivery_tab_6_13").kendoTextBox({
        placeholder: "出生日期",
        label: {
            content: "出生日期",
            floating: true
        },
        value: "1990/03/23"
    });

    $("#textbox_vehicle_delivery_tab_6_14").kendoTextBox({
        placeholder: "出生地 / 籍貫",
        label: {
            content: "出生地 / 籍貫",
            floating: true
        },
        value: "新北市"
    });

    $("#textbox_vehicle_delivery_tab_6_15").kendoTextBox({
        placeholder: "承租人聯絡電話",
        label: {
            content: "承租人聯絡電話",
            floating: true
        },
        value: "02-12345678"
    });

    $("#textbox_vehicle_delivery_tab_6_16").kendoTextBox({
        placeholder: "行動電話",
        label: {
            content: "行動電話",
            floating: true
        },
        value: "0912-345678"
    });

    $("#textbox_vehicle_delivery_tab_6_17").kendoTextBox({
        placeholder: "承租人聯絡地址",
        label: {
            content: "承租人聯絡地址",
            floating: true
        },
        value: "台北市中正區100號6樓"
    });

    $("#textbox_vehicle_delivery_tab_6_18").kendoTextBox({
        placeholder: "承租人服務單位名稱",
        label: {
            content: "承租人服務單位名稱",
            floating: true
        },
        value: "和雲行動服務股份有限公司"
    });

    $("#textbox_vehicle_delivery_tab_6_19").kendoTextBox({
        placeholder: "單位電話",
        label: {
            content: "單位電話",
            floating: true
        },
        value: "02-23456789"
    });

    $("#textbox_vehicle_delivery_tab_6_20").kendoTextBox({
        placeholder: "行業別",
        label: {
            content: "行業別",
            floating: true
        },
        value: "汽車租賃業"
    });

    $("#textbox_vehicle_delivery_tab_6_21").kendoTextBox({
        placeholder: "承租人服務單位地址",
        label: {
            content: "承租人服務單位地址",
            floating: true
        },
        value: "台北市中山區松江路433號4樓"
    });

    $("#textbox_vehicle_delivery_tab_6_22").kendoTextBox({
        placeholder: "緊急聯絡人",
        label: {
            content: "緊急聯絡人",
            floating: true
        },
        value: "李曉潔"
    });

    $("#textbox_vehicle_delivery_tab_6_23").kendoTextBox({
        placeholder: "與承租人關係",
        label: {
            content: "與承租人關係",
            floating: true
        },
        value: "父母(岳)"
    });

    $("#textbox_vehicle_delivery_tab_6_24").kendoTextBox({
        placeholder: "聯絡電話",
        label: {
            content: "聯絡電話",
            floating: true
        },
        value: "0934-567891"
    });

    $("#textbox_vehicle_delivery_tab_6_25").kendoTextBox({
        placeholder: "其他駕駛人姓名",
        label: {
            content: "其他駕駛人姓名",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_6_26").kendoTextBox({
        placeholder: "護照 / 身份證字號",
        label: {
            content: "護照 / 身份證字號",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_6_27").kendoTextBox({
        placeholder: "聯絡電話",
        label: {
            content: "聯絡電話",
            floating: true
        }
    });

    $("#textbox_vehicle_delivery_tab_6_28").kendoTextBox({
        placeholder: "日租金",
        label: {
            content: "日租金",
            floating: true
        },
        value: "NT$ 3,600"
    });

    $("#textbox_vehicle_delivery_tab_6_29").kendoTextBox({
        placeholder: "租金小計",
        label: {
            content: "租金小計",
            floating: true
        },
        value: "NT$ 7,200"
    });

    $("#textbox_vehicle_delivery_tab_6_30").kendoTextBox({
        placeholder: "其他費用",
        label: {
            content: "其他費用",
            floating: true
        },
        value: "NT$ 500"
    });

    $("#textbox_vehicle_delivery_tab_6_31").kendoTextBox({
        placeholder: "費用總計",
        label: {
            content: "費用總計",
            floating: true
        },
        value: "NT$ 7,700"
    });

    $("#textarea_vehicle_delivery_tab_6_01").kendoTextArea({
        label: {
            content: "備註欄",
            floating: true
        },
        rows: 3,
        maxLength: 50,
        placeholder: "備註欄",
        value: "禁寵物\n禁菸車"
    });

    $("#textarea_vehicle_delivery_tab_6_02").kendoTextArea({
        label: {
            content: "客戶簽名",
            floating: true
        },
        rows: 3,
        maxLength: 0,
        value: "true"
    }).addClass("k-input--color-transparent");

    // vehicle-return.html 還車
    // ==========================================================
    // tab-details 還車明細
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_return_tab_1_01").kendoTextBox({
        placeholder: "合約編號",
        label: {
            content: "合約編號",
            floating: true
        },
        value: "X011-09070057"
    });

    $("#textbox_vehicle_return_tab_1_02").kendoTextBox({
        placeholder: "身分證字號",
        label: {
            content: "身分證字號",
            floating: true
        },
        value: "A22***9527"
    });

    $("#textbox_vehicle_return_tab_1_03").kendoTextBox({
        placeholder: "客戶姓名",
        label: {
            content: "客戶姓名",
            floating: true
        },
        value: "陳鮮昇"
    });

    $("#textbox_vehicle_return_tab_1_04").kendoTextBox({
        placeholder: "手機號碼",
        label: {
            content: "手機號碼",
            floating: true
        },
        value: "0912-345678"
    });

    $("#textbox_vehicle_return_tab_1_05").kendoTextBox({
        placeholder: "出車專員",
        label: {
            content: "出車專員",
            floating: true
        },
        value: "王小明"
    });

    $("#textbox_vehicle_return_tab_1_06").kendoTextBox({
        placeholder: "出車日期",
        label: {
            content: "出車日期",
            floating: true
        },
        value: "2020/12/30"
    });

    $("#textbox_vehicle_return_tab_1_07").kendoTextBox({
        placeholder: "出車時間",
        label: {
            content: "出車時間",
            floating: true
        },
        value: "15:30"
    });

    $("#textbox_vehicle_return_tab_1_08").kendoTextBox({
        placeholder: "預還日期",
        label: {
            content: "預還日期",
            floating: true
        },
        value: "2020/12/30"
    });

    $("#textbox_vehicle_return_tab_1_09").kendoTextBox({
        placeholder: "預還時間",
        label: {
            content: "預還時間",
            floating: true
        },
        value: "15:30"
    });

    $("#textbox_vehicle_return_tab_1_10").kendoTextBox({
        placeholder: "天數",
        label: {
            content: "天數",
            floating: true
        },
        value: 1
    });

    $("#textbox_vehicle_return_tab_1_11").kendoTextBox({
        placeholder: "專案別",
        label: {
            content: "專案別",
            floating: true
        },
        value: "P975和雲勁夏1+1"
    });

    $("#textbox_vehicle_return_tab_1_12").kendoTextBox({
        placeholder: "預還庫位",
        label: {
            content: "預還庫位",
            floating: true
        },
        value: "台中太平站"
    });

    $("#textbox_vehicle_return_tab_1_13").kendoTextBox({
        placeholder: "車型",
        label: {
            content: "車型",
            floating: true
        },
        value: "ALTIS 1.8雅緻"
    });

    $("#textbox_vehicle_return_tab_1_14").kendoTextBox({
        placeholder: "車牌號碼",
        label: {
            content: "車牌號碼",
            floating: true
        },
        value: "RBJ-7990"
    });

    $("#textbox_vehicle_return_tab_1_30").kendoTextBox({
        placeholder: "他站還車費用",
        label: {
            content: "他站還車費用",
            floating: true
        },
        value: 100
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_1_31").kendoTextBox({
        placeholder: "優惠券/回饋金",
        label: {
            content: "優惠券/回饋金",
            floating: true
        },
        value: 100
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textarea_vehicle_return_tab_1_01").kendoTextArea({
        label: {
            content: "交還車備註",
            floating: true
        },
        rows: 3,
        maxLength: 50,
        placeholder: "交還車備註"
    });

    $("#datepicker_vehicle_return_tab_1_01").kendoValidator();
    $("#datepicker_vehicle_return_tab_1_01").kendoTextBox({
        placeholder: "實還日期",
        label: {
            content: "實還日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#timepicker_vehicle_return_tab_1_01").kendoTextBox({
        placeholder: "實還時間",
        label: {
            content: "實還時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true,
        value: "15:30"
    });

    $("#textbox_vehicle_return_tab_1_15").kendoTextBox({
        placeholder: "實還天數",
        label: {
            content: "實還天數",
            floating: true
        },
        value: 1
    });

    $("#dropdownlist_vehicle_return_tab_1_01").kendoDropDownList({
        height: 400
    });

    $("#textbox_vehicle_return_tab_1_16").kendoTextBox({
        placeholder: "還車里程",
        label: {
            content: "還車里程",
            floating: true
        },
        value: 100
    });

    $("#textbox_vehicle_return_tab_1_17").kendoTextBox({
        placeholder: "逾時時數",
        label: {
            content: "逾時時數",
            floating: true
        },
        value: 1
    });

    $("#textbox_vehicle_return_tab_1_18").kendoTextBox({
        placeholder: "逾時租金",
        label: {
            content: "逾時租金",
            floating: true
        },
        value: 180
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_1_19").kendoTextBox({
        placeholder: "還車專員",
        label: {
            content: "還車專員",
            floating: true
        },
        value: "王小明"
    });

    $("#textbox_vehicle_return_tab_1_20").kendoTextBox({
        placeholder: "贈(物)品",
        label: {
            content: "贈(物)品",
            floating: true
        },
        value: "短租券"
    });

    $("#textbox_vehicle_return_tab_1_21").kendoTextBox({
        placeholder: "券號",
        label: {
            content: "券號",
            floating: true
        },
        value: "A19003764653"
    });

    $("#textbox_vehicle_return_tab_1_22").kendoTextBox({
        placeholder: "名稱",
        label: {
            content: "名稱",
            floating: true
        },
        value: "VIOS/YARIS免費租車券"
    });

    $("#textbox_vehicle_return_tab_1_23").kendoTextBox({
        placeholder: "設備租借",
        label: {
            content: "設備租借",
            floating: true
        },
        value: "電動滑板車"
    });

    $("#textbox_vehicle_return_tab_1_24").kendoTextBox({
        placeholder: "編號",
        label: {
            content: "編號",
            floating: true
        },
        value: "D495763"
    });

    $("#textbox_vehicle_return_tab_1_25").kendoTextBox({
        placeholder: "金額",
        label: {
            content: "金額",
            floating: true
        },
        value: "NT$ 100"
    });

    $("#textbox_vehicle_return_tab_1_26").kendoTextBox({
        placeholder: "短租券",
        label: {
            content: "短租券",
            floating: true
        },
        value: "短租券"
    });

    $("#textbox_vehicle_return_tab_1_27").kendoTextBox({
        placeholder: "券號",
        label: {
            content: "券號",
            floating: true
        },
        value: "A1829485756"
    });

    $("#textbox_vehicle_return_tab_1_28").kendoTextBox({
        placeholder: "收款編號",
        label: {
            content: "收款編號",
            floating: true
        },
        value: "X011-978374"
    });

    $("#textbox_vehicle_return_tab_1_29").kendoTextBox({
        placeholder: "金額",
        label: {
            content: "金額",
            floating: true
        },
        value: "NT$ 200"
    });

    $("#textbox_vehicle_return_tab_1_32").kendoMaskedTextBox({
        mask: "0.00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "折扣",
        label: {
            content: "折扣",
            floating: true
        },
        value: "1.00"
    }).parent().removeClass("k-state-disabled");

    $("#textbox_vehicle_return_tab_1_33").kendoTextBox({
        placeholder: "租金小計",
        label: {
            content: "租金小計",
            floating: true
        },
        value: "2,345"
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    // tab-car-surrounding-inspection 車輛外觀
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_return_tab_2_01").kendoTextBox({
        placeholder: "出車油量*",
        label: {
            content: "出車油量*",
            floating: true
        },
        value: "E"
    });

    $("#textbox_vehicle_return_tab_2_02").kendoTextBox({
        placeholder: "出車里程*",
        label: {
            content: "出車里程*",
            floating: true
        },
        value: 127
    });

    $("#dropdownlist_vehicle_return_tab_2_01").kendoDropDownList({
        height: 400
    });

    $("#textbox_vehicle_return_tab_2_03").kendoValidator();
    $("#textbox_vehicle_return_tab_2_03").kendoTextBox({
        placeholder: "還車里程*",
        label: {
            content: "還車里程*",
            floating: true
        }
    });

    $("#textarea_vehicle_return_tab_2_01").kendoTextArea({
        label: {
            content: "出車備註說明",
            floating: true
        },
        rows: 3,
        maxLength: 30,
        placeholder: "出車備註說明"
    });

    // tab-cost 還車費用
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_return_tab_3_01").kendoTextBox({
        placeholder: "逾時租金",
        label: {
            content: "逾時租金",
            floating: true
        },
        value: 800
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_02").kendoTextBox({
        placeholder: "設備歸還費用",
        label: {
            content: "設備歸還費用",
            floating: true
        },
        value: 150
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_03").kendoTextBox({
        placeholder: "營業損失",
        label: {
            content: "營業損失",
            floating: true
        },
        value: 1000
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_04").kendoTextBox({
        placeholder: "油料補貼",
        label: {
            content: "油料補貼",
            floating: true
        },
        value: 700
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_05").kendoTextBox({
        placeholder: "車損自負額",
        label: {
            content: "車損自負額",
            floating: true
        },
        value: 1000
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_06").kendoTextBox({
        placeholder: "遠通eTag通行費",
        label: {
            content: "遠通eTag通行費",
            floating: true
        },
        value: 104
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textbox_vehicle_return_tab_3_07").kendoTextBox({
        placeholder: "還車費用",
        label: {
            content: "還車費用",
            floating: true
        },
        value: 3672
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    var notification_etag_sent = $("#notification_etag_sent").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 32,
            left: "50%"
        },
    }).data("kendoNotification");
    $("#show_notification_etag_sent").click(function () {
        notification_etag_sent.show(kendo.toString('eTag過站明細已發送'), "secondary");
    });

    // tab-payment 付款作業
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_return_tab_5_01").kendoTextBox({
        placeholder: "會員密碼",
        label: {
            content: "會員密碼",
            floating: true
        }
    });

    $("#dropdownlist_vehicle_return_tab_5_01").kendoDropDownList({
        height: 400
    });

    $("#combobox_vehicle_return_tab_5_01").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {
                text: "2394-9527-2266-2883",
                value: "1"
            },
            {
                text: "卡號2",
                value: "2"
            },
            {
                text: "卡號3",
                value: "3"
            }
        ],
        filter: "contains",
        suggest: true,
        index: 0
    });

    $("#textbox_vehicle_return_tab_5_02").kendoValidator();
    $("#textbox_vehicle_return_tab_5_02").kendoMaskedTextBox({
        mask: "00/00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "有效月/年*",
        label: {
            content: "有效月/年*",
            floating: true
        }
    });

    $("#textbox_vehicle_return_tab_5_03").kendoValidator();
    $("#textbox_vehicle_return_tab_5_03").kendoMaskedTextBox({
        mask: "000"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "背面末三碼*",
        label: {
            content: "背面末三碼*",
            floating: true
        }
    });

    // tab-contract 租賃合約 - 還車資訊
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_vehicle_return_tab_6_01").kendoTextBox({
        placeholder: "收車專員",
        label: {
            content: "收車專員",
            floating: true
        },
        value: "王小明"
    });

    $("#textbox_vehicle_return_tab_6_02").kendoTextBox({
        placeholder: "出車里程數",
        label: {
            content: "出車里程數",
            floating: true
        },
        value: "36,492"
    });

    $("#textbox_vehicle_return_tab_6_03").kendoTextBox({
        placeholder: "出車時間",
        label: {
            content: "出車時間",
            floating: true
        },
        value: "2020/12/29 15:30"
    });

    $("#textbox_vehicle_return_tab_6_04").kendoTextBox({
        placeholder: "還車里程數",
        label: {
            content: "還車里程數",
            floating: true
        },
        value: "36,520"
    });

    $("#textbox_vehicle_return_tab_6_05").kendoTextBox({
        placeholder: "還車時間",
        label: {
            content: "還車時間",
            floating: true
        },
        value: "2020/12/31 15:30"
    });

    $("#textbox_vehicle_return_tab_6_06").kendoTextBox({
        placeholder: "總使用里程",
        label: {
            content: "總使用里程",
            floating: true
        },
        value: "28 km"
    });

    $("#textbox_vehicle_return_tab_6_07").kendoTextBox({
        placeholder: "實際總租用日數",
        label: {
            content: "實際總租用日數",
            floating: true
        },
        value: "2 天"
    });

    $("#textbox_vehicle_return_tab_6_08").kendoTextBox({
        placeholder: "逾時時數",
        label: {
            content: "逾時時數",
            floating: true
        },
        value: "1 hr"
    });

    $("#textbox_vehicle_return_tab_6_09").kendoTextBox({
        placeholder: "每公里里程費",
        label: {
            content: "每公里里程費",
            floating: true
        },
        value: "NT$ 2.9"
    });

    $("#textbox_vehicle_return_tab_6_10").kendoTextBox({
        placeholder: "里程使用費",
        label: {
            content: "里程使用費",
            floating: true
        },
        value: "NT$ 58"
    });

    $("#textbox_vehicle_return_tab_6_11").kendoTextBox({
        placeholder: "逾時費率",
        label: {
            content: "逾時費率",
            floating: true
        }
    });

    $("#textbox_vehicle_return_tab_6_12").kendoTextBox({
        placeholder: "逾時租金",
        label: {
            content: "逾時租金",
            floating: true
        },
        value: "NT$ 252"
    });

    $("#textbox_vehicle_return_tab_6_13").kendoTextBox({
        placeholder: "E-Tag通行費",
        label: {
            content: "E-Tag通行費",
            floating: true
        },
        value: "NT$ 100"
    });

    $("#dropdownlist_vehicle_return_tab_6_01").kendoDropDownList({
        height: 400
    });

    $("#textbox_vehicle_return_tab_6_14").kendoTextBox({
        placeholder: "自負額",
        label: {
            content: "自負額",
            floating: true
        },
        value: "NT$ 100"
    });

    $("#textbox_vehicle_return_tab_6_15").kendoTextBox({
        placeholder: "營業損失",
        label: {
            content: "營業損失",
            floating: true
        },
        value: "NT$ 100"
    });

    $("#textbox_vehicle_return_tab_6_16").kendoTextBox({
        placeholder: "說明",
        label: {
            content: "說明",
            floating: true
        }
    });

    $("#textarea_vehicle_return_tab_6_01").kendoTextArea({
        label: {
            content: "承租人還車確認簽名",
            floating: true
        },
        rows: 3,
        maxLength: 0,
        value: "true"
    }).addClass("k-input--color-transparent");

    // appointment.html 預約作業
    // ==========================================================
    $("#textbox_appointment_01").kendoTextBox({
        placeholder: "預約單號",
        label: {
            content: "預約單號",
            floating: true
        },
        value: "X011-H09070057"
    });

    $("#textbox_appointment_02").kendoValidator();
    $("#textbox_appointment_02").kendoTextBox({
        placeholder: "身分證字號",
        label: {
            content: "身分證字號",
            floating: true
        }
    });

    $("#textbox_appointment_03").kendoValidator();
    $("#textbox_appointment_03").kendoTextBox({
        placeholder: "客戶姓名",
        label: {
            content: "客戶姓名",
            floating: true
        }
    });

    $("#textbox_appointment_04").kendoValidator();
    $("#textbox_appointment_04").kendoTextBox({
        placeholder: "手機號碼",
        label: {
            content: "手機號碼",
            floating: true
        }
    });

    $("#datepicker_appointment_01").kendoValidator();
    $("#datepicker_appointment_01").kendoTextBox({
        placeholder: "出車日期",
        label: {
            content: "出車日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#timepicker_appointment_01").kendoTextBox({
        placeholder: "出車時間",
        label: {
            content: "出車時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true,
        value: "15:30"
    });

    $("#datepicker_appointment_02").kendoValidator();
    $("#datepicker_appointment_02").kendoTextBox({
        placeholder: "預還日期",
        label: {
            content: "預還日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#timepicker_appointment_02").kendoTextBox({
        placeholder: "預還時間",
        label: {
            content: "預還時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true,
        value: "15:30"
    });

    $("#textbox_appointment_05").kendoTextBox({
        placeholder: "天數",
        label: {
            content: "天數",
            floating: true
        },
        value: 1
    });

    $("#textbox_appointment_06").kendoValidator();
    $("#textbox_appointment_06").kendoTextBox({
        placeholder: "專案別",
        label: {
            content: "專案別",
            floating: true
        }
    });

    $("#dropdownlist_appointment_01, #dropdownlist_appointment_02").kendoDropDownList({
        height: 400
    });

    $("#textbox_appointment_07").kendoValidator();
    $("#textbox_appointment_07").kendoTextBox({
        placeholder: "車牌號碼",
        label: {
            content: "車牌號碼",
            floating: true
        }
    });

    $("#textbox_appointment_08").kendoTextBox({
        placeholder: "他站還車費用",
        label: {
            content: "他站還車費用",
            floating: true
        }
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    $("#textarea_appointment_01").kendoTextArea({
        label: {
            content: "交還車備註",
            floating: true
        },
        rows: 3,
        maxLength: 50,
        placeholder: "交還車備註"
    });

    $("#textbox_appointment_09").kendoMaskedTextBox({
        mask: "0.00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "折扣",
        label: {
            content: "折扣",
            floating: true
        },
        value: "1.00"
    });

    $("#textbox_appointment_10").kendoTextBox({
        placeholder: "租金小計",
        label: {
            content: "租金小計",
            floating: true
        },
        value: "0"
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    // customer-info.html 客戶資料
    // ==========================================================
    // tab-info 客戶資料
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox_customer_info_tab_1_01").kendoValidator();
    $("#textbox_customer_info_tab_1_01").kendoTextBox({
        placeholder: "身分證字號*",
        label: {
            content: "身分證字號*",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_02").kendoValidator();
    $("#textbox_customer_info_tab_1_02").kendoTextBox({
        placeholder: "客戶姓名*",
        label: {
            content: "客戶姓名*",
            floating: true
        },
        value: "陳鮮昇"
    });

    $("#textbox_customer_info_tab_1_03").kendoValidator();
    $("#textbox_customer_info_tab_1_03").kendoTextBox({
        placeholder: "手機號碼*",
        label: {
            content: "手機號碼*",
            floating: true
        },
        value: "0912-345678"
    });

    $("#dropdownlist_customer_info_tab_1_01, #dropdownlist_customer_info_tab_1_02, #dropdownlist_customer_info_tab_1_03, #dropdownlist_customer_info_tab_1_04, #dropdownlist_customer_info_tab_1_05, #dropdownlist_customer_info_tab_1_06").kendoDropDownList({
        height: 400
    });

    $("#datepicker_customer_info_tab_1_01").kendoValidator();
    $("#datepicker_customer_info_tab_1_01").kendoTextBox({
        placeholder: "出生日期*",
        label: {
            content: "出生日期*",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd"
    });

    $("#textbox_customer_info_tab_1_04").kendoTextBox({
        placeholder: "聯絡電話",
        label: {
            content: "聯絡電話",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_05").kendoTextBox({
        placeholder: "聯絡電話",
        label: {
            content: "",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_06").kendoTextBox({
        placeholder: "分機",
        label: {
            content: "分機",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_07").kendoTextBox({
        placeholder: "電子郵件",
        label: {
            content: "電子郵件",
            floating: true
        },
        value: "weoru@mail.searching-service.com"
    });

    $("#textbox_customer_info_tab_1_08, #textbox_customer_info_tab_1_10").kendoTextBox({
        placeholder: "郵遞區號",
        label: {
            content: "郵遞區號",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_09, #textbox_customer_info_tab_1_11").kendoValidator();
    $("#textbox_customer_info_tab_1_09, #textbox_customer_info_tab_1_11").kendoTextBox({
        placeholder: "詳細地址*",
        label: {
            content: "詳細地址*",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_12").kendoTextBox({
        placeholder: "緊急聯絡人姓名",
        label: {
            content: "緊急聯絡人姓名",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_13").kendoTextBox({
        placeholder: "緊急聯絡人電話",
        label: {
            content: "緊急聯絡人電話",
            floating: true
        }
    });

    $("#textbox_customer_info_tab_1_14").kendoTextBox({
        placeholder: "備註",
        label: {
            content: "備註",
            floating: true
        }
    });

    // tab-characteristics 客戶特質
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#grid_customer_info_tab_2_02").kendoGrid({
        //        sortable: true
    });

    // tab-personal-data-authorization 個資同意
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textarea_customer_info_tab_3_01").kendoTextArea({
        label: {
            content: "客戶簽名",
            floating: true
        },
        rows: 3,
        maxLength: 0,
        value: "true"
    }).addClass("k-input--color-transparent");

    // tab-certificate 證件上傳
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#dropdownlist_customer_info_tab_4_01").kendoDropDownList();

    $("#datepicker_customer_info_tab_4_01").kendoValidator();
    $("#datepicker_customer_info_tab_4_01").kendoTextBox({
        placeholder: "有效期限",
        label: {
            content: "有效期限",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd"
    });

    // Popup (需要另設id)
    $(".popup-certificate-card").kendoPopup({
        anchor: $(".certificate-card-header"),
        position: "top right",
        origin: "bottom right"
    });
    $(".popup-btn-of-certificate-card").click(function () {
        $(".popup-certificate-card").data("kendoPopup").toggle();
    });

    // Notification
    var notification_delete_certificate = $("#notification_delete_certificate").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 32,
            left: "50%"
        },
    }).data("kendoNotification");
    $("#show_notification_delete_certificate").click(function () {
        notification_delete_certificate.show(kendo.toString('照片已刪除'), "secondary");
    });

    // etag.html 遠通eTag通行費明細
    // ==========================================================
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
            data: etag,
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
        height: 400,
        sortable: true,
        // reorderable: true,
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
            title: "過站日期時間",
            width: 224
        }, {
            field: "col_02",
            title: "門架名稱",
            width: "auto"
        }, {
            field: "col_03",
            title: "方向",
            width: 80
        }, {
            field: "col_04",
            title: "通行費",
            width: 104
        }]
    });

    // global
    // ==========================================================
    $(".progress-nav-tabs").kendoMenu({
        scrollable: true
    });

    $("#tabstrip-bottom").kendoTabStrip({
        tabPosition: "bottom",
        animation: {
            open: {
                effects: "fadeIn"
            }
        }
    });

    $(".popup-avatar").kendoPopup({
        anchor: $(".popup-btn-of-avatar"),
        position: "top right",
        origin: "bottom right"
    });
    $(".popup-btn-of-avatar").click(function () {
        $(".popup-avatar").data("kendoPopup").toggle();
    });

    var notification_data_saved = $("#notification_data_saved").kendoNotification({
        autoHideAfter: notification_duration,
        position: {
            bottom: 32,
            left: "50%"
        },
    }).data("kendoNotification");
    $("#show_notification_data_saved").click(function () {
        notification_data_saved.show(kendo.toString('資料已儲存'), "secondary");
    });

    // 客製鍵盤
    // ----------------------------------------------------------
    // 英數鍵盤
    $('#aside-input-customers, aside-input-appointments, aside-input-contracts').focus(function () {
        $('.Eng-Num-keyboard-container').addClass('open');
    }).blur(function () {
        $('.Eng-Num-keyboard-container').removeClass('open');
    });
    // 數字鍵盤
    $('#textbox_vehicle_delivery_tab_2_03, #textbox_vehicle_return_tab_2_03').focus(function () {
        $('.Num-keyboard-container').addClass('open');
    }).blur(function () {
        $('.Num-keyboard-container').removeClass('open');
    });


    // _components.html
    // ==========================================================
    // PanelBar
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#panelbar").kendoPanelBar({
        expandMode: "single" // 手風琴
    });

    // Popup
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    //    $("#more-option-popup").kendoPopup({
    //        anchor: $("#more-option-btn")
    //    });
    //    $("#more-option-btn").click(function () {
    //        $("#more-option-popup").data("kendoPopup").toggle();
    //    });

    // Calendar
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#calendar").kendoCalendar();

    // TextBox
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#textbox").kendoTextBox({
        placeholder: "帳號",
    });

    $("#textbox_with_validator").kendoValidator();
    $("#textbox_with_validator").kendoTextBox({
        placeholder: "帳號",
    });

    $("#textbox_with_floating_label").kendoTextBox({
        placeholder: "出車里程*",
        label: {
            content: "出車里程*",
            floating: true
        }
    });

    $("#textbox_with_floating_label_2").kendoTextBox({
        placeholder: "自己加內部按鈕",
        label: {
            content: "自己加內部按鈕",
            floating: true
        },
        value: "自己加內部按鈕"
    });

    $("#textbox_with_floating_label_3").kendoMaskedTextBox({
        mask: "00:00"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "客製時間選取器",
        label: {
            content: "客製時間選取器",
            floating: true
        },
        // value: "00:00"
    });
    $('.clockpicker').clockpicker();

    $("#textbox_with_floating_label_and_validator").kendoValidator();
    $("#textbox_with_floating_label_and_validator").kendoTextBox({
        placeholder: "出車里程*",
        label: {
            content: "出車里程*",
            floating: true
        },
        value: 127
    });

    $("#k-textbox-search").kendoTextBox({
        placeholder: "輸入身分證或手機號碼",
    }).removeClass("k-textbox-search");

    $("#textbox_search_customer").kendoTextBox({
        placeholder: "輸入身分證或手機號碼",
    }).removeClass("k-textbox-search");

    $("#textbox_search_project").kendoTextBox({
        placeholder: "輸入租賃類別或專案名稱",
    }).removeClass("k-textbox-search");

    $("#textbox_search_vehicle").kendoTextBox({
        placeholder: "輸入車牌號碼",
    }).removeClass("k-textbox-search");

    $("#textbox_search_love_code").kendoTextBox({
        placeholder: "輸入愛心碼、單位名稱或統一編號",
    }).removeClass("k-textbox-search");

    // 有值又focus時要加清除按鈕
    //    $(".k-textbox").append("<span unselectable='on' class='k-icon k-clear-value k-i-close' title='clear' role='button' tabindex='-1'></span>");

    // MaskedTextBox
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#phone_number").kendoValidator();
    $("#phone_number").kendoMaskedTextBox({
        mask: "02-0000-0000"
    }).removeClass("k-textbox").kendoTextBox({
        placeholder: "電話號碼",
        label: {
            content: "電話號碼",
            floating: true
        }
    });

    // NumericTextBox
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#price").kendoTextBox({
        placeholder: "價格",
        label: {
            content: "價格",
            floating: true
        },
        value: "100"
    }).kendoNumericTextBox({
        format: "NT$ #"
    }).siblings(".k-select").hide();

    // TextArea
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#invitation").kendoTextArea({
        label: {
            content: "交還車備註",
            floating: true
        },
        rows: 3,
        maxLength: 50,
        placeholder: "交還車備註"
    });

    // ComboBox
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#credit_card_number").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            {
                text: "卡號1",
                value: "1"
            },
            {
                text: "卡號2",
                value: "2"
            },
            {
                text: "卡號3",
                value: "3"
            },
            {
                text: "卡號4",
                value: "4"
            }
        ],
        filter: "contains",
        suggest: true,
        index: 2
    });

    // DropDownList
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    var data = [
        {
            text: "台中太平站",
            value: "1"
        },
        {
            text: "預還庫位2",
            value: "2"
        },
        {
            text: "預還庫位3",
            value: "3"
        }
    ];

    $("#my_dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: data,
        index: 0,
        change: onChange
    });

    var my_dropdownlist = $("#my_dropdownlist").data("kendoDropDownList");

    my_dropdownlist.select(0);
    //    var size = $("#size").data("kendoDropDownList");
    //
    function onChange() {
        var value = $("#my_dropdownlist").val();
        //        $("#cap")
        //            .toggleClass("black-cap", value == 1)
        //            .toggleClass("orange-cap", value == 2)
        //            .toggleClass("grey-cap", value == 3);
    };



    $("#my_dropdownlist_2").kendoDropDownList({
        height: 400
    }).after("<span class='k-form-error k-invalid-msg' data-for='' id='-error'>這是必填欄位</span>");

    // DatePicker, TimePicker
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    $("#my_datepicker").kendoValidator();
    $("#my_datepicker").kendoTextBox({
        placeholder: "日期",
        label: {
            content: "日期",
            floating: true
        }
    }).kendoDatePicker({
        format: "yyyy/MM/dd",
        value: "2020/12/30"
    });

    $("#my_timepicker").kendoTextBox({
        placeholder: "時間",
        label: {
            content: "時間",
            floating: true
        }
    }).kendoTimePicker({
        format: "HH:mm",
        dateInput: true
    });

    // AutoComplete
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 以客戶搜尋
    var autocomplete = $("#aside-input-customers").kendoAutoComplete({
        placeholder: "輸入身分證或手機號碼",
        minLength: 4, // 請再跟岳閔確認
        dataTextField: "CustomerID",
        template: '<div class="item-content">' +
            '<div class="item-inner">' +
            '<div class="item-title-row">' +
            '<div class="item-title subtitle-1">#:data.CustomerID#</div>' +
            '<div class="item-after">' +
            '<span class="caption">#:data.CustomerMobile#</span>' +
            '</div>' +
            '</div>' +
            '<div class="item-title-row">' +
            '<div class="body-2">#:data.CustomerName#</div>' +
            '<div class="item-after">' +
            '<span class="caption">#:data.CustomerPhone#</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>',
        dataSource: [{
            "CustomerID": "P128465863",
            "CustomerName": "黃武林",
            "CustomerMobile": "0966-448576",
            "CustomerPhone": "08-4957563"
        }, {
            "CustomerID": "P128465864",
            "CustomerName": "王曉明",
            "CustomerMobile": "0966-448576",
            "CustomerPhone": "08-4957563"
        }, {
            "CustomerID": "Q103947750",
            "CustomerName": "唐陸利",
            "CustomerMobile": "0966-448576",
            "CustomerPhone": "03-3948457"
        }],
        height: 400
    }).data("kendoAutoComplete");

    $("#aside-input-customers").removeClass("k-autocomplete-search");
    $("#aside-input-customers-list").find(".k-list").addClass("list search-customer-list").removeClass('k-list');

    // 以預約編號搜尋
    //        var data_appointments = [
    //                    "X011-H09070057",
    //                    "X011-H09070058",
    //                    "X011-H09070059",
    //                    "X011-H09070060",
    //                    "X011-H09070061",
    //                    "X011-H09070062",
    //                    "X011-H09070063",
    //                    "X011-H09070064"
    //        ];
    //        $("#aside-input-appointments").kendoAutoComplete({
    //            placeholder: "輸入預約編號",
    //            minLength: 4, // 請再跟岳閔確認
    //            dataSource: data_appointments,
    //            height: 400
    //        }).removeClass("k-autocomplete-search");
    //    
    //        // 以預合約編號搜尋
    //        var data_contracts = [
    //                    "X011-09070057",
    //                    "X011-09070058",
    //                    "X011-09070059",
    //                    "X011-09070060",
    //                    "X011-09070061",
    //                    "X011-09070062",
    //                    "X011-09070063",
    //                    "X011-09070064"
    //        ];
    //        $("#aside-input-contracts").kendoAutoComplete({
    //            placeholder: "輸入合約編號",
    //            minLength: 4, // 請再跟岳閔確認
    //            dataSource: data_contracts,
    //            height: 400
    //        }).removeClass("k-autocomplete-search");

    // Grid
    // - - - - - - - - - - - - - - - - - - - - - - - - - - -
    // 若要使用須再把 .k-grid-content-locked 固定在 table 右邊
    // 視覺稿 https://xd.adobe.com/view/75f81e0b-2686-4e84-7b5f-be7b0113548c-03c9/screen/0e852399-3dc6-44b0-b5cd-8ad9028dc9b8/page-user
    $("#k-grid-user").kendoGrid({
        dataSource: {
            type: "odata",
            transport: {
                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
            },
            schema: {
                model: {
                    fields: {
                        OrderID: {
                            type: "number"
                        },
                        ShipCountry: {
                            type: "string"
                        },
                        ShipName: {
                            type: "string"
                        },
                        ShipCity: {
                            type: "string"
                        },
                        ShipAddress: {
                            type: "string"
                        }
                    }
                }
            },
            pageSize: 2
        },
        height: 560,
        sortable: true,
        //		pageable: true,
        columns: [{
            field: "OrderID",
            title: "&nbsp;",
            locked: true,
            lockable: false,
            width: 80
        }, {
            field: "ShipCountry",
            title: "User Name",
            width: 124
        }, {
            field: "ShipCity",
            title: "Account",
            width: 124
        }, {
            field: "ShipName",
            title: "E-mail",
            width: 296
        }, {
            field: "ShipAddress",
            title: "Valid Start",
            lockable: false,
            width: 400
        }]
    });

});
