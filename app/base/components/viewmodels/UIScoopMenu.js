/**
 * Created by jerryhuang on 15/7/29.
 */
define(function (require) {
    var common = require('Common'),
        modelToViewModel = require('ModelToViewModel'),
        generateMenuHtml = function (menuData, menuItem, topMenuFlg) {
            var menuList = $.grep(menuData, function (row) {
                    return menuItem.id == row.parentId;
                }),
                childMenu = '',
                menuHtml = '';
            if (topMenuFlg == true) {
                menuHtml = '<li  class="icons">' + '\n' +
                    '<a href="javascript:void(0)" menuId="' + menuItem.id + '">' + '\n' +
                    '<i class="fa ' + (menuItem.iconCls == '' ? SS.default.menu.icon : menuItem.iconCls) + '" aria-hidden="true"></i>' + '\n' +
                    (menuItem.badgeText == '' ? '' : '<span class="scoop-badge ' + menuItem.badgeCls + '" >' + menuItem.badgeText + '</span>' + '\n') +
                    '</a>' + '\n';
            } else {
                menuHtml = '<li class="' + (menuList.length > 0 ? 'scoop-hasmenu' : '') + '">' + '\n' +
                    '<a href="javascript:' + (menuItem.type != 'folder' ? '$(\'.scoop-inner-content\').click();' : 'void(0)') + '" menuId="' + menuItem.id + '">' + '\n' +
                    '<span class="scoop-micon">' + '\n' +
                    '<i class="' + (menuItem.iconCls == '' ? SS.default.menu.icon : menuItem.iconCls) + '" ></i>' + '\n' +
                    '</span>' + '\n' +
                    '<span class="scoop-mtext">' + menuItem.name + '</span>' + '\n' +
                    (menuItem.badgeText == '' ? '' : '<span class="scoop-badge ' + menuItem.badgeCls + '" >' + menuItem.badgeText + '</span>' + '\n') +
                    '<span class="scoop-mcaret"></span>' + '\n' +
                    '</a>' + '\n';
            }
            if (menuList.length > 0 && topMenuFlg == false) {
                for (var i = 0; i < menuList.length; i++) {
                    var itemHtml = generateMenuHtml(menuData, menuList[i], topMenuFlg);
                    childMenu += itemHtml;
                }
                menuHtml += '<ul class="scoop-submenu">' + '\n';
                menuHtml += childMenu;
                menuHtml += '</ul>' + '\n';
            }
            if (topMenuFlg == false) {
                if (menuItem.parentId == '' && menuList.length == 0 && menuItem.type == 'folder') {
                    return '';
                } else {
                    return menuHtml;
                }
            } else {
                return menuHtml;
            }
        },
        getMenuHtml = function (menuData, topMenuFlg) {
            var topMenu = $.grep(menuData, function (row) {
                    return row.parentId == '';
                }),
                menuList = (topMenuFlg == true ? '<ul>' : '<ul class="scoop-item scoop-left-item">') + '\n';
            for (var i = 0; i < topMenu.length; i++) {
                var itemHtml = generateMenuHtml(menuData, topMenu[i], topMenuFlg);
                if (itemHtml != '') {
                    menuList += itemHtml;
                }
            }
            menuList += '</ul>' + '\n';
            return menuList;
        };
    require('scoop');


    if (!$('#scoopMenuCss')[0]) {
        common.loadCss([
            {
                id: 'scoopMenuGoogleFontCss',
                uri: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700,800'
            },
            {
                id: 'scoopMenuFontAwesomeCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/font-awesome.min.css'
            },
            {
                id: 'scoopMenuLinearIconsCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/linearicons.css'
            },
            {
                id: 'scoopMenuSimpleLineIconsCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/simple-line-icons.css'
            },
            {
                id: 'scoopMenuFontIonIconsCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/ionicons.css'
            },
            {
                id: 'scoopMenuCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/scoop-vertical.css'
            },
            {
                id: 'scoopMenuMCustomScrollbarCss',
                uri: SS.app.baseUrl + 'app/base/components/resources/scripts/scoop/css/jquery.mCustomScrollbar.css'
            }
        ]);
    }
    var initialMenu = function (vm) {
            if ($('#' + vm.viewModel.id())[0] == null) {
                setTimeout(function () {
                    initialMenu(vm);
                }, 300);
                return;
            }
            $('#' + vm.viewModel.id()).scoopmenu({
                themelayout: 'vertical',
                verticalMenuplacement: 'left', // value should be left/right
                verticalMenulayout: 'wide', // value should be wide/box/widebox
                MenuTrigger: 'click',
                SubMenuTrigger: 'click',
                activeMenuClass: 'active',
                ThemeBackgroundPattern: 'pattern6',
                HeaderBackground: 'theme2',
                LHeaderBackground: 'theme8',
                NavbarBackground: 'theme8',
                ActiveItemBackground: 'theme8',
                SubItemBackground: 'theme8',
                ActiveItemStyle: 'style1',
                ItemBorder: true,
                ItemBorderStyle: 'solid',
                SubItemBorder: true,
                DropDownIconStyle: 'style1', // Value should be style1,style2,style3
                FixedNavbarPosition: false,
                FixedHeaderPosition: false,
                collapseVerticalLeftHeader: false,
                VerticalSubMenuItemIconStyle: 'style6', // value should be style1,style2,style3,style4,style5,style6
                VerticalNavigationView: 'view1',
                verticalMenueffect: {
                    desktop: "shrink",
                    tablet: "push",
                    phone: "overlay",
                },
                defaultVerticalMenu: {
                    desktop: "expanded", // value should be offcanvas/collapsed/expanded/compact/compact-acc/fullpage/ex-popover/sub-expanded
                    tablet: "collapsed", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
                    phone: "offcanvas", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
                },
                onToggleVerticalMenu: {
                    desktop: "collapsed", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
                    tablet: "expanded", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
                    phone: "expanded", // value should be offcanvas/collapsed/expanded/compact/fullpage/ex-popover/sub-expanded
                }
            });
            vm.viewModel.isInitial(true);
            viewModel.menuSection.session(vm.viewModel.sessionData());
        },
        routeToProgram = function (data, base) {
            if (data.url == '' || data.url == '#') return;
            switch (data.type) {
                case 'program':
                    // console.log(data.url);
                    var tab = {
                        id: data.id,
                        content: '<div>' +
                        '<div class="rt01pagitem ' + data.id + 'Title">' + data.name +
                        '<button type="button" class="btn btn-default btn-xs" style="position: relative;left: 11px;" tabProgramId="' + data.id + '">' +
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                        '</button>' +
                        '</div>' +
                        '<iframe class="programTabFrame" src="' + base.syncQueryString() + '&targetPage=' + data.url + '" width="100%" frameborder="0" scrolling="yes"></iframe>' +
                        '</div>'
                    };
                    viewModel.menuSection.rubyTabs.addTab(tab);
                    break;
                case 'component':
                    var tab = {
                        id: data.id,
                        content: '<div id="' + data.id + 'Component' + '">' +
                        '<div class="rt01pagitem ' + data.id + 'Title">' + data.name +
                        '<button type="button" class="btn btn-default btn-xs" style="position: relative;left: 11px;" tabProgramId="' + data.id + '">' +
                        '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>' +
                        '</button>' +
                        '</div>' +
                        '<form class="block clearfix">' +
                        '<div data-bind="' +
                        'component: {' +
                        'name: \'' + data.url + '\', ' +
                        'params: {' +
                        'viewModel: menuSection.session, ' +
                        'userId: menuSection.session().ACCOUNT, ' +
                        'programId: \'' + data.id + '\', ' +
                        'programName: \'' + data.name + '\' ' +
                        '}}" >' +
                        '</form>' +
                        '</div>' +
                        '</div>'
                    };
                    var tabs = $.grep(viewModel.menuSection.rubyTabs.tabsData(), function (row, i) {
                        return row.id == data.id;
                    });
                    viewModel.menuSection.rubyTabs.addTab(tab);
                    if (tabs.length == 0) {
                        ko.applyBindings(viewModel, $('#' + data.id + 'Component')[0]);
                    }
                    break;
                case 'custom':
                    break;
            }
        };

    var model = {
        init: function (id, vm) {
            var base = vm.viewModel;
            base.isBinded.subscribe(function (newValue) {
                if (newValue == true) {
                    var menuHtml = getMenuHtml(base.menuData(), false),
                        topLeftMenu = $.grep(base.titleMenuData(), function (row) {
                            return row.position == 'rl';
                        }),
                        topRightMenu = $.grep(base.titleMenuData(), function (row) {
                            return row.position == 'rr';
                        }),
                        topLeftMenuHtml = topLeftMenu.length == 0 ? '' : getMenuHtml(topLeftMenu, true),
                        topRightMenuHtml = topRightMenu.length == 0 ? '' : getMenuHtml(topRightMenu, true),
                        bindMenu = function (baseData) {
                            if ($('#' + baseData.id())[0] == null) {
                                setTimeout(function () {
                                    bindMenu(baseData);
                                }, 100);
                                return;
                            }
                            $('#' + base.id() + ' .scoop-inner-navbar').html(menuHtml);
                            $('#' + base.id() + ' .scoop-rl-header').html(topLeftMenuHtml);
                            $('#' + base.id() + ' .scoop-rr-header').html(topRightMenuHtml);
                            $('#' + base.id() + ' .sidebar_toggle a').unbind('click');
                            initialMenu(vm);

                            setTimeout(function () {
                                $('#' + base.id() + ' ul li a').click(function () {
                                    var menuId = $(this).attr('menuId'),
                                        menuItem = $.grep(base.menuData(), function (row) {
                                            return row.id == menuId;
                                        }),
                                        topMenuItem = $.grep(base.titleMenuData(), function (row) {
                                            return row.id == menuId;
                                        });
                                    if (menuItem.length > 0) {
                                        //if menu program component=dashboard component the goto dashboard tab
                                        if (menuItem[0].url == base.dashboardComponent()) {
                                            viewModel.menuSection.rubyTabs.addTab('dashboard');
                                        } else {
                                            routeToProgram(menuItem[0], base);
                                        }
                                        if (base.callback) {
                                            base.callback(menuItem[0]);
                                        }
                                    }
                                    // console.log(topMenuItem);
                                    if (topMenuItem.length > 0) {
                                        routeToProgram(topMenuItem[0], base);
                                        if (base.callback) {
                                            base.callback(topMenuItem[0]);
                                        }
                                    }
                                });
                            }, 500);
                        };
                    bindMenu(base);
                    bindDashboard();
                    base.isBinded(false);
                }
            });
            base.sessionData.subscribe(function (newValue) {
                viewModel.menuSection.session(base.sessionData());
            });
            base.dashboard.subscribe(function (newValue) {
                viewModel.menuSection.rubyTabs.dashboard(base.dashboard());
            });
            viewModel.menuSection.rubyTabs.dashboard(base.dashboard());

            var bindDashboard = function () {
                if ($('.rubyDashboard')[0] == null) {
                    setTimeout(function () {
                        bindDashboard();
                    }, 100);
                    return;
                }
                if (base.dashboardComponent() != '') {
                    var menuItem = $.grep(base.menuData(), function (row) {
                        return row.id == base.dashboardComponent().replace('pgm-', '');
                    });
                    $('.rubyDashboard').html(
                        '<div class="' + base.dashboardComponent() + '">' +
                        '<form class="block clearfix">' +
                        '<div data-bind="component: {' +
                        'name: \'' + base.dashboardComponent() + '\', ' +
                        'params: {viewModel: menuSection.session, ' +
                        'userId: menuSection.session().ACCOUNT, ' +
                        'programId: \'' + base.dashboardComponent().replace('pgm-', '') + '\', ' +
                        'programName: \'' + (menuItem.length == 0 ? '' : menuItem[0].name) + '\' ' +
                        '}}" >' +
                        '</form>' +
                        '</div>'
                    );
                    ko.applyBindings(viewModel, $('.' + base.dashboardComponent())[0]);
                }
            };
            base.dashboardComponent.subscribe(function (newValue) {
                if (newValue != '') {
                    bindDashboard();
                }
            });
            if (base.dashboardComponent() != '') {
                setTimeout(function () {
                    bindDashboard();
                }, 500);
            }
            initialMenu(vm);
        },
        menuSection: {
            type: 'section',
            menuData: [],
            rubyTabs: {
                id: 'rubyTabsIndex',
                cls: 'rt01round rt01flatbox',
                tabsData: [],
                addTab: '',
                removeTab: '',
                dashboard: '',
                isInitial: false
            },
            session: '',
            rootComponentViewModel: {}
        }
    };
    var viewModel = modelToViewModel.generateViewModel(model);
    return viewModel;
});
