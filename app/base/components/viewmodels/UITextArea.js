/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var base;
    return {
        init: function (id, params) {
            base = params.viewModel;
        },
        viewModelKeydown: function (vm, e) {
            base = this;
            setTimeout(function () {
                base.viewModel.wordCount($(e.currentTarget).val().length);
            }, 50);
            return true;
        }
    };
});