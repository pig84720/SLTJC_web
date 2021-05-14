/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var check = require('Check');
    var monthInput;
    return {
        init: function () {
        },
        viewModelKeypress: check.OnlyNumPress,
        viewModelFocus: function (vm, e) {
            monthInput = this.viewModel;
            if (monthInput() == '' || monthInput() == null) return;
            monthInput(monthInput().replace(/\//g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (monthInput.event.focus != null) {
                monthInput.event.focus(vm, e);
            }
        },
        viewModelBlur: function (vm, e) {
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
        }
    };
});