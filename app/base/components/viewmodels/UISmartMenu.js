/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    require('jquery.bootstrap-autohidingnavbar');
    require('jquery.smartmenus');

    //var smartMenu = require('SmartMenu'),
    //將原本引入的功能改到元件內部處理
    var bsSmartMenu = function () {
        $(function () {
            var s = $("ul.navbar-nav:not([data-sm-skip])");
            s.each(function () {
                function s() {
                    var t = i.getViewportWidth();
                    t != a && (i.isCollapsible() ? (e.addClass("sm-collapsible"), e.is("[data-sm-skip-collapsible-behavior]") || o.addClass("navbar-toggle sub-arrow")) : (e.removeClass("sm-collapsible"), e.is("[data-sm-skip-collapsible-behavior]") || o.removeClass("navbar-toggle sub-arrow")), a = t)
                }

                var e = $(this);
                e.addClass("sm").smartmenus({
                    subMenusSubOffsetX: 2,
                    subMenusSubOffsetY: -6,
                    subIndicators: !1,
                    collapsibleShowFunction: null,
                    collapsibleHideFunction: null,
                    rightToLeftSubMenus: e.hasClass("navbar-right"),
                    bottomToTopSubMenus: e.closest(".navbar").hasClass("navbar-fixed-bottom")
                }).bind({
                    "show.smapi": function (s, e) {
                        var i = $(e), a = i.dataSM("scroll-arrows");
                        a && a.css("background-color", $(document.body).css("background-color")), i.parent().addClass("open")
                    }, "hide.smapi": function (s, e) {
                        $(e).parent().removeClass("open")
                    }
                }).find("a.current").parent().addClass("active");
                var i = e.data("smartmenus");
                e.is("[data-sm-skip-collapsible-behavior]") && e.bind({
                    "click.smapi": function (s, e) {
                        if (i.isCollapsible()) {
                            var a = $(e), o = a.parent().dataSM("sub");
                            if (o && o.dataSM("shown-before") && o.is(":visible")) return i.itemActivate(a), i.menuHide(o), !1
                        }
                    }
                });
                var a, o = e.find(".caret");
                s(), $(window).bind("resize.smartmenus" + i.rootId, s)
            })
        }), $.SmartMenus.prototype.isCollapsible = function () {
            return "left" != this.$firstLink.parent().css("float")
        }
    };
    var common = require('Common'),
        noTab = false;
    var generateMenu = function ($root, treeViewModel) {
        // console.log(treeViewModel);
        noTab = treeViewModel.noTab();
        menuCount = 0;  //增加重設menu編號處理
        if (treeViewModel.treeLevelLeft != null) {
            generateFolder($root, treeViewModel.treeLevelLeft(), 'L');
            menuCount = 0;
            generateFolder($root, treeViewModel.treeLevelRight(), 'R');
        } else {
            generateFolder($root, treeViewModel());
        }
        var nowTab, prevTab,
            openWin = {},
            returnData = {},
            getMenuData = function (data, programId) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == programId) {
                        returnData = data[i];
                        break;
                    }
                    if (data[i].childNodes && data[i].childNodes.length > 0) {
                        getMenuData(data[i].childNodes, programId);
                    }
                }
            };
        $('.folderLink').on('click', function () {
            var programId = $(this).attr('programId'),
                menuPos = $(this).attr('pos'),
                menuData = menuPos == 'L' ? treeViewModel.treeLevelLeft() : treeViewModel.treeLevelRight();
            if (treeViewModel.callback == null) {
                if ($(this).attr('targetHref') != '#') {
                    var openFlg = 'N';
                    if (openWin[programId] != null) {
                        if (openWin[programId].closed) {
                            openFlg = 'Y';
                            openWin[programId] = null;
                        } else {
                            openWin[programId].focus();
                        }
                    } else {
                        openFlg = 'Y';
                    }
                    if (openFlg == 'Y' || $(this).attr('noTab') == 'Y') {
                        var openWindow = window.open($(this).attr('targetHref'), '_' + $(this).attr('openTarget'), '');
                        openWin[$(this).attr('programId')] = openWindow;
                    }
                }
            } else {
                returnData = {};
                getMenuData(menuData, programId);
                if (treeViewModel.callback) {
                    treeViewModel.callback(returnData);
                }
            }
        });
        $('.programLink').on('click', function () {
            var wh = common.getWH(''),
                programId = $(this).attr('programId'),
                menuPos = $(this).attr('pos'),
                menuData = menuPos == 'L' ? treeViewModel.treeLevelLeft() : treeViewModel.treeLevelRight();
            if (treeViewModel.callback == null) {
                if ($('.' + programId)[0] == null || $(this).attr('noTab') == 'Y') {
                    if ($(this).attr('openTarget') == 'self' && $(this).attr('targetHref') != '#') {
                        // console.log(programId);
                        var openFlg = 'N';
                        if (openWin[programId] != null) {
                            if (openWin[programId].closed) {
                                openFlg = 'Y';
                                openWin[programId] = null;
                            } else {
                                openWin[programId].focus();
                            }
                        } else {
                            openFlg = 'Y';
                        }
                        if (openFlg == 'Y' || $(this).attr('noTab') == 'Y') {
                            var openWindow = window.open($(this).attr('targetHref'), '_self', '');
                            openWin[$(this).attr('programId')] = openWindow;
                        }
                        return false;
                    } else {
                        if ($(this).attr('openTarget') == 'blank' && $(this).attr('targetHref') != '#') {
                            var openFlg = 'N';
                            if (openWin[programId] != null) {
                                if (openWin[programId].closed) {
                                    openFlg = 'Y';
                                    openWin[programId] = null;
                                } else {
                                    openWin[programId].focus();
                                }
                            } else {
                                openFlg = 'Y';
                            }
                            if (openFlg == 'Y' || $(this).attr('noTab') == 'Y') {
                                var openWindow = window.open($(this).attr('targetHref'), '_blank', '');
                                openWin[$(this).attr('programId')] = openWindow;
                            }
                            return false;
                        } else {
                            // create the tab
                            $('<li>' +
                                '<a href="#' + $(this).attr('programId') + '" class="' + $(this).attr('programId') + '" data-toggle="tab" style="padding:5px 8px;">' +
                                $(this).html() + '</a>' +
                                '</li>').appendTo('#tabs');

                            // create the tab content
                            $('<div class="tab-pane" id="' + $(this).attr('programId') + '">' +
                                '<iframe ' +
                                'src="' + ($(this).attr('targetHref') != '#' ? $(this).attr('targetHref') : 'http://www.mobile01.com') + '" ' +
                                'width="100%" ' +
                                'height="' + (parseInt(wh.height) - 87) + '" ' +
                                'scrolling="yes" ' +
                                'frameborder="0">' +
                                '</iframe> ' +
                                '</div>').appendTo('.tab-content');

                            // make the new tab active
                            $('#tabs a:last').tab('show').on('shown.bs.tab', function (e) {
                                nowTab = e.target; // newly activated tab
                                prevTab = e.relatedTarget; // previous active tab
                                nowTab = $('.' + nowTab.hash.replace('#', ''));
                                if (prevTab != null) {
                                    prevTab = $('.' + prevTab.hash.replace('#', ''));
                                }
                            });

                            nowTab = $('#tabs a:last');
                            return false;
                        }

                    }
                } else {
                    $('.' + $(this).attr('programId')).tab('show');
                    return false;
                }

            } else {
                returnData = {};
                getMenuData(menuData, programId);
                if (treeViewModel.callback) {
                    treeViewModel.callback(returnData);
                }
            }
            //console.log(($('.navbar-toggle')[0] != null));
            if ($('.navbar-toggle')[0] != null) {
                if ($('.navbar-toggle').css('display') != 'none') {
                    $('.navbar-toggle').click();
                }
            }
            // console.log(treeViewModel);
        });
        $('.closeTab').on('click', function () {
            if (nowTab) {
                $(nowTab.attr('href')).remove();
                nowTab.remove();
                $('#tabs a:last').tab('show');
            }
            //nowTab = $('#tabs a:last');
        });
    };
    var menuCount = 0;
    var generateFolder = function ($root, rootNode, pos) {
        // console.log($root);
        // console.log(rootNode);
        var ul = $('<ul class="' + (menuCount == 0 ? (pos == 'R' ? 'nav navbar-nav navbar-right' : 'nav navbar-nav') : 'dropdown-menu') + '"></ul>');
        menuCount++;
        for (var i = 0; i < rootNode.length; i++) {
            var node = rootNode[i];
            var li = $('<li></li>');
            li.append(
                '<a ' +
                'class="' + (node.childNodes != null ? 'folderLink' : 'programLink') + (menuCount == 1 && i > 0 ? ' repeaterMenuButton' : '') + (menuCount == 1 ? ' topMenuButton' : '') + '" ' +
                'programId="' + node.id + '" ' +
                'href="#" ' +
                'targetHref="' + node.url + '" ' +
                'noTab="' + (noTab == true ? 'Y' : 'N') + '" ' +
                'pos="' + pos + '" ' +
                'openTarget="' + node.target + '">' +
                (node.childNodes != null || pos != null ? '' : node.id + ' ') + node.name +
                (node.childNodes != null ? '<span class="caret"></span></a>' : ''));
            if (node.childNodes) {
                generateFolder(li, node.childNodes, pos);
                menuCount = 1;
            }

            ul.append(li);
        }
        $root.append(ul);
    };


    return {
        init: function (id, vm) {
            var base = vm.viewModel;
            generateMenu($('.navbar-collapse'), base);
            //用此種require的引入方式，可以延遲引入時間
            // require(['jquery.smartmenus.bootstrap'], function () {
            // });
            bsSmartMenu();
            $("div .navbar-fixed-top").autoHidingNavbar();
            //$('div .navbar-fixed-top').autoHidingNavbar('hide');
            if (base.isBinded) {
                base.isBinded.subscribe(function (newValue) {
                    if (newValue == true) {
                        $('ul', '.navbar-collapse').remove();
                        generateMenu($('.navbar-collapse'), base);
                        bsSmartMenu();
                        base.isBinded(false);
                    }
                });
            }
        }
    };
});