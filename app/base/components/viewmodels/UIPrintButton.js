/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var base,
        secureData = require('SecureData'),
        common = require('Common'),
        modelToViewModel = require('ModelToViewModel');

    if (typeof $().modal != 'function') {
        if ($('#bootstrapScript')[0] == null) {
            common.loadScript([
                {uri: SS.app.baseUrl + 'app/base/resources/scripts/bootstrap.min.js', id: 'bootstrapScript'}
            ]);
        }
    }

    var model = {
        init: function (id, params) {
            base = params.viewModel;
            //console.log(this.reportSection.kaReportType);
            viewModel.reportSection.kaReportType(base.defaultReportType());
            setTimeout(function () {
                $('#' + base.id() + 'ReportPopup').on('hide.bs.modal', function (e) {
                    // console.log('closeReport');
                    $('iframe', this).attr('src', 'about:blank');
                });
            }, 1000);
        },
        showPrintPopup: function (vm, event) {
            if (vm.viewModel.validationCallback()) {
                if (vm.viewModel.defaultReportType().length > 0) {
                    viewModel.reportSection.kaReportType(vm.viewModel.defaultReportType());
                    viewModel.printReport(vm, event);
                } else {
                    viewModel.reportSection.kaReportType(['PDF']);
                    $('#' + vm.viewModel.id() + 'Popup').modal({show: true});
                }
            }
            // console.dir(this);
        },
        printReport: function (vm, event) {
            $('.close', '#' + vm.viewModel.id() + 'Popup').click();
            secureData.doAjaxCall({
                url: 'api/Report/GetReport',
                connectType: 'post',
                params: {
                    reportPath: vm.viewModel.reportPath(),
                    reportId: vm.viewModel.reportId(),
                    // reportType: vm.viewModel.defaultReportType(),
                    reportType: viewModel.reportSection.kaReportType(),
                    reportVar: vm.viewModel.reportVar()
                }
            }).done(function (data) {
                //console.log(data);
                var reportPreviewUrl = $.grep(data.Data, function (item, index) {
                    return (item.reportType == 'PDF');
                });
                var reportDownloadUrl = $.grep(data.Data, function (item, index) {
                    //return (item.reportType != 'PDF');
                    return true;
                });
                //console.log(reportPreviewUrl);
                SS.mask.show();
                if (reportPreviewUrl.length > 0) {
                    viewModel.kReportDisPlay('');
                    viewModel.kReportPreViewSrc(reportPreviewUrl[0].reportUrl);
                } else {
                    viewModel.kReportDisPlay('none');
                }
                viewModel.kaReportDownLoadUri(reportDownloadUrl);
                $('#' + vm.viewModel.id() + 'ReportPopup').modal({show: true});
                SS.mask.hide();
            }).fail(function () {
                alert('目前網路連線異常，請稍候再試！！')
            });
        },
        downloadReport: function (vm, e) {
            //console.dir($(e.currentTarget).attr('reportUrl'));
            window.open($(e.currentTarget).attr('reportUrl'), '_blank', '');
        },
        reportSection: {
            type: 'section',
            kaReportType: {
                type: 'checkboxlist',
                value: [],
                label: '列印報表種類',
                labelWidth: '120px',
                itemListWidth: '70px',
                valign: false,
                itemList: [
                    {itemName: 'PDF', itemValue: 'PDF'},
                    {itemName: 'EXCEL', itemValue: 'EXCEL'},
                    {itemName: 'CSV', itemValue: 'CSV'},
                    {itemName: 'TIF', itemValue: 'TIF'},
                    {itemName: 'WORD', itemValue: 'WORD'}
                ]
            }
        },
        kReportDisPlay: '',
        kReportPreViewSrc: 'about:blank',
        kaReportDownLoadUri: []
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    //console.dir(viewModel);
    return viewModel;
});