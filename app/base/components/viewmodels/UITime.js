/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var timeInput,
        check = require('Check');
    return {
        init: function () {
        },
        viewModelKeypress: check.OnlyNumPress,
        viewModelFocus: function (vm, e) {
            timeInput = this.viewModel;
            if (timeInput() == '' || timeInput() == null) return;
            timeInput(timeInput().replace(/\:/g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (timeInput.event.focus != null) {
                timeInput.event.focus(vm, e);
            }
        },
        viewModelBlur: function (vm, e) {
            if (timeInput() == '' || timeInput() == null) return;
            var timeString = moment(timeInput(), 'HHmm').format('HH:mm');
            if (timeString == 'Invalid date') {
                alert('『' + timeInput.label() + '』欄位的時間格式輸入錯誤，請重新輸入！');
                timeInput('');
                timeInput.hasFocus(true);
                return;
            } else {
                timeInput(timeString);
            }
            if (timeInput.event.blur != null) {
                timeInput.event.blur(vm, e);
            }
        }
    };
});