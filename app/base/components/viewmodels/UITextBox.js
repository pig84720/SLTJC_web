/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var numericInput,
        check = require('Check');
    return {
        init: function (id, params) {
            base = params.viewModel;
        },
        viewModelKeypress: function (vm, e) {
            // console.log(arguments);
            if (vm.viewModel.event.keypress) {
                vm.viewModel.event.keypress(vm, e);
            }
            return true;
        },
        viewModelNumKeypress: check.OnlyNumPress,
        viewModelEngNumKeypress: check.OnlyEngNumPress,
        viewModelEngKeypress: check.OnlyEngPress
    };
});