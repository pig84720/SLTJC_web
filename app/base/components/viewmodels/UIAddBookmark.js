/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var modelToViewModel = require('ModelToViewModel'),
        base;
    var model = {
        init: function (id, vm) {
            base = vm.viewModel;
            // viewModel.bookmarkSection.kAlert('');
        },
        bookmarkSection: {
            type: 'section',
            addBookMark: function (vm, e) {
                // console.log(vm);
                var ua = window.navigator.userAgent;
                var msie = ua.indexOf("MSIE ");
                
                var url = vm.viewModel.bookmarkUrl(),
                    title = vm.viewModel.bookmarkTitle();
                if (!url || url == '') url = location.href;
                if (!title || title == '') title = document.title;
                if ((typeof window.sidebar == "object") &&
                    (typeof window.sidebar.addPanel == "function"))
                    window.sidebar.addPanel(title, url, "");//Gecko
                else if (msie>0 || (window.ActiveXObject || "ActiveXObject" in window)){
                    window.external.AddFavorite(url, title); //IE4+
                    //window.addBookmarkForBrowser(title, url);
                }
                else if (window.opera && document.createElement) {
                    obj.setAttribute('rel', 'sidebar');
                    obj.setAttribute('href', url);
                    obj.setAttribute('title', title);
                }
                else {
                    viewModel.bookmarkSection.kAlert.isVisible(true);
                }

                if (vm.viewModel.click) {
                    vm.viewModel.click(vm, e);
                }
                return true;
            },
            kAlert: {
                type: 'alert',
                ui: 'alert-info',
                title: '抱歉！',
                value: '您的瀏覽器不支援此功能，請按下 ctrl+D 加入書籤 (舊版的Opera瀏覽器請按下 ctrl+T )！',
                isVisible: false,
                autoDismiss: true
            }
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});