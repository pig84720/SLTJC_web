/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    var onPlayerReady = function (event) {
        event.target.mute();
    };

    var onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            var setting = getYoutubeSettingFromId($(event.target.a).attr('id'));
            if (setting) {
                if (setting.playIndex() + 1 > setting.filmList().length - 1) {
                    setting.playIndex(0)
                } else {
                    setting.playIndex(setting.playIndex() + 1)
                }
                setting.player.loadVideoById(setting.filmList()[setting.playIndex()])
                setting.player.playVideo();
            }
        }
    };


    var youtubePlayerSetting = [],
        getYoutubeSettingFromId = function (id) {
            if (youtubePlayerSetting.length > 0) {
                var setting = $.grep(youtubePlayerSetting, function (item, index) {
                    return item.id() == id;
                });
            }
            return setting.length > 0 ? setting[0] : null;
        };

    function onYouTubeIframeAPIReady(vm) {
        if (window.YT) {
            if (window.YT.Player) {
                viewModel.initialPlayer(vm);
            } else {
                setTimeout(function () {
                    onYouTubeIframeAPIReady(vm);
                }, 500);
            }
        } else {
            setTimeout(function () {
                onYouTubeIframeAPIReady(vm);
            }, 500);
        }
    }

    var modelToViewModel = require('ModelToViewModel'),
        model = {
            init: function (id, vm) {
                youtubePlayerSetting.push(vm.viewModel);
                setTimeout(function () {
                    onYouTubeIframeAPIReady(vm.viewModel);
                }, 500);
            },
            initialPlayer: function (viewModel) {
                // console.log(viewModel.width());
                var player = new YT.Player(viewModel.id(), {
                    playerVars: viewModel.playerVars(),
                    height: viewModel.height(),
                    width: viewModel.width(),
                    videoId: viewModel.filmList()[viewModel.playIndex()],
                    events: {
                        'onReady': onPlayerReady,
                        'onStateChange': onPlayerStateChange
                    }
                });
                var setting = getYoutubeSettingFromId(viewModel.id());
                setting['player'] = player;
            }
        };
    var viewModel = modelToViewModel.generateViewModel(model);

    return viewModel;
});