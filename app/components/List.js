/**
 * Created by jerryhuang on 15/7/29.
 */
define(function () {
    return {
        list: [
            {
                id: 'title-bar-hlc',
                config: {
                    template: {fromUrl: 'TitleBarHLC'},
                    viewModel: {fromParams: 'TitleBarHLC'}
                },
                id: 'monthPicker',
                config: {
                    template: {fromUrl: 'MonthPicker'},
                    viewModel: {fromParams: 'MonthPicker'}
                }
            }
        ]
    };
});