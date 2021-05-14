/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var check = require('Check');
    var timeInput;
    return {
        init: function () {
        },
        timeKeypress: check.OnlyNumPress,
        timeFocus: function (vm, e) {
            if (timeInput() == '' || timeInput() == null) return;
            timeInput(timeInput().replace(/\:/g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (timeInput.event.focus != null) {
                timeInput.event.focus(vm, e);
            }
        },
        timeBlur: function (vm, e) {
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
            if ($.trim(this.from()) == '' || $.trim(this.to()) == '') return;
            if (parseFloat(this.from().replace(/\:/g, '')) > parseFloat(this.to().replace(/\:/g, ''))) {
                alert('起始時間不可大結束時間，請重新輸入！');
                var input = timeInput;
                setTimeout(function () {
                    input('');
                    input.hasFocus(true);
                }, 100);
                return;
            }
        },
        fromTimeFocus: function (vm, e) {
            timeInput = this.from;
            this.timeFocus(vm, e);
        },
        toTimeFocus: function (vm, e) {
            timeInput = this.to;
            this.timeFocus(vm, e);
        },
        fromTimeBlur: function (vm, e) {
            timeInput = this.from;
            this.timeBlur(vm, e);
        },
        toTimeBlur: function (vm, e) {
            timeInput = this.to;
            this.timeBlur(vm, e);
        }
    };
});