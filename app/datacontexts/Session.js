/**
 * Created by jerryhuang on 15/9/2.
 */
define(function (require) {
    var $jstorage;
    var secureData = require('SecureData');
    secureData.setServerInfo(SS.portal.serverInfo);
    secureData.setSSApiBsaeUrl(SS.ssapi.url);

    return {
        getSession: function (i) {
            //console.log($.jStorage);
            $jstorage = $.jStorage;
            var dtd1 = new $.Deferred(),
                getSeeeionFlg = false;

            try {
                if ($jstorage.get($.trim(i.userId) + '-' + $.trim(i.programId)) != null) {
                    setTimeout(function () {
                        $.jStorage = $.jStorage || $jstorage;
                        dtd1.resolve($.jStorage.get($.trim(i.userId) + '-' + $.trim(i.programId)));
                    }, 50);
                    getSeeeionFlg = true;
                } else {
                    if ($.jStorage.get($.trim(i.userId) + '-' + $.trim(i.sysCd)) != null) {
                        var sysSessionData = $.jStorage.get($.trim(i.userId) + '-' + $.trim(i.sysCd));
                        var sessionData = $.grep(sysSessionData, function (row, index) {
                            return ($.trim(row.PROGID) == $.trim(i.programId));
                        });
                        if (sessionData[0] != null) {
                            setTimeout(function () {
                                $.jStorage = $.jStorage || $jstorage;
                                dtd1.resolve(sessionData[0]);
                            }, 50);
                            getSeeeionFlg = true;
                        } else {
                            getSeeeionFlg = false;
                        }
                    } else {
                        getSeeeionFlg = false;
                    }
                }
            } catch (e) {
                getSeeeionFlg = false;
            }

            if (getSeeeionFlg == false) {
                secureData.exeSPRetB({
                    SPNM: 'SP_SESSION',
                    PARMS: [
                        i.userId,
                        '',
                        i.sysCd
                    ]
                }).done(function (data) {
                    //console.log(data);
                    $.jStorage = $.jStorage || $jstorage;
                    if (data.MESSAGE != '') {
                        dtd1.reject('??????Session???????????????????????????????????????' + data.MESSAGE);
                    } else if (data.DATA.Table1 == null) {
                        dtd1.reject('??????Session???????????????????????????Session????????????');
                    } else {
                        $.jStorage.set($.trim(i.userId) + '-' + $.trim(i.sysCd), data.DATA.Table1, {TTL: 24 * 60 * 60 * 1000});
                        //console.log(data.DATA.Table1);
                        var sessionData = $.grep(data.DATA.Table1, function (row, index) {
                            return ($.trim(row.PROGID) == $.trim(i.programId));
                        });
                        $.jStorage.set($.trim(i.userId) + '-' + $.trim(i.programId), sessionData[0], {TTL: 24 * 60 * 60 * 1000});
                        dtd1.resolve(sessionData[0]);
                    }
                }).fail(function () {
                    //console.log('fail');
                    $.jStorage = $.jStorage || $jstorage;
                    dtd1.reject('????????????Session??????????????????????????????????????????????????????');
                });
            }
            return dtd1.promise();
        }
    };
});