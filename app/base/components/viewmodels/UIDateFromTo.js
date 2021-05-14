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
        init: function () {
            if (!$(".jqxCalendarUIDateFromTo")[0]) {
                var calendarDiv = document.createElement('div');
                calendarDiv.id = "jqxCalendarUIDateFromTo";
                //calendarDiv.class = "jqxCalendarUIDateFromTo";
                $('body').append(calendarDiv);
                $("#jqxCalendarUIDateFromTo").css({
                    width: '220px',
                    height: '220px',
                    display: 'none'
                }).addClass('jqxCalendarUIDateFromTo');
            }
            if (!$("#jqxCalendarUIDateFromTo").attr('jqxCalendar')) {
                $("#jqxCalendarUIDateFromTo").jqxCalendar({
                    width: '220px',
                    height: '220px',
                    culture: 'ZH-TW'
                });

                $('#jqxCalendarUIDateFromTo').on('change viewChange', function (event) {
                    if (event.type == 'viewChange') return;
                    var date = event.args.date;
                    calendarInput(moment(date).format('YYYY/MM/DD'));
                    if (clickShowFlg == 'N') {
                        calendarInput.hasFocus(true);
                        $("#jqxCalendarUIDateFromTo").css({display: 'none'});
                    } else {
                        setTimeout(function () {
                            calendarInput.hasFocus(true);
                        }, 100);
                    }
                });
                $("#jqxCalendarUIDateFromTo").attr('jqxCalendar', true);
            }
        },
        calendarClick: function (vm, e) {
            if ($("#jqxCalendarUIDateFromTo").css('display') != 'none') {
                $("#jqxCalendarUIDateFromTo").css({
                    display: 'none'
                });

            } else {
                //var position = $(e.currentTarget).prev().position();
                var position = $(e.currentTarget).prev().offset();
                var calendarInputValue = calendarInput();
                clickShowFlg = 'Y';
                $('#jqxCalendarUIDateFromTo ').jqxCalendar('setDate', $.trim(calendarInput()) == '' ? new Date() : moment(calendarInput(), 'YYYY/MM/DD').toDate());
                clickShowFlg = 'N';
                $("#jqxCalendarUIDateFromTo").css({
                    position: 'absolute',
                    'z-index': 99999999,
                    top: position.top + 28,
                    left: position.left,
                    display: ''
                });
                //setTimeout(function(){
                //    if ($("#jqxCalendarUIDateFromTo").css('display') == 'none') {
                //        $("#jqxCalendarUIDateFromTo").css({
                //            display: ''
                //        });
                //    }
                //},50);
                calendarInput(calendarInputValue);
                //calendarInput.hasFocus(true);
            }
        },
        calendarKeypress: check.OnlyNumPress,
        calendarFocus: function (vm, e) {
            if (calendarInput() == '' || calendarInput() == null) return;
            calendarInput(calendarInput().replace(/\//g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
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
            if (dateString == 'Invalid date') {
                alert('『' + calendarInput.label() + '』欄位的日期格式輸入錯誤，請重新輸入！');
                calendarInput('');
                calendarInput.hasFocus(true);
                return;
            } else {
                calendarInput(dateString);
                //$("#jqxCalendarUIDateFromTo").css({display: 'none'});
            }
            if (calendarInput.event.blur != null) {
                calendarInput.event.blur(vm, e);
            }
            if (this.from() == '' || this.from() == null) return;
            if (this.to() == '' || this.to() == null) return;
            if (parseFloat(this.from().replace(/\//g, '')) > parseFloat(this.to().replace(/\//g, ''))) {
                alert('起始日期不可大結束日期，請重新輸入！');
                var input = calendarInput;
                setTimeout(function () {
                    input('');
                    input.hasFocus(true);
                }, 100);
                return;
            }
        },
        fromCalendarClick: function (vm, e) {
            calendarInput = this.from;
            this.calendarClick(vm, e);
        },
        toCalendarClick: function (vm, e) {
            calendarInput = this.to;
            this.calendarClick(vm, e);
        },
        fromCalendarFocus: function (vm, e) {
            calendarInput = this.from;
            this.calendarFocus(vm, e);
        },
        toCalendarFocus: function (vm, e) {
            calendarInput = this.to;
            this.calendarFocus(vm, e);
        },
        fromCalendarBlur: function (vm, e) {
            calendarInput = this.from;
            this.calendarBlur(vm, e);
        },
        toCalendarBlur: function (vm, e) {
            calendarInput = this.to;
            this.calendarBlur(vm, e);
        }
    };
});