/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var modelToViewModel = require('ModelToViewModel');
    var model = {
        init: function (id, vm) {
            var base = vm.viewModel;
            setTimeout(function () {
                $('.' + base.groupName() + 'RadioBtn' + ' a').on('click', function () {
                    if (base.isEnable() == true) {
                        var sel = $(this).data('title');
                        if (sel == base()) {
                            if (base.forceCheck() == false) {
                                base('');
                                if (base.event.click) {
                                    base.event.click({
                                        itemName: '',
                                        itemValue: '',
                                        viewModel: base
                                    });
                                }
                            }
                        } else {
                            // var tog = $(this).data('toggle');
                            // $('#' + tog).prop('value', sel);
                            base(sel);
                            if (base.event.click) {
                                base.event.click({
                                    itemName: $(this).html(),
                                    itemValue: sel,
                                    viewModel: base
                                });
                            }
                        }
                    }
                });
                if (base.isEnable() == false) {
                    $('.' + base.groupName() + 'RadioBtn' + ' a').attr('disabled', 'disabled');
                }
            }, 500);
            base.isEnable.subscribe(function (newValue) {
                if (newValue == true) {
                    $('.' + base.groupName() + 'RadioBtn' + ' a').removeAttr('disabled');
                } else {
                    $('.' + base.groupName() + 'RadioBtn' + ' a').attr('disabled', 'disabled');
                }
            });
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});