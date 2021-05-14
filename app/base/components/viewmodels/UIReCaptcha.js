/**
 * Created by jerryhuang on 15/7/29.
 */
define(function(require) {
    var secureData = require('SecureData'),
        grecaptchaArray = [];
    return {
        init: function(id, vm) {
            var verifyCallback = function(response) {
                // console.log('verifyCallback');
                // console.log(arguments);
                secureData.setBsaeUrl(SS.service.baseUrl);
                secureData.doAjaxCall({
                    url: 'API/Captcha/verifyReCaptcha',
                    connectType: 'post',
                    params: {
                        reCaptchaResponse: $('#g-recaptcha-response').val(),
                        remoteIp: ''
                    }
                }).done(function(data) {
                    if (data.Result == true) {
                        vm.viewModel.verifyResult(true);
                        if (vm.viewModel.callback) {
                            vm.viewModel.callback(data);
                        }
                    } else {
                        vm.viewModel.verifyResult(false);
                        if (grecaptchaArray.length > 0) {
                            var recaptchaSetting = $.grep(grecaptchaArray, function(item, index) {
                                return item.id = vm.viewModel.id();
                            });
                            if (recaptchaSetting.length > 0) {
                                console.log(recaptchaSetting[0].opt_widget_id);
                                grecaptcha.reset(recaptchaSetting[0].opt_widget_id);
                            }
                        }
                    }
                }).fail(function() {
                    vm.viewModel.verifyResult(false);
                    if (grecaptchaArray.length > 0) {
                        var recaptchaSetting = $.grep(grecaptchaArray, function(item, index) {
                            return item.id = vm.viewModel.id();
                        });
                        if (recaptchaSetting.length > 0) {
                            grecaptcha.reset(recaptchaSetting[0].opt_widget_id);
                        }
                    }
                });
            };
            var expireCallback = function() {
                // console.log(arguments);
                vm.viewModel.verifyResult(false);
                if (vm.viewModel.expireCallback) {
                    vm.viewModel.expireCallback();
                }
            };
            grecaptchaArray.push({
                id: vm.viewModel.id(),
                setting: {
                    'sitekey': vm.viewModel.siteKey(),
                    'callback': verifyCallback,
                    'theme': vm.viewModel.theme(),
                    'expired-callback': expireCallback
                }
            });
            var initReCaptcha = function() {
                if (grecaptchaArray.length > 0) {
                    if ($('.' + grecaptchaArray[0].id + 'Container')[0] != null) {
                        require(['https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit'], function() {
                            window.onloadCallback = function() {
                                if (typeof grecaptcha !== "undefined") {
                                    for (var i = 0; i < grecaptchaArray.length; i++) {
                                        var grecaptchaSetting = grecaptchaArray[i];
                                        //console.log(grecaptchaSetting);
                                        $('.' + grecaptchaSetting.id + 'Container').html('<div id="' + grecaptchaSetting.id + '" style="margin-bottom: 10px;"></div>');
                                        grecaptchaSetting['opt_widget_id'] = grecaptcha.render(grecaptchaSetting.id, grecaptchaSetting.setting);
                                    }
                                } else {
                                    setTimeout(function() {
                                        onloadCallback();
                                    }, 500);
                                }
                            };
                        });
                    } else {
                        setTimeout(function() {
                            initReCaptcha();
                        }, 500);
                    }
                }
            };
            initReCaptcha();
        }
    };
});
