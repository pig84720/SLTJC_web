/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var numericInput,
        check = require('Check');
    return {
        init: function () {
        },
        viewModelKeypress: check.OnlyNumDotPress,
        viewModelFocus: function (vm, e) {
            numericInput = this.viewModel;
            //console.log(numericInput());
            if (numericInput() == '' || numericInput() == null) numericInput(0);
            numericInput(numericInput().toString().replace(/\,/g, ''));
            setTimeout(function () {
                $(e.currentTarget).select().css('ime-mode', 'disabled');
            }, 50);
            if (numericInput.event.focus != null) {
                numericInput.event.focus(vm, e);
            }
        },
        viewModelBlur: function (vm, e) {
            numericInput = this.viewModel;
            if (numericInput() == '' || numericInput() == null) return;
            if (!$.isNumeric(numericInput())) {
                alert('『' + numericInput.label() + '』欄位的數值格式輸入錯誤，請重新輸入！');
                numericInput('');
                numericInput.hasFocus(true);
                return;
            } else {
                var numericString = check.getNumVal(numericInput(), this.viewModel.digit());
                if (this.viewModel.digit() == 0) {
                    numericString = numericString.replace('.00', '');
                }
                numericInput(numericString);
            }
            if (numericInput.event.blur != null) {
                numericInput.event.blur(vm, e);
            }
        }
    };
});
