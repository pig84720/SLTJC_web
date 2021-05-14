/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var modelToViewModel = require('ModelToViewModel'),
        base,
        regularExpression = /^[^\s]+@[^\s]+\.[^\s]{2,3}$/,
        model = {
            init: function (id, vm) {
                base = vm.viewModel;
                // console.log(base);
                viewModel.ePaperSection.kRegistMail.ui(base.registUi());
                viewModel.ePaperSection.kRemoveMail.ui(base.removeUi());
                viewModel.ePaperSection.kRegistMail.placeholder(base.registPlaceholder());
                viewModel.ePaperSection.kRemoveMail.placeholder(base.removePlaceholder());
                viewModel.ePaperSection.kRegistMail.label(base.registLabel());
                viewModel.ePaperSection.kRemoveMail.label(base.removeLabel());
                viewModel.ePaperSection.kRegistMail.width(base.registWidth());
                viewModel.ePaperSection.kRemoveMail.width(base.removeWidth());
                viewModel.ePaperSection.kRegistMail.buttonWidth(base.registButtonWidth());
                viewModel.ePaperSection.kRemoveMail.buttonWidth(base.removeButtonWidth());
            },
            ePaperSection: {
                type: 'section',
                defaultSet: {
                    width: '120px',
                    labelWidth: '90px'
                },
                kTrigger: {
                    type: 'linkItem',
                    triggerType: 'open',
                    title: '訂閱電子報',
                    url: '#',
                    target: '_self',
                    click: function (vm, e) {
                        $('#' + vm.parentViewmodel.id() + 'Popup').modal({show: true});
                    }
                },
                kRegistMail: {
                    type: 'inputButtonGroup',
                    value: '',
                    placeholder: '請輸入您的E-Mail:',
                    label: '立即訂閱',
                    width: '100%',
                    buttonWidth: '120px',
                    ui: 'btn-info',
                    event: {
                        click: function (vm, e) {
                            // console.log(vm);
                            if($.trim(viewModel.ePaperSection.kRegistMail())==''){
                                viewModel.ePaperSection.kAlert('請輸入訂閱電子報的E-Mail！');
                                viewModel.ePaperSection.kAlert.isVisible(true);
                                return;
                            }
                            if(!regularExpression.test($.trim(viewModel.ePaperSection.kRegistMail()))){
                                viewModel.ePaperSection.kAlert('請確認，訂閱電子報的E-Mail的格式錯誤！');
                                viewModel.ePaperSection.kAlert.isVisible(true);
                                return;
                            }
                            if(vm.parentViewmodel.registClick){
                                vm.parentViewmodel.registClick(viewModel.ePaperSection.kRegistMail(),vm);
                            }
                        }
                    }
                },
                kRemoveMail: {
                    type: 'inputButtonGroup',
                    value: '',
                    placeholder: '請輸入您的E-Mail:',
                    label: '我要退訂',
                    width: '100%',
                    buttonWidth: '120px',
                    ui: 'btn-info',
                    event: {
                        click: function (vm, e) {
                            if($.trim(viewModel.ePaperSection.kRemoveMail())==''){
                                viewModel.ePaperSection.kAlert('請輸入退訂電子報的E-Mail！');
                                viewModel.ePaperSection.kAlert.isVisible(true);
                                return;
                            }
                            if(!regularExpression.test($.trim(viewModel.ePaperSection.kRemoveMail()))){
                                viewModel.ePaperSection.kAlert('請確認，退訂電子報的E-Mail的格式錯誤！');
                                viewModel.ePaperSection.kAlert.isVisible(true);
                                return;
                            }
                            if(vm.parentViewmodel.removeClick){
                                vm.parentViewmodel.removeClick(viewModel.ePaperSection.kRemoveMail(),vm);
                            }
                        }
                    }
                },
                kAlert: {
                    type: 'alert',
                    ui: 'alert-danger',
                    title: '提醒訊息',
                    value: '',
                    isVisible: false,
                    autoDismiss: true
                }
            }
        };
    var viewModel = modelToViewModel.generateViewModel(model);
    // console.log(viewModel);
    return viewModel;
});