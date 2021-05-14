/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var base;
    var common = require('Common');
    common.loadCss([{
        id: 'fontelloCss',
        uri: SS.app.baseUrl + 'app/base/components/resources/css/CKEditor/fontello.css'
    }]);
    return {
        init: function (id, params) {
            base = params.viewModel;
            //用此種require的引入方式，可以延遲引入時間
            require(['ckeditor'], function (ckeditor) {
                if (CKEDITOR.env.ie && CKEDITOR.env.version < 9)
                    CKEDITOR.tools.enableHtml5Elements(document);

                // The trick to keep the editor in the sample quite small
                // unless user specified own height.
                // CKEDITOR.config.height = 150;
                // CKEDITOR.config.width = 'auto';
                // console.log(base.config());
                // CKEDITOR.config=base.config();
                var config = base.config();
                // config.filebrowserBrowseUrl= '/ckfinder/ckfinder.html';
                // config.filebrowserImageBrowseUrl= '/ckfinder/ckfinder.html?type=Images';,
                config.extraPlugins = 'uploadimage';
                config.uploadUrl = SS.service.baseUrl + 'api/Upload/CKEditorUploadPhoto?command=QuickUpload';
                // config.filebrowserUploadUrl = '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files';
                config.filebrowserImageUploadUrl = SS.service.baseUrl + 'api/Upload/CKEditorUploadPhoto';
                for (var key in config) {
                    CKEDITOR.config[key] = config[key];
                }

                var initSample = (function () {
                    var wysiwygareaAvailable = isWysiwygareaAvailable(),
                        isBBCodeBuiltIn = !!CKEDITOR.plugins.get('bbcode');

                    return function () {
                        var editorElement = CKEDITOR.document.getById(base.id());
                        // :(((
                        if (isBBCodeBuiltIn) {
                            editorElement.setHtml(
                                'Hello world!\n\n' +
                                'I\'m an instance of [url=http://ckeditor.com]CKEditor[/url].'
                            );
                        }

                        // Depending on the wysiwygare plugin availability initialize classic or inline editor.
                        if (wysiwygareaAvailable) {
                            CKEDITOR.replace(base.id());
                        } else {
                            editorElement.setAttribute('contenteditable', 'true');
                            CKEDITOR.inline(base.id());

                            // TODO we can consider displaying some info box that
                            // without wysiwygarea the classic editor may not work.
                        }
                    };

                    function isWysiwygareaAvailable() {
                        // If in development mode, then the wysiwygarea must be available.
                        // Split REV into two strings so builder does not replace it :D.
                        if (CKEDITOR.revision == ( '%RE' + 'V%' )) {
                            return true;
                        }

                        return !!CKEDITOR.plugins.get('wysiwygarea');
                    }

                })();
                initSample();

                CKEDITOR.instances[base.id()].on('change', function() {
                    // console.log(CKEDITOR.instances[base.id()].getData());
                    base(CKEDITOR.instances[base.id()].getData());
                });
                CKEDITOR.instances[base.id()].on( 'fileUploadResponse', function( evt ) {
                    setTimeout(function(){
                        base(CKEDITOR.instances[base.id()].getData());
                    },500);
                });
            });
            // console.dir(base);
            base.subscribe(function (newValue) {
                if(newValue!=CKEDITOR.instances[base.id()].getData()){
                    CKEDITOR.instances[base.id()].setData(newValue);
                }
            });
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