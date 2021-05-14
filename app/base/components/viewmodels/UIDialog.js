/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    return {
        init: function (id, vm) {
            // console.log(vm);
            //$('#' + windowId + 'Popup').modal({show: true});
            vm.viewModel.isVisible.subscribe(function (newValue) {
                if (newValue == true) {
                    $('#' + vm.viewModel.id() + 'Popup').modal({show: true});
                    vm.viewModel.isVisible(false);
                }
            });
        }
    };
});