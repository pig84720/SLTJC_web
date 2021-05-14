/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var base,
        upload = require('Upload'),
        postMessage = require('PostMessage'),
        Papa = require('papaParse'),
        uploadId = 'uploadExcelToJsonOleDB',
        // common = require('Common'),
        createUploadControl = function () {
            if ($('#uploadExcelToJsonOleDBPopup')[0] == null) {
                var popup = '<div class="modal fade " id="' + uploadId + 'Popup" tabindex="-1" role="dialog" aria-labelledby="' + uploadId + 'Label"> ' +
                    '<div class="modal-dialog " role="document">' +
                    '<div class="modal-content"> ' +
                    '<div class="modal-header"> ' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
                    '<h5 class="modal-title" id="' + uploadId + 'Label">' + base.label() + '</h5>' +
                    '</div> ' +
                    '<div class="modal-body"> ' +
                    '<iframe id="' + uploadId + 'ParentFrame" src="about:blank" frameborder="0" style="width:500px;height:50px;"></iframe>' +
                    '<input type="file" id="' + uploadId + 'File">' +
                    '</div> ' +
                    '<div class="modal-footer"> ' +
                    '<button type="button" class="btn btn-default" id="' + uploadId + 'Button" >上傳Excel</button> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div> ' +
                    '</div>';

                //$(popup).appendTo($('#uploadExcelToJsonForm')[0] != null ? '#uploadExcelToJsonForm' : 'form');
                $(popup).appendTo('body');

                $('#' + uploadId + 'Button')
                    .click(function () {
                        if (base.isCsv && base.isCsv() == true) {
                            if ($('#' + uploadId + 'File').val().toLowerCase().indexOf(".csv") == -1) {
                                alert('匯入的檔案格式有問題，請匯入附檔名為csv的檔案！！');
                                $('#' + uploadId + 'File').val('');
                                $('#' + uploadId + 'File').focus();
                                base.callback({}, {});
                                return;
                            }
                            SS.mask.show();
                            var complete=function(results){
                                SS.mask.hide();
                                // console.log(results);
                                var returnData = {
                                    result: results.errors.length == 0 ? true : false,
                                    data: results.data,
                                    fileName: $('#' + uploadId + 'File').val().toLowerCase(),
                                    message: results.errors.length == 0 ? '' : '第' + results.errors[0].row + '列，' + results.errors[0].message
                                };
                                if (returnData.result == true) {
                                    base.callback(returnData.data, returnData);
                                    $('.close', '#' + uploadId + 'Popup').click();
                                } else {
                                    alert('上傳檔案發生錯誤！' + returnData.message);
                                }
                            };

                            if (window.ActiveXObject != null) {
                                var fso = new ActiveXObject("Scripting.FileSystemObject");
                                var fOut = fso.OpenTextFile($('#' + uploadId + 'File').val(), 1);
                                var outText = fOut.ReadAll();
                                Papa.parse(outText, {
                                    header: base.csvHeader(),
                                    skipEmptyLines: true,
                                    encoding: base.csvEncoding(),
                                    complete: complete
                                });
                                fOut.close();
                                fOut = null;
                                fso = null;
                            }else{
                                Papa.parse(document.getElementById(uploadId + 'File').files[0], {
                                    header: base.csvHeader(),
                                    skipEmptyLines: true,
                                    encoding: base.csvEncoding(),
                                    complete: complete
                                });
                            }
                        } else {
                            SS.mask.show();
                            postMessage.sendMessage({
                                type: 'iframe',
                                frameId: uploadId + 'ParentFrame',
                                triggerFunction: 'excelToJsonOleDB',
                                messageContent: {
                                    baseUrl: base.serviceUrl()
                                },
                                callback: function (data) {
                                    SS.mask.hide();
                                    //console.log(data);
                                    //base.callback(data);
                                    if (data.messageContent.result == true) {
                                        base.callback(data.messageContent.data, data.messageContent);
                                        $('.close', '#' + uploadId + 'Popup').click();
                                    } else {
                                        if (data.messageContent.data != 'errorInput') {
                                            alert('上傳檔案發生異常！');
                                        }
                                    }
                                }
                            });
                        }
                    });
                postMessage.init();
            }

        };

    // if (typeof $().modal != 'function') {
    //     if ($('#bootstrapScript')[0] == null) {
    //         common.loadScript([
    //             {uri: SS.app.baseUrl + 'app/base/resources/scripts/bootstrap.min.js', id: 'bootstrapScript'}
    //         ]);
    //     }
    // }

    return {
        init: function (id, params) {
            base = params.viewModel;
            upload.setBsaeUrl(base.serviceUrl());
            createUploadControl();
            if (base.isCsv && base.isCsv() == true) {
                $('#' + uploadId + 'ParentFrame').css('display', 'none');
                $('#' + uploadId + 'File').css('display', '');
            } else {
                $('#' + uploadId + 'ParentFrame').css('display', '');
                $('#' + uploadId + 'File').css('display', 'none');
                $('#' + uploadId + 'ParentFrame').attr('src', base.serviceUrl() + 'proxyPage/proxyPage.html');
            }
            if(base.isCsv){
                base.isCsv.subscribe(function (newValue) {
                    if (newValue == true) {
                        $('#' + uploadId + 'ParentFrame').css('display', 'none');
                        $('#' + uploadId + 'File').css('display', '');
                        $('#' + uploadId + 'Button').html('上傳Csv');
                    } else {
                        $('#' + uploadId + 'ParentFrame').css('display', '');
                        $('#' + uploadId + 'File').css('display', 'none');
                        $('#' + uploadId + 'Button').html('上傳Excel');
                    }
                });
            }
            base.label.subscribe(function (newValue) {
                $('#' + uploadId + 'Label').html(newValue);
            });
        },
        uploadExcelToJson: function (vm, e) {
            base = vm.viewModel;
            $('#' + uploadId + 'Label').html(base.label());
            $('#' + uploadId + 'ParentFrame').attr('src', base.serviceUrl() + 'proxyPage/proxyPage.html');
            $('#' + uploadId + 'Popup').modal({show: true});
            if (base.isCsv && base.isCsv() == true) {
                $('#' + uploadId + 'ParentFrame').css('display', 'none');
                $('#' + uploadId + 'File').css('display', '');
                $('#' + uploadId + 'Button').html('上傳Csv');
            } else {
                $('#' + uploadId + 'Button').html('上傳Excel');
                $('#' + uploadId + 'ParentFrame').css('display', '');
                $('#' + uploadId + 'File').css('display', 'none');
            }
        }
    };
});