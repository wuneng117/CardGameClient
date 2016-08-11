require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"CardDataManager":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e6a0fazespJfJux/XNXByVt', 'CardDataManager');
// Script\data\CardDataManager.js

var CardData = require('CardData');

var cardDataTest = [["a", 0, 1, 1], ["b", 1, 1, 3], ["c", 1, 2, 1], ["d", 2, 2, 3], ["e", 2, 3, 2], ["f", 2, 4, 1], ["g", 2, 1, 4], ["h", 3, 2, 4], ["i", 3, 5, 1], ["j", 3, 3, 3], ["k", 3, 4, 2], ["l", 4, 3, 5], ["m", 4, 5, 2], ["n", 4, 4, 4], ["o", 4, 2, 6], ["p", 4, 1, 7], ["q", 5, 3, 6], ["r", 5, 4, 5], ["s", 5, 5, 4], ["t", 5, 5, 5], ["u", 5, 6, 2], ["v", 5, 6, 3], ["w", 6, 3, 8], ["x", 6, 4, 6], ["y", 6, 5, 6], ["z", 6, 6, 6], ["A", 6, 6, 5], ["B", 6, 7, 3], ["C", 6, 8, 1], ["D", 7, 7, 7], ["E", 7, 4, 8], ["F", 7, 6, 8], ["G", 7, 7, 7], ["H", 8, 8, 8], ["I", 8, 7, 9], ["J", 8, 9, 6], ["K", 9, 9, 9], ["L", 10, 12, 12]];
cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

    },

    // use this for initialization
    onLoad: function onLoad() {},

    statics: {
        cardMap: {
            "default": {}
        },

        init: function init() {
            for (var i in cardDataTest) {
                var card = new CardData();
                card.cardName = cardDataTest[i][0];
                card.critical = cardDataTest[i][1];
                card.atk = cardDataTest[i][2];
                card.hp = cardDataTest[i][3];
                this.cardMap[card.cardName] = card;
                //cc.log(cardDataTest[i][0],cardDataTest[i][1],cardDataTest[i][2],cardDataTest[i][3]);
            }
        }
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"CardData":"CardData"}],"CardData":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f1d8ebBuPxByrXqgoDlG3bO', 'CardData');
// Script\data\CardData.js

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        cardName: "",
        critical: 0,
        hp: 0,
        atk: 0
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"CardSprite":[function(require,module,exports){
"use strict";
cc._RFpush(module, '09b02/inuNNQrhcmkHMp3n7', 'CardSprite');
// Script\CardSprite.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        _player: null, //Player引用
        _idx: 0, //数组索引

        srcPos: {
            'default': {}
        },

        //-----------------------控件-------------------------------------
        hpLabel: {
            'default': null,
            type: cc.Label
        },

        criticalLabel: {
            'default': null,
            type: cc.Label
        },

        atkLabel: {
            'default': null,
            type: cc.Label
        },

        nameLabel: {
            'default': null,
            type: cc.Label
        }
    },

    setInputControl: function setInputControl() {
        this.node.on('touchstart', function (event) {
            if (!this.isTurnActive()) return;

            this.srcPos.x = this.node.x;
            this.srcPos.y = this.node.y;
            cc.log('srcX:%d', this.srcPos.x);
            cc.log('ParsrcX:%d', this.node.position.x);
        }, this);

        this.node.on('touchmove', function (event) {
            if (!this.isTurnActive()) return;

            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x + moveX, this.srcPos.y + moveY);
            //cc.log('srcX:%d', this.srcPos.x);
            //cc.log('startX:%d',event.getStartLocation().x);
            //cc.log(moveX);
        }, this);

        this.node.on('touchend', function (event) {
            if (!this.isTurnActive()) return;

            var boundBox = this._player.monsterFieldLayout.getBoundingBox();
            var pos = new cc.v2(this.node.x + this.node.parent.x, this.node.y + this.node.parent.y);
            if (boundBox.contains(pos)) {
                this._player.summerMonster(this._idx);
            }

            this.node.setPosition(this.srcPos.x, this.srcPos.y);
        }, this);
    },

    //是否激活
    isTurnActive: function isTurnActive() {
        return this._player.getIsTurnActive();
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.srcPos = { 'x': 0, 'y': 0 };

        this.setInputControl();
    },

    init: function init(card, player, idx) {
        if (card.isHide) {
            this.hpLabel.string = '??';
            this.criticalLabel.string = '??';
            this.atkLabel.string = '??';
            this.nameLabel.string = '??';
        } else {
            this.hpLabel.string = card.hp.toString();
            this.criticalLabel.string = card.critical.toString();
            this.atkLabel.string = card.atk.toString();
            this.nameLabel.string = card.cardName.toString();
        }

        this._player = player;
        this._idx = idx;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"ChatWnd":[function(require,module,exports){
"use strict";
cc._RFpush(module, '546ea++nJBOQoM3uZ+et5r/', 'ChatWnd');
// Script\ChatWnd.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        chatIStrMap: [], //保存聊天字符串数组

        //------------------------------控件------------------------------------

        //滚动区域的content 节点
        content: {
            'default': null,
            type: cc.Node
        },

        //聊天信息 节点
        itemPrefab: {
            'default': null,
            type: cc.Prefab
        },

        //ScrollView
        scrollView: {
            'default': null,
            type: cc.ScrollView
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    addChatItem: function addChatItem(str, color) {
        var content = this.content;

        var chatItem = cc.instantiate(this.itemPrefab);
        if (!chatItem) return;

        var strLabel = chatItem.getChildByName('str');
        if (!strLabel) return;

        //添加ITEM
        chatItem.setPosition(-content.width / 2 + 5, -content.height);
        content.addChild(chatItem);
        //cc.log('content height: %d', content.height);
        strLabel.getComponent('cc.Label').string = str; //写字
        if (color) strLabel.color = color;

        //调整大小，刷新到最下面一页
        content.setContentSize(content.width, content.height + strLabel.height);
        //cc.log('content height: %d, strLabel position: %d', content.height, chatItem.getPositionY());
        if (content.height > 200) this.scrollView.scrollToBottom();
    }
});

cc._RFpop();
},{}],"EventProcess":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'a69b54BOwhM7Zqv84sN4tuP', 'EventProcess');
// Script\NetWork\EventProcess.js

var ERROR_NOERROR = 0;

var LOGIN_ERROR_NOTFOUND = 1;
var LOGIN_ERROR_PASSWORD_ERROR = 2;

var ERROR_ENTERROOM_INROOM = 1;
var ERROR_DUELREADY_ISPLAYING = 1;

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    statics: {
        gameConn: null, //网络连接
        duel: null, //游戏管理

        //设置游戏管理
        setDuel: function setDuel(duel) {
            this.duel = duel;
        },

        //初始化
        init: function init(conn) {
            cc.log('EventProcess 初始化');
            this.gameConn = conn;
            window.WC_ENTERROOM_RESPONSE = 'WC_ENTERROOM_RESPONSE';

            //注册消息处理函数
            this.gameConn.registerHandler('disconnect', this.disconnect.bind(this));
            this.gameConn.registerHandler(WC_CONNECTED, this[WC_CONNECTED].bind(this));
            this.gameConn.registerHandler(WC_LOGIN_RESPONSE, this[WC_LOGIN_RESPONSE].bind(this));
            this.gameConn.registerHandler(WC_ENTERROOM_RESPONSE, this[WC_ENTERROOM_RESPONSE].bind(this));
            this.gameConn.registerHandler(WC_CHAT_ADD_RESPONSE, this[WC_CHAT_ADD_RESPONSE].bind(this));
            this.gameConn.registerHandler(WC_CHAT_ADD, this[WC_CHAT_ADD].bind(this));
            this.gameConn.registerHandler(WC_PLAYER_ADD, this[WC_PLAYER_ADD].bind(this));
            this.gameConn.registerHandler(WC_PLAYER_UPDATE, this[WC_PLAYER_UPDATE].bind(this));
            this.gameConn.registerHandler(WC_DUELREADY_RESPONSE, this[WC_DUELREADY_RESPONSE].bind(this));
            this.gameConn.registerHandler(WC_DUELREADY, this[WC_DUELREADY].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_CREATE, this[WC_HANDCARD_CREATE].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_UPDATE, this[WC_HANDCARD_UPDATE].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_DELETE, this[WC_HANDCARD_DELETE].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_CREATE, this[WC_MONSTER_CREATE].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_UPDATE, this[WC_MONSTER_UPDATE].bind(this));
            this.gameConn.registerHandler(WC_HANDCARD_DELETE, this[WC_MONSTER_DELETE].bind(this));
        },

        //服务器断开连接
        disconnect: function disconnect() {
            this.gameConn.disconnect();
        },

        //连接响应
        WC_CONNECTED: function WC_CONNECTED(param) {
            this.gameConn.connectSuccess(param.idx);
            cc.log('收到服务器连接响应，clientid: %d, name: %s', param.idx, param.name);
        },

        //登录响应
        WC_LOGIN_RESPONSE: function WC_LOGIN_RESPONSE(param) {
            if (param.error == ERROR_NOERROR) {
                this.gameConn.loginSuccess(param.account);
                cc.log("登录成功,error:%d", param.error);
                cc.director.loadScene('helloworld'); //切换到游戏场景
            } else if (param.error == LOGIN_ERROR_PASSWORD_ERROR) {
                    showTipLabel('登录失败，密码错误');
                } else if (param.error == LOGIN_ERROR_NOTFOUND) {
                    showTipLabel('登录失败，账号不存在');
                } else {
                    showTipLabel('登录失败，未知错误');
                }
        },

        //进入房间响应
        WC_ENTERROOM_RESPONSE: function WC_ENTERROOM_RESPONSE(param) {
            var error = param.error;
            if (error == ERROR_ENTERROOM_INROOM) cc.log('您已经进入房间，不可再次进入');else if (error === ERROR_NOERROR) {
                cc.log('成功进入房间');
                this.gameConn.sendPacket(CW_DUELREADY_REQUEST, {}); //直接准备
            }
        },

        //添加聊天信息响应(以后写)
        WC_CHAT_ADD_RESPONSE: function WC_CHAT_ADD_RESPONSE(param) {},

        //服务端发送聊天信息
        WC_CHAT_ADD: function WC_CHAT_ADD(param) {
            if (param.isSystem) this.duel.addChatItem(param.message, cc.Color.RED);else this.duel.addChatItem(param.message);
        },

        //添加完整玩家数据
        WC_PLAYER_ADD: function WC_PLAYER_ADD(param) {
            duel.addPlayer(param);
        },

        //Player更新
        WC_PLAYER_UPDATE: function WC_PLAYER_UPDATE(param) {
            var idx = param.idx;

            var player = this.duel.getPlayer(idx);
            if (!player) return;

            player.unPackData(param);
            var playerSprite = this.duel.getPlayerSpriteByPlayer(idx);
            playerSprite.refresh();
        },

        //准备游戏响应
        WC_DUELREADY_RESPONSE: function WC_DUELREADY_RESPONSE(param) {
            var error = param.error;
            if (error === ERROR_DUELREADY_ISPLAYING) {
                showTipLabel('游戏已经开始了，不能准备', cc.Color.RED);
            } else {
                //第0个玩家控件为玩家自己，设置为玩家IDX
                var playerSprite = this.duel.getPlayerSprte(0);
                playerSprite.setIdx(param.idx);
            }
        },

        //有玩家准备游戏
        WC_DUELREADY: function WC_DUELREADY(param) {
            var idx = param.idx;

            //玩家更新
            var player = this.duel.getPlayer(idx);
            if (!player) return;

            player.unPackData(param);

            //玩家控件更新
            //3种情况
            //1.玩家自己准备，0控件刷新为玩家；
            //2.第一个准备的玩家，1控件刷新为此玩家；
            //3.第二个准备的玩家，0控件刷新为此玩家；
            var playerSprite = this.duel.getPlayerSprte(0);
            var playerSprite1 = this.duel.getPlayerSprite(1);
            if (playerSprite.getIdx() !== idx) {
                if (playerSprite1.getIdx() !== -1) {
                    playerSprite.setIdx(idx);
                } else {
                    playerSprite1.setIdx(idx);
                }
            }

            duel.refreshPlayerSprite(idx);
        },

        WC_HANDCARD_CREATE: function WC_HANDCARD_CREATE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);

            player.createCardToHand(param.param);
        },

        WC_HANDCARD_UPDATE: function WC_HANDCARD_UPDATE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);
            var idx = param.idx;
            player.handCardUpdate(idx);
        },

        WC_HANDCARD_DELETE: function WC_HANDCARD_DELETE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);
            var idx = param.idx;
            player.handCardDelete(idx);
        },

        WC_MONSTER_CREATE: function WC_MONSTER_CREATE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);

            player.createMonster(param.param);
        },

        WC_MONSTER_UPDATE: function WC_MONSTER_UPDATE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);
            var idx = param.idx;
            player.monsterUpdate(idx);
        },

        WC_MONSTER_DELETE: function WC_MONSTER_DELETE(param) {
            var playerIdx = param.playerIdx;
            var player = this.duel.getPlayer(playerIdx);
            var idx = param.idx;
            player.monsterDelete(idx);
        }

    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"GameConn":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'f3a08ekZMVGLqJr4yb6+Fpo', 'GameConn');
// Script\NetWork\GameConn.js

//网络连接单例
var EventProcess = require('EventProcess');

var CLIENT_STATE_DISCONNECT = -1;
var CLIENT_STATE_GUIDE = 0;
var CLIENT_STATE_LOGININ = 1;
var CLIENT_STATE_DISBAND = 2;

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    //account结构
    //function Account(account, password){
    //    this.account = account;
    //    this.password = password;
    //}

    statics: {
        socket: null, //socket.io连接
        clientId: -1, //连接编号
        account: null, //服务器传回来的账号信息
        state: CLIENT_STATE_DISCONNECT, //账号状态

        //初始化SOCKETIO
        init: function init() {
            if (cc.sys.isNative) {
                window.io = SocketIO;
            } else {
                window.io = require('socket.io');
            }
        },

        //连接服务器
        connectToServer: function connectToServer() {
            if (this.socket || this.state !== CLIENT_STATE_DISCONNECT) {
                cc.log('已经与服务器建立连接，不要重复连接');
                return;
            }

            this.socket = window.io('http://localhost:3000');
            EventProcess.init(this);
        },

        //服务器连接成功
        connectSuccess: function connectSuccess(idx) {
            this.setClientId(idx);
            this.state = CLIENT_STATE_GUIDE;
        },

        //账号登录
        login: function login(account, password) {
            if (!this.socket || this.state === CLIENT_STATE_DISCONNECT) {
                cc.log("服务器根本没有连上……无法登录");
                return;
            }

            if (this.state === CLIENT_STATE_LOGININ) {
                cc.log('已经登录账号，请不要重复登录');
                return;
            }

            if (this.state === CLIENT_STATE_DISBAND) {
                cc.log('您已被服务器ban,无法登录');
                return;
            }

            cc.log("准备账号登录，账号为：%s, 密码：%s", account, password);
            this.socket.emit(CW_LOGIN_REQUEST, { 'AccountName': account, 'password': password });
        },

        //登录成功
        loginSuccess: function loginSuccess(account) {
            this.account = account;
            this.state = CLIENT_STATE_LOGININ;
        },

        //给客户端发送消息
        sendPacket: function sendPacket(msgID, param) {
            this.socket.emit(msgID, param);
        },

        //注册服务器事件函数
        registerHandler: function registerHandler(msgID, func) {
            this.socket.on(msgID, func);
        },

        //服务器断开连接事件
        disconnect: function disconnect() {
            console.log('server disconnected, my idx:', this.clientId);

            //初始化
            //this.socket = null;
            this.clientId = -1;
            this.account = null;
            this.state = CLIENT_STATE_DISCONNECT;

            //如果在战斗中，进行一些其他处理
        },

        //设置clientId
        setClientId: function setClientId(idx) {
            this.clientId = idx;
        },

        //获取账号名字
        getAccountName: function getAccountName() {
            if (this.account) return this.account.account;else return null;
        }

    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"EventProcess":"EventProcess","socket.io":"socket.io"}],"HelloWorld":[function(require,module,exports){
"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script\HelloWorld.js

var CardDataManager = require('./data/CardDataManager');

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        CardDataManager.init();
    },

    // called every frame
    update: function update(dt) {}
});

cc._RFpop();
},{"./data/CardDataManager":"CardDataManager"}],"LoginScene":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'fb4310EDh9JbpCf/QxiKfbA', 'LoginScene');
// Script\LoginScene.js

//登录界面默认脚本
require('type');
var GameConn = require('./NetWork/GameConn');

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        //-----------------------控件-------------------------------------------
        account_Editbox: {
            'default': null,
            type: cc.EditBox
        },

        password_Editbox: {
            'default': null,
            type: cc.EditBox
        }
    },

    // use this for initialization
    onLoad: function onLoad() {
        GameConn.init();
        GameConn.connectToServer();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    //登录按钮   
    login_BtnEvent: function login_BtnEvent(event) {
        var account = this.account_Editbox.string;
        if (account === '') {
            showTipLabel("账号不能为空", cc.Color.RED);
            return;
        }

        var password = this.password_Editbox.string;
        if (password === '') {
            showTipLabel("密码不能为空", cc.Color.RED);
            return;
        }

        cc.log("account: %s, password: %s", account, password);
        GameConn.login(account, password);
    }

});

cc._RFpop();
},{"./NetWork/GameConn":"GameConn","type":"type"}],"MonsterSprite":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'd7da4aqBnpKrrTK2h6PbR52', 'MonsterSprite');
// Script\MonsterSprite.js

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        srcPos: {
            'default': {}
        },

        _player: null, //Player引用
        _idx: 0, //数组索引

        //-----------------------控件-------------------------------------
        hpLabel: {
            'default': null,
            type: cc.Label
        },

        atkLabel: {
            'default': null,
            type: cc.Label
        },

        nameLabel: {
            'default': null,
            type: cc.Label
        }
    },

    setInputControl: function setInputControl() {
        this.node.on('touchstart', function (event) {
            cc.log(this.isAtked());
            if (!this.isTurnActive() || this.isAtked()) return;

            this.srcPos.x = this.node.x;
            this.srcPos.y = this.node.y;
            //cc.log('srcX:%d', this.srcPos.x);
        }, this);

        this.node.on('touchmove', function (event) {
            if (!this.isTurnActive() || this.isAtked()) return;

            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x + moveX, this.srcPos.y + moveY);
            //cc.log('srcX:%d', this.srcPos.x);
            //cc.log('startX:%d',event.getStartLocation().x);
            //cc.log(moveX);
        }, this);

        this.node.on('touchend', function (event) {
            if (!this.isTurnActive() || this.isAtked()) return;

            var player = this._player;
            var duel = player.duel;
            var opponentPlayer = this.getPlayerSprite(1);
            //var opponentPlayer = player;
            var boundBox, pos, oppoAddX, oppoAddY;

            //判断是否移动到对方英雄上
            boundBox = opponentPlayer.heroIconSprite.node.getBoundingBox();
            oppoAddY = player.monsterFieldLayout.x + player.node.x - opponentPlayer.node.x;
            oppoAddY = player.monsterFieldLayout.y + player.node.y - opponentPlayer.node.y;
            pos = new cc.v2(this.node.x + oppoAddX, this.node.y + oppoAddY);
            if (boundBox.contains(pos)) {
                duel.monsterAtkPlayer(this._idx, opponentPlayer.getIdx()); //攻击玩家
                this.resetPosToSrc();
                return;
            }

            //判断是否移动到对方随从上
            var monsterSpriteArray = opponentPlayer.monsterSpriteArray;
            oppoAddX = player.monsterFieldLayout.x + player.node.x - opponentPlayer.node.x - opponentPlayer.monsterFieldLayout.x;
            oppoAddY = player.monsterFieldLayout.y + player.node.y - opponentPlayer.node.y - opponentPlayer.monsterFieldLayout.y;
            //cc.log('opponentPlayer.monsterSpriteArray.length:%d', monsterSpriteArray.length);
            for (var i = 0; i < monsterSpriteArray.length; ++i) {
                boundBox = monsterSpriteArray[i].getBoundingBox();
                pos = new cc.v2(this.node.x + oppoAddX, this.node.y + oppoAddY);
                if (boundBox.contains(pos)) {
                    duel.monsterAtkMonster(this._idx, opponentPlayer.getIdx(), i); //攻击对方随从
                    this.resetPosToSrc();
                    return;
                }
            }

            //什么都没做，复位
            this.resetPosToSrc();
        }, this);
    },

    //是否激活
    isTurnActive: function isTurnActive() {
        return this._player.isTurnActive;
    },

    //本回合是否攻击过
    isAtked: function isAtked() {
        var monster = this._player.fieldArray[this._idx];
        return monster.isAtked;
    },

    resetPosToSrc: function resetPosToSrc() {
        this.node.setPosition(this.srcPos.x, this.srcPos.y);
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.srcPos = { 'x': 0, 'y': 0 };

        this.setInputControl();
    },

    init: function init(monster, player, idx) {

        this.hpLabel.string = monster.hp.toString();
        this.atkLabel.string = monster.atk.toString();
        this.nameLabel.string = monster.cardName.toString();

        this._player = player;
        this._idx = idx;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"PlayerSprite":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'e48e0Bw9slHxbIHJ730LbRE', 'PlayerSprite');
// Script\PlayerSprite.js

var CardSprite = require('CardSprite');

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        idx: -1, //对应玩家IDX
        duel: null, //游戏管理
        handCardSpriteArray: [], //手牌图片数组
        monsterSpriteArray: [], //随从图片数组

        //------------------------模板------------------------------------------
        cardPrefab: {
            'default': null,
            type: cc.Prefab
        },

        monsterPrefab: {
            'default': null,
            type: cc.Prefab
        },

        //---------------------节点池管理---------------------------------------
        cardPool: null,
        monsterPool: null,

        //-----------------------控件-------------------------------------------
        //手牌区
        handFiledLayout: {
            'default': null,
            type: cc.Layout
        },

        //场上随从区
        monsterFieldLayout: {
            'default': null,
            type: cc.Node
        },

        //头像
        heroIconSprite: {
            'default': null,
            type: cc.Sprite
        },

        //血量显示
        heroHpLabel: {
            'default': null,
            type: cc.Label
        },

        //名字
        heroNameLabel: {
            'default': null,
            type: cc.Label
        },

        //水晶
        criticalSpriteArray: [cc.Sprite],

        //卡组牌数
        deckLabel: {
            'default': null,
            type: cc.Label
        }
    },

    init: function init(duel) {
        this.idx = -1;
        this.duel = duel;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.handCardSpriteArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var node = _step.value;

                this.cardPool.put(node);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.handCardSpriteArray = [];

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.monsterSpriteArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var node1 = _step2.value;

                this.cardPool.put(node);
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }

        this.monsterSpriteArray = [];

        //头像

        //HP
        this.heroHpLabel.string = '0';
        //名字
        this.heroNameLabel.string = '';
        //水晶
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = criticalSpriteArray[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var criticalSprite = _step3.value;

                criticalSprite.setVisible(0);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                    _iterator3['return']();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        this.deckLabel.string = '30';
    },

    //界面刷新
    refresh: function refresh() {
        var player = this.duel.getPlayer(this.idx);

        //水晶图片刷新
        var criticalSpriteArray = this.criticalSpriteArray;
        var i = 0;
        var criticalNum = player.getCritical();
        var maxCriticalNum = player.getMaxCritical();

        for (; i < criticalNum; ++i) {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(0, 255, 0);
        }
        for (; i < maxCriticalNum; ++i) {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(255, 0, 0);
        }
        for (; i < criticalSpriteArray.length; ++i) {
            criticalSpriteArray[i].setVisible(0);
        }

        this.heroHpLabel.string = player.getHp().toString();
        this.heroNameLabel.string = player.getHeroName();
        this.deckLabel.string = player.getDeckNum().toString();
    },

    //创建手牌图片
    createCardSprite: function createCardSprite(card) {
        var cardSprite;
        if (this.cardPool.size() > 0) {
            cardSprite = this.cardPool.get(this);
        } else {
            cardSprite = cc.instantiate(this.cardPrefab);
        }

        this.handFiledLayout.node.addChild(cardSprite);
        this.handCardSpriteArray.push(cardSprite);
        this.refreshHandCard(); //刷新手牌图片
    },

    //删除手牌图片
    handCardDelete: function handCardDelete(idx) {
        var cardSprite = this.handCardSpriteArray[idx];
        this.cardPool.put(cardSprite);
        this.handCardSpriteArray.splice(idx, 1);
        this.refreshHandCard(); //刷新手牌图片
    },

    //创建随从图片
    createMonsterSprite: function createMonsterSprite(monster) {
        //创建随从图片资源
        var monsterSprite;
        if (this.monsterPool.size() > 0) {
            monsterSprite = this.monsterPool.get(this);
        } else {
            monsterSprite = cc.instantiate(this.monsterPrefab);
        }

        this.monsterFieldLayout.addChild(monsterSprite);
        this.monsterSpriteArray.push(monsterSprite);
        this.refreshMonsterField(); //刷新随从区
    },

    //删除随从图片
    deleteMonsterSprite: function deleteMonsterSprite(idx) {
        var monsterSprite = this.monsterSpriteArray[idx];
        this.cardPool.put(monsterSprite);
        this.monsterSpriteArray.splice(idx, 1);
        this.refreshMonsterField(); //刷新随从图片     
    },

    //-----------------------界面刷新---------------------------------------
    //手牌图片刷新
    refreshHandCard: function refreshHandCard() {
        var player = this.duel.getPlayer(this.idx);
        var handArray = player.handArray;
        var handCardSpriteArray = this.handCardSpriteArray;
        var arrayLength = handArray.length;

        for (var i = 0; i < arrayLength; ++i) {
            if (handCardSpriteArray[i]) {
                handCardSpriteArray[i].getComponent('CardSprite').init(handArray[i], player, i);
                handCardSpriteArray[i].setPosition(90 * i + handCardSpriteArray[i].getChildByName('sprite').width / 2 - this.handFiledLayout.node.width / 2, 0);
            } else {
                cc.log('handCardSpriteArray is less than handArray! %d/%d', i, arrayLength);
                break;
            }
        }
    },

    //随从图片刷新
    refreshMonsterField: function refreshMonsterField() {
        var player = this.duel.getPlayer(this.idx);
        var fieldArray = player.fieldArray;
        var monsterSpriteArray = this.monsterSpriteArray;
        var arrayLength = fieldArray.length;

        for (var i = 0; i < arrayLength; ++i) {
            if (monsterSpriteArray[i]) {
                monsterSpriteArray[i].getComponent('MonsterSprite').init(fieldArray[i], player, i);
                monsterSpriteArray[i].setPosition(110 * i + monsterSpriteArray[i].width / 2 - this.monsterFieldLayout.width / 2, 0);
                //cc.log(monsterSpriteArray[i].width);
                //cc.log(this.monsterFieldLayout.node.width);
                //monsterSpriteArray[i].setPosition(0,0);
                if (fieldArray[i].isAtked) monsterSpriteArray[i].opacity = 100;else monsterSpriteArray[i].opacity = 255;
            } else {
                cc.log('monsterSpriteArray is less than fieldArray! %d/%d', i, arrayLength);
                break;
            }
        }
    },

    setIdx: function setIdx(idx) {
        this.idx = idx;
    },
    getIdx: function getIdx() {
        return this.idx;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.cardPool = new cc.NodePool('card');
        //cc.log('this.cardPool type');
        //cc.log(this.cardPool);
        this.monsterPool = new cc.NodePool('monster');
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"CardSprite":"CardSprite"}],"card":[function(require,module,exports){
"use strict";
cc._RFpush(module, '774273aTPtIlLcUjnpLZlVZ', 'card');
// Script\card.js

var CARD_UPDATE_CARDNAME = 1 << 1;
var CARD_UPDATE_CRITICAL = 1 << 2;
var CARD_UPDATE_ATK = 1 << 3;
var CARD_UPDATE_HP = 1 << 4;

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        player: null, //Player引用
        idx: 0, //数组索引
        isHide: false, //隐藏数据
        cardName: "",
        critical: 0,
        atk: 0,
        hp: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    /*init: function(cardData, player, idx){
        this.critical = cardData.critical;
        this.cardName = cardData.cardName;
        this.atk = cardData.atk;
        this.hp = cardData.hp;
        
        this.player = player;
        this.idx = idx;
    },*/

    //打包数据完整
    packDataAll: function packDataAll(data) {
        data.idx = this.idx;
        data.hide = this.isHide;

        data.cardName = this.cardName;
        data.critical = this.critical;
        data.atk = this.atk;
        data.hp = this.hp;
    },

    //解开数据完整
    unPackDataAll: function unPackDataAll(data) {
        this.idx = data.idx;
        this.isHide = data.hide;
        if (this.isHide) return;

        this.cardName = data.cardName;
        this.critical = data.critical;
        this.atk = data.atk;
        this.hp = data.hp;
    },

    //打包数据
    packData: function packData(data, flag) {
        data.flag = flag;
        data.idx = this.idx;

        if (flag & CARD_UPDATE_CARDNAME) data.cardName = this.cardName;
        if (flag & CARD_UPDATE_CRITICAL) data.critical = this.critical;
        if (flag & CARD_UPDATE_ATK) data.atk = this.atk;
        if (flag & CARD_UPDATE_HP) data.hp = this.hp;
    },

    //解开数据
    unPackData: function unPackData(data) {
        var flag = data.flag;
        this.idx = data.idx;
        this.isHide = hide;

        if (this.isHide) return;

        if (flag & CARD_UPDATE_CARDNAME) this.cardName = data.cardName;
        if (flag & CARD_UPDATE_CRITICAL) this.critical = data.critical;
        if (flag & CARD_UPDATE_ATK) this.atk = data.atk;
        if (flag & CARD_UPDATE_HP) this.hp = data.hp;
    },

    //更新编号
    refreshIdx: function refreshIdx(idx) {
        this._idx = idx;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"duel":[function(require,module,exports){
"use strict";
cc._RFpush(module, '74868lChLJHkqxOmGjhUhkk', 'duel');
// Script\duel.js

//处理对战流程的关键类

var Player = require('player');
var ChatWnd = require('ChatWnd');
var PlayerSprite = require('PlayerSprite');
var GameConn = require('./NetWork/GameConn');
//var EventProcess = require('./Network/EventProcess');

//对战状态
var DUEL_STATE_REST = 0;
var DUEL_STATE_PLAYING = 1;

//分组
var TEAM_COLOR_NONE = -1;
var TEAM_COLOR_RED = 1;
var TEAM_COLOR_BLUE = 2;

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        playerVec: [],
        state: DUEL_STATE_REST,

        turn: 0, //每个玩家一回合加一次
        round: 0, //每个玩家都行动过一回合加一次

        //-----------------------控件-------------------------------------------
        cardPrefab: {
            'default': null,
            type: cc.Prefab
        },

        playerSpriteVec: [PlayerSprite], //玩家控件

        //聊天窗口脚本
        chatWnd: {
            'default': null,
            type: ChatWnd
        }
    },

    setInputControl: function setInputControl() {
        var self = this;
        this.node.on('touchstart', function (event) {
            cc.log('1231312321313213123');
            cc.log(event.getLocationX());
        }, this);
    },

    addPlayer: function addPlayer(param) {
        var idx = param;
        var player = this.duel.playerVec[idx];
        //玩家数据已存在
        if (player) {
            cc.log('WC_PLAYER_ADD error! player(%d) is already exited.', idx);
            return;
        }

        //创建玩家并加入玩家数组
        createPlayer(param);
    },

    createPlayer: function createPlayer(param) {
        var player = new Player();
        player.init(this);
        player.unpackDataAll(param);
        this.playerVec[idx] = player;
    },

    getPlayer: function getPlayer(idx) {
        return this.playerVec[idx];
    },

    getPlayerSprite: function getPlayerSprite(idx) {
        return this.playerSpriteVec[idx];
    },

    getPlayerSpriteByPlayer: function getPlayerSpriteByPlayer(idx) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.playerSpriteVec[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var playerSprite = _step.value;

                if (playerSprite.getIdx() === idx) return playerSprite;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return null;
    },

    refreshPlayerSprite: function refreshPlayerSprite(playerIdx) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.playerSpriteVec[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var playerSprite = _step2.value;

                if (playerSprite.getIdx() === playerIdx) {
                    playerSprite.refresh();
                    break;
                }
            }
        } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                    _iterator2['return']();
                }
            } finally {
                if (_didIteratorError2) {
                    throw _iteratorError2;
                }
            }
        }
    },

    //召唤随从
    summonMonster: function summonMonster(cardIdx) {
        GameConn.sendPacket(CW_MONSTER_SUMMON_REQUEST, cardIdx);
    },

    //随从攻击玩家
    monsterAtkPlayer: function monsterAtkPlayer(monsterIdx, playerIdx) {
        GameConn.sendPacket(CW_MONSTER_ATTACKPLAYER_REQUEST, { idx: monsterIdx, targetPlayerIdx: playerIdx });
    },

    //随从攻击随从
    monsterAtkMonster: function monsterAtkMonster(monsterIdx, playerIdx, targetMonsterIdx) {
        GameConn.sendPacket(CW_MONSTER_ATTACKMONSTER_REQUEST, { idx: monsterIdx, targetPlayerIdx: playerIdx, targetMonsterIdx: targetMonsterIdx });
    },

    //判断输赢
    checkWin: function checkWin() {
        if (this.turnPlayer.hp <= 0 && this.turnOpponent.hp <= 0) {
            showTipLabel("平局");
        } else if (this.turnPlayer.hp <= 0) {
            showTipLabel("%s 胜利", this.opponentPlayer.heroName);
        } else if (this.turnOpponent.hp <= 0) {
            showTipLabel("% 胜利", this.turnPlayer.heroName);
        }
    },

    //回合结束（按钮调用）
    turnEnd_BtnEvent: function turnEnd_BtnEvent(event) {
        //不是MainPhase这个按钮不能按
        if (this.phaseState !== PHASE_MAIN_TURN) return;

        this.changePhase(PHASE_END_TURN);
    },

    addChatItem: function addChatItem(message, color) {
        this.chatWnd.addChatItem(message, color);
        //this.chatWnd.addChatItem('[系统]:用户' + GameConn.getAccountName() + '进入了房间.', cc.Color.RED);
    },

    enterBeginTurn: function enterBeginTurn() {
        cc.log('is enter BeginTurn?');
        ++this.turn;
        this.turnPlayerChange();

        showTipLabel(this.turnPlayer.heroName + '的回合');
        this.turnPlayer.setTurnActive(true); //可以行动
        this.turnPlayer.criticalPlus(1); //增加水晶
        this.turnPlayer.criticalRecover(); //回复水晶
        this.turnPlayer.awakenMonster(); //重置随从攻击次数
        this.turnPlayer.drawDeck(1); //抽1张卡
    },

    beginTurn: function beginTurn() {
        //进入主流程

        this.changePhase(PHASE_MAIN_TURN);
    },

    leaveBeginTurn: function leaveBeginTurn() {},

    enterMainTurn: function enterMainTurn() {},

    mainTurn: function mainTurn() {},

    leaveMainTurn: function leaveMainTurn() {},

    enterEndTurn: function enterEndTurn() {},

    endTurn: function endTurn() {
        this.changePhase(PHASE_BEGIN_TURN);
    },

    leaveEndTurn: function leaveEndTurn() {

        this.turnPlayer.setTurnActive(false);
    },

    changePhase: function changePhase(nextTurnType) {
        if (this.phaseState !== 0) {
            this.leaveTurnFunc[this.phaseState]();
        }

        this.enterTurnFunc[nextTurnType]();
        this.phaseState = nextTurnType;
    },

    // use this for initialization
    onLoad: function onLoad() {
        //this.setInputControl();
        //初始化玩家控件
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = this.playerSpriteVec[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var playerSprite = _step3.value;

                playerSprite.init(this);
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                    _iterator3['return']();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    },

    start: function start() {
        //this.startGame();
        EventProcess.setDuel(this);
        GameConn.sendPacket(CW_ENTERROOM_REQUEST, {}); //用户进入房间请求
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        //this.turnFunc[this.phaseState]();
    }
});

cc._RFpop();
},{"./NetWork/GameConn":"GameConn","ChatWnd":"ChatWnd","PlayerSprite":"PlayerSprite","player":"player"}],"monster":[function(require,module,exports){
"use strict";
cc._RFpush(module, '97b2cKHFm5Aw7y0vU8kdrYO', 'monster');
// Script\monster.js

var MONSTER_UPDATE_CARDNAME = 1 << 1;
var MONSTER_UPDATE_CRITICAL = 1 << 2;
var MONSTER_UPDATE_ATK = 1 << 3;
var MONSTER_UPDATE_HP = 1 << 4;
var MONSTER_UPDATE_MAXHP = 1 << 5;
var MONSTER_UPDATE_ISATKED = 1 << 6;

cc.Class({
    "extends": cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        _player: null, //Player引用
        _idx: 0, //数组索引

        cardName: "",
        critical: 0,
        atk: 0,
        hp: 0,
        maxHp: 0,
        isAtked: true },

    //本回合是否攻击过
    //打包数据完整
    packDataAll: function packDataAll(data) {
        data.idx = this.idx;

        data.cardName = this.cardName;
        data.critical = this.critical;
        data.atk = this.atk;
        data.hp = this.hp;
        data.maxHp = this.maxHp;
        data.isAtked = this.isAtked;
    },

    //解开数据完整
    unPackDataAll: function unPackDataAll(data) {
        this.idx = data.idx;

        this.cardName = data.cardName;
        this.critical = data.critical;
        this.atk = data.atk;
        this.hp = data.hp;
        this.maxHp = data.maxHp;
        this.isAtked = data.isAtked;
    },

    //打包数据
    packData: function packData(data, flag) {
        data.flag = flag;
        data.idx = this.idx;

        if (flag & MONSTER_UPDATE_CARDNAME) data.cardName = this.cardName;
        if (flag & MONSTER_UPDATE_CRITICAL) data.critical = this.critical;
        if (flag & MONSTER_UPDATE_ATK) data.atk = this.atk;
        if (flag & MONSTER_UPDATE_HP) data.hp = this.hp;
        if (flag & MONSTER_UPDATE_MAXHP) data.maxHp = this.maxHp;
        if (flag & MONSTER_UPDATE_ISATKED) data.isAtked = this.isAtked;
    },

    //解开数据
    unPackData: function unPackData(data) {
        var flag = data.flag;
        this.idx = data.idx;

        if (flag & MONSTER_UPDATE_CARDNAME) this.cardName = data.cardName;
        if (flag & MONSTER_UPDATE_CRITICAL) this.critical = data.critical;
        if (flag & MONSTER_UPDATE_ATK) this.atk = data.atk;
        if (flag & MONSTER_UPDATE_HP) this.hp = data.hp;
        if (flag & MONSTER_UPDATE_MAXHP) this.maxHp = data.maxHp;
        if (flag & MONSTER_UPDATE_ISATKED) this.isAtked = data.isAtked;
    },

    //扣除HP
    reduceHp: function reduceHp(num) {
        if (num <= 0) return;

        this.hp -= num;
        //死了就杀掉这个随从
        if (this.isDead()) this._player.killMonster(this);

        this._player.refreshMonsterField();
    },

    //回复HP
    addHp: function addHp(num) {
        if (num <= 0) return;

        this.hp += num;
        if (this.hp > this.maxHp) this.hp = this.maxHp;

        this._player.refreshMonsterField();
    },

    isDead: function isDead() {
        if (this.hp <= 0) return true;
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(card, player, idx) {
        this.cardName = card.cardName;
        this.critical = card.critical;
        this.atk = card.atk;
        this.hp = card.hp;
        this.maxHp = card.hp;

        this._player = player;
        this._idx = idx;
    },

    //更新编号
    refreshIdx: function refreshIdx(idx) {
        this._idx = idx;
    }

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{}],"player":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c8c0a4ButJMAquw9d5sMqfi', 'player');
// Script\player.js

var Card = require('card');
var Monster = require('monster');
var CardDataManager = require('./data/CardDataManager');

var PLAYER_UPDATE_ISTURNACTIVE = 1;
var PLAYER_UPDATE_HP = 1 << 1;
var PLAYER_UPDATE_CRITICAL = 1 << 2;
var PLAYER_UPDATE_MAXCRITICAL = 1 << 3;
var PLAYER_UPDATE_ISREADY = 1 << 4;
var PLAYER_UPDATE_DECKNUM = 1 << 5;

cc.Class({
    'extends': cc.Component,

    properties: {
        // foo: {
        //    default: null,
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...

        duel: null, //战斗管理
        idx: -1,
        teamColor: -1,
        isTurnActive: false, //是否可以行动
        isReady: false, //是否准备游戏

        heroName: '', //玩家名字
        hp: 30, //英雄生命值
        critical: 0, //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        deckNum: 30, //牌组剩余卡牌
        deckArray: [], //卡组数组（Card类型）
        handArray: [], //手牌数组（Card类型）
        fieldArray: [] },

    //场上随从数组（Monster类型）
    init: function init(duel) {
        this.duel = duel;
    },

    //打包数据完整
    packDataAll: function packDataAll(data) {
        data.idx = this.idx;
        data.temColor = this.teamColor;
        data.isTurnActive = this.isTurnActive;
        data.isReady = this.isReady;
        data.heroName = this.heroName;
        data.hp = this.hp;
        data.critical = this.crititcal;
        data.maxCritical = this.maxCritical;
        data.deckNum = this.deckNum;
    },

    //解开数据完整
    unPackDataAll: function unPackDataAll(data) {
        this.idx = data.idx;
        this.teamColor = data.temColor;
        this.isTurnActive = data.isTurnActive;
        this.isReady = data.isReady;
        this.heroName = data.heroName;
        this.hp = data.hp;
        this.crititcal = data.critical;
        this.maxCritical = data.maxCritical;
        this.deckNum = data.deckNum;
    },

    //打包数据
    packData: function packData(data, flag) {
        data.flag = flag;
        data.idx = this.idx;

        if (flag & PLAYER_UPDATE_ISTURNACTIVE) data.isTurnActive = this._isTurnActive;
        if (flag & PLAYER_UPDATE_HP) data.hp = this.hp;
        if (flag & PLAYER_UPDATE_CRITICAL) data.critical = this.critical;
        if (flag & PLAYER_UPDATE_MAXCRITICAL) data.maxCritical = this.maxCritical;
        if (flag & PLAYER_UPDATE_ISREADY) data.isReady = this.isReady;
        if (flag & PLAYER_UPDATE_DECKNUM) data.deckNum = this.deckNum;
    },

    //解开数据
    unPackData: function unPackData(data) {
        var flag = data.flag;

        if (flag & PLAYER_UPDATE_ISTURNACTIVE) this._isTurnActive = data.isTurnActive;
        if (flag & PLAYER_UPDATE_HP) this.hp = data.hp;
        if (flag & PLAYER_UPDATE_CRITICAL) this.critical = data.critical;
        if (flag & PLAYER_UPDATE_ISREADY) this.isReady = data.isReady;
        if (flag & PLAYER_UPDATE_DECKNUM) this.deckNum = data.deckNum;
    },

    getIsTurnActive: function getIsTurnActive() {
        return this.isTurnActive;
    },
    getHeroName: function getHeroName() {
        return this.heroName;
    },
    getHp: function getHp() {
        return this.hp;
    },
    getCritical: function getCritical() {
        return this.critical;
    },
    getMaxCritical: function getMaxCritical() {
        return this.maxCritical;
    },
    getDeckNum: function getDeckNum() {
        return this.deckNum;
    },

    //创建手牌
    createCardToHand: function createCardToHand(data) {
        var card = new Card();
        card.unPackDataAll(data);
        this.handArray.push(card);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.createCardsprite(card);
    },

    //删除手牌
    handCardDelete: function handCardDelete(idx) {
        this.handArray.splice(idx, 1);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteCardSprite(idx);
    },

    //刷新手牌
    handCardUpdate: function handCardUpdate(data) {
        var card = this.handArray[data.idx];
        card.unPackData(data);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshHandCard();
    },

    //重置随从攻击次数
    awakenMonster: function awakenMonster() {
        var fieldArray = this.fieldArray;

        for (var i = 0; i < fieldArray.length; ++i) {
            fieldArray[i].isAtked = false;
        }

        this.refreshMonsterField();
    },

    //召唤随从请求
    summerMonster: function summerMonster(cardIdx) {
        this.duel.summerMonster(cardIdx);
    },

    //创建随从
    createMonster: function createMonster(data) {
        var monster = new Monster();
        monster.unPackDataAll(data);
        this.fieldArray.push(monster);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.createMonstersprite(monster);
    },

    //删除随从
    monsterDelete: function monsterDelete(idx) {
        this.fieldArray.splice(idx, 1);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteMonsterSprite(idx);
    },

    //刷新随从
    handCardUpdate: function handCardUpdate(data) {
        var monster = this.fieldArray[data.idx];
        monster.unPackData(data);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshMonsterField();
    },

    //干掉随从
    killMonster: function killMonster(monster) {
        cc.log('monsterSpriteArray:%s', this.monsterSpriteArray.length);
        cc.log('fieldArray:%s', this.monsterSpriteArray.length);
        cc.log('_idx:%s', monster._idx);
        var idx = monster._idx;
        var monsterSprite = this.monsterSpriteArray[idx];

        this.monsterPool.put(monsterSprite);
        this.fieldArray.splice(idx, 1);
        this.refreshArrayIdx(this.fieldArray);
        this.monsterSpriteArray.splice(idx, 1);
        cc.log('monsterSpriteArray:%s', this.monsterSpriteArray.length);
        cc.log('fieldArray:%s', this.fieldArray.length);
        this.refreshMonsterField();
    },

    //数组变动后需要刷新idx
    refreshArrayIdx: function refreshArrayIdx(array) {
        for (var i = 0; i < array.length; ++i) {
            array[i].refreshIdx(i);
        }
    },

    //获取手牌
    getHandCard: function getHandCard(idx) {
        return this.handArray[idx];
    },

    // use this for initialization
    onLoad: function onLoad() {}

});
// called every frame, uncomment this function to activate update callback
// update: function (dt) {

// },

cc._RFpop();
},{"./data/CardDataManager":"CardDataManager","card":"card","monster":"monster"}],"socket.io":[function(require,module,exports){
(function (global){
"use strict";
cc._RFpush(module, '57172MxTdxIKpvgTvy8KeUW', 'socket.io');
// Script\NetWork\socket.io.js

if (!cc.sys.isNative) {
  (function (f) {
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = f();
    } else if (typeof define === "function" && define.amd) {
      define([], f);
    } else {
      var g;if (typeof window !== "undefined") {
        g = window;
      } else if (typeof global !== "undefined") {
        g = global;
      } else if (typeof self !== "undefined") {
        g = self;
      } else {
        g = this;
      }g.io = f();
    }
  })(function () {
    var define, module, exports;return (function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
          }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }return n[o].exports;
      }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
    })({ 1: [function (_dereq_, module, exports) {

        /**
         * Module dependencies.
         */

        var url = _dereq_('./url');
        var parser = _dereq_('socket.io-parser');
        var Manager = _dereq_('./manager');
        var debug = _dereq_('debug')('socket.io-client');

        /**
         * Module exports.
         */

        module.exports = exports = lookup;

        /**
         * Managers cache.
         */

        var cache = exports.managers = {};

        /**
         * Looks up an existing `Manager` for multiplexing.
         * If the user summons:
         *
         *   `io('http://localhost/a');`
         *   `io('http://localhost/b');`
         *
         * We reuse the existing instance based on same scheme/port/host,
         * and we initialize sockets for each namespace.
         *
         * @api public
         */

        function lookup(uri, opts) {
          if (typeof uri == 'object') {
            opts = uri;
            uri = undefined;
          }

          opts = opts || {};

          var parsed = url(uri);
          var source = parsed.source;
          var id = parsed.id;
          var path = parsed.path;
          var sameNamespace = cache[id] && path in cache[id].nsps;
          var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

          var io;

          if (newConnection) {
            debug('ignoring socket cache for %s', source);
            io = Manager(source, opts);
          } else {
            if (!cache[id]) {
              debug('new io instance for %s', source);
              cache[id] = Manager(source, opts);
            }
            io = cache[id];
          }

          return io.socket(parsed.path);
        }

        /**
         * Protocol version.
         *
         * @api public
         */

        exports.protocol = parser.protocol;

        /**
         * `connect`.
         *
         * @param {String} uri
         * @api public
         */

        exports.connect = lookup;

        /**
         * Expose constructors for standalone build.
         *
         * @api public
         */

        exports.Manager = _dereq_('./manager');
        exports.Socket = _dereq_('./socket');
      }, { "./manager": 2, "./socket": 4, "./url": 5, "debug": 14, "socket.io-parser": 40 }], 2: [function (_dereq_, module, exports) {

        /**
         * Module dependencies.
         */

        var eio = _dereq_('engine.io-client');
        var Socket = _dereq_('./socket');
        var Emitter = _dereq_('component-emitter');
        var parser = _dereq_('socket.io-parser');
        var on = _dereq_('./on');
        var bind = _dereq_('component-bind');
        var debug = _dereq_('debug')('socket.io-client:manager');
        var indexOf = _dereq_('indexof');
        var Backoff = _dereq_('backo2');

        /**
         * IE6+ hasOwnProperty
         */

        var has = Object.prototype.hasOwnProperty;

        /**
         * Module exports
         */

        module.exports = Manager;

        /**
         * `Manager` constructor.
         *
         * @param {String} engine instance or engine uri/opts
         * @param {Object} options
         * @api public
         */

        function Manager(uri, opts) {
          if (!(this instanceof Manager)) return new Manager(uri, opts);
          if (uri && 'object' == typeof uri) {
            opts = uri;
            uri = undefined;
          }
          opts = opts || {};

          opts.path = opts.path || '/socket.io';
          this.nsps = {};
          this.subs = [];
          this.opts = opts;
          this.reconnection(opts.reconnection !== false);
          this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
          this.reconnectionDelay(opts.reconnectionDelay || 1000);
          this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
          this.randomizationFactor(opts.randomizationFactor || 0.5);
          this.backoff = new Backoff({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
          });
          this.timeout(null == opts.timeout ? 20000 : opts.timeout);
          this.readyState = 'closed';
          this.uri = uri;
          this.connecting = [];
          this.lastPing = null;
          this.encoding = false;
          this.packetBuffer = [];
          this.encoder = new parser.Encoder();
          this.decoder = new parser.Decoder();
          this.autoConnect = opts.autoConnect !== false;
          if (this.autoConnect) this.open();
        }

        /**
         * Propagate given event to sockets and emit on `this`
         *
         * @api private
         */

        Manager.prototype.emitAll = function () {
          this.emit.apply(this, arguments);
          for (var nsp in this.nsps) {
            if (has.call(this.nsps, nsp)) {
              this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
            }
          }
        };

        /**
         * Update `socket.id` of all sockets
         *
         * @api private
         */

        Manager.prototype.updateSocketIds = function () {
          for (var nsp in this.nsps) {
            if (has.call(this.nsps, nsp)) {
              this.nsps[nsp].id = this.engine.id;
            }
          }
        };

        /**
         * Mix in `Emitter`.
         */

        Emitter(Manager.prototype);

        /**
         * Sets the `reconnection` config.
         *
         * @param {Boolean} true/false if it should automatically reconnect
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.reconnection = function (v) {
          if (!arguments.length) return this._reconnection;
          this._reconnection = !!v;
          return this;
        };

        /**
         * Sets the reconnection attempts config.
         *
         * @param {Number} max reconnection attempts before giving up
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.reconnectionAttempts = function (v) {
          if (!arguments.length) return this._reconnectionAttempts;
          this._reconnectionAttempts = v;
          return this;
        };

        /**
         * Sets the delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.reconnectionDelay = function (v) {
          if (!arguments.length) return this._reconnectionDelay;
          this._reconnectionDelay = v;
          this.backoff && this.backoff.setMin(v);
          return this;
        };

        Manager.prototype.randomizationFactor = function (v) {
          if (!arguments.length) return this._randomizationFactor;
          this._randomizationFactor = v;
          this.backoff && this.backoff.setJitter(v);
          return this;
        };

        /**
         * Sets the maximum delay between reconnections.
         *
         * @param {Number} delay
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.reconnectionDelayMax = function (v) {
          if (!arguments.length) return this._reconnectionDelayMax;
          this._reconnectionDelayMax = v;
          this.backoff && this.backoff.setMax(v);
          return this;
        };

        /**
         * Sets the connection timeout. `false` to disable
         *
         * @return {Manager} self or value
         * @api public
         */

        Manager.prototype.timeout = function (v) {
          if (!arguments.length) return this._timeout;
          this._timeout = v;
          return this;
        };

        /**
         * Starts trying to reconnect if reconnection is enabled and we have not
         * started reconnecting yet
         *
         * @api private
         */

        Manager.prototype.maybeReconnectOnOpen = function () {
          // Only try to reconnect if it's the first time we're connecting
          if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
            // keeps reconnection from firing twice for the same reconnection loop
            this.reconnect();
          }
        };

        /**
         * Sets the current transport `socket`.
         *
         * @param {Function} optional, callback
         * @return {Manager} self
         * @api public
         */

        Manager.prototype.open = Manager.prototype.connect = function (fn) {
          debug('readyState %s', this.readyState);
          if (~this.readyState.indexOf('open')) return this;

          debug('opening %s', this.uri);
          this.engine = eio(this.uri, this.opts);
          var socket = this.engine;
          var self = this;
          this.readyState = 'opening';
          this.skipReconnect = false;

          // emit `open`
          var openSub = on(socket, 'open', function () {
            self.onopen();
            fn && fn();
          });

          // emit `connect_error`
          var errorSub = on(socket, 'error', function (data) {
            debug('connect_error');
            self.cleanup();
            self.readyState = 'closed';
            self.emitAll('connect_error', data);
            if (fn) {
              var err = new Error('Connection error');
              err.data = data;
              fn(err);
            } else {
              // Only do this if there is no fn to handle the error
              self.maybeReconnectOnOpen();
            }
          });

          // emit `connect_timeout`
          if (false !== this._timeout) {
            var timeout = this._timeout;
            debug('connect attempt will timeout after %d', timeout);

            // set timer
            var timer = setTimeout(function () {
              debug('connect attempt timed out after %d', timeout);
              openSub.destroy();
              socket.close();
              socket.emit('error', 'timeout');
              self.emitAll('connect_timeout', timeout);
            }, timeout);

            this.subs.push({
              destroy: function destroy() {
                clearTimeout(timer);
              }
            });
          }

          this.subs.push(openSub);
          this.subs.push(errorSub);

          return this;
        };

        /**
         * Called upon transport open.
         *
         * @api private
         */

        Manager.prototype.onopen = function () {
          debug('open');

          // clear old subs
          this.cleanup();

          // mark as open
          this.readyState = 'open';
          this.emit('open');

          // add new subs
          var socket = this.engine;
          this.subs.push(on(socket, 'data', bind(this, 'ondata')));
          this.subs.push(on(socket, 'ping', bind(this, 'onping')));
          this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
          this.subs.push(on(socket, 'error', bind(this, 'onerror')));
          this.subs.push(on(socket, 'close', bind(this, 'onclose')));
          this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
        };

        /**
         * Called upon a ping.
         *
         * @api private
         */

        Manager.prototype.onping = function () {
          this.lastPing = new Date();
          this.emitAll('ping');
        };

        /**
         * Called upon a packet.
         *
         * @api private
         */

        Manager.prototype.onpong = function () {
          this.emitAll('pong', new Date() - this.lastPing);
        };

        /**
         * Called with data.
         *
         * @api private
         */

        Manager.prototype.ondata = function (data) {
          this.decoder.add(data);
        };

        /**
         * Called when parser fully decodes a packet.
         *
         * @api private
         */

        Manager.prototype.ondecoded = function (packet) {
          this.emit('packet', packet);
        };

        /**
         * Called upon socket error.
         *
         * @api private
         */

        Manager.prototype.onerror = function (err) {
          debug('error', err);
          this.emitAll('error', err);
        };

        /**
         * Creates a new socket for the given `nsp`.
         *
         * @return {Socket}
         * @api public
         */

        Manager.prototype.socket = function (nsp) {
          var socket = this.nsps[nsp];
          if (!socket) {
            socket = new Socket(this, nsp);
            this.nsps[nsp] = socket;
            var self = this;
            socket.on('connecting', onConnecting);
            socket.on('connect', function () {
              socket.id = self.engine.id;
            });

            if (this.autoConnect) {
              // manually call here since connecting evnet is fired before listening
              onConnecting();
            }
          }

          function onConnecting() {
            if (! ~indexOf(self.connecting, socket)) {
              self.connecting.push(socket);
            }
          }

          return socket;
        };

        /**
         * Called upon a socket close.
         *
         * @param {Socket} socket
         */

        Manager.prototype.destroy = function (socket) {
          var index = indexOf(this.connecting, socket);
          if (~index) this.connecting.splice(index, 1);
          if (this.connecting.length) return;

          this.close();
        };

        /**
         * Writes a packet.
         *
         * @param {Object} packet
         * @api private
         */

        Manager.prototype.packet = function (packet) {
          debug('writing packet %j', packet);
          var self = this;

          if (!self.encoding) {
            // encode, then write to engine with result
            self.encoding = true;
            this.encoder.encode(packet, function (encodedPackets) {
              for (var i = 0; i < encodedPackets.length; i++) {
                self.engine.write(encodedPackets[i], packet.options);
              }
              self.encoding = false;
              self.processPacketQueue();
            });
          } else {
            // add packet to the queue
            self.packetBuffer.push(packet);
          }
        };

        /**
         * If packet buffer is non-empty, begins encoding the
         * next packet in line.
         *
         * @api private
         */

        Manager.prototype.processPacketQueue = function () {
          if (this.packetBuffer.length > 0 && !this.encoding) {
            var pack = this.packetBuffer.shift();
            this.packet(pack);
          }
        };

        /**
         * Clean up transport subscriptions and packet buffer.
         *
         * @api private
         */

        Manager.prototype.cleanup = function () {
          debug('cleanup');

          var sub;
          while (sub = this.subs.shift()) sub.destroy();

          this.packetBuffer = [];
          this.encoding = false;
          this.lastPing = null;

          this.decoder.destroy();
        };

        /**
         * Close the current socket.
         *
         * @api private
         */

        Manager.prototype.close = Manager.prototype.disconnect = function () {
          debug('disconnect');
          this.skipReconnect = true;
          this.reconnecting = false;
          if ('opening' == this.readyState) {
            // `onclose` will not fire because
            // an open event never happened
            this.cleanup();
          }
          this.backoff.reset();
          this.readyState = 'closed';
          if (this.engine) this.engine.close();
        };

        /**
         * Called upon engine close.
         *
         * @api private
         */

        Manager.prototype.onclose = function (reason) {
          debug('onclose');

          this.cleanup();
          this.backoff.reset();
          this.readyState = 'closed';
          this.emit('close', reason);

          if (this._reconnection && !this.skipReconnect) {
            this.reconnect();
          }
        };

        /**
         * Attempt a reconnection.
         *
         * @api private
         */

        Manager.prototype.reconnect = function () {
          if (this.reconnecting || this.skipReconnect) return this;

          var self = this;

          if (this.backoff.attempts >= this._reconnectionAttempts) {
            debug('reconnect failed');
            this.backoff.reset();
            this.emitAll('reconnect_failed');
            this.reconnecting = false;
          } else {
            var delay = this.backoff.duration();
            debug('will wait %dms before reconnect attempt', delay);

            this.reconnecting = true;
            var timer = setTimeout(function () {
              if (self.skipReconnect) return;

              debug('attempting reconnect');
              self.emitAll('reconnect_attempt', self.backoff.attempts);
              self.emitAll('reconnecting', self.backoff.attempts);

              // check again for the case socket closed in above events
              if (self.skipReconnect) return;

              self.open(function (err) {
                if (err) {
                  debug('reconnect attempt error');
                  self.reconnecting = false;
                  self.reconnect();
                  self.emitAll('reconnect_error', err.data);
                } else {
                  debug('reconnect success');
                  self.onreconnect();
                }
              });
            }, delay);

            this.subs.push({
              destroy: function destroy() {
                clearTimeout(timer);
              }
            });
          }
        };

        /**
         * Called upon successful reconnect.
         *
         * @api private
         */

        Manager.prototype.onreconnect = function () {
          var attempt = this.backoff.attempts;
          this.reconnecting = false;
          this.backoff.reset();
          this.updateSocketIds();
          this.emitAll('reconnect', attempt);
        };
      }, { "./on": 3, "./socket": 4, "backo2": 8, "component-bind": 11, "component-emitter": 12, "debug": 14, "engine.io-client": 16, "indexof": 32, "socket.io-parser": 40 }], 3: [function (_dereq_, module, exports) {

        /**
         * Module exports.
         */

        module.exports = on;

        /**
         * Helper for subscriptions.
         *
         * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
         * @param {String} event name
         * @param {Function} callback
         * @api public
         */

        function on(obj, ev, fn) {
          obj.on(ev, fn);
          return {
            destroy: function destroy() {
              obj.removeListener(ev, fn);
            }
          };
        }
      }, {}], 4: [function (_dereq_, module, exports) {

        /**
         * Module dependencies.
         */

        var parser = _dereq_('socket.io-parser');
        var Emitter = _dereq_('component-emitter');
        var toArray = _dereq_('to-array');
        var on = _dereq_('./on');
        var bind = _dereq_('component-bind');
        var debug = _dereq_('debug')('socket.io-client:socket');
        var hasBin = _dereq_('has-binary');

        /**
         * Module exports.
         */

        module.exports = exports = Socket;

        /**
         * Internal events (blacklisted).
         * These events can't be emitted by the user.
         *
         * @api private
         */

        var events = {
          connect: 1,
          connect_error: 1,
          connect_timeout: 1,
          connecting: 1,
          disconnect: 1,
          error: 1,
          reconnect: 1,
          reconnect_attempt: 1,
          reconnect_failed: 1,
          reconnect_error: 1,
          reconnecting: 1,
          ping: 1,
          pong: 1
        };

        /**
         * Shortcut to `Emitter#emit`.
         */

        var emit = Emitter.prototype.emit;

        /**
         * `Socket` constructor.
         *
         * @api public
         */

        function Socket(io, nsp) {
          this.io = io;
          this.nsp = nsp;
          this.json = this; // compat
          this.ids = 0;
          this.acks = {};
          this.receiveBuffer = [];
          this.sendBuffer = [];
          this.connected = false;
          this.disconnected = true;
          if (this.io.autoConnect) this.open();
        }

        /**
         * Mix in `Emitter`.
         */

        Emitter(Socket.prototype);

        /**
         * Subscribe to open, close and packet events
         *
         * @api private
         */

        Socket.prototype.subEvents = function () {
          if (this.subs) return;

          var io = this.io;
          this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
        };

        /**
         * "Opens" the socket.
         *
         * @api public
         */

        Socket.prototype.open = Socket.prototype.connect = function () {
          if (this.connected) return this;

          this.subEvents();
          this.io.open(); // ensure open
          if ('open' == this.io.readyState) this.onopen();
          this.emit('connecting');
          return this;
        };

        /**
         * Sends a `message` event.
         *
         * @return {Socket} self
         * @api public
         */

        Socket.prototype.send = function () {
          var args = toArray(arguments);
          args.unshift('message');
          this.emit.apply(this, args);
          return this;
        };

        /**
         * Override `emit`.
         * If the event is in `events`, it's emitted normally.
         *
         * @param {String} event name
         * @return {Socket} self
         * @api public
         */

        Socket.prototype.emit = function (ev) {
          if (events.hasOwnProperty(ev)) {
            emit.apply(this, arguments);
            return this;
          }

          var args = toArray(arguments);
          var parserType = parser.EVENT; // default
          if (hasBin(args)) {
            parserType = parser.BINARY_EVENT;
          } // binary
          var packet = { type: parserType, data: args };

          packet.options = {};
          packet.options.compress = !this.flags || false !== this.flags.compress;

          // event ack callback
          if ('function' == typeof args[args.length - 1]) {
            debug('emitting packet with ack id %d', this.ids);
            this.acks[this.ids] = args.pop();
            packet.id = this.ids++;
          }

          if (this.connected) {
            this.packet(packet);
          } else {
            this.sendBuffer.push(packet);
          }

          delete this.flags;

          return this;
        };

        /**
         * Sends a packet.
         *
         * @param {Object} packet
         * @api private
         */

        Socket.prototype.packet = function (packet) {
          packet.nsp = this.nsp;
          this.io.packet(packet);
        };

        /**
         * Called upon engine `open`.
         *
         * @api private
         */

        Socket.prototype.onopen = function () {
          debug('transport is open - connecting');

          // write connect packet if necessary
          if ('/' != this.nsp) {
            this.packet({ type: parser.CONNECT });
          }
        };

        /**
         * Called upon engine `close`.
         *
         * @param {String} reason
         * @api private
         */

        Socket.prototype.onclose = function (reason) {
          debug('close (%s)', reason);
          this.connected = false;
          this.disconnected = true;
          delete this.id;
          this.emit('disconnect', reason);
        };

        /**
         * Called with socket packet.
         *
         * @param {Object} packet
         * @api private
         */

        Socket.prototype.onpacket = function (packet) {
          if (packet.nsp != this.nsp) return;

          switch (packet.type) {
            case parser.CONNECT:
              this.onconnect();
              break;

            case parser.EVENT:
              this.onevent(packet);
              break;

            case parser.BINARY_EVENT:
              this.onevent(packet);
              break;

            case parser.ACK:
              this.onack(packet);
              break;

            case parser.BINARY_ACK:
              this.onack(packet);
              break;

            case parser.DISCONNECT:
              this.ondisconnect();
              break;

            case parser.ERROR:
              this.emit('error', packet.data);
              break;
          }
        };

        /**
         * Called upon a server event.
         *
         * @param {Object} packet
         * @api private
         */

        Socket.prototype.onevent = function (packet) {
          var args = packet.data || [];
          debug('emitting event %j', args);

          if (null != packet.id) {
            debug('attaching ack callback to event');
            args.push(this.ack(packet.id));
          }

          if (this.connected) {
            emit.apply(this, args);
          } else {
            this.receiveBuffer.push(args);
          }
        };

        /**
         * Produces an ack callback to emit with an event.
         *
         * @api private
         */

        Socket.prototype.ack = function (id) {
          var self = this;
          var sent = false;
          return function () {
            // prevent double callbacks
            if (sent) return;
            sent = true;
            var args = toArray(arguments);
            debug('sending ack %j', args);

            var type = hasBin(args) ? parser.BINARY_ACK : parser.ACK;
            self.packet({
              type: type,
              id: id,
              data: args
            });
          };
        };

        /**
         * Called upon a server acknowlegement.
         *
         * @param {Object} packet
         * @api private
         */

        Socket.prototype.onack = function (packet) {
          var ack = this.acks[packet.id];
          if ('function' == typeof ack) {
            debug('calling ack %s with %j', packet.id, packet.data);
            ack.apply(this, packet.data);
            delete this.acks[packet.id];
          } else {
            debug('bad ack %s', packet.id);
          }
        };

        /**
         * Called upon server connect.
         *
         * @api private
         */

        Socket.prototype.onconnect = function () {
          this.connected = true;
          this.disconnected = false;
          this.emit('connect');
          this.emitBuffered();
        };

        /**
         * Emit buffered events (received and emitted).
         *
         * @api private
         */

        Socket.prototype.emitBuffered = function () {
          var i;
          for (i = 0; i < this.receiveBuffer.length; i++) {
            emit.apply(this, this.receiveBuffer[i]);
          }
          this.receiveBuffer = [];

          for (i = 0; i < this.sendBuffer.length; i++) {
            this.packet(this.sendBuffer[i]);
          }
          this.sendBuffer = [];
        };

        /**
         * Called upon server disconnect.
         *
         * @api private
         */

        Socket.prototype.ondisconnect = function () {
          debug('server disconnect (%s)', this.nsp);
          this.destroy();
          this.onclose('io server disconnect');
        };

        /**
         * Called upon forced client/server side disconnections,
         * this method ensures the manager stops tracking us and
         * that reconnections don't get triggered for this.
         *
         * @api private.
         */

        Socket.prototype.destroy = function () {
          if (this.subs) {
            // clean subscriptions to avoid reconnections
            for (var i = 0; i < this.subs.length; i++) {
              this.subs[i].destroy();
            }
            this.subs = null;
          }

          this.io.destroy(this);
        };

        /**
         * Disconnects the socket manually.
         *
         * @return {Socket} self
         * @api public
         */

        Socket.prototype.close = Socket.prototype.disconnect = function () {
          if (this.connected) {
            debug('performing disconnect (%s)', this.nsp);
            this.packet({ type: parser.DISCONNECT });
          }

          // remove socket from pool
          this.destroy();

          if (this.connected) {
            // fire events
            this.onclose('io client disconnect');
          }
          return this;
        };

        /**
         * Sets the compress flag.
         *
         * @param {Boolean} if `true`, compresses the sending data
         * @return {Socket} self
         * @api public
         */

        Socket.prototype.compress = function (compress) {
          this.flags = this.flags || {};
          this.flags.compress = compress;
          return this;
        };
      }, { "./on": 3, "component-bind": 11, "component-emitter": 12, "debug": 14, "has-binary": 30, "socket.io-parser": 40, "to-array": 43 }], 5: [function (_dereq_, module, exports) {
        (function (global) {

          /**
           * Module dependencies.
           */

          var parseuri = _dereq_('parseuri');
          var debug = _dereq_('debug')('socket.io-client:url');

          /**
           * Module exports.
           */

          module.exports = url;

          /**
           * URL parser.
           *
           * @param {String} url
           * @param {Object} An object meant to mimic window.location.
           *                 Defaults to window.location.
           * @api public
           */

          function url(uri, loc) {
            var obj = uri;

            // default to window.location
            var loc = loc || global.location;
            if (null == uri) uri = loc.protocol + '//' + loc.host;

            // relative path support
            if ('string' == typeof uri) {
              if ('/' == uri.charAt(0)) {
                if ('/' == uri.charAt(1)) {
                  uri = loc.protocol + uri;
                } else {
                  uri = loc.host + uri;
                }
              }

              if (!/^(https?|wss?):\/\//.test(uri)) {
                debug('protocol-less url %s', uri);
                if ('undefined' != typeof loc) {
                  uri = loc.protocol + '//' + uri;
                } else {
                  uri = 'https://' + uri;
                }
              }

              // parse
              debug('parse %s', uri);
              obj = parseuri(uri);
            }

            // make sure we treat `localhost:80` and `localhost` equally
            if (!obj.port) {
              if (/^(http|ws)$/.test(obj.protocol)) {
                obj.port = '80';
              } else if (/^(http|ws)s$/.test(obj.protocol)) {
                obj.port = '443';
              }
            }

            obj.path = obj.path || '/';

            var ipv6 = obj.host.indexOf(':') !== -1;
            var host = ipv6 ? '[' + obj.host + ']' : obj.host;

            // define unique id
            obj.id = obj.protocol + '://' + host + ':' + obj.port;
            // define href
            obj.href = obj.protocol + '://' + host + (loc && loc.port == obj.port ? '' : ':' + obj.port);

            return obj;
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "debug": 14, "parseuri": 38 }], 6: [function (_dereq_, module, exports) {
        module.exports = after;

        function after(count, callback, err_cb) {
          var bail = false;
          err_cb = err_cb || noop;
          proxy.count = count;

          return count === 0 ? callback() : proxy;

          function proxy(err, result) {
            if (proxy.count <= 0) {
              throw new Error('after called too many times');
            }
            --proxy.count;

            // after first error, rest are passed to err_cb
            if (err) {
              bail = true;
              callback(err);
              // future error callbacks will go to error handler
              callback = err_cb;
            } else if (proxy.count === 0 && !bail) {
              callback(null, result);
            }
          }
        }

        function noop() {}
      }, {}], 7: [function (_dereq_, module, exports) {
        /**
         * An abstraction for slicing an arraybuffer even when
         * ArrayBuffer.prototype.slice is not supported
         *
         * @api public
         */

        module.exports = function (arraybuffer, start, end) {
          var bytes = arraybuffer.byteLength;
          start = start || 0;
          end = end || bytes;

          if (arraybuffer.slice) {
            return arraybuffer.slice(start, end);
          }

          if (start < 0) {
            start += bytes;
          }
          if (end < 0) {
            end += bytes;
          }
          if (end > bytes) {
            end = bytes;
          }

          if (start >= bytes || start >= end || bytes === 0) {
            return new ArrayBuffer(0);
          }

          var abv = new Uint8Array(arraybuffer);
          var result = new Uint8Array(end - start);
          for (var i = start, ii = 0; i < end; i++, ii++) {
            result[ii] = abv[i];
          }
          return result.buffer;
        };
      }, {}], 8: [function (_dereq_, module, exports) {

        /**
         * Expose `Backoff`.
         */

        module.exports = Backoff;

        /**
         * Initialize backoff timer with `opts`.
         *
         * - `min` initial timeout in milliseconds [100]
         * - `max` max timeout [10000]
         * - `jitter` [0]
         * - `factor` [2]
         *
         * @param {Object} opts
         * @api public
         */

        function Backoff(opts) {
          opts = opts || {};
          this.ms = opts.min || 100;
          this.max = opts.max || 10000;
          this.factor = opts.factor || 2;
          this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
          this.attempts = 0;
        }

        /**
         * Return the backoff duration.
         *
         * @return {Number}
         * @api public
         */

        Backoff.prototype.duration = function () {
          var ms = this.ms * Math.pow(this.factor, this.attempts++);
          if (this.jitter) {
            var rand = Math.random();
            var deviation = Math.floor(rand * this.jitter * ms);
            ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
          }
          return Math.min(ms, this.max) | 0;
        };

        /**
         * Reset the number of attempts.
         *
         * @api public
         */

        Backoff.prototype.reset = function () {
          this.attempts = 0;
        };

        /**
         * Set the minimum duration
         *
         * @api public
         */

        Backoff.prototype.setMin = function (min) {
          this.ms = min;
        };

        /**
         * Set the maximum duration
         *
         * @api public
         */

        Backoff.prototype.setMax = function (max) {
          this.max = max;
        };

        /**
         * Set the jitter
         *
         * @api public
         */

        Backoff.prototype.setJitter = function (jitter) {
          this.jitter = jitter;
        };
      }, {}], 9: [function (_dereq_, module, exports) {
        /*
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */
        (function () {
          "use strict";

          var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

          // Use a lookup table to find the index.
          var lookup = new Uint8Array(256);
          for (var i = 0; i < chars.length; i++) {
            lookup[chars.charCodeAt(i)] = i;
          }

          exports.encode = function (arraybuffer) {
            var bytes = new Uint8Array(arraybuffer),
                i,
                len = bytes.length,
                base64 = "";

            for (i = 0; i < len; i += 3) {
              base64 += chars[bytes[i] >> 2];
              base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
              base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
              base64 += chars[bytes[i + 2] & 63];
            }

            if (len % 3 === 2) {
              base64 = base64.substring(0, base64.length - 1) + "=";
            } else if (len % 3 === 1) {
              base64 = base64.substring(0, base64.length - 2) + "==";
            }

            return base64;
          };

          exports.decode = function (base64) {
            var bufferLength = base64.length * 0.75,
                len = base64.length,
                i,
                p = 0,
                encoded1,
                encoded2,
                encoded3,
                encoded4;

            if (base64[base64.length - 1] === "=") {
              bufferLength--;
              if (base64[base64.length - 2] === "=") {
                bufferLength--;
              }
            }

            var arraybuffer = new ArrayBuffer(bufferLength),
                bytes = new Uint8Array(arraybuffer);

            for (i = 0; i < len; i += 4) {
              encoded1 = lookup[base64.charCodeAt(i)];
              encoded2 = lookup[base64.charCodeAt(i + 1)];
              encoded3 = lookup[base64.charCodeAt(i + 2)];
              encoded4 = lookup[base64.charCodeAt(i + 3)];

              bytes[p++] = encoded1 << 2 | encoded2 >> 4;
              bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
              bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
            }

            return arraybuffer;
          };
        })();
      }, {}], 10: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Create a blob builder even when vendor prefixes exist
           */

          var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

          /**
           * Check if Blob constructor is supported
           */

          var blobSupported = (function () {
            try {
              var a = new Blob(['hi']);
              return a.size === 2;
            } catch (e) {
              return false;
            }
          })();

          /**
           * Check if Blob constructor supports ArrayBufferViews
           * Fails in Safari 6, so we need to map to ArrayBuffers there.
           */

          var blobSupportsArrayBufferView = blobSupported && (function () {
            try {
              var b = new Blob([new Uint8Array([1, 2])]);
              return b.size === 2;
            } catch (e) {
              return false;
            }
          })();

          /**
           * Check if BlobBuilder is supported
           */

          var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

          /**
           * Helper function that maps ArrayBufferViews to ArrayBuffers
           * Used by BlobBuilder constructor and old browsers that didn't
           * support it in the Blob constructor.
           */

          function mapArrayBufferViews(ary) {
            for (var i = 0; i < ary.length; i++) {
              var chunk = ary[i];
              if (chunk.buffer instanceof ArrayBuffer) {
                var buf = chunk.buffer;

                // if this is a subarray, make a copy so we only
                // include the subarray region from the underlying buffer
                if (chunk.byteLength !== buf.byteLength) {
                  var copy = new Uint8Array(chunk.byteLength);
                  copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
                  buf = copy.buffer;
                }

                ary[i] = buf;
              }
            }
          }

          function BlobBuilderConstructor(ary, options) {
            options = options || {};

            var bb = new BlobBuilder();
            mapArrayBufferViews(ary);

            for (var i = 0; i < ary.length; i++) {
              bb.append(ary[i]);
            }

            return options.type ? bb.getBlob(options.type) : bb.getBlob();
          };

          function BlobConstructor(ary, options) {
            mapArrayBufferViews(ary);
            return new Blob(ary, options || {});
          };

          module.exports = (function () {
            if (blobSupported) {
              return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
            } else if (blobBuilderSupported) {
              return BlobBuilderConstructor;
            } else {
              return undefined;
            }
          })();
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}], 11: [function (_dereq_, module, exports) {
        /**
         * Slice reference.
         */

        var slice = [].slice;

        /**
         * Bind `obj` to `fn`.
         *
         * @param {Object} obj
         * @param {Function|String} fn or string
         * @return {Function}
         * @api public
         */

        module.exports = function (obj, fn) {
          if ('string' == typeof fn) fn = obj[fn];
          if ('function' != typeof fn) throw new Error('bind() requires a function');
          var args = slice.call(arguments, 2);
          return function () {
            return fn.apply(obj, args.concat(slice.call(arguments)));
          };
        };
      }, {}], 12: [function (_dereq_, module, exports) {

        /**
         * Expose `Emitter`.
         */

        module.exports = Emitter;

        /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */

        function Emitter(obj) {
          if (obj) return mixin(obj);
        };

        /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */

        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }
          return obj;
        }

        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
          return this;
        };

        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.once = function (event, fn) {
          function on() {
            this.off(event, on);
            fn.apply(this, arguments);
          }

          on.fn = fn;
          this.on(event, on);
          return this;
        };

        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};

          // all
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }

          // specific event
          var callbacks = this._callbacks['$' + event];
          if (!callbacks) return this;

          // remove all handlers
          if (1 == arguments.length) {
            delete this._callbacks['$' + event];
            return this;
          }

          // remove specific handler
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };

        /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */

        Emitter.prototype.emit = function (event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks['$' + event];

          if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }

          return this;
        };

        /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */

        Emitter.prototype.listeners = function (event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks['$' + event] || [];
        };

        /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */

        Emitter.prototype.hasListeners = function (event) {
          return !!this.listeners(event).length;
        };
      }, {}], 13: [function (_dereq_, module, exports) {

        module.exports = function (a, b) {
          var fn = function fn() {};
          fn.prototype = b.prototype;
          a.prototype = new fn();
          a.prototype.constructor = a;
        };
      }, {}], 14: [function (_dereq_, module, exports) {

        /**
         * This is the web browser implementation of `debug()`.
         *
         * Expose `debug()` as the module.
         */

        exports = module.exports = _dereq_('./debug');
        exports.log = log;
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

        /**
         * Colors.
         */

        exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

        /**
         * Currently only WebKit-based Web Inspectors, Firefox >= v31,
         * and the Firebug extension (any Firefox version) are known
         * to support "%c" CSS customizations.
         *
         * TODO: add a `localStorage` variable to explicitly enable/disable colors
         */

        function useColors() {
          // is webkit? http://stackoverflow.com/a/16459606/376773
          return 'WebkitAppearance' in document.documentElement.style ||
          // is firebug? http://stackoverflow.com/a/398120/376773
          window.console && (console.firebug || console.exception && console.table) ||
          // is firefox >= v31?
          // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
          navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
        }

        /**
         * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
         */

        exports.formatters.j = function (v) {
          return JSON.stringify(v);
        };

        /**
         * Colorize log arguments if enabled.
         *
         * @api public
         */

        function formatArgs() {
          var args = arguments;
          var useColors = this.useColors;

          args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

          if (!useColors) return args;

          var c = 'color: ' + this.color;
          args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

          // the final "%c" is somewhat tricky, because there could be other
          // arguments passed either before or after the %c, so we need to
          // figure out the correct index to insert the CSS into
          var index = 0;
          var lastC = 0;
          args[0].replace(/%[a-z%]/g, function (match) {
            if ('%%' === match) return;
            index++;
            if ('%c' === match) {
              // we only are interested in the *last* %c
              // (the user may have provided their own)
              lastC = index;
            }
          });

          args.splice(lastC, 0, c);
          return args;
        }

        /**
         * Invokes `console.log()` when available.
         * No-op when `console.log` is not a "function".
         *
         * @api public
         */

        function log() {
          // this hackery is required for IE8/9, where
          // the `console.log` function doesn't have 'apply'
          return 'object' === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }

        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */

        function save(namespaces) {
          try {
            if (null == namespaces) {
              exports.storage.removeItem('debug');
            } else {
              exports.storage.debug = namespaces;
            }
          } catch (e) {}
        }

        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */

        function load() {
          var r;
          try {
            r = exports.storage.debug;
          } catch (e) {}
          return r;
        }

        /**
         * Enable namespaces listed in `localStorage.debug` initially.
         */

        exports.enable(load());

        /**
         * Localstorage attempts to return the localstorage.
         *
         * This is necessary because safari throws
         * when a user disables cookies/localstorage
         * and you attempt to access it.
         *
         * @return {LocalStorage}
         * @api private
         */

        function localstorage() {
          try {
            return window.localStorage;
          } catch (e) {}
        }
      }, { "./debug": 15 }], 15: [function (_dereq_, module, exports) {

        /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         *
         * Expose `debug()` as the module.
         */

        exports = module.exports = debug;
        exports.coerce = coerce;
        exports.disable = disable;
        exports.enable = enable;
        exports.enabled = enabled;
        exports.humanize = _dereq_('ms');

        /**
         * The currently active debug mode names, and names to skip.
         */

        exports.names = [];
        exports.skips = [];

        /**
         * Map of special "%n" handling functions, for the debug "format" argument.
         *
         * Valid key names are a single, lowercased letter, i.e. "n".
         */

        exports.formatters = {};

        /**
         * Previously assigned color.
         */

        var prevColor = 0;

        /**
         * Previous log timestamp.
         */

        var prevTime;

        /**
         * Select a color.
         *
         * @return {Number}
         * @api private
         */

        function selectColor() {
          return exports.colors[prevColor++ % exports.colors.length];
        }

        /**
         * Create a debugger with the given `namespace`.
         *
         * @param {String} namespace
         * @return {Function}
         * @api public
         */

        function debug(namespace) {

          // define the `disabled` version
          function disabled() {}
          disabled.enabled = false;

          // define the `enabled` version
          function enabled() {

            var self = enabled;

            // set `diff` timestamp
            var curr = +new Date();
            var ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;

            // add the `color` if not set
            if (null == self.useColors) self.useColors = exports.useColors();
            if (null == self.color && self.useColors) self.color = selectColor();

            var args = Array.prototype.slice.call(arguments);

            args[0] = exports.coerce(args[0]);

            if ('string' !== typeof args[0]) {
              // anything else let's inspect with %o
              args = ['%o'].concat(args);
            }

            // apply any `formatters` transformations
            var index = 0;
            args[0] = args[0].replace(/%([a-z%])/g, function (match, format) {
              // if we encounter an escaped % then don't increase the array index
              if (match === '%%') return match;
              index++;
              var formatter = exports.formatters[format];
              if ('function' === typeof formatter) {
                var val = args[index];
                match = formatter.call(self, val);

                // now we need to remove `args[index]` since it's inlined in the `format`
                args.splice(index, 1);
                index--;
              }
              return match;
            });

            if ('function' === typeof exports.formatArgs) {
              args = exports.formatArgs.apply(self, args);
            }
            var logFn = enabled.log || exports.log || console.log.bind(console);
            logFn.apply(self, args);
          }
          enabled.enabled = true;

          var fn = exports.enabled(namespace) ? enabled : disabled;

          fn.namespace = namespace;

          return fn;
        }

        /**
         * Enables a debug mode by namespaces. This can include modes
         * separated by a colon and wildcards.
         *
         * @param {String} namespaces
         * @api public
         */

        function enable(namespaces) {
          exports.save(namespaces);

          var split = (namespaces || '').split(/[\s,]+/);
          var len = split.length;

          for (var i = 0; i < len; i++) {
            if (!split[i]) continue; // ignore empty strings
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
              exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
            } else {
              exports.names.push(new RegExp('^' + namespaces + '$'));
            }
          }
        }

        /**
         * Disable debug output.
         *
         * @api public
         */

        function disable() {
          exports.enable('');
        }

        /**
         * Returns true if the given mode name is enabled, false otherwise.
         *
         * @param {String} name
         * @return {Boolean}
         * @api public
         */

        function enabled(name) {
          var i, len;
          for (i = 0, len = exports.skips.length; i < len; i++) {
            if (exports.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = exports.names.length; i < len; i++) {
            if (exports.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }

        /**
         * Coerce `val`.
         *
         * @param {Mixed} val
         * @return {Mixed}
         * @api private
         */

        function coerce(val) {
          if (val instanceof Error) return val.stack || val.message;
          return val;
        }
      }, { "ms": 35 }], 16: [function (_dereq_, module, exports) {

        module.exports = _dereq_('./lib/');
      }, { "./lib/": 17 }], 17: [function (_dereq_, module, exports) {

        module.exports = _dereq_('./socket');

        /**
         * Exports parser
         *
         * @api public
         *
         */
        module.exports.parser = _dereq_('engine.io-parser');
      }, { "./socket": 18, "engine.io-parser": 27 }], 18: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */

          var transports = _dereq_('./transports');
          var Emitter = _dereq_('component-emitter');
          var debug = _dereq_('debug')('engine.io-client:socket');
          var index = _dereq_('indexof');
          var parser = _dereq_('engine.io-parser');
          var parseuri = _dereq_('parseuri');
          var parsejson = _dereq_('parsejson');
          var parseqs = _dereq_('parseqs');

          /**
           * Module exports.
           */

          module.exports = Socket;

          /**
           * Noop function.
           *
           * @api private
           */

          function noop() {}

          /**
           * Socket constructor.
           *
           * @param {String|Object} uri or options
           * @param {Object} options
           * @api public
           */

          function Socket(uri, opts) {
            if (!(this instanceof Socket)) return new Socket(uri, opts);

            opts = opts || {};

            if (uri && 'object' == typeof uri) {
              opts = uri;
              uri = null;
            }

            if (uri) {
              uri = parseuri(uri);
              opts.hostname = uri.host;
              opts.secure = uri.protocol == 'https' || uri.protocol == 'wss';
              opts.port = uri.port;
              if (uri.query) opts.query = uri.query;
            } else if (opts.host) {
              opts.hostname = parseuri(opts.host).host;
            }

            this.secure = null != opts.secure ? opts.secure : global.location && 'https:' == location.protocol;

            if (opts.hostname && !opts.port) {
              // if no port is specified manually, use the protocol default
              opts.port = this.secure ? '443' : '80';
            }

            this.agent = opts.agent || false;
            this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
            this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
            this.query = opts.query || {};
            if ('string' == typeof this.query) this.query = parseqs.decode(this.query);
            this.upgrade = false !== opts.upgrade;
            this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
            this.forceJSONP = !!opts.forceJSONP;
            this.jsonp = false !== opts.jsonp;
            this.forceBase64 = !!opts.forceBase64;
            this.enablesXDR = !!opts.enablesXDR;
            this.timestampParam = opts.timestampParam || 't';
            this.timestampRequests = opts.timestampRequests;
            this.transports = opts.transports || ['polling', 'websocket'];
            this.readyState = '';
            this.writeBuffer = [];
            this.policyPort = opts.policyPort || 843;
            this.rememberUpgrade = opts.rememberUpgrade || false;
            this.binaryType = null;
            this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
            this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

            if (true === this.perMessageDeflate) this.perMessageDeflate = {};
            if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
              this.perMessageDeflate.threshold = 1024;
            }

            // SSL options for Node.js client
            this.pfx = opts.pfx || null;
            this.key = opts.key || null;
            this.passphrase = opts.passphrase || null;
            this.cert = opts.cert || null;
            this.ca = opts.ca || null;
            this.ciphers = opts.ciphers || null;
            this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;

            // other options for Node.js client
            var freeGlobal = typeof global == 'object' && global;
            if (freeGlobal.global === freeGlobal) {
              if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
                this.extraHeaders = opts.extraHeaders;
              }
            }

            this.open();
          }

          Socket.priorWebsocketSuccess = false;

          /**
           * Mix in `Emitter`.
           */

          Emitter(Socket.prototype);

          /**
           * Protocol version.
           *
           * @api public
           */

          Socket.protocol = parser.protocol; // this is an int

          /**
           * Expose deps for legacy compatibility
           * and standalone browser access.
           */

          Socket.Socket = Socket;
          Socket.Transport = _dereq_('./transport');
          Socket.transports = _dereq_('./transports');
          Socket.parser = _dereq_('engine.io-parser');

          /**
           * Creates transport of the given type.
           *
           * @param {String} transport name
           * @return {Transport}
           * @api private
           */

          Socket.prototype.createTransport = function (name) {
            debug('creating transport "%s"', name);
            var query = clone(this.query);

            // append engine.io protocol identifier
            query.EIO = parser.protocol;

            // transport name
            query.transport = name;

            // session id if we already have one
            if (this.id) query.sid = this.id;

            var transport = new transports[name]({
              agent: this.agent,
              hostname: this.hostname,
              port: this.port,
              secure: this.secure,
              path: this.path,
              query: query,
              forceJSONP: this.forceJSONP,
              jsonp: this.jsonp,
              forceBase64: this.forceBase64,
              enablesXDR: this.enablesXDR,
              timestampRequests: this.timestampRequests,
              timestampParam: this.timestampParam,
              policyPort: this.policyPort,
              socket: this,
              pfx: this.pfx,
              key: this.key,
              passphrase: this.passphrase,
              cert: this.cert,
              ca: this.ca,
              ciphers: this.ciphers,
              rejectUnauthorized: this.rejectUnauthorized,
              perMessageDeflate: this.perMessageDeflate,
              extraHeaders: this.extraHeaders
            });

            return transport;
          };

          function clone(obj) {
            var o = {};
            for (var i in obj) {
              if (obj.hasOwnProperty(i)) {
                o[i] = obj[i];
              }
            }
            return o;
          }

          /**
           * Initializes transport to use and starts probe.
           *
           * @api private
           */
          Socket.prototype.open = function () {
            var transport;
            if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') != -1) {
              transport = 'websocket';
            } else if (0 === this.transports.length) {
              // Emit error on next tick so it can be listened to
              var self = this;
              setTimeout(function () {
                self.emit('error', 'No transports available');
              }, 0);
              return;
            } else {
              transport = this.transports[0];
            }
            this.readyState = 'opening';

            // Retry with the next transport if the transport is disabled (jsonp: false)
            try {
              transport = this.createTransport(transport);
            } catch (e) {
              this.transports.shift();
              this.open();
              return;
            }

            transport.open();
            this.setTransport(transport);
          };

          /**
           * Sets the current transport. Disables the existing one (if any).
           *
           * @api private
           */

          Socket.prototype.setTransport = function (transport) {
            debug('setting transport %s', transport.name);
            var self = this;

            if (this.transport) {
              debug('clearing existing transport %s', this.transport.name);
              this.transport.removeAllListeners();
            }

            // set up transport
            this.transport = transport;

            // set up transport listeners
            transport.on('drain', function () {
              self.onDrain();
            }).on('packet', function (packet) {
              self.onPacket(packet);
            }).on('error', function (e) {
              self.onError(e);
            }).on('close', function () {
              self.onClose('transport close');
            });
          };

          /**
           * Probes a transport.
           *
           * @param {String} transport name
           * @api private
           */

          Socket.prototype.probe = function (name) {
            debug('probing transport "%s"', name);
            var transport = this.createTransport(name, { probe: 1 }),
                failed = false,
                self = this;

            Socket.priorWebsocketSuccess = false;

            function onTransportOpen() {
              if (self.onlyBinaryUpgrades) {
                var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
                failed = failed || upgradeLosesBinary;
              }
              if (failed) return;

              debug('probe transport "%s" opened', name);
              transport.send([{ type: 'ping', data: 'probe' }]);
              transport.once('packet', function (msg) {
                if (failed) return;
                if ('pong' == msg.type && 'probe' == msg.data) {
                  debug('probe transport "%s" pong', name);
                  self.upgrading = true;
                  self.emit('upgrading', transport);
                  if (!transport) return;
                  Socket.priorWebsocketSuccess = 'websocket' == transport.name;

                  debug('pausing current transport "%s"', self.transport.name);
                  self.transport.pause(function () {
                    if (failed) return;
                    if ('closed' == self.readyState) return;
                    debug('changing transport and sending upgrade packet');

                    cleanup();

                    self.setTransport(transport);
                    transport.send([{ type: 'upgrade' }]);
                    self.emit('upgrade', transport);
                    transport = null;
                    self.upgrading = false;
                    self.flush();
                  });
                } else {
                  debug('probe transport "%s" failed', name);
                  var err = new Error('probe error');
                  err.transport = transport.name;
                  self.emit('upgradeError', err);
                }
              });
            }

            function freezeTransport() {
              if (failed) return;

              // Any callback called by transport should be ignored since now
              failed = true;

              cleanup();

              transport.close();
              transport = null;
            }

            //Handle any error that happens while probing
            function onerror(err) {
              var error = new Error('probe error: ' + err);
              error.transport = transport.name;

              freezeTransport();

              debug('probe transport "%s" failed because of error: %s', name, err);

              self.emit('upgradeError', error);
            }

            function onTransportClose() {
              onerror("transport closed");
            }

            //When the socket is closed while we're probing
            function onclose() {
              onerror("socket closed");
            }

            //When the socket is upgraded while we're probing
            function onupgrade(to) {
              if (transport && to.name != transport.name) {
                debug('"%s" works - aborting "%s"', to.name, transport.name);
                freezeTransport();
              }
            }

            //Remove all listeners on the transport and on self
            function cleanup() {
              transport.removeListener('open', onTransportOpen);
              transport.removeListener('error', onerror);
              transport.removeListener('close', onTransportClose);
              self.removeListener('close', onclose);
              self.removeListener('upgrading', onupgrade);
            }

            transport.once('open', onTransportOpen);
            transport.once('error', onerror);
            transport.once('close', onTransportClose);

            this.once('close', onclose);
            this.once('upgrading', onupgrade);

            transport.open();
          };

          /**
           * Called when connection is deemed open.
           *
           * @api public
           */

          Socket.prototype.onOpen = function () {
            debug('socket open');
            this.readyState = 'open';
            Socket.priorWebsocketSuccess = 'websocket' == this.transport.name;
            this.emit('open');
            this.flush();

            // we check for `readyState` in case an `open`
            // listener already closed the socket
            if ('open' == this.readyState && this.upgrade && this.transport.pause) {
              debug('starting upgrade probes');
              for (var i = 0, l = this.upgrades.length; i < l; i++) {
                this.probe(this.upgrades[i]);
              }
            }
          };

          /**
           * Handles a packet.
           *
           * @api private
           */

          Socket.prototype.onPacket = function (packet) {
            if ('opening' == this.readyState || 'open' == this.readyState) {
              debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

              this.emit('packet', packet);

              // Socket is live - any packet counts
              this.emit('heartbeat');

              switch (packet.type) {
                case 'open':
                  this.onHandshake(parsejson(packet.data));
                  break;

                case 'pong':
                  this.setPing();
                  this.emit('pong');
                  break;

                case 'error':
                  var err = new Error('server error');
                  err.code = packet.data;
                  this.onError(err);
                  break;

                case 'message':
                  this.emit('data', packet.data);
                  this.emit('message', packet.data);
                  break;
              }
            } else {
              debug('packet received with socket readyState "%s"', this.readyState);
            }
          };

          /**
           * Called upon handshake completion.
           *
           * @param {Object} handshake obj
           * @api private
           */

          Socket.prototype.onHandshake = function (data) {
            this.emit('handshake', data);
            this.id = data.sid;
            this.transport.query.sid = data.sid;
            this.upgrades = this.filterUpgrades(data.upgrades);
            this.pingInterval = data.pingInterval;
            this.pingTimeout = data.pingTimeout;
            this.onOpen();
            // In case open handler closes socket
            if ('closed' == this.readyState) return;
            this.setPing();

            // Prolong liveness of socket on heartbeat
            this.removeListener('heartbeat', this.onHeartbeat);
            this.on('heartbeat', this.onHeartbeat);
          };

          /**
           * Resets ping timeout.
           *
           * @api private
           */

          Socket.prototype.onHeartbeat = function (timeout) {
            clearTimeout(this.pingTimeoutTimer);
            var self = this;
            self.pingTimeoutTimer = setTimeout(function () {
              if ('closed' == self.readyState) return;
              self.onClose('ping timeout');
            }, timeout || self.pingInterval + self.pingTimeout);
          };

          /**
           * Pings server every `this.pingInterval` and expects response
           * within `this.pingTimeout` or closes connection.
           *
           * @api private
           */

          Socket.prototype.setPing = function () {
            var self = this;
            clearTimeout(self.pingIntervalTimer);
            self.pingIntervalTimer = setTimeout(function () {
              debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
              self.ping();
              self.onHeartbeat(self.pingTimeout);
            }, self.pingInterval);
          };

          /**
          * Sends a ping packet.
          *
          * @api private
          */

          Socket.prototype.ping = function () {
            var self = this;
            this.sendPacket('ping', function () {
              self.emit('ping');
            });
          };

          /**
           * Called on `drain` event
           *
           * @api private
           */

          Socket.prototype.onDrain = function () {
            this.writeBuffer.splice(0, this.prevBufferLen);

            // setting prevBufferLen = 0 is very important
            // for example, when upgrading, upgrade packet is sent over,
            // and a nonzero prevBufferLen could cause problems on `drain`
            this.prevBufferLen = 0;

            if (0 === this.writeBuffer.length) {
              this.emit('drain');
            } else {
              this.flush();
            }
          };

          /**
           * Flush write buffers.
           *
           * @api private
           */

          Socket.prototype.flush = function () {
            if ('closed' != this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
              debug('flushing %d packets in socket', this.writeBuffer.length);
              this.transport.send(this.writeBuffer);
              // keep track of current length of writeBuffer
              // splice writeBuffer and callbackBuffer on `drain`
              this.prevBufferLen = this.writeBuffer.length;
              this.emit('flush');
            }
          };

          /**
           * Sends a message.
           *
           * @param {String} message.
           * @param {Function} callback function.
           * @param {Object} options.
           * @return {Socket} for chaining.
           * @api public
           */

          Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
            this.sendPacket('message', msg, options, fn);
            return this;
          };

          /**
           * Sends a packet.
           *
           * @param {String} packet type.
           * @param {String} data.
           * @param {Object} options.
           * @param {Function} callback function.
           * @api private
           */

          Socket.prototype.sendPacket = function (type, data, options, fn) {
            if ('function' == typeof data) {
              fn = data;
              data = undefined;
            }

            if ('function' == typeof options) {
              fn = options;
              options = null;
            }

            if ('closing' == this.readyState || 'closed' == this.readyState) {
              return;
            }

            options = options || {};
            options.compress = false !== options.compress;

            var packet = {
              type: type,
              data: data,
              options: options
            };
            this.emit('packetCreate', packet);
            this.writeBuffer.push(packet);
            if (fn) this.once('flush', fn);
            this.flush();
          };

          /**
           * Closes the connection.
           *
           * @api private
           */

          Socket.prototype.close = function () {
            if ('opening' == this.readyState || 'open' == this.readyState) {
              this.readyState = 'closing';

              var self = this;

              if (this.writeBuffer.length) {
                this.once('drain', function () {
                  if (this.upgrading) {
                    waitForUpgrade();
                  } else {
                    close();
                  }
                });
              } else if (this.upgrading) {
                waitForUpgrade();
              } else {
                close();
              }
            }

            function close() {
              self.onClose('forced close');
              debug('socket closing - telling transport to close');
              self.transport.close();
            }

            function cleanupAndClose() {
              self.removeListener('upgrade', cleanupAndClose);
              self.removeListener('upgradeError', cleanupAndClose);
              close();
            }

            function waitForUpgrade() {
              // wait for upgrade to finish since we can't send packets while pausing a transport
              self.once('upgrade', cleanupAndClose);
              self.once('upgradeError', cleanupAndClose);
            }

            return this;
          };

          /**
           * Called upon transport error
           *
           * @api private
           */

          Socket.prototype.onError = function (err) {
            debug('socket error %j', err);
            Socket.priorWebsocketSuccess = false;
            this.emit('error', err);
            this.onClose('transport error', err);
          };

          /**
           * Called upon transport close.
           *
           * @api private
           */

          Socket.prototype.onClose = function (reason, desc) {
            if ('opening' == this.readyState || 'open' == this.readyState || 'closing' == this.readyState) {
              debug('socket close with reason: "%s"', reason);
              var self = this;

              // clear timers
              clearTimeout(this.pingIntervalTimer);
              clearTimeout(this.pingTimeoutTimer);

              // stop event from firing again for transport
              this.transport.removeAllListeners('close');

              // ensure transport won't stay open
              this.transport.close();

              // ignore further transport communication
              this.transport.removeAllListeners();

              // set ready state
              this.readyState = 'closed';

              // clear session id
              this.id = null;

              // emit close event
              this.emit('close', reason, desc);

              // clean buffers after, so users can still
              // grab the buffers on `close` event
              self.writeBuffer = [];
              self.prevBufferLen = 0;
            }
          };

          /**
           * Filters upgrades, returning only those matching client transports.
           *
           * @param {Array} server upgrades
           * @api private
           *
           */

          Socket.prototype.filterUpgrades = function (upgrades) {
            var filteredUpgrades = [];
            for (var i = 0, j = upgrades.length; i < j; i++) {
              if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
            }
            return filteredUpgrades;
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./transport": 19, "./transports": 20, "component-emitter": 26, "debug": 14, "engine.io-parser": 27, "indexof": 32, "parsejson": 36, "parseqs": 37, "parseuri": 38 }], 19: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */

        var parser = _dereq_('engine.io-parser');
        var Emitter = _dereq_('component-emitter');

        /**
         * Module exports.
         */

        module.exports = Transport;

        /**
         * Transport abstract constructor.
         *
         * @param {Object} options.
         * @api private
         */

        function Transport(opts) {
          this.path = opts.path;
          this.hostname = opts.hostname;
          this.port = opts.port;
          this.secure = opts.secure;
          this.query = opts.query;
          this.timestampParam = opts.timestampParam;
          this.timestampRequests = opts.timestampRequests;
          this.readyState = '';
          this.agent = opts.agent || false;
          this.socket = opts.socket;
          this.enablesXDR = opts.enablesXDR;

          // SSL options for Node.js client
          this.pfx = opts.pfx;
          this.key = opts.key;
          this.passphrase = opts.passphrase;
          this.cert = opts.cert;
          this.ca = opts.ca;
          this.ciphers = opts.ciphers;
          this.rejectUnauthorized = opts.rejectUnauthorized;

          // other options for Node.js client
          this.extraHeaders = opts.extraHeaders;
        }

        /**
         * Mix in `Emitter`.
         */

        Emitter(Transport.prototype);

        /**
         * Emits an error.
         *
         * @param {String} str
         * @return {Transport} for chaining
         * @api public
         */

        Transport.prototype.onError = function (msg, desc) {
          var err = new Error(msg);
          err.type = 'TransportError';
          err.description = desc;
          this.emit('error', err);
          return this;
        };

        /**
         * Opens the transport.
         *
         * @api public
         */

        Transport.prototype.open = function () {
          if ('closed' == this.readyState || '' == this.readyState) {
            this.readyState = 'opening';
            this.doOpen();
          }

          return this;
        };

        /**
         * Closes the transport.
         *
         * @api private
         */

        Transport.prototype.close = function () {
          if ('opening' == this.readyState || 'open' == this.readyState) {
            this.doClose();
            this.onClose();
          }

          return this;
        };

        /**
         * Sends multiple packets.
         *
         * @param {Array} packets
         * @api private
         */

        Transport.prototype.send = function (packets) {
          if ('open' == this.readyState) {
            this.write(packets);
          } else {
            throw new Error('Transport not open');
          }
        };

        /**
         * Called upon open
         *
         * @api private
         */

        Transport.prototype.onOpen = function () {
          this.readyState = 'open';
          this.writable = true;
          this.emit('open');
        };

        /**
         * Called with data.
         *
         * @param {String} data
         * @api private
         */

        Transport.prototype.onData = function (data) {
          var packet = parser.decodePacket(data, this.socket.binaryType);
          this.onPacket(packet);
        };

        /**
         * Called with a decoded packet.
         */

        Transport.prototype.onPacket = function (packet) {
          this.emit('packet', packet);
        };

        /**
         * Called upon close.
         *
         * @api private
         */

        Transport.prototype.onClose = function () {
          this.readyState = 'closed';
          this.emit('close');
        };
      }, { "component-emitter": 26, "engine.io-parser": 27 }], 20: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies
           */

          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
          var XHR = _dereq_('./polling-xhr');
          var JSONP = _dereq_('./polling-jsonp');
          var websocket = _dereq_('./websocket');

          /**
           * Export transports.
           */

          exports.polling = polling;
          exports.websocket = websocket;

          /**
           * Polling transport polymorphic constructor.
           * Decides on xhr vs jsonp based on feature detection.
           *
           * @api private
           */

          function polling(opts) {
            var xhr;
            var xd = false;
            var xs = false;
            var jsonp = false !== opts.jsonp;

            if (global.location) {
              var isSSL = 'https:' == location.protocol;
              var port = location.port;

              // some user agents have empty `location.port`
              if (!port) {
                port = isSSL ? 443 : 80;
              }

              xd = opts.hostname != location.hostname || port != opts.port;
              xs = opts.secure != isSSL;
            }

            opts.xdomain = xd;
            opts.xscheme = xs;
            xhr = new XMLHttpRequest(opts);

            if ('open' in xhr && !opts.forceJSONP) {
              return new XHR(opts);
            } else {
              if (!jsonp) throw new Error('JSONP disabled');
              return new JSONP(opts);
            }
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./polling-jsonp": 21, "./polling-xhr": 22, "./websocket": 24, "xmlhttprequest-ssl": 25 }], 21: [function (_dereq_, module, exports) {
        (function (global) {

          /**
           * Module requirements.
           */

          var Polling = _dereq_('./polling');
          var inherit = _dereq_('component-inherit');

          /**
           * Module exports.
           */

          module.exports = JSONPPolling;

          /**
           * Cached regular expressions.
           */

          var rNewline = /\n/g;
          var rEscapedNewline = /\\n/g;

          /**
           * Global JSONP callbacks.
           */

          var callbacks;

          /**
           * Callbacks count.
           */

          var index = 0;

          /**
           * Noop.
           */

          function empty() {}

          /**
           * JSONP Polling constructor.
           *
           * @param {Object} opts.
           * @api public
           */

          function JSONPPolling(opts) {
            Polling.call(this, opts);

            this.query = this.query || {};

            // define global callbacks array if not present
            // we do this here (lazily) to avoid unneeded global pollution
            if (!callbacks) {
              // we need to consider multiple engines in the same page
              if (!global.___eio) global.___eio = [];
              callbacks = global.___eio;
            }

            // callback identifier
            this.index = callbacks.length;

            // add callback to jsonp global
            var self = this;
            callbacks.push(function (msg) {
              self.onData(msg);
            });

            // append to query string
            this.query.j = this.index;

            // prevent spurious errors from being emitted when the window is unloaded
            if (global.document && global.addEventListener) {
              global.addEventListener('beforeunload', function () {
                if (self.script) self.script.onerror = empty;
              }, false);
            }
          }

          /**
           * Inherits from Polling.
           */

          inherit(JSONPPolling, Polling);

          /*
           * JSONP only supports binary as base64 encoded strings
           */

          JSONPPolling.prototype.supportsBinary = false;

          /**
           * Closes the socket.
           *
           * @api private
           */

          JSONPPolling.prototype.doClose = function () {
            if (this.script) {
              this.script.parentNode.removeChild(this.script);
              this.script = null;
            }

            if (this.form) {
              this.form.parentNode.removeChild(this.form);
              this.form = null;
              this.iframe = null;
            }

            Polling.prototype.doClose.call(this);
          };

          /**
           * Starts a poll cycle.
           *
           * @api private
           */

          JSONPPolling.prototype.doPoll = function () {
            var self = this;
            var script = document.createElement('script');

            if (this.script) {
              this.script.parentNode.removeChild(this.script);
              this.script = null;
            }

            script.async = true;
            script.src = this.uri();
            script.onerror = function (e) {
              self.onError('jsonp poll error', e);
            };

            var insertAt = document.getElementsByTagName('script')[0];
            if (insertAt) {
              insertAt.parentNode.insertBefore(script, insertAt);
            } else {
              (document.head || document.body).appendChild(script);
            }
            this.script = script;

            var isUAgecko = 'undefined' != typeof navigator && /gecko/i.test(navigator.userAgent);

            if (isUAgecko) {
              setTimeout(function () {
                var iframe = document.createElement('iframe');
                document.body.appendChild(iframe);
                document.body.removeChild(iframe);
              }, 100);
            }
          };

          /**
           * Writes with a hidden iframe.
           *
           * @param {String} data to send
           * @param {Function} called upon flush.
           * @api private
           */

          JSONPPolling.prototype.doWrite = function (data, fn) {
            var self = this;

            if (!this.form) {
              var form = document.createElement('form');
              var area = document.createElement('textarea');
              var id = this.iframeId = 'eio_iframe_' + this.index;
              var iframe;

              form.className = 'socketio';
              form.style.position = 'absolute';
              form.style.top = '-1000px';
              form.style.left = '-1000px';
              form.target = id;
              form.method = 'POST';
              form.setAttribute('accept-charset', 'utf-8');
              area.name = 'd';
              form.appendChild(area);
              document.body.appendChild(form);

              this.form = form;
              this.area = area;
            }

            this.form.action = this.uri();

            function complete() {
              initIframe();
              fn();
            }

            function initIframe() {
              if (self.iframe) {
                try {
                  self.form.removeChild(self.iframe);
                } catch (e) {
                  self.onError('jsonp polling iframe removal error', e);
                }
              }

              try {
                // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
                var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
                iframe = document.createElement(html);
              } catch (e) {
                iframe = document.createElement('iframe');
                iframe.name = self.iframeId;
                iframe.src = 'javascript:0';
              }

              iframe.id = self.iframeId;

              self.form.appendChild(iframe);
              self.iframe = iframe;
            }

            initIframe();

            // escape \n to prevent it from being converted into \r\n by some UAs
            // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
            data = data.replace(rEscapedNewline, '\\\n');
            this.area.value = data.replace(rNewline, '\\n');

            try {
              this.form.submit();
            } catch (e) {}

            if (this.iframe.attachEvent) {
              this.iframe.onreadystatechange = function () {
                if (self.iframe.readyState == 'complete') {
                  complete();
                }
              };
            } else {
              this.iframe.onload = complete;
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./polling": 23, "component-inherit": 13 }], 22: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module requirements.
           */

          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
          var Polling = _dereq_('./polling');
          var Emitter = _dereq_('component-emitter');
          var inherit = _dereq_('component-inherit');
          var debug = _dereq_('debug')('engine.io-client:polling-xhr');

          /**
           * Module exports.
           */

          module.exports = XHR;
          module.exports.Request = Request;

          /**
           * Empty function
           */

          function empty() {}

          /**
           * XHR Polling constructor.
           *
           * @param {Object} opts
           * @api public
           */

          function XHR(opts) {
            Polling.call(this, opts);

            if (global.location) {
              var isSSL = 'https:' == location.protocol;
              var port = location.port;

              // some user agents have empty `location.port`
              if (!port) {
                port = isSSL ? 443 : 80;
              }

              this.xd = opts.hostname != global.location.hostname || port != opts.port;
              this.xs = opts.secure != isSSL;
            } else {
              this.extraHeaders = opts.extraHeaders;
            }
          }

          /**
           * Inherits from Polling.
           */

          inherit(XHR, Polling);

          /**
           * XHR supports binary
           */

          XHR.prototype.supportsBinary = true;

          /**
           * Creates a request.
           *
           * @param {String} method
           * @api private
           */

          XHR.prototype.request = function (opts) {
            opts = opts || {};
            opts.uri = this.uri();
            opts.xd = this.xd;
            opts.xs = this.xs;
            opts.agent = this.agent || false;
            opts.supportsBinary = this.supportsBinary;
            opts.enablesXDR = this.enablesXDR;

            // SSL options for Node.js client
            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized;

            // other options for Node.js client
            opts.extraHeaders = this.extraHeaders;

            return new Request(opts);
          };

          /**
           * Sends data.
           *
           * @param {String} data to send.
           * @param {Function} called upon flush.
           * @api private
           */

          XHR.prototype.doWrite = function (data, fn) {
            var isBinary = typeof data !== 'string' && data !== undefined;
            var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
            var self = this;
            req.on('success', fn);
            req.on('error', function (err) {
              self.onError('xhr post error', err);
            });
            this.sendXhr = req;
          };

          /**
           * Starts a poll cycle.
           *
           * @api private
           */

          XHR.prototype.doPoll = function () {
            debug('xhr poll');
            var req = this.request();
            var self = this;
            req.on('data', function (data) {
              self.onData(data);
            });
            req.on('error', function (err) {
              self.onError('xhr poll error', err);
            });
            this.pollXhr = req;
          };

          /**
           * Request constructor
           *
           * @param {Object} options
           * @api public
           */

          function Request(opts) {
            this.method = opts.method || 'GET';
            this.uri = opts.uri;
            this.xd = !!opts.xd;
            this.xs = !!opts.xs;
            this.async = false !== opts.async;
            this.data = undefined != opts.data ? opts.data : null;
            this.agent = opts.agent;
            this.isBinary = opts.isBinary;
            this.supportsBinary = opts.supportsBinary;
            this.enablesXDR = opts.enablesXDR;

            // SSL options for Node.js client
            this.pfx = opts.pfx;
            this.key = opts.key;
            this.passphrase = opts.passphrase;
            this.cert = opts.cert;
            this.ca = opts.ca;
            this.ciphers = opts.ciphers;
            this.rejectUnauthorized = opts.rejectUnauthorized;

            // other options for Node.js client
            this.extraHeaders = opts.extraHeaders;

            this.create();
          }

          /**
           * Mix in `Emitter`.
           */

          Emitter(Request.prototype);

          /**
           * Creates the XHR object and sends the request.
           *
           * @api private
           */

          Request.prototype.create = function () {
            var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

            // SSL options for Node.js client
            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized;

            var xhr = this.xhr = new XMLHttpRequest(opts);
            var self = this;

            try {
              debug('xhr open %s: %s', this.method, this.uri);
              xhr.open(this.method, this.uri, this.async);
              try {
                if (this.extraHeaders) {
                  xhr.setDisableHeaderCheck(true);
                  for (var i in this.extraHeaders) {
                    if (this.extraHeaders.hasOwnProperty(i)) {
                      xhr.setRequestHeader(i, this.extraHeaders[i]);
                    }
                  }
                }
              } catch (e) {}
              if (this.supportsBinary) {
                // This has to be done after open because Firefox is stupid
                // http://stackoverflow.com/questions/13216903/get-binary-data-with-xmlhttprequest-in-a-firefox-extension
                xhr.responseType = 'arraybuffer';
              }

              if ('POST' == this.method) {
                try {
                  if (this.isBinary) {
                    xhr.setRequestHeader('Content-type', 'application/octet-stream');
                  } else {
                    xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
                  }
                } catch (e) {}
              }

              // ie6 check
              if ('withCredentials' in xhr) {
                xhr.withCredentials = true;
              }

              if (this.hasXDR()) {
                xhr.onload = function () {
                  self.onLoad();
                };
                xhr.onerror = function () {
                  self.onError(xhr.responseText);
                };
              } else {
                xhr.onreadystatechange = function () {
                  if (4 != xhr.readyState) return;
                  if (200 == xhr.status || 1223 == xhr.status) {
                    self.onLoad();
                  } else {
                    // make sure the `error` event handler that's user-set
                    // does not throw in the same tick and gets caught here
                    setTimeout(function () {
                      self.onError(xhr.status);
                    }, 0);
                  }
                };
              }

              debug('xhr data %s', this.data);
              xhr.send(this.data);
            } catch (e) {
              // Need to defer since .create() is called directly fhrom the constructor
              // and thus the 'error' event can only be only bound *after* this exception
              // occurs.  Therefore, also, we cannot throw here at all.
              setTimeout(function () {
                self.onError(e);
              }, 0);
              return;
            }

            if (global.document) {
              this.index = Request.requestsCount++;
              Request.requests[this.index] = this;
            }
          };

          /**
           * Called upon successful response.
           *
           * @api private
           */

          Request.prototype.onSuccess = function () {
            this.emit('success');
            this.cleanup();
          };

          /**
           * Called if we have data.
           *
           * @api private
           */

          Request.prototype.onData = function (data) {
            this.emit('data', data);
            this.onSuccess();
          };

          /**
           * Called upon error.
           *
           * @api private
           */

          Request.prototype.onError = function (err) {
            this.emit('error', err);
            this.cleanup(true);
          };

          /**
           * Cleans up house.
           *
           * @api private
           */

          Request.prototype.cleanup = function (fromError) {
            if ('undefined' == typeof this.xhr || null === this.xhr) {
              return;
            }
            // xmlhttprequest
            if (this.hasXDR()) {
              this.xhr.onload = this.xhr.onerror = empty;
            } else {
              this.xhr.onreadystatechange = empty;
            }

            if (fromError) {
              try {
                this.xhr.abort();
              } catch (e) {}
            }

            if (global.document) {
              delete Request.requests[this.index];
            }

            this.xhr = null;
          };

          /**
           * Called upon load.
           *
           * @api private
           */

          Request.prototype.onLoad = function () {
            var data;
            try {
              var contentType;
              try {
                contentType = this.xhr.getResponseHeader('Content-Type').split(';')[0];
              } catch (e) {}
              if (contentType === 'application/octet-stream') {
                data = this.xhr.response;
              } else {
                if (!this.supportsBinary) {
                  data = this.xhr.responseText;
                } else {
                  try {
                    data = String.fromCharCode.apply(null, new Uint8Array(this.xhr.response));
                  } catch (e) {
                    var ui8Arr = new Uint8Array(this.xhr.response);
                    var dataArray = [];
                    for (var idx = 0, length = ui8Arr.length; idx < length; idx++) {
                      dataArray.push(ui8Arr[idx]);
                    }

                    data = String.fromCharCode.apply(null, dataArray);
                  }
                }
              }
            } catch (e) {
              this.onError(e);
            }
            if (null != data) {
              this.onData(data);
            }
          };

          /**
           * Check if it has XDomainRequest.
           *
           * @api private
           */

          Request.prototype.hasXDR = function () {
            return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
          };

          /**
           * Aborts the request.
           *
           * @api public
           */

          Request.prototype.abort = function () {
            this.cleanup();
          };

          /**
           * Aborts pending requests when unloading the window. This is needed to prevent
           * memory leaks (e.g. when using IE) and to ensure that no spurious error is
           * emitted.
           */

          if (global.document) {
            Request.requestsCount = 0;
            Request.requests = {};
            if (global.attachEvent) {
              global.attachEvent('onunload', unloadHandler);
            } else if (global.addEventListener) {
              global.addEventListener('beforeunload', unloadHandler, false);
            }
          }

          function unloadHandler() {
            for (var i in Request.requests) {
              if (Request.requests.hasOwnProperty(i)) {
                Request.requests[i].abort();
              }
            }
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./polling": 23, "component-emitter": 26, "component-inherit": 13, "debug": 14, "xmlhttprequest-ssl": 25 }], 23: [function (_dereq_, module, exports) {
        /**
         * Module dependencies.
         */

        var Transport = _dereq_('../transport');
        var parseqs = _dereq_('parseqs');
        var parser = _dereq_('engine.io-parser');
        var inherit = _dereq_('component-inherit');
        var yeast = _dereq_('yeast');
        var debug = _dereq_('debug')('engine.io-client:polling');

        /**
         * Module exports.
         */

        module.exports = Polling;

        /**
         * Is XHR2 supported?
         */

        var hasXHR2 = (function () {
          var XMLHttpRequest = _dereq_('xmlhttprequest-ssl');
          var xhr = new XMLHttpRequest({ xdomain: false });
          return null != xhr.responseType;
        })();

        /**
         * Polling interface.
         *
         * @param {Object} opts
         * @api private
         */

        function Polling(opts) {
          var forceBase64 = opts && opts.forceBase64;
          if (!hasXHR2 || forceBase64) {
            this.supportsBinary = false;
          }
          Transport.call(this, opts);
        }

        /**
         * Inherits from Transport.
         */

        inherit(Polling, Transport);

        /**
         * Transport name.
         */

        Polling.prototype.name = 'polling';

        /**
         * Opens the socket (triggers polling). We write a PING message to determine
         * when the transport is open.
         *
         * @api private
         */

        Polling.prototype.doOpen = function () {
          this.poll();
        };

        /**
         * Pauses polling.
         *
         * @param {Function} callback upon buffers are flushed and transport is paused
         * @api private
         */

        Polling.prototype.pause = function (onPause) {
          var pending = 0;
          var self = this;

          this.readyState = 'pausing';

          function pause() {
            debug('paused');
            self.readyState = 'paused';
            onPause();
          }

          if (this.polling || !this.writable) {
            var total = 0;

            if (this.polling) {
              debug('we are currently polling - waiting to pause');
              total++;
              this.once('pollComplete', function () {
                debug('pre-pause polling complete');
                --total || pause();
              });
            }

            if (!this.writable) {
              debug('we are currently writing - waiting to pause');
              total++;
              this.once('drain', function () {
                debug('pre-pause writing complete');
                --total || pause();
              });
            }
          } else {
            pause();
          }
        };

        /**
         * Starts polling cycle.
         *
         * @api public
         */

        Polling.prototype.poll = function () {
          debug('polling');
          this.polling = true;
          this.doPoll();
          this.emit('poll');
        };

        /**
         * Overloads onData to detect payloads.
         *
         * @api private
         */

        Polling.prototype.onData = function (data) {
          var self = this;
          debug('polling got data %s', data);
          var callback = function callback(packet, index, total) {
            // if its the first message we consider the transport open
            if ('opening' == self.readyState) {
              self.onOpen();
            }

            // if its a close packet, we close the ongoing requests
            if ('close' == packet.type) {
              self.onClose();
              return false;
            }

            // otherwise bypass onData and handle the message
            self.onPacket(packet);
          };

          // decode payload
          parser.decodePayload(data, this.socket.binaryType, callback);

          // if an event did not trigger closing
          if ('closed' != this.readyState) {
            // if we got data we're not polling
            this.polling = false;
            this.emit('pollComplete');

            if ('open' == this.readyState) {
              this.poll();
            } else {
              debug('ignoring poll - transport state "%s"', this.readyState);
            }
          }
        };

        /**
         * For polling, send a close packet.
         *
         * @api private
         */

        Polling.prototype.doClose = function () {
          var self = this;

          function close() {
            debug('writing close packet');
            self.write([{ type: 'close' }]);
          }

          if ('open' == this.readyState) {
            debug('transport open - closing');
            close();
          } else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            debug('transport not open - deferring close');
            this.once('open', close);
          }
        };

        /**
         * Writes a packets payload.
         *
         * @param {Array} data packets
         * @param {Function} drain callback
         * @api private
         */

        Polling.prototype.write = function (packets) {
          var self = this;
          this.writable = false;
          var callbackfn = function callbackfn() {
            self.writable = true;
            self.emit('drain');
          };

          var self = this;
          parser.encodePayload(packets, this.supportsBinary, function (data) {
            self.doWrite(data, callbackfn);
          });
        };

        /**
         * Generates uri for connection.
         *
         * @api private
         */

        Polling.prototype.uri = function () {
          var query = this.query || {};
          var schema = this.secure ? 'https' : 'http';
          var port = '';

          // cache busting is forced
          if (false !== this.timestampRequests) {
            query[this.timestampParam] = yeast();
          }

          if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
          }

          query = parseqs.encode(query);

          // avoid port if default for schema
          if (this.port && ('https' == schema && this.port != 443 || 'http' == schema && this.port != 80)) {
            port = ':' + this.port;
          }

          // prepend ? to query
          if (query.length) {
            query = '?' + query;
          }

          var ipv6 = this.hostname.indexOf(':') !== -1;
          return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
        };
      }, { "../transport": 19, "component-inherit": 13, "debug": 14, "engine.io-parser": 27, "parseqs": 37, "xmlhttprequest-ssl": 25, "yeast": 45 }], 24: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */

          var Transport = _dereq_('../transport');
          var parser = _dereq_('engine.io-parser');
          var parseqs = _dereq_('parseqs');
          var inherit = _dereq_('component-inherit');
          var yeast = _dereq_('yeast');
          var debug = _dereq_('debug')('engine.io-client:websocket');
          var BrowserWebSocket = global.WebSocket || global.MozWebSocket;

          /**
           * Get either the `WebSocket` or `MozWebSocket` globals
           * in the browser or try to resolve WebSocket-compatible
           * interface exposed by `ws` for Node-like environment.
           */

          var WebSocket = BrowserWebSocket;
          if (!WebSocket && typeof window === 'undefined') {
            try {
              WebSocket = _dereq_('ws');
            } catch (e) {}
          }

          /**
           * Module exports.
           */

          module.exports = WS;

          /**
           * WebSocket transport constructor.
           *
           * @api {Object} connection options
           * @api public
           */

          function WS(opts) {
            var forceBase64 = opts && opts.forceBase64;
            if (forceBase64) {
              this.supportsBinary = false;
            }
            this.perMessageDeflate = opts.perMessageDeflate;
            Transport.call(this, opts);
          }

          /**
           * Inherits from Transport.
           */

          inherit(WS, Transport);

          /**
           * Transport name.
           *
           * @api public
           */

          WS.prototype.name = 'websocket';

          /*
           * WebSockets support binary
           */

          WS.prototype.supportsBinary = true;

          /**
           * Opens socket.
           *
           * @api private
           */

          WS.prototype.doOpen = function () {
            if (!this.check()) {
              // let probe timeout
              return;
            }

            var self = this;
            var uri = this.uri();
            var protocols = void 0;
            var opts = {
              agent: this.agent,
              perMessageDeflate: this.perMessageDeflate
            };

            // SSL options for Node.js client
            opts.pfx = this.pfx;
            opts.key = this.key;
            opts.passphrase = this.passphrase;
            opts.cert = this.cert;
            opts.ca = this.ca;
            opts.ciphers = this.ciphers;
            opts.rejectUnauthorized = this.rejectUnauthorized;
            if (this.extraHeaders) {
              opts.headers = this.extraHeaders;
            }

            this.ws = BrowserWebSocket ? new WebSocket(uri) : new WebSocket(uri, protocols, opts);

            if (this.ws.binaryType === undefined) {
              this.supportsBinary = false;
            }

            if (this.ws.supports && this.ws.supports.binary) {
              this.supportsBinary = true;
              this.ws.binaryType = 'buffer';
            } else {
              this.ws.binaryType = 'arraybuffer';
            }

            this.addEventListeners();
          };

          /**
           * Adds event listeners to the socket
           *
           * @api private
           */

          WS.prototype.addEventListeners = function () {
            var self = this;

            this.ws.onopen = function () {
              self.onOpen();
            };
            this.ws.onclose = function () {
              self.onClose();
            };
            this.ws.onmessage = function (ev) {
              self.onData(ev.data);
            };
            this.ws.onerror = function (e) {
              self.onError('websocket error', e);
            };
          };

          /**
           * Override `onData` to use a timer on iOS.
           * See: https://gist.github.com/mloughran/2052006
           *
           * @api private
           */

          if ('undefined' != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent)) {
            WS.prototype.onData = function (data) {
              var self = this;
              setTimeout(function () {
                Transport.prototype.onData.call(self, data);
              }, 0);
            };
          }

          /**
           * Writes data to socket.
           *
           * @param {Array} array of packets.
           * @api private
           */

          WS.prototype.write = function (packets) {
            var self = this;
            this.writable = false;

            // encodePacket efficient as it uses WS framing
            // no need for encodePayload
            var total = packets.length;
            for (var i = 0, l = total; i < l; i++) {
              (function (packet) {
                parser.encodePacket(packet, self.supportsBinary, function (data) {
                  if (!BrowserWebSocket) {
                    // always create a new object (GH-437)
                    var opts = {};
                    if (packet.options) {
                      opts.compress = packet.options.compress;
                    }

                    if (self.perMessageDeflate) {
                      var len = 'string' == typeof data ? global.Buffer.byteLength(data) : data.length;
                      if (len < self.perMessageDeflate.threshold) {
                        opts.compress = false;
                      }
                    }
                  }

                  //Sometimes the websocket has already been closed but the browser didn't
                  //have a chance of informing us about it yet, in that case send will
                  //throw an error
                  try {
                    if (BrowserWebSocket) {
                      // TypeError is thrown when passing the second argument on Safari
                      self.ws.send(data);
                    } else {
                      self.ws.send(data, opts);
                    }
                  } catch (e) {
                    debug('websocket closed before onclose event');
                  }

                  --total || done();
                });
              })(packets[i]);
            }

            function done() {
              self.emit('flush');

              // fake drain
              // defer to next tick to allow Socket to clear writeBuffer
              setTimeout(function () {
                self.writable = true;
                self.emit('drain');
              }, 0);
            }
          };

          /**
           * Called upon close
           *
           * @api private
           */

          WS.prototype.onClose = function () {
            Transport.prototype.onClose.call(this);
          };

          /**
           * Closes socket.
           *
           * @api private
           */

          WS.prototype.doClose = function () {
            if (typeof this.ws !== 'undefined') {
              this.ws.close();
            }
          };

          /**
           * Generates uri for connection.
           *
           * @api private
           */

          WS.prototype.uri = function () {
            var query = this.query || {};
            var schema = this.secure ? 'wss' : 'ws';
            var port = '';

            // avoid port if default for schema
            if (this.port && ('wss' == schema && this.port != 443 || 'ws' == schema && this.port != 80)) {
              port = ':' + this.port;
            }

            // append timestamp to URI
            if (this.timestampRequests) {
              query[this.timestampParam] = yeast();
            }

            // communicate binary support capabilities
            if (!this.supportsBinary) {
              query.b64 = 1;
            }

            query = parseqs.encode(query);

            // prepend ? to query
            if (query.length) {
              query = '?' + query;
            }

            var ipv6 = this.hostname.indexOf(':') !== -1;
            return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
          };

          /**
           * Feature detection for WebSocket.
           *
           * @return {Boolean} whether this transport is available.
           * @api public
           */

          WS.prototype.check = function () {
            return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "../transport": 19, "component-inherit": 13, "debug": 14, "engine.io-parser": 27, "parseqs": 37, "ws": undefined, "yeast": 45 }], 25: [function (_dereq_, module, exports) {
        // browser shim for xmlhttprequest module
        var hasCORS = _dereq_('has-cors');

        module.exports = function (opts) {
          var xdomain = opts.xdomain;

          // scheme must be same when usign XDomainRequest
          // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
          var xscheme = opts.xscheme;

          // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
          // https://github.com/Automattic/engine.io-client/pull/217
          var enablesXDR = opts.enablesXDR;

          // XMLHttpRequest can be disabled on IE
          try {
            if ('undefined' != typeof XMLHttpRequest && (!xdomain || hasCORS)) {
              return new XMLHttpRequest();
            }
          } catch (e) {}

          // Use XDomainRequest for IE8 if enablesXDR is true
          // because loading bar keeps flashing when using jsonp-polling
          // https://github.com/yujiosaka/socke.io-ie8-loading-example
          try {
            if ('undefined' != typeof XDomainRequest && !xscheme && enablesXDR) {
              return new XDomainRequest();
            }
          } catch (e) {}

          if (!xdomain) {
            try {
              return new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) {}
          }
        };
      }, { "has-cors": 31 }], 26: [function (_dereq_, module, exports) {

        /**
         * Expose `Emitter`.
         */

        module.exports = Emitter;

        /**
         * Initialize a new `Emitter`.
         *
         * @api public
         */

        function Emitter(obj) {
          if (obj) return mixin(obj);
        };

        /**
         * Mixin the emitter properties.
         *
         * @param {Object} obj
         * @return {Object}
         * @api private
         */

        function mixin(obj) {
          for (var key in Emitter.prototype) {
            obj[key] = Emitter.prototype[key];
          }
          return obj;
        }

        /**
         * Listen on the given `event` with `fn`.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};
          (this._callbacks[event] = this._callbacks[event] || []).push(fn);
          return this;
        };

        /**
         * Adds an `event` listener that will be invoked a single
         * time then automatically removed.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.once = function (event, fn) {
          var self = this;
          this._callbacks = this._callbacks || {};

          function on() {
            self.off(event, on);
            fn.apply(this, arguments);
          }

          on.fn = fn;
          this.on(event, on);
          return this;
        };

        /**
         * Remove the given callback for `event` or all
         * registered callbacks.
         *
         * @param {String} event
         * @param {Function} fn
         * @return {Emitter}
         * @api public
         */

        Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
          this._callbacks = this._callbacks || {};

          // all
          if (0 == arguments.length) {
            this._callbacks = {};
            return this;
          }

          // specific event
          var callbacks = this._callbacks[event];
          if (!callbacks) return this;

          // remove all handlers
          if (1 == arguments.length) {
            delete this._callbacks[event];
            return this;
          }

          // remove specific handler
          var cb;
          for (var i = 0; i < callbacks.length; i++) {
            cb = callbacks[i];
            if (cb === fn || cb.fn === fn) {
              callbacks.splice(i, 1);
              break;
            }
          }
          return this;
        };

        /**
         * Emit `event` with the given args.
         *
         * @param {String} event
         * @param {Mixed} ...
         * @return {Emitter}
         */

        Emitter.prototype.emit = function (event) {
          this._callbacks = this._callbacks || {};
          var args = [].slice.call(arguments, 1),
              callbacks = this._callbacks[event];

          if (callbacks) {
            callbacks = callbacks.slice(0);
            for (var i = 0, len = callbacks.length; i < len; ++i) {
              callbacks[i].apply(this, args);
            }
          }

          return this;
        };

        /**
         * Return array of callbacks for `event`.
         *
         * @param {String} event
         * @return {Array}
         * @api public
         */

        Emitter.prototype.listeners = function (event) {
          this._callbacks = this._callbacks || {};
          return this._callbacks[event] || [];
        };

        /**
         * Check if this emitter has `event` handlers.
         *
         * @param {String} event
         * @return {Boolean}
         * @api public
         */

        Emitter.prototype.hasListeners = function (event) {
          return !!this.listeners(event).length;
        };
      }, {}], 27: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * Module dependencies.
           */

          var keys = _dereq_('./keys');
          var hasBinary = _dereq_('has-binary');
          var sliceBuffer = _dereq_('arraybuffer.slice');
          var base64encoder = _dereq_('base64-arraybuffer');
          var after = _dereq_('after');
          var utf8 = _dereq_('utf8');

          /**
           * Check if we are running an android browser. That requires us to use
           * ArrayBuffer with polling transports...
           *
           * http://ghinda.net/jpeg-blob-ajax-android/
           */

          var isAndroid = navigator.userAgent.match(/Android/i);

          /**
           * Check if we are running in PhantomJS.
           * Uploading a Blob with PhantomJS does not work correctly, as reported here:
           * https://github.com/ariya/phantomjs/issues/11395
           * @type boolean
           */
          var isPhantomJS = /PhantomJS/i.test(navigator.userAgent);

          /**
           * When true, avoids using Blobs to encode payloads.
           * @type boolean
           */
          var dontSendBlobs = isAndroid || isPhantomJS;

          /**
           * Current protocol version.
           */

          exports.protocol = 3;

          /**
           * Packet types.
           */

          var packets = exports.packets = {
            open: 0, // non-ws
            close: 1, // non-ws
            ping: 2,
            pong: 3,
            message: 4,
            upgrade: 5,
            noop: 6
          };

          var packetslist = keys(packets);

          /**
           * Premade error packet.
           */

          var err = { type: 'error', data: 'parser error' };

          /**
           * Create a blob api even for blob builder when vendor prefixes exist
           */

          var Blob = _dereq_('blob');

          /**
           * Encodes a packet.
           *
           *     <packet type id> [ <data> ]
           *
           * Example:
           *
           *     5hello world
           *     3
           *     4
           *
           * Binary is encoded in an identical principle
           *
           * @api private
           */

          exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
            if ('function' == typeof supportsBinary) {
              callback = supportsBinary;
              supportsBinary = false;
            }

            if ('function' == typeof utf8encode) {
              callback = utf8encode;
              utf8encode = null;
            }

            var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

            if (global.ArrayBuffer && data instanceof ArrayBuffer) {
              return encodeArrayBuffer(packet, supportsBinary, callback);
            } else if (Blob && data instanceof global.Blob) {
              return encodeBlob(packet, supportsBinary, callback);
            }

            // might be an object with { base64: true, data: dataAsBase64String }
            if (data && data.base64) {
              return encodeBase64Object(packet, callback);
            }

            // Sending data as a utf-8 string
            var encoded = packets[packet.type];

            // data fragment is optional
            if (undefined !== packet.data) {
              encoded += utf8encode ? utf8.encode(String(packet.data)) : String(packet.data);
            }

            return callback('' + encoded);
          };

          function encodeBase64Object(packet, callback) {
            // packet data is an object { base64: true, data: dataAsBase64String }
            var message = 'b' + exports.packets[packet.type] + packet.data.data;
            return callback(message);
          }

          /**
           * Encode packet helpers for binary types
           */

          function encodeArrayBuffer(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            var data = packet.data;
            var contentArray = new Uint8Array(data);
            var resultBuffer = new Uint8Array(1 + data.byteLength);

            resultBuffer[0] = packets[packet.type];
            for (var i = 0; i < contentArray.length; i++) {
              resultBuffer[i + 1] = contentArray[i];
            }

            return callback(resultBuffer.buffer);
          }

          function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            var fr = new FileReader();
            fr.onload = function () {
              packet.data = fr.result;
              exports.encodePacket(packet, supportsBinary, true, callback);
            };
            return fr.readAsArrayBuffer(packet.data);
          }

          function encodeBlob(packet, supportsBinary, callback) {
            if (!supportsBinary) {
              return exports.encodeBase64Packet(packet, callback);
            }

            if (dontSendBlobs) {
              return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
            }

            var length = new Uint8Array(1);
            length[0] = packets[packet.type];
            var blob = new Blob([length.buffer, packet.data]);

            return callback(blob);
          }

          /**
           * Encodes a packet with binary data in a base64 string
           *
           * @param {Object} packet, has `type` and `data`
           * @return {String} base64 encoded message
           */

          exports.encodeBase64Packet = function (packet, callback) {
            var message = 'b' + exports.packets[packet.type];
            if (Blob && packet.data instanceof global.Blob) {
              var fr = new FileReader();
              fr.onload = function () {
                var b64 = fr.result.split(',')[1];
                callback(message + b64);
              };
              return fr.readAsDataURL(packet.data);
            }

            var b64data;
            try {
              b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
            } catch (e) {
              // iPhone Safari doesn't let you apply with typed arrays
              var typed = new Uint8Array(packet.data);
              var basic = new Array(typed.length);
              for (var i = 0; i < typed.length; i++) {
                basic[i] = typed[i];
              }
              b64data = String.fromCharCode.apply(null, basic);
            }
            message += global.btoa(b64data);
            return callback(message);
          };

          /**
           * Decodes a packet. Changes format to Blob if requested.
           *
           * @return {Object} with `type` and `data` (if any)
           * @api private
           */

          exports.decodePacket = function (data, binaryType, utf8decode) {
            // String data
            if (typeof data == 'string' || data === undefined) {
              if (data.charAt(0) == 'b') {
                return exports.decodeBase64Packet(data.substr(1), binaryType);
              }

              if (utf8decode) {
                try {
                  data = utf8.decode(data);
                } catch (e) {
                  return err;
                }
              }
              var type = data.charAt(0);

              if (Number(type) != type || !packetslist[type]) {
                return err;
              }

              if (data.length > 1) {
                return { type: packetslist[type], data: data.substring(1) };
              } else {
                return { type: packetslist[type] };
              }
            }

            var asArray = new Uint8Array(data);
            var type = asArray[0];
            var rest = sliceBuffer(data, 1);
            if (Blob && binaryType === 'blob') {
              rest = new Blob([rest]);
            }
            return { type: packetslist[type], data: rest };
          };

          /**
           * Decodes a packet encoded in a base64 string
           *
           * @param {String} base64 encoded message
           * @return {Object} with `type` and `data` (if any)
           */

          exports.decodeBase64Packet = function (msg, binaryType) {
            var type = packetslist[msg.charAt(0)];
            if (!global.ArrayBuffer) {
              return { type: type, data: { base64: true, data: msg.substr(1) } };
            }

            var data = base64encoder.decode(msg.substr(1));

            if (binaryType === 'blob' && Blob) {
              data = new Blob([data]);
            }

            return { type: type, data: data };
          };

          /**
           * Encodes multiple messages (payload).
           *
           *     <length>:data
           *
           * Example:
           *
           *     11:hello world2:hi
           *
           * If any contents are binary, they will be encoded as base64 strings. Base64
           * encoded strings are marked with a b before the length specifier
           *
           * @param {Array} packets
           * @api private
           */

          exports.encodePayload = function (packets, supportsBinary, callback) {
            if (typeof supportsBinary == 'function') {
              callback = supportsBinary;
              supportsBinary = null;
            }

            var isBinary = hasBinary(packets);

            if (supportsBinary && isBinary) {
              if (Blob && !dontSendBlobs) {
                return exports.encodePayloadAsBlob(packets, callback);
              }

              return exports.encodePayloadAsArrayBuffer(packets, callback);
            }

            if (!packets.length) {
              return callback('0:');
            }

            function setLengthHeader(message) {
              return message.length + ':' + message;
            }

            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, !isBinary ? false : supportsBinary, true, function (message) {
                doneCallback(null, setLengthHeader(message));
              });
            }

            map(packets, encodeOne, function (err, results) {
              return callback(results.join(''));
            });
          };

          /**
           * Async array map using after
           */

          function map(ary, each, done) {
            var result = new Array(ary.length);
            var next = after(ary.length, done);

            var eachWithIndex = function eachWithIndex(i, el, cb) {
              each(el, function (error, msg) {
                result[i] = msg;
                cb(error, result);
              });
            };

            for (var i = 0; i < ary.length; i++) {
              eachWithIndex(i, ary[i], next);
            }
          }

          /*
           * Decodes data when a payload is maybe expected. Possible binary contents are
           * decoded from their base64 representation
           *
           * @param {String} data, callback method
           * @api public
           */

          exports.decodePayload = function (data, binaryType, callback) {
            if (typeof data != 'string') {
              return exports.decodePayloadAsBinary(data, binaryType, callback);
            }

            if (typeof binaryType === 'function') {
              callback = binaryType;
              binaryType = null;
            }

            var packet;
            if (data == '') {
              // parser error - ignoring payload
              return callback(err, 0, 1);
            }

            var length = '',
                n,
                msg;

            for (var i = 0, l = data.length; i < l; i++) {
              var chr = data.charAt(i);

              if (':' != chr) {
                length += chr;
              } else {
                if ('' == length || length != (n = Number(length))) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                msg = data.substr(i + 1, n);

                if (length != msg.length) {
                  // parser error - ignoring payload
                  return callback(err, 0, 1);
                }

                if (msg.length) {
                  packet = exports.decodePacket(msg, binaryType, true);

                  if (err.type == packet.type && err.data == packet.data) {
                    // parser error in individual packet - ignoring payload
                    return callback(err, 0, 1);
                  }

                  var ret = callback(packet, i + n, l);
                  if (false === ret) return;
                }

                // advance cursor
                i += n;
                length = '';
              }
            }

            if (length != '') {
              // parser error - ignoring payload
              return callback(err, 0, 1);
            }
          };

          /**
           * Encodes multiple messages (payload) as binary.
           *
           * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
           * 255><data>
           *
           * Example:
           * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
           *
           * @param {Array} packets
           * @return {ArrayBuffer} encoded payload
           * @api private
           */

          exports.encodePayloadAsArrayBuffer = function (packets, callback) {
            if (!packets.length) {
              return callback(new ArrayBuffer(0));
            }

            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, true, true, function (data) {
                return doneCallback(null, data);
              });
            }

            map(packets, encodeOne, function (err, encodedPackets) {
              var totalLength = encodedPackets.reduce(function (acc, p) {
                var len;
                if (typeof p === 'string') {
                  len = p.length;
                } else {
                  len = p.byteLength;
                }
                return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
              }, 0);

              var resultArray = new Uint8Array(totalLength);

              var bufferIndex = 0;
              encodedPackets.forEach(function (p) {
                var isString = typeof p === 'string';
                var ab = p;
                if (isString) {
                  var view = new Uint8Array(p.length);
                  for (var i = 0; i < p.length; i++) {
                    view[i] = p.charCodeAt(i);
                  }
                  ab = view.buffer;
                }

                if (isString) {
                  // not true binary
                  resultArray[bufferIndex++] = 0;
                } else {
                  // true binary
                  resultArray[bufferIndex++] = 1;
                }

                var lenStr = ab.byteLength.toString();
                for (var i = 0; i < lenStr.length; i++) {
                  resultArray[bufferIndex++] = parseInt(lenStr[i]);
                }
                resultArray[bufferIndex++] = 255;

                var view = new Uint8Array(ab);
                for (var i = 0; i < view.length; i++) {
                  resultArray[bufferIndex++] = view[i];
                }
              });

              return callback(resultArray.buffer);
            });
          };

          /**
           * Encode as Blob
           */

          exports.encodePayloadAsBlob = function (packets, callback) {
            function encodeOne(packet, doneCallback) {
              exports.encodePacket(packet, true, true, function (encoded) {
                var binaryIdentifier = new Uint8Array(1);
                binaryIdentifier[0] = 1;
                if (typeof encoded === 'string') {
                  var view = new Uint8Array(encoded.length);
                  for (var i = 0; i < encoded.length; i++) {
                    view[i] = encoded.charCodeAt(i);
                  }
                  encoded = view.buffer;
                  binaryIdentifier[0] = 0;
                }

                var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;

                var lenStr = len.toString();
                var lengthAry = new Uint8Array(lenStr.length + 1);
                for (var i = 0; i < lenStr.length; i++) {
                  lengthAry[i] = parseInt(lenStr[i]);
                }
                lengthAry[lenStr.length] = 255;

                if (Blob) {
                  var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
                  doneCallback(null, blob);
                }
              });
            }

            map(packets, encodeOne, function (err, results) {
              return callback(new Blob(results));
            });
          };

          /*
           * Decodes data when a payload is maybe expected. Strings are decoded by
           * interpreting each byte as a key code for entries marked to start with 0. See
           * description of encodePayloadAsBinary
           *
           * @param {ArrayBuffer} data, callback method
           * @api public
           */

          exports.decodePayloadAsBinary = function (data, binaryType, callback) {
            if (typeof binaryType === 'function') {
              callback = binaryType;
              binaryType = null;
            }

            var bufferTail = data;
            var buffers = [];

            var numberTooLong = false;
            while (bufferTail.byteLength > 0) {
              var tailArray = new Uint8Array(bufferTail);
              var isString = tailArray[0] === 0;
              var msgLength = '';

              for (var i = 1;; i++) {
                if (tailArray[i] == 255) break;

                if (msgLength.length > 310) {
                  numberTooLong = true;
                  break;
                }

                msgLength += tailArray[i];
              }

              if (numberTooLong) return callback(err, 0, 1);

              bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
              msgLength = parseInt(msgLength);

              var msg = sliceBuffer(bufferTail, 0, msgLength);
              if (isString) {
                try {
                  msg = String.fromCharCode.apply(null, new Uint8Array(msg));
                } catch (e) {
                  // iPhone Safari doesn't let you apply to typed arrays
                  var typed = new Uint8Array(msg);
                  msg = '';
                  for (var i = 0; i < typed.length; i++) {
                    msg += String.fromCharCode(typed[i]);
                  }
                }
              }

              buffers.push(msg);
              bufferTail = sliceBuffer(bufferTail, msgLength);
            }

            var total = buffers.length;
            buffers.forEach(function (buffer, i) {
              callback(exports.decodePacket(buffer, binaryType, true), i, total);
            });
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./keys": 28, "after": 6, "arraybuffer.slice": 7, "base64-arraybuffer": 9, "blob": 10, "has-binary": 29, "utf8": 44 }], 28: [function (_dereq_, module, exports) {

        /**
         * Gets the keys for an object.
         *
         * @return {Array} keys
         * @api private
         */

        module.exports = Object.keys || function keys(obj) {
          var arr = [];
          var has = Object.prototype.hasOwnProperty;

          for (var i in obj) {
            if (has.call(obj, i)) {
              arr.push(i);
            }
          }
          return arr;
        };
      }, {}], 29: [function (_dereq_, module, exports) {
        (function (global) {

          /*
           * Module requirements.
           */

          var isArray = _dereq_('isarray');

          /**
           * Module exports.
           */

          module.exports = hasBinary;

          /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */

          function hasBinary(data) {

            function _hasBinary(obj) {
              if (!obj) return false;

              if (global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                return true;
              }

              if (isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                  if (_hasBinary(obj[i])) {
                    return true;
                  }
                }
              } else if (obj && 'object' == typeof obj) {
                if (obj.toJSON) {
                  obj = obj.toJSON();
                }

                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                    return true;
                  }
                }
              }

              return false;
            }

            return _hasBinary(data);
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "isarray": 33 }], 30: [function (_dereq_, module, exports) {
        (function (global) {

          /*
           * Module requirements.
           */

          var isArray = _dereq_('isarray');

          /**
           * Module exports.
           */

          module.exports = hasBinary;

          /**
           * Checks for binary data.
           *
           * Right now only Buffer and ArrayBuffer are supported..
           *
           * @param {Object} anything
           * @api public
           */

          function hasBinary(data) {

            function _hasBinary(obj) {
              if (!obj) return false;

              if (global.Buffer && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer || global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                return true;
              }

              if (isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                  if (_hasBinary(obj[i])) {
                    return true;
                  }
                }
              } else if (obj && 'object' == typeof obj) {
                // see: https://github.com/Automattic/has-binary/pull/4
                if (obj.toJSON && 'function' == typeof obj.toJSON) {
                  obj = obj.toJSON();
                }

                for (var key in obj) {
                  if (Object.prototype.hasOwnProperty.call(obj, key) && _hasBinary(obj[key])) {
                    return true;
                  }
                }
              }

              return false;
            }

            return _hasBinary(data);
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "isarray": 33 }], 31: [function (_dereq_, module, exports) {

        /**
         * Module exports.
         *
         * Logic borrowed from Modernizr:
         *
         *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
         */

        try {
          module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
        } catch (err) {
          // if XMLHttp support is disabled in IE then it will throw
          // when trying to create
          module.exports = false;
        }
      }, {}], 32: [function (_dereq_, module, exports) {

        var indexOf = [].indexOf;

        module.exports = function (arr, obj) {
          if (indexOf) return arr.indexOf(obj);
          for (var i = 0; i < arr.length; ++i) {
            if (arr[i] === obj) return i;
          }
          return -1;
        };
      }, {}], 33: [function (_dereq_, module, exports) {
        module.exports = Array.isArray || function (arr) {
          return Object.prototype.toString.call(arr) == '[object Array]';
        };
      }, {}], 34: [function (_dereq_, module, exports) {
        (function (global) {
          /*! JSON v3.3.2 | http://bestiejs.github.io/json3 | Copyright 2012-2014, Kit Cambridge | http://kit.mit-license.org */
          ;(function () {
            // Detect the `define` function exposed by asynchronous module loaders. The
            // strict `define` check is necessary for compatibility with `r.js`.
            var isLoader = typeof define === "function" && define.amd;

            // A set of types used to distinguish objects from primitives.
            var objectTypes = {
              "function": true,
              "object": true
            };

            // Detect the `exports` object exposed by CommonJS implementations.
            var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

            // Use the `global` object exposed by Node (including Browserify via
            // `insert-module-globals`), Narwhal, and Ringo as the default context,
            // and the `window` object in browsers. Rhino exports a `global` function
            // instead.
            var root = objectTypes[typeof window] && window || this,
                freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

            if (freeGlobal && (freeGlobal["global"] === freeGlobal || freeGlobal["window"] === freeGlobal || freeGlobal["self"] === freeGlobal)) {
              root = freeGlobal;
            }

            // Public: Initializes JSON 3 using the given `context` object, attaching the
            // `stringify` and `parse` functions to the specified `exports` object.
            function runInContext(context, exports) {
              context || (context = root["Object"]());
              exports || (exports = root["Object"]());

              // Native constructor aliases.
              var Number = context["Number"] || root["Number"],
                  String = context["String"] || root["String"],
                  Object = context["Object"] || root["Object"],
                  Date = context["Date"] || root["Date"],
                  SyntaxError = context["SyntaxError"] || root["SyntaxError"],
                  TypeError = context["TypeError"] || root["TypeError"],
                  Math = context["Math"] || root["Math"],
                  nativeJSON = context["JSON"] || root["JSON"];

              // Delegate to the native `stringify` and `parse` implementations.
              if (typeof nativeJSON == "object" && nativeJSON) {
                exports.stringify = nativeJSON.stringify;
                exports.parse = nativeJSON.parse;
              }

              // Convenience aliases.
              var objectProto = Object.prototype,
                  getClass = objectProto.toString,
                  isProperty,
                  forEach,
                  undef;

              // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
              var isExtended = new Date(-3509827334573292);
              try {
                // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
                // results for certain dates in Opera >= 10.53.
                isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
                // Safari < 2.0.2 stores the internal millisecond time value correctly,
                // but clips the values returned by the date methods to the range of
                // signed 32-bit integers ([-2 ** 31, 2 ** 31 - 1]).
                isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
              } catch (exception) {}

              // Internal: Determines whether the native `JSON.stringify` and `parse`
              // implementations are spec-compliant. Based on work by Ken Snyder.
              function has(name) {
                if (has[name] !== undef) {
                  // Return cached feature test result.
                  return has[name];
                }
                var isSupported;
                if (name == "bug-string-char-index") {
                  // IE <= 7 doesn't support accessing string characters using square
                  // bracket notation. IE 8 only supports this for primitives.
                  isSupported = "a"[0] != "a";
                } else if (name == "json") {
                  // Indicates whether both `JSON.stringify` and `JSON.parse` are
                  // supported.
                  isSupported = has("json-stringify") && has("json-parse");
                } else {
                  var value,
                      serialized = "{\"a\":[1,true,false,null,\"\\u0000\\b\\n\\f\\r\\t\"]}";
                  // Test `JSON.stringify`.
                  if (name == "json-stringify") {
                    var stringify = exports.stringify,
                        stringifySupported = typeof stringify == "function" && isExtended;
                    if (stringifySupported) {
                      // A test function object with a custom `toJSON` method.
                      (value = function () {
                        return 1;
                      }).toJSON = value;
                      try {
                        stringifySupported =
                        // Firefox 3.1b1 and b2 serialize string, number, and boolean
                        // primitives as object literals.
                        stringify(0) === "0" &&
                        // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                        // literals.
                        stringify(new Number()) === "0" && stringify(new String()) == '""' &&
                        // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                        // does not define a canonical JSON representation (this applies to
                        // objects with `toJSON` properties as well, *unless* they are nested
                        // within an object or array).
                        stringify(getClass) === undef &&
                        // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                        // FF 3.1b3 pass this test.
                        stringify(undef) === undef &&
                        // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                        // respectively, if the value is omitted entirely.
                        stringify() === undef &&
                        // FF 3.1b1, 2 throw an error if the given value is not a number,
                        // string, array, object, Boolean, or `null` literal. This applies to
                        // objects with custom `toJSON` methods as well, unless they are nested
                        // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                        // methods entirely.
                        stringify(value) === "1" && stringify([value]) == "[1]" &&
                        // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                        // `"[null]"`.
                        stringify([undef]) == "[null]" &&
                        // YUI 3.0.0b1 fails to serialize `null` literals.
                        stringify(null) == "null" &&
                        // FF 3.1b1, 2 halts serialization if an array contains a function:
                        // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                        // elides non-JSON values from objects and arrays, unless they
                        // define custom `toJSON` methods.
                        stringify([undef, getClass, null]) == "[null,null,null]" &&
                        // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                        // where character escape codes are expected (e.g., `\b` => `\u0008`).
                        stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                        // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                        stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]" &&
                        // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
                        // serialize extended years.
                        stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
                        // The milliseconds are optional in ES 5, but required in 5.1.
                        stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
                        // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
                        // four-digit years instead of six-digit years. Credits: @Yaffle.
                        stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
                        // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
                        // values less than 1000. Credits: @Yaffle.
                        stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
                      } catch (exception) {
                        stringifySupported = false;
                      }
                    }
                    isSupported = stringifySupported;
                  }
                  // Test `JSON.parse`.
                  if (name == "json-parse") {
                    var parse = exports.parse;
                    if (typeof parse == "function") {
                      try {
                        // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
                        // Conforming implementations should also coerce the initial argument to
                        // a string prior to parsing.
                        if (parse("0") === 0 && !parse(false)) {
                          // Simple parsing test.
                          value = parse(serialized);
                          var parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                          if (parseSupported) {
                            try {
                              // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                              parseSupported = !parse('"\t"');
                            } catch (exception) {}
                            if (parseSupported) {
                              try {
                                // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                                // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                                // certain octal literals.
                                parseSupported = parse("01") !== 1;
                              } catch (exception) {}
                            }
                            if (parseSupported) {
                              try {
                                // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                                // points. These environments, along with FF 3.1b1 and 2,
                                // also allow trailing commas in JSON objects and arrays.
                                parseSupported = parse("1.") !== 1;
                              } catch (exception) {}
                            }
                          }
                        }
                      } catch (exception) {
                        parseSupported = false;
                      }
                    }
                    isSupported = parseSupported;
                  }
                }
                return has[name] = !!isSupported;
              }

              if (!has("json")) {
                // Common `[[Class]]` name aliases.
                var functionClass = "[object Function]",
                    dateClass = "[object Date]",
                    numberClass = "[object Number]",
                    stringClass = "[object String]",
                    arrayClass = "[object Array]",
                    booleanClass = "[object Boolean]";

                // Detect incomplete support for accessing string characters by index.
                var charIndexBuggy = has("bug-string-char-index");

                // Define additional utility methods if the `Date` methods are buggy.
                if (!isExtended) {
                  var floor = Math.floor;
                  // A mapping between the months of the year and the number of days between
                  // January 1st and the first of the respective month.
                  var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                  // Internal: Calculates the number of days between the Unix epoch and the
                  // first day of the given month.
                  var getDay = function getDay(year, month) {
                    return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
                  };
                }

                // Internal: Determines if a property is a direct property of the given
                // object. Delegates to the native `Object#hasOwnProperty` method.
                if (!(isProperty = objectProto.hasOwnProperty)) {
                  isProperty = function (property) {
                    var members = {},
                        constructor;
                    if ((members.__proto__ = null, members.__proto__ = {
                      // The *proto* property cannot be set multiple times in recent
                      // versions of Firefox and SeaMonkey.
                      "toString": 1
                    }, members).toString != getClass) {
                      // Safari <= 2.0.3 doesn't implement `Object#hasOwnProperty`, but
                      // supports the mutable *proto* property.
                      isProperty = function (property) {
                        // Capture and break the object's prototype chain (see section 8.6.2
                        // of the ES 5.1 spec). The parenthesized expression prevents an
                        // unsafe transformation by the Closure Compiler.
                        var original = this.__proto__,
                            result = (property in (this.__proto__ = null, this));
                        // Restore the original prototype chain.
                        this.__proto__ = original;
                        return result;
                      };
                    } else {
                      // Capture a reference to the top-level `Object` constructor.
                      constructor = members.constructor;
                      // Use the `constructor` property to simulate `Object#hasOwnProperty` in
                      // other environments.
                      isProperty = function (property) {
                        var parent = (this.constructor || constructor).prototype;
                        return property in this && !(property in parent && this[property] === parent[property]);
                      };
                    }
                    members = null;
                    return isProperty.call(this, property);
                  };
                }

                // Internal: Normalizes the `for...in` iteration algorithm across
                // environments. Each enumerated key is yielded to a `callback` function.
                forEach = function (object, callback) {
                  var size = 0,
                      Properties,
                      members,
                      property;

                  // Tests for bugs in the current environment's `for...in` algorithm. The
                  // `valueOf` property inherits the non-enumerable flag from
                  // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
                  (Properties = function () {
                    this.valueOf = 0;
                  }).prototype.valueOf = 0;

                  // Iterate over a new instance of the `Properties` class.
                  members = new Properties();
                  for (property in members) {
                    // Ignore all properties inherited from `Object.prototype`.
                    if (isProperty.call(members, property)) {
                      size++;
                    }
                  }
                  Properties = members = null;

                  // Normalize the iteration algorithm.
                  if (!size) {
                    // A list of non-enumerable properties inherited from `Object.prototype`.
                    members = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                    // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
                    // properties.
                    forEach = function (object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          length;
                      var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
                      for (property in object) {
                        // Gecko <= 1.0 enumerates the `prototype` property of functions under
                        // certain conditions; IE does not.
                        if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                          callback(property);
                        }
                      }
                      // Manually invoke the callback for each non-enumerable property.
                      for (length = members.length; property = members[--length]; hasProperty.call(object, property) && callback(property));
                    };
                  } else if (size == 2) {
                    // Safari <= 2.0.4 enumerates shadowed properties twice.
                    forEach = function (object, callback) {
                      // Create a set of iterated properties.
                      var members = {},
                          isFunction = getClass.call(object) == functionClass,
                          property;
                      for (property in object) {
                        // Store each property name to prevent double enumeration. The
                        // `prototype` property of functions is not enumerated due to cross-
                        // environment inconsistencies.
                        if (!(isFunction && property == "prototype") && !isProperty.call(members, property) && (members[property] = 1) && isProperty.call(object, property)) {
                          callback(property);
                        }
                      }
                    };
                  } else {
                    // No bugs detected; use the standard `for...in` algorithm.
                    forEach = function (object, callback) {
                      var isFunction = getClass.call(object) == functionClass,
                          property,
                          isConstructor;
                      for (property in object) {
                        if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                          callback(property);
                        }
                      }
                      // Manually invoke the callback for the `constructor` property due to
                      // cross-environment inconsistencies.
                      if (isConstructor || isProperty.call(object, property = "constructor")) {
                        callback(property);
                      }
                    };
                  }
                  return forEach(object, callback);
                };

                // Public: Serializes a JavaScript `value` as a JSON string. The optional
                // `filter` argument may specify either a function that alters how object and
                // array members are serialized, or an array of strings and numbers that
                // indicates which properties should be serialized. The optional `width`
                // argument may be either a string or number that specifies the indentation
                // level of the output.
                if (!has("json-stringify")) {
                  // Internal: A map of control characters and their escaped equivalents.
                  var Escapes = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                  };

                  // Internal: Converts `value` into a zero-padded string such that its
                  // length is at least equal to `width`. The `width` must be <= 6.
                  var leadingZeroes = "000000";
                  var toPaddedString = function toPaddedString(width, value) {
                    // The `|| 0` expression is necessary to work around a bug in
                    // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
                    return (leadingZeroes + (value || 0)).slice(-width);
                  };

                  // Internal: Double-quotes a string `value`, replacing all ASCII control
                  // characters (characters with code unit values between 0 and 31) with
                  // their escaped equivalents. This is an implementation of the
                  // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
                  var unicodePrefix = "\\u00";
                  var quote = function quote(value) {
                    var result = '"',
                        index = 0,
                        length = value.length,
                        useCharIndex = !charIndexBuggy || length > 10;
                    var symbols = useCharIndex && (charIndexBuggy ? value.split("") : value);
                    for (; index < length; index++) {
                      var charCode = value.charCodeAt(index);
                      // If the character is a control character, append its Unicode or
                      // shorthand escape sequence; otherwise, append the character as-is.
                      switch (charCode) {
                        case 8:case 9:case 10:case 12:case 13:case 34:case 92:
                          result += Escapes[charCode];
                          break;
                        default:
                          if (charCode < 32) {
                            result += unicodePrefix + toPaddedString(2, charCode.toString(16));
                            break;
                          }
                          result += useCharIndex ? symbols[index] : value.charAt(index);
                      }
                    }
                    return result + '"';
                  };

                  // Internal: Recursively serializes an object. Implements the
                  // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
                  var serialize = function serialize(property, object, callback, properties, whitespace, indentation, stack) {
                    var value, className, year, month, date, time, hours, minutes, seconds, milliseconds, results, element, index, length, prefix, result;
                    try {
                      // Necessary for host object support.
                      value = object[property];
                    } catch (exception) {}
                    if (typeof value == "object" && value) {
                      className = getClass.call(value);
                      if (className == dateClass && !isProperty.call(value, "toJSON")) {
                        if (value > -1 / 0 && value < 1 / 0) {
                          // Dates are serialized according to the `Date#toJSON` method
                          // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
                          // for the ISO 8601 date time string format.
                          if (getDay) {
                            // Manually compute the year, month, date, hours, minutes,
                            // seconds, and milliseconds if the `getUTC*` methods are
                            // buggy. Adapted from @Yaffle's `date-shim` project.
                            date = floor(value / 864e5);
                            for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
                            for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
                            date = 1 + date - getDay(year, month);
                            // The `time` value specifies the time within the day (see ES
                            // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
                            // to compute `A modulo B`, as the `%` operator does not
                            // correspond to the `modulo` operation for negative numbers.
                            time = (value % 864e5 + 864e5) % 864e5;
                            // The hours, minutes, seconds, and milliseconds are obtained by
                            // decomposing the time within the day. See section 15.9.1.10.
                            hours = floor(time / 36e5) % 24;
                            minutes = floor(time / 6e4) % 60;
                            seconds = floor(time / 1e3) % 60;
                            milliseconds = time % 1e3;
                          } else {
                            year = value.getUTCFullYear();
                            month = value.getUTCMonth();
                            date = value.getUTCDate();
                            hours = value.getUTCHours();
                            minutes = value.getUTCMinutes();
                            seconds = value.getUTCSeconds();
                            milliseconds = value.getUTCMilliseconds();
                          }
                          // Serialize extended years correctly.
                          value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
                          // Months, dates, hours, minutes, and seconds should have two
                          // digits; milliseconds should have three.
                          "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
                          // Milliseconds are optional in ES 5.0, but required in 5.1.
                          "." + toPaddedString(3, milliseconds) + "Z";
                        } else {
                          value = null;
                        }
                      } else if (typeof value.toJSON == "function" && (className != numberClass && className != stringClass && className != arrayClass || isProperty.call(value, "toJSON"))) {
                        // Prototype <= 1.6.1 adds non-standard `toJSON` methods to the
                        // `Number`, `String`, `Date`, and `Array` prototypes. JSON 3
                        // ignores all `toJSON` methods on these objects unless they are
                        // defined directly on an instance.
                        value = value.toJSON(property);
                      }
                    }
                    if (callback) {
                      // If a replacement function was provided, call it to obtain the value
                      // for serialization.
                      value = callback.call(object, property, value);
                    }
                    if (value === null) {
                      return "null";
                    }
                    className = getClass.call(value);
                    if (className == booleanClass) {
                      // Booleans are represented literally.
                      return "" + value;
                    } else if (className == numberClass) {
                      // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                      // `"null"`.
                      return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                    } else if (className == stringClass) {
                      // Strings are double-quoted and escaped.
                      return quote("" + value);
                    }
                    // Recursively serialize objects and arrays.
                    if (typeof value == "object") {
                      // Check for cyclic structures. This is a linear search; performance
                      // is inversely proportional to the number of unique nested objects.
                      for (length = stack.length; length--;) {
                        if (stack[length] === value) {
                          // Cyclic structures cannot be serialized by `JSON.stringify`.
                          throw TypeError();
                        }
                      }
                      // Add the object to the stack of traversed objects.
                      stack.push(value);
                      results = [];
                      // Save the current indentation level and indent one additional level.
                      prefix = indentation;
                      indentation += whitespace;
                      if (className == arrayClass) {
                        // Recursively serialize array elements.
                        for (index = 0, length = value.length; index < length; index++) {
                          element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                          results.push(element === undef ? "null" : element);
                        }
                        result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                      } else {
                        // Recursively serialize object members. Members are selected from
                        // either a user-specified list of property names, or the object
                        // itself.
                        forEach(properties || value, function (property) {
                          var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                          if (element !== undef) {
                            // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                            // is not the empty string, let `member` {quote(property) + ":"}
                            // be the concatenation of `member` and the `space` character."
                            // The "`space` character" refers to the literal space
                            // character, not the `space` {width} argument provided to
                            // `JSON.stringify`.
                            results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                          }
                        });
                        result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                      }
                      // Remove the object from the traversed object stack.
                      stack.pop();
                      return result;
                    }
                  };

                  // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
                  exports.stringify = function (source, filter, width) {
                    var whitespace, callback, properties, className;
                    if (objectTypes[typeof filter] && filter) {
                      if ((className = getClass.call(filter)) == functionClass) {
                        callback = filter;
                      } else if (className == arrayClass) {
                        // Convert the property names array into a makeshift set.
                        properties = {};
                        for (var index = 0, length = filter.length, value; index < length; value = filter[index++], (className = getClass.call(value), className == stringClass || className == numberClass) && (properties[value] = 1));
                      }
                    }
                    if (width) {
                      if ((className = getClass.call(width)) == numberClass) {
                        // Convert the `width` to an integer and create a string containing
                        // `width` number of space characters.
                        if ((width -= width % 1) > 0) {
                          for (whitespace = "", width > 10 && (width = 10); whitespace.length < width; whitespace += " ");
                        }
                      } else if (className == stringClass) {
                        whitespace = width.length <= 10 ? width : width.slice(0, 10);
                      }
                    }
                    // Opera <= 7.54u2 discards the values associated with empty string keys
                    // (`""`) only if they are used directly within an object member list
                    // (e.g., `!("" in { "": 1})`).
                    return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                  };
                }

                // Public: Parses a JSON source string.
                if (!has("json-parse")) {
                  var fromCharCode = String.fromCharCode;

                  // Internal: A map of escaped control characters and their unescaped
                  // equivalents.
                  var Unescapes = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "\t",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                  };

                  // Internal: Stores the parser state.
                  var Index, Source;

                  // Internal: Resets the parser state and throws a `SyntaxError`.
                  var abort = function abort() {
                    Index = Source = null;
                    throw SyntaxError();
                  };

                  // Internal: Returns the next token, or `"$"` if the parser has reached
                  // the end of the source string. A token may be a string, number, `null`
                  // literal, or Boolean literal.
                  var lex = function lex() {
                    var source = Source,
                        length = source.length,
                        value,
                        begin,
                        position,
                        isSigned,
                        charCode;
                    while (Index < length) {
                      charCode = source.charCodeAt(Index);
                      switch (charCode) {
                        case 9:case 10:case 13:case 32:
                          // Skip whitespace tokens, including tabs, carriage returns, line
                          // feeds, and space characters.
                          Index++;
                          break;
                        case 123:case 125:case 91:case 93:case 58:case 44:
                          // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                          // the current position.
                          value = charIndexBuggy ? source.charAt(Index) : source[Index];
                          Index++;
                          return value;
                        case 34:
                          // `"` delimits a JSON string; advance to the next character and
                          // begin parsing the string. String tokens are prefixed with the
                          // sentinel `@` character to distinguish them from punctuators and
                          // end-of-string tokens.
                          for (value = "@", Index++; Index < length;) {
                            charCode = source.charCodeAt(Index);
                            if (charCode < 32) {
                              // Unescaped ASCII control characters (those with a code unit
                              // less than the space character) are not permitted.
                              abort();
                            } else if (charCode == 92) {
                              // A reverse solidus (`\`) marks the beginning of an escaped
                              // control character (including `"`, `\`, and `/`) or Unicode
                              // escape sequence.
                              charCode = source.charCodeAt(++Index);
                              switch (charCode) {
                                case 92:case 34:case 47:case 98:case 116:case 110:case 102:case 114:
                                  // Revive escaped control characters.
                                  value += Unescapes[charCode];
                                  Index++;
                                  break;
                                case 117:
                                  // `\u` marks the beginning of a Unicode escape sequence.
                                  // Advance to the first character and validate the
                                  // four-digit code point.
                                  begin = ++Index;
                                  for (position = Index + 4; Index < position; Index++) {
                                    charCode = source.charCodeAt(Index);
                                    // A valid sequence comprises four hexdigits (case-
                                    // insensitive) that form a single hexadecimal value.
                                    if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                      // Invalid Unicode escape sequence.
                                      abort();
                                    }
                                  }
                                  // Revive the escaped character.
                                  value += fromCharCode("0x" + source.slice(begin, Index));
                                  break;
                                default:
                                  // Invalid escape sequence.
                                  abort();
                              }
                            } else {
                              if (charCode == 34) {
                                // An unescaped double-quote character marks the end of the
                                // string.
                                break;
                              }
                              charCode = source.charCodeAt(Index);
                              begin = Index;
                              // Optimize for the common case where a string is valid.
                              while (charCode >= 32 && charCode != 92 && charCode != 34) {
                                charCode = source.charCodeAt(++Index);
                              }
                              // Append the string as-is.
                              value += source.slice(begin, Index);
                            }
                          }
                          if (source.charCodeAt(Index) == 34) {
                            // Advance to the next character and return the revived string.
                            Index++;
                            return value;
                          }
                          // Unterminated string.
                          abort();
                        default:
                          // Parse numbers and literals.
                          begin = Index;
                          // Advance past the negative sign, if one is specified.
                          if (charCode == 45) {
                            isSigned = true;
                            charCode = source.charCodeAt(++Index);
                          }
                          // Parse an integer or floating-point value.
                          if (charCode >= 48 && charCode <= 57) {
                            // Leading zeroes are interpreted as octal literals.
                            if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                              // Illegal octal literal.
                              abort();
                            }
                            isSigned = false;
                            // Parse the integer component.
                            for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++);
                            // Floats cannot contain a leading decimal point; however, this
                            // case is already accounted for by the parser.
                            if (source.charCodeAt(Index) == 46) {
                              position = ++Index;
                              // Parse the decimal component.
                              for (; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                              if (position == Index) {
                                // Illegal trailing decimal.
                                abort();
                              }
                              Index = position;
                            }
                            // Parse exponents. The `e` denoting the exponent is
                            // case-insensitive.
                            charCode = source.charCodeAt(Index);
                            if (charCode == 101 || charCode == 69) {
                              charCode = source.charCodeAt(++Index);
                              // Skip past the sign following the exponent, if one is
                              // specified.
                              if (charCode == 43 || charCode == 45) {
                                Index++;
                              }
                              // Parse the exponential component.
                              for (position = Index; position < length && (charCode = source.charCodeAt(position), charCode >= 48 && charCode <= 57); position++);
                              if (position == Index) {
                                // Illegal empty exponent.
                                abort();
                              }
                              Index = position;
                            }
                            // Coerce the parsed value to a JavaScript number.
                            return +source.slice(begin, Index);
                          }
                          // A negative sign may only precede numbers.
                          if (isSigned) {
                            abort();
                          }
                          // `true`, `false`, and `null` literals.
                          if (source.slice(Index, Index + 4) == "true") {
                            Index += 4;
                            return true;
                          } else if (source.slice(Index, Index + 5) == "false") {
                            Index += 5;
                            return false;
                          } else if (source.slice(Index, Index + 4) == "null") {
                            Index += 4;
                            return null;
                          }
                          // Unrecognized token.
                          abort();
                      }
                    }
                    // Return the sentinel `$` character if the parser has reached the end
                    // of the source string.
                    return "$";
                  };

                  // Internal: Parses a JSON `value` token.
                  var get = function get(value) {
                    var results, hasMembers;
                    if (value == "$") {
                      // Unexpected end of input.
                      abort();
                    }
                    if (typeof value == "string") {
                      if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                        // Remove the sentinel `@` character.
                        return value.slice(1);
                      }
                      // Parse object and array literals.
                      if (value == "[") {
                        // Parses a JSON array, returning a new JavaScript array.
                        results = [];
                        for (;; hasMembers || (hasMembers = true)) {
                          value = lex();
                          // A closing square bracket marks the end of the array literal.
                          if (value == "]") {
                            break;
                          }
                          // If the array literal contains elements, the current token
                          // should be a comma separating the previous element from the
                          // next.
                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();
                              if (value == "]") {
                                // Unexpected trailing `,` in array literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each array element.
                              abort();
                            }
                          }
                          // Elisions and leading commas are not permitted.
                          if (value == ",") {
                            abort();
                          }
                          results.push(get(value));
                        }
                        return results;
                      } else if (value == "{") {
                        // Parses a JSON object, returning a new JavaScript object.
                        results = {};
                        for (;; hasMembers || (hasMembers = true)) {
                          value = lex();
                          // A closing curly brace marks the end of the object literal.
                          if (value == "}") {
                            break;
                          }
                          // If the object literal contains members, the current token
                          // should be a comma separator.
                          if (hasMembers) {
                            if (value == ",") {
                              value = lex();
                              if (value == "}") {
                                // Unexpected trailing `,` in object literal.
                                abort();
                              }
                            } else {
                              // A `,` must separate each object member.
                              abort();
                            }
                          }
                          // Leading commas are not permitted, object property names must be
                          // double-quoted strings, and a `:` must separate each property
                          // name and value.
                          if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                            abort();
                          }
                          results[value.slice(1)] = get(lex());
                        }
                        return results;
                      }
                      // Unexpected token encountered.
                      abort();
                    }
                    return value;
                  };

                  // Internal: Updates a traversed object member.
                  var update = function update(source, property, callback) {
                    var element = walk(source, property, callback);
                    if (element === undef) {
                      delete source[property];
                    } else {
                      source[property] = element;
                    }
                  };

                  // Internal: Recursively traverses a parsed JSON object, invoking the
                  // `callback` function for each value. This is an implementation of the
                  // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
                  var walk = function walk(source, property, callback) {
                    var value = source[property],
                        length;
                    if (typeof value == "object" && value) {
                      // `forEach` can't be used to traverse an array in Opera <= 8.54
                      // because its `Object#hasOwnProperty` implementation returns `false`
                      // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
                      if (getClass.call(value) == arrayClass) {
                        for (length = value.length; length--;) {
                          update(value, length, callback);
                        }
                      } else {
                        forEach(value, function (property) {
                          update(value, property, callback);
                        });
                      }
                    }
                    return callback.call(source, property, value);
                  };

                  // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
                  exports.parse = function (source, callback) {
                    var result, value;
                    Index = 0;
                    Source = "" + source;
                    result = get(lex());
                    // If a JSON string contains multiple tokens, it is invalid.
                    if (lex() != "$") {
                      abort();
                    }
                    // Reset the parser state.
                    Index = Source = null;
                    return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
                  };
                }
              }

              exports["runInContext"] = runInContext;
              return exports;
            }

            if (freeExports && !isLoader) {
              // Export for CommonJS environments.
              runInContext(root, freeExports);
            } else {
              // Export for web browsers and JavaScript engines.
              var nativeJSON = root.JSON,
                  previousJSON = root["JSON3"],
                  isRestored = false;

              var JSON3 = runInContext(root, root["JSON3"] = {
                // Public: Restores the original value of the global `JSON` object and
                // returns a reference to the `JSON3` object.
                "noConflict": function noConflict() {
                  if (!isRestored) {
                    isRestored = true;
                    root.JSON = nativeJSON;
                    root["JSON3"] = previousJSON;
                    nativeJSON = previousJSON = null;
                  }
                  return JSON3;
                }
              });

              root.JSON = {
                "parse": JSON3.parse,
                "stringify": JSON3.stringify
              };
            }

            // Export for asynchronous module loaders.
            if (isLoader) {
              define(function () {
                return JSON3;
              });
            }
          }).call(this);
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}], 35: [function (_dereq_, module, exports) {
        /**
         * Helpers.
         */

        var s = 1000;
        var m = s * 60;
        var h = m * 60;
        var d = h * 24;
        var y = d * 365.25;

        /**
         * Parse or format the given `val`.
         *
         * Options:
         *
         *  - `long` verbose formatting [false]
         *
         * @param {String|Number} val
         * @param {Object} options
         * @return {String|Number}
         * @api public
         */

        module.exports = function (val, options) {
          options = options || {};
          if ('string' == typeof val) return parse(val);
          return options.long ? long(val) : short(val);
        };

        /**
         * Parse the given `str` and return milliseconds.
         *
         * @param {String} str
         * @return {Number}
         * @api private
         */

        function parse(str) {
          str = '' + str;
          if (str.length > 10000) return;
          var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
          if (!match) return;
          var n = parseFloat(match[1]);
          var type = (match[2] || 'ms').toLowerCase();
          switch (type) {
            case 'years':
            case 'year':
            case 'yrs':
            case 'yr':
            case 'y':
              return n * y;
            case 'days':
            case 'day':
            case 'd':
              return n * d;
            case 'hours':
            case 'hour':
            case 'hrs':
            case 'hr':
            case 'h':
              return n * h;
            case 'minutes':
            case 'minute':
            case 'mins':
            case 'min':
            case 'm':
              return n * m;
            case 'seconds':
            case 'second':
            case 'secs':
            case 'sec':
            case 's':
              return n * s;
            case 'milliseconds':
            case 'millisecond':
            case 'msecs':
            case 'msec':
            case 'ms':
              return n;
          }
        }

        /**
         * Short format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */

        function short(ms) {
          if (ms >= d) return Math.round(ms / d) + 'd';
          if (ms >= h) return Math.round(ms / h) + 'h';
          if (ms >= m) return Math.round(ms / m) + 'm';
          if (ms >= s) return Math.round(ms / s) + 's';
          return ms + 'ms';
        }

        /**
         * Long format for `ms`.
         *
         * @param {Number} ms
         * @return {String}
         * @api private
         */

        function long(ms) {
          return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
        }

        /**
         * Pluralization helper.
         */

        function plural(ms, n, name) {
          if (ms < n) return;
          if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
          return Math.ceil(ms / n) + ' ' + name + 's';
        }
      }, {}], 36: [function (_dereq_, module, exports) {
        (function (global) {
          /**
           * JSON parse.
           *
           * @see Based on jQuery#parseJSON (MIT) and JSON2
           * @api private
           */

          var rvalidchars = /^[\],:{}\s]*$/;
          var rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
          var rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
          var rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g;
          var rtrimLeft = /^\s+/;
          var rtrimRight = /\s+$/;

          module.exports = function parsejson(data) {
            if ('string' != typeof data || !data) {
              return null;
            }

            data = data.replace(rtrimLeft, '').replace(rtrimRight, '');

            // Attempt to parse using the native JSON parser first
            if (global.JSON && JSON.parse) {
              return JSON.parse(data);
            }

            if (rvalidchars.test(data.replace(rvalidescape, '@').replace(rvalidtokens, ']').replace(rvalidbraces, ''))) {
              return new Function('return ' + data)();
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}], 37: [function (_dereq_, module, exports) {
        /**
         * Compiles a querystring
         * Returns string representation of the object
         *
         * @param {Object}
         * @api private
         */

        exports.encode = function (obj) {
          var str = '';

          for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
              if (str.length) str += '&';
              str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
            }
          }

          return str;
        };

        /**
         * Parses a simple querystring into an object
         *
         * @param {String} qs
         * @api private
         */

        exports.decode = function (qs) {
          var qry = {};
          var pairs = qs.split('&');
          for (var i = 0, l = pairs.length; i < l; i++) {
            var pair = pairs[i].split('=');
            qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
          }
          return qry;
        };
      }, {}], 38: [function (_dereq_, module, exports) {
        /**
         * Parses an URI
         *
         * @author Steven Levithan <stevenlevithan.com> (MIT license)
         * @api private
         */

        var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

        var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

        module.exports = function parseuri(str) {
          var src = str,
              b = str.indexOf('['),
              e = str.indexOf(']');

          if (b != -1 && e != -1) {
            str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
          }

          var m = re.exec(str || ''),
              uri = {},
              i = 14;

          while (i--) {
            uri[parts[i]] = m[i] || '';
          }

          if (b != -1 && e != -1) {
            uri.source = src;
            uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
            uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
            uri.ipv6uri = true;
          }

          return uri;
        };
      }, {}], 39: [function (_dereq_, module, exports) {
        (function (global) {
          /*global Blob,File*/

          /**
           * Module requirements
           */

          var isArray = _dereq_('isarray');
          var isBuf = _dereq_('./is-buffer');

          /**
           * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
           * Anything with blobs or files should be fed through removeBlobs before coming
           * here.
           *
           * @param {Object} packet - socket.io event packet
           * @return {Object} with deconstructed packet and list of buffers
           * @api public
           */

          exports.deconstructPacket = function (packet) {
            var buffers = [];
            var packetData = packet.data;

            function _deconstructPacket(data) {
              if (!data) return data;

              if (isBuf(data)) {
                var placeholder = { _placeholder: true, num: buffers.length };
                buffers.push(data);
                return placeholder;
              } else if (isArray(data)) {
                var newData = new Array(data.length);
                for (var i = 0; i < data.length; i++) {
                  newData[i] = _deconstructPacket(data[i]);
                }
                return newData;
              } else if ('object' == typeof data && !(data instanceof Date)) {
                var newData = {};
                for (var key in data) {
                  newData[key] = _deconstructPacket(data[key]);
                }
                return newData;
              }
              return data;
            }

            var pack = packet;
            pack.data = _deconstructPacket(packetData);
            pack.attachments = buffers.length; // number of binary 'attachments'
            return { packet: pack, buffers: buffers };
          };

          /**
           * Reconstructs a binary packet from its placeholder packet and buffers
           *
           * @param {Object} packet - event packet with placeholders
           * @param {Array} buffers - binary buffers to put in placeholder positions
           * @return {Object} reconstructed packet
           * @api public
           */

          exports.reconstructPacket = function (packet, buffers) {
            var curPlaceHolder = 0;

            function _reconstructPacket(data) {
              if (data && data._placeholder) {
                var buf = buffers[data.num]; // appropriate buffer (should be natural order anyway)
                return buf;
              } else if (isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                  data[i] = _reconstructPacket(data[i]);
                }
                return data;
              } else if (data && 'object' == typeof data) {
                for (var key in data) {
                  data[key] = _reconstructPacket(data[key]);
                }
                return data;
              }
              return data;
            }

            packet.data = _reconstructPacket(packet.data);
            packet.attachments = undefined; // no longer useful
            return packet;
          };

          /**
           * Asynchronously removes Blobs or Files from data via
           * FileReader's readAsArrayBuffer method. Used before encoding
           * data as msgpack. Calls callback with the blobless data.
           *
           * @param {Object} data
           * @param {Function} callback
           * @api private
           */

          exports.removeBlobs = function (data, callback) {
            function _removeBlobs(obj, curKey, containingObject) {
              if (!obj) return obj;

              // convert any blob
              if (global.Blob && obj instanceof Blob || global.File && obj instanceof File) {
                pendingBlobs++;

                // async filereader
                var fileReader = new FileReader();
                fileReader.onload = function () {
                  // this.result == arraybuffer
                  if (containingObject) {
                    containingObject[curKey] = this.result;
                  } else {
                    bloblessData = this.result;
                  }

                  // if nothing pending its callback time
                  if (! --pendingBlobs) {
                    callback(bloblessData);
                  }
                };

                fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
              } else if (isArray(obj)) {
                  // handle array
                  for (var i = 0; i < obj.length; i++) {
                    _removeBlobs(obj[i], i, obj);
                  }
                } else if (obj && 'object' == typeof obj && !isBuf(obj)) {
                  // and object
                  for (var key in obj) {
                    _removeBlobs(obj[key], key, obj);
                  }
                }
            }

            var pendingBlobs = 0;
            var bloblessData = data;
            _removeBlobs(bloblessData);
            if (!pendingBlobs) {
              callback(bloblessData);
            }
          };
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, { "./is-buffer": 41, "isarray": 33 }], 40: [function (_dereq_, module, exports) {

        /**
         * Module dependencies.
         */

        var debug = _dereq_('debug')('socket.io-parser');
        var json = _dereq_('json3');
        var isArray = _dereq_('isarray');
        var Emitter = _dereq_('component-emitter');
        var binary = _dereq_('./binary');
        var isBuf = _dereq_('./is-buffer');

        /**
         * Protocol version.
         *
         * @api public
         */

        exports.protocol = 4;

        /**
         * Packet types.
         *
         * @api public
         */

        exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

        /**
         * Packet type `connect`.
         *
         * @api public
         */

        exports.CONNECT = 0;

        /**
         * Packet type `disconnect`.
         *
         * @api public
         */

        exports.DISCONNECT = 1;

        /**
         * Packet type `event`.
         *
         * @api public
         */

        exports.EVENT = 2;

        /**
         * Packet type `ack`.
         *
         * @api public
         */

        exports.ACK = 3;

        /**
         * Packet type `error`.
         *
         * @api public
         */

        exports.ERROR = 4;

        /**
         * Packet type 'binary event'
         *
         * @api public
         */

        exports.BINARY_EVENT = 5;

        /**
         * Packet type `binary ack`. For acks with binary arguments.
         *
         * @api public
         */

        exports.BINARY_ACK = 6;

        /**
         * Encoder constructor.
         *
         * @api public
         */

        exports.Encoder = Encoder;

        /**
         * Decoder constructor.
         *
         * @api public
         */

        exports.Decoder = Decoder;

        /**
         * A socket.io Encoder instance
         *
         * @api public
         */

        function Encoder() {}

        /**
         * Encode a packet as a single string if non-binary, or as a
         * buffer sequence, depending on packet type.
         *
         * @param {Object} obj - packet object
         * @param {Function} callback - function to handle encodings (likely engine.write)
         * @return Calls callback with Array of encodings
         * @api public
         */

        Encoder.prototype.encode = function (obj, callback) {
          debug('encoding packet %j', obj);

          if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
            encodeAsBinary(obj, callback);
          } else {
            var encoding = encodeAsString(obj);
            callback([encoding]);
          }
        };

        /**
         * Encode packet as string.
         *
         * @param {Object} packet
         * @return {String} encoded
         * @api private
         */

        function encodeAsString(obj) {
          var str = '';
          var nsp = false;

          // first is type
          str += obj.type;

          // attachments if we have them
          if (exports.BINARY_EVENT == obj.type || exports.BINARY_ACK == obj.type) {
            str += obj.attachments;
            str += '-';
          }

          // if we have a namespace other than `/`
          // we append it followed by a comma `,`
          if (obj.nsp && '/' != obj.nsp) {
            nsp = true;
            str += obj.nsp;
          }

          // immediately followed by the id
          if (null != obj.id) {
            if (nsp) {
              str += ',';
              nsp = false;
            }
            str += obj.id;
          }

          // json data
          if (null != obj.data) {
            if (nsp) str += ',';
            str += json.stringify(obj.data);
          }

          debug('encoded %j as %s', obj, str);
          return str;
        }

        /**
         * Encode packet as 'buffer sequence' by removing blobs, and
         * deconstructing packet into object with placeholders and
         * a list of buffers.
         *
         * @param {Object} packet
         * @return {Buffer} encoded
         * @api private
         */

        function encodeAsBinary(obj, callback) {

          function writeEncoding(bloblessData) {
            var deconstruction = binary.deconstructPacket(bloblessData);
            var pack = encodeAsString(deconstruction.packet);
            var buffers = deconstruction.buffers;

            buffers.unshift(pack); // add packet info to beginning of data list
            callback(buffers); // write all the buffers
          }

          binary.removeBlobs(obj, writeEncoding);
        }

        /**
         * A socket.io Decoder instance
         *
         * @return {Object} decoder
         * @api public
         */

        function Decoder() {
          this.reconstructor = null;
        }

        /**
         * Mix in `Emitter` with Decoder.
         */

        Emitter(Decoder.prototype);

        /**
         * Decodes an ecoded packet string into packet JSON.
         *
         * @param {String} obj - encoded packet
         * @return {Object} packet
         * @api public
         */

        Decoder.prototype.add = function (obj) {
          var packet;
          if ('string' == typeof obj) {
            packet = decodeString(obj);
            if (exports.BINARY_EVENT == packet.type || exports.BINARY_ACK == packet.type) {
              // binary packet's json
              this.reconstructor = new BinaryReconstructor(packet);

              // no attachments, labeled binary but no binary data to follow
              if (this.reconstructor.reconPack.attachments === 0) {
                this.emit('decoded', packet);
              }
            } else {
              // non-binary full packet
              this.emit('decoded', packet);
            }
          } else if (isBuf(obj) || obj.base64) {
            // raw binary data
            if (!this.reconstructor) {
              throw new Error('got binary data when not reconstructing a packet');
            } else {
              packet = this.reconstructor.takeBinaryData(obj);
              if (packet) {
                // received final buffer
                this.reconstructor = null;
                this.emit('decoded', packet);
              }
            }
          } else {
            throw new Error('Unknown type: ' + obj);
          }
        };

        /**
         * Decode a packet String (JSON data)
         *
         * @param {String} str
         * @return {Object} packet
         * @api private
         */

        function decodeString(str) {
          var p = {};
          var i = 0;

          // look up type
          p.type = Number(str.charAt(0));
          if (null == exports.types[p.type]) return error();

          // look up attachments if type binary
          if (exports.BINARY_EVENT == p.type || exports.BINARY_ACK == p.type) {
            var buf = '';
            while (str.charAt(++i) != '-') {
              buf += str.charAt(i);
              if (i == str.length) break;
            }
            if (buf != Number(buf) || str.charAt(i) != '-') {
              throw new Error('Illegal attachments');
            }
            p.attachments = Number(buf);
          }

          // look up namespace (if any)
          if ('/' == str.charAt(i + 1)) {
            p.nsp = '';
            while (++i) {
              var c = str.charAt(i);
              if (',' == c) break;
              p.nsp += c;
              if (i == str.length) break;
            }
          } else {
            p.nsp = '/';
          }

          // look up id
          var next = str.charAt(i + 1);
          if ('' !== next && Number(next) == next) {
            p.id = '';
            while (++i) {
              var c = str.charAt(i);
              if (null == c || Number(c) != c) {
                --i;
                break;
              }
              p.id += str.charAt(i);
              if (i == str.length) break;
            }
            p.id = Number(p.id);
          }

          // look up json data
          if (str.charAt(++i)) {
            try {
              p.data = json.parse(str.substr(i));
            } catch (e) {
              return error();
            }
          }

          debug('decoded %s as %j', str, p);
          return p;
        }

        /**
         * Deallocates a parser's resources
         *
         * @api public
         */

        Decoder.prototype.destroy = function () {
          if (this.reconstructor) {
            this.reconstructor.finishedReconstruction();
          }
        };

        /**
         * A manager of a binary event's 'buffer sequence'. Should
         * be constructed whenever a packet of type BINARY_EVENT is
         * decoded.
         *
         * @param {Object} packet
         * @return {BinaryReconstructor} initialized reconstructor
         * @api private
         */

        function BinaryReconstructor(packet) {
          this.reconPack = packet;
          this.buffers = [];
        }

        /**
         * Method to be called when binary data received from connection
         * after a BINARY_EVENT packet.
         *
         * @param {Buffer | ArrayBuffer} binData - the raw binary data received
         * @return {null | Object} returns null if more binary data is expected or
         *   a reconstructed packet object if all buffers have been received.
         * @api private
         */

        BinaryReconstructor.prototype.takeBinaryData = function (binData) {
          this.buffers.push(binData);
          if (this.buffers.length == this.reconPack.attachments) {
            // done with buffer list
            var packet = binary.reconstructPacket(this.reconPack, this.buffers);
            this.finishedReconstruction();
            return packet;
          }
          return null;
        };

        /**
         * Cleans up binary packet reconstruction variables.
         *
         * @api private
         */

        BinaryReconstructor.prototype.finishedReconstruction = function () {
          this.reconPack = null;
          this.buffers = [];
        };

        function error(data) {
          return {
            type: exports.ERROR,
            data: 'parser error'
          };
        }
      }, { "./binary": 39, "./is-buffer": 41, "component-emitter": 42, "debug": 14, "isarray": 33, "json3": 34 }], 41: [function (_dereq_, module, exports) {
        (function (global) {

          module.exports = isBuf;

          /**
           * Returns true if obj is a buffer or an arraybuffer.
           *
           * @api private
           */

          function isBuf(obj) {
            return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && obj instanceof ArrayBuffer;
          }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}], 42: [function (_dereq_, module, exports) {
        arguments[4][26][0].apply(exports, arguments);
      }, { "dup": 26 }], 43: [function (_dereq_, module, exports) {
        module.exports = toArray;

        function toArray(list, index) {
          var array = [];

          index = index || 0;

          for (var i = index || 0; i < list.length; i++) {
            array[i - index] = list[i];
          }

          return array;
        }
      }, {}], 44: [function (_dereq_, module, exports) {
        (function (global) {
          /*! https://mths.be/utf8js v2.0.0 by @mathias */
          ;(function (root) {

            // Detect free variables `exports`
            var freeExports = typeof exports == 'object' && exports;

            // Detect free variable `module`
            var freeModule = typeof module == 'object' && module && module.exports == freeExports && module;

            // Detect free variable `global`, from Node.js or Browserified code,
            // and use it as `root`
            var freeGlobal = typeof global == 'object' && global;
            if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
              root = freeGlobal;
            }

            /*--------------------------------------------------------------------------*/

            var stringFromCharCode = String.fromCharCode;

            // Taken from https://mths.be/punycode
            function ucs2decode(string) {
              var output = [];
              var counter = 0;
              var length = string.length;
              var value;
              var extra;
              while (counter < length) {
                value = string.charCodeAt(counter++);
                if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
                  // high surrogate, and there is a next character
                  extra = string.charCodeAt(counter++);
                  if ((extra & 0xFC00) == 0xDC00) {
                    // low surrogate
                    output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
                  } else {
                    // unmatched surrogate; only append this code unit, in case the next
                    // code unit is the high surrogate of a surrogate pair
                    output.push(value);
                    counter--;
                  }
                } else {
                  output.push(value);
                }
              }
              return output;
            }

            // Taken from https://mths.be/punycode
            function ucs2encode(array) {
              var length = array.length;
              var index = -1;
              var value;
              var output = '';
              while (++index < length) {
                value = array[index];
                if (value > 0xFFFF) {
                  value -= 0x10000;
                  output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
                  value = 0xDC00 | value & 0x3FF;
                }
                output += stringFromCharCode(value);
              }
              return output;
            }

            function checkScalarValue(codePoint) {
              if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
                throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
              }
            }
            /*--------------------------------------------------------------------------*/

            function createByte(codePoint, shift) {
              return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
            }

            function encodeCodePoint(codePoint) {
              if ((codePoint & 0xFFFFFF80) == 0) {
                // 1-byte sequence
                return stringFromCharCode(codePoint);
              }
              var symbol = '';
              if ((codePoint & 0xFFFFF800) == 0) {
                // 2-byte sequence
                symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
              } else if ((codePoint & 0xFFFF0000) == 0) {
                // 3-byte sequence
                checkScalarValue(codePoint);
                symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
                symbol += createByte(codePoint, 6);
              } else if ((codePoint & 0xFFE00000) == 0) {
                // 4-byte sequence
                symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
                symbol += createByte(codePoint, 12);
                symbol += createByte(codePoint, 6);
              }
              symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
              return symbol;
            }

            function utf8encode(string) {
              var codePoints = ucs2decode(string);
              var length = codePoints.length;
              var index = -1;
              var codePoint;
              var byteString = '';
              while (++index < length) {
                codePoint = codePoints[index];
                byteString += encodeCodePoint(codePoint);
              }
              return byteString;
            }

            /*--------------------------------------------------------------------------*/

            function readContinuationByte() {
              if (byteIndex >= byteCount) {
                throw Error('Invalid byte index');
              }

              var continuationByte = byteArray[byteIndex] & 0xFF;
              byteIndex++;

              if ((continuationByte & 0xC0) == 0x80) {
                return continuationByte & 0x3F;
              }

              // If we end up here, it’s not a continuation byte
              throw Error('Invalid continuation byte');
            }

            function decodeSymbol() {
              var byte1;
              var byte2;
              var byte3;
              var byte4;
              var codePoint;

              if (byteIndex > byteCount) {
                throw Error('Invalid byte index');
              }

              if (byteIndex == byteCount) {
                return false;
              }

              // Read first byte
              byte1 = byteArray[byteIndex] & 0xFF;
              byteIndex++;

              // 1-byte sequence (no continuation bytes)
              if ((byte1 & 0x80) == 0) {
                return byte1;
              }

              // 2-byte sequence
              if ((byte1 & 0xE0) == 0xC0) {
                var byte2 = readContinuationByte();
                codePoint = (byte1 & 0x1F) << 6 | byte2;
                if (codePoint >= 0x80) {
                  return codePoint;
                } else {
                  throw Error('Invalid continuation byte');
                }
              }

              // 3-byte sequence (may include unpaired surrogates)
              if ((byte1 & 0xF0) == 0xE0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
                if (codePoint >= 0x0800) {
                  checkScalarValue(codePoint);
                  return codePoint;
                } else {
                  throw Error('Invalid continuation byte');
                }
              }

              // 4-byte sequence
              if ((byte1 & 0xF8) == 0xF0) {
                byte2 = readContinuationByte();
                byte3 = readContinuationByte();
                byte4 = readContinuationByte();
                codePoint = (byte1 & 0x0F) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
                if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
                  return codePoint;
                }
              }

              throw Error('Invalid UTF-8 detected');
            }

            var byteArray;
            var byteCount;
            var byteIndex;
            function utf8decode(byteString) {
              byteArray = ucs2decode(byteString);
              byteCount = byteArray.length;
              byteIndex = 0;
              var codePoints = [];
              var tmp;
              while ((tmp = decodeSymbol()) !== false) {
                codePoints.push(tmp);
              }
              return ucs2encode(codePoints);
            }

            /*--------------------------------------------------------------------------*/

            var utf8 = {
              'version': '2.0.0',
              'encode': utf8encode,
              'decode': utf8decode
            };

            // Some AMD build optimizers, like r.js, check for specific condition patterns
            // like the following:
            if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
              define(function () {
                return utf8;
              });
            } else if (freeExports && !freeExports.nodeType) {
              if (freeModule) {
                // in Node.js or RingoJS v0.8.0+
                freeModule.exports = utf8;
              } else {
                // in Narwhal or RingoJS v0.7.0-
                var object = {};
                var hasOwnProperty = object.hasOwnProperty;
                for (var key in utf8) {
                  hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
                }
              }
            } else {
              // in Rhino or a web browser
              root.utf8 = utf8;
            }
          })(this);
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
      }, {}], 45: [function (_dereq_, module, exports) {
        'use strict';

        var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
            length = 64,
            map = {},
            seed = 0,
            i = 0,
            prev;

        /**
         * Return a string representing the specified number.
         *
         * @param {Number} num The number to convert.
         * @returns {String} The string representation of the number.
         * @api public
         */
        function encode(num) {
          var encoded = '';

          do {
            encoded = alphabet[num % length] + encoded;
            num = Math.floor(num / length);
          } while (num > 0);

          return encoded;
        }

        /**
         * Return the integer value specified by the given string.
         *
         * @param {String} str The string to convert.
         * @returns {Number} The integer value represented by the string.
         * @api public
         */
        function decode(str) {
          var decoded = 0;

          for (i = 0; i < str.length; i++) {
            decoded = decoded * length + map[str.charAt(i)];
          }

          return decoded;
        }

        /**
         * Yeast: A tiny growing id generator.
         *
         * @returns {String} A unique id.
         * @api public
         */
        function yeast() {
          var now = encode(+new Date());

          if (now !== prev) return seed = 0, prev = now;
          return now + '.' + encode(seed++);
        }

        //
        // Map each character to its index.
        //
        for (; i < length; i++) map[alphabet[i]] = i;

        //
        // Expose the `yeast`, `encode` and `decode` functions.
        //
        yeast.encode = encode;
        yeast.decode = decode;
        module.exports = yeast;
      }, {}] }, {}, [1])(1);
  });
};

cc._RFpop();
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"type":[function(require,module,exports){
"use strict";
cc._RFpush(module, '27663VhAr1GQL8VPBCtJdrk', 'type');
// Script\type.js

//回合阶段
window.PHASE_NULL = 0;
window.PHASE_BEGIN_TURN = 1;
window.PHASE_MAIN_TURN = 2;
window.PHASE_END_TURN = 3;

//客户端与服务端通信函数

//登录
window.WC_CONNECTED = 'WC_CONNECTED'; //服务端向客户端发送连接响应
window.CW_LOGIN_REQUEST = 'CW_LOGIN_REQUEST'; //客户端向服务端发送登录请求
window.WC_LOGIN_RESPONSE = 'WC_LOGIN_RESPONSE'; //服务端向客户端发送登录响应
window.CW_ENTERROOM_REQUEST = 'CW_ENTERROOM_REQUEST'; //客户端向服务端发送进入房间请求
window.WC_ENTERROOM_RESPONSE = 'WC_ENTERROOM_RESPONSE'; //服务端向客户端发送进入房间响应

//聊天
window.CW_CHAT_ADD_REQUEST = 'CW_CHAT_ADD_REQUEST'; //客户端向服务端发送聊天信息请求
window.WC_CHAT_ADD_RESPONSE = 'WC_CHAT_ADD_RESPONSE'; //服务端向客户端发送聊天信息响应
window.WC_CHAT_ADD = 'WC_CHAT_ADD'; //服务端向客户端发送聊天信息

//Player
window.WC_PLAYER_ADD = 'WC_PLAYER_ADD'; //服务端向客户端发送PLAYER添加(自己)
window.WC_PLAYER_ADD_OTHER = 'WC_PLAYER_ADD_OTHER'; //服务端向客户端发送PLAYER添加(别人)
window.WC_PLAYER_UPDATE = 'WC_PLAYER_UPDATE'; //服务端向客户端发送PLAYER更新

//房间
window.CW_DUELREADY_REQUEST = 'CW_DUELREADY_REQUEST'; //客户端向服务端发送准备开始游戏请求
window.WC_DUELREADY_RESPONSE = 'WC_DUELREADY_RESPONSE'; //服务端向客户端发送准备开始游戏响应
window.WC_DUELREADY = 'WC_DUELREADY'; //服务端给客户端发送用户准备

//手牌
window.WC_HANDCARD_UPDATE = 'WC_HANDCARD_UPDATE'; //手牌更新
window.WC_HANDCARD_CREATE = 'WC_HANDCARD_CREATE'; //手牌创建
window.WC_HANDCARD_DELETE = 'WC_HANDCARD_DELETE'; //手牌删除

//随从
window.CW_MONSTER_SUMMON_REQUEST = 'CW_MONSTER_SUMMON_REQUEST'; //客户端向服务端发送召唤随从请求
window.WC_MONSTER_SUMMON_RESPONSE = 'WC_MONSTER_SUMMON_RESPONSE'; //服务端向客户端发送召唤随从响应
window.CW_MONSTER_ATTACKMONSTER_REQUEST = 'CW_MONSTER_ATTACKMONSTER_REQUEST'; //客户端向服务端发送随从攻击随从请求
window.WC_MONSTER_ATTACKMONSTER_RESPONSE = 'WC_MONSTER_ATTACKMONSTER_RESPONSE'; //服务端向客户端发送随从攻击随从响应
window.CW_MONSTER_ATTACKPLAYER_REQUEST = 'CW_MONSTER_ATTACKPLAYER_REQUEST'; //客户端向服务端发送随从攻击玩家请求
window.WC_MONSTER_ATTACKPLAYER_RESPONSE = 'WC_MONSTER_ATTACKPLAYER_RESPONSE'; //服务端向客户端发送随从攻击玩家响应
window.WC_MONSTER_CREATE = 'WC_MONSTER_CREATE'; //随从创建
window.WC_MONSTER_UPDATE = 'WC_MONSTER_UPDATE'; //随从更新
window.WC_MONSTER_DELETE = 'WC_MONSTER_DELETE'; //随从删除

window.showTipLabel = function showTipLabel(str, color) {
    //文字标签创建
    var node = new cc.Node();
    var label = node.addComponent(cc.Label);
    if (color) node.color = color;

    label.string = str;
    node.setPosition(0, 0);
    var scene = cc.director.getScene().getChildByName('Canvas');
    scene.addChild(node);

    //2秒后消失
    var fadeout = cc.fadeOut(2);
    var callFunc = cc.callFunc(function (node) {
        cc.log('node is what:%s', node.x);
        node.destroy();
    }, node, null);

    var seq = cc.sequence(fadeout, callFunc);
    node.runAction(seq);
};

cc._RFpop();
},{}]},{},["CardSprite","type","HelloWorld","ChatWnd","socket.io","duel","card","monster","EventProcess","player","MonsterSprite","PlayerSprite","CardDataManager","CardData","GameConn","LoginScene"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvZGF0YS9DYXJkRGF0YU1hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L2RhdGEvQ2FyZERhdGEuanMiLCJhc3NldHMvU2NyaXB0L0NhcmRTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L0NoYXRXbmQuanMiLCJhc3NldHMvU2NyaXB0L05ldFdvcmsvRXZlbnRQcm9jZXNzLmpzIiwiYXNzZXRzL1NjcmlwdC9OZXRXb3JrL0dhbWVDb25uLmpzIiwiYXNzZXRzL1NjcmlwdC9IZWxsb1dvcmxkLmpzIiwiYXNzZXRzL1NjcmlwdC9Mb2dpblNjZW5lLmpzIiwiYXNzZXRzL1NjcmlwdC9Nb25zdGVyU3ByaXRlLmpzIiwiYXNzZXRzL1NjcmlwdC9QbGF5ZXJTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L2NhcmQuanMiLCJhc3NldHMvU2NyaXB0L2R1ZWwuanMiLCJhc3NldHMvU2NyaXB0L21vbnN0ZXIuanMiLCJhc3NldHMvU2NyaXB0L3BsYXllci5qcyIsImFzc2V0cy9TY3JpcHQvTmV0V29yay9zb2NrZXQuaW8uanMiLCJhc3NldHMvU2NyaXB0L3R5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbGhPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTZhMGZhemVzcEpmSnV4L1hOWEJ5VnQnLCAnQ2FyZERhdGFNYW5hZ2VyJyk7XG4vLyBTY3JpcHRcXGRhdGFcXENhcmREYXRhTWFuYWdlci5qc1xuXG52YXIgQ2FyZERhdGEgPSByZXF1aXJlKCdDYXJkRGF0YScpO1xuXG52YXIgY2FyZERhdGFUZXN0ID0gW1tcImFcIiwgMCwgMSwgMV0sIFtcImJcIiwgMSwgMSwgM10sIFtcImNcIiwgMSwgMiwgMV0sIFtcImRcIiwgMiwgMiwgM10sIFtcImVcIiwgMiwgMywgMl0sIFtcImZcIiwgMiwgNCwgMV0sIFtcImdcIiwgMiwgMSwgNF0sIFtcImhcIiwgMywgMiwgNF0sIFtcImlcIiwgMywgNSwgMV0sIFtcImpcIiwgMywgMywgM10sIFtcImtcIiwgMywgNCwgMl0sIFtcImxcIiwgNCwgMywgNV0sIFtcIm1cIiwgNCwgNSwgMl0sIFtcIm5cIiwgNCwgNCwgNF0sIFtcIm9cIiwgNCwgMiwgNl0sIFtcInBcIiwgNCwgMSwgN10sIFtcInFcIiwgNSwgMywgNl0sIFtcInJcIiwgNSwgNCwgNV0sIFtcInNcIiwgNSwgNSwgNF0sIFtcInRcIiwgNSwgNSwgNV0sIFtcInVcIiwgNSwgNiwgMl0sIFtcInZcIiwgNSwgNiwgM10sIFtcIndcIiwgNiwgMywgOF0sIFtcInhcIiwgNiwgNCwgNl0sIFtcInlcIiwgNiwgNSwgNl0sIFtcInpcIiwgNiwgNiwgNl0sIFtcIkFcIiwgNiwgNiwgNV0sIFtcIkJcIiwgNiwgNywgM10sIFtcIkNcIiwgNiwgOCwgMV0sIFtcIkRcIiwgNywgNywgN10sIFtcIkVcIiwgNywgNCwgOF0sIFtcIkZcIiwgNywgNiwgOF0sIFtcIkdcIiwgNywgNywgN10sIFtcIkhcIiwgOCwgOCwgOF0sIFtcIklcIiwgOCwgNywgOV0sIFtcIkpcIiwgOCwgOSwgNl0sIFtcIktcIiwgOSwgOSwgOV0sIFtcIkxcIiwgMTAsIDEyLCAxMl1dO1xuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIGNhcmRNYXA6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGNhcmREYXRhVGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciBjYXJkID0gbmV3IENhcmREYXRhKCk7XG4gICAgICAgICAgICAgICAgY2FyZC5jYXJkTmFtZSA9IGNhcmREYXRhVGVzdFtpXVswXTtcbiAgICAgICAgICAgICAgICBjYXJkLmNyaXRpY2FsID0gY2FyZERhdGFUZXN0W2ldWzFdO1xuICAgICAgICAgICAgICAgIGNhcmQuYXRrID0gY2FyZERhdGFUZXN0W2ldWzJdO1xuICAgICAgICAgICAgICAgIGNhcmQuaHAgPSBjYXJkRGF0YVRlc3RbaV1bM107XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkTWFwW2NhcmQuY2FyZE5hbWVdID0gY2FyZDtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhjYXJkRGF0YVRlc3RbaV1bMF0sY2FyZERhdGFUZXN0W2ldWzFdLGNhcmREYXRhVGVzdFtpXVsyXSxjYXJkRGF0YVRlc3RbaV1bM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZjFkOGViQnVQeEJ5clhxZ29EbEczYk8nLCAnQ2FyZERhdGEnKTtcbi8vIFNjcmlwdFxcZGF0YVxcQ2FyZERhdGEuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBjYXJkTmFtZTogXCJcIixcbiAgICAgICAgY3JpdGljYWw6IDAsXG4gICAgICAgIGhwOiAwLFxuICAgICAgICBhdGs6IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMDliMDIvaW51Tk5RcmhjbWtITXAzbjcnLCAnQ2FyZFNwcml0ZScpO1xuLy8gU2NyaXB0XFxDYXJkU3ByaXRlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgX3BsYXllcjogbnVsbCwgLy9QbGF5ZXLlvJXnlKhcbiAgICAgICAgX2lkeDogMCwgLy/mlbDnu4TntKLlvJVcblxuICAgICAgICBzcmNQb3M6IHtcbiAgICAgICAgICAgICdkZWZhdWx0Jzoge31cbiAgICAgICAgfSxcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5o6n5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBocExhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIGNyaXRpY2FsTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXRrTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmFtZUxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnNyY1Bvcy54ID0gdGhpcy5ub2RlLng7XG4gICAgICAgICAgICB0aGlzLnNyY1Bvcy55ID0gdGhpcy5ub2RlLnk7XG4gICAgICAgICAgICBjYy5sb2coJ3NyY1g6JWQnLCB0aGlzLnNyY1Bvcy54KTtcbiAgICAgICAgICAgIGNjLmxvZygnUGFyc3JjWDolZCcsIHRoaXMubm9kZS5wb3NpdGlvbi54KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgbW92ZVggPSBldmVudC5nZXRMb2NhdGlvblgoKSAtIGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS54O1xuICAgICAgICAgICAgdmFyIG1vdmVZID0gZXZlbnQuZ2V0TG9jYXRpb25ZKCkgLSBldmVudC5nZXRTdGFydExvY2F0aW9uKCkueTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnNyY1Bvcy54ICsgbW92ZVgsIHRoaXMuc3JjUG9zLnkgKyBtb3ZlWSk7XG4gICAgICAgICAgICAvL2NjLmxvZygnc3JjWDolZCcsIHRoaXMuc3JjUG9zLngpO1xuICAgICAgICAgICAgLy9jYy5sb2coJ3N0YXJ0WDolZCcsZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLngpO1xuICAgICAgICAgICAgLy9jYy5sb2cobW92ZVgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGJvdW5kQm94ID0gdGhpcy5fcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAgICAgICAgdmFyIHBvcyA9IG5ldyBjYy52Mih0aGlzLm5vZGUueCArIHRoaXMubm9kZS5wYXJlbnQueCwgdGhpcy5ub2RlLnkgKyB0aGlzLm5vZGUucGFyZW50LnkpO1xuICAgICAgICAgICAgaWYgKGJvdW5kQm94LmNvbnRhaW5zKHBvcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIuc3VtbWVyTW9uc3Rlcih0aGlzLl9pZHgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5zcmNQb3MueCwgdGhpcy5zcmNQb3MueSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvL+aYr+WQpua/gOa0u1xuICAgIGlzVHVybkFjdGl2ZTogZnVuY3Rpb24gaXNUdXJuQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyLmdldElzVHVybkFjdGl2ZSgpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zcmNQb3MgPSB7ICd4JzogMCwgJ3knOiAwIH07XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkLCBwbGF5ZXIsIGlkeCkge1xuICAgICAgICBpZiAoY2FyZC5pc0hpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmcgPSAnPz8nO1xuICAgICAgICAgICAgdGhpcy5jcml0aWNhbExhYmVsLnN0cmluZyA9ICc/Pyc7XG4gICAgICAgICAgICB0aGlzLmF0a0xhYmVsLnN0cmluZyA9ICc/Pyc7XG4gICAgICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSAnPz8nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ocExhYmVsLnN0cmluZyA9IGNhcmQuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuY3JpdGljYWxMYWJlbC5zdHJpbmcgPSBjYXJkLmNyaXRpY2FsLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmF0a0xhYmVsLnN0cmluZyA9IGNhcmQuYXRrLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBjYXJkLmNhcmROYW1lLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuX2lkeCA9IGlkeDtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc1NDZlYSsrbkpCT1FvTTN1WitldDVyLycsICdDaGF0V25kJyk7XG4vLyBTY3JpcHRcXENoYXRXbmQuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBjaGF0SVN0ck1hcDogW10sIC8v5L+d5a2Y6IGK5aSp5a2X56ym5Liy5pWw57uEXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICAvL+a7muWKqOWMuuWfn+eahGNvbnRlbnQg6IqC54K5XG4gICAgICAgIGNvbnRlbnQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLk5vZGVcbiAgICAgICAgfSxcblxuICAgICAgICAvL+iBiuWkqeS/oeaBryDoioLngrlcbiAgICAgICAgaXRlbVByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy9TY3JvbGxWaWV3XG4gICAgICAgIHNjcm9sbFZpZXc6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNjcm9sbFZpZXdcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcblxuICAgIGFkZENoYXRJdGVtOiBmdW5jdGlvbiBhZGRDaGF0SXRlbShzdHIsIGNvbG9yKSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50O1xuXG4gICAgICAgIHZhciBjaGF0SXRlbSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuaXRlbVByZWZhYik7XG4gICAgICAgIGlmICghY2hhdEl0ZW0pIHJldHVybjtcblxuICAgICAgICB2YXIgc3RyTGFiZWwgPSBjaGF0SXRlbS5nZXRDaGlsZEJ5TmFtZSgnc3RyJyk7XG4gICAgICAgIGlmICghc3RyTGFiZWwpIHJldHVybjtcblxuICAgICAgICAvL+a3u+WKoElURU1cbiAgICAgICAgY2hhdEl0ZW0uc2V0UG9zaXRpb24oLWNvbnRlbnQud2lkdGggLyAyICsgNSwgLWNvbnRlbnQuaGVpZ2h0KTtcbiAgICAgICAgY29udGVudC5hZGRDaGlsZChjaGF0SXRlbSk7XG4gICAgICAgIC8vY2MubG9nKCdjb250ZW50IGhlaWdodDogJWQnLCBjb250ZW50LmhlaWdodCk7XG4gICAgICAgIHN0ckxhYmVsLmdldENvbXBvbmVudCgnY2MuTGFiZWwnKS5zdHJpbmcgPSBzdHI7IC8v5YaZ5a2XXG4gICAgICAgIGlmIChjb2xvcikgc3RyTGFiZWwuY29sb3IgPSBjb2xvcjtcblxuICAgICAgICAvL+iwg+aVtOWkp+Wwj++8jOWIt+aWsOWIsOacgOS4i+mdouS4gOmhtVxuICAgICAgICBjb250ZW50LnNldENvbnRlbnRTaXplKGNvbnRlbnQud2lkdGgsIGNvbnRlbnQuaGVpZ2h0ICsgc3RyTGFiZWwuaGVpZ2h0KTtcbiAgICAgICAgLy9jYy5sb2coJ2NvbnRlbnQgaGVpZ2h0OiAlZCwgc3RyTGFiZWwgcG9zaXRpb246ICVkJywgY29udGVudC5oZWlnaHQsIGNoYXRJdGVtLmdldFBvc2l0aW9uWSgpKTtcbiAgICAgICAgaWYgKGNvbnRlbnQuaGVpZ2h0ID4gMjAwKSB0aGlzLnNjcm9sbFZpZXcuc2Nyb2xsVG9Cb3R0b20oKTtcbiAgICB9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2E2OWI1NEJPd2hNN1pxdjg0c040dHVQJywgJ0V2ZW50UHJvY2VzcycpO1xuLy8gU2NyaXB0XFxOZXRXb3JrXFxFdmVudFByb2Nlc3MuanNcblxudmFyIEVSUk9SX05PRVJST1IgPSAwO1xuXG52YXIgTE9HSU5fRVJST1JfTk9URk9VTkQgPSAxO1xudmFyIExPR0lOX0VSUk9SX1BBU1NXT1JEX0VSUk9SID0gMjtcblxudmFyIEVSUk9SX0VOVEVSUk9PTV9JTlJPT00gPSAxO1xudmFyIEVSUk9SX0RVRUxSRUFEWV9JU1BMQVlJTkcgPSAxO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIGdhbWVDb25uOiBudWxsLCAvL+e9kee7nOi/nuaOpVxuICAgICAgICBkdWVsOiBudWxsLCAvL+a4uOaIj+euoeeQhlxuXG4gICAgICAgIC8v6K6+572u5ri45oiP566h55CGXG4gICAgICAgIHNldER1ZWw6IGZ1bmN0aW9uIHNldER1ZWwoZHVlbCkge1xuICAgICAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+WIneWni+WMllxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KGNvbm4pIHtcbiAgICAgICAgICAgIGNjLmxvZygnRXZlbnRQcm9jZXNzIOWIneWni+WMlicpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubiA9IGNvbm47XG4gICAgICAgICAgICB3aW5kb3cuV0NfRU5URVJST09NX1JFU1BPTlNFID0gJ1dDX0VOVEVSUk9PTV9SRVNQT05TRSc7XG5cbiAgICAgICAgICAgIC8v5rOo5YaM5raI5oGv5aSE55CG5Ye95pWwXG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcignZGlzY29ubmVjdCcsIHRoaXMuZGlzY29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0NPTk5FQ1RFRCwgdGhpc1tXQ19DT05ORUNURURdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfTE9HSU5fUkVTUE9OU0UsIHRoaXNbV0NfTE9HSU5fUkVTUE9OU0VdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfRU5URVJST09NX1JFU1BPTlNFLCB0aGlzW1dDX0VOVEVSUk9PTV9SRVNQT05TRV0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19DSEFUX0FERF9SRVNQT05TRSwgdGhpc1tXQ19DSEFUX0FERF9SRVNQT05TRV0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19DSEFUX0FERCwgdGhpc1tXQ19DSEFUX0FERF0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19QTEFZRVJfQURELCB0aGlzW1dDX1BMQVlFUl9BRERdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfUExBWUVSX1VQREFURSwgdGhpc1tXQ19QTEFZRVJfVVBEQVRFXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0RVRUxSRUFEWV9SRVNQT05TRSwgdGhpc1tXQ19EVUVMUkVBRFlfUkVTUE9OU0VdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfRFVFTFJFQURZLCB0aGlzW1dDX0RVRUxSRUFEWV0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19IQU5EQ0FSRF9DUkVBVEUsIHRoaXNbV0NfSEFORENBUkRfQ1JFQVRFXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0hBTkRDQVJEX1VQREFURSwgdGhpc1tXQ19IQU5EQ0FSRF9VUERBVEVdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfSEFORENBUkRfREVMRVRFLCB0aGlzW1dDX0hBTkRDQVJEX0RFTEVURV0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19IQU5EQ0FSRF9DUkVBVEUsIHRoaXNbV0NfTU9OU1RFUl9DUkVBVEVdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfSEFORENBUkRfVVBEQVRFLCB0aGlzW1dDX01PTlNURVJfVVBEQVRFXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0hBTkRDQVJEX0RFTEVURSwgdGhpc1tXQ19NT05TVEVSX0RFTEVURV0uYmluZCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/mnI3liqHlmajmlq3lvIDov57mjqVcbiAgICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4uZGlzY29ubmVjdCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v6L+e5o6l5ZON5bqUXG4gICAgICAgIFdDX0NPTk5FQ1RFRDogZnVuY3Rpb24gV0NfQ09OTkVDVEVEKHBhcmFtKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLmNvbm5lY3RTdWNjZXNzKHBhcmFtLmlkeCk7XG4gICAgICAgICAgICBjYy5sb2coJ+aUtuWIsOacjeWKoeWZqOi/nuaOpeWTjeW6lO+8jGNsaWVudGlkOiAlZCwgbmFtZTogJXMnLCBwYXJhbS5pZHgsIHBhcmFtLm5hbWUpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v55m75b2V5ZON5bqUXG4gICAgICAgIFdDX0xPR0lOX1JFU1BPTlNFOiBmdW5jdGlvbiBXQ19MT0dJTl9SRVNQT05TRShwYXJhbSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtLmVycm9yID09IEVSUk9SX05PRVJST1IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWVDb25uLmxvZ2luU3VjY2VzcyhwYXJhbS5hY2NvdW50KTtcbiAgICAgICAgICAgICAgICBjYy5sb2coXCLnmbvlvZXmiJDlip8sZXJyb3I6JWRcIiwgcGFyYW0uZXJyb3IpO1xuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmxvYWRTY2VuZSgnaGVsbG93b3JsZCcpOyAvL+WIh+aNouWIsOa4uOaIj+WcuuaZr1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbS5lcnJvciA9PSBMT0dJTl9FUlJPUl9QQVNTV09SRF9FUlJPUikge1xuICAgICAgICAgICAgICAgICAgICBzaG93VGlwTGFiZWwoJ+eZu+W9leWksei0pe+8jOWvhueggemUmeivrycpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0uZXJyb3IgPT0gTE9HSU5fRVJST1JfTk9URk9VTkQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RpcExhYmVsKCfnmbvlvZXlpLHotKXvvIzotKblj7fkuI3lrZjlnKgnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93VGlwTGFiZWwoJ+eZu+W9leWksei0pe+8jOacquefpemUmeivrycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL+i/m+WFpeaIv+mXtOWTjeW6lFxuICAgICAgICBXQ19FTlRFUlJPT01fUkVTUE9OU0U6IGZ1bmN0aW9uIFdDX0VOVEVSUk9PTV9SRVNQT05TRShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIGVycm9yID0gcGFyYW0uZXJyb3I7XG4gICAgICAgICAgICBpZiAoZXJyb3IgPT0gRVJST1JfRU5URVJST09NX0lOUk9PTSkgY2MubG9nKCfmgqjlt7Lnu4/ov5vlhaXmiL/pl7TvvIzkuI3lj6/lho3mrKHov5vlhaUnKTtlbHNlIGlmIChlcnJvciA9PT0gRVJST1JfTk9FUlJPUikge1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5oiQ5Yqf6L+b5YWl5oi/6Ze0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5zZW5kUGFja2V0KENXX0RVRUxSRUFEWV9SRVFVRVNULCB7fSk7IC8v55u05o6l5YeG5aSHXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/mt7vliqDogYrlpKnkv6Hmga/lk43lupQo5Lul5ZCO5YaZKVxuICAgICAgICBXQ19DSEFUX0FERF9SRVNQT05TRTogZnVuY3Rpb24gV0NfQ0hBVF9BRERfUkVTUE9OU0UocGFyYW0pIHt9LFxuXG4gICAgICAgIC8v5pyN5Yqh56uv5Y+R6YCB6IGK5aSp5L+h5oGvXG4gICAgICAgIFdDX0NIQVRfQUREOiBmdW5jdGlvbiBXQ19DSEFUX0FERChwYXJhbSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtLmlzU3lzdGVtKSB0aGlzLmR1ZWwuYWRkQ2hhdEl0ZW0ocGFyYW0ubWVzc2FnZSwgY2MuQ29sb3IuUkVEKTtlbHNlIHRoaXMuZHVlbC5hZGRDaGF0SXRlbShwYXJhbS5tZXNzYWdlKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+a3u+WKoOWujOaVtOeOqeWutuaVsOaNrlxuICAgICAgICBXQ19QTEFZRVJfQUREOiBmdW5jdGlvbiBXQ19QTEFZRVJfQUREKHBhcmFtKSB7XG4gICAgICAgICAgICBkdWVsLmFkZFBsYXllcihwYXJhbSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy9QbGF5ZXLmm7TmlrBcbiAgICAgICAgV0NfUExBWUVSX1VQREFURTogZnVuY3Rpb24gV0NfUExBWUVSX1VQREFURShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcmFtLmlkeDtcblxuICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZHVlbC5nZXRQbGF5ZXIoaWR4KTtcbiAgICAgICAgICAgIGlmICghcGxheWVyKSByZXR1cm47XG5cbiAgICAgICAgICAgIHBsYXllci51blBhY2tEYXRhKHBhcmFtKTtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJTcHJpdGUgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyU3ByaXRlQnlQbGF5ZXIoaWR4KTtcbiAgICAgICAgICAgIHBsYXllclNwcml0ZS5yZWZyZXNoKCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lh4blpIfmuLjmiI/lk43lupRcbiAgICAgICAgV0NfRFVFTFJFQURZX1JFU1BPTlNFOiBmdW5jdGlvbiBXQ19EVUVMUkVBRFlfUkVTUE9OU0UocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHBhcmFtLmVycm9yO1xuICAgICAgICAgICAgaWYgKGVycm9yID09PSBFUlJPUl9EVUVMUkVBRFlfSVNQTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RpcExhYmVsKCfmuLjmiI/lt7Lnu4/lvIDlp4vkuobvvIzkuI3og73lh4blpIcnLCBjYy5Db2xvci5SRUQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+esrDDkuKrnjqnlrrbmjqfku7bkuLrnjqnlrrboh6rlt7HvvIzorr7nva7kuLrnjqnlrrZJRFhcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gdGhpcy5kdWVsLmdldFBsYXllclNwcnRlKDApO1xuICAgICAgICAgICAgICAgIHBsYXllclNwcml0ZS5zZXRJZHgocGFyYW0uaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL+acieeOqeWutuWHhuWkh+a4uOaIj1xuICAgICAgICBXQ19EVUVMUkVBRFk6IGZ1bmN0aW9uIFdDX0RVRUxSRUFEWShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcmFtLmlkeDtcblxuICAgICAgICAgICAgLy/njqnlrrbmm7TmlrBcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKGlkeCk7XG4gICAgICAgICAgICBpZiAoIXBsYXllcikgcmV0dXJuO1xuXG4gICAgICAgICAgICBwbGF5ZXIudW5QYWNrRGF0YShwYXJhbSk7XG5cbiAgICAgICAgICAgIC8v546p5a625o6n5Lu25pu05pawXG4gICAgICAgICAgICAvLzPnp43mg4XlhrVcbiAgICAgICAgICAgIC8vMS7njqnlrrboh6rlt7Hlh4blpIfvvIww5o6n5Lu25Yi35paw5Li6546p5a6277ybXG4gICAgICAgICAgICAvLzIu56ys5LiA5Liq5YeG5aSH55qE546p5a6277yMMeaOp+S7tuWIt+aWsOS4uuatpOeOqeWutu+8m1xuICAgICAgICAgICAgLy8zLuesrOS6jOS4quWHhuWkh+eahOeOqeWutu+8jDDmjqfku7bliLfmlrDkuLrmraTnjqnlrrbvvJtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJTcHJpdGUgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyU3BydGUoMCk7XG4gICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlMSA9IHRoaXMuZHVlbC5nZXRQbGF5ZXJTcHJpdGUoMSk7XG4gICAgICAgICAgICBpZiAocGxheWVyU3ByaXRlLmdldElkeCgpICE9PSBpZHgpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyU3ByaXRlMS5nZXRJZHgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyU3ByaXRlLnNldElkeChpZHgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllclNwcml0ZTEuc2V0SWR4KGlkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkdWVsLnJlZnJlc2hQbGF5ZXJTcHJpdGUoaWR4KTtcbiAgICAgICAgfSxcblxuICAgICAgICBXQ19IQU5EQ0FSRF9DUkVBVEU6IGZ1bmN0aW9uIFdDX0hBTkRDQVJEX0NSRUFURShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIHBsYXllcklkeCA9IHBhcmFtLnBsYXllcklkeDtcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKHBsYXllcklkeCk7XG5cbiAgICAgICAgICAgIHBsYXllci5jcmVhdGVDYXJkVG9IYW5kKHBhcmFtLnBhcmFtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBXQ19IQU5EQ0FSRF9VUERBVEU6IGZ1bmN0aW9uIFdDX0hBTkRDQVJEX1VQREFURShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIHBsYXllcklkeCA9IHBhcmFtLnBsYXllcklkeDtcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKHBsYXllcklkeCk7XG4gICAgICAgICAgICB2YXIgaWR4ID0gcGFyYW0uaWR4O1xuICAgICAgICAgICAgcGxheWVyLmhhbmRDYXJkVXBkYXRlKGlkeCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgV0NfSEFORENBUkRfREVMRVRFOiBmdW5jdGlvbiBXQ19IQU5EQ0FSRF9ERUxFVEUocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJJZHggPSBwYXJhbS5wbGF5ZXJJZHg7XG4gICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5kdWVsLmdldFBsYXllcihwbGF5ZXJJZHgpO1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcmFtLmlkeDtcbiAgICAgICAgICAgIHBsYXllci5oYW5kQ2FyZERlbGV0ZShpZHgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIFdDX01PTlNURVJfQ1JFQVRFOiBmdW5jdGlvbiBXQ19NT05TVEVSX0NSRUFURShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIHBsYXllcklkeCA9IHBhcmFtLnBsYXllcklkeDtcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKHBsYXllcklkeCk7XG5cbiAgICAgICAgICAgIHBsYXllci5jcmVhdGVNb25zdGVyKHBhcmFtLnBhcmFtKTtcbiAgICAgICAgfSxcblxuICAgICAgICBXQ19NT05TVEVSX1VQREFURTogZnVuY3Rpb24gV0NfTU9OU1RFUl9VUERBVEUocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJJZHggPSBwYXJhbS5wbGF5ZXJJZHg7XG4gICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5kdWVsLmdldFBsYXllcihwbGF5ZXJJZHgpO1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcmFtLmlkeDtcbiAgICAgICAgICAgIHBsYXllci5tb25zdGVyVXBkYXRlKGlkeCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgV0NfTU9OU1RFUl9ERUxFVEU6IGZ1bmN0aW9uIFdDX01PTlNURVJfREVMRVRFKHBhcmFtKSB7XG4gICAgICAgICAgICB2YXIgcGxheWVySWR4ID0gcGFyYW0ucGxheWVySWR4O1xuICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZHVlbC5nZXRQbGF5ZXIocGxheWVySWR4KTtcbiAgICAgICAgICAgIHZhciBpZHggPSBwYXJhbS5pZHg7XG4gICAgICAgICAgICBwbGF5ZXIubW9uc3RlckRlbGV0ZShpZHgpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmM2EwOGVrWk1WR0xxSnI0eWI2K0ZwbycsICdHYW1lQ29ubicpO1xuLy8gU2NyaXB0XFxOZXRXb3JrXFxHYW1lQ29ubi5qc1xuXG4vL+e9kee7nOi/nuaOpeWNleS+i1xudmFyIEV2ZW50UHJvY2VzcyA9IHJlcXVpcmUoJ0V2ZW50UHJvY2VzcycpO1xuXG52YXIgQ0xJRU5UX1NUQVRFX0RJU0NPTk5FQ1QgPSAtMTtcbnZhciBDTElFTlRfU1RBVEVfR1VJREUgPSAwO1xudmFyIENMSUVOVF9TVEFURV9MT0dJTklOID0gMTtcbnZhciBDTElFTlRfU1RBVEVfRElTQkFORCA9IDI7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgfSxcblxuICAgIC8vYWNjb3VudOe7k+aehFxuICAgIC8vZnVuY3Rpb24gQWNjb3VudChhY2NvdW50LCBwYXNzd29yZCl7XG4gICAgLy8gICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAvLyAgICB0aGlzLnBhc3N3b3JkID0gcGFzc3dvcmQ7XG4gICAgLy99XG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIHNvY2tldDogbnVsbCwgLy9zb2NrZXQuaW/ov57mjqVcbiAgICAgICAgY2xpZW50SWQ6IC0xLCAvL+i/nuaOpee8luWPt1xuICAgICAgICBhY2NvdW50OiBudWxsLCAvL+acjeWKoeWZqOS8oOWbnuadpeeahOi0puWPt+S/oeaBr1xuICAgICAgICBzdGF0ZTogQ0xJRU5UX1NUQVRFX0RJU0NPTk5FQ1QsIC8v6LSm5Y+354q25oCBXG5cbiAgICAgICAgLy/liJ3lp4vljJZTT0NLRVRJT1xuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5pbyA9IFNvY2tldElPO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaW8gPSByZXF1aXJlKCdzb2NrZXQuaW8nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL+i/nuaOpeacjeWKoeWZqFxuICAgICAgICBjb25uZWN0VG9TZXJ2ZXI6IGZ1bmN0aW9uIGNvbm5lY3RUb1NlcnZlcigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnNvY2tldCB8fCB0aGlzLnN0YXRlICE9PSBDTElFTlRfU1RBVEVfRElTQ09OTkVDVCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5bey57uP5LiO5pyN5Yqh5Zmo5bu656uL6L+e5o6l77yM5LiN6KaB6YeN5aSN6L+e5o6lJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IHdpbmRvdy5pbygnaHR0cDovL2xvY2FsaG9zdDozMDAwJyk7XG4gICAgICAgICAgICBFdmVudFByb2Nlc3MuaW5pdCh0aGlzKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+acjeWKoeWZqOi/nuaOpeaIkOWKn1xuICAgICAgICBjb25uZWN0U3VjY2VzczogZnVuY3Rpb24gY29ubmVjdFN1Y2Nlc3MoaWR4KSB7XG4gICAgICAgICAgICB0aGlzLnNldENsaWVudElkKGlkeCk7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0xJRU5UX1NUQVRFX0dVSURFO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v6LSm5Y+355m75b2VXG4gICAgICAgIGxvZ2luOiBmdW5jdGlvbiBsb2dpbihhY2NvdW50LCBwYXNzd29yZCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnNvY2tldCB8fCB0aGlzLnN0YXRlID09PSBDTElFTlRfU1RBVEVfRElTQ09OTkVDVCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZyhcIuacjeWKoeWZqOagueacrOayoeaciei/nuS4iuKApuKApuaXoOazleeZu+W9lVwiKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBDTElFTlRfU1RBVEVfTE9HSU5JTikge1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5bey57uP55m75b2V6LSm5Y+377yM6K+35LiN6KaB6YeN5aSN55m75b2VJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gQ0xJRU5UX1NUQVRFX0RJU0JBTkQpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+aCqOW3suiiq+acjeWKoeWZqGJhbizml6Dms5XnmbvlvZUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNjLmxvZyhcIuWHhuWkh+i0puWPt+eZu+W9le+8jOi0puWPt+S4uu+8miVzLCDlr4bnoIHvvJolc1wiLCBhY2NvdW50LCBwYXNzd29yZCk7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KENXX0xPR0lOX1JFUVVFU1QsIHsgJ0FjY291bnROYW1lJzogYWNjb3VudCwgJ3Bhc3N3b3JkJzogcGFzc3dvcmQgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/nmbvlvZXmiJDlip9cbiAgICAgICAgbG9naW5TdWNjZXNzOiBmdW5jdGlvbiBsb2dpblN1Y2Nlc3MoYWNjb3VudCkge1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gYWNjb3VudDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDTElFTlRfU1RBVEVfTE9HSU5JTjtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+e7meWuouaIt+err+WPkemAgea2iOaBr1xuICAgICAgICBzZW5kUGFja2V0OiBmdW5jdGlvbiBzZW5kUGFja2V0KG1zZ0lELCBwYXJhbSkge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXQuZW1pdChtc2dJRCwgcGFyYW0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v5rOo5YaM5pyN5Yqh5Zmo5LqL5Lu25Ye95pWwXG4gICAgICAgIHJlZ2lzdGVySGFuZGxlcjogZnVuY3Rpb24gcmVnaXN0ZXJIYW5kbGVyKG1zZ0lELCBmdW5jKSB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5vbihtc2dJRCwgZnVuYyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/mnI3liqHlmajmlq3lvIDov57mjqXkuovku7ZcbiAgICAgICAgZGlzY29ubmVjdDogZnVuY3Rpb24gZGlzY29ubmVjdCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZXJ2ZXIgZGlzY29ubmVjdGVkLCBteSBpZHg6JywgdGhpcy5jbGllbnRJZCk7XG5cbiAgICAgICAgICAgIC8v5Yid5aeL5YyWXG4gICAgICAgICAgICAvL3RoaXMuc29ja2V0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50SWQgPSAtMTtcbiAgICAgICAgICAgIHRoaXMuYWNjb3VudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gQ0xJRU5UX1NUQVRFX0RJU0NPTk5FQ1Q7XG5cbiAgICAgICAgICAgIC8v5aaC5p6c5Zyo5oiY5paX5Lit77yM6L+b6KGM5LiA5Lqb5YW25LuW5aSE55CGXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/orr7nva5jbGllbnRJZFxuICAgICAgICBzZXRDbGllbnRJZDogZnVuY3Rpb24gc2V0Q2xpZW50SWQoaWR4KSB7XG4gICAgICAgICAgICB0aGlzLmNsaWVudElkID0gaWR4O1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v6I635Y+W6LSm5Y+35ZCN5a2XXG4gICAgICAgIGdldEFjY291bnROYW1lOiBmdW5jdGlvbiBnZXRBY2NvdW50TmFtZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjY291bnQpIHJldHVybiB0aGlzLmFjY291bnQuYWNjb3VudDtlbHNlIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMjgwYzNyc1pKSktuWjlScWJBTFZ3dEsnLCAnSGVsbG9Xb3JsZCcpO1xuLy8gU2NyaXB0XFxIZWxsb1dvcmxkLmpzXG5cbnZhciBDYXJkRGF0YU1hbmFnZXIgPSByZXF1aXJlKCcuL2RhdGEvQ2FyZERhdGFNYW5hZ2VyJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIENhcmREYXRhTWFuYWdlci5pbml0KCk7XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmYjQzMTBFRGg5SmJwQ2YvUXhpS2ZiQScsICdMb2dpblNjZW5lJyk7XG4vLyBTY3JpcHRcXExvZ2luU2NlbmUuanNcblxuLy/nmbvlvZXnlYzpnaLpu5jorqTohJrmnKxcbnJlcXVpcmUoJ3R5cGUnKTtcbnZhciBHYW1lQ29ubiA9IHJlcXVpcmUoJy4vTmV0V29yay9HYW1lQ29ubicpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGFjY291bnRfRWRpdGJveDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveFxuICAgICAgICB9LFxuXG4gICAgICAgIHBhc3N3b3JkX0VkaXRib3g6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkVkaXRCb3hcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgR2FtZUNvbm4uaW5pdCgpO1xuICAgICAgICBHYW1lQ29ubi5jb25uZWN0VG9TZXJ2ZXIoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICAvLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4gICAgLy8gfSxcblxuICAgIC8v55m75b2V5oyJ6ZKuICAgXG4gICAgbG9naW5fQnRuRXZlbnQ6IGZ1bmN0aW9uIGxvZ2luX0J0bkV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHZhciBhY2NvdW50ID0gdGhpcy5hY2NvdW50X0VkaXRib3guc3RyaW5nO1xuICAgICAgICBpZiAoYWNjb3VudCA9PT0gJycpIHtcbiAgICAgICAgICAgIHNob3dUaXBMYWJlbChcIui0puWPt+S4jeiDveS4uuepulwiLCBjYy5Db2xvci5SRUQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBhc3N3b3JkID0gdGhpcy5wYXNzd29yZF9FZGl0Ym94LnN0cmluZztcbiAgICAgICAgaWYgKHBhc3N3b3JkID09PSAnJykge1xuICAgICAgICAgICAgc2hvd1RpcExhYmVsKFwi5a+G56CB5LiN6IO95Li656m6XCIsIGNjLkNvbG9yLlJFRCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYy5sb2coXCJhY2NvdW50OiAlcywgcGFzc3dvcmQ6ICVzXCIsIGFjY291bnQsIHBhc3N3b3JkKTtcbiAgICAgICAgR2FtZUNvbm4ubG9naW4oYWNjb3VudCwgcGFzc3dvcmQpO1xuICAgIH1cblxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdkN2RhNGFxQm5wS3JyVEsyaDZQYlI1MicsICdNb25zdGVyU3ByaXRlJyk7XG4vLyBTY3JpcHRcXE1vbnN0ZXJTcHJpdGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgc3JjUG9zOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgX3BsYXllcjogbnVsbCwgLy9QbGF5ZXLlvJXnlKhcbiAgICAgICAgX2lkeDogMCwgLy/mlbDnu4TntKLlvJVcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5o6n5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBocExhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIGF0a0xhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWVMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBjYy5sb2codGhpcy5pc0F0a2VkKCkpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpIHx8IHRoaXMuaXNBdGtlZCgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc3JjUG9zLnggPSB0aGlzLm5vZGUueDtcbiAgICAgICAgICAgIHRoaXMuc3JjUG9zLnkgPSB0aGlzLm5vZGUueTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdzcmNYOiVkJywgdGhpcy5zcmNQb3MueCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkgfHwgdGhpcy5pc0F0a2VkKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIG1vdmVYID0gZXZlbnQuZ2V0TG9jYXRpb25YKCkgLSBldmVudC5nZXRTdGFydExvY2F0aW9uKCkueDtcbiAgICAgICAgICAgIHZhciBtb3ZlWSA9IGV2ZW50LmdldExvY2F0aW9uWSgpIC0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLnk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5zcmNQb3MueCArIG1vdmVYLCB0aGlzLnNyY1Bvcy55ICsgbW92ZVkpO1xuICAgICAgICAgICAgLy9jYy5sb2coJ3NyY1g6JWQnLCB0aGlzLnNyY1Bvcy54KTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdzdGFydFg6JWQnLGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS54KTtcbiAgICAgICAgICAgIC8vY2MubG9nKG1vdmVYKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpIHx8IHRoaXMuaXNBdGtlZCgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXI7XG4gICAgICAgICAgICB2YXIgZHVlbCA9IHBsYXllci5kdWVsO1xuICAgICAgICAgICAgdmFyIG9wcG9uZW50UGxheWVyID0gdGhpcy5nZXRQbGF5ZXJTcHJpdGUoMSk7XG4gICAgICAgICAgICAvL3ZhciBvcHBvbmVudFBsYXllciA9IHBsYXllcjtcbiAgICAgICAgICAgIHZhciBib3VuZEJveCwgcG9zLCBvcHBvQWRkWCwgb3Bwb0FkZFk7XG5cbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm56e75Yqo5Yiw5a+55pa56Iux6ZuE5LiKXG4gICAgICAgICAgICBib3VuZEJveCA9IG9wcG9uZW50UGxheWVyLmhlcm9JY29uU3ByaXRlLm5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgIG9wcG9BZGRZID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC54ICsgcGxheWVyLm5vZGUueCAtIG9wcG9uZW50UGxheWVyLm5vZGUueDtcbiAgICAgICAgICAgIG9wcG9BZGRZID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC55ICsgcGxheWVyLm5vZGUueSAtIG9wcG9uZW50UGxheWVyLm5vZGUueTtcbiAgICAgICAgICAgIHBvcyA9IG5ldyBjYy52Mih0aGlzLm5vZGUueCArIG9wcG9BZGRYLCB0aGlzLm5vZGUueSArIG9wcG9BZGRZKTtcbiAgICAgICAgICAgIGlmIChib3VuZEJveC5jb250YWlucyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgZHVlbC5tb25zdGVyQXRrUGxheWVyKHRoaXMuX2lkeCwgb3Bwb25lbnRQbGF5ZXIuZ2V0SWR4KCkpOyAvL+aUu+WHu+eOqeWutlxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQb3NUb1NyYygpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/liKTmlq3mmK/lkKbnp7vliqjliLDlr7nmlrnpmo/ku47kuIpcbiAgICAgICAgICAgIHZhciBtb25zdGVyU3ByaXRlQXJyYXkgPSBvcHBvbmVudFBsYXllci5tb25zdGVyU3ByaXRlQXJyYXk7XG4gICAgICAgICAgICBvcHBvQWRkWCA9IHBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueCArIHBsYXllci5ub2RlLnggLSBvcHBvbmVudFBsYXllci5ub2RlLnggLSBvcHBvbmVudFBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueDtcbiAgICAgICAgICAgIG9wcG9BZGRZID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC55ICsgcGxheWVyLm5vZGUueSAtIG9wcG9uZW50UGxheWVyLm5vZGUueSAtIG9wcG9uZW50UGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC55O1xuICAgICAgICAgICAgLy9jYy5sb2coJ29wcG9uZW50UGxheWVyLm1vbnN0ZXJTcHJpdGVBcnJheS5sZW5ndGg6JWQnLCBtb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9uc3RlclNwcml0ZUFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgYm91bmRCb3ggPSBtb25zdGVyU3ByaXRlQXJyYXlbaV0uZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgICAgICBwb3MgPSBuZXcgY2MudjIodGhpcy5ub2RlLnggKyBvcHBvQWRkWCwgdGhpcy5ub2RlLnkgKyBvcHBvQWRkWSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvdW5kQm94LmNvbnRhaW5zKHBvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVlbC5tb25zdGVyQXRrTW9uc3Rlcih0aGlzLl9pZHgsIG9wcG9uZW50UGxheWVyLmdldElkeCgpLCBpKTsgLy/mlLvlh7vlr7nmlrnpmo/ku45cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFBvc1RvU3JjKCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5LuA5LmI6YO95rKh5YGa77yM5aSN5L2NXG4gICAgICAgICAgICB0aGlzLnJlc2V0UG9zVG9TcmMoKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8v5piv5ZCm5r+A5rS7XG4gICAgaXNUdXJuQWN0aXZlOiBmdW5jdGlvbiBpc1R1cm5BY3RpdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wbGF5ZXIuaXNUdXJuQWN0aXZlO1xuICAgIH0sXG5cbiAgICAvL+acrOWbnuWQiOaYr+WQpuaUu+WHu+i/h1xuICAgIGlzQXRrZWQ6IGZ1bmN0aW9uIGlzQXRrZWQoKSB7XG4gICAgICAgIHZhciBtb25zdGVyID0gdGhpcy5fcGxheWVyLmZpZWxkQXJyYXlbdGhpcy5faWR4XTtcbiAgICAgICAgcmV0dXJuIG1vbnN0ZXIuaXNBdGtlZDtcbiAgICB9LFxuXG4gICAgcmVzZXRQb3NUb1NyYzogZnVuY3Rpb24gcmVzZXRQb3NUb1NyYygpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3JjUG9zLngsIHRoaXMuc3JjUG9zLnkpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zcmNQb3MgPSB7ICd4JzogMCwgJ3knOiAwIH07XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChtb25zdGVyLCBwbGF5ZXIsIGlkeCkge1xuXG4gICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmcgPSBtb25zdGVyLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuYXRrTGFiZWwuc3RyaW5nID0gbW9uc3Rlci5hdGsudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gbW9uc3Rlci5jYXJkTmFtZS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2U0OGUwQnc5c2xIeGJJSEo3MzBMYlJFJywgJ1BsYXllclNwcml0ZScpO1xuLy8gU2NyaXB0XFxQbGF5ZXJTcHJpdGUuanNcblxudmFyIENhcmRTcHJpdGUgPSByZXF1aXJlKCdDYXJkU3ByaXRlJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGlkeDogLTEsIC8v5a+55bqU546p5a62SURYXG4gICAgICAgIGR1ZWw6IG51bGwsIC8v5ri45oiP566h55CGXG4gICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXk6IFtdLCAvL+aJi+eJjOWbvueJh+aVsOe7hFxuICAgICAgICBtb25zdGVyU3ByaXRlQXJyYXk6IFtdLCAvL+maj+S7juWbvueJh+aVsOe7hFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5qih5p2/LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIG1vbnN0ZXJQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0t6IqC54K55rGg566h55CGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNhcmRQb29sOiBudWxsLFxuICAgICAgICBtb25zdGVyUG9vbDogbnVsbCxcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5o6n5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvL+aJi+eJjOWMulxuICAgICAgICBoYW5kRmlsZWRMYXlvdXQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dFxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5Zy65LiK6ZqP5LuO5Yy6XG4gICAgICAgIG1vbnN0ZXJGaWVsZExheW91dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5aS05YOPXG4gICAgICAgIGhlcm9JY29uU3ByaXRlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcblxuICAgICAgICAvL+ihgOmHj+aYvuekulxuICAgICAgICBoZXJvSHBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICAvL+WQjeWtl1xuICAgICAgICBoZXJvTmFtZUxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5rC05pm2XG4gICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXk6IFtjYy5TcHJpdGVdLFxuXG4gICAgICAgIC8v5Y2h57uE54mM5pWwXG4gICAgICAgIGRlY2tMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGR1ZWwpIHtcbiAgICAgICAgdGhpcy5pZHggPSAtMTtcbiAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmhhbmRDYXJkU3ByaXRlQXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZFBvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5ID0gW107XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5tb25zdGVyU3ByaXRlQXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTEgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRQb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbJ3JldHVybiddKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjJbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheSA9IFtdO1xuXG4gICAgICAgIC8v5aS05YOPXG5cbiAgICAgICAgLy9IUFxuICAgICAgICB0aGlzLmhlcm9IcExhYmVsLnN0cmluZyA9ICcwJztcbiAgICAgICAgLy/lkI3lrZdcbiAgICAgICAgdGhpcy5oZXJvTmFtZUxhYmVsLnN0cmluZyA9ICcnO1xuICAgICAgICAvL+awtOaZtlxuICAgICAgICB2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IzID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvcjMgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9pdGVyYXRvcjMgPSBjcml0aWNhbFNwcml0ZUFycmF5W1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNyaXRpY2FsU3ByaXRlID0gX3N0ZXAzLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgY3JpdGljYWxTcHJpdGUuc2V0VmlzaWJsZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjMgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IzID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zICYmIF9pdGVyYXRvcjNbJ3JldHVybiddKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjNbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlY2tMYWJlbC5zdHJpbmcgPSAnMzAnO1xuICAgIH0sXG5cbiAgICAvL+eVjOmdouWIt+aWsFxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKHRoaXMuaWR4KTtcblxuICAgICAgICAvL+awtOaZtuWbvueJh+WIt+aWsFxuICAgICAgICB2YXIgY3JpdGljYWxTcHJpdGVBcnJheSA9IHRoaXMuY3JpdGljYWxTcHJpdGVBcnJheTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICB2YXIgY3JpdGljYWxOdW0gPSBwbGF5ZXIuZ2V0Q3JpdGljYWwoKTtcbiAgICAgICAgdmFyIG1heENyaXRpY2FsTnVtID0gcGxheWVyLmdldE1heENyaXRpY2FsKCk7XG5cbiAgICAgICAgZm9yICg7IGkgPCBjcml0aWNhbE51bTsgKytpKSB7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLnNldFZpc2libGUoMSk7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMCwgMjU1LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA8IG1heENyaXRpY2FsTnVtOyArK2kpIHtcbiAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXlbaV0uc2V0VmlzaWJsZSgxKTtcbiAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXlbaV0ubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDAsIDApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpIDwgY3JpdGljYWxTcHJpdGVBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgY3JpdGljYWxTcHJpdGVBcnJheVtpXS5zZXRWaXNpYmxlKDApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZXJvSHBMYWJlbC5zdHJpbmcgPSBwbGF5ZXIuZ2V0SHAoKS50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmhlcm9OYW1lTGFiZWwuc3RyaW5nID0gcGxheWVyLmdldEhlcm9OYW1lKCk7XG4gICAgICAgIHRoaXMuZGVja0xhYmVsLnN0cmluZyA9IHBsYXllci5nZXREZWNrTnVtKCkudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLy/liJvlu7rmiYvniYzlm77niYdcbiAgICBjcmVhdGVDYXJkU3ByaXRlOiBmdW5jdGlvbiBjcmVhdGVDYXJkU3ByaXRlKGNhcmQpIHtcbiAgICAgICAgdmFyIGNhcmRTcHJpdGU7XG4gICAgICAgIGlmICh0aGlzLmNhcmRQb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIGNhcmRTcHJpdGUgPSB0aGlzLmNhcmRQb29sLmdldCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhcmRTcHJpdGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kRmlsZWRMYXlvdXQubm9kZS5hZGRDaGlsZChjYXJkU3ByaXRlKTtcbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5LnB1c2goY2FyZFNwcml0ZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEhhbmRDYXJkKCk7IC8v5Yi35paw5omL54mM5Zu+54mHXG4gICAgfSxcblxuICAgIC8v5Yig6Zmk5omL54mM5Zu+54mHXG4gICAgaGFuZENhcmREZWxldGU6IGZ1bmN0aW9uIGhhbmRDYXJkRGVsZXRlKGlkeCkge1xuICAgICAgICB2YXIgY2FyZFNwcml0ZSA9IHRoaXMuaGFuZENhcmRTcHJpdGVBcnJheVtpZHhdO1xuICAgICAgICB0aGlzLmNhcmRQb29sLnB1dChjYXJkU3ByaXRlKTtcbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgICB0aGlzLnJlZnJlc2hIYW5kQ2FyZCgpOyAvL+WIt+aWsOaJi+eJjOWbvueJh1xuICAgIH0sXG5cbiAgICAvL+WIm+W7uumaj+S7juWbvueJh1xuICAgIGNyZWF0ZU1vbnN0ZXJTcHJpdGU6IGZ1bmN0aW9uIGNyZWF0ZU1vbnN0ZXJTcHJpdGUobW9uc3Rlcikge1xuICAgICAgICAvL+WIm+W7uumaj+S7juWbvueJh+i1hOa6kFxuICAgICAgICB2YXIgbW9uc3RlclNwcml0ZTtcbiAgICAgICAgaWYgKHRoaXMubW9uc3RlclBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgbW9uc3RlclNwcml0ZSA9IHRoaXMubW9uc3RlclBvb2wuZ2V0KHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9uc3RlclNwcml0ZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMubW9uc3RlclByZWZhYik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vbnN0ZXJGaWVsZExheW91dC5hZGRDaGlsZChtb25zdGVyU3ByaXRlKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkucHVzaChtb25zdGVyU3ByaXRlKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoTW9uc3RlckZpZWxkKCk7IC8v5Yi35paw6ZqP5LuO5Yy6XG4gICAgfSxcblxuICAgIC8v5Yig6Zmk6ZqP5LuO5Zu+54mHXG4gICAgZGVsZXRlTW9uc3RlclNwcml0ZTogZnVuY3Rpb24gZGVsZXRlTW9uc3RlclNwcml0ZShpZHgpIHtcbiAgICAgICAgdmFyIG1vbnN0ZXJTcHJpdGUgPSB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheVtpZHhdO1xuICAgICAgICB0aGlzLmNhcmRQb29sLnB1dChtb25zdGVyU3ByaXRlKTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIHRoaXMucmVmcmVzaE1vbnN0ZXJGaWVsZCgpOyAvL+WIt+aWsOmaj+S7juWbvueJhyAgICAgXG4gICAgfSxcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nlYzpnaLliLfmlrAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvL+aJi+eJjOWbvueJh+WIt+aWsFxuICAgIHJlZnJlc2hIYW5kQ2FyZDogZnVuY3Rpb24gcmVmcmVzaEhhbmRDYXJkKCkge1xuICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5kdWVsLmdldFBsYXllcih0aGlzLmlkeCk7XG4gICAgICAgIHZhciBoYW5kQXJyYXkgPSBwbGF5ZXIuaGFuZEFycmF5O1xuICAgICAgICB2YXIgaGFuZENhcmRTcHJpdGVBcnJheSA9IHRoaXMuaGFuZENhcmRTcHJpdGVBcnJheTtcbiAgICAgICAgdmFyIGFycmF5TGVuZ3RoID0gaGFuZEFycmF5Lmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5TGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChoYW5kQ2FyZFNwcml0ZUFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgaGFuZENhcmRTcHJpdGVBcnJheVtpXS5nZXRDb21wb25lbnQoJ0NhcmRTcHJpdGUnKS5pbml0KGhhbmRBcnJheVtpXSwgcGxheWVyLCBpKTtcbiAgICAgICAgICAgICAgICBoYW5kQ2FyZFNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDkwICogaSArIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3Nwcml0ZScpLndpZHRoIC8gMiAtIHRoaXMuaGFuZEZpbGVkTGF5b3V0Lm5vZGUud2lkdGggLyAyLCAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdoYW5kQ2FyZFNwcml0ZUFycmF5IGlzIGxlc3MgdGhhbiBoYW5kQXJyYXkhICVkLyVkJywgaSwgYXJyYXlMZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5Zu+54mH5Yi35pawXG4gICAgcmVmcmVzaE1vbnN0ZXJGaWVsZDogZnVuY3Rpb24gcmVmcmVzaE1vbnN0ZXJGaWVsZCgpIHtcbiAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuZHVlbC5nZXRQbGF5ZXIodGhpcy5pZHgpO1xuICAgICAgICB2YXIgZmllbGRBcnJheSA9IHBsYXllci5maWVsZEFycmF5O1xuICAgICAgICB2YXIgbW9uc3RlclNwcml0ZUFycmF5ID0gdGhpcy5tb25zdGVyU3ByaXRlQXJyYXk7XG4gICAgICAgIHZhciBhcnJheUxlbmd0aCA9IGZpZWxkQXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJTcHJpdGVBcnJheVtpXSkge1xuICAgICAgICAgICAgICAgIG1vbnN0ZXJTcHJpdGVBcnJheVtpXS5nZXRDb21wb25lbnQoJ01vbnN0ZXJTcHJpdGUnKS5pbml0KGZpZWxkQXJyYXlbaV0sIHBsYXllciwgaSk7XG4gICAgICAgICAgICAgICAgbW9uc3RlclNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDExMCAqIGkgKyBtb25zdGVyU3ByaXRlQXJyYXlbaV0ud2lkdGggLyAyIC0gdGhpcy5tb25zdGVyRmllbGRMYXlvdXQud2lkdGggLyAyLCAwKTtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhtb25zdGVyU3ByaXRlQXJyYXlbaV0ud2lkdGgpO1xuICAgICAgICAgICAgICAgIC8vY2MubG9nKHRoaXMubW9uc3RlckZpZWxkTGF5b3V0Lm5vZGUud2lkdGgpO1xuICAgICAgICAgICAgICAgIC8vbW9uc3RlclNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDAsMCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkQXJyYXlbaV0uaXNBdGtlZCkgbW9uc3RlclNwcml0ZUFycmF5W2ldLm9wYWNpdHkgPSAxMDA7ZWxzZSBtb25zdGVyU3ByaXRlQXJyYXlbaV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdtb25zdGVyU3ByaXRlQXJyYXkgaXMgbGVzcyB0aGFuIGZpZWxkQXJyYXkhICVkLyVkJywgaSwgYXJyYXlMZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElkeDogZnVuY3Rpb24gc2V0SWR4KGlkeCkge1xuICAgICAgICB0aGlzLmlkeCA9IGlkeDtcbiAgICB9LFxuICAgIGdldElkeDogZnVuY3Rpb24gZ2V0SWR4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pZHg7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLmNhcmRQb29sID0gbmV3IGNjLk5vZGVQb29sKCdjYXJkJyk7XG4gICAgICAgIC8vY2MubG9nKCd0aGlzLmNhcmRQb29sIHR5cGUnKTtcbiAgICAgICAgLy9jYy5sb2codGhpcy5jYXJkUG9vbCk7XG4gICAgICAgIHRoaXMubW9uc3RlclBvb2wgPSBuZXcgY2MuTm9kZVBvb2woJ21vbnN0ZXInKTtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3NzQyNzNhVFB0SWxMY1VqbnBMWmxWWicsICdjYXJkJyk7XG4vLyBTY3JpcHRcXGNhcmQuanNcblxudmFyIENBUkRfVVBEQVRFX0NBUkROQU1FID0gMSA8PCAxO1xudmFyIENBUkRfVVBEQVRFX0NSSVRJQ0FMID0gMSA8PCAyO1xudmFyIENBUkRfVVBEQVRFX0FUSyA9IDEgPDwgMztcbnZhciBDQVJEX1VQREFURV9IUCA9IDEgPDwgNDtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBwbGF5ZXI6IG51bGwsIC8vUGxheWVy5byV55SoXG4gICAgICAgIGlkeDogMCwgLy/mlbDnu4TntKLlvJVcbiAgICAgICAgaXNIaWRlOiBmYWxzZSwgLy/pmpDol4/mlbDmja5cbiAgICAgICAgY2FyZE5hbWU6IFwiXCIsXG4gICAgICAgIGNyaXRpY2FsOiAwLFxuICAgICAgICBhdGs6IDAsXG4gICAgICAgIGhwOiAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICAvKmluaXQ6IGZ1bmN0aW9uKGNhcmREYXRhLCBwbGF5ZXIsIGlkeCl7XHJcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IGNhcmREYXRhLmNyaXRpY2FsO1xyXG4gICAgICAgIHRoaXMuY2FyZE5hbWUgPSBjYXJkRGF0YS5jYXJkTmFtZTtcclxuICAgICAgICB0aGlzLmF0ayA9IGNhcmREYXRhLmF0aztcclxuICAgICAgICB0aGlzLmhwID0gY2FyZERhdGEuaHA7XHJcbiAgICAgICAgXHJcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XHJcbiAgICAgICAgdGhpcy5pZHggPSBpZHg7XHJcbiAgICB9LCovXG5cbiAgICAvL+aJk+WMheaVsOaNruWujOaVtFxuICAgIHBhY2tEYXRhQWxsOiBmdW5jdGlvbiBwYWNrRGF0YUFsbChkYXRhKSB7XG4gICAgICAgIGRhdGEuaWR4ID0gdGhpcy5pZHg7XG4gICAgICAgIGRhdGEuaGlkZSA9IHRoaXMuaXNIaWRlO1xuXG4gICAgICAgIGRhdGEuY2FyZE5hbWUgPSB0aGlzLmNhcmROYW1lO1xuICAgICAgICBkYXRhLmNyaXRpY2FsID0gdGhpcy5jcml0aWNhbDtcbiAgICAgICAgZGF0YS5hdGsgPSB0aGlzLmF0aztcbiAgICAgICAgZGF0YS5ocCA9IHRoaXMuaHA7XG4gICAgfSxcblxuICAgIC8v6Kej5byA5pWw5o2u5a6M5pW0XG4gICAgdW5QYWNrRGF0YUFsbDogZnVuY3Rpb24gdW5QYWNrRGF0YUFsbChkYXRhKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gZGF0YS5pZHg7XG4gICAgICAgIHRoaXMuaXNIaWRlID0gZGF0YS5oaWRlO1xuICAgICAgICBpZiAodGhpcy5pc0hpZGUpIHJldHVybjtcblxuICAgICAgICB0aGlzLmNhcmROYW1lID0gZGF0YS5jYXJkTmFtZTtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IGRhdGEuY3JpdGljYWw7XG4gICAgICAgIHRoaXMuYXRrID0gZGF0YS5hdGs7XG4gICAgICAgIHRoaXMuaHAgPSBkYXRhLmhwO1xuICAgIH0sXG5cbiAgICAvL+aJk+WMheaVsOaNrlxuICAgIHBhY2tEYXRhOiBmdW5jdGlvbiBwYWNrRGF0YShkYXRhLCBmbGFnKSB7XG4gICAgICAgIGRhdGEuZmxhZyA9IGZsYWc7XG4gICAgICAgIGRhdGEuaWR4ID0gdGhpcy5pZHg7XG5cbiAgICAgICAgaWYgKGZsYWcgJiBDQVJEX1VQREFURV9DQVJETkFNRSkgZGF0YS5jYXJkTmFtZSA9IHRoaXMuY2FyZE5hbWU7XG4gICAgICAgIGlmIChmbGFnICYgQ0FSRF9VUERBVEVfQ1JJVElDQUwpIGRhdGEuY3JpdGljYWwgPSB0aGlzLmNyaXRpY2FsO1xuICAgICAgICBpZiAoZmxhZyAmIENBUkRfVVBEQVRFX0FUSykgZGF0YS5hdGsgPSB0aGlzLmF0aztcbiAgICAgICAgaWYgKGZsYWcgJiBDQVJEX1VQREFURV9IUCkgZGF0YS5ocCA9IHRoaXMuaHA7XG4gICAgfSxcblxuICAgIC8v6Kej5byA5pWw5o2uXG4gICAgdW5QYWNrRGF0YTogZnVuY3Rpb24gdW5QYWNrRGF0YShkYXRhKSB7XG4gICAgICAgIHZhciBmbGFnID0gZGF0YS5mbGFnO1xuICAgICAgICB0aGlzLmlkeCA9IGRhdGEuaWR4O1xuICAgICAgICB0aGlzLmlzSGlkZSA9IGhpZGU7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNIaWRlKSByZXR1cm47XG5cbiAgICAgICAgaWYgKGZsYWcgJiBDQVJEX1VQREFURV9DQVJETkFNRSkgdGhpcy5jYXJkTmFtZSA9IGRhdGEuY2FyZE5hbWU7XG4gICAgICAgIGlmIChmbGFnICYgQ0FSRF9VUERBVEVfQ1JJVElDQUwpIHRoaXMuY3JpdGljYWwgPSBkYXRhLmNyaXRpY2FsO1xuICAgICAgICBpZiAoZmxhZyAmIENBUkRfVVBEQVRFX0FUSykgdGhpcy5hdGsgPSBkYXRhLmF0aztcbiAgICAgICAgaWYgKGZsYWcgJiBDQVJEX1VQREFURV9IUCkgdGhpcy5ocCA9IGRhdGEuaHA7XG4gICAgfSxcblxuICAgIC8v5pu05paw57yW5Y+3XG4gICAgcmVmcmVzaElkeDogZnVuY3Rpb24gcmVmcmVzaElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzc0ODY4bENoTEpIa3F4T21HamhVaGtrJywgJ2R1ZWwnKTtcbi8vIFNjcmlwdFxcZHVlbC5qc1xuXG4vL+WkhOeQhuWvueaImOa1geeoi+eahOWFs+mUruexu1xuXG52YXIgUGxheWVyID0gcmVxdWlyZSgncGxheWVyJyk7XG52YXIgQ2hhdFduZCA9IHJlcXVpcmUoJ0NoYXRXbmQnKTtcbnZhciBQbGF5ZXJTcHJpdGUgPSByZXF1aXJlKCdQbGF5ZXJTcHJpdGUnKTtcbnZhciBHYW1lQ29ubiA9IHJlcXVpcmUoJy4vTmV0V29yay9HYW1lQ29ubicpO1xuLy92YXIgRXZlbnRQcm9jZXNzID0gcmVxdWlyZSgnLi9OZXR3b3JrL0V2ZW50UHJvY2VzcycpO1xuXG4vL+WvueaImOeKtuaAgVxudmFyIERVRUxfU1RBVEVfUkVTVCA9IDA7XG52YXIgRFVFTF9TVEFURV9QTEFZSU5HID0gMTtcblxuLy/liIbnu4RcbnZhciBURUFNX0NPTE9SX05PTkUgPSAtMTtcbnZhciBURUFNX0NPTE9SX1JFRCA9IDE7XG52YXIgVEVBTV9DT0xPUl9CTFVFID0gMjtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBwbGF5ZXJWZWM6IFtdLFxuICAgICAgICBzdGF0ZTogRFVFTF9TVEFURV9SRVNULFxuXG4gICAgICAgIHR1cm46IDAsIC8v5q+P5Liq546p5a625LiA5Zue5ZCI5Yqg5LiA5qyhXG4gICAgICAgIHJvdW5kOiAwLCAvL+avj+S4queOqeWutumDveihjOWKqOi/h+S4gOWbnuWQiOWKoOS4gOasoVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYXllclNwcml0ZVZlYzogW1BsYXllclNwcml0ZV0sIC8v546p5a625o6n5Lu2XG5cbiAgICAgICAgLy/ogYrlpKnnqpflj6PohJrmnKxcbiAgICAgICAgY2hhdFduZDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogQ2hhdFduZFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY2MubG9nKCcxMjMxMzEyMzIxMzEzMjEzMTIzJyk7XG4gICAgICAgICAgICBjYy5sb2coZXZlbnQuZ2V0TG9jYXRpb25YKCkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgYWRkUGxheWVyOiBmdW5jdGlvbiBhZGRQbGF5ZXIocGFyYW0pIHtcbiAgICAgICAgdmFyIGlkeCA9IHBhcmFtO1xuICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5kdWVsLnBsYXllclZlY1tpZHhdO1xuICAgICAgICAvL+eOqeWutuaVsOaNruW3suWtmOWcqFxuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICBjYy5sb2coJ1dDX1BMQVlFUl9BREQgZXJyb3IhIHBsYXllciglZCkgaXMgYWxyZWFkeSBleGl0ZWQuJywgaWR4KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Yib5bu6546p5a625bm25Yqg5YWl546p5a625pWw57uEXG4gICAgICAgIGNyZWF0ZVBsYXllcihwYXJhbSk7XG4gICAgfSxcblxuICAgIGNyZWF0ZVBsYXllcjogZnVuY3Rpb24gY3JlYXRlUGxheWVyKHBhcmFtKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gICAgICAgIHBsYXllci5pbml0KHRoaXMpO1xuICAgICAgICBwbGF5ZXIudW5wYWNrRGF0YUFsbChwYXJhbSk7XG4gICAgICAgIHRoaXMucGxheWVyVmVjW2lkeF0gPSBwbGF5ZXI7XG4gICAgfSxcblxuICAgIGdldFBsYXllcjogZnVuY3Rpb24gZ2V0UGxheWVyKGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJWZWNbaWR4XTtcbiAgICB9LFxuXG4gICAgZ2V0UGxheWVyU3ByaXRlOiBmdW5jdGlvbiBnZXRQbGF5ZXJTcHJpdGUoaWR4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBsYXllclNwcml0ZVZlY1tpZHhdO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXJTcHJpdGVCeVBsYXllcjogZnVuY3Rpb24gZ2V0UGxheWVyU3ByaXRlQnlQbGF5ZXIoaWR4KSB7XG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yID0gZmFsc2U7XG4gICAgICAgIHZhciBfaXRlcmF0b3JFcnJvciA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yID0gdGhpcy5wbGF5ZXJTcHJpdGVWZWNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclNwcml0ZSA9IF9zdGVwLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHBsYXllclNwcml0ZS5nZXRJZHgoKSA9PT0gaWR4KSByZXR1cm4gcGxheWVyU3ByaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIHJlZnJlc2hQbGF5ZXJTcHJpdGU6IGZ1bmN0aW9uIHJlZnJlc2hQbGF5ZXJTcHJpdGUocGxheWVySWR4KSB7XG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWU7XG4gICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjIgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMiA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMiA9IHRoaXMucGxheWVyU3ByaXRlVmVjW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAyOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gKF9zdGVwMiA9IF9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclNwcml0ZSA9IF9zdGVwMi52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXJTcHJpdGUuZ2V0SWR4KCkgPT09IHBsYXllcklkeCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXJTcHJpdGUucmVmcmVzaCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IyWydyZXR1cm4nXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5Y+s5ZSk6ZqP5LuOXG4gICAgc3VtbW9uTW9uc3RlcjogZnVuY3Rpb24gc3VtbW9uTW9uc3RlcihjYXJkSWR4KSB7XG4gICAgICAgIEdhbWVDb25uLnNlbmRQYWNrZXQoQ1dfTU9OU1RFUl9TVU1NT05fUkVRVUVTVCwgY2FyZElkeCk7XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5pS75Ye7546p5a62XG4gICAgbW9uc3RlckF0a1BsYXllcjogZnVuY3Rpb24gbW9uc3RlckF0a1BsYXllcihtb25zdGVySWR4LCBwbGF5ZXJJZHgpIHtcbiAgICAgICAgR2FtZUNvbm4uc2VuZFBhY2tldChDV19NT05TVEVSX0FUVEFDS1BMQVlFUl9SRVFVRVNULCB7IGlkeDogbW9uc3RlcklkeCwgdGFyZ2V0UGxheWVySWR4OiBwbGF5ZXJJZHggfSk7XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5pS75Ye76ZqP5LuOXG4gICAgbW9uc3RlckF0a01vbnN0ZXI6IGZ1bmN0aW9uIG1vbnN0ZXJBdGtNb25zdGVyKG1vbnN0ZXJJZHgsIHBsYXllcklkeCwgdGFyZ2V0TW9uc3RlcklkeCkge1xuICAgICAgICBHYW1lQ29ubi5zZW5kUGFja2V0KENXX01PTlNURVJfQVRUQUNLTU9OU1RFUl9SRVFVRVNULCB7IGlkeDogbW9uc3RlcklkeCwgdGFyZ2V0UGxheWVySWR4OiBwbGF5ZXJJZHgsIHRhcmdldE1vbnN0ZXJJZHg6IHRhcmdldE1vbnN0ZXJJZHggfSk7XG4gICAgfSxcblxuICAgIC8v5Yik5pat6L6T6LWiXG4gICAgY2hlY2tXaW46IGZ1bmN0aW9uIGNoZWNrV2luKCkge1xuICAgICAgICBpZiAodGhpcy50dXJuUGxheWVyLmhwIDw9IDAgJiYgdGhpcy50dXJuT3Bwb25lbnQuaHAgPD0gMCkge1xuICAgICAgICAgICAgc2hvd1RpcExhYmVsKFwi5bmz5bGAXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHVyblBsYXllci5ocCA8PSAwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCIlcyDog5zliKlcIiwgdGhpcy5vcHBvbmVudFBsYXllci5oZXJvTmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50dXJuT3Bwb25lbnQuaHAgPD0gMCkge1xuICAgICAgICAgICAgc2hvd1RpcExhYmVsKFwiJSDog5zliKlcIiwgdGhpcy50dXJuUGxheWVyLmhlcm9OYW1lKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+WbnuWQiOe7k+adn++8iOaMiemSruiwg+eUqO+8iVxuICAgIHR1cm5FbmRfQnRuRXZlbnQ6IGZ1bmN0aW9uIHR1cm5FbmRfQnRuRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgLy/kuI3mmK9NYWluUGhhc2Xov5nkuKrmjInpkq7kuI3og73mjIlcbiAgICAgICAgaWYgKHRoaXMucGhhc2VTdGF0ZSAhPT0gUEhBU0VfTUFJTl9UVVJOKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VQaGFzZShQSEFTRV9FTkRfVFVSTik7XG4gICAgfSxcblxuICAgIGFkZENoYXRJdGVtOiBmdW5jdGlvbiBhZGRDaGF0SXRlbShtZXNzYWdlLCBjb2xvcikge1xuICAgICAgICB0aGlzLmNoYXRXbmQuYWRkQ2hhdEl0ZW0obWVzc2FnZSwgY29sb3IpO1xuICAgICAgICAvL3RoaXMuY2hhdFduZC5hZGRDaGF0SXRlbSgnW+ezu+e7n10655So5oi3JyArIEdhbWVDb25uLmdldEFjY291bnROYW1lKCkgKyAn6L+b5YWl5LqG5oi/6Ze0LicsIGNjLkNvbG9yLlJFRCk7XG4gICAgfSxcblxuICAgIGVudGVyQmVnaW5UdXJuOiBmdW5jdGlvbiBlbnRlckJlZ2luVHVybigpIHtcbiAgICAgICAgY2MubG9nKCdpcyBlbnRlciBCZWdpblR1cm4/Jyk7XG4gICAgICAgICsrdGhpcy50dXJuO1xuICAgICAgICB0aGlzLnR1cm5QbGF5ZXJDaGFuZ2UoKTtcblxuICAgICAgICBzaG93VGlwTGFiZWwodGhpcy50dXJuUGxheWVyLmhlcm9OYW1lICsgJ+eahOWbnuWQiCcpO1xuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuc2V0VHVybkFjdGl2ZSh0cnVlKTsgLy/lj6/ku6XooYzliqhcbiAgICAgICAgdGhpcy50dXJuUGxheWVyLmNyaXRpY2FsUGx1cygxKTsgLy/lop7liqDmsLTmmbZcbiAgICAgICAgdGhpcy50dXJuUGxheWVyLmNyaXRpY2FsUmVjb3ZlcigpOyAvL+WbnuWkjeawtOaZtlxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuYXdha2VuTW9uc3RlcigpOyAvL+mHjee9rumaj+S7juaUu+WHu+asoeaVsFxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuZHJhd0RlY2soMSk7IC8v5oq9MeW8oOWNoVxuICAgIH0sXG5cbiAgICBiZWdpblR1cm46IGZ1bmN0aW9uIGJlZ2luVHVybigpIHtcbiAgICAgICAgLy/ov5vlhaXkuLvmtYHnqItcblxuICAgICAgICB0aGlzLmNoYW5nZVBoYXNlKFBIQVNFX01BSU5fVFVSTik7XG4gICAgfSxcblxuICAgIGxlYXZlQmVnaW5UdXJuOiBmdW5jdGlvbiBsZWF2ZUJlZ2luVHVybigpIHt9LFxuXG4gICAgZW50ZXJNYWluVHVybjogZnVuY3Rpb24gZW50ZXJNYWluVHVybigpIHt9LFxuXG4gICAgbWFpblR1cm46IGZ1bmN0aW9uIG1haW5UdXJuKCkge30sXG5cbiAgICBsZWF2ZU1haW5UdXJuOiBmdW5jdGlvbiBsZWF2ZU1haW5UdXJuKCkge30sXG5cbiAgICBlbnRlckVuZFR1cm46IGZ1bmN0aW9uIGVudGVyRW5kVHVybigpIHt9LFxuXG4gICAgZW5kVHVybjogZnVuY3Rpb24gZW5kVHVybigpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQaGFzZShQSEFTRV9CRUdJTl9UVVJOKTtcbiAgICB9LFxuXG4gICAgbGVhdmVFbmRUdXJuOiBmdW5jdGlvbiBsZWF2ZUVuZFR1cm4oKSB7XG5cbiAgICAgICAgdGhpcy50dXJuUGxheWVyLnNldFR1cm5BY3RpdmUoZmFsc2UpO1xuICAgIH0sXG5cbiAgICBjaGFuZ2VQaGFzZTogZnVuY3Rpb24gY2hhbmdlUGhhc2UobmV4dFR1cm5UeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLnBoYXNlU3RhdGUgIT09IDApIHtcbiAgICAgICAgICAgIHRoaXMubGVhdmVUdXJuRnVuY1t0aGlzLnBoYXNlU3RhdGVdKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudGVyVHVybkZ1bmNbbmV4dFR1cm5UeXBlXSgpO1xuICAgICAgICB0aGlzLnBoYXNlU3RhdGUgPSBuZXh0VHVyblR5cGU7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICAvL3RoaXMuc2V0SW5wdXRDb250cm9sKCk7XG4gICAgICAgIC8v5Yid5aeL5YyW546p5a625o6n5Lu2XG4gICAgICAgIHZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IHRydWU7XG4gICAgICAgIHZhciBfZGlkSXRlcmF0b3JFcnJvcjMgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yMyA9IHVuZGVmaW5lZDtcblxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2l0ZXJhdG9yMyA9IHRoaXMucGxheWVyU3ByaXRlVmVjW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3N0ZXAzOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gKF9zdGVwMyA9IF9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllclNwcml0ZSA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHBsYXllclNwcml0ZS5pbml0KHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yMyA9IHRydWU7XG4gICAgICAgICAgICBfaXRlcmF0b3JFcnJvcjMgPSBlcnI7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICghX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMgJiYgX2l0ZXJhdG9yM1sncmV0dXJuJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgX2l0ZXJhdG9yM1sncmV0dXJuJ10oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGlmIChfZGlkSXRlcmF0b3JFcnJvcjMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3IzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgIC8vdGhpcy5zdGFydEdhbWUoKTtcbiAgICAgICAgRXZlbnRQcm9jZXNzLnNldER1ZWwodGhpcyk7XG4gICAgICAgIEdhbWVDb25uLnNlbmRQYWNrZXQoQ1dfRU5URVJST09NX1JFUVVFU1QsIHt9KTsgLy/nlKjmiLfov5vlhaXmiL/pl7Tor7fmsYJcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICAvL3RoaXMudHVybkZ1bmNbdGhpcy5waGFzZVN0YXRlXSgpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTdiMmNLSEZtNUF3N3kwdlU4a2RyWU8nLCAnbW9uc3RlcicpO1xuLy8gU2NyaXB0XFxtb25zdGVyLmpzXG5cbnZhciBNT05TVEVSX1VQREFURV9DQVJETkFNRSA9IDEgPDwgMTtcbnZhciBNT05TVEVSX1VQREFURV9DUklUSUNBTCA9IDEgPDwgMjtcbnZhciBNT05TVEVSX1VQREFURV9BVEsgPSAxIDw8IDM7XG52YXIgTU9OU1RFUl9VUERBVEVfSFAgPSAxIDw8IDQ7XG52YXIgTU9OU1RFUl9VUERBVEVfTUFYSFAgPSAxIDw8IDU7XG52YXIgTU9OU1RFUl9VUERBVEVfSVNBVEtFRCA9IDEgPDwgNjtcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgYXRrOiAwLFxuICAgICAgICBocDogMCxcbiAgICAgICAgbWF4SHA6IDAsXG4gICAgICAgIGlzQXRrZWQ6IHRydWUgfSxcblxuICAgIC8v5pys5Zue5ZCI5piv5ZCm5pS75Ye76L+HXG4gICAgLy/miZPljIXmlbDmja7lrozmlbRcbiAgICBwYWNrRGF0YUFsbDogZnVuY3Rpb24gcGFja0RhdGFBbGwoZGF0YSkge1xuICAgICAgICBkYXRhLmlkeCA9IHRoaXMuaWR4O1xuXG4gICAgICAgIGRhdGEuY2FyZE5hbWUgPSB0aGlzLmNhcmROYW1lO1xuICAgICAgICBkYXRhLmNyaXRpY2FsID0gdGhpcy5jcml0aWNhbDtcbiAgICAgICAgZGF0YS5hdGsgPSB0aGlzLmF0aztcbiAgICAgICAgZGF0YS5ocCA9IHRoaXMuaHA7XG4gICAgICAgIGRhdGEubWF4SHAgPSB0aGlzLm1heEhwO1xuICAgICAgICBkYXRhLmlzQXRrZWQgPSB0aGlzLmlzQXRrZWQ7XG4gICAgfSxcblxuICAgIC8v6Kej5byA5pWw5o2u5a6M5pW0XG4gICAgdW5QYWNrRGF0YUFsbDogZnVuY3Rpb24gdW5QYWNrRGF0YUFsbChkYXRhKSB7XG4gICAgICAgIHRoaXMuaWR4ID0gZGF0YS5pZHg7XG5cbiAgICAgICAgdGhpcy5jYXJkTmFtZSA9IGRhdGEuY2FyZE5hbWU7XG4gICAgICAgIHRoaXMuY3JpdGljYWwgPSBkYXRhLmNyaXRpY2FsO1xuICAgICAgICB0aGlzLmF0ayA9IGRhdGEuYXRrO1xuICAgICAgICB0aGlzLmhwID0gZGF0YS5ocDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IGRhdGEubWF4SHA7XG4gICAgICAgIHRoaXMuaXNBdGtlZCA9IGRhdGEuaXNBdGtlZDtcbiAgICB9LFxuXG4gICAgLy/miZPljIXmlbDmja5cbiAgICBwYWNrRGF0YTogZnVuY3Rpb24gcGFja0RhdGEoZGF0YSwgZmxhZykge1xuICAgICAgICBkYXRhLmZsYWcgPSBmbGFnO1xuICAgICAgICBkYXRhLmlkeCA9IHRoaXMuaWR4O1xuXG4gICAgICAgIGlmIChmbGFnICYgTU9OU1RFUl9VUERBVEVfQ0FSRE5BTUUpIGRhdGEuY2FyZE5hbWUgPSB0aGlzLmNhcmROYW1lO1xuICAgICAgICBpZiAoZmxhZyAmIE1PTlNURVJfVVBEQVRFX0NSSVRJQ0FMKSBkYXRhLmNyaXRpY2FsID0gdGhpcy5jcml0aWNhbDtcbiAgICAgICAgaWYgKGZsYWcgJiBNT05TVEVSX1VQREFURV9BVEspIGRhdGEuYXRrID0gdGhpcy5hdGs7XG4gICAgICAgIGlmIChmbGFnICYgTU9OU1RFUl9VUERBVEVfSFApIGRhdGEuaHAgPSB0aGlzLmhwO1xuICAgICAgICBpZiAoZmxhZyAmIE1PTlNURVJfVVBEQVRFX01BWEhQKSBkYXRhLm1heEhwID0gdGhpcy5tYXhIcDtcbiAgICAgICAgaWYgKGZsYWcgJiBNT05TVEVSX1VQREFURV9JU0FUS0VEKSBkYXRhLmlzQXRrZWQgPSB0aGlzLmlzQXRrZWQ7XG4gICAgfSxcblxuICAgIC8v6Kej5byA5pWw5o2uXG4gICAgdW5QYWNrRGF0YTogZnVuY3Rpb24gdW5QYWNrRGF0YShkYXRhKSB7XG4gICAgICAgIHZhciBmbGFnID0gZGF0YS5mbGFnO1xuICAgICAgICB0aGlzLmlkeCA9IGRhdGEuaWR4O1xuXG4gICAgICAgIGlmIChmbGFnICYgTU9OU1RFUl9VUERBVEVfQ0FSRE5BTUUpIHRoaXMuY2FyZE5hbWUgPSBkYXRhLmNhcmROYW1lO1xuICAgICAgICBpZiAoZmxhZyAmIE1PTlNURVJfVVBEQVRFX0NSSVRJQ0FMKSB0aGlzLmNyaXRpY2FsID0gZGF0YS5jcml0aWNhbDtcbiAgICAgICAgaWYgKGZsYWcgJiBNT05TVEVSX1VQREFURV9BVEspIHRoaXMuYXRrID0gZGF0YS5hdGs7XG4gICAgICAgIGlmIChmbGFnICYgTU9OU1RFUl9VUERBVEVfSFApIHRoaXMuaHAgPSBkYXRhLmhwO1xuICAgICAgICBpZiAoZmxhZyAmIE1PTlNURVJfVVBEQVRFX01BWEhQKSB0aGlzLm1heEhwID0gZGF0YS5tYXhIcDtcbiAgICAgICAgaWYgKGZsYWcgJiBNT05TVEVSX1VQREFURV9JU0FUS0VEKSB0aGlzLmlzQXRrZWQgPSBkYXRhLmlzQXRrZWQ7XG4gICAgfSxcblxuICAgIC8v5omj6ZmkSFBcbiAgICByZWR1Y2VIcDogZnVuY3Rpb24gcmVkdWNlSHAobnVtKSB7XG4gICAgICAgIGlmIChudW0gPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaHAgLT0gbnVtO1xuICAgICAgICAvL+atu+S6huWwseadgOaOiei/meS4qumaj+S7jlxuICAgICAgICBpZiAodGhpcy5pc0RlYWQoKSkgdGhpcy5fcGxheWVyLmtpbGxNb25zdGVyKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllci5yZWZyZXNoTW9uc3RlckZpZWxkKCk7XG4gICAgfSxcblxuICAgIC8v5Zue5aSNSFBcbiAgICBhZGRIcDogZnVuY3Rpb24gYWRkSHAobnVtKSB7XG4gICAgICAgIGlmIChudW0gPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaHAgKz0gbnVtO1xuICAgICAgICBpZiAodGhpcy5ocCA+IHRoaXMubWF4SHApIHRoaXMuaHAgPSB0aGlzLm1heEhwO1xuXG4gICAgICAgIHRoaXMuX3BsYXllci5yZWZyZXNoTW9uc3RlckZpZWxkKCk7XG4gICAgfSxcblxuICAgIGlzRGVhZDogZnVuY3Rpb24gaXNEZWFkKCkge1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoY2FyZCwgcGxheWVyLCBpZHgpIHtcbiAgICAgICAgdGhpcy5jYXJkTmFtZSA9IGNhcmQuY2FyZE5hbWU7XG4gICAgICAgIHRoaXMuY3JpdGljYWwgPSBjYXJkLmNyaXRpY2FsO1xuICAgICAgICB0aGlzLmF0ayA9IGNhcmQuYXRrO1xuICAgICAgICB0aGlzLmhwID0gY2FyZC5ocDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IGNhcmQuaHA7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfSxcblxuICAgIC8v5pu05paw57yW5Y+3XG4gICAgcmVmcmVzaElkeDogZnVuY3Rpb24gcmVmcmVzaElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2M4YzBhNEJ1dEpNQXF1dzlkNXNNcWZpJywgJ3BsYXllcicpO1xuLy8gU2NyaXB0XFxwbGF5ZXIuanNcblxudmFyIENhcmQgPSByZXF1aXJlKCdjYXJkJyk7XG52YXIgTW9uc3RlciA9IHJlcXVpcmUoJ21vbnN0ZXInKTtcbnZhciBDYXJkRGF0YU1hbmFnZXIgPSByZXF1aXJlKCcuL2RhdGEvQ2FyZERhdGFNYW5hZ2VyJyk7XG5cbnZhciBQTEFZRVJfVVBEQVRFX0lTVFVSTkFDVElWRSA9IDE7XG52YXIgUExBWUVSX1VQREFURV9IUCA9IDEgPDwgMTtcbnZhciBQTEFZRVJfVVBEQVRFX0NSSVRJQ0FMID0gMSA8PCAyO1xudmFyIFBMQVlFUl9VUERBVEVfTUFYQ1JJVElDQUwgPSAxIDw8IDM7XG52YXIgUExBWUVSX1VQREFURV9JU1JFQURZID0gMSA8PCA0O1xudmFyIFBMQVlFUl9VUERBVEVfREVDS05VTSA9IDEgPDwgNTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBkdWVsOiBudWxsLCAvL+aImOaWl+euoeeQhlxuICAgICAgICBpZHg6IC0xLFxuICAgICAgICB0ZWFtQ29sb3I6IC0xLFxuICAgICAgICBpc1R1cm5BY3RpdmU6IGZhbHNlLCAvL+aYr+WQpuWPr+S7peihjOWKqFxuICAgICAgICBpc1JlYWR5OiBmYWxzZSwgLy/mmK/lkKblh4blpIfmuLjmiI9cblxuICAgICAgICBoZXJvTmFtZTogJycsIC8v546p5a625ZCN5a2XXG4gICAgICAgIGhwOiAzMCwgLy/oi7Hpm4TnlJ/lkb3lgLxcbiAgICAgICAgY3JpdGljYWw6IDAsIC8v6Iux6ZuE5b2T5YmN5rC05pm25pWwXG4gICAgICAgIG1heENyaXRpY2FsOiAwLCAvL+iLsembhOW9k+WJjeWbnuWQiOacgOWkp+awtOaZtuaVsFxuICAgICAgICBkZWNrTnVtOiAzMCwgLy/niYznu4TliankvZnljaHniYxcbiAgICAgICAgZGVja0FycmF5OiBbXSwgLy/ljaHnu4TmlbDnu4TvvIhDYXJk57G75Z6L77yJXG4gICAgICAgIGhhbmRBcnJheTogW10sIC8v5omL54mM5pWw57uE77yIQ2FyZOexu+Wei++8iVxuICAgICAgICBmaWVsZEFycmF5OiBbXSB9LFxuXG4gICAgLy/lnLrkuIrpmo/ku47mlbDnu4TvvIhNb25zdGVy57G75Z6L77yJXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChkdWVsKSB7XG4gICAgICAgIHRoaXMuZHVlbCA9IGR1ZWw7XG4gICAgfSxcblxuICAgIC8v5omT5YyF5pWw5o2u5a6M5pW0XG4gICAgcGFja0RhdGFBbGw6IGZ1bmN0aW9uIHBhY2tEYXRhQWxsKGRhdGEpIHtcbiAgICAgICAgZGF0YS5pZHggPSB0aGlzLmlkeDtcbiAgICAgICAgZGF0YS50ZW1Db2xvciA9IHRoaXMudGVhbUNvbG9yO1xuICAgICAgICBkYXRhLmlzVHVybkFjdGl2ZSA9IHRoaXMuaXNUdXJuQWN0aXZlO1xuICAgICAgICBkYXRhLmlzUmVhZHkgPSB0aGlzLmlzUmVhZHk7XG4gICAgICAgIGRhdGEuaGVyb05hbWUgPSB0aGlzLmhlcm9OYW1lO1xuICAgICAgICBkYXRhLmhwID0gdGhpcy5ocDtcbiAgICAgICAgZGF0YS5jcml0aWNhbCA9IHRoaXMuY3JpdGl0Y2FsO1xuICAgICAgICBkYXRhLm1heENyaXRpY2FsID0gdGhpcy5tYXhDcml0aWNhbDtcbiAgICAgICAgZGF0YS5kZWNrTnVtID0gdGhpcy5kZWNrTnVtO1xuICAgIH0sXG5cbiAgICAvL+ino+W8gOaVsOaNruWujOaVtFxuICAgIHVuUGFja0RhdGFBbGw6IGZ1bmN0aW9uIHVuUGFja0RhdGFBbGwoZGF0YSkge1xuICAgICAgICB0aGlzLmlkeCA9IGRhdGEuaWR4O1xuICAgICAgICB0aGlzLnRlYW1Db2xvciA9IGRhdGEudGVtQ29sb3I7XG4gICAgICAgIHRoaXMuaXNUdXJuQWN0aXZlID0gZGF0YS5pc1R1cm5BY3RpdmU7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGRhdGEuaXNSZWFkeTtcbiAgICAgICAgdGhpcy5oZXJvTmFtZSA9IGRhdGEuaGVyb05hbWU7XG4gICAgICAgIHRoaXMuaHAgPSBkYXRhLmhwO1xuICAgICAgICB0aGlzLmNyaXRpdGNhbCA9IGRhdGEuY3JpdGljYWw7XG4gICAgICAgIHRoaXMubWF4Q3JpdGljYWwgPSBkYXRhLm1heENyaXRpY2FsO1xuICAgICAgICB0aGlzLmRlY2tOdW0gPSBkYXRhLmRlY2tOdW07XG4gICAgfSxcblxuICAgIC8v5omT5YyF5pWw5o2uXG4gICAgcGFja0RhdGE6IGZ1bmN0aW9uIHBhY2tEYXRhKGRhdGEsIGZsYWcpIHtcbiAgICAgICAgZGF0YS5mbGFnID0gZmxhZztcbiAgICAgICAgZGF0YS5pZHggPSB0aGlzLmlkeDtcblxuICAgICAgICBpZiAoZmxhZyAmIFBMQVlFUl9VUERBVEVfSVNUVVJOQUNUSVZFKSBkYXRhLmlzVHVybkFjdGl2ZSA9IHRoaXMuX2lzVHVybkFjdGl2ZTtcbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0hQKSBkYXRhLmhwID0gdGhpcy5ocDtcbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0NSSVRJQ0FMKSBkYXRhLmNyaXRpY2FsID0gdGhpcy5jcml0aWNhbDtcbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX01BWENSSVRJQ0FMKSBkYXRhLm1heENyaXRpY2FsID0gdGhpcy5tYXhDcml0aWNhbDtcbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0lTUkVBRFkpIGRhdGEuaXNSZWFkeSA9IHRoaXMuaXNSZWFkeTtcbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0RFQ0tOVU0pIGRhdGEuZGVja051bSA9IHRoaXMuZGVja051bTtcbiAgICB9LFxuXG4gICAgLy/op6PlvIDmlbDmja5cbiAgICB1blBhY2tEYXRhOiBmdW5jdGlvbiB1blBhY2tEYXRhKGRhdGEpIHtcbiAgICAgICAgdmFyIGZsYWcgPSBkYXRhLmZsYWc7XG5cbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0lTVFVSTkFDVElWRSkgdGhpcy5faXNUdXJuQWN0aXZlID0gZGF0YS5pc1R1cm5BY3RpdmU7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9IUCkgdGhpcy5ocCA9IGRhdGEuaHA7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9DUklUSUNBTCkgdGhpcy5jcml0aWNhbCA9IGRhdGEuY3JpdGljYWw7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9JU1JFQURZKSB0aGlzLmlzUmVhZHkgPSBkYXRhLmlzUmVhZHk7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9ERUNLTlVNKSB0aGlzLmRlY2tOdW0gPSBkYXRhLmRlY2tOdW07XG4gICAgfSxcblxuICAgIGdldElzVHVybkFjdGl2ZTogZnVuY3Rpb24gZ2V0SXNUdXJuQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pc1R1cm5BY3RpdmU7XG4gICAgfSxcbiAgICBnZXRIZXJvTmFtZTogZnVuY3Rpb24gZ2V0SGVyb05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlcm9OYW1lO1xuICAgIH0sXG4gICAgZ2V0SHA6IGZ1bmN0aW9uIGdldEhwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ocDtcbiAgICB9LFxuICAgIGdldENyaXRpY2FsOiBmdW5jdGlvbiBnZXRDcml0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JpdGljYWw7XG4gICAgfSxcbiAgICBnZXRNYXhDcml0aWNhbDogZnVuY3Rpb24gZ2V0TWF4Q3JpdGljYWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1heENyaXRpY2FsO1xuICAgIH0sXG4gICAgZ2V0RGVja051bTogZnVuY3Rpb24gZ2V0RGVja051bSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVja051bTtcbiAgICB9LFxuXG4gICAgLy/liJvlu7rmiYvniYxcbiAgICBjcmVhdGVDYXJkVG9IYW5kOiBmdW5jdGlvbiBjcmVhdGVDYXJkVG9IYW5kKGRhdGEpIHtcbiAgICAgICAgdmFyIGNhcmQgPSBuZXcgQ2FyZCgpO1xuICAgICAgICBjYXJkLnVuUGFja0RhdGFBbGwoZGF0YSk7XG4gICAgICAgIHRoaXMuaGFuZEFycmF5LnB1c2goY2FyZCk7XG5cbiAgICAgICAgdmFyIHBsYXllclNwcml0ZSA9IHRoaXMuZHVlbC5nZXRQbGF5ZXJTcHJpdGVCeVBsYXllcih0aGlzLmlkeCk7XG4gICAgICAgIHBsYXllclNwcml0ZS5jcmVhdGVDYXJkc3ByaXRlKGNhcmQpO1xuICAgIH0sXG5cbiAgICAvL+WIoOmZpOaJi+eJjFxuICAgIGhhbmRDYXJkRGVsZXRlOiBmdW5jdGlvbiBoYW5kQ2FyZERlbGV0ZShpZHgpIHtcbiAgICAgICAgdGhpcy5oYW5kQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG5cbiAgICAgICAgdmFyIHBsYXllclNwcml0ZSA9IHRoaXMuZHVlbC5nZXRQbGF5ZXJTcHJpdGVCeVBsYXllcih0aGlzLmlkeCk7XG4gICAgICAgIHBsYXllclNwcml0ZS5kZWxldGVDYXJkU3ByaXRlKGlkeCk7XG4gICAgfSxcblxuICAgIC8v5Yi35paw5omL54mMXG4gICAgaGFuZENhcmRVcGRhdGU6IGZ1bmN0aW9uIGhhbmRDYXJkVXBkYXRlKGRhdGEpIHtcbiAgICAgICAgdmFyIGNhcmQgPSB0aGlzLmhhbmRBcnJheVtkYXRhLmlkeF07XG4gICAgICAgIGNhcmQudW5QYWNrRGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gdGhpcy5kdWVsLmdldFBsYXllclNwcml0ZUJ5UGxheWVyKHRoaXMuaWR4KTtcbiAgICAgICAgcGxheWVyU3ByaXRlLnJlZnJlc2hIYW5kQ2FyZCgpO1xuICAgIH0sXG5cbiAgICAvL+mHjee9rumaj+S7juaUu+WHu+asoeaVsFxuICAgIGF3YWtlbk1vbnN0ZXI6IGZ1bmN0aW9uIGF3YWtlbk1vbnN0ZXIoKSB7XG4gICAgICAgIHZhciBmaWVsZEFycmF5ID0gdGhpcy5maWVsZEFycmF5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZmllbGRBcnJheVtpXS5pc0F0a2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgLy/lj6zllKTpmo/ku47or7fmsYJcbiAgICBzdW1tZXJNb25zdGVyOiBmdW5jdGlvbiBzdW1tZXJNb25zdGVyKGNhcmRJZHgpIHtcbiAgICAgICAgdGhpcy5kdWVsLnN1bW1lck1vbnN0ZXIoY2FyZElkeCk7XG4gICAgfSxcblxuICAgIC8v5Yib5bu66ZqP5LuOXG4gICAgY3JlYXRlTW9uc3RlcjogZnVuY3Rpb24gY3JlYXRlTW9uc3RlcihkYXRhKSB7XG4gICAgICAgIHZhciBtb25zdGVyID0gbmV3IE1vbnN0ZXIoKTtcbiAgICAgICAgbW9uc3Rlci51blBhY2tEYXRhQWxsKGRhdGEpO1xuICAgICAgICB0aGlzLmZpZWxkQXJyYXkucHVzaChtb25zdGVyKTtcblxuICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gdGhpcy5kdWVsLmdldFBsYXllclNwcml0ZUJ5UGxheWVyKHRoaXMuaWR4KTtcbiAgICAgICAgcGxheWVyU3ByaXRlLmNyZWF0ZU1vbnN0ZXJzcHJpdGUobW9uc3Rlcik7XG4gICAgfSxcblxuICAgIC8v5Yig6Zmk6ZqP5LuOXG4gICAgbW9uc3RlckRlbGV0ZTogZnVuY3Rpb24gbW9uc3RlckRlbGV0ZShpZHgpIHtcbiAgICAgICAgdGhpcy5maWVsZEFycmF5LnNwbGljZShpZHgsIDEpO1xuXG4gICAgICAgIHZhciBwbGF5ZXJTcHJpdGUgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyU3ByaXRlQnlQbGF5ZXIodGhpcy5pZHgpO1xuICAgICAgICBwbGF5ZXJTcHJpdGUuZGVsZXRlTW9uc3RlclNwcml0ZShpZHgpO1xuICAgIH0sXG5cbiAgICAvL+WIt+aWsOmaj+S7jlxuICAgIGhhbmRDYXJkVXBkYXRlOiBmdW5jdGlvbiBoYW5kQ2FyZFVwZGF0ZShkYXRhKSB7XG4gICAgICAgIHZhciBtb25zdGVyID0gdGhpcy5maWVsZEFycmF5W2RhdGEuaWR4XTtcbiAgICAgICAgbW9uc3Rlci51blBhY2tEYXRhKGRhdGEpO1xuXG4gICAgICAgIHZhciBwbGF5ZXJTcHJpdGUgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyU3ByaXRlQnlQbGF5ZXIodGhpcy5pZHgpO1xuICAgICAgICBwbGF5ZXJTcHJpdGUucmVmcmVzaE1vbnN0ZXJGaWVsZCgpO1xuICAgIH0sXG5cbiAgICAvL+W5suaOiemaj+S7jlxuICAgIGtpbGxNb25zdGVyOiBmdW5jdGlvbiBraWxsTW9uc3Rlcihtb25zdGVyKSB7XG4gICAgICAgIGNjLmxvZygnbW9uc3RlclNwcml0ZUFycmF5OiVzJywgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY2MubG9nKCdmaWVsZEFycmF5OiVzJywgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY2MubG9nKCdfaWR4OiVzJywgbW9uc3Rlci5faWR4KTtcbiAgICAgICAgdmFyIGlkeCA9IG1vbnN0ZXIuX2lkeDtcbiAgICAgICAgdmFyIG1vbnN0ZXJTcHJpdGUgPSB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheVtpZHhdO1xuXG4gICAgICAgIHRoaXMubW9uc3RlclBvb2wucHV0KG1vbnN0ZXJTcHJpdGUpO1xuICAgICAgICB0aGlzLmZpZWxkQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEFycmF5SWR4KHRoaXMuZmllbGRBcnJheSk7XG4gICAgICAgIHRoaXMubW9uc3RlclNwcml0ZUFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgICBjYy5sb2coJ21vbnN0ZXJTcHJpdGVBcnJheTolcycsIHRoaXMubW9uc3RlclNwcml0ZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGNjLmxvZygnZmllbGRBcnJheTolcycsIHRoaXMuZmllbGRBcnJheS5sZW5ndGgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgLy/mlbDnu4Tlj5jliqjlkI7pnIDopoHliLfmlrBpZHhcbiAgICByZWZyZXNoQXJyYXlJZHg6IGZ1bmN0aW9uIHJlZnJlc2hBcnJheUlkeChhcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBhcnJheVtpXS5yZWZyZXNoSWR4KGkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v6I635Y+W5omL54mMXG4gICAgZ2V0SGFuZENhcmQ6IGZ1bmN0aW9uIGdldEhhbmRDYXJkKGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYW5kQXJyYXlbaWR4XTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNTcxNzJNeFRkeElLcHZnVHZ5OEtlVVcnLCAnc29ja2V0LmlvJyk7XG4vLyBTY3JpcHRcXE5ldFdvcmtcXHNvY2tldC5pby5qc1xuXG5pZiAoIWNjLnN5cy5pc05hdGl2ZSkge1xuICAoZnVuY3Rpb24gKGYpIHtcbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmKCk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgZGVmaW5lKFtdLCBmKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGc7aWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgZyA9IHdpbmRvdztcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBnID0gZ2xvYmFsO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBnID0gc2VsZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGcgPSB0aGlzO1xuICAgICAgfWcuaW8gPSBmKCk7XG4gICAgfVxuICB9KShmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlZmluZSwgbW9kdWxlLCBleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LCBuLCByKSB7XG4gICAgICBmdW5jdGlvbiBzKG8sIHUpIHtcbiAgICAgICAgaWYgKCFuW29dKSB7XG4gICAgICAgICAgaWYgKCF0W29dKSB7XG4gICAgICAgICAgICB2YXIgYSA9IHR5cGVvZiByZXF1aXJlID09IFwiZnVuY3Rpb25cIiAmJiByZXF1aXJlO2lmICghdSAmJiBhKSByZXR1cm4gYShvLCAhMCk7aWYgKGkpIHJldHVybiBpKG8sICEwKTt2YXIgZiA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBvICsgXCInXCIpO3Rocm93IChmLmNvZGUgPSBcIk1PRFVMRV9OT1RfRk9VTkRcIiwgZik7XG4gICAgICAgICAgfXZhciBsID0gbltvXSA9IHsgZXhwb3J0czoge30gfTt0W29dWzBdLmNhbGwobC5leHBvcnRzLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdmFyIG4gPSB0W29dWzFdW2VdO3JldHVybiBzKG4gPyBuIDogZSk7XG4gICAgICAgICAgfSwgbCwgbC5leHBvcnRzLCBlLCB0LCBuLCByKTtcbiAgICAgICAgfXJldHVybiBuW29dLmV4cG9ydHM7XG4gICAgICB9dmFyIGkgPSB0eXBlb2YgcmVxdWlyZSA9PSBcImZ1bmN0aW9uXCIgJiYgcmVxdWlyZTtmb3IgKHZhciBvID0gMDsgbyA8IHIubGVuZ3RoOyBvKyspIHMocltvXSk7cmV0dXJuIHM7XG4gICAgfSkoeyAxOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHVybCA9IF9kZXJlcV8oJy4vdXJsJyk7XG4gICAgICAgIHZhciBwYXJzZXIgPSBfZGVyZXFfKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG4gICAgICAgIHZhciBNYW5hZ2VyID0gX2RlcmVxXygnLi9tYW5hZ2VyJyk7XG4gICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQnKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBsb29rdXA7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWFuYWdlcnMgY2FjaGUuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGNhY2hlID0gZXhwb3J0cy5tYW5hZ2VycyA9IHt9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExvb2tzIHVwIGFuIGV4aXN0aW5nIGBNYW5hZ2VyYCBmb3IgbXVsdGlwbGV4aW5nLlxyXG4gICAgICAgICAqIElmIHRoZSB1c2VyIHN1bW1vbnM6XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgIGBpbygnaHR0cDovL2xvY2FsaG9zdC9hJyk7YFxyXG4gICAgICAgICAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2InKTtgXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBXZSByZXVzZSB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgYmFzZWQgb24gc2FtZSBzY2hlbWUvcG9ydC9ob3N0LFxyXG4gICAgICAgICAqIGFuZCB3ZSBpbml0aWFsaXplIHNvY2tldHMgZm9yIGVhY2ggbmFtZXNwYWNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBsb29rdXAodXJpLCBvcHRzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgICB2YXIgcGFyc2VkID0gdXJsKHVyaSk7XG4gICAgICAgICAgdmFyIHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gICAgICAgICAgdmFyIGlkID0gcGFyc2VkLmlkO1xuICAgICAgICAgIHZhciBwYXRoID0gcGFyc2VkLnBhdGg7XG4gICAgICAgICAgdmFyIHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF0ubnNwcztcbiAgICAgICAgICB2YXIgbmV3Q29ubmVjdGlvbiA9IG9wdHMuZm9yY2VOZXcgfHwgb3B0c1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSB8fCBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHwgc2FtZU5hbWVzcGFjZTtcblxuICAgICAgICAgIHZhciBpbztcblxuICAgICAgICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgICAgICBkZWJ1ZygnaWdub3Jpbmcgc29ja2V0IGNhY2hlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgICAgICAgICBpbyA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgICAgICAgICAgZGVidWcoJ25ldyBpbyBpbnN0YW5jZSBmb3IgJXMnLCBzb3VyY2UpO1xuICAgICAgICAgICAgICBjYWNoZVtpZF0gPSBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbyA9IGNhY2hlW2lkXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3RvY29sIHZlcnNpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogYGNvbm5lY3RgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHVyaVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5jb25uZWN0ID0gbG9va3VwO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuTWFuYWdlciA9IF9kZXJlcV8oJy4vbWFuYWdlcicpO1xuICAgICAgICBleHBvcnRzLlNvY2tldCA9IF9kZXJlcV8oJy4vc29ja2V0Jyk7XG4gICAgICB9LCB7IFwiLi9tYW5hZ2VyXCI6IDIsIFwiLi9zb2NrZXRcIjogNCwgXCIuL3VybFwiOiA1LCBcImRlYnVnXCI6IDE0LCBcInNvY2tldC5pby1wYXJzZXJcIjogNDAgfV0sIDI6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgZWlvID0gX2RlcmVxXygnZW5naW5lLmlvLWNsaWVudCcpO1xuICAgICAgICB2YXIgU29ja2V0ID0gX2RlcmVxXygnLi9zb2NrZXQnKTtcbiAgICAgICAgdmFyIEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO1xuICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO1xuICAgICAgICB2YXIgb24gPSBfZGVyZXFfKCcuL29uJyk7XG4gICAgICAgIHZhciBiaW5kID0gX2RlcmVxXygnY29tcG9uZW50LWJpbmQnKTtcbiAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDptYW5hZ2VyJyk7XG4gICAgICAgIHZhciBpbmRleE9mID0gX2RlcmVxXygnaW5kZXhvZicpO1xuICAgICAgICB2YXIgQmFja29mZiA9IF9kZXJlcV8oJ2JhY2tvMicpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElFNisgaGFzT3duUHJvcGVydHlcclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0c1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gTWFuYWdlcjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBgTWFuYWdlcmAgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZW5naW5lIGluc3RhbmNlIG9yIGVuZ2luZSB1cmkvb3B0c1xyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBNYW5hZ2VyKHVyaSwgb3B0cykge1xuICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNYW5hZ2VyKSkgcmV0dXJuIG5ldyBNYW5hZ2VyKHVyaSwgb3B0cyk7XG4gICAgICAgICAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICAgIG9wdHMucGF0aCA9IG9wdHMucGF0aCB8fCAnL3NvY2tldC5pbyc7XG4gICAgICAgICAgdGhpcy5uc3BzID0ge307XG4gICAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3Iob3B0cy5yYW5kb21pemF0aW9uRmFjdG9yIHx8IDAuNSk7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe1xuICAgICAgICAgICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgICAgICAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICAgICAgICAgIGppdHRlcjogdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKClcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgICAgdGhpcy5jb25uZWN0aW5nID0gW107XG4gICAgICAgICAgdGhpcy5sYXN0UGluZyA9IG51bGw7XG4gICAgICAgICAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gICAgICAgICAgdGhpcy5lbmNvZGVyID0gbmV3IHBhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgICAgdGhpcy5kZWNvZGVyID0gbmV3IHBhcnNlci5EZWNvZGVyKCk7XG4gICAgICAgICAgdGhpcy5hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICAgICAgICAgIGlmICh0aGlzLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3BhZ2F0ZSBnaXZlbiBldmVudCB0byBzb2NrZXRzIGFuZCBlbWl0IG9uIGB0aGlzYFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUuZW1pdEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICBmb3IgKHZhciBuc3AgaW4gdGhpcy5uc3BzKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGhpcy5uc3BzLCBuc3ApKSB7XG4gICAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdLmVtaXQuYXBwbHkodGhpcy5uc3BzW25zcF0sIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFVwZGF0ZSBgc29ja2V0LmlkYCBvZiBhbGwgc29ja2V0c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUudXBkYXRlU29ja2V0SWRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0aGlzLm5zcHMsIG5zcCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0uaWQgPSB0aGlzLmVuZ2luZS5pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyKE1hbmFnZXIucHJvdG90eXBlKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBgcmVjb25uZWN0aW9uYCBjb25maWcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IHRydWUvZmFsc2UgaWYgaXQgc2hvdWxkIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0XHJcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIHJlY29ubmVjdGlvbiBhdHRlbXB0cyBjb25maWcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyBiZWZvcmUgZ2l2aW5nIHVwXHJcbiAgICAgICAgICogQHJldHVybiB7TWFuYWdlcn0gc2VsZiBvciB2YWx1ZVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSBmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzID0gdjtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheSA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICAgICAgICAgIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWluKHYpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnJhbmRvbWl6YXRpb25GYWN0b3IgPSBmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gICAgICAgICAgdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvciA9IHY7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRKaXR0ZXIodik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgbWF4aW11bSBkZWxheSBiZXR3ZWVuIHJlY29ubmVjdGlvbnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZGVsYXlcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25EZWxheU1heCA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICAgICAgICAgIHRoaXMuYmFja29mZiAmJiB0aGlzLmJhY2tvZmYuc2V0TWF4KHYpO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIGNvbm5lY3Rpb24gdGltZW91dC4gYGZhbHNlYCB0byBkaXNhYmxlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICAgIHRoaXMuX3RpbWVvdXQgPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxyXG4gICAgICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUubWF5YmVSZWNvbm5lY3RPbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICAgIGlmICghdGhpcy5yZWNvbm5lY3RpbmcgJiYgdGhpcy5fcmVjb25uZWN0aW9uICYmIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgICAgICAgICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25hbCwgY2FsbGJhY2tcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vcGVuID0gTWFuYWdlci5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICAgIGRlYnVnKCdyZWFkeVN0YXRlICVzJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICAgICAgICBpZiAofnRoaXMucmVhZHlTdGF0ZS5pbmRleE9mKCdvcGVuJykpIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgZGVidWcoJ29wZW5pbmcgJXMnLCB0aGlzLnVyaSk7XG4gICAgICAgICAgdGhpcy5lbmdpbmUgPSBlaW8odGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgICAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gICAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gZmFsc2U7XG5cbiAgICAgICAgICAvLyBlbWl0IGBvcGVuYFxuICAgICAgICAgIHZhciBvcGVuU3ViID0gb24oc29ja2V0LCAnb3BlbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25vcGVuKCk7XG4gICAgICAgICAgICBmbiAmJiBmbigpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gZW1pdCBgY29ubmVjdF9lcnJvcmBcbiAgICAgICAgICB2YXIgZXJyb3JTdWIgPSBvbihzb2NrZXQsICdlcnJvcicsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBkZWJ1ZygnY29ubmVjdF9lcnJvcicpO1xuICAgICAgICAgICAgc2VsZi5jbGVhbnVwKCk7XG4gICAgICAgICAgICBzZWxmLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICAgICAgICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF9lcnJvcicsIGRhdGEpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0Nvbm5lY3Rpb24gZXJyb3InKTtcbiAgICAgICAgICAgICAgZXJyLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gZW1pdCBgY29ubmVjdF90aW1lb3V0YFxuICAgICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5fdGltZW91dCkge1xuICAgICAgICAgICAgdmFyIHRpbWVvdXQgPSB0aGlzLl90aW1lb3V0O1xuICAgICAgICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgLy8gc2V0IHRpbWVyXG4gICAgICAgICAgICB2YXIgdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ2Nvbm5lY3QgYXR0ZW1wdCB0aW1lZCBvdXQgYWZ0ZXIgJWQnLCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgb3BlblN1Yi5kZXN0cm95KCk7XG4gICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnZXJyb3InLCAndGltZW91dCcpO1xuICAgICAgICAgICAgICBzZWxmLmVtaXRBbGwoJ2Nvbm5lY3RfdGltZW91dCcsIHRpbWVvdXQpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG5cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKHtcbiAgICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvcGVuU3ViKTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWJ1Zygnb3BlbicpO1xuXG4gICAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcblxuICAgICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgICAgICAgICB0aGlzLmVtaXQoJ29wZW4nKTtcblxuICAgICAgICAgIC8vIGFkZCBuZXcgc3Vic1xuICAgICAgICAgIHZhciBzb2NrZXQgPSB0aGlzLmVuZ2luZTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdkYXRhJywgYmluZCh0aGlzLCAnb25kYXRhJykpKTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwaW5nJywgYmluZCh0aGlzLCAnb25waW5nJykpKTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdwb25nJywgYmluZCh0aGlzLCAnb25wb25nJykpKTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsICdlcnJvcicsIGJpbmQodGhpcywgJ29uZXJyb3InKSkpO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKSk7XG4gICAgICAgICAgdGhpcy5zdWJzLnB1c2gob24odGhpcy5kZWNvZGVyLCAnZGVjb2RlZCcsIGJpbmQodGhpcywgJ29uZGVjb2RlZCcpKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25waW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMubGFzdFBpbmcgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHRoaXMuZW1pdEFsbCgncGluZycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGEgcGFja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25wb25nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuZW1pdEFsbCgncG9uZycsIG5ldyBEYXRlKCkgLSB0aGlzLmxhc3RQaW5nKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25kYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB0aGlzLmRlY29kZXIuYWRkKGRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aGVuIHBhcnNlciBmdWxseSBkZWNvZGVzIGEgcGFja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25kZWNvZGVkID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBzb2NrZXQgZXJyb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgIGRlYnVnKCdlcnJvcicsIGVycik7XG4gICAgICAgICAgdGhpcy5lbWl0QWxsKCdlcnJvcicsIGVycik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlcyBhIG5ldyBzb2NrZXQgZm9yIHRoZSBnaXZlbiBgbnNwYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge1NvY2tldH1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnNvY2tldCA9IGZ1bmN0aW9uIChuc3ApIHtcbiAgICAgICAgICB2YXIgc29ja2V0ID0gdGhpcy5uc3BzW25zcF07XG4gICAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0aW5nJywgb25Db25uZWN0aW5nKTtcbiAgICAgICAgICAgIHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc29ja2V0LmlkID0gc2VsZi5lbmdpbmUuaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHtcbiAgICAgICAgICAgICAgLy8gbWFudWFsbHkgY2FsbCBoZXJlIHNpbmNlIGNvbm5lY3RpbmcgZXZuZXQgaXMgZmlyZWQgYmVmb3JlIGxpc3RlbmluZ1xuICAgICAgICAgICAgICBvbkNvbm5lY3RpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBvbkNvbm5lY3RpbmcoKSB7XG4gICAgICAgICAgICBpZiAoISB+aW5kZXhPZihzZWxmLmNvbm5lY3RpbmcsIHNvY2tldCkpIHtcbiAgICAgICAgICAgICAgc2VsZi5jb25uZWN0aW5nLnB1c2goc29ja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc29ja2V0O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldFxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gICAgICAgICAgdmFyIGluZGV4ID0gaW5kZXhPZih0aGlzLmNvbm5lY3RpbmcsIHNvY2tldCk7XG4gICAgICAgICAgaWYgKH5pbmRleCkgdGhpcy5jb25uZWN0aW5nLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGluZy5sZW5ndGgpIHJldHVybjtcblxuICAgICAgICAgIHRoaXMuY2xvc2UoKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBXcml0ZXMgYSBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIGRlYnVnKCd3cml0aW5nIHBhY2tldCAlaicsIHBhY2tldCk7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgaWYgKCFzZWxmLmVuY29kaW5nKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGUsIHRoZW4gd3JpdGUgdG8gZW5naW5lIHdpdGggcmVzdWx0XG4gICAgICAgICAgICBzZWxmLmVuY29kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZW5jb2Rlci5lbmNvZGUocGFja2V0LCBmdW5jdGlvbiAoZW5jb2RlZFBhY2tldHMpIHtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNlbGYuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc2VsZi5lbmNvZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICBzZWxmLnByb2Nlc3NQYWNrZXRRdWV1ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFkZCBwYWNrZXQgdG8gdGhlIHF1ZXVlXG4gICAgICAgICAgICBzZWxmLnBhY2tldEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIElmIHBhY2tldCBidWZmZXIgaXMgbm9uLWVtcHR5LCBiZWdpbnMgZW5jb2RpbmcgdGhlXHJcbiAgICAgICAgICogbmV4dCBwYWNrZXQgaW4gbGluZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnByb2Nlc3NQYWNrZXRRdWV1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodGhpcy5wYWNrZXRCdWZmZXIubGVuZ3RoID4gMCAmJiAhdGhpcy5lbmNvZGluZykge1xuICAgICAgICAgICAgdmFyIHBhY2sgPSB0aGlzLnBhY2tldEJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFjayk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWJ1ZygnY2xlYW51cCcpO1xuXG4gICAgICAgICAgdmFyIHN1YjtcbiAgICAgICAgICB3aGlsZSAoc3ViID0gdGhpcy5zdWJzLnNoaWZ0KCkpIHN1Yi5kZXN0cm95KCk7XG5cbiAgICAgICAgICB0aGlzLnBhY2tldEJ1ZmZlciA9IFtdO1xuICAgICAgICAgIHRoaXMuZW5jb2RpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcblxuICAgICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xvc2UgdGhlIGN1cnJlbnQgc29ja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUuY2xvc2UgPSBNYW5hZ2VyLnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlYnVnKCdkaXNjb25uZWN0Jyk7XG4gICAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBgb25jbG9zZWAgd2lsbCBub3QgZmlyZSBiZWNhdXNlXG4gICAgICAgICAgICAvLyBhbiBvcGVuIGV2ZW50IG5ldmVyIGhhcHBlbmVkXG4gICAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgICAgICAgaWYgKHRoaXMuZW5naW5lKSB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBjbG9zZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgZGVidWcoJ29uY2xvc2UnKTtcblxuICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24pO1xuXG4gICAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBdHRlbXB0IGEgcmVjb25uZWN0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnJlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBmYWlsZWQnKTtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0QWxsKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGVsYXkgPSB0aGlzLmJhY2tvZmYuZHVyYXRpb24oKTtcbiAgICAgICAgICAgIGRlYnVnKCd3aWxsIHdhaXQgJWRtcyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHQnLCBkZWxheSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgZGVidWcoJ2F0dGVtcHRpbmcgcmVjb25uZWN0Jyk7XG4gICAgICAgICAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2F0dGVtcHQnLCBzZWxmLmJhY2tvZmYuYXR0ZW1wdHMpO1xuICAgICAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdGluZycsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG5cbiAgICAgICAgICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgICAgICAgICBzZWxmLm9wZW4oZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnKCdyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHNlbGYucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICBzZWxmLmVtaXRBbGwoJ3JlY29ubmVjdF9lcnJvcicsIGVyci5kYXRhKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBzdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcblxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goe1xuICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLm9ucmVjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgdGhpcy51cGRhdGVTb2NrZXRJZHMoKTtcbiAgICAgICAgICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdCcsIGF0dGVtcHQpO1xuICAgICAgICB9O1xuICAgICAgfSwgeyBcIi4vb25cIjogMywgXCIuL3NvY2tldFwiOiA0LCBcImJhY2tvMlwiOiA4LCBcImNvbXBvbmVudC1iaW5kXCI6IDExLCBcImNvbXBvbmVudC1lbWl0dGVyXCI6IDEyLCBcImRlYnVnXCI6IDE0LCBcImVuZ2luZS5pby1jbGllbnRcIjogMTYsIFwiaW5kZXhvZlwiOiAzMiwgXCJzb2NrZXQuaW8tcGFyc2VyXCI6IDQwIH1dLCAzOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gb247XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVyIGZvciBzdWJzY3JpcHRpb25zLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R8RXZlbnRFbWl0dGVyfSBvYmogd2l0aCBgRW1pdHRlcmAgbWl4aW4gb3IgYEV2ZW50RW1pdHRlcmBcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBvbihvYmosIGV2LCBmbikge1xuICAgICAgICAgIG9iai5vbihldiwgZm4pO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICBvYmoucmVtb3ZlTGlzdGVuZXIoZXYsIGZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LCB7fV0sIDQ6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnc29ja2V0LmlvLXBhcnNlcicpO1xuICAgICAgICB2YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG4gICAgICAgIHZhciB0b0FycmF5ID0gX2RlcmVxXygndG8tYXJyYXknKTtcbiAgICAgICAgdmFyIG9uID0gX2RlcmVxXygnLi9vbicpO1xuICAgICAgICB2YXIgYmluZCA9IF9kZXJlcV8oJ2NvbXBvbmVudC1iaW5kJyk7XG4gICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6c29ja2V0Jyk7XG4gICAgICAgIHZhciBoYXNCaW4gPSBfZGVyZXFfKCdoYXMtYmluYXJ5Jyk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gU29ja2V0O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEludGVybmFsIGV2ZW50cyAoYmxhY2tsaXN0ZWQpLlxyXG4gICAgICAgICAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGV2ZW50cyA9IHtcbiAgICAgICAgICBjb25uZWN0OiAxLFxuICAgICAgICAgIGNvbm5lY3RfZXJyb3I6IDEsXG4gICAgICAgICAgY29ubmVjdF90aW1lb3V0OiAxLFxuICAgICAgICAgIGNvbm5lY3Rpbmc6IDEsXG4gICAgICAgICAgZGlzY29ubmVjdDogMSxcbiAgICAgICAgICBlcnJvcjogMSxcbiAgICAgICAgICByZWNvbm5lY3Q6IDEsXG4gICAgICAgICAgcmVjb25uZWN0X2F0dGVtcHQ6IDEsXG4gICAgICAgICAgcmVjb25uZWN0X2ZhaWxlZDogMSxcbiAgICAgICAgICByZWNvbm5lY3RfZXJyb3I6IDEsXG4gICAgICAgICAgcmVjb25uZWN0aW5nOiAxLFxuICAgICAgICAgIHBpbmc6IDEsXG4gICAgICAgICAgcG9uZzogMVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3J0Y3V0IHRvIGBFbWl0dGVyI2VtaXRgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBlbWl0ID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBgU29ja2V0YCBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gU29ja2V0KGlvLCBuc3ApIHtcbiAgICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgICAgdGhpcy5uc3AgPSBuc3A7XG4gICAgICAgICAgdGhpcy5qc29uID0gdGhpczsgLy8gY29tcGF0XG4gICAgICAgICAgdGhpcy5pZHMgPSAwO1xuICAgICAgICAgIHRoaXMuYWNrcyA9IHt9O1xuICAgICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGlmICh0aGlzLmlvLmF1dG9Db25uZWN0KSB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuc3ViRXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnN1YnMpIHJldHVybjtcblxuICAgICAgICAgIHZhciBpbyA9IHRoaXMuaW87XG4gICAgICAgICAgdGhpcy5zdWJzID0gW29uKGlvLCAnb3BlbicsIGJpbmQodGhpcywgJ29ub3BlbicpKSwgb24oaW8sICdwYWNrZXQnLCBiaW5kKHRoaXMsICdvbnBhY2tldCcpKSwgb24oaW8sICdjbG9zZScsIGJpbmQodGhpcywgJ29uY2xvc2UnKSldO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFwiT3BlbnNcIiB0aGUgc29ja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9wZW4gPSBTb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSByZXR1cm4gdGhpcztcblxuICAgICAgICAgIHRoaXMuc3ViRXZlbnRzKCk7XG4gICAgICAgICAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gICAgICAgICAgaWYgKCdvcGVuJyA9PSB0aGlzLmlvLnJlYWR5U3RhdGUpIHRoaXMub25vcGVuKCk7XG4gICAgICAgICAgdGhpcy5lbWl0KCdjb25uZWN0aW5nJyk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgICBhcmdzLnVuc2hpZnQoJ21lc3NhZ2UnKTtcbiAgICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3ZlcnJpZGUgYGVtaXRgLlxyXG4gICAgICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IG5hbWVcclxuICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgYXJncyA9IHRvQXJyYXkoYXJndW1lbnRzKTtcbiAgICAgICAgICB2YXIgcGFyc2VyVHlwZSA9IHBhcnNlci5FVkVOVDsgLy8gZGVmYXVsdFxuICAgICAgICAgIGlmIChoYXNCaW4oYXJncykpIHtcbiAgICAgICAgICAgIHBhcnNlclR5cGUgPSBwYXJzZXIuQklOQVJZX0VWRU5UO1xuICAgICAgICAgIH0gLy8gYmluYXJ5XG4gICAgICAgICAgdmFyIHBhY2tldCA9IHsgdHlwZTogcGFyc2VyVHlwZSwgZGF0YTogYXJncyB9O1xuXG4gICAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9ICF0aGlzLmZsYWdzIHx8IGZhbHNlICE9PSB0aGlzLmZsYWdzLmNvbXByZXNzO1xuXG4gICAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgZGVidWcoJ2VtaXR0aW5nIHBhY2tldCB3aXRoIGFjayBpZCAlZCcsIHRoaXMuaWRzKTtcbiAgICAgICAgICAgIHRoaXMuYWNrc1t0aGlzLmlkc10gPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHBhY2tldCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZGVsZXRlIHRoaXMuZmxhZ3M7XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZW5kcyBhIHBhY2tldC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gICAgICAgICAgdGhpcy5pby5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVidWcoJ3RyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZycpO1xuXG4gICAgICAgICAgLy8gd3JpdGUgY29ubmVjdCBwYWNrZXQgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgaWYgKCcvJyAhPSB0aGlzLm5zcCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBwYXJzZXIuQ09OTkVDVCB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBjbG9zZWAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbmNsb3NlID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgICAgICAgIGRlYnVnKCdjbG9zZSAoJXMpJywgcmVhc29uKTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZGlzY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICBpZiAocGFja2V0Lm5zcCAhPSB0aGlzLm5zcCkgcmV0dXJuO1xuXG4gICAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBwYXJzZXIuQ09OTkVDVDpcbiAgICAgICAgICAgICAgdGhpcy5vbmNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkVWRU5UOlxuICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHBhcnNlci5BQ0s6XG4gICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIHBhcnNlci5FUlJPUjpcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUub25ldmVudCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICAgIGRlYnVnKCdlbWl0dGluZyBldmVudCAlaicsIGFyZ3MpO1xuXG4gICAgICAgICAgaWYgKG51bGwgIT0gcGFja2V0LmlkKSB7XG4gICAgICAgICAgICBkZWJ1ZygnYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudCcpO1xuICAgICAgICAgICAgYXJncy5wdXNoKHRoaXMuYWNrKHBhY2tldC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLmFjayA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB2YXIgc2VudCA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICAgICAgICAgIGlmIChzZW50KSByZXR1cm47XG4gICAgICAgICAgICBzZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgICAgZGVidWcoJ3NlbmRpbmcgYWNrICVqJywgYXJncyk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gaGFzQmluKGFyZ3MpID8gcGFyc2VyLkJJTkFSWV9BQ0sgOiBwYXJzZXIuQUNLO1xuICAgICAgICAgICAgc2VsZi5wYWNrZXQoe1xuICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgICAgIGRhdGE6IGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbmFjayA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICB2YXIgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGFjaykge1xuICAgICAgICAgICAgZGVidWcoJ2NhbGxpbmcgYWNrICVzIHdpdGggJWonLCBwYWNrZXQuaWQsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlYnVnKCdiYWQgYWNrICVzJywgcGFja2V0LmlkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgICAgICAgICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLmVtaXRCdWZmZXJlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5yZWNlaXZlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBlbWl0LmFwcGx5KHRoaXMsIHRoaXMucmVjZWl2ZUJ1ZmZlcltpXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuXG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQodGhpcy5zZW5kQnVmZmVyW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWJ1Zygnc2VydmVyIGRpc2Nvbm5lY3QgKCVzKScsIHRoaXMubnNwKTtcbiAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICB0aGlzLm9uY2xvc2UoJ2lvIHNlcnZlciBkaXNjb25uZWN0Jyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcclxuICAgICAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxyXG4gICAgICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zdWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHRoaXMuc3Vic1tpXS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuaW8uZGVzdHJveSh0aGlzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLmNsb3NlID0gU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgZGVidWcoJ3BlcmZvcm1pbmcgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiBwYXJzZXIuRElTQ09OTkVDVCB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW1vdmUgc29ja2V0IGZyb20gcG9vbFxuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAvLyBmaXJlIGV2ZW50c1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKCdpbyBjbGllbnQgZGlzY29ubmVjdCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtCb29sZWFufSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxyXG4gICAgICAgICAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5jb21wcmVzcyA9IGZ1bmN0aW9uIChjb21wcmVzcykge1xuICAgICAgICAgIHRoaXMuZmxhZ3MgPSB0aGlzLmZsYWdzIHx8IHt9O1xuICAgICAgICAgIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgIH0sIHsgXCIuL29uXCI6IDMsIFwiY29tcG9uZW50LWJpbmRcIjogMTEsIFwiY29tcG9uZW50LWVtaXR0ZXJcIjogMTIsIFwiZGVidWdcIjogMTQsIFwiaGFzLWJpbmFyeVwiOiAzMCwgXCJzb2NrZXQuaW8tcGFyc2VyXCI6IDQwLCBcInRvLWFycmF5XCI6IDQzIH1dLCA1OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgcGFyc2V1cmkgPSBfZGVyZXFfKCdwYXJzZXVyaScpO1xuICAgICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ3NvY2tldC5pby1jbGllbnQ6dXJsJyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHVybDtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogVVJMIHBhcnNlci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cclxuICAgICAgICAgICAqICAgICAgICAgICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiB1cmwodXJpLCBsb2MpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSB1cmk7XG5cbiAgICAgICAgICAgIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gICAgICAgICAgICB2YXIgbG9jID0gbG9jIHx8IGdsb2JhbC5sb2NhdGlvbjtcbiAgICAgICAgICAgIGlmIChudWxsID09IHVyaSkgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIGxvYy5ob3N0O1xuXG4gICAgICAgICAgICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgICAgICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICAgIGlmICgnLycgPT0gdXJpLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgICAgIGlmICgnLycgPT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgdXJpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdwcm90b2NvbC1sZXNzIHVybCAlcycsIHVyaSk7XG4gICAgICAgICAgICAgICAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArICcvLycgKyB1cmk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHVyaSA9ICdodHRwczovLycgKyB1cmk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gcGFyc2VcbiAgICAgICAgICAgICAgZGVidWcoJ3BhcnNlICVzJywgdXJpKTtcbiAgICAgICAgICAgICAgb2JqID0gcGFyc2V1cmkodXJpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHdlIHRyZWF0IGBsb2NhbGhvc3Q6ODBgIGFuZCBgbG9jYWxob3N0YCBlcXVhbGx5XG4gICAgICAgICAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgICAgIG9iai5wb3J0ID0gJzgwJztcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgvXihodHRwfHdzKXMkLy50ZXN0KG9iai5wcm90b2NvbCkpIHtcbiAgICAgICAgICAgICAgICBvYmoucG9ydCA9ICc0NDMnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9iai5wYXRoID0gb2JqLnBhdGggfHwgJy8nO1xuXG4gICAgICAgICAgICB2YXIgaXB2NiA9IG9iai5ob3N0LmluZGV4T2YoJzonKSAhPT0gLTE7XG4gICAgICAgICAgICB2YXIgaG9zdCA9IGlwdjYgPyAnWycgKyBvYmouaG9zdCArICddJyA6IG9iai5ob3N0O1xuXG4gICAgICAgICAgICAvLyBkZWZpbmUgdW5pcXVlIGlkXG4gICAgICAgICAgICBvYmouaWQgPSBvYmoucHJvdG9jb2wgKyAnOi8vJyArIGhvc3QgKyAnOicgKyBvYmoucG9ydDtcbiAgICAgICAgICAgIC8vIGRlZmluZSBocmVmXG4gICAgICAgICAgICBvYmouaHJlZiA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArIChsb2MgJiYgbG9jLnBvcnQgPT0gb2JqLnBvcnQgPyAnJyA6ICc6JyArIG9iai5wb3J0KTtcblxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiZGVidWdcIjogMTQsIFwicGFyc2V1cmlcIjogMzggfV0sIDY6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gYWZ0ZXI7XG5cbiAgICAgICAgZnVuY3Rpb24gYWZ0ZXIoY291bnQsIGNhbGxiYWNrLCBlcnJfY2IpIHtcbiAgICAgICAgICB2YXIgYmFpbCA9IGZhbHNlO1xuICAgICAgICAgIGVycl9jYiA9IGVycl9jYiB8fCBub29wO1xuICAgICAgICAgIHByb3h5LmNvdW50ID0gY291bnQ7XG5cbiAgICAgICAgICByZXR1cm4gY291bnQgPT09IDAgPyBjYWxsYmFjaygpIDogcHJveHk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBwcm94eShlcnIsIHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKHByb3h5LmNvdW50IDw9IDApIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdhZnRlciBjYWxsZWQgdG9vIG1hbnkgdGltZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC0tcHJveHkuY291bnQ7XG5cbiAgICAgICAgICAgIC8vIGFmdGVyIGZpcnN0IGVycm9yLCByZXN0IGFyZSBwYXNzZWQgdG8gZXJyX2NiXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgIGJhaWwgPSB0cnVlO1xuICAgICAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgICAgICAvLyBmdXR1cmUgZXJyb3IgY2FsbGJhY2tzIHdpbGwgZ28gdG8gZXJyb3IgaGFuZGxlclxuICAgICAgICAgICAgICBjYWxsYmFjayA9IGVycl9jYjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJveHkuY291bnQgPT09IDAgJiYgIWJhaWwpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCwgcmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBub29wKCkge31cbiAgICAgIH0sIHt9XSwgNzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQW4gYWJzdHJhY3Rpb24gZm9yIHNsaWNpbmcgYW4gYXJyYXlidWZmZXIgZXZlbiB3aGVuXHJcbiAgICAgICAgICogQXJyYXlCdWZmZXIucHJvdG90eXBlLnNsaWNlIGlzIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJyYXlidWZmZXIsIHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICB2YXIgYnl0ZXMgPSBhcnJheWJ1ZmZlci5ieXRlTGVuZ3RoO1xuICAgICAgICAgIHN0YXJ0ID0gc3RhcnQgfHwgMDtcbiAgICAgICAgICBlbmQgPSBlbmQgfHwgYnl0ZXM7XG5cbiAgICAgICAgICBpZiAoYXJyYXlidWZmZXIuc2xpY2UpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheWJ1ZmZlci5zbGljZShzdGFydCwgZW5kKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgICAgICAgICBzdGFydCArPSBieXRlcztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVuZCA8IDApIHtcbiAgICAgICAgICAgIGVuZCArPSBieXRlcztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGVuZCA+IGJ5dGVzKSB7XG4gICAgICAgICAgICBlbmQgPSBieXRlcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc3RhcnQgPj0gYnl0ZXMgfHwgc3RhcnQgPj0gZW5kIHx8IGJ5dGVzID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBhYnYgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KGVuZCAtIHN0YXJ0KTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnQsIGlpID0gMDsgaSA8IGVuZDsgaSsrLCBpaSsrKSB7XG4gICAgICAgICAgICByZXN1bHRbaWldID0gYWJ2W2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmJ1ZmZlcjtcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgODogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBvc2UgYEJhY2tvZmZgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gQmFja29mZjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cclxuICAgICAgICAgKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cclxuICAgICAgICAgKiAtIGBqaXR0ZXJgIFswXVxyXG4gICAgICAgICAqIC0gYGZhY3RvcmAgWzJdXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gICAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgICAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgICAgICAgICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICAgICAgICAgIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgICAgICAgICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICAgICAgICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJuIHRoZSBiYWNrb2ZmIGR1cmF0aW9uLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICAgICAgICAgIGlmICh0aGlzLmppdHRlcikge1xuICAgICAgICAgICAgdmFyIHJhbmQgPSBNYXRoLnJhbmRvbSgpO1xuICAgICAgICAgICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgICAgICAgICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXNldCB0aGUgbnVtYmVyIG9mIGF0dGVtcHRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBCYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLmF0dGVtcHRzID0gMDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgQmFja29mZi5wcm90b3R5cGUuc2V0TWluID0gZnVuY3Rpb24gKG1pbikge1xuICAgICAgICAgIHRoaXMubXMgPSBtaW47XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uIChtYXgpIHtcbiAgICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgdGhlIGppdHRlclxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBCYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbiAoaml0dGVyKSB7XG4gICAgICAgICAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDk6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIC8qXHJcbiAgICAgICAgICogYmFzZTY0LWFycmF5YnVmZmVyXHJcbiAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL25pa2xhc3ZoL2Jhc2U2NC1hcnJheWJ1ZmZlclxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQ29weXJpZ2h0IChjKSAyMDEyIE5pa2xhcyB2b24gSGVydHplblxyXG4gICAgICAgICAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cclxuICAgICAgICAgKi9cbiAgICAgICAgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgICAgICAgIHZhciBjaGFycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrL1wiO1xuXG4gICAgICAgICAgLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuICAgICAgICAgIHZhciBsb29rdXAgPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAoYXJyYXlidWZmZXIpIHtcbiAgICAgICAgICAgIHZhciBieXRlcyA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIGxlbiA9IGJ5dGVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBiYXNlNjQgPSBcIlwiO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDMpIHtcbiAgICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2ldID4+IDJdO1xuICAgICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKGJ5dGVzW2ldICYgMykgPDwgNCB8IGJ5dGVzW2kgKyAxXSA+PiA0XTtcbiAgICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzWyhieXRlc1tpICsgMV0gJiAxNSkgPDwgMiB8IGJ5dGVzW2kgKyAyXSA+PiA2XTtcbiAgICAgICAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxlbiAlIDMgPT09IDIpIHtcbiAgICAgICAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyBcIj1cIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGVuICUgMyA9PT0gMSkge1xuICAgICAgICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAyKSArIFwiPT1cIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGJhc2U2NDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAoYmFzZTY0KSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVyTGVuZ3RoID0gYmFzZTY0Lmxlbmd0aCAqIDAuNzUsXG4gICAgICAgICAgICAgICAgbGVuID0gYmFzZTY0Lmxlbmd0aCxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHAgPSAwLFxuICAgICAgICAgICAgICAgIGVuY29kZWQxLFxuICAgICAgICAgICAgICAgIGVuY29kZWQyLFxuICAgICAgICAgICAgICAgIGVuY29kZWQzLFxuICAgICAgICAgICAgICAgIGVuY29kZWQ0O1xuXG4gICAgICAgICAgICBpZiAoYmFzZTY0W2Jhc2U2NC5sZW5ndGggLSAxXSA9PT0gXCI9XCIpIHtcbiAgICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSBcIj1cIikge1xuICAgICAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcnJheWJ1ZmZlciA9IG5ldyBBcnJheUJ1ZmZlcihidWZmZXJMZW5ndGgpLFxuICAgICAgICAgICAgICAgIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICAgICAgICAgICAgZW5jb2RlZDEgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSldO1xuICAgICAgICAgICAgICBlbmNvZGVkMiA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMSldO1xuICAgICAgICAgICAgICBlbmNvZGVkMyA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMildO1xuICAgICAgICAgICAgICBlbmNvZGVkNCA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpICsgMyldO1xuXG4gICAgICAgICAgICAgIGJ5dGVzW3ArK10gPSBlbmNvZGVkMSA8PCAyIHwgZW5jb2RlZDIgPj4gNDtcbiAgICAgICAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMiAmIDE1KSA8PCA0IHwgZW5jb2RlZDMgPj4gMjtcbiAgICAgICAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMyAmIDMpIDw8IDYgfCBlbmNvZGVkNCAmIDYzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYXJyYXlidWZmZXI7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkoKTtcbiAgICAgIH0sIHt9XSwgMTA6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDcmVhdGUgYSBibG9iIGJ1aWxkZXIgZXZlbiB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgQmxvYkJ1aWxkZXIgPSBnbG9iYWwuQmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLldlYktpdEJsb2JCdWlsZGVyIHx8IGdsb2JhbC5NU0Jsb2JCdWlsZGVyIHx8IGdsb2JhbC5Nb3pCbG9iQnVpbGRlcjtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBpcyBzdXBwb3J0ZWRcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGJsb2JTdXBwb3J0ZWQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIGEgPSBuZXcgQmxvYihbJ2hpJ10pO1xuICAgICAgICAgICAgICByZXR1cm4gYS5zaXplID09PSAyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2sgaWYgQmxvYiBjb25zdHJ1Y3RvciBzdXBwb3J0cyBBcnJheUJ1ZmZlclZpZXdzXHJcbiAgICAgICAgICAgKiBGYWlscyBpbiBTYWZhcmkgNiwgc28gd2UgbmVlZCB0byBtYXAgdG8gQXJyYXlCdWZmZXJzIHRoZXJlLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID0gYmxvYlN1cHBvcnRlZCAmJiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIGIgPSBuZXcgQmxvYihbbmV3IFVpbnQ4QXJyYXkoWzEsIDJdKV0pO1xuICAgICAgICAgICAgICByZXR1cm4gYi5zaXplID09PSAyO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkoKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2sgaWYgQmxvYkJ1aWxkZXIgaXMgc3VwcG9ydGVkXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBibG9iQnVpbGRlclN1cHBvcnRlZCA9IEJsb2JCdWlsZGVyICYmIEJsb2JCdWlsZGVyLnByb3RvdHlwZS5hcHBlbmQgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmdldEJsb2I7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEhlbHBlciBmdW5jdGlvbiB0aGF0IG1hcHMgQXJyYXlCdWZmZXJWaWV3cyB0byBBcnJheUJ1ZmZlcnNcclxuICAgICAgICAgICAqIFVzZWQgYnkgQmxvYkJ1aWxkZXIgY29uc3RydWN0b3IgYW5kIG9sZCBicm93c2VycyB0aGF0IGRpZG4ndFxyXG4gICAgICAgICAgICogc3VwcG9ydCBpdCBpbiB0aGUgQmxvYiBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBjaHVuayA9IGFyeVtpXTtcbiAgICAgICAgICAgICAgaWYgKGNodW5rLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZiA9IGNodW5rLmJ1ZmZlcjtcblxuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgYSBzdWJhcnJheSwgbWFrZSBhIGNvcHkgc28gd2Ugb25seVxuICAgICAgICAgICAgICAgIC8vIGluY2x1ZGUgdGhlIHN1YmFycmF5IHJlZ2lvbiBmcm9tIHRoZSB1bmRlcmx5aW5nIGJ1ZmZlclxuICAgICAgICAgICAgICAgIGlmIChjaHVuay5ieXRlTGVuZ3RoICE9PSBidWYuYnl0ZUxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGNvcHkgPSBuZXcgVWludDhBcnJheShjaHVuay5ieXRlTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgIGNvcHkuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZiwgY2h1bmsuYnl0ZU9mZnNldCwgY2h1bmsuYnl0ZUxlbmd0aCkpO1xuICAgICAgICAgICAgICAgICAgYnVmID0gY29weS5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYXJ5W2ldID0gYnVmO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gQmxvYkJ1aWxkZXJDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgICAgICAgICB2YXIgYmIgPSBuZXcgQmxvYkJ1aWxkZXIoKTtcbiAgICAgICAgICAgIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgYmIuYXBwZW5kKGFyeVtpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zLnR5cGUgPyBiYi5nZXRCbG9iKG9wdGlvbnMudHlwZSkgOiBiYi5nZXRCbG9iKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZ1bmN0aW9uIEJsb2JDb25zdHJ1Y3RvcihhcnksIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIG1hcEFycmF5QnVmZmVyVmlld3MoYXJ5KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQmxvYihhcnksIG9wdGlvbnMgfHwge30pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoYmxvYlN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICByZXR1cm4gYmxvYlN1cHBvcnRzQXJyYXlCdWZmZXJWaWV3ID8gZ2xvYmFsLkJsb2IgOiBCbG9iQ29uc3RydWN0b3I7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJsb2JCdWlsZGVyU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwge31dLCAxMTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2xpY2UgcmVmZXJlbmNlLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBzbGljZSA9IFtdLnNsaWNlO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEJpbmQgYG9iamAgdG8gYGZuYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZm4gb3Igc3RyaW5nXHJcbiAgICAgICAgICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmosIGZuKSB7XG4gICAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBmbikgZm4gPSBvYmpbZm5dO1xuICAgICAgICAgIGlmICgnZnVuY3Rpb24nICE9IHR5cGVvZiBmbikgdGhyb3cgbmV3IEVycm9yKCdiaW5kKCkgcmVxdWlyZXMgYSBmdW5jdGlvbicpO1xuICAgICAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpO1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkob2JqLCBhcmdzLmNvbmNhdChzbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAxMjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgICAgICAgICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSkucHVzaChmbik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAgICAgICAgICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvbi5mbiA9IGZuO1xuICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gICAgICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAgICAgICAgIC8vIGFsbFxuICAgICAgICAgIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICAgICAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICAgICAgICAgIHZhciBjYjtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDEzOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICB2YXIgZm4gPSBmdW5jdGlvbiBmbigpIHt9O1xuICAgICAgICAgIGZuLnByb3RvdHlwZSA9IGIucHJvdG90eXBlO1xuICAgICAgICAgIGEucHJvdG90eXBlID0gbmV3IGZuKCk7XG4gICAgICAgICAgYS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBhO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAxNDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBFeHBvc2UgYGRlYnVnKClgIGFzIHRoZSBtb2R1bGUuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9kZWJ1ZycpO1xuICAgICAgICBleHBvcnRzLmxvZyA9IGxvZztcbiAgICAgICAgZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbiAgICAgICAgZXhwb3J0cy5zYXZlID0gc2F2ZTtcbiAgICAgICAgZXhwb3J0cy5sb2FkID0gbG9hZDtcbiAgICAgICAgZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG4gICAgICAgIGV4cG9ydHMuc3RvcmFnZSA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBjaHJvbWUgJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZS5zdG9yYWdlID8gY2hyb21lLnN0b3JhZ2UubG9jYWwgOiBsb2NhbHN0b3JhZ2UoKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2xvcnMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5jb2xvcnMgPSBbJ2xpZ2h0c2VhZ3JlZW4nLCAnZm9yZXN0Z3JlZW4nLCAnZ29sZGVucm9kJywgJ2RvZGdlcmJsdWUnLCAnZGFya29yY2hpZCcsICdjcmltc29uJ107XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcclxuICAgICAgICAgKiBhbmQgdGhlIEZpcmVidWcgZXh0ZW5zaW9uIChhbnkgRmlyZWZveCB2ZXJzaW9uKSBhcmUga25vd25cclxuICAgICAgICAgKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBUT0RPOiBhZGQgYSBgbG9jYWxTdG9yYWdlYCB2YXJpYWJsZSB0byBleHBsaWNpdGx5IGVuYWJsZS9kaXNhYmxlIGNvbG9yc1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcbiAgICAgICAgICAvLyBpcyB3ZWJraXQ/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE2NDU5NjA2LzM3Njc3M1xuICAgICAgICAgIHJldHVybiAnV2Via2l0QXBwZWFyYW5jZScgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlIHx8XG4gICAgICAgICAgLy8gaXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuICAgICAgICAgIHdpbmRvdy5jb25zb2xlICYmIChjb25zb2xlLmZpcmVidWcgfHwgY29uc29sZS5leGNlcHRpb24gJiYgY29uc29sZS50YWJsZSkgfHxcbiAgICAgICAgICAvLyBpcyBmaXJlZm94ID49IHYzMT9cbiAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1Rvb2xzL1dlYl9Db25zb2xlI1N0eWxpbmdfbWVzc2FnZXNcbiAgICAgICAgICBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSAmJiBwYXJzZUludChSZWdFeHAuJDEsIDEwKSA+PSAzMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLmZvcm1hdHRlcnMuaiA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0QXJncygpIHtcbiAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICB2YXIgdXNlQ29sb3JzID0gdGhpcy51c2VDb2xvcnM7XG5cbiAgICAgICAgICBhcmdzWzBdID0gKHVzZUNvbG9ycyA/ICclYycgOiAnJykgKyB0aGlzLm5hbWVzcGFjZSArICh1c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgKyBhcmdzWzBdICsgKHVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArICcrJyArIGV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuICAgICAgICAgIGlmICghdXNlQ29sb3JzKSByZXR1cm4gYXJncztcblxuICAgICAgICAgIHZhciBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcbiAgICAgICAgICBhcmdzID0gW2FyZ3NbMF0sIGMsICdjb2xvcjogaW5oZXJpdCddLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAxKSk7XG5cbiAgICAgICAgICAvLyB0aGUgZmluYWwgXCIlY1wiIGlzIHNvbWV3aGF0IHRyaWNreSwgYmVjYXVzZSB0aGVyZSBjb3VsZCBiZSBvdGhlclxuICAgICAgICAgIC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cbiAgICAgICAgICAvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cbiAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgIHZhciBsYXN0QyA9IDA7XG4gICAgICAgICAgYXJnc1swXS5yZXBsYWNlKC8lW2EteiVdL2csIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKCclJScgPT09IG1hdGNoKSByZXR1cm47XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgaWYgKCclYycgPT09IG1hdGNoKSB7XG4gICAgICAgICAgICAgIC8vIHdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuICAgICAgICAgICAgICAvLyAodGhlIHVzZXIgbWF5IGhhdmUgcHJvdmlkZWQgdGhlaXIgb3duKVxuICAgICAgICAgICAgICBsYXN0QyA9IGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xuICAgICAgICAgIHJldHVybiBhcmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW52b2tlcyBgY29uc29sZS5sb2coKWAgd2hlbiBhdmFpbGFibGUuXHJcbiAgICAgICAgICogTm8tb3Agd2hlbiBgY29uc29sZS5sb2dgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gbG9nKCkge1xuICAgICAgICAgIC8vIHRoaXMgaGFja2VyeSBpcyByZXF1aXJlZCBmb3IgSUU4LzksIHdoZXJlXG4gICAgICAgICAgLy8gdGhlIGBjb25zb2xlLmxvZ2AgZnVuY3Rpb24gZG9lc24ndCBoYXZlICdhcHBseSdcbiAgICAgICAgICByZXR1cm4gJ29iamVjdCcgPT09IHR5cGVvZiBjb25zb2xlICYmIGNvbnNvbGUubG9nICYmIEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseS5jYWxsKGNvbnNvbGUubG9nLCBjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2F2ZSBgbmFtZXNwYWNlc2AuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSBuYW1lc3BhY2VzKSB7XG4gICAgICAgICAgICAgIGV4cG9ydHMuc3RvcmFnZS5yZW1vdmVJdGVtKCdkZWJ1ZycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5zdG9yYWdlLmRlYnVnID0gbmFtZXNwYWNlcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTG9hZCBgbmFtZXNwYWNlc2AuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IHJldHVybnMgdGhlIHByZXZpb3VzbHkgcGVyc2lzdGVkIGRlYnVnIG1vZGVzXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgICAgICB2YXIgcjtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgciA9IGV4cG9ydHMuc3RvcmFnZS5kZWJ1ZztcbiAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgIHJldHVybiByO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5hYmxlIG5hbWVzcGFjZXMgbGlzdGVkIGluIGBsb2NhbFN0b3JhZ2UuZGVidWdgIGluaXRpYWxseS5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLmVuYWJsZShsb2FkKCkpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRoaXMgaXMgbmVjZXNzYXJ5IGJlY2F1c2Ugc2FmYXJpIHRocm93c1xyXG4gICAgICAgICAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXHJcbiAgICAgICAgICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cbiAgICAgIH0sIHsgXCIuL2RlYnVnXCI6IDE1IH1dLCAxNTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXHJcbiAgICAgICAgICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBkZWJ1ZztcbiAgICAgICAgZXhwb3J0cy5jb2VyY2UgPSBjb2VyY2U7XG4gICAgICAgIGV4cG9ydHMuZGlzYWJsZSA9IGRpc2FibGU7XG4gICAgICAgIGV4cG9ydHMuZW5hYmxlID0gZW5hYmxlO1xuICAgICAgICBleHBvcnRzLmVuYWJsZWQgPSBlbmFibGVkO1xuICAgICAgICBleHBvcnRzLmh1bWFuaXplID0gX2RlcmVxXygnbXMnKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLm5hbWVzID0gW107XG4gICAgICAgIGV4cG9ydHMuc2tpcHMgPSBbXTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlcmNhc2VkIGxldHRlciwgaS5lLiBcIm5cIi5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLmZvcm1hdHRlcnMgPSB7fTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQcmV2aW91c2x5IGFzc2lnbmVkIGNvbG9yLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBwcmV2Q29sb3IgPSAwO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZpb3VzIGxvZyB0aW1lc3RhbXAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHByZXZUaW1lO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbGVjdCBhIGNvbG9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIHNlbGVjdENvbG9yKCkge1xuICAgICAgICAgIHJldHVybiBleHBvcnRzLmNvbG9yc1twcmV2Q29sb3IrKyAlIGV4cG9ydHMuY29sb3JzLmxlbmd0aF07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VcclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGRlYnVnKG5hbWVzcGFjZSkge1xuXG4gICAgICAgICAgLy8gZGVmaW5lIHRoZSBgZGlzYWJsZWRgIHZlcnNpb25cbiAgICAgICAgICBmdW5jdGlvbiBkaXNhYmxlZCgpIHt9XG4gICAgICAgICAgZGlzYWJsZWQuZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgLy8gZGVmaW5lIHRoZSBgZW5hYmxlZGAgdmVyc2lvblxuICAgICAgICAgIGZ1bmN0aW9uIGVuYWJsZWQoKSB7XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gZW5hYmxlZDtcblxuICAgICAgICAgICAgLy8gc2V0IGBkaWZmYCB0aW1lc3RhbXBcbiAgICAgICAgICAgIHZhciBjdXJyID0gK25ldyBEYXRlKCk7XG4gICAgICAgICAgICB2YXIgbXMgPSBjdXJyIC0gKHByZXZUaW1lIHx8IGN1cnIpO1xuICAgICAgICAgICAgc2VsZi5kaWZmID0gbXM7XG4gICAgICAgICAgICBzZWxmLnByZXYgPSBwcmV2VGltZTtcbiAgICAgICAgICAgIHNlbGYuY3VyciA9IGN1cnI7XG4gICAgICAgICAgICBwcmV2VGltZSA9IGN1cnI7XG5cbiAgICAgICAgICAgIC8vIGFkZCB0aGUgYGNvbG9yYCBpZiBub3Qgc2V0XG4gICAgICAgICAgICBpZiAobnVsbCA9PSBzZWxmLnVzZUNvbG9ycykgc2VsZi51c2VDb2xvcnMgPSBleHBvcnRzLnVzZUNvbG9ycygpO1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gc2VsZi5jb2xvciAmJiBzZWxmLnVzZUNvbG9ycykgc2VsZi5jb2xvciA9IHNlbGVjdENvbG9yKCk7XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcblxuICAgICAgICAgICAgYXJnc1swXSA9IGV4cG9ydHMuY29lcmNlKGFyZ3NbMF0pO1xuXG4gICAgICAgICAgICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBhcmdzWzBdKSB7XG4gICAgICAgICAgICAgIC8vIGFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVvXG4gICAgICAgICAgICAgIGFyZ3MgPSBbJyVvJ10uY29uY2F0KGFyZ3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBseSBhbnkgYGZvcm1hdHRlcnNgIHRyYW5zZm9ybWF0aW9uc1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSBhcmdzWzBdLnJlcGxhY2UoLyUoW2EteiVdKS9nLCBmdW5jdGlvbiAobWF0Y2gsIGZvcm1hdCkge1xuICAgICAgICAgICAgICAvLyBpZiB3ZSBlbmNvdW50ZXIgYW4gZXNjYXBlZCAlIHRoZW4gZG9uJ3QgaW5jcmVhc2UgdGhlIGFycmF5IGluZGV4XG4gICAgICAgICAgICAgIGlmIChtYXRjaCA9PT0gJyUlJykgcmV0dXJuIG1hdGNoO1xuICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICB2YXIgZm9ybWF0dGVyID0gZXhwb3J0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG4gICAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgZm9ybWF0dGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3NbaW5kZXhdO1xuICAgICAgICAgICAgICAgIG1hdGNoID0gZm9ybWF0dGVyLmNhbGwoc2VsZiwgdmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIG5vdyB3ZSBuZWVkIHRvIHJlbW92ZSBgYXJnc1tpbmRleF1gIHNpbmNlIGl0J3MgaW5saW5lZCBpbiB0aGUgYGZvcm1hdGBcbiAgICAgICAgICAgICAgICBhcmdzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgaW5kZXgtLTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBleHBvcnRzLmZvcm1hdEFyZ3MpIHtcbiAgICAgICAgICAgICAgYXJncyA9IGV4cG9ydHMuZm9ybWF0QXJncy5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsb2dGbiA9IGVuYWJsZWQubG9nIHx8IGV4cG9ydHMubG9nIHx8IGNvbnNvbGUubG9nLmJpbmQoY29uc29sZSk7XG4gICAgICAgICAgICBsb2dGbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5hYmxlZC5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBmbiA9IGV4cG9ydHMuZW5hYmxlZChuYW1lc3BhY2UpID8gZW5hYmxlZCA6IGRpc2FibGVkO1xuXG4gICAgICAgICAgZm4ubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXG4gICAgICAgICAgcmV0dXJuIGZuO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xyXG4gICAgICAgICAqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZW5hYmxlKG5hbWVzcGFjZXMpIHtcbiAgICAgICAgICBleHBvcnRzLnNhdmUobmFtZXNwYWNlcyk7XG5cbiAgICAgICAgICB2YXIgc3BsaXQgPSAobmFtZXNwYWNlcyB8fCAnJykuc3BsaXQoL1tcXHMsXSsvKTtcbiAgICAgICAgICB2YXIgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKCFzcGxpdFtpXSkgY29udGludWU7IC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG4gICAgICAgICAgICBuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcbiAgICAgICAgICAgIGlmIChuYW1lc3BhY2VzWzBdID09PSAnLScpIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zdWJzdHIoMSkgKyAnJCcpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4cG9ydHMubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgICAgICBleHBvcnRzLmVuYWJsZSgnJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxyXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgaSwgbGVuO1xuICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKGkgPSAwLCBsZW4gPSBleHBvcnRzLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5uYW1lc1tpXS50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb2VyY2UgYHZhbGAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSB2YWxcclxuICAgICAgICAgKiBAcmV0dXJuIHtNaXhlZH1cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG4gICAgICAgICAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSByZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgIH1cbiAgICAgIH0sIHsgXCJtc1wiOiAzNSB9XSwgMTY6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuL2xpYi8nKTtcbiAgICAgIH0sIHsgXCIuL2xpYi9cIjogMTcgfV0sIDE3OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gX2RlcmVxXygnLi9zb2NrZXQnKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBvcnRzIHBhcnNlclxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqL1xuICAgICAgICBtb2R1bGUuZXhwb3J0cy5wYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4gICAgICB9LCB7IFwiLi9zb2NrZXRcIjogMTgsIFwiZW5naW5lLmlvLXBhcnNlclwiOiAyNyB9XSwgMTg6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgdHJhbnNwb3J0cyA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO1xuICAgICAgICAgIHZhciBFbWl0dGVyID0gX2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTtcbiAgICAgICAgICB2YXIgZGVidWcgPSBfZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnNvY2tldCcpO1xuICAgICAgICAgIHZhciBpbmRleCA9IF9kZXJlcV8oJ2luZGV4b2YnKTtcbiAgICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO1xuICAgICAgICAgIHZhciBwYXJzZXVyaSA9IF9kZXJlcV8oJ3BhcnNldXJpJyk7XG4gICAgICAgICAgdmFyIHBhcnNlanNvbiA9IF9kZXJlcV8oJ3BhcnNlanNvbicpO1xuICAgICAgICAgIHZhciBwYXJzZXFzID0gX2RlcmVxXygncGFyc2VxcycpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBTb2NrZXQ7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE5vb3AgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgb3Igb3B0aW9uc1xyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIFNvY2tldCh1cmksIG9wdHMpIHtcbiAgICAgICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTb2NrZXQpKSByZXR1cm4gbmV3IFNvY2tldCh1cmksIG9wdHMpO1xuXG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICAgICAgaWYgKHVyaSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICAgIHVyaSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgICAgdXJpID0gcGFyc2V1cmkodXJpKTtcbiAgICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHVyaS5ob3N0O1xuICAgICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PSAnaHR0cHMnIHx8IHVyaS5wcm90b2NvbCA9PSAnd3NzJztcbiAgICAgICAgICAgICAgb3B0cy5wb3J0ID0gdXJpLnBvcnQ7XG4gICAgICAgICAgICAgIGlmICh1cmkucXVlcnkpIG9wdHMucXVlcnkgPSB1cmkucXVlcnk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2V1cmkob3B0cy5ob3N0KS5ob3N0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnNlY3VyZSA9IG51bGwgIT0gb3B0cy5zZWN1cmUgPyBvcHRzLnNlY3VyZSA6IGdsb2JhbC5sb2NhdGlvbiAmJiAnaHR0cHM6JyA9PSBsb2NhdGlvbi5wcm90b2NvbDtcblxuICAgICAgICAgICAgaWYgKG9wdHMuaG9zdG5hbWUgJiYgIW9wdHMucG9ydCkge1xuICAgICAgICAgICAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gJzQ0MycgOiAnODAnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFnZW50ID0gb3B0cy5hZ2VudCB8fCBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lIHx8IChnbG9iYWwubG9jYXRpb24gPyBsb2NhdGlvbi5ob3N0bmFtZSA6ICdsb2NhbGhvc3QnKTtcbiAgICAgICAgICAgIHRoaXMucG9ydCA9IG9wdHMucG9ydCB8fCAoZ2xvYmFsLmxvY2F0aW9uICYmIGxvY2F0aW9uLnBvcnQgPyBsb2NhdGlvbi5wb3J0IDogdGhpcy5zZWN1cmUgPyA0NDMgOiA4MCk7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeSB8fCB7fTtcbiAgICAgICAgICAgIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgdGhpcy5xdWVyeSkgdGhpcy5xdWVyeSA9IHBhcnNlcXMuZGVjb2RlKHRoaXMucXVlcnkpO1xuICAgICAgICAgICAgdGhpcy51cGdyYWRlID0gZmFsc2UgIT09IG9wdHMudXBncmFkZTtcbiAgICAgICAgICAgIHRoaXMucGF0aCA9IChvcHRzLnBhdGggfHwgJy9lbmdpbmUuaW8nKS5yZXBsYWNlKC9cXC8kLywgJycpICsgJy8nO1xuICAgICAgICAgICAgdGhpcy5mb3JjZUpTT05QID0gISFvcHRzLmZvcmNlSlNPTlA7XG4gICAgICAgICAgICB0aGlzLmpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG4gICAgICAgICAgICB0aGlzLmZvcmNlQmFzZTY0ID0gISFvcHRzLmZvcmNlQmFzZTY0O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVzWERSID0gISFvcHRzLmVuYWJsZXNYRFI7XG4gICAgICAgICAgICB0aGlzLnRpbWVzdGFtcFBhcmFtID0gb3B0cy50aW1lc3RhbXBQYXJhbSB8fCAndCc7XG4gICAgICAgICAgICB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzID0gb3B0cy50aW1lc3RhbXBSZXF1ZXN0cztcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbJ3BvbGxpbmcnLCAnd2Vic29ja2V0J107XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnJztcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucG9saWN5UG9ydCA9IG9wdHMucG9saWN5UG9ydCB8fCA4NDM7XG4gICAgICAgICAgICB0aGlzLnJlbWVtYmVyVXBncmFkZSA9IG9wdHMucmVtZW1iZXJVcGdyYWRlIHx8IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5iaW5hcnlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMub25seUJpbmFyeVVwZ3JhZGVzID0gb3B0cy5vbmx5QmluYXJ5VXBncmFkZXM7XG4gICAgICAgICAgICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gZmFsc2UgIT09IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgPyBvcHRzLnBlck1lc3NhZ2VEZWZsYXRlIHx8IHt9IDogZmFsc2U7XG5cbiAgICAgICAgICAgIGlmICh0cnVlID09PSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlKSB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0ge307XG4gICAgICAgICAgICBpZiAodGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSAmJiBudWxsID09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgIHRoaXMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkID0gMTAyNDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgICB0aGlzLnBmeCA9IG9wdHMucGZ4IHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLmtleSA9IG9wdHMua2V5IHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLnBhc3NwaHJhc2UgPSBvcHRzLnBhc3NwaHJhc2UgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2VydCA9IG9wdHMuY2VydCB8fCBudWxsO1xuICAgICAgICAgICAgdGhpcy5jYSA9IG9wdHMuY2EgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMuY2lwaGVycyA9IG9wdHMuY2lwaGVycyB8fCBudWxsO1xuICAgICAgICAgICAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gICAgICAgICAgICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgdmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcbiAgICAgICAgICAgIGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCkge1xuICAgICAgICAgICAgICBpZiAob3B0cy5leHRyYUhlYWRlcnMgJiYgT2JqZWN0LmtleXMob3B0cy5leHRyYUhlYWRlcnMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4dHJhSGVhZGVycyA9IG9wdHMuZXh0cmFIZWFkZXJzO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYC5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgRW1pdHRlcihTb2NrZXQucHJvdG90eXBlKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG9jb2wgPSBwYXJzZXIucHJvdG9jb2w7IC8vIHRoaXMgaXMgYW4gaW50XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEV4cG9zZSBkZXBzIGZvciBsZWdhY3kgY29tcGF0aWJpbGl0eVxyXG4gICAgICAgICAgICogYW5kIHN0YW5kYWxvbmUgYnJvd3NlciBhY2Nlc3MuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5Tb2NrZXQgPSBTb2NrZXQ7XG4gICAgICAgICAgU29ja2V0LlRyYW5zcG9ydCA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0Jyk7XG4gICAgICAgICAgU29ja2V0LnRyYW5zcG9ydHMgPSBfZGVyZXFfKCcuL3RyYW5zcG9ydHMnKTtcbiAgICAgICAgICBTb2NrZXQucGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDcmVhdGVzIHRyYW5zcG9ydCBvZiB0aGUgZ2l2ZW4gdHlwZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcclxuICAgICAgICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH1cclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLmNyZWF0ZVRyYW5zcG9ydCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBkZWJ1ZygnY3JlYXRpbmcgdHJhbnNwb3J0IFwiJXNcIicsIG5hbWUpO1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gY2xvbmUodGhpcy5xdWVyeSk7XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxuICAgICAgICAgICAgcXVlcnkuRUlPID0gcGFyc2VyLnByb3RvY29sO1xuXG4gICAgICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICAgICAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcblxuICAgICAgICAgICAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gICAgICAgICAgICBpZiAodGhpcy5pZCkgcXVlcnkuc2lkID0gdGhpcy5pZDtcblxuICAgICAgICAgICAgdmFyIHRyYW5zcG9ydCA9IG5ldyB0cmFuc3BvcnRzW25hbWVdKHtcbiAgICAgICAgICAgICAgYWdlbnQ6IHRoaXMuYWdlbnQsXG4gICAgICAgICAgICAgIGhvc3RuYW1lOiB0aGlzLmhvc3RuYW1lLFxuICAgICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICAgIHBhdGg6IHRoaXMucGF0aCxcbiAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgICBmb3JjZUpTT05QOiB0aGlzLmZvcmNlSlNPTlAsXG4gICAgICAgICAgICAgIGpzb25wOiB0aGlzLmpzb25wLFxuICAgICAgICAgICAgICBmb3JjZUJhc2U2NDogdGhpcy5mb3JjZUJhc2U2NCxcbiAgICAgICAgICAgICAgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSLFxuICAgICAgICAgICAgICB0aW1lc3RhbXBSZXF1ZXN0czogdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyxcbiAgICAgICAgICAgICAgdGltZXN0YW1wUGFyYW06IHRoaXMudGltZXN0YW1wUGFyYW0sXG4gICAgICAgICAgICAgIHBvbGljeVBvcnQ6IHRoaXMucG9saWN5UG9ydCxcbiAgICAgICAgICAgICAgc29ja2V0OiB0aGlzLFxuICAgICAgICAgICAgICBwZng6IHRoaXMucGZ4LFxuICAgICAgICAgICAgICBrZXk6IHRoaXMua2V5LFxuICAgICAgICAgICAgICBwYXNzcGhyYXNlOiB0aGlzLnBhc3NwaHJhc2UsXG4gICAgICAgICAgICAgIGNlcnQ6IHRoaXMuY2VydCxcbiAgICAgICAgICAgICAgY2E6IHRoaXMuY2EsXG4gICAgICAgICAgICAgIGNpcGhlcnM6IHRoaXMuY2lwaGVycyxcbiAgICAgICAgICAgICAgcmVqZWN0VW5hdXRob3JpemVkOiB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCxcbiAgICAgICAgICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IHRoaXMucGVyTWVzc2FnZURlZmxhdGUsXG4gICAgICAgICAgICAgIGV4dHJhSGVhZGVyczogdGhpcy5leHRyYUhlYWRlcnNcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNwb3J0O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmdW5jdGlvbiBjbG9uZShvYmopIHtcbiAgICAgICAgICAgIHZhciBvID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgb1tpXSA9IG9ialtpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG87XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0O1xuICAgICAgICAgICAgaWYgKHRoaXMucmVtZW1iZXJVcGdyYWRlICYmIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiYgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoJ3dlYnNvY2tldCcpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydCA9ICd3ZWJzb2NrZXQnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIC8vIEVtaXQgZXJyb3Igb24gbmV4dCB0aWNrIHNvIGl0IGNhbiBiZSBsaXN0ZW5lZCB0b1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgnZXJyb3InLCAnTm8gdHJhbnNwb3J0cyBhdmFpbGFibGUnKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcblxuICAgICAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyYW5zcG9ydC5vcGVuKCk7XG4gICAgICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLnNldFRyYW5zcG9ydCA9IGZ1bmN0aW9uICh0cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIGRlYnVnKCdzZXR0aW5nIHRyYW5zcG9ydCAlcycsIHRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICAgIGRlYnVnKCdjbGVhcmluZyBleGlzdGluZyB0cmFuc3BvcnQgJXMnLCB0aGlzLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuXG4gICAgICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkRyYWluKCk7XG4gICAgICAgICAgICB9KS5vbigncGFja2V0JywgZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgICAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gICAgICAgICAgICB9KS5vbignZXJyb3InLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9KS5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYub25DbG9zZSgndHJhbnNwb3J0IGNsb3NlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBQcm9iZXMgYSB0cmFuc3BvcnQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5wcm9iZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICBkZWJ1ZygncHJvYmluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSwgeyBwcm9iZTogMSB9KSxcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBvblRyYW5zcG9ydE9wZW4oKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLm9ubHlCaW5hcnlVcGdyYWRlcykge1xuICAgICAgICAgICAgICAgIHZhciB1cGdyYWRlTG9zZXNCaW5hcnkgPSAhdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiBzZWxmLnRyYW5zcG9ydC5zdXBwb3J0c0JpbmFyeTtcbiAgICAgICAgICAgICAgICBmYWlsZWQgPSBmYWlsZWQgfHwgdXBncmFkZUxvc2VzQmluYXJ5O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBvcGVuZWQnLCBuYW1lKTtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3BpbmcnLCBkYXRhOiAncHJvYmUnIH1dKTtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoJ3BhY2tldCcsIGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCdwb25nJyA9PSBtc2cudHlwZSAmJiAncHJvYmUnID09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGluZycsIHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zcG9ydCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9ICd3ZWJzb2NrZXQnID09IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgICAgICAgICAgICAgICBkZWJ1ZygncGF1c2luZyBjdXJyZW50IHRyYW5zcG9ydCBcIiVzXCInLCBzZWxmLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYudHJhbnNwb3J0LnBhdXNlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ2Nsb3NlZCcgPT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdjaGFuZ2luZyB0cmFuc3BvcnQgYW5kIHNlbmRpbmcgdXBncmFkZSBwYWNrZXQnKTtcblxuICAgICAgICAgICAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogJ3VwZ3JhZGUnIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi51cGdyYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcigncHJvYmUgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgndXBncmFkZUVycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQoKSB7XG4gICAgICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcblxuICAgICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICBjbGVhbnVwKCk7XG5cbiAgICAgICAgICAgICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICAgICAgZnVuY3Rpb24gb25lcnJvcihlcnIpIHtcbiAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcjogJyArIGVycik7XG4gICAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuXG4gICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuXG4gICAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCBiZWNhdXNlIG9mIGVycm9yOiAlcycsIG5hbWUsIGVycik7XG5cbiAgICAgICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICAgIG9uZXJyb3IoXCJ0cmFuc3BvcnQgY2xvc2VkXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL1doZW4gdGhlIHNvY2tldCBpcyBjbG9zZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgICAgb25lcnJvcihcInNvY2tldCBjbG9zZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vV2hlbiB0aGUgc29ja2V0IGlzIHVwZ3JhZGVkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgICBpZiAodHJhbnNwb3J0ICYmIHRvLm5hbWUgIT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJywgdG8ubmFtZSwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgb24gdGhlIHRyYW5zcG9ydCBhbmQgb24gc2VsZlxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYW51cCgpIHtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nsb3NlJywgb25jbG9zZSk7XG4gICAgICAgICAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGluZycsIG9udXBncmFkZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRyYW5zcG9ydC5vbmNlKCdvcGVuJywgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5vbmNlKCdlcnJvcicsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoJ2Nsb3NlJywgb25UcmFuc3BvcnRDbG9zZSk7XG5cbiAgICAgICAgICAgIHRoaXMub25jZSgnY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgndXBncmFkaW5nJywgb251cGdyYWRlKTtcblxuICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ3NvY2tldCBvcGVuJyk7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gICAgICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuXG4gICAgICAgICAgICAvLyB3ZSBjaGVjayBmb3IgYHJlYWR5U3RhdGVgIGluIGNhc2UgYW4gYG9wZW5gXG4gICAgICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgICAgICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSAmJiB0aGlzLnVwZ3JhZGUgJiYgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3N0YXJ0aW5nIHVwZ3JhZGUgcHJvYmVzJyk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy51cGdyYWRlcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb2JlKHRoaXMudXBncmFkZXNbaV0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSGFuZGxlcyBhIHBhY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLCBwYWNrZXQudHlwZSwgcGFja2V0LmRhdGEpO1xuXG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcblxuICAgICAgICAgICAgICAvLyBTb2NrZXQgaXMgbGl2ZSAtIGFueSBwYWNrZXQgY291bnRzXG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgnaGVhcnRiZWF0Jyk7XG5cbiAgICAgICAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ29wZW4nOlxuICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShwYXJzZWpzb24ocGFja2V0LmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncG9uZyc6XG4gICAgICAgICAgICAgICAgICB0aGlzLnNldFBpbmcoKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncG9uZycpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdzZXJ2ZXIgZXJyb3InKTtcbiAgICAgICAgICAgICAgICAgIGVyci5jb2RlID0gcGFja2V0LmRhdGE7XG4gICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2RhdGEnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGhhbmRzaGFrZSBvYmpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uSGFuZHNoYWtlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnaGFuZHNoYWtlJywgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5xdWVyeS5zaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgICAgIHRoaXMudXBncmFkZXMgPSB0aGlzLmZpbHRlclVwZ3JhZGVzKGRhdGEudXBncmFkZXMpO1xuICAgICAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgICAgIHRoaXMucGluZ1RpbWVvdXQgPSBkYXRhLnBpbmdUaW1lb3V0O1xuICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgICAgIGlmICgnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMuc2V0UGluZygpO1xuXG4gICAgICAgICAgICAvLyBQcm9sb25nIGxpdmVuZXNzIG9mIHNvY2tldCBvbiBoZWFydGJlYXRcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ2hlYXJ0YmVhdCcsIHRoaXMub25IZWFydGJlYXQpO1xuICAgICAgICAgICAgdGhpcy5vbignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUmVzZXRzIHBpbmcgdGltZW91dC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbkhlYXJ0YmVhdCA9IGZ1bmN0aW9uICh0aW1lb3V0KSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHNlbGYucGluZ1RpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoJ2Nsb3NlZCcgPT0gc2VsZi5yZWFkeVN0YXRlKSByZXR1cm47XG4gICAgICAgICAgICAgIHNlbGYub25DbG9zZSgncGluZyB0aW1lb3V0Jyk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0IHx8IHNlbGYucGluZ0ludGVydmFsICsgc2VsZi5waW5nVGltZW91dCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUGluZ3Mgc2VydmVyIGV2ZXJ5IGB0aGlzLnBpbmdJbnRlcnZhbGAgYW5kIGV4cGVjdHMgcmVzcG9uc2VcclxuICAgICAgICAgICAqIHdpdGhpbiBgdGhpcy5waW5nVGltZW91dGAgb3IgY2xvc2VzIGNvbm5lY3Rpb24uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuc2V0UGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWxmLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgICAgIHNlbGYucGluZ0ludGVydmFsVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3dyaXRpbmcgcGluZyBwYWNrZXQgLSBleHBlY3RpbmcgcG9uZyB3aXRoaW4gJXNtcycsIHNlbGYucGluZ1RpbWVvdXQpO1xuICAgICAgICAgICAgICBzZWxmLnBpbmcoKTtcbiAgICAgICAgICAgICAgc2VsZi5vbkhlYXJ0YmVhdChzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICAgICAgICAgIH0sIHNlbGYucGluZ0ludGVydmFsKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAqIFNlbmRzIGEgcGluZyBwYWNrZXQuXHJcbiAgICAgICAgICAqXHJcbiAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUucGluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuc2VuZFBhY2tldCgncGluZycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZi5lbWl0KCdwaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uRHJhaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuXG4gICAgICAgICAgICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gICAgICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgICAgIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuXG4gICAgICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkcmFpbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEZsdXNoIHdyaXRlIGJ1ZmZlcnMuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuZmx1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJ2Nsb3NlZCcgIT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmICF0aGlzLnVwZ3JhZGluZyAmJiB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICBkZWJ1ZygnZmx1c2hpbmcgJWQgcGFja2V0cyBpbiBzb2NrZXQnLCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQodGhpcy53cml0ZUJ1ZmZlcik7XG4gICAgICAgICAgICAgIC8vIGtlZXAgdHJhY2sgb2YgY3VycmVudCBsZW5ndGggb2Ygd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoO1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2ZsdXNoJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU2VuZHMgYSBtZXNzYWdlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlLlxyXG4gICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cclxuICAgICAgICAgICAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS53cml0ZSA9IFNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoJ21lc3NhZ2UnLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFNlbmRzIGEgcGFja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBwYWNrZXQgdHlwZS5cclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLnNlbmRQYWNrZXQgPSBmdW5jdGlvbiAodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSB7XG4gICAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgICBvcHRpb25zID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCdjbG9zaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NlZCcgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG5cbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSB7XG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IG9wdGlvbnNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3BhY2tldENyZWF0ZScsIHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgICAgIGlmIChmbikgdGhpcy5vbmNlKCdmbHVzaCcsIGZuKTtcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDbG9zZXMgdGhlIGNvbm5lY3Rpb24uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zaW5nJztcblxuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgICAgICB3YWl0Rm9yVXBncmFkZSgpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkNsb3NlKCdmb3JjZWQgY2xvc2UnKTtcbiAgICAgICAgICAgICAgZGVidWcoJ3NvY2tldCBjbG9zaW5nIC0gdGVsbGluZyB0cmFuc3BvcnQgdG8gY2xvc2UnKTtcbiAgICAgICAgICAgICAgc2VsZi50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gY2xlYW51cEFuZENsb3NlKCkge1xuICAgICAgICAgICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gd2FpdEZvclVwZ3JhZGUoKSB7XG4gICAgICAgICAgICAgIC8vIHdhaXQgZm9yIHVwZ3JhZGUgdG8gZmluaXNoIHNpbmNlIHdlIGNhbid0IHNlbmQgcGFja2V0cyB3aGlsZSBwYXVzaW5nIGEgdHJhbnNwb3J0XG4gICAgICAgICAgICAgIHNlbGYub25jZSgndXBncmFkZScsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICAgIHNlbGYub25jZSgndXBncmFkZUVycm9yJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGVycm9yXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGRlYnVnKCdzb2NrZXQgZXJyb3IgJWonLCBlcnIpO1xuICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoJ3RyYW5zcG9ydCBlcnJvcicsIGVycik7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAocmVhc29uLCBkZXNjKSB7XG4gICAgICAgICAgICBpZiAoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdjbG9zaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3NvY2tldCBjbG9zZSB3aXRoIHJlYXNvbjogXCIlc1wiJywgcmVhc29uKTtcbiAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVyc1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5waW5nSW50ZXJ2YWxUaW1lcik7XG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuXG4gICAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoJ2Nsb3NlJyk7XG5cbiAgICAgICAgICAgICAgLy8gZW5zdXJlIHRyYW5zcG9ydCB3b24ndCBzdGF5IG9wZW5cbiAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcblxuICAgICAgICAgICAgICAvLyBpZ25vcmUgZnVydGhlciB0cmFuc3BvcnQgY29tbXVuaWNhdGlvblxuICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcblxuICAgICAgICAgICAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG5cbiAgICAgICAgICAgICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcblxuICAgICAgICAgICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnLCByZWFzb24sIGRlc2MpO1xuXG4gICAgICAgICAgICAgIC8vIGNsZWFuIGJ1ZmZlcnMgYWZ0ZXIsIHNvIHVzZXJzIGNhbiBzdGlsbFxuICAgICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgICAgc2VsZi53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgICBzZWxmLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEZpbHRlcnMgdXBncmFkZXMsIHJldHVybmluZyBvbmx5IHRob3NlIG1hdGNoaW5nIGNsaWVudCB0cmFuc3BvcnRzLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHNlcnZlciB1cGdyYWRlc1xyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLmZpbHRlclVwZ3JhZGVzID0gZnVuY3Rpb24gKHVwZ3JhZGVzKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWRVcGdyYWRlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGogPSB1cGdyYWRlcy5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKH5pbmRleCh0aGlzLnRyYW5zcG9ydHMsIHVwZ3JhZGVzW2ldKSkgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFVwZ3JhZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi90cmFuc3BvcnRcIjogMTksIFwiLi90cmFuc3BvcnRzXCI6IDIwLCBcImNvbXBvbmVudC1lbWl0dGVyXCI6IDI2LCBcImRlYnVnXCI6IDE0LCBcImVuZ2luZS5pby1wYXJzZXJcIjogMjcsIFwiaW5kZXhvZlwiOiAzMiwgXCJwYXJzZWpzb25cIjogMzYsIFwicGFyc2Vxc1wiOiAzNywgXCJwYXJzZXVyaVwiOiAzOCB9XSwgMTk6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHBhcnNlciA9IF9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTtcbiAgICAgICAgdmFyIEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gVHJhbnNwb3J0O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIFRyYW5zcG9ydChvcHRzKSB7XG4gICAgICAgICAgdGhpcy5wYXRoID0gb3B0cy5wYXRoO1xuICAgICAgICAgIHRoaXMuaG9zdG5hbWUgPSBvcHRzLmhvc3RuYW1lO1xuICAgICAgICAgIHRoaXMucG9ydCA9IG9wdHMucG9ydDtcbiAgICAgICAgICB0aGlzLnNlY3VyZSA9IG9wdHMuc2VjdXJlO1xuICAgICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5O1xuICAgICAgICAgIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtO1xuICAgICAgICAgIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICAgICAgICAgIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICAgICAgICAgIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gICAgICAgICAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gICAgICAgICAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgdGhpcy5wZnggPSBvcHRzLnBmeDtcbiAgICAgICAgICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICAgICAgICAgIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgICAgICAgICB0aGlzLmNlcnQgPSBvcHRzLmNlcnQ7XG4gICAgICAgICAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gICAgICAgICAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICAgICAgICAgIHRoaXMucmVqZWN0VW5hdXRob3JpemVkID0gb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgICAgICAgICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIoVHJhbnNwb3J0LnByb3RvdHlwZSk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW1pdHMgYW4gZXJyb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXHJcbiAgICAgICAgICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChtc2csIGRlc2MpIHtcbiAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gICAgICAgICAgZXJyLnR5cGUgPSAnVHJhbnNwb3J0RXJyb3InO1xuICAgICAgICAgIGVyci5kZXNjcmlwdGlvbiA9IGRlc2M7XG4gICAgICAgICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJycgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3BlbmluZyc7XG4gICAgICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoJ29wZW5pbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgICAgICAgICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUcmFuc3BvcnQgbm90IG9wZW4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gb3BlblxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICB2YXIgcGFja2V0ID0gcGFyc2VyLmRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdpdGggYSBkZWNvZGVkIHBhY2tldC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIHRoaXMuZW1pdCgncGFja2V0JywgcGFja2V0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBjbG9zZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Nsb3NlJyk7XG4gICAgICAgIH07XG4gICAgICB9LCB7IFwiY29tcG9uZW50LWVtaXR0ZXJcIjogMjYsIFwiZW5naW5lLmlvLXBhcnNlclwiOiAyNyB9XSwgMjA6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBYTUxIdHRwUmVxdWVzdCA9IF9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICAgICAgICAgIHZhciBYSFIgPSBfZGVyZXFfKCcuL3BvbGxpbmcteGhyJyk7XG4gICAgICAgICAgdmFyIEpTT05QID0gX2RlcmVxXygnLi9wb2xsaW5nLWpzb25wJyk7XG4gICAgICAgICAgdmFyIHdlYnNvY2tldCA9IF9kZXJlcV8oJy4vd2Vic29ja2V0Jyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEV4cG9ydCB0cmFuc3BvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLnBvbGxpbmcgPSBwb2xsaW5nO1xuICAgICAgICAgIGV4cG9ydHMud2Vic29ja2V0ID0gd2Vic29ja2V0O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBQb2xsaW5nIHRyYW5zcG9ydCBwb2x5bW9ycGhpYyBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAqIERlY2lkZXMgb24geGhyIHZzIGpzb25wIGJhc2VkIG9uIGZlYXR1cmUgZGV0ZWN0aW9uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBwb2xsaW5nKG9wdHMpIHtcbiAgICAgICAgICAgIHZhciB4aHI7XG4gICAgICAgICAgICB2YXIgeGQgPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciB4cyA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIGpzb25wID0gZmFsc2UgIT09IG9wdHMuanNvbnA7XG5cbiAgICAgICAgICAgIGlmIChnbG9iYWwubG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgdmFyIGlzU1NMID0gJ2h0dHBzOicgPT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICAgIHZhciBwb3J0ID0gbG9jYXRpb24ucG9ydDtcblxuICAgICAgICAgICAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgICAgICAgICAgIGlmICghcG9ydCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBpc1NTTCA/IDQ0MyA6IDgwO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgeGQgPSBvcHRzLmhvc3RuYW1lICE9IGxvY2F0aW9uLmhvc3RuYW1lIHx8IHBvcnQgIT0gb3B0cy5wb3J0O1xuICAgICAgICAgICAgICB4cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcHRzLnhkb21haW4gPSB4ZDtcbiAgICAgICAgICAgIG9wdHMueHNjaGVtZSA9IHhzO1xuICAgICAgICAgICAgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuXG4gICAgICAgICAgICBpZiAoJ29wZW4nIGluIHhociAmJiAhb3B0cy5mb3JjZUpTT05QKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgWEhSKG9wdHMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFqc29ucCkgdGhyb3cgbmV3IEVycm9yKCdKU09OUCBkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IEpTT05QKG9wdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCIuL3BvbGxpbmctanNvbnBcIjogMjEsIFwiLi9wb2xsaW5nLXhoclwiOiAyMiwgXCIuL3dlYnNvY2tldFwiOiAyNCwgXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjogMjUgfV0sIDIxOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgUG9sbGluZyA9IF9kZXJlcV8oJy4vcG9sbGluZycpO1xuICAgICAgICAgIHZhciBpbmhlcml0ID0gX2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gSlNPTlBQb2xsaW5nO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWNoZWQgcmVndWxhciBleHByZXNzaW9ucy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIHJOZXdsaW5lID0gL1xcbi9nO1xuICAgICAgICAgIHZhciByRXNjYXBlZE5ld2xpbmUgPSAvXFxcXG4vZztcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogR2xvYmFsIEpTT05QIGNhbGxiYWNrcy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGNhbGxiYWNrcztcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGJhY2tzIGNvdW50LlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBOb29wLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBlbXB0eSgpIHt9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEpTT05QIFBvbGxpbmcgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMuXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBKU09OUFBvbGxpbmcob3B0cykge1xuICAgICAgICAgICAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcblxuICAgICAgICAgICAgLy8gZGVmaW5lIGdsb2JhbCBjYWxsYmFja3MgYXJyYXkgaWYgbm90IHByZXNlbnRcbiAgICAgICAgICAgIC8vIHdlIGRvIHRoaXMgaGVyZSAobGF6aWx5KSB0byBhdm9pZCB1bm5lZWRlZCBnbG9iYWwgcG9sbHV0aW9uXG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIGNvbnNpZGVyIG11bHRpcGxlIGVuZ2luZXMgaW4gdGhlIHNhbWUgcGFnZVxuICAgICAgICAgICAgICBpZiAoIWdsb2JhbC5fX19laW8pIGdsb2JhbC5fX19laW8gPSBbXTtcbiAgICAgICAgICAgICAgY2FsbGJhY2tzID0gZ2xvYmFsLl9fX2VpbztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FsbGJhY2sgaWRlbnRpZmllclxuICAgICAgICAgICAgdGhpcy5pbmRleCA9IGNhbGxiYWNrcy5sZW5ndGg7XG5cbiAgICAgICAgICAgIC8vIGFkZCBjYWxsYmFjayB0byBqc29ucCBnbG9iYWxcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGNhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkRhdGEobXNnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBhcHBlbmQgdG8gcXVlcnkgc3RyaW5nXG4gICAgICAgICAgICB0aGlzLnF1ZXJ5LmogPSB0aGlzLmluZGV4O1xuXG4gICAgICAgICAgICAvLyBwcmV2ZW50IHNwdXJpb3VzIGVycm9ycyBmcm9tIGJlaW5nIGVtaXR0ZWQgd2hlbiB0aGUgd2luZG93IGlzIHVubG9hZGVkXG4gICAgICAgICAgICBpZiAoZ2xvYmFsLmRvY3VtZW50ICYmIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2NyaXB0KSBzZWxmLnNjcmlwdC5vbmVycm9yID0gZW1wdHk7XG4gICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgaW5oZXJpdChKU09OUFBvbGxpbmcsIFBvbGxpbmcpO1xuXG4gICAgICAgICAgLypcclxuICAgICAgICAgICAqIEpTT05QIG9ubHkgc3VwcG9ydHMgYmluYXJ5IGFzIGJhc2U2NCBlbmNvZGVkIHN0cmluZ3NcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDbG9zZXMgdGhlIHNvY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgICAgICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5mb3JtKTtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtID0gbnVsbDtcbiAgICAgICAgICAgICAgdGhpcy5pZnJhbWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5kb1BvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNjcmlwdCkge1xuICAgICAgICAgICAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICAgICAgICAgICAgdGhpcy5zY3JpcHQgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgICAgICAgICAgc2NyaXB0LnNyYyA9IHRoaXMudXJpKCk7XG4gICAgICAgICAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbCBlcnJvcicsIGUpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdO1xuICAgICAgICAgICAgaWYgKGluc2VydEF0KSB7XG4gICAgICAgICAgICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgKGRvY3VtZW50LmhlYWQgfHwgZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2NyaXB0ID0gc2NyaXB0O1xuXG4gICAgICAgICAgICB2YXIgaXNVQWdlY2tvID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvZ2Vja28vaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAgICAgICAgICBpZiAoaXNVQWdlY2tvKSB7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgICAgICAgICB9LCAxMDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFdyaXRlcyB3aXRoIGEgaGlkZGVuIGlmcmFtZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsZWQgdXBvbiBmbHVzaC5cclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBKU09OUFBvbGxpbmcucHJvdG90eXBlLmRvV3JpdGUgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJyk7XG4gICAgICAgICAgICAgIHZhciBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKTtcbiAgICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5pZnJhbWVJZCA9ICdlaW9faWZyYW1lXycgKyB0aGlzLmluZGV4O1xuICAgICAgICAgICAgICB2YXIgaWZyYW1lO1xuXG4gICAgICAgICAgICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICAgICAgICAgICAgZm9ybS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICAgICAgICAgIGZvcm0uc3R5bGUudG9wID0gJy0xMDAwcHgnO1xuICAgICAgICAgICAgICBmb3JtLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gICAgICAgICAgICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgICAgICAgICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICAgICAgICAgICAgICBmb3JtLnNldEF0dHJpYnV0ZSgnYWNjZXB0LWNoYXJzZXQnLCAndXRmLTgnKTtcbiAgICAgICAgICAgICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgICAgICAgICAgICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGZvcm0pO1xuXG4gICAgICAgICAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICAgICAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnVyaSgpO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgaW5pdElmcmFtZSgpO1xuICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBpbml0SWZyYW1lKCkge1xuICAgICAgICAgICAgICBpZiAoc2VsZi5pZnJhbWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoJ2pzb25wIHBvbGxpbmcgaWZyYW1lIHJlbW92YWwgZXJyb3InLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIGllNiBkeW5hbWljIGlmcmFtZXMgd2l0aCB0YXJnZXQ9XCJcIiBzdXBwb3J0ICh0aGFua3MgQ2hyaXMgTGFtYmFjaGVyKVxuICAgICAgICAgICAgICAgIHZhciBodG1sID0gJzxpZnJhbWUgc3JjPVwiamF2YXNjcmlwdDowXCIgbmFtZT1cIicgKyBzZWxmLmlmcmFtZUlkICsgJ1wiPic7XG4gICAgICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChodG1sKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgICAgICAgICAgICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6MCc7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO1xuXG4gICAgICAgICAgICAgIHNlbGYuZm9ybS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICAgICAgICAgICAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5pdElmcmFtZSgpO1xuXG4gICAgICAgICAgICAvLyBlc2NhcGUgXFxuIHRvIHByZXZlbnQgaXQgZnJvbSBiZWluZyBjb252ZXJ0ZWQgaW50byBcXHJcXG4gYnkgc29tZSBVQXNcbiAgICAgICAgICAgIC8vIGRvdWJsZSBlc2NhcGluZyBpcyByZXF1aXJlZCBmb3IgZXNjYXBlZCBuZXcgbGluZXMgYmVjYXVzZSB1bmVzY2FwaW5nIG9mIG5ldyBsaW5lcyBjYW4gYmUgZG9uZSBzYWZlbHkgb24gc2VydmVyLXNpZGVcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UockVzY2FwZWROZXdsaW5lLCAnXFxcXFxcbicpO1xuICAgICAgICAgICAgdGhpcy5hcmVhLnZhbHVlID0gZGF0YS5yZXBsYWNlKHJOZXdsaW5lLCAnXFxcXG4nKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgICAgaWYgKHRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICAgIHRoaXMuaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5pZnJhbWUucmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi9wb2xsaW5nXCI6IDIzLCBcImNvbXBvbmVudC1pbmhlcml0XCI6IDEzIH1dLCAyMjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBYTUxIdHRwUmVxdWVzdCA9IF9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICAgICAgICAgIHZhciBQb2xsaW5nID0gX2RlcmVxXygnLi9wb2xsaW5nJyk7XG4gICAgICAgICAgdmFyIEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO1xuICAgICAgICAgIHZhciBpbmhlcml0ID0gX2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTtcbiAgICAgICAgICB2YXIgZGVidWcgPSBfZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcteGhyJyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFhIUjtcbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRW1wdHkgZnVuY3Rpb25cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gZW1wdHkoKSB7fVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gWEhSKG9wdHMpIHtcbiAgICAgICAgICAgIFBvbGxpbmcuY2FsbCh0aGlzLCBvcHRzKTtcblxuICAgICAgICAgICAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgICAgICAgICAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aGlzLnhkID0gb3B0cy5ob3N0bmFtZSAhPSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPSBvcHRzLnBvcnQ7XG4gICAgICAgICAgICAgIHRoaXMueHMgPSBvcHRzLnNlY3VyZSAhPSBpc1NTTDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBJbmhlcml0cyBmcm9tIFBvbGxpbmcuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGluaGVyaXQoWEhSLCBQb2xsaW5nKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogWEhSIHN1cHBvcnRzIGJpbmFyeVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBYSFIucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ3JlYXRlcyBhIHJlcXVlc3QuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZFxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChvcHRzKSB7XG4gICAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICAgIG9wdHMudXJpID0gdGhpcy51cmkoKTtcbiAgICAgICAgICAgIG9wdHMueGQgPSB0aGlzLnhkO1xuICAgICAgICAgICAgb3B0cy54cyA9IHRoaXMueHM7XG4gICAgICAgICAgICBvcHRzLmFnZW50ID0gdGhpcy5hZ2VudCB8fCBmYWxzZTtcbiAgICAgICAgICAgIG9wdHMuc3VwcG9ydHNCaW5hcnkgPSB0aGlzLnN1cHBvcnRzQmluYXJ5O1xuICAgICAgICAgICAgb3B0cy5lbmFibGVzWERSID0gdGhpcy5lbmFibGVzWERSO1xuXG4gICAgICAgICAgICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICAgIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gICAgICAgICAgICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICAgICAgICAgICAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICAgICAgICAgICAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICAgICAgICAgICAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gICAgICAgICAgICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gICAgICAgICAgICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gICAgICAgICAgICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgb3B0cy5leHRyYUhlYWRlcnMgPSB0aGlzLmV4dHJhSGVhZGVycztcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KG9wdHMpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFNlbmRzIGRhdGEuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgdG8gc2VuZC5cclxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFhIUi5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICAgICAgICAgICAgdmFyIGlzQmluYXJ5ID0gdHlwZW9mIGRhdGEgIT09ICdzdHJpbmcnICYmIGRhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciByZXEgPSB0aGlzLnJlcXVlc3QoeyBtZXRob2Q6ICdQT1NUJywgZGF0YTogZGF0YSwgaXNCaW5hcnk6IGlzQmluYXJ5IH0pO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmVxLm9uKCdzdWNjZXNzJywgZm4pO1xuICAgICAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkVycm9yKCd4aHIgcG9zdCBlcnJvcicsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuc2VuZFhociA9IHJlcTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBYSFIucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRlYnVnKCd4aHIgcG9sbCcpO1xuICAgICAgICAgICAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCgpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgcmVxLm9uKCdkYXRhJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkRhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlcS5vbignZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgIHNlbGYub25FcnJvcigneGhyIHBvbGwgZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBSZXF1ZXN0KG9wdHMpIHtcbiAgICAgICAgICAgIHRoaXMubWV0aG9kID0gb3B0cy5tZXRob2QgfHwgJ0dFVCc7XG4gICAgICAgICAgICB0aGlzLnVyaSA9IG9wdHMudXJpO1xuICAgICAgICAgICAgdGhpcy54ZCA9ICEhb3B0cy54ZDtcbiAgICAgICAgICAgIHRoaXMueHMgPSAhIW9wdHMueHM7XG4gICAgICAgICAgICB0aGlzLmFzeW5jID0gZmFsc2UgIT09IG9wdHMuYXN5bmM7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT0gb3B0cy5kYXRhID8gb3B0cy5kYXRhIDogbnVsbDtcbiAgICAgICAgICAgIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50O1xuICAgICAgICAgICAgdGhpcy5pc0JpbmFyeSA9IG9wdHMuaXNCaW5hcnk7XG4gICAgICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gb3B0cy5zdXBwb3J0c0JpbmFyeTtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAgICAgICAgICAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICAgICAgICAgICAgdGhpcy5rZXkgPSBvcHRzLmtleTtcbiAgICAgICAgICAgIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZTtcbiAgICAgICAgICAgIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgICAgICAgICAgIHRoaXMuY2EgPSBvcHRzLmNhO1xuICAgICAgICAgICAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzO1xuICAgICAgICAgICAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAgICAgICAgICAgLy8gb3RoZXIgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG5cbiAgICAgICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBFbWl0dGVyKFJlcXVlc3QucHJvdG90eXBlKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ3JlYXRlcyB0aGUgWEhSIG9iamVjdCBhbmQgc2VuZHMgdGhlIHJlcXVlc3QuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBvcHRzID0geyBhZ2VudDogdGhpcy5hZ2VudCwgeGRvbWFpbjogdGhpcy54ZCwgeHNjaGVtZTogdGhpcy54cywgZW5hYmxlc1hEUjogdGhpcy5lbmFibGVzWERSIH07XG5cbiAgICAgICAgICAgIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgICAgICAgICAgIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gICAgICAgICAgICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gICAgICAgICAgICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gICAgICAgICAgICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgICAgICAgICAgIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgICAgICAgICAgIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgICAgICAgICAgIHZhciB4aHIgPSB0aGlzLnhociA9IG5ldyBYTUxIdHRwUmVxdWVzdChvcHRzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgZGVidWcoJ3hociBvcGVuICVzOiAlcycsIHRoaXMubWV0aG9kLCB0aGlzLnVyaSk7XG4gICAgICAgICAgICAgIHhoci5vcGVuKHRoaXMubWV0aG9kLCB0aGlzLnVyaSwgdGhpcy5hc3luYyk7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCB0aGlzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgIGlmICh0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBoYXMgdG8gYmUgZG9uZSBhZnRlciBvcGVuIGJlY2F1c2UgRmlyZWZveCBpcyBzdHVwaWRcbiAgICAgICAgICAgICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEzMjE2OTAzL2dldC1iaW5hcnktZGF0YS13aXRoLXhtbGh0dHByZXF1ZXN0LWluLWEtZmlyZWZveC1leHRlbnNpb25cbiAgICAgICAgICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2FycmF5YnVmZmVyJztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICgnUE9TVCcgPT0gdGhpcy5tZXRob2QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIGllNiBjaGVja1xuICAgICAgICAgICAgICBpZiAoJ3dpdGhDcmVkZW50aWFscycgaW4geGhyKSB7XG4gICAgICAgICAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgICAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKDQgIT0geGhyLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGlmICgyMDAgPT0geGhyLnN0YXR1cyB8fCAxMjIzID09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkxvYWQoKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIuc3RhdHVzKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGRlYnVnKCd4aHIgZGF0YSAlcycsIHRoaXMuZGF0YSk7XG4gICAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmaHJvbSB0aGUgY29uc3RydWN0b3JcbiAgICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAgIC8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBSZXF1ZXN0LnByb3RvdHlwZS5vblN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3N1Y2Nlc3MnKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCBpZiB3ZSBoYXZlIGRhdGEuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RhdGEnLCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGVkIHVwb24gZXJyb3IuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDbGVhbnMgdXAgaG91c2UuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLmNsZWFudXAgPSBmdW5jdGlvbiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHRoaXMueGhyIHx8IG51bGwgPT09IHRoaXMueGhyKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHhtbGh0dHByZXF1ZXN0XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNYRFIoKSkge1xuICAgICAgICAgICAgICB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZyb21FcnJvcikge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChnbG9iYWwuZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMueGhyID0gbnVsbDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBSZXF1ZXN0LnByb3RvdHlwZS5vbkxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHZhciBjb250ZW50VHlwZTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdDb250ZW50LVR5cGUnKS5zcGxpdCgnOycpWzBdO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICBpZiAoY29udGVudFR5cGUgPT09ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IHRoaXMueGhyLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVpOEFyciA9IG5ldyBVaW50OEFycmF5KHRoaXMueGhyLnJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdGFBcnJheSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpZHggPSAwLCBsZW5ndGggPSB1aThBcnIubGVuZ3RoOyBpZHggPCBsZW5ndGg7IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGF0YUFycmF5LnB1c2godWk4QXJyW2lkeF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgZGF0YUFycmF5KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG51bGwgIT0gZGF0YSkge1xuICAgICAgICAgICAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiBpdCBoYXMgWERvbWFpblJlcXVlc3QuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLmhhc1hEUiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiAhdGhpcy54cyAmJiB0aGlzLmVuYWJsZXNYRFI7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxyXG4gICAgICAgICAgICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xyXG4gICAgICAgICAgICogZW1pdHRlZC5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbiAgICAgICAgICAgIGlmIChnbG9iYWwuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KCdvbnVubG9hZCcsIHVubG9hZEhhbmRsZXIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgdW5sb2FkSGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHVubG9hZEhhbmRsZXIoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW2ldLmFib3J0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi9wb2xsaW5nXCI6IDIzLCBcImNvbXBvbmVudC1lbWl0dGVyXCI6IDI2LCBcImNvbXBvbmVudC1pbmhlcml0XCI6IDEzLCBcImRlYnVnXCI6IDE0LCBcInhtbGh0dHByZXF1ZXN0LXNzbFwiOiAyNSB9XSwgMjM6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIFRyYW5zcG9ydCA9IF9kZXJlcV8oJy4uL3RyYW5zcG9ydCcpO1xuICAgICAgICB2YXIgcGFyc2VxcyA9IF9kZXJlcV8oJ3BhcnNlcXMnKTtcbiAgICAgICAgdmFyIHBhcnNlciA9IF9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBfZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuICAgICAgICB2YXIgeWVhc3QgPSBfZGVyZXFfKCd5ZWFzdCcpO1xuICAgICAgICB2YXIgZGVidWcgPSBfZGVyZXFfKCdkZWJ1ZycpKCdlbmdpbmUuaW8tY2xpZW50OnBvbGxpbmcnKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFBvbGxpbmc7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSXMgWEhSMiBzdXBwb3J0ZWQ/XHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBYTUxIdHRwUmVxdWVzdCA9IF9kZXJlcV8oJ3htbGh0dHByZXF1ZXN0LXNzbCcpO1xuICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoeyB4ZG9tYWluOiBmYWxzZSB9KTtcbiAgICAgICAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBvbGxpbmcgaW50ZXJmYWNlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBQb2xsaW5nKG9wdHMpIHtcbiAgICAgICAgICB2YXIgZm9yY2VCYXNlNjQgPSBvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgICAgICAgaWYgKCFoYXNYSFIyIHx8IGZvcmNlQmFzZTY0KSB7XG4gICAgICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgaW5oZXJpdChQb2xsaW5nLCBUcmFuc3BvcnQpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRyYW5zcG9ydCBuYW1lLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAncG9sbGluZyc7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxyXG4gICAgICAgICAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucG9sbCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhdXNlcyBwb2xsaW5nLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAob25QYXVzZSkge1xuICAgICAgICAgIHZhciBwZW5kaW5nID0gMDtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAncGF1c2luZyc7XG5cbiAgICAgICAgICBmdW5jdGlvbiBwYXVzZSgpIHtcbiAgICAgICAgICAgIGRlYnVnKCdwYXVzZWQnKTtcbiAgICAgICAgICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdwYXVzZWQnO1xuICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcgfHwgIXRoaXMud3JpdGFibGUpIHtcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgcG9sbGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgICAgdGhpcy5vbmNlKCdwb2xsQ29tcGxldGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSBwb2xsaW5nIGNvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICAgICAgICAgIGRlYnVnKCd3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlJyk7XG4gICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgIHRoaXMub25jZSgnZHJhaW4nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3ByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcGF1c2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3RhcnRzIHBvbGxpbmcgY3ljbGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFBvbGxpbmcucHJvdG90eXBlLnBvbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVidWcoJ3BvbGxpbmcnKTtcbiAgICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuZG9Qb2xsKCk7XG4gICAgICAgICAgdGhpcy5lbWl0KCdwb2xsJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICBkZWJ1ZygncG9sbGluZyBnb3QgZGF0YSAlcycsIGRhdGEpO1xuICAgICAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKHBhY2tldCwgaW5kZXgsIHRvdGFsKSB7XG4gICAgICAgICAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgICAgICAgICBpZiAoJ29wZW5pbmcnID09IHNlbGYucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICBzZWxmLm9uT3BlbigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiBpdHMgYSBjbG9zZSBwYWNrZXQsIHdlIGNsb3NlIHRoZSBvbmdvaW5nIHJlcXVlc3RzXG4gICAgICAgICAgICBpZiAoJ2Nsb3NlJyA9PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgICAgICAgICBzZWxmLm9uUGFja2V0KHBhY2tldCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGRlY29kZSBwYXlsb2FkXG4gICAgICAgICAgcGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSwgY2FsbGJhY2spO1xuXG4gICAgICAgICAgLy8gaWYgYW4gZXZlbnQgZGlkIG5vdCB0cmlnZ2VyIGNsb3NpbmdcbiAgICAgICAgICBpZiAoJ2Nsb3NlZCcgIT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3BvbGxDb21wbGV0ZScpO1xuXG4gICAgICAgICAgICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICB0aGlzLnBvbGwoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEZvciBwb2xsaW5nLCBzZW5kIGEgY2xvc2UgcGFja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUuZG9DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgICAgIGRlYnVnKCd3cml0aW5nIGNsb3NlIHBhY2tldCcpO1xuICAgICAgICAgICAgc2VsZi53cml0ZShbeyB0eXBlOiAnY2xvc2UnIH1dKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgZGVidWcoJ3RyYW5zcG9ydCBvcGVuIC0gY2xvc2luZycpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICBkZWJ1ZygndHJhbnNwb3J0IG5vdCBvcGVuIC0gZGVmZXJyaW5nIGNsb3NlJyk7XG4gICAgICAgICAgICB0aGlzLm9uY2UoJ29wZW4nLCBjbG9zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgcGFja2V0c1xyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGRyYWluIGNhbGxiYWNrXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrZm4gPSBmdW5jdGlvbiBjYWxsYmFja2ZuKCkge1xuICAgICAgICAgICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICBwYXJzZXIuZW5jb2RlUGF5bG9hZChwYWNrZXRzLCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgc2VsZi5kb1dyaXRlKGRhdGEsIGNhbGxiYWNrZm4pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS51cmkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICAgICAgICAgIHZhciBwb3J0ID0gJyc7XG5cbiAgICAgICAgICAvLyBjYWNoZSBidXN0aW5nIGlzIGZvcmNlZFxuICAgICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgICAgICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSAmJiAhcXVlcnkuc2lkKSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gICAgICAgICAgLy8gYXZvaWQgcG9ydCBpZiBkZWZhdWx0IGZvciBzY2hlbWFcbiAgICAgICAgICBpZiAodGhpcy5wb3J0ICYmICgnaHR0cHMnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gNDQzIHx8ICdodHRwJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDgwKSkge1xuICAgICAgICAgICAgcG9ydCA9ICc6JyArIHRoaXMucG9ydDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICBxdWVyeSA9ICc/JyArIHF1ZXJ5O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICAgICAgICAgIHJldHVybiBzY2hlbWEgKyAnOi8vJyArIChpcHY2ID8gJ1snICsgdGhpcy5ob3N0bmFtZSArICddJyA6IHRoaXMuaG9zdG5hbWUpICsgcG9ydCArIHRoaXMucGF0aCArIHF1ZXJ5O1xuICAgICAgICB9O1xuICAgICAgfSwgeyBcIi4uL3RyYW5zcG9ydFwiOiAxOSwgXCJjb21wb25lbnQtaW5oZXJpdFwiOiAxMywgXCJkZWJ1Z1wiOiAxNCwgXCJlbmdpbmUuaW8tcGFyc2VyXCI6IDI3LCBcInBhcnNlcXNcIjogMzcsIFwieG1saHR0cHJlcXVlc3Qtc3NsXCI6IDI1LCBcInllYXN0XCI6IDQ1IH1dLCAyNDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBUcmFuc3BvcnQgPSBfZGVyZXFfKCcuLi90cmFuc3BvcnQnKTtcbiAgICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO1xuICAgICAgICAgIHZhciBwYXJzZXFzID0gX2RlcmVxXygncGFyc2VxcycpO1xuICAgICAgICAgIHZhciBpbmhlcml0ID0gX2RlcmVxXygnY29tcG9uZW50LWluaGVyaXQnKTtcbiAgICAgICAgICB2YXIgeWVhc3QgPSBfZGVyZXFfKCd5ZWFzdCcpO1xuICAgICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6d2Vic29ja2V0Jyk7XG4gICAgICAgICAgdmFyIEJyb3dzZXJXZWJTb2NrZXQgPSBnbG9iYWwuV2ViU29ja2V0IHx8IGdsb2JhbC5Nb3pXZWJTb2NrZXQ7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEdldCBlaXRoZXIgdGhlIGBXZWJTb2NrZXRgIG9yIGBNb3pXZWJTb2NrZXRgIGdsb2JhbHNcclxuICAgICAgICAgICAqIGluIHRoZSBicm93c2VyIG9yIHRyeSB0byByZXNvbHZlIFdlYlNvY2tldC1jb21wYXRpYmxlXHJcbiAgICAgICAgICAgKiBpbnRlcmZhY2UgZXhwb3NlZCBieSBgd3NgIGZvciBOb2RlLWxpa2UgZW52aXJvbm1lbnQuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBXZWJTb2NrZXQgPSBCcm93c2VyV2ViU29ja2V0O1xuICAgICAgICAgIGlmICghV2ViU29ja2V0ICYmIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBXZWJTb2NrZXQgPSBfZGVyZXFfKCd3cycpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFdTO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkge09iamVjdH0gY29ubmVjdGlvbiBvcHRpb25zXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBXUyhvcHRzKSB7XG4gICAgICAgICAgICB2YXIgZm9yY2VCYXNlNjQgPSBvcHRzICYmIG9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgICAgICAgICBpZiAoZm9yY2VCYXNlNjQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSA9IG9wdHMucGVyTWVzc2FnZURlZmxhdGU7XG4gICAgICAgICAgICBUcmFuc3BvcnQuY2FsbCh0aGlzLCBvcHRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBpbmhlcml0KFdTLCBUcmFuc3BvcnQpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBUcmFuc3BvcnQgbmFtZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4gICAgICAgICAgLypcclxuICAgICAgICAgICAqIFdlYlNvY2tldHMgc3VwcG9ydCBiaW5hcnlcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgV1MucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogT3BlbnMgc29ja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUuZG9PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrKCkpIHtcbiAgICAgICAgICAgICAgLy8gbGV0IHByb2JlIHRpbWVvdXRcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgdXJpID0gdGhpcy51cmkoKTtcbiAgICAgICAgICAgIHZhciBwcm90b2NvbHMgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgb3B0cyA9IHtcbiAgICAgICAgICAgICAgYWdlbnQ6IHRoaXMuYWdlbnQsXG4gICAgICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICAgIG9wdHMucGZ4ID0gdGhpcy5wZng7XG4gICAgICAgICAgICBvcHRzLmtleSA9IHRoaXMua2V5O1xuICAgICAgICAgICAgb3B0cy5wYXNzcGhyYXNlID0gdGhpcy5wYXNzcGhyYXNlO1xuICAgICAgICAgICAgb3B0cy5jZXJ0ID0gdGhpcy5jZXJ0O1xuICAgICAgICAgICAgb3B0cy5jYSA9IHRoaXMuY2E7XG4gICAgICAgICAgICBvcHRzLmNpcGhlcnMgPSB0aGlzLmNpcGhlcnM7XG4gICAgICAgICAgICBvcHRzLnJlamVjdFVuYXV0aG9yaXplZCA9IHRoaXMucmVqZWN0VW5hdXRob3JpemVkO1xuICAgICAgICAgICAgaWYgKHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLndzID0gQnJvd3NlcldlYlNvY2tldCA/IG5ldyBXZWJTb2NrZXQodXJpKSA6IG5ldyBXZWJTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy53cy5iaW5hcnlUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy53cy5zdXBwb3J0cyAmJiB0aGlzLndzLnN1cHBvcnRzLmJpbmFyeSkge1xuICAgICAgICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy53cy5iaW5hcnlUeXBlID0gJ2J1ZmZlcic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQWRkcyBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHNvY2tldFxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMud3Mub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLm9uT3BlbigpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMud3Mub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy53cy5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkVycm9yKCd3ZWJzb2NrZXQgZXJyb3InLCBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogT3ZlcnJpZGUgYG9uRGF0YWAgdG8gdXNlIGEgdGltZXIgb24gaU9TLlxyXG4gICAgICAgICAgICogU2VlOiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9tbG91Z2hyYW4vMjA1MjAwNlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvciAmJiAvaVBhZHxpUGhvbmV8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgICAgICAgIFdTLnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhLmNhbGwoc2VsZiwgZGF0YSk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFdyaXRlcyBkYXRhIHRvIHNvY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gICAgICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgICAgICB2YXIgdG90YWwgPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdG90YWw7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgKGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICAgICAgICAgICAgICBwYXJzZXIuZW5jb2RlUGFja2V0KHBhY2tldCwgc2VsZi5zdXBwb3J0c0JpbmFyeSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFja2V0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gcGFja2V0Lm9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5wZXJNZXNzYWdlRGVmbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBsZW4gPSAnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSA/IGdsb2JhbC5CdWZmZXIuYnl0ZUxlbmd0aChkYXRhKSA6IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPCBzZWxmLnBlck1lc3NhZ2VEZWZsYXRlLnRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvL1NvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgICAgICAgICAgIC8vaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgICAgICAgICAgICAvL3Rocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYud3Muc2VuZChkYXRhLCBvcHRzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1Zygnd2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudCcpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IGRvbmUoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSkocGFja2V0c1tpXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgICAgICAgIHNlbGYuZW1pdCgnZmx1c2gnKTtcblxuICAgICAgICAgICAgICAvLyBmYWtlIGRyYWluXG4gICAgICAgICAgICAgIC8vIGRlZmVyIHRvIG5leHQgdGljayB0byBhbGxvdyBTb2NrZXQgdG8gY2xlYXIgd3JpdGVCdWZmZXJcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdkcmFpbicpO1xuICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBjbG9zZVxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENsb3NlcyBzb2NrZXQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aGlzLndzLmNsb3NlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgV1MucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgICAgICB2YXIgc2NoZW1hID0gdGhpcy5zZWN1cmUgPyAnd3NzJyA6ICd3cyc7XG4gICAgICAgICAgICB2YXIgcG9ydCA9ICcnO1xuXG4gICAgICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICAgICAgaWYgKHRoaXMucG9ydCAmJiAoJ3dzcycgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA0NDMgfHwgJ3dzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDgwKSkge1xuICAgICAgICAgICAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICAgICAgaWYgKHRoaXMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgICAgICAgICAgcXVlcnlbdGhpcy50aW1lc3RhbXBQYXJhbV0gPSB5ZWFzdCgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBxdWVyeSA9IHBhcnNlcXMuZW5jb2RlKHF1ZXJ5KTtcblxuICAgICAgICAgICAgLy8gcHJlcGVuZCA/IHRvIHF1ZXJ5XG4gICAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpcHY2ID0gdGhpcy5ob3N0bmFtZS5pbmRleE9mKCc6JykgIT09IC0xO1xuICAgICAgICAgICAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRmVhdHVyZSBkZXRlY3Rpb24gZm9yIFdlYlNvY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB3aGV0aGVyIHRoaXMgdHJhbnNwb3J0IGlzIGF2YWlsYWJsZS5cclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhIVdlYlNvY2tldCAmJiAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCAmJiB0aGlzLm5hbWUgPT09IFdTLnByb3RvdHlwZS5uYW1lKTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwgeyBcIi4uL3RyYW5zcG9ydFwiOiAxOSwgXCJjb21wb25lbnQtaW5oZXJpdFwiOiAxMywgXCJkZWJ1Z1wiOiAxNCwgXCJlbmdpbmUuaW8tcGFyc2VyXCI6IDI3LCBcInBhcnNlcXNcIjogMzcsIFwid3NcIjogdW5kZWZpbmVkLCBcInllYXN0XCI6IDQ1IH1dLCAyNTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLy8gYnJvd3NlciBzaGltIGZvciB4bWxodHRwcmVxdWVzdCBtb2R1bGVcbiAgICAgICAgdmFyIGhhc0NPUlMgPSBfZGVyZXFfKCdoYXMtY29ycycpO1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgICB2YXIgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcblxuICAgICAgICAgIC8vIHNjaGVtZSBtdXN0IGJlIHNhbWUgd2hlbiB1c2lnbiBYRG9tYWluUmVxdWVzdFxuICAgICAgICAgIC8vIGh0dHA6Ly9ibG9ncy5tc2RuLmNvbS9iL2llaW50ZXJuYWxzL2FyY2hpdmUvMjAxMC8wNS8xMy94ZG9tYWlucmVxdWVzdC1yZXN0cmljdGlvbnMtbGltaXRhdGlvbnMtYW5kLXdvcmthcm91bmRzLmFzcHhcbiAgICAgICAgICB2YXIgeHNjaGVtZSA9IG9wdHMueHNjaGVtZTtcblxuICAgICAgICAgIC8vIFhEb21haW5SZXF1ZXN0IGhhcyBhIGZsb3cgb2Ygbm90IHNlbmRpbmcgY29va2llLCB0aGVyZWZvcmUgaXQgc2hvdWxkIGJlIGRpc2FibGVkIGFzIGEgZGVmYXVsdC5cbiAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9lbmdpbmUuaW8tY2xpZW50L3B1bGwvMjE3XG4gICAgICAgICAgdmFyIGVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgICAgICAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICAvLyBVc2UgWERvbWFpblJlcXVlc3QgZm9yIElFOCBpZiBlbmFibGVzWERSIGlzIHRydWVcbiAgICAgICAgICAvLyBiZWNhdXNlIGxvYWRpbmcgYmFyIGtlZXBzIGZsYXNoaW5nIHdoZW4gdXNpbmcganNvbnAtcG9sbGluZ1xuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS95dWppb3Nha2Evc29ja2UuaW8taWU4LWxvYWRpbmctZXhhbXBsZVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF4c2NoZW1lICYmIGVuYWJsZXNYRFIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICAgICAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTWljcm9zb2Z0LlhNTEhUVFAnKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSwgeyBcImhhcy1jb3JzXCI6IDMxIH1dLCAyNjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgICAgICAgICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNaXhpbiB0aGUgZW1pdHRlciBwcm9wZXJ0aWVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH1cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEVtaXR0ZXIucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgICh0aGlzLl9jYWxsYmFja3NbZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXHJcbiAgICAgICAgICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAgICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgICAgc2VsZi5vZmYoZXZlbnQsIG9uKTtcbiAgICAgICAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgb24uZm4gPSBmbjtcbiAgICAgICAgICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICAgICAgICAgKiByZWdpc3RlcmVkIGNhbGxiYWNrcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG5cbiAgICAgICAgICAvLyBhbGxcbiAgICAgICAgICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNwZWNpZmljIGV2ZW50XG4gICAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgLy8gcmVtb3ZlIGFsbCBoYW5kbGVyc1xuICAgICAgICAgIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgICAgICAgICB2YXIgY2I7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgICAgICAgICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gICAgICAgICAgaWYgKGNhbGxiYWNrcykge1xuICAgICAgICAgICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgICAgICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAgICAgICAgIHJldHVybiB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENoZWNrIGlmIHRoaXMgZW1pdHRlciBoYXMgYGV2ZW50YCBoYW5kbGVycy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gISF0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAyNzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBrZXlzID0gX2RlcmVxXygnLi9rZXlzJyk7XG4gICAgICAgICAgdmFyIGhhc0JpbmFyeSA9IF9kZXJlcV8oJ2hhcy1iaW5hcnknKTtcbiAgICAgICAgICB2YXIgc2xpY2VCdWZmZXIgPSBfZGVyZXFfKCdhcnJheWJ1ZmZlci5zbGljZScpO1xuICAgICAgICAgIHZhciBiYXNlNjRlbmNvZGVyID0gX2RlcmVxXygnYmFzZTY0LWFycmF5YnVmZmVyJyk7XG4gICAgICAgICAgdmFyIGFmdGVyID0gX2RlcmVxXygnYWZ0ZXInKTtcbiAgICAgICAgICB2YXIgdXRmOCA9IF9kZXJlcV8oJ3V0ZjgnKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgYW4gYW5kcm9pZCBicm93c2VyLiBUaGF0IHJlcXVpcmVzIHVzIHRvIHVzZVxyXG4gICAgICAgICAgICogQXJyYXlCdWZmZXIgd2l0aCBwb2xsaW5nIHRyYW5zcG9ydHMuLi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBodHRwOi8vZ2hpbmRhLm5ldC9qcGVnLWJsb2ItYWpheC1hbmRyb2lkL1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgaXNBbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQW5kcm9pZC9pKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2sgaWYgd2UgYXJlIHJ1bm5pbmcgaW4gUGhhbnRvbUpTLlxyXG4gICAgICAgICAgICogVXBsb2FkaW5nIGEgQmxvYiB3aXRoIFBoYW50b21KUyBkb2VzIG5vdCB3b3JrIGNvcnJlY3RseSwgYXMgcmVwb3J0ZWQgaGVyZTpcclxuICAgICAgICAgICAqIGh0dHBzOi8vZ2l0aHViLmNvbS9hcml5YS9waGFudG9tanMvaXNzdWVzLzExMzk1XHJcbiAgICAgICAgICAgKiBAdHlwZSBib29sZWFuXHJcbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgaXNQaGFudG9tSlMgPSAvUGhhbnRvbUpTL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogV2hlbiB0cnVlLCBhdm9pZHMgdXNpbmcgQmxvYnMgdG8gZW5jb2RlIHBheWxvYWRzLlxyXG4gICAgICAgICAgICogQHR5cGUgYm9vbGVhblxyXG4gICAgICAgICAgICovXG4gICAgICAgICAgdmFyIGRvbnRTZW5kQmxvYnMgPSBpc0FuZHJvaWQgfHwgaXNQaGFudG9tSlM7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEN1cnJlbnQgcHJvdG9jb2wgdmVyc2lvbi5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5wcm90b2NvbCA9IDM7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFBhY2tldCB0eXBlcy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIHBhY2tldHMgPSBleHBvcnRzLnBhY2tldHMgPSB7XG4gICAgICAgICAgICBvcGVuOiAwLCAvLyBub24td3NcbiAgICAgICAgICAgIGNsb3NlOiAxLCAvLyBub24td3NcbiAgICAgICAgICAgIHBpbmc6IDIsXG4gICAgICAgICAgICBwb25nOiAzLFxuICAgICAgICAgICAgbWVzc2FnZTogNCxcbiAgICAgICAgICAgIHVwZ3JhZGU6IDUsXG4gICAgICAgICAgICBub29wOiA2XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHZhciBwYWNrZXRzbGlzdCA9IGtleXMocGFja2V0cyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFByZW1hZGUgZXJyb3IgcGFja2V0LlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgZXJyID0geyB0eXBlOiAnZXJyb3InLCBkYXRhOiAncGFyc2VyIGVycm9yJyB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDcmVhdGUgYSBibG9iIGFwaSBldmVuIGZvciBibG9iIGJ1aWxkZXIgd2hlbiB2ZW5kb3IgcHJlZml4ZXMgZXhpc3RcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIEJsb2IgPSBfZGVyZXFfKCdibG9iJyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZXMgYSBwYWNrZXQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogICAgIDxwYWNrZXQgdHlwZSBpZD4gWyA8ZGF0YT4gXVxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEV4YW1wbGU6XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogICAgIDVoZWxsbyB3b3JsZFxyXG4gICAgICAgICAgICogICAgIDNcclxuICAgICAgICAgICAqICAgICA0XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQmluYXJ5IGlzIGVuY29kZWQgaW4gYW4gaWRlbnRpY2FsIHByaW5jaXBsZVxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCB1dGY4ZW5jb2RlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgICAgICAgICAgIHN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiB1dGY4ZW5jb2RlKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gdXRmOGVuY29kZTtcbiAgICAgICAgICAgICAgdXRmOGVuY29kZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gcGFja2V0LmRhdGEgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IHBhY2tldC5kYXRhLmJ1ZmZlciB8fCBwYWNrZXQuZGF0YTtcblxuICAgICAgICAgICAgaWYgKGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtaWdodCBiZSBhbiBvYmplY3Qgd2l0aCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuYmFzZTY0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlbmRpbmcgZGF0YSBhcyBhIHV0Zi04IHN0cmluZ1xuICAgICAgICAgICAgdmFyIGVuY29kZWQgPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcblxuICAgICAgICAgICAgLy8gZGF0YSBmcmFnbWVudCBpcyBvcHRpb25hbFxuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gcGFja2V0LmRhdGEpIHtcbiAgICAgICAgICAgICAgZW5jb2RlZCArPSB1dGY4ZW5jb2RlID8gdXRmOC5lbmNvZGUoU3RyaW5nKHBhY2tldC5kYXRhKSkgOiBTdHJpbmcocGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soJycgKyBlbmNvZGVkKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gZW5jb2RlQmFzZTY0T2JqZWN0KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIHBhY2tldCBkYXRhIGlzIGFuIG9iamVjdCB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogZGF0YUFzQmFzZTY0U3RyaW5nIH1cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXSArIHBhY2tldC5kYXRhLmRhdGE7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBFbmNvZGUgcGFja2V0IGhlbHBlcnMgZm9yIGJpbmFyeSB0eXBlc1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBlbmNvZGVBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gcGFja2V0LmRhdGE7XG4gICAgICAgICAgICB2YXIgY29udGVudEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICAgICAgICB2YXIgcmVzdWx0QnVmZmVyID0gbmV3IFVpbnQ4QXJyYXkoMSArIGRhdGEuYnl0ZUxlbmd0aCk7XG5cbiAgICAgICAgICAgIHJlc3VsdEJ1ZmZlclswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250ZW50QXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgcmVzdWx0QnVmZmVyW2kgKyAxXSA9IGNvbnRlbnRBcnJheVtpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEJ1ZmZlci5idWZmZXIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZUJsb2JBc0FycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcGFja2V0LmRhdGEgPSBmci5yZXN1bHQ7XG4gICAgICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHRydWUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZnIucmVhZEFzQXJyYXlCdWZmZXIocGFja2V0LmRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZUJsb2IocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZG9udFNlbmRCbG9icykge1xuICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgICAgICAgICBsZW5ndGhbMF0gPSBwYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgICAgICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW2xlbmd0aC5idWZmZXIsIHBhY2tldC5kYXRhXSk7XG5cbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhibG9iKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZXMgYSBwYWNrZXQgd2l0aCBiaW5hcnkgZGF0YSBpbiBhIGJhc2U2NCBzdHJpbmdcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0LCBoYXMgYHR5cGVgIGFuZCBgZGF0YWBcclxuICAgICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gYmFzZTY0IGVuY29kZWQgbWVzc2FnZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICdiJyArIGV4cG9ydHMucGFja2V0c1twYWNrZXQudHlwZV07XG4gICAgICAgICAgICBpZiAoQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIGdsb2JhbC5CbG9iKSB7XG4gICAgICAgICAgICAgIHZhciBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgIGZyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgYjY0ID0gZnIucmVzdWx0LnNwbGl0KCcsJylbMV07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobWVzc2FnZSArIGI2NCk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIHJldHVybiBmci5yZWFkQXNEYXRhVVJMKHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGI2NGRhdGE7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB3aXRoIHR5cGVkIGFycmF5c1xuICAgICAgICAgICAgICB2YXIgdHlwZWQgPSBuZXcgVWludDhBcnJheShwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgIHZhciBiYXNpYyA9IG5ldyBBcnJheSh0eXBlZC5sZW5ndGgpO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYmFzaWNbaV0gPSB0eXBlZFtpXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBiNjRkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBiYXNpYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtZXNzYWdlICs9IGdsb2JhbC5idG9hKGI2NGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG1lc3NhZ2UpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIERlY29kZXMgYSBwYWNrZXQuIENoYW5nZXMgZm9ybWF0IHRvIEJsb2IgaWYgcmVxdWVzdGVkLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIHV0ZjhkZWNvZGUpIHtcbiAgICAgICAgICAgIC8vIFN0cmluZyBkYXRhXG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgPT0gJ3N0cmluZycgfHwgZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLmNoYXJBdCgwKSA9PSAnYicpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQoZGF0YS5zdWJzdHIoMSksIGJpbmFyeVR5cGUpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHV0ZjhkZWNvZGUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IHV0ZjguZGVjb2RlKGRhdGEpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciB0eXBlID0gZGF0YS5jaGFyQXQoMCk7XG5cbiAgICAgICAgICAgICAgaWYgKE51bWJlcih0eXBlKSAhPSB0eXBlIHx8ICFwYWNrZXRzbGlzdFt0eXBlXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlcnI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IGRhdGEuc3Vic3RyaW5nKDEpIH07XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0gfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXNBcnJheSA9IG5ldyBVaW50OEFycmF5KGRhdGEpO1xuICAgICAgICAgICAgdmFyIHR5cGUgPSBhc0FycmF5WzBdO1xuICAgICAgICAgICAgdmFyIHJlc3QgPSBzbGljZUJ1ZmZlcihkYXRhLCAxKTtcbiAgICAgICAgICAgIGlmIChCbG9iICYmIGJpbmFyeVR5cGUgPT09ICdibG9iJykge1xuICAgICAgICAgICAgICByZXN0ID0gbmV3IEJsb2IoW3Jlc3RdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IHBhY2tldHNsaXN0W3R5cGVdLCBkYXRhOiByZXN0IH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRGVjb2RlcyBhIHBhY2tldCBlbmNvZGVkIGluIGEgYmFzZTY0IHN0cmluZ1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXHJcbiAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggYHR5cGVgIGFuZCBgZGF0YWAgKGlmIGFueSlcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5kZWNvZGVCYXNlNjRQYWNrZXQgPSBmdW5jdGlvbiAobXNnLCBiaW5hcnlUeXBlKSB7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHBhY2tldHNsaXN0W21zZy5jaGFyQXQoMCldO1xuICAgICAgICAgICAgaWYgKCFnbG9iYWwuQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogeyBiYXNlNjQ6IHRydWUsIGRhdGE6IG1zZy5zdWJzdHIoMSkgfSB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZGF0YSA9IGJhc2U2NGVuY29kZXIuZGVjb2RlKG1zZy5zdWJzdHIoMSkpO1xuXG4gICAgICAgICAgICBpZiAoYmluYXJ5VHlwZSA9PT0gJ2Jsb2InICYmIEJsb2IpIHtcbiAgICAgICAgICAgICAgZGF0YSA9IG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB7IHR5cGU6IHR5cGUsIGRhdGE6IGRhdGEgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICAgPGxlbmd0aD46ZGF0YVxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEV4YW1wbGU6XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogICAgIDExOmhlbGxvIHdvcmxkMjpoaVxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIElmIGFueSBjb250ZW50cyBhcmUgYmluYXJ5LCB0aGV5IHdpbGwgYmUgZW5jb2RlZCBhcyBiYXNlNjQgc3RyaW5ncy4gQmFzZTY0XHJcbiAgICAgICAgICAgKiBlbmNvZGVkIHN0cmluZ3MgYXJlIG1hcmtlZCB3aXRoIGEgYiBiZWZvcmUgdGhlIGxlbmd0aCBzcGVjaWZpZXJcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzdXBwb3J0c0JpbmFyeSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gc3VwcG9ydHNCaW5hcnk7XG4gICAgICAgICAgICAgIHN1cHBvcnRzQmluYXJ5ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlzQmluYXJ5ID0gaGFzQmluYXJ5KHBhY2tldHMpO1xuXG4gICAgICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkgJiYgaXNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgaWYgKEJsb2IgJiYgIWRvbnRTZW5kQmxvYnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVQYXlsb2FkQXNCbG9iKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyKHBhY2tldHMsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFwYWNrZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soJzA6Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBtZXNzYWdlLmxlbmd0aCArICc6JyArIG1lc3NhZ2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgICAgICAgICAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsICFpc0JpbmFyeSA/IGZhbHNlIDogc3VwcG9ydHNCaW5hcnksIHRydWUsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIHNldExlbmd0aEhlYWRlcihtZXNzYWdlKSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhyZXN1bHRzLmpvaW4oJycpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEFzeW5jIGFycmF5IG1hcCB1c2luZyBhZnRlclxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBtYXAoYXJ5LCBlYWNoLCBkb25lKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGFyeS5sZW5ndGgpO1xuICAgICAgICAgICAgdmFyIG5leHQgPSBhZnRlcihhcnkubGVuZ3RoLCBkb25lKTtcblxuICAgICAgICAgICAgdmFyIGVhY2hXaXRoSW5kZXggPSBmdW5jdGlvbiBlYWNoV2l0aEluZGV4KGksIGVsLCBjYikge1xuICAgICAgICAgICAgICBlYWNoKGVsLCBmdW5jdGlvbiAoZXJyb3IsIG1zZykge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IG1zZztcbiAgICAgICAgICAgICAgICBjYihlcnJvciwgcmVzdWx0KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBlYWNoV2l0aEluZGV4KGksIGFyeVtpXSwgbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLypcclxuICAgICAgICAgICAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gUG9zc2libGUgYmluYXJ5IGNvbnRlbnRzIGFyZVxyXG4gICAgICAgICAgICogZGVjb2RlZCBmcm9tIHRoZWlyIGJhc2U2NCByZXByZXNlbnRhdGlvblxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZGVjb2RlUGF5bG9hZCA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkYXRhICE9ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeShkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmluYXJ5VHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICBjYWxsYmFjayA9IGJpbmFyeVR5cGU7XG4gICAgICAgICAgICAgIGJpbmFyeVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGFja2V0O1xuICAgICAgICAgICAgaWYgKGRhdGEgPT0gJycpIHtcbiAgICAgICAgICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGxlbmd0aCA9ICcnLFxuICAgICAgICAgICAgICAgIG4sXG4gICAgICAgICAgICAgICAgbXNnO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGRhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBjaHIgPSBkYXRhLmNoYXJBdChpKTtcblxuICAgICAgICAgICAgICBpZiAoJzonICE9IGNocikge1xuICAgICAgICAgICAgICAgIGxlbmd0aCArPSBjaHI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCcnID09IGxlbmd0aCB8fCBsZW5ndGggIT0gKG4gPSBOdW1iZXIobGVuZ3RoKSkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHBhcnNlciBlcnJvciAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1zZyA9IGRhdGEuc3Vic3RyKGkgKyAxLCBuKTtcblxuICAgICAgICAgICAgICAgIGlmIChsZW5ndGggIT0gbXNnLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKG1zZy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHBhY2tldCA9IGV4cG9ydHMuZGVjb2RlUGFja2V0KG1zZywgYmluYXJ5VHlwZSwgdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChlcnIudHlwZSA9PSBwYWNrZXQudHlwZSAmJiBlcnIuZGF0YSA9PSBwYWNrZXQuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBwYXJzZXIgZXJyb3IgaW4gaW5kaXZpZHVhbCBwYWNrZXQgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICB2YXIgcmV0ID0gY2FsbGJhY2socGFja2V0LCBpICsgbiwgbCk7XG4gICAgICAgICAgICAgICAgICBpZiAoZmFsc2UgPT09IHJldCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkdmFuY2UgY3Vyc29yXG4gICAgICAgICAgICAgICAgaSArPSBuO1xuICAgICAgICAgICAgICAgIGxlbmd0aCA9ICcnO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsZW5ndGggIT0gJycpIHtcbiAgICAgICAgICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKSBhcyBiaW5hcnkuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogPDEgPSBiaW5hcnksIDAgPSBzdHJpbmc+PG51bWJlciBmcm9tIDAtOT48bnVtYmVyIGZyb20gMC05PlsuLi5dPG51bWJlclxyXG4gICAgICAgICAgICogMjU1PjxkYXRhPlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEV4YW1wbGU6XHJcbiAgICAgICAgICAgKiAxIDMgMjU1IDEgMiAzLCBpZiB0aGUgYmluYXJ5IGNvbnRlbnRzIGFyZSBpbnRlcnByZXRlZCBhcyA4IGJpdCBpbnRlZ2Vyc1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICAgICAgICAgICAqIEByZXR1cm4ge0FycmF5QnVmZmVyfSBlbmNvZGVkIHBheWxvYWRcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZVBheWxvYWRBc0FycmF5QnVmZmVyID0gZnVuY3Rpb24gKHBhY2tldHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgQXJyYXlCdWZmZXIoMCkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmNvZGVPbmUocGFja2V0LCBkb25lQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCB0cnVlLCB0cnVlLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkb25lQ2FsbGJhY2sobnVsbCwgZGF0YSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbiAoZXJyLCBlbmNvZGVkUGFja2V0cykge1xuICAgICAgICAgICAgICB2YXIgdG90YWxMZW5ndGggPSBlbmNvZGVkUGFja2V0cy5yZWR1Y2UoZnVuY3Rpb24gKGFjYywgcCkge1xuICAgICAgICAgICAgICAgIHZhciBsZW47XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgbGVuID0gcC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGxlbiA9IHAuYnl0ZUxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYyArIGxlbi50b1N0cmluZygpLmxlbmd0aCArIGxlbiArIDI7IC8vIHN0cmluZy9iaW5hcnkgaWRlbnRpZmllciArIHNlcGFyYXRvciA9IDJcbiAgICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgICAgICAgdmFyIHJlc3VsdEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodG90YWxMZW5ndGgpO1xuXG4gICAgICAgICAgICAgIHZhciBidWZmZXJJbmRleCA9IDA7XG4gICAgICAgICAgICAgIGVuY29kZWRQYWNrZXRzLmZvckVhY2goZnVuY3Rpb24gKHApIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNTdHJpbmcgPSB0eXBlb2YgcCA9PT0gJ3N0cmluZyc7XG4gICAgICAgICAgICAgICAgdmFyIGFiID0gcDtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkocC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdbaV0gPSBwLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBhYiA9IHZpZXcuYnVmZmVyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICAgICAgICAgICAgLy8gbm90IHRydWUgYmluYXJ5XG4gICAgICAgICAgICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRydWUgYmluYXJ5XG4gICAgICAgICAgICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxlblN0ciA9IGFiLmJ5dGVMZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlblN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IDI1NTtcblxuICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgcmVzdWx0QXJyYXlbYnVmZmVySW5kZXgrK10gPSB2aWV3W2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdEFycmF5LmJ1ZmZlcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBFbmNvZGUgYXMgQmxvYlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IgPSBmdW5jdGlvbiAocGFja2V0cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgICAgICAgICAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uIChlbmNvZGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmFyeUlkZW50aWZpZXIgPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgICAgICAgICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGVuY29kZWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGVuY29kZWQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZW5jb2RlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2aWV3W2ldID0gZW5jb2RlZC5jaGFyQ29kZUF0KGkpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgZW5jb2RlZCA9IHZpZXcuYnVmZmVyO1xuICAgICAgICAgICAgICAgICAgYmluYXJ5SWRlbnRpZmllclswXSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IGVuY29kZWQgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciA/IGVuY29kZWQuYnl0ZUxlbmd0aCA6IGVuY29kZWQuc2l6ZTtcblxuICAgICAgICAgICAgICAgIHZhciBsZW5TdHIgPSBsZW4udG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoQXJ5ID0gbmV3IFVpbnQ4QXJyYXkobGVuU3RyLmxlbmd0aCArIDEpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBsZW5ndGhBcnlbaV0gPSBwYXJzZUludChsZW5TdHJbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZW5ndGhBcnlbbGVuU3RyLmxlbmd0aF0gPSAyNTU7XG5cbiAgICAgICAgICAgICAgICBpZiAoQmxvYikge1xuICAgICAgICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbYmluYXJ5SWRlbnRpZmllci5idWZmZXIsIGxlbmd0aEFyeS5idWZmZXIsIGVuY29kZWRdKTtcbiAgICAgICAgICAgICAgICAgIGRvbmVDYWxsYmFjayhudWxsLCBibG9iKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXAocGFja2V0cywgZW5jb2RlT25lLCBmdW5jdGlvbiAoZXJyLCByZXN1bHRzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgQmxvYihyZXN1bHRzKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLypcclxuICAgICAgICAgICAqIERlY29kZXMgZGF0YSB3aGVuIGEgcGF5bG9hZCBpcyBtYXliZSBleHBlY3RlZC4gU3RyaW5ncyBhcmUgZGVjb2RlZCBieVxyXG4gICAgICAgICAgICogaW50ZXJwcmV0aW5nIGVhY2ggYnl0ZSBhcyBhIGtleSBjb2RlIGZvciBlbnRyaWVzIG1hcmtlZCB0byBzdGFydCB3aXRoIDAuIFNlZVxyXG4gICAgICAgICAgICogZGVzY3JpcHRpb24gb2YgZW5jb2RlUGF5bG9hZEFzQmluYXJ5XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gZGF0YSwgY2FsbGJhY2sgbWV0aG9kXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmRlY29kZVBheWxvYWRBc0JpbmFyeSA9IGZ1bmN0aW9uIChkYXRhLCBiaW5hcnlUeXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICAgICAgICAgICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBidWZmZXJUYWlsID0gZGF0YTtcbiAgICAgICAgICAgIHZhciBidWZmZXJzID0gW107XG5cbiAgICAgICAgICAgIHZhciBudW1iZXJUb29Mb25nID0gZmFsc2U7XG4gICAgICAgICAgICB3aGlsZSAoYnVmZmVyVGFpbC5ieXRlTGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB2YXIgdGFpbEFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYnVmZmVyVGFpbCk7XG4gICAgICAgICAgICAgIHZhciBpc1N0cmluZyA9IHRhaWxBcnJheVswXSA9PT0gMDtcbiAgICAgICAgICAgICAgdmFyIG1zZ0xlbmd0aCA9ICcnO1xuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhaWxBcnJheVtpXSA9PSAyNTUpIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1zZ0xlbmd0aC5sZW5ndGggPiAzMTApIHtcbiAgICAgICAgICAgICAgICAgIG51bWJlclRvb0xvbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbXNnTGVuZ3RoICs9IHRhaWxBcnJheVtpXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChudW1iZXJUb29Mb25nKSByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcblxuICAgICAgICAgICAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgMiArIG1zZ0xlbmd0aC5sZW5ndGgpO1xuICAgICAgICAgICAgICBtc2dMZW5ndGggPSBwYXJzZUludChtc2dMZW5ndGgpO1xuXG4gICAgICAgICAgICAgIHZhciBtc2cgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAwLCBtc2dMZW5ndGgpO1xuICAgICAgICAgICAgICBpZiAoaXNTdHJpbmcpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgbXNnID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShtc2cpKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpUGhvbmUgU2FmYXJpIGRvZXNuJ3QgbGV0IHlvdSBhcHBseSB0byB0eXBlZCBhcnJheXNcbiAgICAgICAgICAgICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KG1zZyk7XG4gICAgICAgICAgICAgICAgICBtc2cgPSAnJztcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbXNnICs9IFN0cmluZy5mcm9tQ2hhckNvZGUodHlwZWRbaV0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGJ1ZmZlcnMucHVzaChtc2cpO1xuICAgICAgICAgICAgICBidWZmZXJUYWlsID0gc2xpY2VCdWZmZXIoYnVmZmVyVGFpbCwgbXNnTGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHRvdGFsID0gYnVmZmVycy5sZW5ndGg7XG4gICAgICAgICAgICBidWZmZXJzLmZvckVhY2goZnVuY3Rpb24gKGJ1ZmZlciwgaSkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhleHBvcnRzLmRlY29kZVBhY2tldChidWZmZXIsIGJpbmFyeVR5cGUsIHRydWUpLCBpLCB0b3RhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwgeyBcIi4va2V5c1wiOiAyOCwgXCJhZnRlclwiOiA2LCBcImFycmF5YnVmZmVyLnNsaWNlXCI6IDcsIFwiYmFzZTY0LWFycmF5YnVmZmVyXCI6IDksIFwiYmxvYlwiOiAxMCwgXCJoYXMtYmluYXJ5XCI6IDI5LCBcInV0ZjhcIjogNDQgfV0sIDI4OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEdldHMgdGhlIGtleXMgZm9yIGFuIG9iamVjdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge0FycmF5fSBrZXlzXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKG9iaikge1xuICAgICAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgICAgICB2YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBpKSkge1xuICAgICAgICAgICAgICBhcnIucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFycjtcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgMjk6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGlzQXJyYXkgPSBfZGVyZXFfKCdpc2FycmF5Jyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gX2hhc0JpbmFyeShvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFvYmopIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICBpZiAoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoX2hhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChvYmogJiYgJ29iamVjdCcgPT0gdHlwZW9mIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChvYmoudG9KU09OKSB7XG4gICAgICAgICAgICAgICAgICBvYmogPSBvYmoudG9KU09OKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgX2hhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gX2hhc0JpbmFyeShkYXRhKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiaXNhcnJheVwiOiAzMyB9XSwgMzA6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGlzQXJyYXkgPSBfZGVyZXFfKCdpc2FycmF5Jyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGhhc0JpbmFyeTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2hlY2tzIGZvciBiaW5hcnkgZGF0YS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBSaWdodCBub3cgb25seSBCdWZmZXIgYW5kIEFycmF5QnVmZmVyIGFyZSBzdXBwb3J0ZWQuLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhbnl0aGluZ1xyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gaGFzQmluYXJ5KGRhdGEpIHtcblxuICAgICAgICAgICAgZnVuY3Rpb24gX2hhc0JpbmFyeShvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFvYmopIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgICAgICBpZiAoZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGlmIChfaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICAgICAgLy8gc2VlOiBodHRwczovL2dpdGh1Yi5jb20vQXV0b21hdHRpYy9oYXMtYmluYXJ5L3B1bGwvNFxuICAgICAgICAgICAgICAgIGlmIChvYmoudG9KU09OICYmICdmdW5jdGlvbicgPT0gdHlwZW9mIG9iai50b0pTT04pIHtcbiAgICAgICAgICAgICAgICAgIG9iaiA9IG9iai50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfaGFzQmluYXJ5KGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCJpc2FycmF5XCI6IDMzIH1dLCAzMTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIExvZ2ljIGJvcnJvd2VkIGZyb20gTW9kZXJuaXpyOlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogICAtIGh0dHBzOi8vZ2l0aHViLmNvbS9Nb2Rlcm5penIvTW9kZXJuaXpyL2Jsb2IvbWFzdGVyL2ZlYXR1cmUtZGV0ZWN0cy9jb3JzLmpzXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcgJiYgJ3dpdGhDcmVkZW50aWFscycgaW4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgICAgICAgICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LCB7fV0sIDMyOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIHZhciBpbmRleE9mID0gW10uaW5kZXhPZjtcblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnIsIG9iaikge1xuICAgICAgICAgIGlmIChpbmRleE9mKSByZXR1cm4gYXJyLmluZGV4T2Yob2JqKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAzMzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgMzQ6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyohIEpTT04gdjMuMy4yIHwgaHR0cDovL2Jlc3RpZWpzLmdpdGh1Yi5pby9qc29uMyB8IENvcHlyaWdodCAyMDEyLTIwMTQsIEtpdCBDYW1icmlkZ2UgfCBodHRwOi8va2l0Lm1pdC1saWNlbnNlLm9yZyAqL1xuICAgICAgICAgIDsoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gRGV0ZWN0IHRoZSBgZGVmaW5lYCBmdW5jdGlvbiBleHBvc2VkIGJ5IGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy4gVGhlXG4gICAgICAgICAgICAvLyBzdHJpY3QgYGRlZmluZWAgY2hlY2sgaXMgbmVjZXNzYXJ5IGZvciBjb21wYXRpYmlsaXR5IHdpdGggYHIuanNgLlxuICAgICAgICAgICAgdmFyIGlzTG9hZGVyID0gdHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQ7XG5cbiAgICAgICAgICAgIC8vIEEgc2V0IG9mIHR5cGVzIHVzZWQgdG8gZGlzdGluZ3Vpc2ggb2JqZWN0cyBmcm9tIHByaW1pdGl2ZXMuXG4gICAgICAgICAgICB2YXIgb2JqZWN0VHlwZXMgPSB7XG4gICAgICAgICAgICAgIFwiZnVuY3Rpb25cIjogdHJ1ZSxcbiAgICAgICAgICAgICAgXCJvYmplY3RcIjogdHJ1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gRGV0ZWN0IHRoZSBgZXhwb3J0c2Agb2JqZWN0IGV4cG9zZWQgYnkgQ29tbW9uSlMgaW1wbGVtZW50YXRpb25zLlxuICAgICAgICAgICAgdmFyIGZyZWVFeHBvcnRzID0gb2JqZWN0VHlwZXNbdHlwZW9mIGV4cG9ydHNdICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuICAgICAgICAgICAgLy8gVXNlIHRoZSBgZ2xvYmFsYCBvYmplY3QgZXhwb3NlZCBieSBOb2RlIChpbmNsdWRpbmcgQnJvd3NlcmlmeSB2aWFcbiAgICAgICAgICAgIC8vIGBpbnNlcnQtbW9kdWxlLWdsb2JhbHNgKSwgTmFyd2hhbCwgYW5kIFJpbmdvIGFzIHRoZSBkZWZhdWx0IGNvbnRleHQsXG4gICAgICAgICAgICAvLyBhbmQgdGhlIGB3aW5kb3dgIG9iamVjdCBpbiBicm93c2Vycy4gUmhpbm8gZXhwb3J0cyBhIGBnbG9iYWxgIGZ1bmN0aW9uXG4gICAgICAgICAgICAvLyBpbnN0ZWFkLlxuICAgICAgICAgICAgdmFyIHJvb3QgPSBvYmplY3RUeXBlc1t0eXBlb2Ygd2luZG93XSAmJiB3aW5kb3cgfHwgdGhpcyxcbiAgICAgICAgICAgICAgICBmcmVlR2xvYmFsID0gZnJlZUV4cG9ydHMgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG1vZHVsZV0gJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgdHlwZW9mIGdsb2JhbCA9PSBcIm9iamVjdFwiICYmIGdsb2JhbDtcblxuICAgICAgICAgICAgaWYgKGZyZWVHbG9iYWwgJiYgKGZyZWVHbG9iYWxbXCJnbG9iYWxcIl0gPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbFtcIndpbmRvd1wiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wic2VsZlwiXSA9PT0gZnJlZUdsb2JhbCkpIHtcbiAgICAgICAgICAgICAgcm9vdCA9IGZyZWVHbG9iYWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFB1YmxpYzogSW5pdGlhbGl6ZXMgSlNPTiAzIHVzaW5nIHRoZSBnaXZlbiBgY29udGV4dGAgb2JqZWN0LCBhdHRhY2hpbmcgdGhlXG4gICAgICAgICAgICAvLyBgc3RyaW5naWZ5YCBhbmQgYHBhcnNlYCBmdW5jdGlvbnMgdG8gdGhlIHNwZWNpZmllZCBgZXhwb3J0c2Agb2JqZWN0LlxuICAgICAgICAgICAgZnVuY3Rpb24gcnVuSW5Db250ZXh0KGNvbnRleHQsIGV4cG9ydHMpIHtcbiAgICAgICAgICAgICAgY29udGV4dCB8fCAoY29udGV4dCA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG4gICAgICAgICAgICAgIGV4cG9ydHMgfHwgKGV4cG9ydHMgPSByb290W1wiT2JqZWN0XCJdKCkpO1xuXG4gICAgICAgICAgICAgIC8vIE5hdGl2ZSBjb25zdHJ1Y3RvciBhbGlhc2VzLlxuICAgICAgICAgICAgICB2YXIgTnVtYmVyID0gY29udGV4dFtcIk51bWJlclwiXSB8fCByb290W1wiTnVtYmVyXCJdLFxuICAgICAgICAgICAgICAgICAgU3RyaW5nID0gY29udGV4dFtcIlN0cmluZ1wiXSB8fCByb290W1wiU3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgICAgT2JqZWN0ID0gY29udGV4dFtcIk9iamVjdFwiXSB8fCByb290W1wiT2JqZWN0XCJdLFxuICAgICAgICAgICAgICAgICAgRGF0ZSA9IGNvbnRleHRbXCJEYXRlXCJdIHx8IHJvb3RbXCJEYXRlXCJdLFxuICAgICAgICAgICAgICAgICAgU3ludGF4RXJyb3IgPSBjb250ZXh0W1wiU3ludGF4RXJyb3JcIl0gfHwgcm9vdFtcIlN5bnRheEVycm9yXCJdLFxuICAgICAgICAgICAgICAgICAgVHlwZUVycm9yID0gY29udGV4dFtcIlR5cGVFcnJvclwiXSB8fCByb290W1wiVHlwZUVycm9yXCJdLFxuICAgICAgICAgICAgICAgICAgTWF0aCA9IGNvbnRleHRbXCJNYXRoXCJdIHx8IHJvb3RbXCJNYXRoXCJdLFxuICAgICAgICAgICAgICAgICAgbmF0aXZlSlNPTiA9IGNvbnRleHRbXCJKU09OXCJdIHx8IHJvb3RbXCJKU09OXCJdO1xuXG4gICAgICAgICAgICAgIC8vIERlbGVnYXRlIHRvIHRoZSBuYXRpdmUgYHN0cmluZ2lmeWAgYW5kIGBwYXJzZWAgaW1wbGVtZW50YXRpb25zLlxuICAgICAgICAgICAgICBpZiAodHlwZW9mIG5hdGl2ZUpTT04gPT0gXCJvYmplY3RcIiAmJiBuYXRpdmVKU09OKSB7XG4gICAgICAgICAgICAgICAgZXhwb3J0cy5zdHJpbmdpZnkgPSBuYXRpdmVKU09OLnN0cmluZ2lmeTtcbiAgICAgICAgICAgICAgICBleHBvcnRzLnBhcnNlID0gbmF0aXZlSlNPTi5wYXJzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIENvbnZlbmllbmNlIGFsaWFzZXMuXG4gICAgICAgICAgICAgIHZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGUsXG4gICAgICAgICAgICAgICAgICBnZXRDbGFzcyA9IG9iamVjdFByb3RvLnRvU3RyaW5nLFxuICAgICAgICAgICAgICAgICAgaXNQcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAgIGZvckVhY2gsXG4gICAgICAgICAgICAgICAgICB1bmRlZjtcblxuICAgICAgICAgICAgICAvLyBUZXN0IHRoZSBgRGF0ZSNnZXRVVEMqYCBtZXRob2RzLiBCYXNlZCBvbiB3b3JrIGJ5IEBZYWZmbGUuXG4gICAgICAgICAgICAgIHZhciBpc0V4dGVuZGVkID0gbmV3IERhdGUoLTM1MDk4MjczMzQ1NzMyOTIpO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIC8vIFRoZSBgZ2V0VVRDRnVsbFllYXJgLCBgTW9udGhgLCBhbmQgYERhdGVgIG1ldGhvZHMgcmV0dXJuIG5vbnNlbnNpY2FsXG4gICAgICAgICAgICAgICAgLy8gcmVzdWx0cyBmb3IgY2VydGFpbiBkYXRlcyBpbiBPcGVyYSA+PSAxMC41My5cbiAgICAgICAgICAgICAgICBpc0V4dGVuZGVkID0gaXNFeHRlbmRlZC5nZXRVVENGdWxsWWVhcigpID09IC0xMDkyNTIgJiYgaXNFeHRlbmRlZC5nZXRVVENNb250aCgpID09PSAwICYmIGlzRXh0ZW5kZWQuZ2V0VVRDRGF0ZSgpID09PSAxICYmXG4gICAgICAgICAgICAgICAgLy8gU2FmYXJpIDwgMi4wLjIgc3RvcmVzIHRoZSBpbnRlcm5hbCBtaWxsaXNlY29uZCB0aW1lIHZhbHVlIGNvcnJlY3RseSxcbiAgICAgICAgICAgICAgICAvLyBidXQgY2xpcHMgdGhlIHZhbHVlcyByZXR1cm5lZCBieSB0aGUgZGF0ZSBtZXRob2RzIHRvIHRoZSByYW5nZSBvZlxuICAgICAgICAgICAgICAgIC8vIHNpZ25lZCAzMi1iaXQgaW50ZWdlcnMgKFstMiAqKiAzMSwgMiAqKiAzMSAtIDFdKS5cbiAgICAgICAgICAgICAgICBpc0V4dGVuZGVkLmdldFVUQ0hvdXJzKCkgPT0gMTAgJiYgaXNFeHRlbmRlZC5nZXRVVENNaW51dGVzKCkgPT0gMzcgJiYgaXNFeHRlbmRlZC5nZXRVVENTZWNvbmRzKCkgPT0gNiAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbGxpc2Vjb25kcygpID09IDcwODtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuXG4gICAgICAgICAgICAgIC8vIEludGVybmFsOiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIG5hdGl2ZSBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgcGFyc2VgXG4gICAgICAgICAgICAgIC8vIGltcGxlbWVudGF0aW9ucyBhcmUgc3BlYy1jb21wbGlhbnQuIEJhc2VkIG9uIHdvcmsgYnkgS2VuIFNueWRlci5cbiAgICAgICAgICAgICAgZnVuY3Rpb24gaGFzKG5hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaGFzW25hbWVdICE9PSB1bmRlZikge1xuICAgICAgICAgICAgICAgICAgLy8gUmV0dXJuIGNhY2hlZCBmZWF0dXJlIHRlc3QgcmVzdWx0LlxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGhhc1tuYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGlzU3VwcG9ydGVkO1xuICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIElFIDw9IDcgZG9lc24ndCBzdXBwb3J0IGFjY2Vzc2luZyBzdHJpbmcgY2hhcmFjdGVycyB1c2luZyBzcXVhcmVcbiAgICAgICAgICAgICAgICAgIC8vIGJyYWNrZXQgbm90YXRpb24uIElFIDggb25seSBzdXBwb3J0cyB0aGlzIGZvciBwcmltaXRpdmVzLlxuICAgICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBcImFcIlswXSAhPSBcImFcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5hbWUgPT0gXCJqc29uXCIpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEluZGljYXRlcyB3aGV0aGVyIGJvdGggYEpTT04uc3RyaW5naWZ5YCBhbmQgYEpTT04ucGFyc2VgIGFyZVxuICAgICAgICAgICAgICAgICAgLy8gc3VwcG9ydGVkLlxuICAgICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBoYXMoXCJqc29uLXN0cmluZ2lmeVwiKSAmJiBoYXMoXCJqc29uLXBhcnNlXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB2YXIgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgc2VyaWFsaXplZCA9IFwie1xcXCJhXFxcIjpbMSx0cnVlLGZhbHNlLG51bGwsXFxcIlxcXFx1MDAwMFxcXFxiXFxcXG5cXFxcZlxcXFxyXFxcXHRcXFwiXX1cIjtcbiAgICAgICAgICAgICAgICAgIC8vIFRlc3QgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICAgIGlmIChuYW1lID09IFwianNvbi1zdHJpbmdpZnlcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyaW5naWZ5ID0gZXhwb3J0cy5zdHJpbmdpZnksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnlTdXBwb3J0ZWQgPSB0eXBlb2Ygc3RyaW5naWZ5ID09IFwiZnVuY3Rpb25cIiAmJiBpc0V4dGVuZGVkO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyaW5naWZ5U3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQSB0ZXN0IGZ1bmN0aW9uIG9iamVjdCB3aXRoIGEgY3VzdG9tIGB0b0pTT05gIG1ldGhvZC5cbiAgICAgICAgICAgICAgICAgICAgICAodmFsdWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgICB9KS50b0pTT04gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggMy4xYjEgYW5kIGIyIHNlcmlhbGl6ZSBzdHJpbmcsIG51bWJlciwgYW5kIGJvb2xlYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByaW1pdGl2ZXMgYXMgb2JqZWN0IGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KDApID09PSBcIjBcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyLCBhbmQgSlNPTiAyIHNlcmlhbGl6ZSB3cmFwcGVkIHByaW1pdGl2ZXMgYXMgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgTnVtYmVyKCkpID09PSBcIjBcIiAmJiBzdHJpbmdpZnkobmV3IFN0cmluZygpKSA9PSAnXCJcIicgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAsIGB1bmRlZmluZWRgLCBvclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG9lcyBub3QgZGVmaW5lIGEgY2Fub25pY2FsIEpTT04gcmVwcmVzZW50YXRpb24gKHRoaXMgYXBwbGllcyB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2JqZWN0cyB3aXRoIGB0b0pTT05gIHByb3BlcnRpZXMgYXMgd2VsbCwgKnVubGVzcyogdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aXRoaW4gYW4gb2JqZWN0IG9yIGFycmF5KS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShnZXRDbGFzcykgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBJRSA4IHNlcmlhbGl6ZXMgYHVuZGVmaW5lZGAgYXMgYFwidW5kZWZpbmVkXCJgLiBTYWZhcmkgPD0gNS4xLjcgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMyBwYXNzIHRoaXMgdGVzdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh1bmRlZikgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjcgYW5kIEZGIDMuMWIzIHRocm93IGBFcnJvcmBzIGFuZCBgVHlwZUVycm9yYHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZXNwZWN0aXZlbHksIGlmIHRoZSB2YWx1ZSBpcyBvbWl0dGVkIGVudGlyZWx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KCkgPT09IHVuZGVmICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiB0aHJvdyBhbiBlcnJvciBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgbm90IGEgbnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5nLCBhcnJheSwgb2JqZWN0LCBCb29sZWFuLCBvciBgbnVsbGAgbGl0ZXJhbC4gVGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMgYXMgd2VsbCwgdW5sZXNzIHRoZXkgYXJlIG5lc3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW5zaWRlIG9iamVjdCBvciBhcnJheSBsaXRlcmFscy4gWVVJIDMuMC4wYjEgaWdub3JlcyBjdXN0b20gYHRvSlNPTmBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ldGhvZHMgZW50aXJlbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkodmFsdWUpID09PSBcIjFcIiAmJiBzdHJpbmdpZnkoW3ZhbHVlXSkgPT0gXCJbMV1cIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJvdG90eXBlIDw9IDEuNi4xIHNlcmlhbGl6ZXMgYFt1bmRlZmluZWRdYCBhcyBgXCJbXVwiYCBpbnN0ZWFkIG9mXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgXCJbbnVsbF1cImAuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmXSkgPT0gXCJbbnVsbF1cIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWVVJIDMuMC4wYjEgZmFpbHMgdG8gc2VyaWFsaXplIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShudWxsKSA9PSBcIm51bGxcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgaGFsdHMgc2VyaWFsaXphdGlvbiBpZiBhbiBhcnJheSBjb250YWlucyBhIGZ1bmN0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYFsxLCB0cnVlLCBnZXRDbGFzcywgMV1gIHNlcmlhbGl6ZXMgYXMgXCJbMSx0cnVlLF0sXCIuIEZGIDMuMWIzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGlkZXMgbm9uLUpTT04gdmFsdWVzIGZyb20gb2JqZWN0cyBhbmQgYXJyYXlzLCB1bmxlc3MgdGhleVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmaW5lIGN1c3RvbSBgdG9KU09OYCBtZXRob2RzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KFt1bmRlZiwgZ2V0Q2xhc3MsIG51bGxdKSA9PSBcIltudWxsLG51bGwsbnVsbF1cIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGxlIHNlcmlhbGl6YXRpb24gdGVzdC4gRkYgMy4xYjEgdXNlcyBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdoZXJlIGNoYXJhY3RlciBlc2NhcGUgY29kZXMgYXJlIGV4cGVjdGVkIChlLmcuLCBgXFxiYCA9PiBgXFx1MDAwOGApLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KHsgXCJhXCI6IFt2YWx1ZSwgdHJ1ZSwgZmFsc2UsIG51bGwsIFwiXFx4MDBcXGJcXG5cXGZcXHJcXHRcIl0gfSkgPT0gc2VyaWFsaXplZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEgYW5kIGIyIGlnbm9yZSB0aGUgYGZpbHRlcmAgYW5kIGB3aWR0aGAgYXJndW1lbnRzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwsIHZhbHVlKSA9PT0gXCIxXCIgJiYgc3RyaW5naWZ5KFsxLCAyXSwgbnVsbCwgMSkgPT0gXCJbXFxuIDEsXFxuIDJcXG5dXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEpTT04gMiwgUHJvdG90eXBlIDw9IDEuNywgYW5kIG9sZGVyIFdlYktpdCBidWlsZHMgaW5jb3JyZWN0bHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNlcmlhbGl6ZSBleHRlbmRlZCB5ZWFycy5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtOC42NGUxNSkpID09ICdcIi0yNzE4MjEtMDQtMjBUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNSwgYnV0IHJlcXVpcmVkIGluIDUuMS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSg4LjY0ZTE1KSkgPT0gJ1wiKzI3NTc2MC0wOS0xM1QwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaXJlZm94IDw9IDExLjAgaW5jb3JyZWN0bHkgc2VyaWFsaXplcyB5ZWFycyBwcmlvciB0byAwIGFzIG5lZ2F0aXZlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IHllYXJzIGluc3RlYWQgb2Ygc2l4LWRpZ2l0IHllYXJzLiBDcmVkaXRzOiBAWWFmZmxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC02MjE5ODc1NTJlNSkpID09ICdcIi0wMDAwMDEtMDEtMDFUMDA6MDA6MDAuMDAwWlwiJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDUuMS41IGFuZCBPcGVyYSA+PSAxMC41MyBpbmNvcnJlY3RseSBzZXJpYWxpemUgbWlsbGlzZWNvbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhbHVlcyBsZXNzIHRoYW4gMTAwMC4gQ3JlZGl0czogQFlhZmZsZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShuZXcgRGF0ZSgtMSkpID09ICdcIjE5NjktMTItMzFUMjM6NTk6NTkuOTk5WlwiJztcbiAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHN0cmluZ2lmeVN1cHBvcnRlZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIFRlc3QgYEpTT04ucGFyc2VgLlxuICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJqc29uLXBhcnNlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnNlID0gZXhwb3J0cy5wYXJzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIGIyIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGEgYmFyZSBsaXRlcmFsIGlzIHByb3ZpZGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZm9ybWluZyBpbXBsZW1lbnRhdGlvbnMgc2hvdWxkIGFsc28gY29lcmNlIHRoZSBpbml0aWFsIGFyZ3VtZW50IHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhIHN0cmluZyBwcmlvciB0byBwYXJzaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlKFwiMFwiKSA9PT0gMCAmJiAhcGFyc2UoZmFsc2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBsZSBwYXJzaW5nIHRlc3QuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFyc2Uoc2VyaWFsaXplZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJzZVN1cHBvcnRlZCA9IHZhbHVlW1wiYVwiXS5sZW5ndGggPT0gNSAmJiB2YWx1ZVtcImFcIl1bMF0gPT09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjIgYW5kIEZGIDMuMWIxIGFsbG93IHVuZXNjYXBlZCB0YWJzIGluIHN0cmluZ3MuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9ICFwYXJzZSgnXCJcXHRcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCBhbmQgNC4wLjEgYWxsb3cgbGVhZGluZyBgK2Agc2lnbnMgYW5kIGxlYWRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVjaW1hbCBwb2ludHMuIEZGIDQuMCwgNC4wLjEsIGFuZCBJRSA5LTEwIGFsc28gYWxsb3dcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2VydGFpbiBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjAxXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2VTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDQuMCwgNC4wLjEsIGFuZCBSaGlubyAxLjdSMy1SNCBhbGxvdyB0cmFpbGluZyBkZWNpbWFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHBvaW50cy4gVGhlc2UgZW52aXJvbm1lbnRzLCBhbG9uZyB3aXRoIEZGIDMuMWIxIGFuZCAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbHNvIGFsbG93IHRyYWlsaW5nIGNvbW1hcyBpbiBKU09OIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBwYXJzZShcIjEuXCIpICE9PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBwYXJzZVN1cHBvcnRlZDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhc1tuYW1lXSA9ICEhaXNTdXBwb3J0ZWQ7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoIWhhcyhcImpzb25cIikpIHtcbiAgICAgICAgICAgICAgICAvLyBDb21tb24gYFtbQ2xhc3NdXWAgbmFtZSBhbGlhc2VzLlxuICAgICAgICAgICAgICAgIHZhciBmdW5jdGlvbkNsYXNzID0gXCJbb2JqZWN0IEZ1bmN0aW9uXVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRlQ2xhc3MgPSBcIltvYmplY3QgRGF0ZV1cIixcbiAgICAgICAgICAgICAgICAgICAgbnVtYmVyQ2xhc3MgPSBcIltvYmplY3QgTnVtYmVyXVwiLFxuICAgICAgICAgICAgICAgICAgICBzdHJpbmdDbGFzcyA9IFwiW29iamVjdCBTdHJpbmddXCIsXG4gICAgICAgICAgICAgICAgICAgIGFycmF5Q2xhc3MgPSBcIltvYmplY3QgQXJyYXldXCIsXG4gICAgICAgICAgICAgICAgICAgIGJvb2xlYW5DbGFzcyA9IFwiW29iamVjdCBCb29sZWFuXVwiO1xuXG4gICAgICAgICAgICAgICAgLy8gRGV0ZWN0IGluY29tcGxldGUgc3VwcG9ydCBmb3IgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIGJ5IGluZGV4LlxuICAgICAgICAgICAgICAgIHZhciBjaGFySW5kZXhCdWdneSA9IGhhcyhcImJ1Zy1zdHJpbmctY2hhci1pbmRleFwiKTtcblxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBhZGRpdGlvbmFsIHV0aWxpdHkgbWV0aG9kcyBpZiB0aGUgYERhdGVgIG1ldGhvZHMgYXJlIGJ1Z2d5LlxuICAgICAgICAgICAgICAgIGlmICghaXNFeHRlbmRlZCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICAgICAgICAgICAgICAgIC8vIEEgbWFwcGluZyBiZXR3ZWVuIHRoZSBtb250aHMgb2YgdGhlIHllYXIgYW5kIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuXG4gICAgICAgICAgICAgICAgICAvLyBKYW51YXJ5IDFzdCBhbmQgdGhlIGZpcnN0IG9mIHRoZSByZXNwZWN0aXZlIG1vbnRoLlxuICAgICAgICAgICAgICAgICAgdmFyIE1vbnRocyA9IFswLCAzMSwgNTksIDkwLCAxMjAsIDE1MSwgMTgxLCAyMTIsIDI0MywgMjczLCAzMDQsIDMzNF07XG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIGRheXMgYmV0d2VlbiB0aGUgVW5peCBlcG9jaCBhbmQgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBmaXJzdCBkYXkgb2YgdGhlIGdpdmVuIG1vbnRoLlxuICAgICAgICAgICAgICAgICAgdmFyIGdldERheSA9IGZ1bmN0aW9uIGdldERheSh5ZWFyLCBtb250aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gTW9udGhzW21vbnRoXSArIDM2NSAqICh5ZWFyIC0gMTk3MCkgKyBmbG9vcigoeWVhciAtIDE5NjkgKyAobW9udGggPSArKG1vbnRoID4gMSkpKSAvIDQpIC0gZmxvb3IoKHllYXIgLSAxOTAxICsgbW9udGgpIC8gMTAwKSArIGZsb29yKCh5ZWFyIC0gMTYwMSArIG1vbnRoKSAvIDQwMCk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBEZXRlcm1pbmVzIGlmIGEgcHJvcGVydHkgaXMgYSBkaXJlY3QgcHJvcGVydHkgb2YgdGhlIGdpdmVuXG4gICAgICAgICAgICAgICAgLy8gb2JqZWN0LiBEZWxlZ2F0ZXMgdG8gdGhlIG5hdGl2ZSBgT2JqZWN0I2hhc093blByb3BlcnR5YCBtZXRob2QuXG4gICAgICAgICAgICAgICAgaWYgKCEoaXNQcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbWVtYmVycyA9IHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGlmICgobWVtYmVycy5fX3Byb3RvX18gPSBudWxsLCBtZW1iZXJzLl9fcHJvdG9fXyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgKnByb3RvKiBwcm9wZXJ0eSBjYW5ub3QgYmUgc2V0IG11bHRpcGxlIHRpbWVzIGluIHJlY2VudFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHZlcnNpb25zIG9mIEZpcmVmb3ggYW5kIFNlYU1vbmtleS5cbiAgICAgICAgICAgICAgICAgICAgICBcInRvU3RyaW5nXCI6IDFcbiAgICAgICAgICAgICAgICAgICAgfSwgbWVtYmVycykudG9TdHJpbmcgIT0gZ2V0Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gMi4wLjMgZG9lc24ndCBpbXBsZW1lbnQgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAsIGJ1dFxuICAgICAgICAgICAgICAgICAgICAgIC8vIHN1cHBvcnRzIHRoZSBtdXRhYmxlICpwcm90byogcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FwdHVyZSBhbmQgYnJlYWsgdGhlIG9iamVjdCdzIHByb3RvdHlwZSBjaGFpbiAoc2VlIHNlY3Rpb24gOC42LjJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9mIHRoZSBFUyA1LjEgc3BlYykuIFRoZSBwYXJlbnRoZXNpemVkIGV4cHJlc3Npb24gcHJldmVudHMgYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVuc2FmZSB0cmFuc2Zvcm1hdGlvbiBieSB0aGUgQ2xvc3VyZSBDb21waWxlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbCA9IHRoaXMuX19wcm90b19fLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IChwcm9wZXJ0eSBpbiAodGhpcy5fX3Byb3RvX18gPSBudWxsLCB0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBwcm90b3R5cGUgY2hhaW4uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcHJvdG9fXyA9IG9yaWdpbmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENhcHR1cmUgYSByZWZlcmVuY2UgdG8gdGhlIHRvcC1sZXZlbCBgT2JqZWN0YCBjb25zdHJ1Y3Rvci5cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvciA9IG1lbWJlcnMuY29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IHRvIHNpbXVsYXRlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGluXG4gICAgICAgICAgICAgICAgICAgICAgLy8gb3RoZXIgZW52aXJvbm1lbnRzLlxuICAgICAgICAgICAgICAgICAgICAgIGlzUHJvcGVydHkgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSAodGhpcy5jb25zdHJ1Y3RvciB8fCBjb25zdHJ1Y3RvcikucHJvdG90eXBlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByb3BlcnR5IGluIHRoaXMgJiYgIShwcm9wZXJ0eSBpbiBwYXJlbnQgJiYgdGhpc1twcm9wZXJ0eV0gPT09IHBhcmVudFtwcm9wZXJ0eV0pO1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWVtYmVycyA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb3BlcnR5LmNhbGwodGhpcywgcHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogTm9ybWFsaXplcyB0aGUgYGZvci4uLmluYCBpdGVyYXRpb24gYWxnb3JpdGhtIGFjcm9zc1xuICAgICAgICAgICAgICAgIC8vIGVudmlyb25tZW50cy4gRWFjaCBlbnVtZXJhdGVkIGtleSBpcyB5aWVsZGVkIHRvIGEgYGNhbGxiYWNrYCBmdW5jdGlvbi5cbiAgICAgICAgICAgICAgICBmb3JFYWNoID0gZnVuY3Rpb24gKG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgIHZhciBzaXplID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICBQcm9wZXJ0aWVzLFxuICAgICAgICAgICAgICAgICAgICAgIG1lbWJlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk7XG5cbiAgICAgICAgICAgICAgICAgIC8vIFRlc3RzIGZvciBidWdzIGluIHRoZSBjdXJyZW50IGVudmlyb25tZW50J3MgYGZvci4uLmluYCBhbGdvcml0aG0uIFRoZVxuICAgICAgICAgICAgICAgICAgLy8gYHZhbHVlT2ZgIHByb3BlcnR5IGluaGVyaXRzIHRoZSBub24tZW51bWVyYWJsZSBmbGFnIGZyb21cbiAgICAgICAgICAgICAgICAgIC8vIGBPYmplY3QucHJvdG90eXBlYCBpbiBvbGRlciB2ZXJzaW9ucyBvZiBJRSwgTmV0c2NhcGUsIGFuZCBNb3ppbGxhLlxuICAgICAgICAgICAgICAgICAgKFByb3BlcnRpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWVPZiA9IDA7XG4gICAgICAgICAgICAgICAgICB9KS5wcm90b3R5cGUudmFsdWVPZiA9IDA7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEl0ZXJhdGUgb3ZlciBhIG5ldyBpbnN0YW5jZSBvZiB0aGUgYFByb3BlcnRpZXNgIGNsYXNzLlxuICAgICAgICAgICAgICAgICAgbWVtYmVycyA9IG5ldyBQcm9wZXJ0aWVzKCk7XG4gICAgICAgICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG1lbWJlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWdub3JlIGFsbCBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUHJvcGVydHkuY2FsbChtZW1iZXJzLCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzaXplKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIFByb3BlcnRpZXMgPSBtZW1iZXJzID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgLy8gTm9ybWFsaXplIHRoZSBpdGVyYXRpb24gYWxnb3JpdGhtLlxuICAgICAgICAgICAgICAgICAgaWYgKCFzaXplKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEEgbGlzdCBvZiBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzIGluaGVyaXRlZCBmcm9tIGBPYmplY3QucHJvdG90eXBlYC5cbiAgICAgICAgICAgICAgICAgICAgbWVtYmVycyA9IFtcInZhbHVlT2ZcIiwgXCJ0b1N0cmluZ1wiLCBcInRvTG9jYWxlU3RyaW5nXCIsIFwicHJvcGVydHlJc0VudW1lcmFibGVcIiwgXCJpc1Byb3RvdHlwZU9mXCIsIFwiaGFzT3duUHJvcGVydHlcIiwgXCJjb25zdHJ1Y3RvclwiXTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSUUgPD0gOCwgTW96aWxsYSAxLjAsIGFuZCBOZXRzY2FwZSA2LjIgaWdub3JlIHNoYWRvd2VkIG5vbi1lbnVtZXJhYmxlXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3BlcnRpZXMuXG4gICAgICAgICAgICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1Byb3BlcnR5ID0gIWlzRnVuY3Rpb24gJiYgdHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciAhPSBcImZ1bmN0aW9uXCIgJiYgb2JqZWN0VHlwZXNbdHlwZW9mIG9iamVjdC5oYXNPd25Qcm9wZXJ0eV0gJiYgb2JqZWN0Lmhhc093blByb3BlcnR5IHx8IGlzUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEdlY2tvIDw9IDEuMCBlbnVtZXJhdGVzIHRoZSBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgdW5kZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNlcnRhaW4gY29uZGl0aW9uczsgSUUgZG9lcyBub3QuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyBNYW51YWxseSBpbnZva2UgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LlxuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gbWVtYmVycy5sZW5ndGg7IHByb3BlcnR5ID0gbWVtYmVyc1stLWxlbmd0aF07IGhhc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkgJiYgY2FsbGJhY2socHJvcGVydHkpKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2l6ZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuNCBlbnVtZXJhdGVzIHNoYWRvd2VkIHByb3BlcnRpZXMgdHdpY2UuXG4gICAgICAgICAgICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIHNldCBvZiBpdGVyYXRlZCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICAgICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHk7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIGVhY2ggcHJvcGVydHkgbmFtZSB0byBwcmV2ZW50IGRvdWJsZSBlbnVtZXJhdGlvbi4gVGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgcHJvdG90eXBlYCBwcm9wZXJ0eSBvZiBmdW5jdGlvbnMgaXMgbm90IGVudW1lcmF0ZWQgZHVlIHRvIGNyb3NzLVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoaXNGdW5jdGlvbiAmJiBwcm9wZXJ0eSA9PSBcInByb3RvdHlwZVwiKSAmJiAhaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSAmJiAobWVtYmVyc1twcm9wZXJ0eV0gPSAxKSAmJiBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGJ1Z3MgZGV0ZWN0ZWQ7IHVzZSB0aGUgc3RhbmRhcmQgYGZvci4uLmluYCBhbGdvcml0aG0uXG4gICAgICAgICAgICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBpc0Z1bmN0aW9uID0gZ2V0Q2xhc3MuY2FsbChvYmplY3QpID09IGZ1bmN0aW9uQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbnN0cnVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiAhKGlzQ29uc3RydWN0b3IgPSBwcm9wZXJ0eSA9PT0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIHRoZSBgY29uc3RydWN0b3JgIHByb3BlcnR5IGR1ZSB0b1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGNyb3NzLWVudmlyb25tZW50IGluY29uc2lzdGVuY2llcy5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb25zdHJ1Y3RvciB8fCBpc1Byb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSA9IFwiY29uc3RydWN0b3JcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZm9yRWFjaChvYmplY3QsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gUHVibGljOiBTZXJpYWxpemVzIGEgSmF2YVNjcmlwdCBgdmFsdWVgIGFzIGEgSlNPTiBzdHJpbmcuIFRoZSBvcHRpb25hbFxuICAgICAgICAgICAgICAgIC8vIGBmaWx0ZXJgIGFyZ3VtZW50IG1heSBzcGVjaWZ5IGVpdGhlciBhIGZ1bmN0aW9uIHRoYXQgYWx0ZXJzIGhvdyBvYmplY3QgYW5kXG4gICAgICAgICAgICAgICAgLy8gYXJyYXkgbWVtYmVycyBhcmUgc2VyaWFsaXplZCwgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyBhbmQgbnVtYmVycyB0aGF0XG4gICAgICAgICAgICAgICAgLy8gaW5kaWNhdGVzIHdoaWNoIHByb3BlcnRpZXMgc2hvdWxkIGJlIHNlcmlhbGl6ZWQuIFRoZSBvcHRpb25hbCBgd2lkdGhgXG4gICAgICAgICAgICAgICAgLy8gYXJndW1lbnQgbWF5IGJlIGVpdGhlciBhIHN0cmluZyBvciBudW1iZXIgdGhhdCBzcGVjaWZpZXMgdGhlIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgICAgLy8gbGV2ZWwgb2YgdGhlIG91dHB1dC5cbiAgICAgICAgICAgICAgICBpZiAoIWhhcyhcImpzb24tc3RyaW5naWZ5XCIpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogQSBtYXAgb2YgY29udHJvbCBjaGFyYWN0ZXJzIGFuZCB0aGVpciBlc2NhcGVkIGVxdWl2YWxlbnRzLlxuICAgICAgICAgICAgICAgICAgdmFyIEVzY2FwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIDkyOiBcIlxcXFxcXFxcXCIsXG4gICAgICAgICAgICAgICAgICAgIDM0OiAnXFxcXFwiJyxcbiAgICAgICAgICAgICAgICAgICAgODogXCJcXFxcYlwiLFxuICAgICAgICAgICAgICAgICAgICAxMjogXCJcXFxcZlwiLFxuICAgICAgICAgICAgICAgICAgICAxMDogXCJcXFxcblwiLFxuICAgICAgICAgICAgICAgICAgICAxMzogXCJcXFxcclwiLFxuICAgICAgICAgICAgICAgICAgICA5OiBcIlxcXFx0XCJcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBDb252ZXJ0cyBgdmFsdWVgIGludG8gYSB6ZXJvLXBhZGRlZCBzdHJpbmcgc3VjaCB0aGF0IGl0c1xuICAgICAgICAgICAgICAgICAgLy8gbGVuZ3RoIGlzIGF0IGxlYXN0IGVxdWFsIHRvIGB3aWR0aGAuIFRoZSBgd2lkdGhgIG11c3QgYmUgPD0gNi5cbiAgICAgICAgICAgICAgICAgIHZhciBsZWFkaW5nWmVyb2VzID0gXCIwMDAwMDBcIjtcbiAgICAgICAgICAgICAgICAgIHZhciB0b1BhZGRlZFN0cmluZyA9IGZ1bmN0aW9uIHRvUGFkZGVkU3RyaW5nKHdpZHRoLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYHx8IDBgIGV4cHJlc3Npb24gaXMgbmVjZXNzYXJ5IHRvIHdvcmsgYXJvdW5kIGEgYnVnIGluXG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiB3aGVyZSBgMCA9PSAtMGAsIGJ1dCBgU3RyaW5nKC0wKSAhPT0gXCIwXCJgLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGxlYWRpbmdaZXJvZXMgKyAodmFsdWUgfHwgMCkpLnNsaWNlKC13aWR0aCk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogRG91YmxlLXF1b3RlcyBhIHN0cmluZyBgdmFsdWVgLCByZXBsYWNpbmcgYWxsIEFTQ0lJIGNvbnRyb2xcbiAgICAgICAgICAgICAgICAgIC8vIGNoYXJhY3RlcnMgKGNoYXJhY3RlcnMgd2l0aCBjb2RlIHVuaXQgdmFsdWVzIGJldHdlZW4gMCBhbmQgMzEpIHdpdGhcbiAgICAgICAgICAgICAgICAgIC8vIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBgUXVvdGUodmFsdWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLlxuICAgICAgICAgICAgICAgICAgdmFyIHVuaWNvZGVQcmVmaXggPSBcIlxcXFx1MDBcIjtcbiAgICAgICAgICAgICAgICAgIHZhciBxdW90ZSA9IGZ1bmN0aW9uIHF1b3RlKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAnXCInLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXggPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlQ2hhckluZGV4ID0gIWNoYXJJbmRleEJ1Z2d5IHx8IGxlbmd0aCA+IDEwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ltYm9scyA9IHVzZUNoYXJJbmRleCAmJiAoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5zcGxpdChcIlwiKSA6IHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJDb2RlID0gdmFsdWUuY2hhckNvZGVBdChpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGNoYXJhY3RlciBpcyBhIGNvbnRyb2wgY2hhcmFjdGVyLCBhcHBlbmQgaXRzIFVuaWNvZGUgb3JcbiAgICAgICAgICAgICAgICAgICAgICAvLyBzaG9ydGhhbmQgZXNjYXBlIHNlcXVlbmNlOyBvdGhlcndpc2UsIGFwcGVuZCB0aGUgY2hhcmFjdGVyIGFzLWlzLlxuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgODpjYXNlIDk6Y2FzZSAxMDpjYXNlIDEyOmNhc2UgMTM6Y2FzZSAzNDpjYXNlIDkyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gRXNjYXBlc1tjaGFyQ29kZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdW5pY29kZVByZWZpeCArIHRvUGFkZGVkU3RyaW5nKDIsIGNoYXJDb2RlLnRvU3RyaW5nKDE2KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IHVzZUNoYXJJbmRleCA/IHN5bWJvbHNbaW5kZXhdIDogdmFsdWUuY2hhckF0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCArICdcIic7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgc2VyaWFsaXplcyBhbiBvYmplY3QuIEltcGxlbWVudHMgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBgU3RyKGtleSwgaG9sZGVyKWAsIGBKTyh2YWx1ZSlgLCBhbmQgYEpBKHZhbHVlKWAgb3BlcmF0aW9ucy5cbiAgICAgICAgICAgICAgICAgIHZhciBzZXJpYWxpemUgPSBmdW5jdGlvbiBzZXJpYWxpemUocHJvcGVydHksIG9iamVjdCwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUsIGNsYXNzTmFtZSwgeWVhciwgbW9udGgsIGRhdGUsIHRpbWUsIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBtaWxsaXNlY29uZHMsIHJlc3VsdHMsIGVsZW1lbnQsIGluZGV4LCBsZW5ndGgsIHByZWZpeCwgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIE5lY2Vzc2FyeSBmb3IgaG9zdCBvYmplY3Qgc3VwcG9ydC5cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge31cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBkYXRlQ2xhc3MgJiYgIWlzUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJ0b0pTT05cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IC0xIC8gMCAmJiB2YWx1ZSA8IDEgLyAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERhdGVzIGFyZSBzZXJpYWxpemVkIGFjY29yZGluZyB0byB0aGUgYERhdGUjdG9KU09OYCBtZXRob2RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjkuNS40NC4gU2VlIHNlY3Rpb24gMTUuOS4xLjE1XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciB0aGUgSVNPIDg2MDEgZGF0ZSB0aW1lIHN0cmluZyBmb3JtYXQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChnZXREYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNYW51YWxseSBjb21wdXRlIHRoZSB5ZWFyLCBtb250aCwgZGF0ZSwgaG91cnMsIG1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2Vjb25kcywgYW5kIG1pbGxpc2Vjb25kcyBpZiB0aGUgYGdldFVUQypgIG1ldGhvZHMgYXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnVnZ3kuIEFkYXB0ZWQgZnJvbSBAWWFmZmxlJ3MgYGRhdGUtc2hpbWAgcHJvamVjdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gZmxvb3IodmFsdWUgLyA4NjRlNSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh5ZWFyID0gZmxvb3IoZGF0ZSAvIDM2NS4yNDI1KSArIDE5NzAgLSAxOyBnZXREYXkoeWVhciArIDEsIDApIDw9IGRhdGU7IHllYXIrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChtb250aCA9IGZsb29yKChkYXRlIC0gZ2V0RGF5KHllYXIsIDApKSAvIDMwLjQyKTsgZ2V0RGF5KHllYXIsIG1vbnRoICsgMSkgPD0gZGF0ZTsgbW9udGgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZSA9IDEgKyBkYXRlIC0gZ2V0RGF5KHllYXIsIG1vbnRoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgYHRpbWVgIHZhbHVlIHNwZWNpZmllcyB0aGUgdGltZSB3aXRoaW4gdGhlIGRheSAoc2VlIEVTXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gNS4xIHNlY3Rpb24gMTUuOS4xLjIpLiBUaGUgZm9ybXVsYSBgKEEgJSBCICsgQikgJSBCYCBpcyB1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdG8gY29tcHV0ZSBgQSBtb2R1bG8gQmAsIGFzIHRoZSBgJWAgb3BlcmF0b3IgZG9lcyBub3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JyZXNwb25kIHRvIHRoZSBgbW9kdWxvYCBvcGVyYXRpb24gZm9yIG5lZ2F0aXZlIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZSA9ICh2YWx1ZSAlIDg2NGU1ICsgODY0ZTUpICUgODY0ZTU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGFyZSBvYnRhaW5lZCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlY29tcG9zaW5nIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5LiBTZWUgc2VjdGlvbiAxNS45LjEuMTAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSBmbG9vcih0aW1lIC8gMzZlNSkgJSAyNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gZmxvb3IodGltZSAvIDZlNCkgJSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWNvbmRzID0gZmxvb3IodGltZSAvIDFlMykgJSA2MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB0aW1lICUgMWUzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHllYXIgPSB2YWx1ZS5nZXRVVENGdWxsWWVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbnRoID0gdmFsdWUuZ2V0VVRDTW9udGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gdmFsdWUuZ2V0VVRDRGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvdXJzID0gdmFsdWUuZ2V0VVRDSG91cnMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW51dGVzID0gdmFsdWUuZ2V0VVRDTWludXRlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSB2YWx1ZS5nZXRVVENTZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWlsbGlzZWNvbmRzID0gdmFsdWUuZ2V0VVRDTWlsbGlzZWNvbmRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VyaWFsaXplIGV4dGVuZGVkIHllYXJzIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSAoeWVhciA8PSAwIHx8IHllYXIgPj0gMWU0ID8gKHllYXIgPCAwID8gXCItXCIgOiBcIitcIikgKyB0b1BhZGRlZFN0cmluZyg2LCB5ZWFyIDwgMCA/IC15ZWFyIDogeWVhcikgOiB0b1BhZGRlZFN0cmluZyg0LCB5ZWFyKSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1vbnRoICsgMSkgKyBcIi1cIiArIHRvUGFkZGVkU3RyaW5nKDIsIGRhdGUpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTW9udGhzLCBkYXRlcywgaG91cnMsIG1pbnV0ZXMsIGFuZCBzZWNvbmRzIHNob3VsZCBoYXZlIHR3b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkaWdpdHM7IG1pbGxpc2Vjb25kcyBzaG91bGQgaGF2ZSB0aHJlZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJUXCIgKyB0b1BhZGRlZFN0cmluZygyLCBob3VycykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIG1pbnV0ZXMpICsgXCI6XCIgKyB0b1BhZGRlZFN0cmluZygyLCBzZWNvbmRzKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1pbGxpc2Vjb25kcyBhcmUgb3B0aW9uYWwgaW4gRVMgNS4wLCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIi5cIiArIHRvUGFkZGVkU3RyaW5nKDMsIG1pbGxpc2Vjb25kcykgKyBcIlpcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZS50b0pTT04gPT0gXCJmdW5jdGlvblwiICYmIChjbGFzc05hbWUgIT0gbnVtYmVyQ2xhc3MgJiYgY2xhc3NOYW1lICE9IHN0cmluZ0NsYXNzICYmIGNsYXNzTmFtZSAhPSBhcnJheUNsYXNzIHx8IGlzUHJvcGVydHkuY2FsbCh2YWx1ZSwgXCJ0b0pTT05cIikpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgYWRkcyBub24tc3RhbmRhcmQgYHRvSlNPTmAgbWV0aG9kcyB0byB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBOdW1iZXJgLCBgU3RyaW5nYCwgYERhdGVgLCBhbmQgYEFycmF5YCBwcm90b3R5cGVzLiBKU09OIDNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZXMgYWxsIGB0b0pTT05gIG1ldGhvZHMgb24gdGhlc2Ugb2JqZWN0cyB1bmxlc3MgdGhleSBhcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRlZmluZWQgZGlyZWN0bHkgb24gYW4gaW5zdGFuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvSlNPTihwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGEgcmVwbGFjZW1lbnQgZnVuY3Rpb24gd2FzIHByb3ZpZGVkLCBjYWxsIGl0IHRvIG9idGFpbiB0aGUgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAvLyBmb3Igc2VyaWFsaXphdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrLmNhbGwob2JqZWN0LCBwcm9wZXJ0eSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIm51bGxcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBib29sZWFuQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBCb29sZWFucyBhcmUgcmVwcmVzZW50ZWQgbGl0ZXJhbGx5LlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcIlwiICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBgSW5maW5pdHlgIGFuZCBgTmFOYCBhcmUgc2VyaWFsaXplZCBhc1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGBcIm51bGxcImAuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDAgPyBcIlwiICsgdmFsdWUgOiBcIm51bGxcIjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmdzIGFyZSBkb3VibGUtcXVvdGVkIGFuZCBlc2NhcGVkLlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBxdW90ZShcIlwiICsgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3RzIGFuZCBhcnJheXMuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIENoZWNrIGZvciBjeWNsaWMgc3RydWN0dXJlcy4gVGhpcyBpcyBhIGxpbmVhciBzZWFyY2g7IHBlcmZvcm1hbmNlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaXMgaW52ZXJzZWx5IHByb3BvcnRpb25hbCB0byB0aGUgbnVtYmVyIG9mIHVuaXF1ZSBuZXN0ZWQgb2JqZWN0cy5cbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxlbmd0aCA9IHN0YWNrLmxlbmd0aDsgbGVuZ3RoLS07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2tbbGVuZ3RoXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ3ljbGljIHN0cnVjdHVyZXMgY2Fubm90IGJlIHNlcmlhbGl6ZWQgYnkgYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICAgICAgICAgICAgICAgICAgICBzdGFjay5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSB0aGUgY3VycmVudCBpbmRlbnRhdGlvbiBsZXZlbCBhbmQgaW5kZW50IG9uZSBhZGRpdGlvbmFsIGxldmVsLlxuICAgICAgICAgICAgICAgICAgICAgIHByZWZpeCA9IGluZGVudGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgIGluZGVudGF0aW9uICs9IHdoaXRlc3BhY2U7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWN1cnNpdmVseSBzZXJpYWxpemUgYXJyYXkgZWxlbWVudHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGluZGV4ID0gMCwgbGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBpbmRleCA8IGxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50ID0gc2VyaWFsaXplKGluZGV4LCB2YWx1ZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIHdoaXRlc3BhY2UsIGluZGVudGF0aW9uLCBzdGFjayk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChlbGVtZW50ID09PSB1bmRlZiA/IFwibnVsbFwiIDogZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/IHdoaXRlc3BhY2UgPyBcIltcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwiXVwiIDogXCJbXCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJdXCIgOiBcIltdXCI7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBvYmplY3QgbWVtYmVycy4gTWVtYmVycyBhcmUgc2VsZWN0ZWQgZnJvbVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWl0aGVyIGEgdXNlci1zcGVjaWZpZWQgbGlzdCBvZiBwcm9wZXJ0eSBuYW1lcywgb3IgdGhlIG9iamVjdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRzZWxmLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yRWFjaChwcm9wZXJ0aWVzIHx8IHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBzZXJpYWxpemUocHJvcGVydHksIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgIT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWNjb3JkaW5nIHRvIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjM6IFwiSWYgYGdhcGAge3doaXRlc3BhY2V9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgbm90IHRoZSBlbXB0eSBzdHJpbmcsIGxldCBgbWVtYmVyYCB7cXVvdGUocHJvcGVydHkpICsgXCI6XCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmUgdGhlIGNvbmNhdGVuYXRpb24gb2YgYG1lbWJlcmAgYW5kIHRoZSBgc3BhY2VgIGNoYXJhY3Rlci5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBcImBzcGFjZWAgY2hhcmFjdGVyXCIgcmVmZXJzIHRvIHRoZSBsaXRlcmFsIHNwYWNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyLCBub3QgdGhlIGBzcGFjZWAge3dpZHRofSBhcmd1bWVudCBwcm92aWRlZCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBKU09OLnN0cmluZ2lmeWAuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHF1b3RlKHByb3BlcnR5KSArIFwiOlwiICsgKHdoaXRlc3BhY2UgPyBcIiBcIiA6IFwiXCIpICsgZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0cy5sZW5ndGggPyB3aGl0ZXNwYWNlID8gXCJ7XFxuXCIgKyBpbmRlbnRhdGlvbiArIHJlc3VsdHMuam9pbihcIixcXG5cIiArIGluZGVudGF0aW9uKSArIFwiXFxuXCIgKyBwcmVmaXggKyBcIn1cIiA6IFwie1wiICsgcmVzdWx0cy5qb2luKFwiLFwiKSArIFwifVwiIDogXCJ7fVwiO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIG9iamVjdCBmcm9tIHRoZSB0cmF2ZXJzZWQgb2JqZWN0IHN0YWNrLlxuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIFB1YmxpYzogYEpTT04uc3RyaW5naWZ5YC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMuXG4gICAgICAgICAgICAgICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IGZ1bmN0aW9uIChzb3VyY2UsIGZpbHRlciwgd2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHdoaXRlc3BhY2UsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCBjbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RUeXBlc1t0eXBlb2YgZmlsdGVyXSAmJiBmaWx0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwoZmlsdGVyKSkgPT0gZnVuY3Rpb25DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBmaWx0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gYXJyYXlDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgcHJvcGVydHkgbmFtZXMgYXJyYXkgaW50byBhIG1ha2VzaGlmdCBzZXQuXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpbmRleCA9IDAsIGxlbmd0aCA9IGZpbHRlci5sZW5ndGgsIHZhbHVlOyBpbmRleCA8IGxlbmd0aDsgdmFsdWUgPSBmaWx0ZXJbaW5kZXgrK10sIChjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKSwgY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzIHx8IGNsYXNzTmFtZSA9PSBudW1iZXJDbGFzcykgJiYgKHByb3BlcnRpZXNbdmFsdWVdID0gMSkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAod2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwod2lkdGgpKSA9PSBudW1iZXJDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29udmVydCB0aGUgYHdpZHRoYCB0byBhbiBpbnRlZ2VyIGFuZCBjcmVhdGUgYSBzdHJpbmcgY29udGFpbmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYHdpZHRoYCBudW1iZXIgb2Ygc3BhY2UgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgod2lkdGggLT0gd2lkdGggJSAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh3aGl0ZXNwYWNlID0gXCJcIiwgd2lkdGggPiAxMCAmJiAod2lkdGggPSAxMCk7IHdoaXRlc3BhY2UubGVuZ3RoIDwgd2lkdGg7IHdoaXRlc3BhY2UgKz0gXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2xhc3NOYW1lID09IHN0cmluZ0NsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZXNwYWNlID0gd2lkdGgubGVuZ3RoIDw9IDEwID8gd2lkdGggOiB3aWR0aC5zbGljZSgwLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIE9wZXJhIDw9IDcuNTR1MiBkaXNjYXJkcyB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBlbXB0eSBzdHJpbmcga2V5c1xuICAgICAgICAgICAgICAgICAgICAvLyAoYFwiXCJgKSBvbmx5IGlmIHRoZXkgYXJlIHVzZWQgZGlyZWN0bHkgd2l0aGluIGFuIG9iamVjdCBtZW1iZXIgbGlzdFxuICAgICAgICAgICAgICAgICAgICAvLyAoZS5nLiwgYCEoXCJcIiBpbiB7IFwiXCI6IDF9KWApLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VyaWFsaXplKFwiXCIsICh2YWx1ZSA9IHt9LCB2YWx1ZVtcIlwiXSA9IHNvdXJjZSwgdmFsdWUpLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgXCJcIiwgW10pO1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBQdWJsaWM6IFBhcnNlcyBhIEpTT04gc291cmNlIHN0cmluZy5cbiAgICAgICAgICAgICAgICBpZiAoIWhhcyhcImpzb24tcGFyc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogQSBtYXAgb2YgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIHVuZXNjYXBlZFxuICAgICAgICAgICAgICAgICAgLy8gZXF1aXZhbGVudHMuXG4gICAgICAgICAgICAgICAgICB2YXIgVW5lc2NhcGVzID0ge1xuICAgICAgICAgICAgICAgICAgICA5MjogXCJcXFxcXCIsXG4gICAgICAgICAgICAgICAgICAgIDM0OiAnXCInLFxuICAgICAgICAgICAgICAgICAgICA0NzogXCIvXCIsXG4gICAgICAgICAgICAgICAgICAgIDk4OiBcIlxcYlwiLFxuICAgICAgICAgICAgICAgICAgICAxMTY6IFwiXFx0XCIsXG4gICAgICAgICAgICAgICAgICAgIDExMDogXCJcXG5cIixcbiAgICAgICAgICAgICAgICAgICAgMTAyOiBcIlxcZlwiLFxuICAgICAgICAgICAgICAgICAgICAxMTQ6IFwiXFxyXCJcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBTdG9yZXMgdGhlIHBhcnNlciBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgIHZhciBJbmRleCwgU291cmNlO1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogUmVzZXRzIHRoZSBwYXJzZXIgc3RhdGUgYW5kIHRocm93cyBhIGBTeW50YXhFcnJvcmAuXG4gICAgICAgICAgICAgICAgICB2YXIgYWJvcnQgPSBmdW5jdGlvbiBhYm9ydCgpIHtcbiAgICAgICAgICAgICAgICAgICAgSW5kZXggPSBTb3VyY2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBTeW50YXhFcnJvcigpO1xuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IFJldHVybnMgdGhlIG5leHQgdG9rZW4sIG9yIGBcIiRcImAgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZFxuICAgICAgICAgICAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgc291cmNlIHN0cmluZy4gQSB0b2tlbiBtYXkgYmUgYSBzdHJpbmcsIG51bWJlciwgYG51bGxgXG4gICAgICAgICAgICAgICAgICAvLyBsaXRlcmFsLCBvciBCb29sZWFuIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICB2YXIgbGV4ID0gZnVuY3Rpb24gbGV4KCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gU291cmNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2lnbmVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGU7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChJbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgOTpjYXNlIDEwOmNhc2UgMTM6Y2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCB3aGl0ZXNwYWNlIHRva2VucywgaW5jbHVkaW5nIHRhYnMsIGNhcnJpYWdlIHJldHVybnMsIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmVlZHMsIGFuZCBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTIzOmNhc2UgMTI1OmNhc2UgOTE6Y2FzZSA5MzpjYXNlIDU4OmNhc2UgNDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGEgcHVuY3R1YXRvciB0b2tlbiAoYHtgLCBgfWAsIGBbYCwgYF1gLCBgOmAsIG9yIGAsYCkgYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2hhckluZGV4QnVnZ3kgPyBzb3VyY2UuY2hhckF0KEluZGV4KSA6IHNvdXJjZVtJbmRleF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcImAgZGVsaW1pdHMgYSBKU09OIHN0cmluZzsgYWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJlZ2luIHBhcnNpbmcgdGhlIHN0cmluZy4gU3RyaW5nIHRva2VucyBhcmUgcHJlZml4ZWQgd2l0aCB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VudGluZWwgYEBgIGNoYXJhY3RlciB0byBkaXN0aW5ndWlzaCB0aGVtIGZyb20gcHVuY3R1YXRvcnMgYW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVuZC1vZi1zdHJpbmcgdG9rZW5zLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhbHVlID0gXCJAXCIsIEluZGV4Kys7IEluZGV4IDwgbGVuZ3RoOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA8IDMyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmVzY2FwZWQgQVNDSUkgY29udHJvbCBjaGFyYWN0ZXJzICh0aG9zZSB3aXRoIGEgY29kZSB1bml0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXNzIHRoYW4gdGhlIHNwYWNlIGNoYXJhY3RlcikgYXJlIG5vdCBwZXJtaXR0ZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY2hhckNvZGUgPT0gOTIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgcmV2ZXJzZSBzb2xpZHVzIChgXFxgKSBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGFuIGVzY2FwZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnRyb2wgY2hhcmFjdGVyIChpbmNsdWRpbmcgYFwiYCwgYFxcYCwgYW5kIGAvYCkgb3IgVW5pY29kZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAoY2hhckNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5MjpjYXNlIDM0OmNhc2UgNDc6Y2FzZSA5ODpjYXNlIDExNjpjYXNlIDExMDpjYXNlIDEwMjpjYXNlIDExNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZpdmUgZXNjYXBlZCBjb250cm9sIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gVW5lc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDExNzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBgXFx1YCBtYXJrcyB0aGUgYmVnaW5uaW5nIG9mIGEgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIGFuZCB2YWxpZGF0ZSB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmb3VyLWRpZ2l0IGNvZGUgcG9pbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSArK0luZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocG9zaXRpb24gPSBJbmRleCArIDQ7IEluZGV4IDwgcG9zaXRpb247IEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSB2YWxpZCBzZXF1ZW5jZSBjb21wcmlzZXMgZm91ciBoZXhkaWdpdHMgKGNhc2UtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnNlbnNpdGl2ZSkgdGhhdCBmb3JtIGEgc2luZ2xlIGhleGFkZWNpbWFsIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEoY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcgfHwgY2hhckNvZGUgPj0gOTcgJiYgY2hhckNvZGUgPD0gMTAyIHx8IGNoYXJDb2RlID49IDY1ICYmIGNoYXJDb2RlIDw9IDcwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXZpdmUgdGhlIGVzY2FwZWQgY2hhcmFjdGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IGZyb21DaGFyQ29kZShcIjB4XCIgKyBzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSW52YWxpZCBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFuIHVuZXNjYXBlZCBkb3VibGUtcXVvdGUgY2hhcmFjdGVyIG1hcmtzIHRoZSBlbmQgb2YgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiBjYXNlIHdoZXJlIGEgc3RyaW5nIGlzIHZhbGlkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGNoYXJDb2RlID49IDMyICYmIGNoYXJDb2RlICE9IDkyICYmIGNoYXJDb2RlICE9IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBlbmQgdGhlIHN0cmluZyBhcy1pcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlICs9IHNvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDM0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSB0byB0aGUgbmV4dCBjaGFyYWN0ZXIgYW5kIHJldHVybiB0aGUgcmV2aXZlZCBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW50ZXJtaW5hdGVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIG51bWJlcnMgYW5kIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9IEluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHBhc3QgdGhlIG5lZ2F0aXZlIHNpZ24sIGlmIG9uZSBpcyBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0NSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2lnbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGFuIGludGVnZXIgb3IgZmxvYXRpbmctcG9pbnQgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgemVyb2VzIGFyZSBpbnRlcnByZXRlZCBhcyBvY3RhbCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXggKyAxKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIG9jdGFsIGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NpZ25lZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBpbnRlZ2VyIGNvbXBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDsgSW5kZXggPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IEluZGV4KyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZsb2F0cyBjYW5ub3QgY29udGFpbiBhIGxlYWRpbmcgZGVjaW1hbCBwb2ludDsgaG93ZXZlciwgdGhpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNhc2UgaXMgYWxyZWFkeSBhY2NvdW50ZWQgZm9yIGJ5IHRoZSBwYXJzZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KSA9PSA0Nikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSArK0luZGV4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGRlY2ltYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpOyBwb3NpdGlvbisrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIHRyYWlsaW5nIGRlY2ltYWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRleCA9IHBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSBleHBvbmVudHMuIFRoZSBgZWAgZGVub3RpbmcgdGhlIGV4cG9uZW50IGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FzZS1pbnNlbnNpdGl2ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMTAxIHx8IGNoYXJDb2RlID09IDY5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2tpcCBwYXN0IHRoZSBzaWduIGZvbGxvd2luZyB0aGUgZXhwb25lbnQsIGlmIG9uZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3BlY2lmaWVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQzIHx8IGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZXhwb25lbnRpYWwgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChwb3NpdGlvbiA9IEluZGV4OyBwb3NpdGlvbiA8IGxlbmd0aCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChwb3NpdGlvbiksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgcG9zaXRpb24rKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPT0gSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWxsZWdhbCBlbXB0eSBleHBvbmVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvZXJjZSB0aGUgcGFyc2VkIHZhbHVlIHRvIGEgSmF2YVNjcmlwdCBudW1iZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICtzb3VyY2Uuc2xpY2UoYmVnaW4sIEluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIG5lZ2F0aXZlIHNpZ24gbWF5IG9ubHkgcHJlY2VkZSBudW1iZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNTaWduZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGB0cnVlYCwgYGZhbHNlYCwgYW5kIGBudWxsYCBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcInRydWVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDUpID09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNvdXJjZS5zbGljZShJbmRleCwgSW5kZXggKyA0KSA9PSBcIm51bGxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4ICs9IDQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5yZWNvZ25pemVkIHRva2VuLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHNlbnRpbmVsIGAkYCBjaGFyYWN0ZXIgaWYgdGhlIHBhcnNlciBoYXMgcmVhY2hlZCB0aGUgZW5kXG4gICAgICAgICAgICAgICAgICAgIC8vIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCIkXCI7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogUGFyc2VzIGEgSlNPTiBgdmFsdWVgIHRva2VuLlxuICAgICAgICAgICAgICAgICAgdmFyIGdldCA9IGZ1bmN0aW9uIGdldCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cywgaGFzTWVtYmVycztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiJFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCBlbmQgb2YgaW5wdXQuXG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pID09IFwiQFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHNlbnRpbmVsIGBAYCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIG9iamVjdCBhbmQgYXJyYXkgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiW1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIGFycmF5LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBhcnJheS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOzsgaGFzTWVtYmVycyB8fCAoaGFzTWVtYmVycyA9IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gbGV4KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgY2xvc2luZyBzcXVhcmUgYnJhY2tldCBtYXJrcyB0aGUgZW5kIG9mIHRoZSBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJdXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgYXJyYXkgbGl0ZXJhbCBjb250YWlucyBlbGVtZW50cywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdGluZyB0aGUgcHJldmlvdXMgZWxlbWVudCBmcm9tIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBuZXh0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBhcnJheSBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggYXJyYXkgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVsaXNpb25zIGFuZCBsZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goZ2V0KHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IFwie1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZXMgYSBKU09OIG9iamVjdCwgcmV0dXJuaW5nIGEgbmV3IEphdmFTY3JpcHQgb2JqZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OyBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIGN1cmx5IGJyYWNlIG1hcmtzIHRoZSBlbmQgb2YgdGhlIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgb2JqZWN0IGxpdGVyYWwgY29udGFpbnMgbWVtYmVycywgdGhlIGN1cnJlbnQgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdWxkIGJlIGEgY29tbWEgc2VwYXJhdG9yLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaGFzTWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRyYWlsaW5nIGAsYCBpbiBvYmplY3QgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBgLGAgbXVzdCBzZXBhcmF0ZSBlYWNoIG9iamVjdCBtZW1iZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZWFkaW5nIGNvbW1hcyBhcmUgbm90IHBlcm1pdHRlZCwgb2JqZWN0IHByb3BlcnR5IG5hbWVzIG11c3QgYmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZG91YmxlLXF1b3RlZCBzdHJpbmdzLCBhbmQgYSBgOmAgbXVzdCBzZXBhcmF0ZSBlYWNoIHByb3BlcnR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hbWUgYW5kIHZhbHVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIgfHwgdHlwZW9mIHZhbHVlICE9IFwic3RyaW5nXCIgfHwgKGNoYXJJbmRleEJ1Z2d5ID8gdmFsdWUuY2hhckF0KDApIDogdmFsdWVbMF0pICE9IFwiQFwiIHx8IGxleCgpICE9IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzW3ZhbHVlLnNsaWNlKDEpXSA9IGdldChsZXgoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVW5leHBlY3RlZCB0b2tlbiBlbmNvdW50ZXJlZC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBVcGRhdGVzIGEgdHJhdmVyc2VkIG9iamVjdCBtZW1iZXIuXG4gICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gd2Fsayhzb3VyY2UsIHByb3BlcnR5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSB1bmRlZikge1xuICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZVtwcm9wZXJ0eV0gPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogUmVjdXJzaXZlbHkgdHJhdmVyc2VzIGEgcGFyc2VkIEpTT04gb2JqZWN0LCBpbnZva2luZyB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIGBjYWxsYmFja2AgZnVuY3Rpb24gZm9yIGVhY2ggdmFsdWUuIFRoaXMgaXMgYW4gaW1wbGVtZW50YXRpb24gb2YgdGhlXG4gICAgICAgICAgICAgICAgICAvLyBgV2Fsayhob2xkZXIsIG5hbWUpYCBvcGVyYXRpb24gZGVmaW5lZCBpbiBFUyA1LjEgc2VjdGlvbiAxNS4xMi4yLlxuICAgICAgICAgICAgICAgICAgdmFyIHdhbGsgPSBmdW5jdGlvbiB3YWxrKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJvYmplY3RcIiAmJiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIGBmb3JFYWNoYCBjYW4ndCBiZSB1c2VkIHRvIHRyYXZlcnNlIGFuIGFycmF5IGluIE9wZXJhIDw9IDguNTRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIGl0cyBgT2JqZWN0I2hhc093blByb3BlcnR5YCBpbXBsZW1lbnRhdGlvbiByZXR1cm5zIGBmYWxzZWBcbiAgICAgICAgICAgICAgICAgICAgICAvLyBmb3IgYXJyYXkgaW5kaWNlcyAoZS5nLiwgYCFbMSwgMiwgM10uaGFzT3duUHJvcGVydHkoXCIwXCIpYCkuXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGdldENsYXNzLmNhbGwodmFsdWUpID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gdmFsdWUubGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKHZhbHVlLCBsZW5ndGgsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yRWFjaCh2YWx1ZSwgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZSh2YWx1ZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2suY2FsbChzb3VyY2UsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBQdWJsaWM6IGBKU09OLnBhcnNlYC4gU2VlIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICAgICAgICAgICAgICBleHBvcnRzLnBhcnNlID0gZnVuY3Rpb24gKHNvdXJjZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCwgdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIEluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgU291cmNlID0gXCJcIiArIHNvdXJjZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZ2V0KGxleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSBKU09OIHN0cmluZyBjb250YWlucyBtdWx0aXBsZSB0b2tlbnMsIGl0IGlzIGludmFsaWQuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsZXgoKSAhPSBcIiRcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVzZXQgdGhlIHBhcnNlciBzdGF0ZS5cbiAgICAgICAgICAgICAgICAgICAgSW5kZXggPSBTb3VyY2UgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sgJiYgZ2V0Q2xhc3MuY2FsbChjYWxsYmFjaykgPT0gZnVuY3Rpb25DbGFzcyA/IHdhbGsoKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gcmVzdWx0LCB2YWx1ZSksIFwiXCIsIGNhbGxiYWNrKSA6IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZXhwb3J0c1tcInJ1bkluQ29udGV4dFwiXSA9IHJ1bkluQ29udGV4dDtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChmcmVlRXhwb3J0cyAmJiAhaXNMb2FkZXIpIHtcbiAgICAgICAgICAgICAgLy8gRXhwb3J0IGZvciBDb21tb25KUyBlbnZpcm9ubWVudHMuXG4gICAgICAgICAgICAgIHJ1bkluQ29udGV4dChyb290LCBmcmVlRXhwb3J0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBFeHBvcnQgZm9yIHdlYiBicm93c2VycyBhbmQgSmF2YVNjcmlwdCBlbmdpbmVzLlxuICAgICAgICAgICAgICB2YXIgbmF0aXZlSlNPTiA9IHJvb3QuSlNPTixcbiAgICAgICAgICAgICAgICAgIHByZXZpb3VzSlNPTiA9IHJvb3RbXCJKU09OM1wiXSxcbiAgICAgICAgICAgICAgICAgIGlzUmVzdG9yZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICB2YXIgSlNPTjMgPSBydW5JbkNvbnRleHQocm9vdCwgcm9vdFtcIkpTT04zXCJdID0ge1xuICAgICAgICAgICAgICAgIC8vIFB1YmxpYzogUmVzdG9yZXMgdGhlIG9yaWdpbmFsIHZhbHVlIG9mIHRoZSBnbG9iYWwgYEpTT05gIG9iamVjdCBhbmRcbiAgICAgICAgICAgICAgICAvLyByZXR1cm5zIGEgcmVmZXJlbmNlIHRvIHRoZSBgSlNPTjNgIG9iamVjdC5cbiAgICAgICAgICAgICAgICBcIm5vQ29uZmxpY3RcIjogZnVuY3Rpb24gbm9Db25mbGljdCgpIHtcbiAgICAgICAgICAgICAgICAgIGlmICghaXNSZXN0b3JlZCkge1xuICAgICAgICAgICAgICAgICAgICBpc1Jlc3RvcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcm9vdC5KU09OID0gbmF0aXZlSlNPTjtcbiAgICAgICAgICAgICAgICAgICAgcm9vdFtcIkpTT04zXCJdID0gcHJldmlvdXNKU09OO1xuICAgICAgICAgICAgICAgICAgICBuYXRpdmVKU09OID0gcHJldmlvdXNKU09OID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIHJvb3QuSlNPTiA9IHtcbiAgICAgICAgICAgICAgICBcInBhcnNlXCI6IEpTT04zLnBhcnNlLFxuICAgICAgICAgICAgICAgIFwic3RyaW5naWZ5XCI6IEpTT04zLnN0cmluZ2lmeVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBFeHBvcnQgZm9yIGFzeW5jaHJvbm91cyBtb2R1bGUgbG9hZGVycy5cbiAgICAgICAgICAgIGlmIChpc0xvYWRlcikge1xuICAgICAgICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OMztcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkuY2FsbCh0aGlzKTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHt9XSwgMzU6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEhlbHBlcnMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHMgPSAxMDAwO1xuICAgICAgICB2YXIgbSA9IHMgKiA2MDtcbiAgICAgICAgdmFyIGggPSBtICogNjA7XG4gICAgICAgIHZhciBkID0gaCAqIDI0O1xuICAgICAgICB2YXIgeSA9IGQgKiAzNjUuMjU7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFyc2Ugb3IgZm9ybWF0IHRoZSBnaXZlbiBgdmFsYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIE9wdGlvbnM6XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gdmFsXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB2YWwpIHJldHVybiBwYXJzZSh2YWwpO1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBsb25nKHZhbCkgOiBzaG9ydCh2YWwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhcnNlIHRoZSBnaXZlbiBgc3RyYCBhbmQgcmV0dXJuIG1pbGxpc2Vjb25kcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gICAgICAgICAgc3RyID0gJycgKyBzdHI7XG4gICAgICAgICAgaWYgKHN0ci5sZW5ndGggPiAxMDAwMCkgcmV0dXJuO1xuICAgICAgICAgIHZhciBtYXRjaCA9IC9eKCg/OlxcZCspP1xcLj9cXGQrKSAqKG1pbGxpc2Vjb25kcz98bXNlY3M/fG1zfHNlY29uZHM/fHNlY3M/fHN8bWludXRlcz98bWlucz98bXxob3Vycz98aHJzP3xofGRheXM/fGR8eWVhcnM/fHlycz98eSk/JC9pLmV4ZWMoc3RyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm47XG4gICAgICAgICAgdmFyIG4gPSBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcbiAgICAgICAgICB2YXIgdHlwZSA9IChtYXRjaFsyXSB8fCAnbXMnKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAneWVhcnMnOlxuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICBjYXNlICd5cnMnOlxuICAgICAgICAgICAgY2FzZSAneXInOlxuICAgICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICAgIHJldHVybiBuICogeTtcbiAgICAgICAgICAgIGNhc2UgJ2RheXMnOlxuICAgICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICByZXR1cm4gbiAqIGQ7XG4gICAgICAgICAgICBjYXNlICdob3Vycyc6XG4gICAgICAgICAgICBjYXNlICdob3VyJzpcbiAgICAgICAgICAgIGNhc2UgJ2hycyc6XG4gICAgICAgICAgICBjYXNlICdocic6XG4gICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgcmV0dXJuIG4gKiBoO1xuICAgICAgICAgICAgY2FzZSAnbWludXRlcyc6XG4gICAgICAgICAgICBjYXNlICdtaW51dGUnOlxuICAgICAgICAgICAgY2FzZSAnbWlucyc6XG4gICAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgIHJldHVybiBuICogbTtcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjb25kJzpcbiAgICAgICAgICAgIGNhc2UgJ3NlY3MnOlxuICAgICAgICAgICAgY2FzZSAnc2VjJzpcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICByZXR1cm4gbiAqIHM7XG4gICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgICAgICAgICAgY2FzZSAnbWlsbGlzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnbXNlY3MnOlxuICAgICAgICAgICAgY2FzZSAnbXNlYyc6XG4gICAgICAgICAgICBjYXNlICdtcyc6XG4gICAgICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNob3J0IGZvcm1hdCBmb3IgYG1zYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtc1xyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBzaG9ydChtcykge1xuICAgICAgICAgIGlmIChtcyA+PSBkKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGQpICsgJ2QnO1xuICAgICAgICAgIGlmIChtcyA+PSBoKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIGgpICsgJ2gnO1xuICAgICAgICAgIGlmIChtcyA+PSBtKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICAgICAgICAgIGlmIChtcyA+PSBzKSByZXR1cm4gTWF0aC5yb3VuZChtcyAvIHMpICsgJ3MnO1xuICAgICAgICAgIHJldHVybiBtcyArICdtcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMb25nIGZvcm1hdCBmb3IgYG1zYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtc1xyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ31cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBsb25nKG1zKSB7XG4gICAgICAgICAgcmV0dXJuIHBsdXJhbChtcywgZCwgJ2RheScpIHx8IHBsdXJhbChtcywgaCwgJ2hvdXInKSB8fCBwbHVyYWwobXMsIG0sICdtaW51dGUnKSB8fCBwbHVyYWwobXMsIHMsICdzZWNvbmQnKSB8fCBtcyArICcgbXMnO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gcGx1cmFsKG1zLCBuLCBuYW1lKSB7XG4gICAgICAgICAgaWYgKG1zIDwgbikgcmV0dXJuO1xuICAgICAgICAgIGlmIChtcyA8IG4gKiAxLjUpIHJldHVybiBNYXRoLmZsb29yKG1zIC8gbikgKyAnICcgKyBuYW1lO1xuICAgICAgICAgIHJldHVybiBNYXRoLmNlaWwobXMgLyBuKSArICcgJyArIG5hbWUgKyAncyc7XG4gICAgICAgIH1cbiAgICAgIH0sIHt9XSwgMzY6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBKU09OIHBhcnNlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBzZWUgQmFzZWQgb24galF1ZXJ5I3BhcnNlSlNPTiAoTUlUKSBhbmQgSlNPTjJcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgcnZhbGlkY2hhcnMgPSAvXltcXF0sOnt9XFxzXSokLztcbiAgICAgICAgICB2YXIgcnZhbGlkZXNjYXBlID0gL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZztcbiAgICAgICAgICB2YXIgcnZhbGlkdG9rZW5zID0gL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nO1xuICAgICAgICAgIHZhciBydmFsaWRicmFjZXMgPSAvKD86Xnw6fCwpKD86XFxzKlxcWykrL2c7XG4gICAgICAgICAgdmFyIHJ0cmltTGVmdCA9IC9eXFxzKy87XG4gICAgICAgICAgdmFyIHJ0cmltUmlnaHQgPSAvXFxzKyQvO1xuXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZWpzb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKCdzdHJpbmcnICE9IHR5cGVvZiBkYXRhIHx8ICFkYXRhKSB7XG4gICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKHJ0cmltTGVmdCwgJycpLnJlcGxhY2UocnRyaW1SaWdodCwgJycpO1xuXG4gICAgICAgICAgICAvLyBBdHRlbXB0IHRvIHBhcnNlIHVzaW5nIHRoZSBuYXRpdmUgSlNPTiBwYXJzZXIgZmlyc3RcbiAgICAgICAgICAgIGlmIChnbG9iYWwuSlNPTiAmJiBKU09OLnBhcnNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocnZhbGlkY2hhcnMudGVzdChkYXRhLnJlcGxhY2UocnZhbGlkZXNjYXBlLCAnQCcpLnJlcGxhY2UocnZhbGlkdG9rZW5zLCAnXScpLnJlcGxhY2UocnZhbGlkYnJhY2VzLCAnJykpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ3JldHVybiAnICsgZGF0YSkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwge31dLCAzNzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xyXG4gICAgICAgICAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuZW5jb2RlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIHZhciBzdHIgPSAnJztcblxuICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoKSBzdHIgKz0gJyYnO1xuICAgICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHN0cjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxc1xyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuZGVjb2RlID0gZnVuY3Rpb24gKHFzKSB7XG4gICAgICAgICAgdmFyIHFyeSA9IHt9O1xuICAgICAgICAgIHZhciBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYWlyID0gcGFpcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcXJ5O1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAzODogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFyc2VzIGFuIFVSSVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciByZSA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KCg/OlthLWYwLTldezAsNH06KXsyLDd9W2EtZjAtOV17MCw0fXxbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvO1xuXG4gICAgICAgIHZhciBwYXJ0cyA9IFsnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJywgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvciddO1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2V1cmkoc3RyKSB7XG4gICAgICAgICAgdmFyIHNyYyA9IHN0cixcbiAgICAgICAgICAgICAgYiA9IHN0ci5pbmRleE9mKCdbJyksXG4gICAgICAgICAgICAgIGUgPSBzdHIuaW5kZXhPZignXScpO1xuXG4gICAgICAgICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICAgICAgc3RyID0gc3RyLnN1YnN0cmluZygwLCBiKSArIHN0ci5zdWJzdHJpbmcoYiwgZSkucmVwbGFjZSgvOi9nLCAnOycpICsgc3RyLnN1YnN0cmluZyhlLCBzdHIubGVuZ3RoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSxcbiAgICAgICAgICAgICAgdXJpID0ge30sXG4gICAgICAgICAgICAgIGkgPSAxNDtcblxuICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XG4gICAgICAgICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0LnN1YnN0cmluZygxLCB1cmkuaG9zdC5sZW5ndGggLSAxKS5yZXBsYWNlKC87L2csICc6Jyk7XG4gICAgICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB1cmk7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDM5OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgICAgIC8qZ2xvYmFsIEJsb2IsRmlsZSovXG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGlzQXJyYXkgPSBfZGVyZXFfKCdpc2FycmF5Jyk7XG4gICAgICAgICAgdmFyIGlzQnVmID0gX2RlcmVxXygnLi9pcy1idWZmZXInKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cclxuICAgICAgICAgICAqIEFueXRoaW5nIHdpdGggYmxvYnMgb3IgZmlsZXMgc2hvdWxkIGJlIGZlZCB0aHJvdWdoIHJlbW92ZUJsb2JzIGJlZm9yZSBjb21pbmdcclxuICAgICAgICAgICAqIGhlcmUuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcclxuICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgICAgIHZhciBwYWNrZXREYXRhID0gcGFja2V0LmRhdGE7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9kZWNvbnN0cnVjdFBhY2tldChkYXRhKSB7XG4gICAgICAgICAgICAgIGlmICghZGF0YSkgcmV0dXJuIGRhdGE7XG5cbiAgICAgICAgICAgICAgaWYgKGlzQnVmKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgICAgICAgICBidWZmZXJzLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBsYWNlaG9sZGVyO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBuZXdEYXRhW2ldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PSB0eXBlb2YgZGF0YSAmJiAhKGRhdGEgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhID0ge307XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIG5ld0RhdGFba2V5XSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBhY2sgPSBwYWNrZXQ7XG4gICAgICAgICAgICBwYWNrLmRhdGEgPSBfZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0RGF0YSk7XG4gICAgICAgICAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgICAgICAgICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUmVjb25zdHJ1Y3RzIGEgYmluYXJ5IHBhY2tldCBmcm9tIGl0cyBwbGFjZWhvbGRlciBwYWNrZXQgYW5kIGJ1ZmZlcnNcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gZXZlbnQgcGFja2V0IHdpdGggcGxhY2Vob2xkZXJzXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5fSBidWZmZXJzIC0gYmluYXJ5IGJ1ZmZlcnMgdG8gcHV0IGluIHBsYWNlaG9sZGVyIHBvc2l0aW9uc1xyXG4gICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSByZWNvbnN0cnVjdGVkIHBhY2tldFxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQsIGJ1ZmZlcnMpIHtcbiAgICAgICAgICAgIHZhciBjdXJQbGFjZUhvbGRlciA9IDA7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ1ZiA9IGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVmO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEgJiYgJ29iamVjdCcgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYWNrZXQuZGF0YSA9IF9yZWNvbnN0cnVjdFBhY2tldChwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQXN5bmNocm9ub3VzbHkgcmVtb3ZlcyBCbG9icyBvciBGaWxlcyBmcm9tIGRhdGEgdmlhXHJcbiAgICAgICAgICAgKiBGaWxlUmVhZGVyJ3MgcmVhZEFzQXJyYXlCdWZmZXIgbWV0aG9kLiBVc2VkIGJlZm9yZSBlbmNvZGluZ1xyXG4gICAgICAgICAgICogZGF0YSBhcyBtc2dwYWNrLiBDYWxscyBjYWxsYmFjayB3aXRoIHRoZSBibG9ibGVzcyBkYXRhLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMucmVtb3ZlQmxvYnMgPSBmdW5jdGlvbiAoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIF9yZW1vdmVCbG9icyhvYmosIGN1cktleSwgY29udGFpbmluZ09iamVjdCkge1xuICAgICAgICAgICAgICBpZiAoIW9iaikgcmV0dXJuIG9iajtcblxuICAgICAgICAgICAgICAvLyBjb252ZXJ0IGFueSBibG9iXG4gICAgICAgICAgICAgIGlmIChnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iIHx8IGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nQmxvYnMrKztcblxuICAgICAgICAgICAgICAgIC8vIGFzeW5jIGZpbGVyZWFkZXJcbiAgICAgICAgICAgICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAvLyB0aGlzLnJlc3VsdCA9PSBhcnJheWJ1ZmZlclxuICAgICAgICAgICAgICAgICAgaWYgKGNvbnRhaW5pbmdPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmluZ09iamVjdFtjdXJLZXldID0gdGhpcy5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBibG9ibGVzc0RhdGEgPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgLy8gaWYgbm90aGluZyBwZW5kaW5nIGl0cyBjYWxsYmFjayB0aW1lXG4gICAgICAgICAgICAgICAgICBpZiAoISAtLXBlbmRpbmdCbG9icykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBmaWxlUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKG9iaik7IC8vIGJsb2IgLT4gYXJyYXlidWZmZXJcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBhcnJheVxuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtpXSwgaSwgb2JqKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqICYmICFpc0J1ZihvYmopKSB7XG4gICAgICAgICAgICAgICAgICAvLyBhbmQgb2JqZWN0XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgIF9yZW1vdmVCbG9icyhvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHBlbmRpbmdCbG9icyA9IDA7XG4gICAgICAgICAgICB2YXIgYmxvYmxlc3NEYXRhID0gZGF0YTtcbiAgICAgICAgICAgIF9yZW1vdmVCbG9icyhibG9ibGVzc0RhdGEpO1xuICAgICAgICAgICAgaWYgKCFwZW5kaW5nQmxvYnMpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2soYmxvYmxlc3NEYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwgeyBcIi4vaXMtYnVmZmVyXCI6IDQxLCBcImlzYXJyYXlcIjogMzMgfV0sIDQwOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLXBhcnNlcicpO1xuICAgICAgICB2YXIganNvbiA9IF9kZXJlcV8oJ2pzb24zJyk7XG4gICAgICAgIHZhciBpc0FycmF5ID0gX2RlcmVxXygnaXNhcnJheScpO1xuICAgICAgICB2YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG4gICAgICAgIHZhciBiaW5hcnkgPSBfZGVyZXFfKCcuL2JpbmFyeScpO1xuICAgICAgICB2YXIgaXNCdWYgPSBfZGVyZXFfKCcuL2lzLWJ1ZmZlcicpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByb3RvY29sIHZlcnNpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMucHJvdG9jb2wgPSA0O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhY2tldCB0eXBlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy50eXBlcyA9IFsnQ09OTkVDVCcsICdESVNDT05ORUNUJywgJ0VWRU5UJywgJ0FDSycsICdFUlJPUicsICdCSU5BUllfRVZFTlQnLCAnQklOQVJZX0FDSyddO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBjb25uZWN0YC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5DT05ORUNUID0gMDtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSBgZGlzY29ubmVjdGAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuRElTQ09OTkVDVCA9IDE7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGV2ZW50YC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5FVkVOVCA9IDI7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGFja2AuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuQUNLID0gMztcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSBgZXJyb3JgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkVSUk9SID0gNDtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSAnYmluYXJ5IGV2ZW50J1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkJJTkFSWV9FVkVOVCA9IDU7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGJpbmFyeSBhY2tgLiBGb3IgYWNrcyB3aXRoIGJpbmFyeSBhcmd1bWVudHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuQklOQVJZX0FDSyA9IDY7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlciBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5FbmNvZGVyID0gRW5jb2RlcjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkRlY29kZXIgPSBEZWNvZGVyO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gRW5jb2RlcigpIHt9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXHJcbiAgICAgICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gZnVuY3Rpb24gdG8gaGFuZGxlIGVuY29kaW5ncyAobGlrZWx5IGVuZ2luZS53cml0ZSlcclxuICAgICAgICAgKiBAcmV0dXJuIENhbGxzIGNhbGxiYWNrIHdpdGggQXJyYXkgb2YgZW5jb2RpbmdzXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbmNvZGVyLnByb3RvdHlwZS5lbmNvZGUgPSBmdW5jdGlvbiAob2JqLCBjYWxsYmFjaykge1xuICAgICAgICAgIGRlYnVnKCdlbmNvZGluZyBwYWNrZXQgJWonLCBvYmopO1xuXG4gICAgICAgICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IG9iai50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBvYmoudHlwZSkge1xuICAgICAgICAgICAgZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjayk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlbmNvZGluZyA9IGVuY29kZUFzU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBjYWxsYmFjayhbZW5jb2RpbmddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBlbmNvZGVkXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlQXNTdHJpbmcob2JqKSB7XG4gICAgICAgICAgdmFyIHN0ciA9ICcnO1xuICAgICAgICAgIHZhciBuc3AgPSBmYWxzZTtcblxuICAgICAgICAgIC8vIGZpcnN0IGlzIHR5cGVcbiAgICAgICAgICBzdHIgKz0gb2JqLnR5cGU7XG5cbiAgICAgICAgICAvLyBhdHRhY2htZW50cyBpZiB3ZSBoYXZlIHRoZW1cbiAgICAgICAgICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzO1xuICAgICAgICAgICAgc3RyICs9ICctJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gICAgICAgICAgLy8gd2UgYXBwZW5kIGl0IGZvbGxvd2VkIGJ5IGEgY29tbWEgYCxgXG4gICAgICAgICAgaWYgKG9iai5uc3AgJiYgJy8nICE9IG9iai5uc3ApIHtcbiAgICAgICAgICAgIG5zcCA9IHRydWU7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLm5zcDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgICAgICAgICBpZiAobnVsbCAhPSBvYmouaWQpIHtcbiAgICAgICAgICAgIGlmIChuc3ApIHtcbiAgICAgICAgICAgICAgc3RyICs9ICcsJztcbiAgICAgICAgICAgICAgbnNwID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmlkO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGpzb24gZGF0YVxuICAgICAgICAgIGlmIChudWxsICE9IG9iai5kYXRhKSB7XG4gICAgICAgICAgICBpZiAobnNwKSBzdHIgKz0gJywnO1xuICAgICAgICAgICAgc3RyICs9IGpzb24uc3RyaW5naWZ5KG9iai5kYXRhKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJ1ZygnZW5jb2RlZCAlaiBhcyAlcycsIG9iaiwgc3RyKTtcbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXHJcbiAgICAgICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxyXG4gICAgICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gICAgICAgICAqIEByZXR1cm4ge0J1ZmZlcn0gZW5jb2RlZFxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGVuY29kZUFzQmluYXJ5KG9iaiwgY2FsbGJhY2spIHtcblxuICAgICAgICAgIGZ1bmN0aW9uIHdyaXRlRW5jb2RpbmcoYmxvYmxlc3NEYXRhKSB7XG4gICAgICAgICAgICB2YXIgZGVjb25zdHJ1Y3Rpb24gPSBiaW5hcnkuZGVjb25zdHJ1Y3RQYWNrZXQoYmxvYmxlc3NEYXRhKTtcbiAgICAgICAgICAgIHZhciBwYWNrID0gZW5jb2RlQXNTdHJpbmcoZGVjb25zdHJ1Y3Rpb24ucGFja2V0KTtcbiAgICAgICAgICAgIHZhciBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcblxuICAgICAgICAgICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgICAgICAgICAgY2FsbGJhY2soYnVmZmVycyk7IC8vIHdyaXRlIGFsbCB0aGUgYnVmZmVyc1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJpbmFyeS5yZW1vdmVCbG9icyhvYmosIHdyaXRlRW5jb2RpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBzb2NrZXQuaW8gRGVjb2RlciBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBkZWNvZGVyXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBEZWNvZGVyKCkge1xuICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgIHdpdGggRGVjb2Rlci5cclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyKERlY29kZXIucHJvdG90eXBlKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWNvZGVzIGFuIGVjb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRGVjb2Rlci5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIHZhciBwYWNrZXQ7XG4gICAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgIHBhY2tldCA9IGRlY29kZVN0cmluZyhvYmopO1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IHBhY2tldC50eXBlIHx8IGV4cG9ydHMuQklOQVJZX0FDSyA9PSBwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuXG4gICAgICAgICAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICAgICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IucmVjb25QYWNrLmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNCdWYob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0Jyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdkZWNvZGVkJywgcGFja2V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gdHlwZTogJyArIG9iaik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgICAgICAgICB2YXIgcCA9IHt9O1xuICAgICAgICAgIHZhciBpID0gMDtcblxuICAgICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICAgIHAudHlwZSA9IE51bWJlcihzdHIuY2hhckF0KDApKTtcbiAgICAgICAgICBpZiAobnVsbCA9PSBleHBvcnRzLnR5cGVzW3AudHlwZV0pIHJldHVybiBlcnJvcigpO1xuXG4gICAgICAgICAgLy8gbG9vayB1cCBhdHRhY2htZW50cyBpZiB0eXBlIGJpbmFyeVxuICAgICAgICAgIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBwLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IHAudHlwZSkge1xuICAgICAgICAgICAgdmFyIGJ1ZiA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPSAnLScpIHtcbiAgICAgICAgICAgICAgYnVmICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9ICctJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0lsbGVnYWwgYXR0YWNobWVudHMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuYXR0YWNobWVudHMgPSBOdW1iZXIoYnVmKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICAgICAgICAgIGlmICgnLycgPT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIHAubnNwID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgaWYgKCcsJyA9PSBjKSBicmVhaztcbiAgICAgICAgICAgICAgcC5uc3AgKz0gYztcbiAgICAgICAgICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAubnNwID0gJy8nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGxvb2sgdXAgaWRcbiAgICAgICAgICB2YXIgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICAgICAgICAgIGlmICgnJyAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgICAgICAgICAgcC5pZCA9ICcnO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcC5pZCArPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICBpZiAoaSA9PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuaWQgPSBOdW1iZXIocC5pZCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBwLmRhdGEgPSBqc29uLnBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWJ1ZygnZGVjb2RlZCAlcyBhcyAlaicsIHN0ciwgcCk7XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBEZWNvZGVyLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcclxuICAgICAgICAgKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xyXG4gICAgICAgICAqIGRlY29kZWQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIEJpbmFyeVJlY29uc3RydWN0b3IocGFja2V0KSB7XG4gICAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gICAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXHJcbiAgICAgICAgICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcclxuICAgICAgICAgKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxyXG4gICAgICAgICAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLnRha2VCaW5hcnlEYXRhID0gZnVuY3Rpb24gKGJpbkRhdGEpIHtcbiAgICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgICAgICAgICB2YXIgcGFja2V0ID0gYmluYXJ5LnJlY29uc3RydWN0UGFja2V0KHRoaXMucmVjb25QYWNrLCB0aGlzLmJ1ZmZlcnMpO1xuICAgICAgICAgICAgdGhpcy5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICByZXR1cm4gcGFja2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDbGVhbnMgdXAgYmluYXJ5IHBhY2tldCByZWNvbnN0cnVjdGlvbiB2YXJpYWJsZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBCaW5hcnlSZWNvbnN0cnVjdG9yLnByb3RvdHlwZS5maW5pc2hlZFJlY29uc3RydWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBlcnJvcihkYXRhKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IGV4cG9ydHMuRVJST1IsXG4gICAgICAgICAgICBkYXRhOiAncGFyc2VyIGVycm9yJ1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sIHsgXCIuL2JpbmFyeVwiOiAzOSwgXCIuL2lzLWJ1ZmZlclwiOiA0MSwgXCJjb21wb25lbnQtZW1pdHRlclwiOiA0MiwgXCJkZWJ1Z1wiOiAxNCwgXCJpc2FycmF5XCI6IDMzLCBcImpzb24zXCI6IDM0IH1dLCA0MTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gaXNCdWY7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBidWZmZXIgb3IgYW4gYXJyYXlidWZmZXIuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIGlzQnVmKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbC5CdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7fV0sIDQyOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICBhcmd1bWVudHNbNF1bMjZdWzBdLmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cyk7XG4gICAgICB9LCB7IFwiZHVwXCI6IDI2IH1dLCA0MzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSB0b0FycmF5O1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvQXJyYXkobGlzdCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBbXTtcblxuICAgICAgICAgIGluZGV4ID0gaW5kZXggfHwgMDtcblxuICAgICAgICAgIGZvciAodmFyIGkgPSBpbmRleCB8fCAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJyYXlbaSAtIGluZGV4XSA9IGxpc3RbaV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgICAgICB9XG4gICAgICB9LCB7fV0sIDQ0OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgICAgIC8qISBodHRwczovL210aHMuYmUvdXRmOGpzIHYyLjAuMCBieSBAbWF0aGlhcyAqL1xuICAgICAgICAgIDsoZnVuY3Rpb24gKHJvb3QpIHtcblxuICAgICAgICAgICAgLy8gRGV0ZWN0IGZyZWUgdmFyaWFibGVzIGBleHBvcnRzYFxuICAgICAgICAgICAgdmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cztcblxuICAgICAgICAgICAgLy8gRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWBcbiAgICAgICAgICAgIHZhciBmcmVlTW9kdWxlID0gdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgPT0gZnJlZUV4cG9ydHMgJiYgbW9kdWxlO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCwgZnJvbSBOb2RlLmpzIG9yIEJyb3dzZXJpZmllZCBjb2RlLFxuICAgICAgICAgICAgLy8gYW5kIHVzZSBpdCBhcyBgcm9vdGBcbiAgICAgICAgICAgIHZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWw7XG4gICAgICAgICAgICBpZiAoZnJlZUdsb2JhbC5nbG9iYWwgPT09IGZyZWVHbG9iYWwgfHwgZnJlZUdsb2JhbC53aW5kb3cgPT09IGZyZWVHbG9iYWwpIHtcbiAgICAgICAgICAgICAgcm9vdCA9IGZyZWVHbG9iYWw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgICAgICB2YXIgc3RyaW5nRnJvbUNoYXJDb2RlID0gU3RyaW5nLmZyb21DaGFyQ29kZTtcblxuICAgICAgICAgICAgLy8gVGFrZW4gZnJvbSBodHRwczovL210aHMuYmUvcHVueWNvZGVcbiAgICAgICAgICAgIGZ1bmN0aW9uIHVjczJkZWNvZGUoc3RyaW5nKSB7XG4gICAgICAgICAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgICAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICB2YXIgZXh0cmE7XG4gICAgICAgICAgICAgIHdoaWxlIChjb3VudGVyIDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+PSAweEQ4MDAgJiYgdmFsdWUgPD0gMHhEQkZGICYmIGNvdW50ZXIgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGhpZ2ggc3Vycm9nYXRlLCBhbmQgdGhlcmUgaXMgYSBuZXh0IGNoYXJhY3RlclxuICAgICAgICAgICAgICAgICAgZXh0cmEgPSBzdHJpbmcuY2hhckNvZGVBdChjb3VudGVyKyspO1xuICAgICAgICAgICAgICAgICAgaWYgKChleHRyYSAmIDB4RkMwMCkgPT0gMHhEQzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGxvdyBzdXJyb2dhdGVcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2goKCh2YWx1ZSAmIDB4M0ZGKSA8PCAxMCkgKyAoZXh0cmEgJiAweDNGRikgKyAweDEwMDAwKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVubWF0Y2hlZCBzdXJyb2dhdGU7IG9ubHkgYXBwZW5kIHRoaXMgY29kZSB1bml0LCBpbiBjYXNlIHRoZSBuZXh0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvZGUgdW5pdCBpcyB0aGUgaGlnaCBzdXJyb2dhdGUgb2YgYSBzdXJyb2dhdGUgcGFpclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50ZXItLTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgb3V0cHV0LnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuICAgICAgICAgICAgZnVuY3Rpb24gdWNzMmVuY29kZShhcnJheSkge1xuICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgICB2YXIgb3V0cHV0ID0gJyc7XG4gICAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBhcnJheVtpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gMHhGRkZGKSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSAtPSAweDEwMDAwO1xuICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMCk7XG4gICAgICAgICAgICAgICAgICB2YWx1ZSA9IDB4REMwMCB8IHZhbHVlICYgMHgzRkY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dHB1dCArPSBzdHJpbmdGcm9tQ2hhckNvZGUodmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KSB7XG4gICAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPj0gMHhEODAwICYmIGNvZGVQb2ludCA8PSAweERGRkYpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignTG9uZSBzdXJyb2dhdGUgVSsnICsgY29kZVBvaW50LnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpICsgJyBpcyBub3QgYSBzY2FsYXIgdmFsdWUnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUJ5dGUoY29kZVBvaW50LCBzaGlmdCkge1xuICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiBzaGlmdCAmIDB4M0YgfCAweDgwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCkge1xuICAgICAgICAgICAgICBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkZGODApID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAxLWJ5dGUgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHN5bWJvbCA9ICcnO1xuICAgICAgICAgICAgICBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRkY4MDApID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAyLWJ5dGUgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDYgJiAweDFGIHwgMHhDMCk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZGRjAwMDApID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAzLWJ5dGUgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7XG4gICAgICAgICAgICAgICAgc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxMiAmIDB4MEYgfCAweEUwKTtcbiAgICAgICAgICAgICAgICBzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKChjb2RlUG9pbnQgJiAweEZGRTAwMDAwKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gNC1ieXRlIHNlcXVlbmNlXG4gICAgICAgICAgICAgICAgc3ltYm9sID0gc3RyaW5nRnJvbUNoYXJDb2RlKGNvZGVQb2ludCA+PiAxOCAmIDB4MDcgfCAweEYwKTtcbiAgICAgICAgICAgICAgICBzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDEyKTtcbiAgICAgICAgICAgICAgICBzeW1ib2wgKz0gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIDYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN5bWJvbCArPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ICYgMHgzRiB8IDB4ODApO1xuICAgICAgICAgICAgICByZXR1cm4gc3ltYm9sO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB1dGY4ZW5jb2RlKHN0cmluZykge1xuICAgICAgICAgICAgICB2YXIgY29kZVBvaW50cyA9IHVjczJkZWNvZGUoc3RyaW5nKTtcbiAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IGNvZGVQb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgdmFyIGNvZGVQb2ludDtcbiAgICAgICAgICAgICAgdmFyIGJ5dGVTdHJpbmcgPSAnJztcbiAgICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSBjb2RlUG9pbnRzW2luZGV4XTtcbiAgICAgICAgICAgICAgICBieXRlU3RyaW5nICs9IGVuY29kZUNvZGVQb2ludChjb2RlUG9pbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBieXRlU3RyaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAgICAgZnVuY3Rpb24gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKSB7XG4gICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPj0gYnl0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgYnl0ZSBpbmRleCcpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGNvbnRpbnVhdGlvbkJ5dGUgPSBieXRlQXJyYXlbYnl0ZUluZGV4XSAmIDB4RkY7XG4gICAgICAgICAgICAgIGJ5dGVJbmRleCsrO1xuXG4gICAgICAgICAgICAgIGlmICgoY29udGludWF0aW9uQnl0ZSAmIDB4QzApID09IDB4ODApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29udGludWF0aW9uQnl0ZSAmIDB4M0Y7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBJZiB3ZSBlbmQgdXAgaGVyZSwgaXTigJlzIG5vdCBhIGNvbnRpbnVhdGlvbiBieXRlXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGRlY29kZVN5bWJvbCgpIHtcbiAgICAgICAgICAgICAgdmFyIGJ5dGUxO1xuICAgICAgICAgICAgICB2YXIgYnl0ZTI7XG4gICAgICAgICAgICAgIHZhciBieXRlMztcbiAgICAgICAgICAgICAgdmFyIGJ5dGU0O1xuICAgICAgICAgICAgICB2YXIgY29kZVBvaW50O1xuXG4gICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPiBieXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoYnl0ZUluZGV4ID09IGJ5dGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIFJlYWQgZmlyc3QgYnl0ZVxuICAgICAgICAgICAgICBieXRlMSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcbiAgICAgICAgICAgICAgYnl0ZUluZGV4Kys7XG5cbiAgICAgICAgICAgICAgLy8gMS1ieXRlIHNlcXVlbmNlIChubyBjb250aW51YXRpb24gYnl0ZXMpXG4gICAgICAgICAgICAgIGlmICgoYnl0ZTEgJiAweDgwKSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ5dGUxO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gMi1ieXRlIHNlcXVlbmNlXG4gICAgICAgICAgICAgIGlmICgoYnl0ZTEgJiAweEUwKSA9PSAweEMwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnQgPSAoYnl0ZTEgJiAweDFGKSA8PCA2IHwgYnl0ZTI7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA+PSAweDgwKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29kZVBvaW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIDMtYnl0ZSBzZXF1ZW5jZSAobWF5IGluY2x1ZGUgdW5wYWlyZWQgc3Vycm9nYXRlcylcbiAgICAgICAgICAgICAgaWYgKChieXRlMSAmIDB4RjApID09IDB4RTApIHtcbiAgICAgICAgICAgICAgICBieXRlMiA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG4gICAgICAgICAgICAgICAgYnl0ZTMgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludCA9IChieXRlMSAmIDB4MEYpIDw8IDEyIHwgYnl0ZTIgPDwgNiB8IGJ5dGUzO1xuICAgICAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPj0gMHgwODAwKSB7XG4gICAgICAgICAgICAgICAgICBjaGVja1NjYWxhclZhbHVlKGNvZGVQb2ludCk7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29kZVBvaW50O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBjb250aW51YXRpb24gYnl0ZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIDQtYnl0ZSBzZXF1ZW5jZVxuICAgICAgICAgICAgICBpZiAoKGJ5dGUxICYgMHhGOCkgPT0gMHhGMCkge1xuICAgICAgICAgICAgICAgIGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcbiAgICAgICAgICAgICAgICBieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG4gICAgICAgICAgICAgICAgYnl0ZTQgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludCA9IChieXRlMSAmIDB4MEYpIDw8IDB4MTIgfCBieXRlMiA8PCAweDBDIHwgYnl0ZTMgPDwgMHgwNiB8IGJ5dGU0O1xuICAgICAgICAgICAgICAgIGlmIChjb2RlUG9pbnQgPj0gMHgwMTAwMDAgJiYgY29kZVBvaW50IDw9IDB4MTBGRkZGKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gY29kZVBvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIFVURi04IGRldGVjdGVkJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBieXRlQXJyYXk7XG4gICAgICAgICAgICB2YXIgYnl0ZUNvdW50O1xuICAgICAgICAgICAgdmFyIGJ5dGVJbmRleDtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHV0ZjhkZWNvZGUoYnl0ZVN0cmluZykge1xuICAgICAgICAgICAgICBieXRlQXJyYXkgPSB1Y3MyZGVjb2RlKGJ5dGVTdHJpbmcpO1xuICAgICAgICAgICAgICBieXRlQ291bnQgPSBieXRlQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICBieXRlSW5kZXggPSAwO1xuICAgICAgICAgICAgICB2YXIgY29kZVBvaW50cyA9IFtdO1xuICAgICAgICAgICAgICB2YXIgdG1wO1xuICAgICAgICAgICAgICB3aGlsZSAoKHRtcCA9IGRlY29kZVN5bWJvbCgpKSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBjb2RlUG9pbnRzLnB1c2godG1wKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdWNzMmVuY29kZShjb2RlUG9pbnRzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgICAgIHZhciB1dGY4ID0ge1xuICAgICAgICAgICAgICAndmVyc2lvbic6ICcyLjAuMCcsXG4gICAgICAgICAgICAgICdlbmNvZGUnOiB1dGY4ZW5jb2RlLFxuICAgICAgICAgICAgICAnZGVjb2RlJzogdXRmOGRlY29kZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gU29tZSBBTUQgYnVpbGQgb3B0aW1pemVycywgbGlrZSByLmpzLCBjaGVjayBmb3Igc3BlY2lmaWMgY29uZGl0aW9uIHBhdHRlcm5zXG4gICAgICAgICAgICAvLyBsaWtlIHRoZSBmb2xsb3dpbmc6XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgICAgICAgZGVmaW5lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdXRmODtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZyZWVFeHBvcnRzICYmICFmcmVlRXhwb3J0cy5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICBpZiAoZnJlZU1vZHVsZSkge1xuICAgICAgICAgICAgICAgIC8vIGluIE5vZGUuanMgb3IgUmluZ29KUyB2MC44LjArXG4gICAgICAgICAgICAgICAgZnJlZU1vZHVsZS5leHBvcnRzID0gdXRmODtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBOYXJ3aGFsIG9yIFJpbmdvSlMgdjAuNy4wLVxuICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3QuaGFzT3duUHJvcGVydHk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHV0ZjgpIHtcbiAgICAgICAgICAgICAgICAgIGhhc093blByb3BlcnR5LmNhbGwodXRmOCwga2V5KSAmJiAoZnJlZUV4cG9ydHNba2V5XSA9IHV0Zjhba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBpbiBSaGlubyBvciBhIHdlYiBicm93c2VyXG4gICAgICAgICAgICAgIHJvb3QudXRmOCA9IHV0Zjg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSkodGhpcyk7XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7fV0sIDQ1OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAndXNlIHN0cmljdCc7XG5cbiAgICAgICAgdmFyIGFscGhhYmV0ID0gJzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6LV8nLnNwbGl0KCcnKSxcbiAgICAgICAgICAgIGxlbmd0aCA9IDY0LFxuICAgICAgICAgICAgbWFwID0ge30sXG4gICAgICAgICAgICBzZWVkID0gMCxcbiAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgcHJldjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG51bSBUaGUgbnVtYmVyIHRvIGNvbnZlcnQuXHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgICAgICAgICB2YXIgZW5jb2RlZCA9ICcnO1xuXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgICAgICAgICAgbnVtID0gTWF0aC5mbG9vcihudW0gLyBsZW5ndGgpO1xuICAgICAgICAgIH0gd2hpbGUgKG51bSA+IDApO1xuXG4gICAgICAgICAgcmV0dXJuIGVuY29kZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gdGhlIGludGVnZXIgdmFsdWUgc3BlY2lmaWVkIGJ5IHRoZSBnaXZlbiBzdHJpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7TnVtYmVyfSBUaGUgaW50ZWdlciB2YWx1ZSByZXByZXNlbnRlZCBieSB0aGUgc3RyaW5nLlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGRlY29kZShzdHIpIHtcbiAgICAgICAgICB2YXIgZGVjb2RlZCA9IDA7XG5cbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkZWNvZGVkID0gZGVjb2RlZCAqIGxlbmd0aCArIG1hcFtzdHIuY2hhckF0KGkpXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZGVjb2RlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFllYXN0OiBBIHRpbnkgZ3Jvd2luZyBpZCBnZW5lcmF0b3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiB5ZWFzdCgpIHtcbiAgICAgICAgICB2YXIgbm93ID0gZW5jb2RlKCtuZXcgRGF0ZSgpKTtcblxuICAgICAgICAgIGlmIChub3cgIT09IHByZXYpIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgICAgICAgICByZXR1cm4gbm93ICsgJy4nICsgZW5jb2RlKHNlZWQrKyk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuICAgICAgICAvLyBNYXAgZWFjaCBjaGFyYWN0ZXIgdG8gaXRzIGluZGV4LlxuICAgICAgICAvL1xuICAgICAgICBmb3IgKDsgaSA8IGxlbmd0aDsgaSsrKSBtYXBbYWxwaGFiZXRbaV1dID0gaTtcblxuICAgICAgICAvL1xuICAgICAgICAvLyBFeHBvc2UgdGhlIGB5ZWFzdGAsIGBlbmNvZGVgIGFuZCBgZGVjb2RlYCBmdW5jdGlvbnMuXG4gICAgICAgIC8vXG4gICAgICAgIHllYXN0LmVuY29kZSA9IGVuY29kZTtcbiAgICAgICAgeWVhc3QuZGVjb2RlID0gZGVjb2RlO1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHllYXN0O1xuICAgICAgfSwge31dIH0sIHt9LCBbMV0pKDEpO1xuICB9KTtcbn07XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyNzY2M1ZoQXIxR1FMOFZQQkN0SmRyaycsICd0eXBlJyk7XG4vLyBTY3JpcHRcXHR5cGUuanNcblxuLy/lm57lkIjpmLbmrrVcbndpbmRvdy5QSEFTRV9OVUxMID0gMDtcbndpbmRvdy5QSEFTRV9CRUdJTl9UVVJOID0gMTtcbndpbmRvdy5QSEFTRV9NQUlOX1RVUk4gPSAyO1xud2luZG93LlBIQVNFX0VORF9UVVJOID0gMztcblxuLy/lrqLmiLfnq6/kuI7mnI3liqHnq6/pgJrkv6Hlh73mlbBcblxuLy/nmbvlvZVcbndpbmRvdy5XQ19DT05ORUNURUQgPSAnV0NfQ09OTkVDVEVEJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIHov57mjqXlk43lupRcbndpbmRvdy5DV19MT0dJTl9SRVFVRVNUID0gJ0NXX0xPR0lOX1JFUVVFU1QnOyAvL+WuouaIt+err+WQkeacjeWKoeerr+WPkemAgeeZu+W9leivt+axglxud2luZG93LldDX0xPR0lOX1JFU1BPTlNFID0gJ1dDX0xPR0lOX1JFU1BPTlNFJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIHnmbvlvZXlk43lupRcbndpbmRvdy5DV19FTlRFUlJPT01fUkVRVUVTVCA9ICdDV19FTlRFUlJPT01fUkVRVUVTVCc7IC8v5a6i5oi356uv5ZCR5pyN5Yqh56uv5Y+R6YCB6L+b5YWl5oi/6Ze06K+35rGCXG53aW5kb3cuV0NfRU5URVJST09NX1JFU1BPTlNFID0gJ1dDX0VOVEVSUk9PTV9SRVNQT05TRSc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCB6L+b5YWl5oi/6Ze05ZON5bqUXG5cbi8v6IGK5aSpXG53aW5kb3cuQ1dfQ0hBVF9BRERfUkVRVUVTVCA9ICdDV19DSEFUX0FERF9SRVFVRVNUJzsgLy/lrqLmiLfnq6/lkJHmnI3liqHnq6/lj5HpgIHogYrlpKnkv6Hmga/or7fmsYJcbndpbmRvdy5XQ19DSEFUX0FERF9SRVNQT05TRSA9ICdXQ19DSEFUX0FERF9SRVNQT05TRSc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCB6IGK5aSp5L+h5oGv5ZON5bqUXG53aW5kb3cuV0NfQ0hBVF9BREQgPSAnV0NfQ0hBVF9BREQnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgeiBiuWkqeS/oeaBr1xuXG4vL1BsYXllclxud2luZG93LldDX1BMQVlFUl9BREQgPSAnV0NfUExBWUVSX0FERCc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCBUExBWUVS5re75YqgKOiHquW3sSlcbndpbmRvdy5XQ19QTEFZRVJfQUREX09USEVSID0gJ1dDX1BMQVlFUl9BRERfT1RIRVInOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgVBMQVlFUua3u+WKoCjliKvkuropXG53aW5kb3cuV0NfUExBWUVSX1VQREFURSA9ICdXQ19QTEFZRVJfVVBEQVRFJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIFQTEFZRVLmm7TmlrBcblxuLy/miL/pl7RcbndpbmRvdy5DV19EVUVMUkVBRFlfUkVRVUVTVCA9ICdDV19EVUVMUkVBRFlfUkVRVUVTVCc7IC8v5a6i5oi356uv5ZCR5pyN5Yqh56uv5Y+R6YCB5YeG5aSH5byA5aeL5ri45oiP6K+35rGCXG53aW5kb3cuV0NfRFVFTFJFQURZX1JFU1BPTlNFID0gJ1dDX0RVRUxSRUFEWV9SRVNQT05TRSc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCB5YeG5aSH5byA5aeL5ri45oiP5ZON5bqUXG53aW5kb3cuV0NfRFVFTFJFQURZID0gJ1dDX0RVRUxSRUFEWSc7IC8v5pyN5Yqh56uv57uZ5a6i5oi356uv5Y+R6YCB55So5oi35YeG5aSHXG5cbi8v5omL54mMXG53aW5kb3cuV0NfSEFORENBUkRfVVBEQVRFID0gJ1dDX0hBTkRDQVJEX1VQREFURSc7IC8v5omL54mM5pu05pawXG53aW5kb3cuV0NfSEFORENBUkRfQ1JFQVRFID0gJ1dDX0hBTkRDQVJEX0NSRUFURSc7IC8v5omL54mM5Yib5bu6XG53aW5kb3cuV0NfSEFORENBUkRfREVMRVRFID0gJ1dDX0hBTkRDQVJEX0RFTEVURSc7IC8v5omL54mM5Yig6ZmkXG5cbi8v6ZqP5LuOXG53aW5kb3cuQ1dfTU9OU1RFUl9TVU1NT05fUkVRVUVTVCA9ICdDV19NT05TVEVSX1NVTU1PTl9SRVFVRVNUJzsgLy/lrqLmiLfnq6/lkJHmnI3liqHnq6/lj5HpgIHlj6zllKTpmo/ku47or7fmsYJcbndpbmRvdy5XQ19NT05TVEVSX1NVTU1PTl9SRVNQT05TRSA9ICdXQ19NT05TVEVSX1NVTU1PTl9SRVNQT05TRSc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCB5Y+s5ZSk6ZqP5LuO5ZON5bqUXG53aW5kb3cuQ1dfTU9OU1RFUl9BVFRBQ0tNT05TVEVSX1JFUVVFU1QgPSAnQ1dfTU9OU1RFUl9BVFRBQ0tNT05TVEVSX1JFUVVFU1QnOyAvL+WuouaIt+err+WQkeacjeWKoeerr+WPkemAgemaj+S7juaUu+WHu+maj+S7juivt+axglxud2luZG93LldDX01PTlNURVJfQVRUQUNLTU9OU1RFUl9SRVNQT05TRSA9ICdXQ19NT05TVEVSX0FUVEFDS01PTlNURVJfUkVTUE9OU0UnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgemaj+S7juaUu+WHu+maj+S7juWTjeW6lFxud2luZG93LkNXX01PTlNURVJfQVRUQUNLUExBWUVSX1JFUVVFU1QgPSAnQ1dfTU9OU1RFUl9BVFRBQ0tQTEFZRVJfUkVRVUVTVCc7IC8v5a6i5oi356uv5ZCR5pyN5Yqh56uv5Y+R6YCB6ZqP5LuO5pS75Ye7546p5a626K+35rGCXG53aW5kb3cuV0NfTU9OU1RFUl9BVFRBQ0tQTEFZRVJfUkVTUE9OU0UgPSAnV0NfTU9OU1RFUl9BVFRBQ0tQTEFZRVJfUkVTUE9OU0UnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgemaj+S7juaUu+WHu+eOqeWutuWTjeW6lFxud2luZG93LldDX01PTlNURVJfQ1JFQVRFID0gJ1dDX01PTlNURVJfQ1JFQVRFJzsgLy/pmo/ku47liJvlu7pcbndpbmRvdy5XQ19NT05TVEVSX1VQREFURSA9ICdXQ19NT05TVEVSX1VQREFURSc7IC8v6ZqP5LuO5pu05pawXG53aW5kb3cuV0NfTU9OU1RFUl9ERUxFVEUgPSAnV0NfTU9OU1RFUl9ERUxFVEUnOyAvL+maj+S7juWIoOmZpFxuXG53aW5kb3cuc2hvd1RpcExhYmVsID0gZnVuY3Rpb24gc2hvd1RpcExhYmVsKHN0ciwgY29sb3IpIHtcbiAgICAvL+aWh+Wtl+agh+etvuWIm+W7ulxuICAgIHZhciBub2RlID0gbmV3IGNjLk5vZGUoKTtcbiAgICB2YXIgbGFiZWwgPSBub2RlLmFkZENvbXBvbmVudChjYy5MYWJlbCk7XG4gICAgaWYgKGNvbG9yKSBub2RlLmNvbG9yID0gY29sb3I7XG5cbiAgICBsYWJlbC5zdHJpbmcgPSBzdHI7XG4gICAgbm9kZS5zZXRQb3NpdGlvbigwLCAwKTtcbiAgICB2YXIgc2NlbmUgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLmdldENoaWxkQnlOYW1lKCdDYW52YXMnKTtcbiAgICBzY2VuZS5hZGRDaGlsZChub2RlKTtcblxuICAgIC8vMuenkuWQjua2iOWksVxuICAgIHZhciBmYWRlb3V0ID0gY2MuZmFkZU91dCgyKTtcbiAgICB2YXIgY2FsbEZ1bmMgPSBjYy5jYWxsRnVuYyhmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBjYy5sb2coJ25vZGUgaXMgd2hhdDolcycsIG5vZGUueCk7XG4gICAgICAgIG5vZGUuZGVzdHJveSgpO1xuICAgIH0sIG5vZGUsIG51bGwpO1xuXG4gICAgdmFyIHNlcSA9IGNjLnNlcXVlbmNlKGZhZGVvdXQsIGNhbGxGdW5jKTtcbiAgICBub2RlLnJ1bkFjdGlvbihzZXEpO1xufTtcblxuY2MuX1JGcG9wKCk7Il19
