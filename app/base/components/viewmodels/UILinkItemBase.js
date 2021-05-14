/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jquery.marquee');
    var windowId = 'ssUrlOpenWindow';

    var popup = '<div class="modal fade " id="' + windowId + 'Popup" tabindex="-1" role="dialog" aria-labelledby="' + windowId + 'Label"> ' +
        '<div class="modal-dialog modal-lg" role="document">' +
        '<div class="modal-content"> ' +
        '<div class="modal-header"> ' +
        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
        '<h5 class="modal-title" id="' + windowId + 'Label"></h5>' +
        '</div> ' +
        '<div class="modal-body"> ' +
        '<iframe id="' + windowId + 'Frame" src="about:blank" frameborder="0" style="width:100%;height:600px;"></iframe>' +
        '</div> ' +
        '<div class="modal-footer" style="display: none"> ' +
        '</div> ' +
        '</div> ' +
        '</div> ' +
        '</div>';
    $(popup).appendTo('body');

    return {
        init: function (id, vm) {
        },
        urlOpenInline: function (vm, e) {
            $('#' + windowId + 'Label').html(vm.kTitle);
            var $frame=$('#' + windowId + 'Frame');
            if ($.trim(vm.kType) == 'iframe') {
                $frame.attr('src', vm.kUrl).css('height', vm.kHeight());
            } else {
                $frame.attr('src', 'about:blank').css('height', vm.kHeight());
                setTimeout(function(){
                    $frame.contents().find("body").append(vm.kContent);
                },300);
            }
            $('.modal-dialog', '#' + windowId + 'Popup')
                .removeClass('modal-lg')
                .removeClass('modal-sm')
                .removeClass('modal-xs')
                .addClass(vm.kSize());
            $('#' + windowId + 'Popup').modal({show: true});
            if (vm.click) {
                vm.click(vm, e);
            }
        },
        urlClick: function (vm, e) {
            if (vm.click) {
                vm.click(vm, e);
            }
            return true;
        }
    };
});