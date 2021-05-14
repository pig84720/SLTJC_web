/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var base,
        upload = require('Upload'),
        postMessage = require('PostMessage'),
        uploadId = 'uploadFile',
        common = require('Common'),
        createUploadControl = function () {
            if ($('#' + uploadId + 'Popup')[0] == null) {
                var popup = '<div class="modal fade " id="' + uploadId + 'Popup" tabindex="-1" role="dialog" aria-labelledby="' + uploadId + 'Label"> ' +
                    '<div class="modal-dialog " role="document">' +
                    '<div class="modal-content"> ' +
                    '<div class="modal-header"> ' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                    '<h5 class="modal-title" id="' + uploadId + 'Label">' + base.label() + '</h5>' +
                    '</div> ' +
                    '<div class="modal-body"> ' +
                    '<span class="uploadMemo" style="display: inline-block; color: red;"></span>' +
                    '<iframe id="' + uploadId + 'ParentFrame" src="about:blank" frameborder="0" style="width:500px;height:50px;"></iframe>' +
                    '</div> ' +
                    '<div class="modal-footer"> ' +
                    '<span class="extFileLimit" style="float: left; color: red;"></span>' +
                    '<button type="button" class="btn btn-default" id="' + uploadId + 'Button" >上傳檔案</button> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                $(popup).appendTo('body');

                $('#' + uploadId + 'Button')
                    .click(function () {
                        SS.mask.show();
                        postMessage.sendMessage({
                            type: 'iframe',
                            frameId: uploadId + 'ParentFrame',
                            triggerFunction: base.uploadApi != null && base.uploadApi() != '' ? 'uploadFileToApi' : 'uploadFile',
                            messageContent: {
                                baseUrl: base.serviceUrl(),
                                extFileLimit: base.extFileLimit(),
                                api: base.uploadApi != null ? base.uploadApi() : '',
                                multiple: base.multiple != null ? base.multiple() : false,
                                isScale: base.isScale != null ? base.isScale() : false,
                                scaleSetting: base.scaleSetting != null ? base.scaleSetting() : {},
                                uploadFileParams: {
                                    UploadPath: base.uploadPath(),
                                    FileName: base.setFileName(base, parentViewModel),
                                    iFrameFlg: 'Y'
                                }
                            },
                            callback: function (data) {
                                SS.mask.hide();
                                //console.log(data);
                                //base.callback(data);
                                if (data.messageContent.result == true) {
                                    base.callback(data.messageContent.data, base, parentViewModel);
                                    $('.close', '#' + uploadId + 'Popup').click();
                                    $('#' + uploadId + 'ParentFrame').attr('src', base.serviceUrl() + 'proxyPage/proxyPage.html');
                                }
                                else {
                                    if (data.messageContent.data != 'errorInput') {
                                        alert('上傳檔案發生異常！');
                                    }
                                }
                            }
                        });
                    });
                $('#' + uploadId + 'ParentFrame').attr('src', base.serviceUrl() + 'proxyPage/proxyPage.html');
                postMessage.init();
            }

        },
        parentViewModel = {};

    if (typeof $().modal != 'function') {
        if ($('#bootstrapScript')[0] == null) {
            common.loadScript([{
                uri: SS.app.baseUrl + 'app/base/resources/scripts/bootstrap.min.js',
                id: 'bootstrapScript'
            }]);
        }
    }

    return {
        init: function (id, params) {
            base = params.viewModel;
            upload.setBsaeUrl(base.serviceUrl());
            //console.log(base);
            createUploadControl();
        },
        uploadFile: function (vm, e) {
            // console.dir(arguments);
            base = vm.viewModel;
            parentViewModel = vm.parentViewModel;
            if (base.openCallback) {
                base.openCallback(base, parentViewModel);
            }
            if (base.multiple != null && base.multiple() == true) {
                postMessage.sendMessage({
                    type: 'iframe',
                    frameId: uploadId + 'ParentFrame',
                    triggerFunction: 'setMultiple',
                    messageContent: {
                        multiple: base.multiple != null ? base.multiple() : false
                    },
                    callback: function (data) {
                    }
                });
                $('.uploadMemo', '#' + uploadId + 'Popup .modal-body').html('＊選取檔案可以按下Ctrl鍵一次選擇多個檔案上傳<br>＊可以拖拉檔案到上傳檔案的按鈕上，進行檔案上傳<br><br>');
            } else {
                $('.uploadMemo', '#' + uploadId + 'Popup .modal-body').html('');
            }
            $('#' + uploadId + 'Label').html(base.label());
            $('.extFileLimit', '#' + uploadId + 'Popup .modal-footer').html('＊上傳檔案格式僅限『' + base.extFileLimit().join(', ').toLowerCase() + '』');
            $('#' + uploadId + 'Popup').modal({
                show: true
            });
        }
    };
});