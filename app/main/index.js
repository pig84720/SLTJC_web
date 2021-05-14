//設定載入順序，先載入config(載入必要的script)，再載入app(初始化程式)
require.config({
  paths: {
    subAppSetting: 'appSetting',
    config: '../config',
    Common: '../base/utils/Common'
  },
  shim: {
    config: ['appSetting'],
    app: ['config'],
    'viewmodels/index': ['app']
  }
});
require(['appSetting', 'config', 'app', 'viewmodels/index', 'Common'], function (appSetting, config, app, viewModel, common) {
  //Session解析
  //var sessJson=$.parseJSON($('#ctl00_ContentPlaceHolder1_sessJson').val());
  app.init({
    programId: 'index',    //程式代號-必要參數
      serviceUrl: SS.service.baseUrl,    //服務網址-必要參數
      viewModel: viewModel,    //ViewModel-必要參數
      initVar: {}
  });
});
