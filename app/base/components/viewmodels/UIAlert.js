/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var alertNumber = 0,
        checkAlert = {};
    return {
        init: function (id, vm) {
            var base = vm.viewModel;
            vm.viewModel.isVisible.subscribe(function (newValue) {
                if (newValue == true) {
                    alertNumber++;
                    if (base.id) {
                        if (checkAlert[base.id()] == true) {
                            return;
                        } else {
                            checkAlert[base.id()] = true;
                        }
                    }

                    if ($('.alertMessageDiv')[0] == null) {
                        var messageDiv = '<div class="alertMessageDiv" ></div>';
                        $('body').prepend(messageDiv);
                    }

                    var alertId = 'alertMessage' + alertNumber.toString(),
                        alertMessage = '<div class="alert ' + vm.viewModel.ui() + ' alert-dismissible fade in ' + alertId + 'Message alert-message" role="alert">' +
                            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                            '<span aria-hidden="true">&times;</span>' +
                            '</button> ' +
                            '<strong>' + vm.viewModel.title() + '</strong> ' + vm.viewModel() +
                            '</div>';
                    $(alertMessage).appendTo('.alertMessageDiv');
                    vm.viewModel.isVisible(false);

                    $('.' + alertId + 'Message').on('closed.bs.alert', function () {
                        alertNumber--;
                        if (alertNumber <= 0) {
                            $('.alertMessageDiv').remove();
                            alertNumber = 0;
                        }
                    });
                    if (vm.viewModel.autoDismiss() == true) {
                        // console.log(vm.viewModel.autoDismiss());
                        setTimeout(function () {
                            $('.' + alertId + 'Message').alert('close');

                            if (base.id) {
                                checkAlert[base.id()] = null;
                            }
                        }, 2500);
                    }
                }
            });
        }
    };
});