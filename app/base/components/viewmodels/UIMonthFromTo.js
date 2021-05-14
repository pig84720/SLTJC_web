/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var check = require('Check');
    var monthInput;
    return {
        init: function () {
        },
        monthKeypress: check.OnlyNumPress,
        monthFocus: function (vm, e) {
            if (monthInput() == '' || monthInput() == null) return;
            monthInput(monthInput().replace(/\//g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (monthInput.event.focus != null) {
                monthInput.event.focus(vm, e);
            }
        },
        monthBlur: function (vm, e) {
            if (monthInput() == '' || monthInput() == null) return;
            var dateStr = monthInput();
            if (dateStr.length == 4) {
                dateStr = (parseInt(dateStr.substr(0, 2)) + 1911) + dateStr.substr(2, 2);
            }
            if (dateStr.length == 5) {
                dateStr = (parseInt(dateStr.substr(0, 3)) + 1911) + dateStr.substr(3, 2);
            }
            var dateString = moment(dateStr, 'YYYYMM').format('YYYY/MM');
            if (dateString == 'Invalid date') {
                alert('『' + monthInput.label() + '』欄位的年月格式輸入錯誤，請重新輸入！');
                monthInput('');
                monthInput.hasFocus(true);
                return;
            } else {
                monthInput(dateString);
            }
            if (monthInput.event.blur != null) {
                monthInput.event.blur(vm, e);
            }
            if (this.from() == '' || this.from() == null) return;
            if (this.to() == '' || this.to() == null) return;
            if (parseFloat(this.from().replace(/\//g, '')) > parseFloat(this.to().replace(/\//g, ''))) {
                alert('起始年月不可大結束年月，請重新輸入！');
                // monthInput('');
                // monthInput.hasFocus(true);
                var input = monthInput;
                setTimeout(function () {
                    input('');
                    input.hasFocus(true);
                }, 100);
                return;
            }
        },
        fromMonthFocus: function (vm, e) {
            monthInput = this.from;
            this.monthFocus(vm, e);
        },
        toMonthFocus: function (vm, e) {
            monthInput = this.to;
            this.monthFocus(vm, e);
        },
        fromMonthBlur: function (vm, e) {
            monthInput = this.from;
            this.monthBlur(vm, e);
        },
        toMonthBlur: function (vm, e) {
            monthInput = this.to;
            this.monthBlur(vm, e);
        }
    };
});