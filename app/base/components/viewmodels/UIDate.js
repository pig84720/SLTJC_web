/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jqxcalendar');
    require('jqxglobalize.culture.ZH-TW');
    var common = require('Common'),
        check = require('Check');
    if (!$('#jqxBaseCss')[0]) {
        common.loadCss([
            {
                id: 'jqxBaseCss',
                uri: SS.app.baseUrl + 'app/base/resources/scripts/jqwidgets/styles/jqx.base.css'
            }
        ]);
    }
    var calendarInput,
        clickShowFlg = 'N';
    return {
        calendarIcon: SS.app.baseUrl + 'app/base/components/resources/images/icon-calendar.png',
        init: function (id, param) {
            if (!$(".jqxCalendarUIDate")[0]) {
                var calendarDiv = document.createElement('div');
                calendarDiv.id = "jqxCalendarUIDate";
                //calendarDiv.class = "jqxCalendarUIDate";
                $('body').append(calendarDiv);
                $("#jqxCalendarUIDate").css({
                    width: '220px',
                    height: '220px',
                    display: 'none'
                }).addClass('jqxCalendarUIDate');
            }
            if (!$("#jqxCalendarUIDate").attr('jqxCalendar')) {
                $("#jqxCalendarUIDate").jqxCalendar({
                    width: '220px',
                    height: '220px',
                    culture: 'ZH-TW'
                });

                $('#jqxCalendarUIDate').on('change viewChange', function (event) {
                    if (event.type == 'viewChange') return;
                    //console.log(event);
                    var date = event.args.date;
                    var inputDate = calendarInput();
                    calendarInput(moment(date).format('YYYY/MM/DD'));
                    //console.log(clickShowFlg);
                    if (clickShowFlg == 'N') {
                        calendarInput.hasFocus(true);
                        $("#jqxCalendarUIDate").css({display: 'none'});
                    } else {
                        setTimeout(function () {
                            calendarInput.hasFocus(true);
                        }, 100);
                    }
                });
                $("#jqxCalendarUIDate").attr('jqxCalendar', true);
            }
        },
        calendarClick: function (vm, e) {
            if ($("#jqxCalendarUIDate").css('display') != 'none') {
                $("#jqxCalendarUIDate").css({
                    display: 'none'
                });
            } else {
                var position = $(e.currentTarget).prev().offset();
                calendarInput = this.viewModel;
                clickShowFlg = 'Y';
                $('#jqxCalendarUIDate ').jqxCalendar('setDate', $.trim(calendarInput()) == '' ? new Date() : moment(calendarInput(), 'YYYY/MM/DD').toDate());
                clickShowFlg = 'N';

                $("#jqxCalendarUIDate").css({
                    position: 'absolute',
                    'z-index': 99999999,
                    //top: e.clientY,
                    //left: e.clientX,
                    top: position.top + 28,
                    left: position.left,
                    display: ''
                });
            }
            if (calendarInput.event.click != null) {
                calendarInput.event.click(vm, e);
            }
        },
        calendarKeypress: check.OnlyNumPress,
        calendarFocus: function (vm, e) {
            calendarInput = this.viewModel;
            if (calendarInput() == '' || calendarInput() == null) return;
            calendarInput(calendarInput().replace(/\//g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            //console.log(this);
            if (calendarInput.event.focus != null) {
                calendarInput.event.focus(vm, e);
            }
        },
        calendarBlur: function (vm, e) {
            if (calendarInput() == '' || calendarInput() == null) return;
            var dateStr = calendarInput();
            if (dateStr.length == 6) {
                dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 4);
            }
            if (dateStr.length == 7) {
                dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 4);
            }
            var dateString = moment(dateStr, 'YYYYMMDD').format('YYYY/MM/DD');
            // if (dateString == 'Invalid date') {
            if (dateString == 'Invalid date' || dateStr.length < 6) {
                alert('『' + calendarInput.label() + '』欄位的日期格式輸入錯誤，請重新輸入！');
                calendarInput('');
                calendarInput.hasFocus(true);
                return;
            } else {
                calendarInput(dateString);
                //$("#jqxCalendarUIDate").css({display: 'none'});
            }
            if (calendarInput.event.blur != null) {
                calendarInput.event.blur(vm, e);
            }
        }
    };
});