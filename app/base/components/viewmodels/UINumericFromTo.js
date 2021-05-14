/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var numericInput,
        check = require('Check');
    return {
        init: function () {
        },
        numericKeypress: check.OnlyNumDotPress,
        numericFocus: function (vm, e) {
            if (numericInput() == '' || numericInput() == null) return;
            numericInput(numericInput().toString().replace(/\,/g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (numericInput.event.focus != null) {
                numericInput.event.focus(vm, e);
            }
        },
        numericBlur: function (vm, e, digit) {
            if (numericInput() == '' || numericInput() == null) return;
            if (!$.isNumeric(numericInput())) {
                alert('『' + numericInput.label() + '』欄位的數值格式輸入錯誤，請重新輸入！');
                numericInput('0.00');
                numericInput.hasFocus(true);
                return;
            } else {
                var numericString = check.getNumVal(numericInput(), digit);
                if (digit == 0) {
                    numericString = numericString.replace('.00', '');
                }
                numericInput(numericString);
            }
            if (numericInput.event.blur != null) {
                numericInput.event.blur(vm, e);
            }
            if (this.from() == '' || this.from() == null) return;
            if (this.to() == '' || this.to() == null) return;
            if (parseFloat(this.from().toString().replace(/\,/g, '')) > parseFloat(this.to().toString().replace(/\,/g, ''))) {
                alert('起始數值不可大結束數值，請重新輸入！');
                //numericInput.hasFocus(true);
                var input = numericInput;
                this.from(this.to());
                setTimeout(function () {
                    input.hasFocus(true);
                }, 100);
                return;
            }
        },
        fromNumericFocus: function (vm, e) {
            numericInput = this.from;
            this.numericFocus(vm, e);
        },
        fromNumericBlur: function (vm, e) {
            this.numericBlur(vm, e, this.from.digit());
        },
        toNumericFocus: function (vm, e) {
            numericInput = this.to;
            this.numericFocus(vm, e);
        },
        toNumericBlur: function (vm, e) {
            this.numericBlur(vm, e, this.to.digit());
        }
    };
});