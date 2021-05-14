/**
 * Created by jerryhuang on 15/7/29.
 */

define(function (require) {
    require('jquery.signalR');
    var common = require('Common');
    common.loadScript([{uri: SS.signalR.url + 'signalr/hubs', id: 'signalrHubs'}]);   //註冊SignalR服務網址
    var messageHub, programId, userName;

    var getClickPosition = function (e) {
            var xPosition = e.pageX;
            var yPosition = e.pageY;
            var wh = common.getWH('');
            var clickPosition = {
                programId: programId,
                x: xPosition,
                y: yPosition,
                width: parseInt(wh.width),
                height: parseInt(wh.height)
            };
            //console.log('Click,' + JSON.stringify(clickPosition));

            $.connection.hub.start().done(function () {
                messageHub.server.sendClickPosition(clickPosition);
            });
        },
        getMovePosition = function (e) {
            var xPosition = e.pageX;
            var yPosition = e.pageY;
            var wh = common.getWH('');
            var movePosition = {
                programId: programId,
                x: xPosition,
                y: yPosition,
                width: parseInt(wh.width),
                height: parseInt(wh.height)
            };
            $.connection.hub.start().done(function () {
                messageHub.server.sendMovePosition(movePosition);
            });
            //console.log('Move,x:' + xPosition + ',y:' + yPosition);
        };
    return {
        init: function (id) {
            programId = id;
            var base = this;
            userName = prompt("請輸入你的姓名！", "");
            setTimeout(function () {
                base.startSignalrService();
                document.addEventListener("click", getClickPosition, false);
                document.addEventListener("mousemove", getMovePosition, false);
            }, 1000);

        },
        startSignalrService: function () {
            console.log('signalR');
            $.connection.hub.logging = true;
            $.connection.hub.url = SS.signalR.url + 'signalr/hubs';
            //建立與Server端的Hub的物件，注意Hub的開頭字母一定要為小寫
            messageHub = $.connection.webWatchHub;

            var chat = messageHub;
            console.log(chat);
            if (chat) {
                //取得所有上線清單
                chat.client.getList = function (userList) {
                    console.dir(userList);
                    //var messageUsers = Ext.data.StoreManager.lookup('messageUsers');
                    //messageUsers.setData([
                    //    {
                    //        text: ' 全部',
                    //        value: ''
                    //    },
                    //    {
                    //        text: ' 寄信給附駕調度中心',
                    //        value: 'MAIL'
                    //    }
                    //]);
                    ////console.dir(userList);
                    //$.each(userList, function (index, data) {
                    //    if (data.user.UserId != (loginInfo != null ? loginInfo.USERID : '')) {
                    //        messageUsers.clearFilter();
                    //        messageUsers.filter([
                    //            {
                    //                filterFn: function (item) {
                    //                    return (
                    //                        item.get("value") == data.id
                    //                    );
                    //                }
                    //            }
                    //        ]);
                    //        if (messageUsers.getCount() == 0) {
                    //            messageUsers.add({
                    //                text: data.user.UserName,
                    //                value: data.id
                    //            });
                    //        }
                    //        messageUsers.clearFilter();
                    //    }
                    //});
                };
                //新增一筆上線人員
                chat.client.addList = function (id, user) {
                    console.log(id);
                    console.log(user);
                    //var messageUsers = Ext.data.StoreManager.lookup('messageUsers');
                    //
                    //messageUsers.clearFilter();
                    //messageUsers.filter([
                    //    {
                    //        filterFn: function (item) {
                    //            return (
                    //                $.trim(item.get("text")) == $.trim(user.UserName)
                    //            );
                    //        }
                    //    }
                    //]);
                    //if (messageUsers.getCount() > 0) {
                    //    messageUsers.removeAt(0);
                    //}
                    //
                    //messageUsers.clearFilter();
                    //messageUsers.filter([
                    //    {
                    //        filterFn: function (item) {
                    //            return (
                    //                item.get("value") == id
                    //            );
                    //        }
                    //    }
                    //]);
                    //if (messageUsers.getCount() == 0) {
                    //    messageUsers.add({
                    //        text: user.UserName,
                    //        value: id
                    //    });
                    //}
                    //messageUsers.clearFilter();
                };

                //自己識別ID
                chat.client.setSelf = function (id, user) {
                    console.log('setSelf:' + id + '/' + JSON.stringify(user));
                    //MessageBoxController.setSelf({
                    //    id: id,
                    //    user: user
                    //});
                };
                //移除一筆上線人員
                chat.client.removeList = function (id) {
                    console.log('removeList:' + id);
                    //var messageUsers = Ext.data.StoreManager.lookup('messageUsers');
                    //messageUsers.clearFilter();
                    //messageUsers.filter([
                    //    {
                    //        filterFn: function (item) {
                    //            return (
                    //                item.get("value") == id
                    //            );
                    //        }
                    //    }
                    //]);
                    //if (messageUsers.getCount() > 0) {
                    //    messageUsers.removeAt(0);
                    //}
                    //messageUsers.clearFilter();
                };

                //全體聊天
                chat.client.sendAllMessge = function (message) {
                    //message.messageTarget = MessageBoxController.getSelf().id;
                    //if (message.messageSender != MessageBoxController.getSelf().id) {
                    //    var messages = Ext.data.StoreManager.lookup('messages');
                    //    messages.add(message);
                    //    console.log(message);
                    //    MessageBoxController.pushLocalNotification(message);
                    //}
                };

                //密語聊天
                chat.client.sendMessage = function (message) {
                    //var messages = Ext.data.StoreManager.lookup('messages');
                    //messages.add(message);
                    //console.log(message);
                    //MessageBoxController.pushLocalNotification(message);
                };

                chat.client.hello = function (message) {
                    //$("#messageList").append("<li>" + message + "</li");
                    console.log('hello');
                    console.log(message);
                };


                //將連線打開
                //$.connection.hub.start({
                //    //transport: "webSockets",
                //    jsonp: true
                //}).done(function () {
                $.connection.hub.start().done(function () {
                    //當連線完成後，呼叫Server端的hello方法，並傳送使用者姓名給Server
                    messageHub.server.userConnected({
                        UserId: userName,
                        UserName: userName
                    });
                });
            }

        }
    };
});