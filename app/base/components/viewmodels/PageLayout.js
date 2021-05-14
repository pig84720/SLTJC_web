/**
 * Created by jerryhuang on 15/7/29.
 */

define(function (require) {
    return {
        init: function (id) {
            var renderCount = 0;
            $('.panel-section', '.' + id).each(function () {
                renderCount++;
                var sectionId = $(this).attr('sectionId');
                $('.panel-heading button', this)
                    .attr('data-target', '#' + sectionId + '-' + id)
                    .attr('aria-controls', sectionId + '-' + id)
                    .click(function(){
                        //console.log($('.glyphicon', this));
                        if($('.glyphicon', this).hasClass('glyphicon-menu-down')){
                            $('.glyphicon', this).removeClass('glyphicon-menu-down');
                            $('.glyphicon', this).addClass('glyphicon-menu-up');
                        }else{
                            $('.glyphicon', this).removeClass('glyphicon-menu-up');
                            $('.glyphicon', this).addClass('glyphicon-menu-down');
                        }
                    });

                $('.collapse', this).attr('id', sectionId + '-' + id);
                if (sectionId == 'querySection' || (renderCount == 1 && sectionId != 'querySection')) {
                    $('.collapse', this).addClass('in');

                    if($('.panel-heading button .glyphicon', this).hasClass('glyphicon-menu-down')){
                        $('.panel-heading button .glyphicon', this).removeClass('glyphicon-menu-down');
                        $('.panel-heading button .glyphicon', this).addClass('glyphicon-menu-up');
                    }
                }

            });
            $('.panel-section').css('display', '');


            var buttonCount = 0,
                inputCount = 0,
                textareaCount = 0,
                selectCount = 0,
                baseCount = 0;
            $(document).ready(function () {
                setTimeout(function () {
                    $('button,input,textarea,select').each(function () {
                        if ($(this).attr('id') == null) {
                            switch ($(this).prop("tagName")) {
                                case 'BUTTON':
                                    buttonCount++;
                                    $(this).attr('id', id + '-' + $(this).prop("tagName") + '-' + buttonCount);
                                    break;
                                case 'INPUT':
                                    inputCount++;
                                    $(this).attr('id', id + '-' + $(this).prop("tagName") + '-' + inputCount);
                                    break;
                                case 'TEXTAREA':
                                    textareaCount++;
                                    $(this).attr('id', id + '-' + $(this).prop("tagName") + '-' + textareaCount);
                                    break;
                                case 'SELECT':
                                    selectCount++;
                                    $(this).attr('id', id + '-' + $(this).prop("tagName") + '-' + selectCount);
                                    break;
                                default:
                                    baseCount++;
                                    $(this).attr('id', id + '-' + $(this).prop("tagName") + '-' + baseCount);
                                    break;
                            }
                        }
                    });


                    $.fn.focusNextInputField = function () {
                        return this.each(function () {
                            //var fields = $(this).parents('form:eq(0),body').find('button,input,textarea,select');
                            var fields = $(this).parents('form:eq(0),body').find('input,textarea,select');
                            var index = fields.index(this);
                            for (var i = index; i < fields.length; i++) {
                                if (fields.eq(index + 1).attr('disabled') || fields.eq(index + 1).attr('type') == 'hidden') {
                                    index++;
                                } else {
                                    break;
                                }
                            }
                            if (index > -1 && ( index + 1 ) < fields.length) {
                                if (window.attachEvent) {
                                    setTimeout(function () {
                                        fields.eq(index + 1).focus();
                                        fields.eq(index + 1).focus();
                                    }, 100);
                                } else {
                                    //console.log('focus');
                                    //console.log(fields.eq(index + 1));
                                    fields.eq(index + 1).focus();
                                    var $focused = $(':focus');
                                    //console.log($focused.attr('id'));
                                    //console.log($(this).attr('id'));
                                    if($focused.attr('id')==$(this).attr('id')){
                                        fields.eq(0).focus();
                                    }
                                }
                            }
                            return false;
                        });
                    };
                    $('input, select, button').keydown(function () {
                        if (window.event.keyCode == 13 || window.event.keyCode == 9) {
                            if ($(this).parent().attr('role') == 'gridcell') return;
                            $(this).focusNextInputField();
                            return false;
                        }
                    });

                }, 3000);
            });
        }
    };
});