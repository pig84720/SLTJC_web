/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var scaleVal=50,
        setThumbnailOverlayContent=function(){
            $(".thumbnailImgDiv").each(function(){
                var base=this;
                if($( ".thumbnailImgDivCard" ,this).attr('eventFlg')==null){
                    $( ".thumbnailImgDivCard" ,this).css({
                        "width": $('img',base).width()+'px',
                        "height": $('img',base).height()+'px',
                        "opacity": 0.8,
                        "color":"white",
                        "background-color":'black',
                        'padding':'5px',
                        "left":$(base).width()>=$('img',base).width()*2?($(base).width()/2-$('img',base).width())/2+'px':($(base).width()-$('img',base).width())/2+'px',
                        "top":$(base).height()>0 && $(base).height()>=$('img',base).height()?($(base).height()-$('img',base).height())/2+'px':'0px',
                        'position':'absolute',
                        // 'z-index':'1',
                        'display':'none'
                    }).attr('eventFlg','Y').mouseleave(function(){
                        // console.log('mouseleave');
                        if($( ".thumbnailImgDivCard" ,this).html()!=''){
                            $(this).animate({
                                "opacity": 0.0,
                                "margin-left": (scaleVal/2)+'px',
                                "margin-top": (scaleVal/2)+'px',
                                "width": ($('img',base).width()-scaleVal)+'px',
                                "height": ($('img',base).height()-scaleVal)+'px'
                            }, 500, function() {
                                $(this).css('display','none');
                            });
                        }
                    });
                    $(this).mouseenter(function(){
                        if($( ".thumbnailImgDivCard" ,this).html()!=''){
                            var base=this;
                            $( ".thumbnailImgDivCard" ,this).css({
                                "width": ($('img',base).width()-scaleVal)+'px',
                                "height": ($('img',base).height()-scaleVal)+'px',
                                "margin-left": (scaleVal/2)+'px',
                                "margin-top": (scaleVal/2)+'px',
                                "left":$(base).width()>=$('img',base).width()*2?($(base).width()/2-$('img',base).width())/2+'px':($(base).width()-$('img',base).width())/2+'px',
                                "top":$(base).height()>0 && $(base).height()>=$('img',base).height()?($(base).height()-$('img',base).height())/2+'px':'0px',
                                "opacity": 0.0,
                                'display':''
                            });
                            $( ".carOverlay" ,this).css({
                                "margin-top":$('img',base).height()>0 && $('img',base).height()>$('.carOverlay',base).height()?(($('img',base).height()-$('.carOverlay',base).height())/2-10)+'px':'0px'
                            });
                            $( ".thumbnailImgDivCard" ,this).animate({
                                "opacity": 0.8,
                                "margin-left": '0px',
                                "margin-top": '0px',
                                "width": $('img',base).width()+'px',
                                "height": $('img',base).height()+'px'
                            }, 500, function() {
                                // Animation complete.
                            });
                        }
                    });
                }

            });
        };
    return {
        init: function (id, vm) {
            setThumbnailOverlayContent();
        },
        setThumbnailOverlayContent:setThumbnailOverlayContent
    };
});