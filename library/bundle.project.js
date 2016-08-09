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
            if (!boundBox.contains(pos) || !this._player.summerMonster(this)) {
                //cc.log('summer monster error!')
                this.node.setPosition(this.srcPos.x, this.srcPos.y);
            }
        }, this);
    },

    //是否激活
    isTurnActive: function isTurnActive() {
        return this._player._isTurnActive;
    },

    // use this for initialization
    onLoad: function onLoad() {
        this.srcPos = { 'x': 0, 'y': 0 };

        this.setInputControl();
    },

    init: function init(card, player, idx) {

        this.hpLabel.string = card.hp.toString();
        this.criticalLabel.string = card.critical.toString();
        this.atkLabel.string = card.atk.toString();
        this.nameLabel.string = card.cardName.toString();

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
            var opponentPlayer = player._opponentPlayer;
            //var opponentPlayer = player;
            var boundBox, pos, oppoAddX, oppoAddY;

            //判断是否移动到对方英雄上
            boundBox = opponentPlayer.heroIconSprite.node.getBoundingBox();
            oppoAddY = player.monsterFieldLayout.x + player.node.x - opponentPlayer.node.x;
            oppoAddY = player.monsterFieldLayout.y + player.node.y - opponentPlayer.node.y;
            pos = new cc.v2(this.node.x + oppoAddX, this.node.y + oppoAddY);
            if (boundBox.contains(pos)) {
                duel.monsterAtkPlayer(player.fieldArray[this._idx], opponentPlayer); //攻击玩家
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
                    duel.monsterAtkMonster(player.fieldArray[this._idx], opponentPlayer.fieldArray[i]); //攻击对方随从
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
        return this._player._isTurnActive;
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

        this.deckLabel.string = '0';
    },

    //界面刷新
    refresh: function refresh() {
        var player = this.duel.getPlayer(this.idx);
        //水晶图片刷新
        var criticalSpriteArray = this.criticalSpriteArray;
        var i = 0;
        for (; i < this.critical; ++i) {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(0, 255, 0);
        }
        for (; i < this.maxCritical; ++i) {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(255, 0, 0);
        }
        for (; i < criticalSpriteArray.length; ++i) {
            criticalSpriteArray[i].setVisible(0);
        }

        this.heroHpLabel.string = this.hp.toString();
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
},{}],"card":[function(require,module,exports){
"use strict";
cc._RFpush(module, '774273aTPtIlLcUjnpLZlVZ', 'card');
// Script\card.js


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
        hp: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(cardData, player, idx) {
        this.critical = cardData.critical;
        this.cardName = cardData.cardName;
        this.atk = cardData.atk;
        this.hp = cardData.hp;

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

        GameConn.sendPacket(CW_DUELREADY_REQUEST, {}); //直接准备
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

    refreshPlayerSprite: function refreshPlayerSprite(playerIdx) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = this.playerSpriteVec[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var playerSprite = _step.value;

                if (playerSprite.getIdx() === playerIdx) {
                    playerSprite.refresh();
                    break;
                }
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
    },

    //开始游戏
    startGame: function startGame() {
        //玩家初始化
        this.localPlayer.init(this);
        this.opponentPlayer.init(this);

        //根据牌池生成卡组
        this.localPlayer.createDeck(tempDeck);
        this.opponentPlayer.createDeck(tempDeck);

        //初始化对手player,
        this.localPlayer._opponentPlayer = this.opponentPlayer;
        this.opponentPlayer._opponentPlayer = this.localPlayer;

        var isFirstPlayer = true; //先手后手

        if (isFirstPlayer) {
            this.turnPlayer = this.localPlayer;
            this.turnOpponent = this.opponentPlayer;
        } else {
            this.turnPlayer = this.opponentPlayer;
            this.turnOpponent = this.localPlayer;
        }

        this.turn = 1;

        this.turnPlayer.drawDeck(3);
        this.turnOpponent.drawDeck(3);
        this.changePhase(PHASE_BEGIN_TURN);

        //showTipLabel('开始游戏');
    },

    //交换行动
    turnPlayerChange: function turnPlayerChange() {
        //cc.log('turnPlayerChange, turnPlayer:%s, turnOpponent:%s', this.turnPlayer.heroName, this.turnOpponent.heroName);
        var tempPlayer = this.turnPlayer;
        //cc.log('tempPlayerName:%s', tempPlayer.heroName);
        this.turnPlayer = this.turnOpponent;
        //cc.log('turnPlayer:%s', this.turnPlayer.heroName);

        this.turnOpponent = tempPlayer;
        //cc.log('turnopponent:%s', this.turnOpponent.heroName);
    },

    //随从攻击玩家
    monsterAtkPlayer: function monsterAtkPlayer(monster, player) {
        if (!monster || monster.atk <= 0 || monster.isAtked === true) return;

        monster.isAtked = true;
        player.reduceHp(monster.atk);
        player.refreshMonsterField();

        showTipLabel(monster._player.heroName + '的' + monster.cardName + ' 攻击了玩家 ' + player.heroName);

        this.checkWin();
    },

    //随从攻击随从
    monsterAtkMonster: function monsterAtkMonster(src, dest) {
        if (!src || !dest || src.atk <= 0 || src.isAtked === true) return;

        src.isAtked = true;
        var damage = src.atk;
        dest.reduceHp(damage);

        damage = dest.atk;
        src.reduceHp(damage);

        showTipLabel(src._player.heroName + '的' + src.cardName + ' 攻击了 ' + dest._player.heroName + '的' + dest.cardName, cc.Color.RED);
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
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
            for (var _iterator2 = this.playerSpriteVec[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var playerSprite = _step2.value;

                playerSprite.init(this);
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

        cardPrefab: {
            'default': null,
            type: cc.Prefab
        },

        monsterPrefab: {
            'default': null,
            type: cc.Prefab
        },

        duel: null, //战斗管理
        idx: -1,
        teamColor: -1,
        isTurnActive: false, //是否可以行动
        isReady: false, //是否准备游戏

        heroName: '', //玩家名字
        hp: 30, //英雄生命值
        critical: 0, //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数

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
    },

    //解开数据
    unPackData: function unPackData(data) {
        var flag = data.flag;

        if (flag & PLAYER_UPDATE_ISTURNACTIVE) this._isTurnActive = data.isTurnActive;
        if (flag & PLAYER_UPDATE_HP) this.hp = data.hp;
        if (flag & PLAYER_UPDATE_CRITICAL) this.critical = data.critical;
        if (flag & PLAYER_UPDATE_ISREADY) this.isReady = data.isReady;
    },

    //根据牌池随机创建卡组
    createDeck: function createDeck(cardArray) {
        var deckArray = this.deckArray;

        for (var i = 0; i < 30; ++i) {
            deckArray[i] = new Card();
            var randomKey = cardArray[Math.floor(Math.random() * cardArray.length)];
            var cardData = CardDataManager.cardMap[randomKey];
            deckArray[i].init(cardData, this, i);
        }
    },

    //设置是否可以行动
    setTurnActive: function setTurnActive(val) {
        this._isTurnActive = val;
    },

    //水晶回复
    criticalRecover: function criticalRecover() {
        this.critical = this.maxCritical;
        this.refreshcriticalsprite(); //刷新水晶图片
    },

    //水晶增加
    criticalPlus: function criticalPlus(num) {
        this.maxCritical += num;
        this.critical += num;
        if (this.maxCritical > 10) this.maxCritical = 10;
        if (this.critical > 10) this.critical = 10;
        this.refreshcriticalsprite(); //刷新水晶图片
    },

    //重置随从攻击次数
    awakenMonster: function awakenMonster() {
        var fieldArray = this.fieldArray;

        for (var i = 0; i < fieldArray.length; ++i) {
            fieldArray[i].isAtked = false;
        }

        this.refreshMonsterField();
    },

    //扣除HP
    reduceHp: function reduceHp(num) {
        if (num <= 0) return;

        this.hp -= num;
        this.refreshHpLabel();
    },

    //回复HP
    addHp: function addHp(num) {
        if (num <= 0) return;

        this.hp += num;
        if (this.hp > 30) this.hp = 30;

        this.refreshHpLabel();
    },

    //创建手牌
    createCardToHand: function createCardToHand(card) {
        //超过10张就爆炸
        if (this.handArray.length >= 10) {
            showTipLabel("手牌超出10张，抽的牌直接摧毁");
            return;
        }

        //改变序号，加入手牌数组
        card._idx = this.handArray.length;
        this.handArray.push(card);

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

    //抽牌
    drawDeck: function drawDeck(num) {
        var deckArray = this.deckArray;

        if (deckArray.length > 0) {
            var card = deckArray.pop();
            this.deckLabel.string = deckArray.length.toString();
            this.createCardToHand(card);
        } else {
            this.reduceHp(1);
            showTipLabel(this.heroName + " 的牌库没牌了，抽1张少1HP");
        }

        if (num <= 1) {
            this.duel.checkWin();
        } else {
            this.drawDeck(num - 1);
        }
    },

    //召唤随从
    summerMonster: function summerMonster(cardSprite) {
        //如果随从已满返回
        if (this.fieldArray.length > 7) return false;

        var idx = cardSprite._idx;
        var card = this.handArray[idx]; //获取卡牌对象
        if (card) {
            var critical = card.critical;
            //如果水晶不够返回
            if (critical > this.critical) {
                showTipLabel(this.heroName + " 只有 " + this.critical + ' 个水晶,不能召唤费用为' + critical + ' 的 ' + card.cardName + ' 到场上');
                return false;
            }

            this.critical -= critical;
            this.refreshcriticalsprite();

            //创建随从对象并加入随从数组
            var monster = new Monster();
            monster.init(card, this, this.fieldArray.length);
            this.fieldArray.push(monster);

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
            //删除手牌
            this.cardPool.put(cardSprite.node);
            this.handArray.splice(idx, 1);
            this.refreshArrayIdx(this.handArray);
            //cc.log('after summer monster, the handarray.length is %d',this.handArray.length);
            this.handCardSpriteArray.splice(idx, 1);
            this.refreshHandCard();
            showTipLabel(this.heroName + " 从手牌召唤了1张 " + card.cardName + ' 到场上');
        } else {
            return false;
        }
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

    //-----------------------界面刷新---------------------------------------
    //手牌图片刷新
    refreshHandCard: function refreshHandCard() {
        var handArray = this.handArray;
        var handCardSpriteArray = this.handCardSpriteArray;
        var arrayLength = handArray.length;

        for (var i = 0; i < arrayLength; ++i) {
            if (handCardSpriteArray[i]) {
                handCardSpriteArray[i].getComponent('CardSprite').init(handArray[i], this, i);
                handCardSpriteArray[i].setPosition(90 * i + handCardSpriteArray[i].getChildByName('sprite').width / 2 - this.handFiledLayout.node.width / 2, 0);
                //cc.log(handCardSpriteArray[i].getChildByName('sprite').width);
                //cc.log(this.handFiledLayout.node.width);
                //handCardSpriteArray[i].setPosition(0,0);
            } else {
                    cc.log('handCardSpriteArray is less than handArray! %d/%d', i, arrayLength);
                    break;
                }
        }
    },

    //随从图片刷新
    refreshMonsterField: function refreshMonsterField() {
        var fieldArray = this.fieldArray;
        var monsterSpriteArray = this.monsterSpriteArray;
        var arrayLength = fieldArray.length;

        for (var i = 0; i < arrayLength; ++i) {
            if (monsterSpriteArray[i]) {
                monsterSpriteArray[i].getComponent('MonsterSprite').init(fieldArray[i], this, i);
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
},{}]},{},["CardSprite","type","HelloWorld","ChatWnd","socket.io","duel","card","monster","EventProcess","player","PlayerSprite","CardDataManager","CardData","GameConn","LoginScene","MonsterSprite"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvZGF0YS9DYXJkRGF0YU1hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L2RhdGEvQ2FyZERhdGEuanMiLCJhc3NldHMvU2NyaXB0L0NhcmRTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L0NoYXRXbmQuanMiLCJhc3NldHMvU2NyaXB0L05ldFdvcmsvRXZlbnRQcm9jZXNzLmpzIiwiYXNzZXRzL1NjcmlwdC9OZXRXb3JrL0dhbWVDb25uLmpzIiwiYXNzZXRzL1NjcmlwdC9IZWxsb1dvcmxkLmpzIiwiYXNzZXRzL1NjcmlwdC9Mb2dpblNjZW5lLmpzIiwiYXNzZXRzL1NjcmlwdC9Nb25zdGVyU3ByaXRlLmpzIiwiYXNzZXRzL1NjcmlwdC9QbGF5ZXJTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L2NhcmQuanMiLCJhc3NldHMvU2NyaXB0L2R1ZWwuanMiLCJhc3NldHMvU2NyaXB0L21vbnN0ZXIuanMiLCJhc3NldHMvU2NyaXB0L3BsYXllci5qcyIsImFzc2V0cy9TY3JpcHQvTmV0V29yay9zb2NrZXQuaW8uanMiLCJhc3NldHMvU2NyaXB0L3R5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDM1VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsaE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2U2YTBmYXplc3BKZkp1eC9YTlhCeVZ0JywgJ0NhcmREYXRhTWFuYWdlcicpO1xuLy8gU2NyaXB0XFxkYXRhXFxDYXJkRGF0YU1hbmFnZXIuanNcblxudmFyIENhcmREYXRhID0gcmVxdWlyZSgnQ2FyZERhdGEnKTtcblxudmFyIGNhcmREYXRhVGVzdCA9IFtbXCJhXCIsIDAsIDEsIDFdLCBbXCJiXCIsIDEsIDEsIDNdLCBbXCJjXCIsIDEsIDIsIDFdLCBbXCJkXCIsIDIsIDIsIDNdLCBbXCJlXCIsIDIsIDMsIDJdLCBbXCJmXCIsIDIsIDQsIDFdLCBbXCJnXCIsIDIsIDEsIDRdLCBbXCJoXCIsIDMsIDIsIDRdLCBbXCJpXCIsIDMsIDUsIDFdLCBbXCJqXCIsIDMsIDMsIDNdLCBbXCJrXCIsIDMsIDQsIDJdLCBbXCJsXCIsIDQsIDMsIDVdLCBbXCJtXCIsIDQsIDUsIDJdLCBbXCJuXCIsIDQsIDQsIDRdLCBbXCJvXCIsIDQsIDIsIDZdLCBbXCJwXCIsIDQsIDEsIDddLCBbXCJxXCIsIDUsIDMsIDZdLCBbXCJyXCIsIDUsIDQsIDVdLCBbXCJzXCIsIDUsIDUsIDRdLCBbXCJ0XCIsIDUsIDUsIDVdLCBbXCJ1XCIsIDUsIDYsIDJdLCBbXCJ2XCIsIDUsIDYsIDNdLCBbXCJ3XCIsIDYsIDMsIDhdLCBbXCJ4XCIsIDYsIDQsIDZdLCBbXCJ5XCIsIDYsIDUsIDZdLCBbXCJ6XCIsIDYsIDYsIDZdLCBbXCJBXCIsIDYsIDYsIDVdLCBbXCJCXCIsIDYsIDcsIDNdLCBbXCJDXCIsIDYsIDgsIDFdLCBbXCJEXCIsIDcsIDcsIDddLCBbXCJFXCIsIDcsIDQsIDhdLCBbXCJGXCIsIDcsIDYsIDhdLCBbXCJHXCIsIDcsIDcsIDddLCBbXCJIXCIsIDgsIDgsIDhdLCBbXCJJXCIsIDgsIDcsIDldLCBbXCJKXCIsIDgsIDksIDZdLCBbXCJLXCIsIDksIDksIDldLCBbXCJMXCIsIDEwLCAxMiwgMTJdXTtcbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBjYXJkTWFwOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjoge31cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjYXJkRGF0YVRlc3QpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2FyZCA9IG5ldyBDYXJkRGF0YSgpO1xuICAgICAgICAgICAgICAgIGNhcmQuY2FyZE5hbWUgPSBjYXJkRGF0YVRlc3RbaV1bMF07XG4gICAgICAgICAgICAgICAgY2FyZC5jcml0aWNhbCA9IGNhcmREYXRhVGVzdFtpXVsxXTtcbiAgICAgICAgICAgICAgICBjYXJkLmF0ayA9IGNhcmREYXRhVGVzdFtpXVsyXTtcbiAgICAgICAgICAgICAgICBjYXJkLmhwID0gY2FyZERhdGFUZXN0W2ldWzNdO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FyZE1hcFtjYXJkLmNhcmROYW1lXSA9IGNhcmQ7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2coY2FyZERhdGFUZXN0W2ldWzBdLGNhcmREYXRhVGVzdFtpXVsxXSxjYXJkRGF0YVRlc3RbaV1bMl0sY2FyZERhdGFUZXN0W2ldWzNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2YxZDhlYkJ1UHhCeXJYcWdvRGxHM2JPJywgJ0NhcmREYXRhJyk7XG4vLyBTY3JpcHRcXGRhdGFcXENhcmREYXRhLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgY2FyZE5hbWU6IFwiXCIsXG4gICAgICAgIGNyaXRpY2FsOiAwLFxuICAgICAgICBocDogMCxcbiAgICAgICAgYXRrOiAwXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge31cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzA5YjAyL2ludU5OUXJoY21rSE1wM243JywgJ0NhcmRTcHJpdGUnKTtcbi8vIFNjcmlwdFxcQ2FyZFNwcml0ZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgICAgIF9wbGF5ZXI6IG51bGwsIC8vUGxheWVy5byV55SoXG4gICAgICAgIF9pZHg6IDAsIC8v5pWw57uE57Si5byVXG5cbiAgICAgICAgc3JjUG9zOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaOp+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgaHBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBjcml0aWNhbExhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIGF0a0xhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIG5hbWVMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zcmNQb3MueCA9IHRoaXMubm9kZS54O1xuICAgICAgICAgICAgdGhpcy5zcmNQb3MueSA9IHRoaXMubm9kZS55O1xuICAgICAgICAgICAgY2MubG9nKCdzcmNYOiVkJywgdGhpcy5zcmNQb3MueCk7XG4gICAgICAgICAgICBjYy5sb2coJ1BhcnNyY1g6JWQnLCB0aGlzLm5vZGUucG9zaXRpb24ueCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIG1vdmVYID0gZXZlbnQuZ2V0TG9jYXRpb25YKCkgLSBldmVudC5nZXRTdGFydExvY2F0aW9uKCkueDtcbiAgICAgICAgICAgIHZhciBtb3ZlWSA9IGV2ZW50LmdldExvY2F0aW9uWSgpIC0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLnk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5zcmNQb3MueCArIG1vdmVYLCB0aGlzLnNyY1Bvcy55ICsgbW92ZVkpO1xuICAgICAgICAgICAgLy9jYy5sb2coJ3NyY1g6JWQnLCB0aGlzLnNyY1Bvcy54KTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdzdGFydFg6JWQnLGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS54KTtcbiAgICAgICAgICAgIC8vY2MubG9nKG1vdmVYKTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBib3VuZEJveCA9IHRoaXMuX3BsYXllci5tb25zdGVyRmllbGRMYXlvdXQuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgIHZhciBwb3MgPSBuZXcgY2MudjIodGhpcy5ub2RlLnggKyB0aGlzLm5vZGUucGFyZW50LngsIHRoaXMubm9kZS55ICsgdGhpcy5ub2RlLnBhcmVudC55KTtcbiAgICAgICAgICAgIGlmICghYm91bmRCb3guY29udGFpbnMocG9zKSB8fCAhdGhpcy5fcGxheWVyLnN1bW1lck1vbnN0ZXIodGhpcykpIHtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZygnc3VtbWVyIG1vbnN0ZXIgZXJyb3IhJylcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5zcmNQb3MueCwgdGhpcy5zcmNQb3MueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvL+aYr+WQpua/gOa0u1xuICAgIGlzVHVybkFjdGl2ZTogZnVuY3Rpb24gaXNUdXJuQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyLl9pc1R1cm5BY3RpdmU7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNyY1BvcyA9IHsgJ3gnOiAwLCAneSc6IDAgfTtcblxuICAgICAgICB0aGlzLnNldElucHV0Q29udHJvbCgpO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGNhcmQsIHBsYXllciwgaWR4KSB7XG5cbiAgICAgICAgdGhpcy5ocExhYmVsLnN0cmluZyA9IGNhcmQuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jcml0aWNhbExhYmVsLnN0cmluZyA9IGNhcmQuY3JpdGljYWwudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5hdGtMYWJlbC5zdHJpbmcgPSBjYXJkLmF0ay50b1N0cmluZygpO1xuICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBjYXJkLmNhcmROYW1lLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNTQ2ZWErK25KQk9Rb00zdVorZXQ1ci8nLCAnQ2hhdFduZCcpO1xuLy8gU2NyaXB0XFxDaGF0V25kLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgY2hhdElTdHJNYXA6IFtdLCAvL+S/neWtmOiBiuWkqeWtl+espuS4suaVsOe7hFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5o6n5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy/mu5rliqjljLrln5/nmoRjb250ZW50IOiKgueCuVxuICAgICAgICBjb250ZW50OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/ogYrlpKnkv6Hmga8g6IqC54K5XG4gICAgICAgIGl0ZW1QcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIC8vU2Nyb2xsVmlld1xuICAgICAgICBzY3JvbGxWaWV3OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TY3JvbGxWaWV3XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuICAgIC8vIH0sXG5cbiAgICBhZGRDaGF0SXRlbTogZnVuY3Rpb24gYWRkQ2hhdEl0ZW0oc3RyLCBjb2xvcikge1xuICAgICAgICB2YXIgY29udGVudCA9IHRoaXMuY29udGVudDtcblxuICAgICAgICB2YXIgY2hhdEl0ZW0gPSBjYy5pbnN0YW50aWF0ZSh0aGlzLml0ZW1QcmVmYWIpO1xuICAgICAgICBpZiAoIWNoYXRJdGVtKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHN0ckxhYmVsID0gY2hhdEl0ZW0uZ2V0Q2hpbGRCeU5hbWUoJ3N0cicpO1xuICAgICAgICBpZiAoIXN0ckxhYmVsKSByZXR1cm47XG5cbiAgICAgICAgLy/mt7vliqBJVEVNXG4gICAgICAgIGNoYXRJdGVtLnNldFBvc2l0aW9uKC1jb250ZW50LndpZHRoIC8gMiArIDUsIC1jb250ZW50LmhlaWdodCk7XG4gICAgICAgIGNvbnRlbnQuYWRkQ2hpbGQoY2hhdEl0ZW0pO1xuICAgICAgICAvL2NjLmxvZygnY29udGVudCBoZWlnaHQ6ICVkJywgY29udGVudC5oZWlnaHQpO1xuICAgICAgICBzdHJMYWJlbC5nZXRDb21wb25lbnQoJ2NjLkxhYmVsJykuc3RyaW5nID0gc3RyOyAvL+WGmeWtl1xuICAgICAgICBpZiAoY29sb3IpIHN0ckxhYmVsLmNvbG9yID0gY29sb3I7XG5cbiAgICAgICAgLy/osIPmlbTlpKflsI/vvIzliLfmlrDliLDmnIDkuIvpnaLkuIDpobVcbiAgICAgICAgY29udGVudC5zZXRDb250ZW50U2l6ZShjb250ZW50LndpZHRoLCBjb250ZW50LmhlaWdodCArIHN0ckxhYmVsLmhlaWdodCk7XG4gICAgICAgIC8vY2MubG9nKCdjb250ZW50IGhlaWdodDogJWQsIHN0ckxhYmVsIHBvc2l0aW9uOiAlZCcsIGNvbnRlbnQuaGVpZ2h0LCBjaGF0SXRlbS5nZXRQb3NpdGlvblkoKSk7XG4gICAgICAgIGlmIChjb250ZW50LmhlaWdodCA+IDIwMCkgdGhpcy5zY3JvbGxWaWV3LnNjcm9sbFRvQm90dG9tKCk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdhNjliNTRCT3doTTdacXY4NHNONHR1UCcsICdFdmVudFByb2Nlc3MnKTtcbi8vIFNjcmlwdFxcTmV0V29ya1xcRXZlbnRQcm9jZXNzLmpzXG5cbnZhciBFUlJPUl9OT0VSUk9SID0gMDtcblxudmFyIExPR0lOX0VSUk9SX05PVEZPVU5EID0gMTtcbnZhciBMT0dJTl9FUlJPUl9QQVNTV09SRF9FUlJPUiA9IDI7XG5cbnZhciBFUlJPUl9FTlRFUlJPT01fSU5ST09NID0gMTtcbnZhciBFUlJPUl9EVUVMUkVBRFlfSVNQTEFZSU5HID0gMTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgc3RhdGljczoge1xuICAgICAgICBnYW1lQ29ubjogbnVsbCwgLy/nvZHnu5zov57mjqVcbiAgICAgICAgZHVlbDogbnVsbCwgLy/muLjmiI/nrqHnkIZcblxuICAgICAgICAvL+iuvue9rua4uOaIj+euoeeQhlxuICAgICAgICBzZXREdWVsOiBmdW5jdGlvbiBzZXREdWVsKGR1ZWwpIHtcbiAgICAgICAgICAgIHRoaXMuZHVlbCA9IGR1ZWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/liJ3lp4vljJZcbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdChjb25uKSB7XG4gICAgICAgICAgICBjYy5sb2coJ0V2ZW50UHJvY2VzcyDliJ3lp4vljJYnKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4gPSBjb25uO1xuICAgICAgICAgICAgd2luZG93LldDX0VOVEVSUk9PTV9SRVNQT05TRSA9ICdXQ19FTlRFUlJPT01fUkVTUE9OU0UnO1xuXG4gICAgICAgICAgICAvL+azqOWGjOa2iOaBr+WkhOeQhuWHveaVsFxuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoJ2Rpc2Nvbm5lY3QnLCB0aGlzLmRpc2Nvbm5lY3QuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19DT05ORUNURUQsIHRoaXNbV0NfQ09OTkVDVEVEXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0xPR0lOX1JFU1BPTlNFLCB0aGlzW1dDX0xPR0lOX1JFU1BPTlNFXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0VOVEVSUk9PTV9SRVNQT05TRSwgdGhpc1tXQ19FTlRFUlJPT01fUkVTUE9OU0VdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfQ0hBVF9BRERfUkVTUE9OU0UsIHRoaXNbV0NfQ0hBVF9BRERfUkVTUE9OU0VdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfQ0hBVF9BREQsIHRoaXNbV0NfQ0hBVF9BRERdLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5yZWdpc3RlckhhbmRsZXIoV0NfUExBWUVSX0FERCwgdGhpc1tXQ19QTEFZRVJfQUREXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX1BMQVlFUl9VUERBVEUsIHRoaXNbV0NfUExBWUVSX1VQREFURV0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLnJlZ2lzdGVySGFuZGxlcihXQ19EVUVMUkVBRFlfUkVTUE9OU0UsIHRoaXNbV0NfRFVFTFJFQURZX1JFU1BPTlNFXS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZUNvbm4ucmVnaXN0ZXJIYW5kbGVyKFdDX0RVRUxSRUFEWSwgdGhpc1tXQ19EVUVMUkVBRFldLmJpbmQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v5pyN5Yqh5Zmo5pat5byA6L+e5o6lXG4gICAgICAgIGRpc2Nvbm5lY3Q6IGZ1bmN0aW9uIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVDb25uLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+i/nuaOpeWTjeW6lFxuICAgICAgICBXQ19DT05ORUNURUQ6IGZ1bmN0aW9uIFdDX0NPTk5FQ1RFRChwYXJhbSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5jb25uZWN0U3VjY2VzcyhwYXJhbS5pZHgpO1xuICAgICAgICAgICAgY2MubG9nKCfmlLbliLDmnI3liqHlmajov57mjqXlk43lupTvvIxjbGllbnRpZDogJWQsIG5hbWU6ICVzJywgcGFyYW0uaWR4LCBwYXJhbS5uYW1lKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+eZu+W9leWTjeW6lFxuICAgICAgICBXQ19MT0dJTl9SRVNQT05TRTogZnVuY3Rpb24gV0NfTE9HSU5fUkVTUE9OU0UocGFyYW0pIHtcbiAgICAgICAgICAgIGlmIChwYXJhbS5lcnJvciA9PSBFUlJPUl9OT0VSUk9SKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lQ29ubi5sb2dpblN1Y2Nlc3MocGFyYW0uYWNjb3VudCk7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi55m75b2V5oiQ5YqfLGVycm9yOiVkXCIsIHBhcmFtLmVycm9yKTtcbiAgICAgICAgICAgICAgICBjYy5kaXJlY3Rvci5sb2FkU2NlbmUoJ2hlbGxvd29ybGQnKTsgLy/liIfmjaLliLDmuLjmiI/lnLrmma9cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0uZXJyb3IgPT0gTE9HSU5fRVJST1JfUEFTU1dPUkRfRVJST1IpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RpcExhYmVsKCfnmbvlvZXlpLHotKXvvIzlr4bnoIHplJnor68nKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtLmVycm9yID09IExPR0lOX0VSUk9SX05PVEZPVU5EKSB7XG4gICAgICAgICAgICAgICAgICAgIHNob3dUaXBMYWJlbCgn55m75b2V5aSx6LSl77yM6LSm5Y+35LiN5a2Y5ZyoJyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd1RpcExhYmVsKCfnmbvlvZXlpLHotKXvvIzmnKrnn6XplJnor68nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/ov5vlhaXmiL/pl7Tlk43lupRcbiAgICAgICAgV0NfRU5URVJST09NX1JFU1BPTlNFOiBmdW5jdGlvbiBXQ19FTlRFUlJPT01fUkVTUE9OU0UocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHBhcmFtLmVycm9yO1xuICAgICAgICAgICAgaWYgKGVycm9yID09IEVSUk9SX0VOVEVSUk9PTV9JTlJPT00pIGNjLmxvZygn5oKo5bey57uP6L+b5YWl5oi/6Ze077yM5LiN5Y+v5YaN5qyh6L+b5YWlJyk7ZWxzZSBpZiAoZXJyb3IgPT09IEVSUk9SX05PRVJST1IpIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coJ+aIkOWKn+i/m+WFpeaIv+mXtCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5re75Yqg6IGK5aSp5L+h5oGv5ZON5bqUKOS7peWQjuWGmSlcbiAgICAgICAgV0NfQ0hBVF9BRERfUkVTUE9OU0U6IGZ1bmN0aW9uIFdDX0NIQVRfQUREX1JFU1BPTlNFKHBhcmFtKSB7fSxcblxuICAgICAgICAvL+acjeWKoeerr+WPkemAgeiBiuWkqeS/oeaBr1xuICAgICAgICBXQ19DSEFUX0FERDogZnVuY3Rpb24gV0NfQ0hBVF9BREQocGFyYW0pIHtcbiAgICAgICAgICAgIGlmIChwYXJhbS5pc1N5c3RlbSkgdGhpcy5kdWVsLmFkZENoYXRJdGVtKHBhcmFtLm1lc3NhZ2UsIGNjLkNvbG9yLlJFRCk7ZWxzZSB0aGlzLmR1ZWwuYWRkQ2hhdEl0ZW0ocGFyYW0ubWVzc2FnZSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/mt7vliqDlrozmlbTnjqnlrrbmlbDmja5cbiAgICAgICAgV0NfUExBWUVSX0FERDogZnVuY3Rpb24gV0NfUExBWUVSX0FERChwYXJhbSkge1xuICAgICAgICAgICAgZHVlbC5hZGRQbGF5ZXIocGFyYW0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8vUGxheWVy5pu05pawXG4gICAgICAgIFdDX1BMQVlFUl9VUERBVEU6IGZ1bmN0aW9uIFdDX1BMQVlFUl9VUERBVEUocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBpZHggPSBwYXJhbS5pZHg7XG5cbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKGlkeCk7XG4gICAgICAgICAgICBpZiAoIXBsYXllcikgcmV0dXJuO1xuXG4gICAgICAgICAgICBwbGF5ZXIudW5QYWNrRGF0YShwYXJhbSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lh4blpIfmuLjmiI/lk43lupRcbiAgICAgICAgV0NfRFVFTFJFQURZX1JFU1BPTlNFOiBmdW5jdGlvbiBXQ19EVUVMUkVBRFlfUkVTUE9OU0UocGFyYW0pIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHBhcmFtLmVycm9yO1xuICAgICAgICAgICAgaWYgKGVycm9yID09PSBFUlJPUl9EVUVMUkVBRFlfSVNQTEFZSU5HKSB7XG4gICAgICAgICAgICAgICAgc2hvd1RpcExhYmVsKCfmuLjmiI/lt7Lnu4/lvIDlp4vkuobvvIzkuI3og73lh4blpIcnLCBjYy5Db2xvci5SRUQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL+esrDDkuKrnjqnlrrbmjqfku7bkuLrnjqnlrrboh6rlt7HvvIzorr7nva7kuLrnjqnlrrZJRFhcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gdGhpcy5kdWVsLmdldFBsYXllclNwcnRlKDApO1xuICAgICAgICAgICAgICAgIHBsYXllclNwcml0ZS5zZXRJZHgocGFyYW0uaWR4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL+acieeOqeWutuWHhuWkh+a4uOaIj1xuICAgICAgICBXQ19EVUVMUkVBRFk6IGZ1bmN0aW9uIFdDX0RVRUxSRUFEWShwYXJhbSkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IHBhcmFtLmlkeDtcblxuICAgICAgICAgICAgLy/njqnlrrbmm7TmlrBcbiAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKGlkeCk7XG4gICAgICAgICAgICBpZiAoIXBsYXllcikgcmV0dXJuO1xuXG4gICAgICAgICAgICBwbGF5ZXIudW5QYWNrRGF0YShwYXJhbSk7XG5cbiAgICAgICAgICAgIC8v546p5a625o6n5Lu25pu05pawXG4gICAgICAgICAgICAvLzPnp43mg4XlhrVcbiAgICAgICAgICAgIC8vMS7njqnlrrboh6rlt7Hlh4blpIfvvIww5o6n5Lu25Yi35paw5Li6546p5a6277ybXG4gICAgICAgICAgICAvLzIu56ys5LiA5Liq5YeG5aSH55qE546p5a6277yMMeaOp+S7tuWIt+aWsOS4uuatpOeOqeWutu+8m1xuICAgICAgICAgICAgLy8zLuesrOS6jOS4quWHhuWkh+eahOeOqeWutu+8jDDmjqfku7bliLfmlrDkuLrmraTnjqnlrrbvvJtcbiAgICAgICAgICAgIHZhciBwbGF5ZXJTcHJpdGUgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyU3BydGUoMCk7XG4gICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlMSA9IHRoaXMuZHVlbC5nZXRQbGF5ZXJTcHJpdGUoMSk7XG4gICAgICAgICAgICBpZiAocGxheWVyU3ByaXRlLmdldElkeCgpICE9PSBpZHgpIHtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyU3ByaXRlMS5nZXRJZHgoKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyU3ByaXRlLnNldElkeChpZHgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllclNwcml0ZTEuc2V0SWR4KGlkeCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkdWVsLnJlZnJlc2hQbGF5ZXJTcHJpdGUoaWR4KTtcbiAgICAgICAgfVxuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2YzYTA4ZWtaTVZHTHFKcjR5YjYrRnBvJywgJ0dhbWVDb25uJyk7XG4vLyBTY3JpcHRcXE5ldFdvcmtcXEdhbWVDb25uLmpzXG5cbi8v572R57uc6L+e5o6l5Y2V5L6LXG52YXIgRXZlbnRQcm9jZXNzID0gcmVxdWlyZSgnRXZlbnRQcm9jZXNzJyk7XG5cbnZhciBDTElFTlRfU1RBVEVfRElTQ09OTkVDVCA9IC0xO1xudmFyIENMSUVOVF9TVEFURV9HVUlERSA9IDA7XG52YXIgQ0xJRU5UX1NUQVRFX0xPR0lOSU4gPSAxO1xudmFyIENMSUVOVF9TVEFURV9ESVNCQU5EID0gMjtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICB9LFxuXG4gICAgLy9hY2NvdW5057uT5p6EXG4gICAgLy9mdW5jdGlvbiBBY2NvdW50KGFjY291bnQsIHBhc3N3b3JkKXtcbiAgICAvLyAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgIC8vICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzd29yZDtcbiAgICAvL31cblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgc29ja2V0OiBudWxsLCAvL3NvY2tldC5pb+i/nuaOpVxuICAgICAgICBjbGllbnRJZDogLTEsIC8v6L+e5o6l57yW5Y+3XG4gICAgICAgIGFjY291bnQ6IG51bGwsIC8v5pyN5Yqh5Zmo5Lyg5Zue5p2l55qE6LSm5Y+35L+h5oGvXG4gICAgICAgIHN0YXRlOiBDTElFTlRfU1RBVEVfRElTQ09OTkVDVCwgLy/otKblj7fnirbmgIFcblxuICAgICAgICAvL+WIneWni+WMllNPQ0tFVElPXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBpZiAoY2Muc3lzLmlzTmF0aXZlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmlvID0gU29ja2V0SU87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5pbyA9IHJlcXVpcmUoJ3NvY2tldC5pbycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v6L+e5o6l5pyN5Yqh5ZmoXG4gICAgICAgIGNvbm5lY3RUb1NlcnZlcjogZnVuY3Rpb24gY29ubmVjdFRvU2VydmVyKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ja2V0IHx8IHRoaXMuc3RhdGUgIT09IENMSUVOVF9TVEFURV9ESVNDT05ORUNUKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCflt7Lnu4/kuI7mnI3liqHlmajlu7rnq4vov57mjqXvvIzkuI3opoHph43lpI3ov57mjqUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc29ja2V0ID0gd2luZG93LmlvKCdodHRwOi8vbG9jYWxob3N0OjMwMDAnKTtcbiAgICAgICAgICAgIEV2ZW50UHJvY2Vzcy5pbml0KHRoaXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v5pyN5Yqh5Zmo6L+e5o6l5oiQ5YqfXG4gICAgICAgIGNvbm5lY3RTdWNjZXNzOiBmdW5jdGlvbiBjb25uZWN0U3VjY2VzcyhpZHgpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xpZW50SWQoaWR4KTtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDTElFTlRfU1RBVEVfR1VJREU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/otKblj7fnmbvlvZVcbiAgICAgICAgbG9naW46IGZ1bmN0aW9uIGxvZ2luKGFjY291bnQsIHBhc3N3b3JkKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuc29ja2V0IHx8IHRoaXMuc3RhdGUgPT09IENMSUVOVF9TVEFURV9ESVNDT05ORUNUKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKFwi5pyN5Yqh5Zmo5qC55pys5rKh5pyJ6L+e5LiK4oCm4oCm5peg5rOV55m75b2VXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT09IENMSUVOVF9TVEFURV9MT0dJTklOKSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCflt7Lnu4/nmbvlvZXotKblj7fvvIzor7fkuI3opoHph43lpI3nmbvlvZUnKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlID09PSBDTElFTlRfU1RBVEVfRElTQkFORCkge1xuICAgICAgICAgICAgICAgIGNjLmxvZygn5oKo5bey6KKr5pyN5Yqh5ZmoYmFuLOaXoOazleeZu+W9lScpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY2MubG9nKFwi5YeG5aSH6LSm5Y+355m75b2V77yM6LSm5Y+35Li677yaJXMsIOWvhuegge+8miVzXCIsIGFjY291bnQsIHBhc3N3b3JkKTtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0LmVtaXQoQ1dfTE9HSU5fUkVRVUVTVCwgeyAnQWNjb3VudE5hbWUnOiBhY2NvdW50LCAncGFzc3dvcmQnOiBwYXNzd29yZCB9KTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+eZu+W9leaIkOWKn1xuICAgICAgICBsb2dpblN1Y2Nlc3M6IGZ1bmN0aW9uIGxvZ2luU3VjY2VzcyhhY2NvdW50KSB7XG4gICAgICAgICAgICB0aGlzLmFjY291bnQgPSBhY2NvdW50O1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IENMSUVOVF9TVEFURV9MT0dJTklOO1xuICAgICAgICB9LFxuXG4gICAgICAgIC8v57uZ5a6i5oi356uv5Y+R6YCB5raI5oGvXG4gICAgICAgIHNlbmRQYWNrZXQ6IGZ1bmN0aW9uIHNlbmRQYWNrZXQobXNnSUQsIHBhcmFtKSB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KG1zZ0lELCBwYXJhbSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/ms6jlhozmnI3liqHlmajkuovku7blh73mlbBcbiAgICAgICAgcmVnaXN0ZXJIYW5kbGVyOiBmdW5jdGlvbiByZWdpc3RlckhhbmRsZXIobXNnSUQsIGZ1bmMpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9uKG1zZ0lELCBmdW5jKTtcbiAgICAgICAgfSxcblxuICAgICAgICAvL+acjeWKoeWZqOaWreW8gOi/nuaOpeS6i+S7tlxuICAgICAgICBkaXNjb25uZWN0OiBmdW5jdGlvbiBkaXNjb25uZWN0KCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NlcnZlciBkaXNjb25uZWN0ZWQsIG15IGlkeDonLCB0aGlzLmNsaWVudElkKTtcblxuICAgICAgICAgICAgLy/liJ3lp4vljJZcbiAgICAgICAgICAgIC8vdGhpcy5zb2NrZXQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5jbGllbnRJZCA9IC0xO1xuICAgICAgICAgICAgdGhpcy5hY2NvdW50ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBDTElFTlRfU1RBVEVfRElTQ09OTkVDVDtcblxuICAgICAgICAgICAgLy/lpoLmnpzlnKjmiJjmlpfkuK3vvIzov5vooYzkuIDkupvlhbbku5blpITnkIZcbiAgICAgICAgfSxcblxuICAgICAgICAvL+iuvue9rmNsaWVudElkXG4gICAgICAgIHNldENsaWVudElkOiBmdW5jdGlvbiBzZXRDbGllbnRJZChpZHgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xpZW50SWQgPSBpZHg7XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/ojrflj5botKblj7flkI3lrZdcbiAgICAgICAgZ2V0QWNjb3VudE5hbWU6IGZ1bmN0aW9uIGdldEFjY291bnROYW1lKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuYWNjb3VudCkgcmV0dXJuIHRoaXMuYWNjb3VudC5hY2NvdW50O2Vsc2UgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcyODBjM3JzWkpKS25aOVJxYkFMVnd0SycsICdIZWxsb1dvcmxkJyk7XG4vLyBTY3JpcHRcXEhlbGxvV29ybGQuanNcblxudmFyIENhcmREYXRhTWFuYWdlciA9IHJlcXVpcmUoJy4vZGF0YS9DYXJkRGF0YU1hbmFnZXInKTtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge30sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgQ2FyZERhdGFNYW5hZ2VyLmluaXQoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHt9XG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2ZiNDMxMEVEaDlKYnBDZi9ReGlLZmJBJywgJ0xvZ2luU2NlbmUnKTtcbi8vIFNjcmlwdFxcTG9naW5TY2VuZS5qc1xuXG4vL+eZu+W9leeVjOmdoum7mOiupOiEmuacrFxucmVxdWlyZSgndHlwZScpO1xudmFyIEdhbWVDb25uID0gcmVxdWlyZSgnLi9OZXRXb3JrL0dhbWVDb25uJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaOp+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgYWNjb3VudF9FZGl0Ym94OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5FZGl0Qm94XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFzc3dvcmRfRWRpdGJveDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuRWRpdEJveFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBHYW1lQ29ubi5pbml0KCk7XG4gICAgICAgIEdhbWVDb25uLmNvbm5lY3RUb1NlcnZlcigpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIC8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbiAgICAvLyB9LFxuXG4gICAgLy/nmbvlvZXmjInpkq4gICBcbiAgICBsb2dpbl9CdG5FdmVudDogZnVuY3Rpb24gbG9naW5fQnRuRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgdmFyIGFjY291bnQgPSB0aGlzLmFjY291bnRfRWRpdGJveC5zdHJpbmc7XG4gICAgICAgIGlmIChhY2NvdW50ID09PSAnJykge1xuICAgICAgICAgICAgc2hvd1RpcExhYmVsKFwi6LSm5Y+35LiN6IO95Li656m6XCIsIGNjLkNvbG9yLlJFRCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGFzc3dvcmQgPSB0aGlzLnBhc3N3b3JkX0VkaXRib3guc3RyaW5nO1xuICAgICAgICBpZiAocGFzc3dvcmQgPT09ICcnKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCLlr4bnoIHkuI3og73kuLrnqbpcIiwgY2MuQ29sb3IuUkVEKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNjLmxvZyhcImFjY291bnQ6ICVzLCBwYXNzd29yZDogJXNcIiwgYWNjb3VudCwgcGFzc3dvcmQpO1xuICAgICAgICBHYW1lQ29ubi5sb2dpbihhY2NvdW50LCBwYXNzd29yZCk7XG4gICAgfVxuXG59KTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2Q3ZGE0YXFCbnBLcnJUSzJoNlBiUjUyJywgJ01vbnN0ZXJTcHJpdGUnKTtcbi8vIFNjcmlwdFxcTW9uc3RlclNwcml0ZS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBzcmNQb3M6IHtcbiAgICAgICAgICAgICdkZWZhdWx0Jzoge31cbiAgICAgICAgfSxcblxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGhwTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXRrTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmFtZUxhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNjLmxvZyh0aGlzLmlzQXRrZWQoKSk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkgfHwgdGhpcy5pc0F0a2VkKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdGhpcy5zcmNQb3MueCA9IHRoaXMubm9kZS54O1xuICAgICAgICAgICAgdGhpcy5zcmNQb3MueSA9IHRoaXMubm9kZS55O1xuICAgICAgICAgICAgLy9jYy5sb2coJ3NyY1g6JWQnLCB0aGlzLnNyY1Bvcy54KTtcbiAgICAgICAgfSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5ub2RlLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSB8fCB0aGlzLmlzQXRrZWQoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgbW92ZVggPSBldmVudC5nZXRMb2NhdGlvblgoKSAtIGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS54O1xuICAgICAgICAgICAgdmFyIG1vdmVZID0gZXZlbnQuZ2V0TG9jYXRpb25ZKCkgLSBldmVudC5nZXRTdGFydExvY2F0aW9uKCkueTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLnNyY1Bvcy54ICsgbW92ZVgsIHRoaXMuc3JjUG9zLnkgKyBtb3ZlWSk7XG4gICAgICAgICAgICAvL2NjLmxvZygnc3JjWDolZCcsIHRoaXMuc3JjUG9zLngpO1xuICAgICAgICAgICAgLy9jYy5sb2coJ3N0YXJ0WDolZCcsZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLngpO1xuICAgICAgICAgICAgLy9jYy5sb2cobW92ZVgpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNUdXJuQWN0aXZlKCkgfHwgdGhpcy5pc0F0a2VkKCkpIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMuX3BsYXllcjtcbiAgICAgICAgICAgIHZhciBkdWVsID0gcGxheWVyLmR1ZWw7XG4gICAgICAgICAgICB2YXIgb3Bwb25lbnRQbGF5ZXIgPSBwbGF5ZXIuX29wcG9uZW50UGxheWVyO1xuICAgICAgICAgICAgLy92YXIgb3Bwb25lbnRQbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgICAgICB2YXIgYm91bmRCb3gsIHBvcywgb3Bwb0FkZFgsIG9wcG9BZGRZO1xuXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuenu+WKqOWIsOWvueaWueiLsembhOS4ilxuICAgICAgICAgICAgYm91bmRCb3ggPSBvcHBvbmVudFBsYXllci5oZXJvSWNvblNwcml0ZS5ub2RlLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgICAgICBvcHBvQWRkWSA9IHBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueCArIHBsYXllci5ub2RlLnggLSBvcHBvbmVudFBsYXllci5ub2RlLng7XG4gICAgICAgICAgICBvcHBvQWRkWSA9IHBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueSArIHBsYXllci5ub2RlLnkgLSBvcHBvbmVudFBsYXllci5ub2RlLnk7XG4gICAgICAgICAgICBwb3MgPSBuZXcgY2MudjIodGhpcy5ub2RlLnggKyBvcHBvQWRkWCwgdGhpcy5ub2RlLnkgKyBvcHBvQWRkWSk7XG4gICAgICAgICAgICBpZiAoYm91bmRCb3guY29udGFpbnMocG9zKSkge1xuICAgICAgICAgICAgICAgIGR1ZWwubW9uc3RlckF0a1BsYXllcihwbGF5ZXIuZmllbGRBcnJheVt0aGlzLl9pZHhdLCBvcHBvbmVudFBsYXllcik7IC8v5pS75Ye7546p5a62XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldFBvc1RvU3JjKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+WIpOaWreaYr+WQpuenu+WKqOWIsOWvueaWuemaj+S7juS4ilxuICAgICAgICAgICAgdmFyIG1vbnN0ZXJTcHJpdGVBcnJheSA9IG9wcG9uZW50UGxheWVyLm1vbnN0ZXJTcHJpdGVBcnJheTtcbiAgICAgICAgICAgIG9wcG9BZGRYID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC54ICsgcGxheWVyLm5vZGUueCAtIG9wcG9uZW50UGxheWVyLm5vZGUueCAtIG9wcG9uZW50UGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC54O1xuICAgICAgICAgICAgb3Bwb0FkZFkgPSBwbGF5ZXIubW9uc3RlckZpZWxkTGF5b3V0LnkgKyBwbGF5ZXIubm9kZS55IC0gb3Bwb25lbnRQbGF5ZXIubm9kZS55IC0gb3Bwb25lbnRQbGF5ZXIubW9uc3RlckZpZWxkTGF5b3V0Lnk7XG4gICAgICAgICAgICAvL2NjLmxvZygnb3Bwb25lbnRQbGF5ZXIubW9uc3RlclNwcml0ZUFycmF5Lmxlbmd0aDolZCcsIG1vbnN0ZXJTcHJpdGVBcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBib3VuZEJveCA9IG1vbnN0ZXJTcHJpdGVBcnJheVtpXS5nZXRCb3VuZGluZ0JveCgpO1xuICAgICAgICAgICAgICAgIHBvcyA9IG5ldyBjYy52Mih0aGlzLm5vZGUueCArIG9wcG9BZGRYLCB0aGlzLm5vZGUueSArIG9wcG9BZGRZKTtcbiAgICAgICAgICAgICAgICBpZiAoYm91bmRCb3guY29udGFpbnMocG9zKSkge1xuICAgICAgICAgICAgICAgICAgICBkdWVsLm1vbnN0ZXJBdGtNb25zdGVyKHBsYXllci5maWVsZEFycmF5W3RoaXMuX2lkeF0sIG9wcG9uZW50UGxheWVyLmZpZWxkQXJyYXlbaV0pOyAvL+aUu+WHu+WvueaWuemaj+S7jlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UG9zVG9TcmMoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy/ku4DkuYjpg73msqHlgZrvvIzlpI3kvY1cbiAgICAgICAgICAgIHRoaXMucmVzZXRQb3NUb1NyYygpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLy/mmK/lkKbmv4DmtLtcbiAgICBpc1R1cm5BY3RpdmU6IGZ1bmN0aW9uIGlzVHVybkFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXllci5faXNUdXJuQWN0aXZlO1xuICAgIH0sXG5cbiAgICAvL+acrOWbnuWQiOaYr+WQpuaUu+WHu+i/h1xuICAgIGlzQXRrZWQ6IGZ1bmN0aW9uIGlzQXRrZWQoKSB7XG4gICAgICAgIHZhciBtb25zdGVyID0gdGhpcy5fcGxheWVyLmZpZWxkQXJyYXlbdGhpcy5faWR4XTtcbiAgICAgICAgcmV0dXJuIG1vbnN0ZXIuaXNBdGtlZDtcbiAgICB9LFxuXG4gICAgcmVzZXRQb3NUb1NyYzogZnVuY3Rpb24gcmVzZXRQb3NUb1NyYygpIHtcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3JjUG9zLngsIHRoaXMuc3JjUG9zLnkpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zcmNQb3MgPSB7ICd4JzogMCwgJ3knOiAwIH07XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChtb25zdGVyLCBwbGF5ZXIsIGlkeCkge1xuXG4gICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmcgPSBtb25zdGVyLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuYXRrTGFiZWwuc3RyaW5nID0gbW9uc3Rlci5hdGsudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gbW9uc3Rlci5jYXJkTmFtZS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2U0OGUwQnc5c2xIeGJJSEo3MzBMYlJFJywgJ1BsYXllclNwcml0ZScpO1xuLy8gU2NyaXB0XFxQbGF5ZXJTcHJpdGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgaWR4OiAtMSwgLy/lr7nlupTnjqnlrrZJRFhcbiAgICAgICAgZHVlbDogbnVsbCwgLy/muLjmiI/nrqHnkIZcbiAgICAgICAgaGFuZENhcmRTcHJpdGVBcnJheTogW10sIC8v5omL54mM5Zu+54mH5pWw57uEXG4gICAgICAgIG1vbnN0ZXJTcHJpdGVBcnJheTogW10sIC8v6ZqP5LuO5Zu+54mH5pWw57uEXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS3oioLngrnmsaDnrqHnkIYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgY2FyZFBvb2w6IG51bGwsXG4gICAgICAgIG1vbnN0ZXJQb29sOiBudWxsLFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8v5omL54mM5Yy6XG4gICAgICAgIGhhbmRGaWxlZExheW91dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGF5b3V0XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lnLrkuIrpmo/ku47ljLpcbiAgICAgICAgbW9uc3RlckZpZWxkTGF5b3V0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5Ob2RlXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lpLTlg49cbiAgICAgICAgaGVyb0ljb25TcHJpdGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v6KGA6YeP5pi+56S6XG4gICAgICAgIGhlcm9IcExhYmVsOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5rC05pm2XG4gICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXk6IFtjYy5TcHJpdGVdLFxuXG4gICAgICAgIC8v5Y2h57uE54mM5pWwXG4gICAgICAgIGRlY2tMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGR1ZWwpIHtcbiAgICAgICAgdGhpcy5pZHggPSAtMTtcbiAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLmhhbmRDYXJkU3ByaXRlQXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uID0gKF9zdGVwID0gX2l0ZXJhdG9yLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vZGUgPSBfc3RlcC52YWx1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuY2FyZFBvb2wucHV0KG5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5ID0gW107XG5cbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5tb25zdGVyU3ByaXRlQXJyYXlbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZTEgPSBfc3RlcDIudmFsdWU7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRQb29sLnB1dChub2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICBfZGlkSXRlcmF0b3JFcnJvcjIgPSB0cnVlO1xuICAgICAgICAgICAgX2l0ZXJhdG9yRXJyb3IyID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yICYmIF9pdGVyYXRvcjJbJ3JldHVybiddKSB7XG4gICAgICAgICAgICAgICAgICAgIF9pdGVyYXRvcjJbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IF9pdGVyYXRvckVycm9yMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheSA9IFtdO1xuXG4gICAgICAgIC8v5aS05YOPXG5cbiAgICAgICAgLy9IUFxuICAgICAgICB0aGlzLmhlcm9IcExhYmVsLnN0cmluZyA9ICcwJztcbiAgICAgICAgLy/msLTmmbZcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMyA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IzID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IzID0gY3JpdGljYWxTcHJpdGVBcnJheVtTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwMzsgIShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyA9IChfc3RlcDMgPSBfaXRlcmF0b3IzLm5leHQoKSkuZG9uZSk7IF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBjcml0aWNhbFNwcml0ZSA9IF9zdGVwMy52YWx1ZTtcblxuICAgICAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlLnNldFZpc2libGUoMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IzID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMyA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyAmJiBfaXRlcmF0b3IzWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IzWydyZXR1cm4nXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZWNrTGFiZWwuc3RyaW5nID0gJzAnO1xuICAgIH0sXG5cbiAgICAvL+eVjOmdouWIt+aWsFxuICAgIHJlZnJlc2g6IGZ1bmN0aW9uIHJlZnJlc2goKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLmR1ZWwuZ2V0UGxheWVyKHRoaXMuaWR4KTtcbiAgICAgICAgLy/msLTmmbblm77niYfliLfmlrBcbiAgICAgICAgdmFyIGNyaXRpY2FsU3ByaXRlQXJyYXkgPSB0aGlzLmNyaXRpY2FsU3ByaXRlQXJyYXk7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZm9yICg7IGkgPCB0aGlzLmNyaXRpY2FsOyArK2kpIHtcbiAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXlbaV0uc2V0VmlzaWJsZSgxKTtcbiAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXlbaV0ubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigwLCAyNTUsIDApO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpIDwgdGhpcy5tYXhDcml0aWNhbDsgKytpKSB7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLnNldFZpc2libGUoMSk7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCAwLCAwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA8IGNyaXRpY2FsU3ByaXRlQXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGNyaXRpY2FsU3ByaXRlQXJyYXlbaV0uc2V0VmlzaWJsZSgwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaGVyb0hwTGFiZWwuc3RyaW5nID0gdGhpcy5ocC50b1N0cmluZygpO1xuICAgIH0sXG5cbiAgICBzZXRJZHg6IGZ1bmN0aW9uIHNldElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5pZHggPSBpZHg7XG4gICAgfSxcbiAgICBnZXRJZHg6IGZ1bmN0aW9uIGdldElkeCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaWR4O1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5jYXJkUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnY2FyZCcpO1xuICAgICAgICAvL2NjLmxvZygndGhpcy5jYXJkUG9vbCB0eXBlJyk7XG4gICAgICAgIC8vY2MubG9nKHRoaXMuY2FyZFBvb2wpO1xuICAgICAgICB0aGlzLm1vbnN0ZXJQb29sID0gbmV3IGNjLk5vZGVQb29sKCdtb25zdGVyJyk7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNzc0MjczYVRQdElsTGNVam5wTFpsVlonLCAnY2FyZCcpO1xuLy8gU2NyaXB0XFxjYXJkLmpzXG5cblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgYXRrOiAwLFxuICAgICAgICBocDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkRGF0YSwgcGxheWVyLCBpZHgpIHtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IGNhcmREYXRhLmNyaXRpY2FsO1xuICAgICAgICB0aGlzLmNhcmROYW1lID0gY2FyZERhdGEuY2FyZE5hbWU7XG4gICAgICAgIHRoaXMuYXRrID0gY2FyZERhdGEuYXRrO1xuICAgICAgICB0aGlzLmhwID0gY2FyZERhdGEuaHA7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfSxcblxuICAgIC8v5pu05paw57yW5Y+3XG4gICAgcmVmcmVzaElkeDogZnVuY3Rpb24gcmVmcmVzaElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzc0ODY4bENoTEpIa3F4T21HamhVaGtrJywgJ2R1ZWwnKTtcbi8vIFNjcmlwdFxcZHVlbC5qc1xuXG4vL+WkhOeQhuWvueaImOa1geeoi+eahOWFs+mUruexu1xuXG52YXIgUGxheWVyID0gcmVxdWlyZSgncGxheWVyJyk7XG52YXIgQ2hhdFduZCA9IHJlcXVpcmUoJ0NoYXRXbmQnKTtcbnZhciBQbGF5ZXJTcHJpdGUgPSByZXF1aXJlKCdQbGF5ZXJTcHJpdGUnKTtcbnZhciBHYW1lQ29ubiA9IHJlcXVpcmUoJy4vTmV0V29yay9HYW1lQ29ubicpO1xuLy92YXIgRXZlbnRQcm9jZXNzID0gcmVxdWlyZSgnLi9OZXR3b3JrL0V2ZW50UHJvY2VzcycpO1xuXG4vL+WvueaImOeKtuaAgVxudmFyIERVRUxfU1RBVEVfUkVTVCA9IDA7XG52YXIgRFVFTF9TVEFURV9QTEFZSU5HID0gMTtcblxuLy/liIbnu4RcbnZhciBURUFNX0NPTE9SX05PTkUgPSAtMTtcbnZhciBURUFNX0NPTE9SX1JFRCA9IDE7XG52YXIgVEVBTV9DT0xPUl9CTFVFID0gMjtcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBwbGF5ZXJWZWM6IFtdLFxuICAgICAgICBzdGF0ZTogRFVFTF9TVEFURV9SRVNULFxuXG4gICAgICAgIHR1cm46IDAsIC8v5q+P5Liq546p5a625LiA5Zue5ZCI5Yqg5LiA5qyhXG4gICAgICAgIHJvdW5kOiAwLCAvL+avj+S4queOqeWutumDveihjOWKqOi/h+S4gOWbnuWQiOWKoOS4gOasoVxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIHBsYXllclNwcml0ZVZlYzogW1BsYXllclNwcml0ZV0sIC8v546p5a625o6n5Lu2XG5cbiAgICAgICAgLy/ogYrlpKnnqpflj6PohJrmnKxcbiAgICAgICAgY2hhdFduZDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogQ2hhdFduZFxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHNldElucHV0Q29udHJvbDogZnVuY3Rpb24gc2V0SW5wdXRDb250cm9sKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY2MubG9nKCcxMjMxMzEyMzIxMzEzMjEzMTIzJyk7XG4gICAgICAgICAgICBjYy5sb2coZXZlbnQuZ2V0TG9jYXRpb25YKCkpO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgYWRkUGxheWVyOiBmdW5jdGlvbiBhZGRQbGF5ZXIocGFyYW0pIHtcbiAgICAgICAgdmFyIGlkeCA9IHBhcmFtO1xuICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5kdWVsLnBsYXllclZlY1tpZHhdO1xuICAgICAgICAvL+eOqeWutuaVsOaNruW3suWtmOWcqFxuICAgICAgICBpZiAocGxheWVyKSB7XG4gICAgICAgICAgICBjYy5sb2coJ1dDX1BMQVlFUl9BREQgZXJyb3IhIHBsYXllciglZCkgaXMgYWxyZWFkeSBleGl0ZWQuJywgaWR4KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Yib5bu6546p5a625bm25Yqg5YWl546p5a625pWw57uEXG4gICAgICAgIGNyZWF0ZVBsYXllcihwYXJhbSk7XG5cbiAgICAgICAgR2FtZUNvbm4uc2VuZFBhY2tldChDV19EVUVMUkVBRFlfUkVRVUVTVCwge30pOyAvL+ebtOaOpeWHhuWkh1xuICAgIH0sXG5cbiAgICBjcmVhdGVQbGF5ZXI6IGZ1bmN0aW9uIGNyZWF0ZVBsYXllcihwYXJhbSkge1xuICAgICAgICB2YXIgcGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgICAgICBwbGF5ZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgcGxheWVyLnVucGFja0RhdGFBbGwocGFyYW0pO1xuICAgICAgICB0aGlzLnBsYXllclZlY1tpZHhdID0gcGxheWVyO1xuICAgIH0sXG5cbiAgICBnZXRQbGF5ZXI6IGZ1bmN0aW9uIGdldFBsYXllcihpZHgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyVmVjW2lkeF07XG4gICAgfSxcblxuICAgIGdldFBsYXllclNwcml0ZTogZnVuY3Rpb24gZ2V0UGxheWVyU3ByaXRlKGlkeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wbGF5ZXJTcHJpdGVWZWNbaWR4XTtcbiAgICB9LFxuXG4gICAgcmVmcmVzaFBsYXllclNwcml0ZTogZnVuY3Rpb24gcmVmcmVzaFBsYXllclNwcml0ZShwbGF5ZXJJZHgpIHtcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSB0cnVlO1xuICAgICAgICB2YXIgX2RpZEl0ZXJhdG9yRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgdmFyIF9pdGVyYXRvckVycm9yID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IgPSB0aGlzLnBsYXllclNwcml0ZVZlY1tTeW1ib2wuaXRlcmF0b3JdKCksIF9zdGVwOyAhKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gPSAoX3N0ZXAgPSBfaXRlcmF0b3IubmV4dCgpKS5kb25lKTsgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gX3N0ZXAudmFsdWU7XG5cbiAgICAgICAgICAgICAgICBpZiAocGxheWVyU3ByaXRlLmdldElkeCgpID09PSBwbGF5ZXJJZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyU3ByaXRlLnJlZnJlc2goKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIF9kaWRJdGVyYXRvckVycm9yID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yID0gZXJyO1xuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24gJiYgX2l0ZXJhdG9yWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3JbJ3JldHVybiddKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2RpZEl0ZXJhdG9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgX2l0ZXJhdG9yRXJyb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5byA5aeL5ri45oiPXG4gICAgc3RhcnRHYW1lOiBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgICAgIC8v546p5a625Yid5aeL5YyWXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5vcHBvbmVudFBsYXllci5pbml0KHRoaXMpO1xuXG4gICAgICAgIC8v5qC55o2u54mM5rGg55Sf5oiQ5Y2h57uEXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuY3JlYXRlRGVjayh0ZW1wRGVjayk7XG4gICAgICAgIHRoaXMub3Bwb25lbnRQbGF5ZXIuY3JlYXRlRGVjayh0ZW1wRGVjayk7XG5cbiAgICAgICAgLy/liJ3lp4vljJblr7nmiYtwbGF5ZXIsXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuX29wcG9uZW50UGxheWVyID0gdGhpcy5vcHBvbmVudFBsYXllcjtcbiAgICAgICAgdGhpcy5vcHBvbmVudFBsYXllci5fb3Bwb25lbnRQbGF5ZXIgPSB0aGlzLmxvY2FsUGxheWVyO1xuXG4gICAgICAgIHZhciBpc0ZpcnN0UGxheWVyID0gdHJ1ZTsgLy/lhYjmiYvlkI7miYtcblxuICAgICAgICBpZiAoaXNGaXJzdFBsYXllcikge1xuICAgICAgICAgICAgdGhpcy50dXJuUGxheWVyID0gdGhpcy5sb2NhbFBsYXllcjtcbiAgICAgICAgICAgIHRoaXMudHVybk9wcG9uZW50ID0gdGhpcy5vcHBvbmVudFBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHVyblBsYXllciA9IHRoaXMub3Bwb25lbnRQbGF5ZXI7XG4gICAgICAgICAgICB0aGlzLnR1cm5PcHBvbmVudCA9IHRoaXMubG9jYWxQbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR1cm4gPSAxO1xuXG4gICAgICAgIHRoaXMudHVyblBsYXllci5kcmF3RGVjaygzKTtcbiAgICAgICAgdGhpcy50dXJuT3Bwb25lbnQuZHJhd0RlY2soMyk7XG4gICAgICAgIHRoaXMuY2hhbmdlUGhhc2UoUEhBU0VfQkVHSU5fVFVSTik7XG5cbiAgICAgICAgLy9zaG93VGlwTGFiZWwoJ+W8gOWni+a4uOaIjycpO1xuICAgIH0sXG5cbiAgICAvL+S6pOaNouihjOWKqFxuICAgIHR1cm5QbGF5ZXJDaGFuZ2U6IGZ1bmN0aW9uIHR1cm5QbGF5ZXJDaGFuZ2UoKSB7XG4gICAgICAgIC8vY2MubG9nKCd0dXJuUGxheWVyQ2hhbmdlLCB0dXJuUGxheWVyOiVzLCB0dXJuT3Bwb25lbnQ6JXMnLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUsIHRoaXMudHVybk9wcG9uZW50Lmhlcm9OYW1lKTtcbiAgICAgICAgdmFyIHRlbXBQbGF5ZXIgPSB0aGlzLnR1cm5QbGF5ZXI7XG4gICAgICAgIC8vY2MubG9nKCd0ZW1wUGxheWVyTmFtZTolcycsIHRlbXBQbGF5ZXIuaGVyb05hbWUpO1xuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIgPSB0aGlzLnR1cm5PcHBvbmVudDtcbiAgICAgICAgLy9jYy5sb2coJ3R1cm5QbGF5ZXI6JXMnLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUpO1xuXG4gICAgICAgIHRoaXMudHVybk9wcG9uZW50ID0gdGVtcFBsYXllcjtcbiAgICAgICAgLy9jYy5sb2coJ3R1cm5vcHBvbmVudDolcycsIHRoaXMudHVybk9wcG9uZW50Lmhlcm9OYW1lKTtcbiAgICB9LFxuXG4gICAgLy/pmo/ku47mlLvlh7vnjqnlrrZcbiAgICBtb25zdGVyQXRrUGxheWVyOiBmdW5jdGlvbiBtb25zdGVyQXRrUGxheWVyKG1vbnN0ZXIsIHBsYXllcikge1xuICAgICAgICBpZiAoIW1vbnN0ZXIgfHwgbW9uc3Rlci5hdGsgPD0gMCB8fCBtb25zdGVyLmlzQXRrZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICBtb25zdGVyLmlzQXRrZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIucmVkdWNlSHAobW9uc3Rlci5hdGspO1xuICAgICAgICBwbGF5ZXIucmVmcmVzaE1vbnN0ZXJGaWVsZCgpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbChtb25zdGVyLl9wbGF5ZXIuaGVyb05hbWUgKyAn55qEJyArIG1vbnN0ZXIuY2FyZE5hbWUgKyAnIOaUu+WHu+S6hueOqeWutiAnICsgcGxheWVyLmhlcm9OYW1lKTtcblxuICAgICAgICB0aGlzLmNoZWNrV2luKCk7XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5pS75Ye76ZqP5LuOXG4gICAgbW9uc3RlckF0a01vbnN0ZXI6IGZ1bmN0aW9uIG1vbnN0ZXJBdGtNb25zdGVyKHNyYywgZGVzdCkge1xuICAgICAgICBpZiAoIXNyYyB8fCAhZGVzdCB8fCBzcmMuYXRrIDw9IDAgfHwgc3JjLmlzQXRrZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICBzcmMuaXNBdGtlZCA9IHRydWU7XG4gICAgICAgIHZhciBkYW1hZ2UgPSBzcmMuYXRrO1xuICAgICAgICBkZXN0LnJlZHVjZUhwKGRhbWFnZSk7XG5cbiAgICAgICAgZGFtYWdlID0gZGVzdC5hdGs7XG4gICAgICAgIHNyYy5yZWR1Y2VIcChkYW1hZ2UpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbChzcmMuX3BsYXllci5oZXJvTmFtZSArICfnmoQnICsgc3JjLmNhcmROYW1lICsgJyDmlLvlh7vkuoYgJyArIGRlc3QuX3BsYXllci5oZXJvTmFtZSArICfnmoQnICsgZGVzdC5jYXJkTmFtZSwgY2MuQ29sb3IuUkVEKTtcbiAgICB9LFxuXG4gICAgLy/liKTmlq3ovpPotaJcbiAgICBjaGVja1dpbjogZnVuY3Rpb24gY2hlY2tXaW4oKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm5QbGF5ZXIuaHAgPD0gMCAmJiB0aGlzLnR1cm5PcHBvbmVudC5ocCA8PSAwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCLlubPlsYBcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50dXJuUGxheWVyLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHNob3dUaXBMYWJlbChcIiVzIOiDnOWIqVwiLCB0aGlzLm9wcG9uZW50UGxheWVyLmhlcm9OYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR1cm5PcHBvbmVudC5ocCA8PSAwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCIlIOiDnOWIqVwiLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5Zue5ZCI57uT5p2f77yI5oyJ6ZKu6LCD55So77yJXG4gICAgdHVybkVuZF9CdG5FdmVudDogZnVuY3Rpb24gdHVybkVuZF9CdG5FdmVudChldmVudCkge1xuICAgICAgICAvL+S4jeaYr01haW5QaGFzZei/meS4quaMiemSruS4jeiDveaMiVxuICAgICAgICBpZiAodGhpcy5waGFzZVN0YXRlICE9PSBQSEFTRV9NQUlOX1RVUk4pIHJldHVybjtcblxuICAgICAgICB0aGlzLmNoYW5nZVBoYXNlKFBIQVNFX0VORF9UVVJOKTtcbiAgICB9LFxuXG4gICAgYWRkQ2hhdEl0ZW06IGZ1bmN0aW9uIGFkZENoYXRJdGVtKG1lc3NhZ2UsIGNvbG9yKSB7XG4gICAgICAgIHRoaXMuY2hhdFduZC5hZGRDaGF0SXRlbShtZXNzYWdlLCBjb2xvcik7XG4gICAgICAgIC8vdGhpcy5jaGF0V25kLmFkZENoYXRJdGVtKCdb57O757ufXTrnlKjmiLcnICsgR2FtZUNvbm4uZ2V0QWNjb3VudE5hbWUoKSArICfov5vlhaXkuobmiL/pl7QuJywgY2MuQ29sb3IuUkVEKTtcbiAgICB9LFxuXG4gICAgZW50ZXJCZWdpblR1cm46IGZ1bmN0aW9uIGVudGVyQmVnaW5UdXJuKCkge1xuICAgICAgICBjYy5sb2coJ2lzIGVudGVyIEJlZ2luVHVybj8nKTtcbiAgICAgICAgKyt0aGlzLnR1cm47XG4gICAgICAgIHRoaXMudHVyblBsYXllckNoYW5nZSgpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbCh0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUgKyAn55qE5Zue5ZCIJyk7XG4gICAgICAgIHRoaXMudHVyblBsYXllci5zZXRUdXJuQWN0aXZlKHRydWUpOyAvL+WPr+S7peihjOWKqFxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuY3JpdGljYWxQbHVzKDEpOyAvL+WinuWKoOawtOaZtlxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuY3JpdGljYWxSZWNvdmVyKCk7IC8v5Zue5aSN5rC05pm2XG4gICAgICAgIHRoaXMudHVyblBsYXllci5hd2FrZW5Nb25zdGVyKCk7IC8v6YeN572u6ZqP5LuO5pS75Ye75qyh5pWwXG4gICAgICAgIHRoaXMudHVyblBsYXllci5kcmF3RGVjaygxKTsgLy/mir0x5byg5Y2hXG4gICAgfSxcblxuICAgIGJlZ2luVHVybjogZnVuY3Rpb24gYmVnaW5UdXJuKCkge1xuICAgICAgICAvL+i/m+WFpeS4u+a1geeoi1xuXG4gICAgICAgIHRoaXMuY2hhbmdlUGhhc2UoUEhBU0VfTUFJTl9UVVJOKTtcbiAgICB9LFxuXG4gICAgbGVhdmVCZWdpblR1cm46IGZ1bmN0aW9uIGxlYXZlQmVnaW5UdXJuKCkge30sXG5cbiAgICBlbnRlck1haW5UdXJuOiBmdW5jdGlvbiBlbnRlck1haW5UdXJuKCkge30sXG5cbiAgICBtYWluVHVybjogZnVuY3Rpb24gbWFpblR1cm4oKSB7fSxcblxuICAgIGxlYXZlTWFpblR1cm46IGZ1bmN0aW9uIGxlYXZlTWFpblR1cm4oKSB7fSxcblxuICAgIGVudGVyRW5kVHVybjogZnVuY3Rpb24gZW50ZXJFbmRUdXJuKCkge30sXG5cbiAgICBlbmRUdXJuOiBmdW5jdGlvbiBlbmRUdXJuKCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBoYXNlKFBIQVNFX0JFR0lOX1RVUk4pO1xuICAgIH0sXG5cbiAgICBsZWF2ZUVuZFR1cm46IGZ1bmN0aW9uIGxlYXZlRW5kVHVybigpIHtcblxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuc2V0VHVybkFjdGl2ZShmYWxzZSk7XG4gICAgfSxcblxuICAgIGNoYW5nZVBoYXNlOiBmdW5jdGlvbiBjaGFuZ2VQaGFzZShuZXh0VHVyblR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMucGhhc2VTdGF0ZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sZWF2ZVR1cm5GdW5jW3RoaXMucGhhc2VTdGF0ZV0oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW50ZXJUdXJuRnVuY1tuZXh0VHVyblR5cGVdKCk7XG4gICAgICAgIHRoaXMucGhhc2VTdGF0ZSA9IG5leHRUdXJuVHlwZTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICAgICAgLy/liJ3lp4vljJbnjqnlrrbmjqfku7ZcbiAgICAgICAgdmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yID0gdHJ1ZTtcbiAgICAgICAgdmFyIF9kaWRJdGVyYXRvckVycm9yMiA9IGZhbHNlO1xuICAgICAgICB2YXIgX2l0ZXJhdG9yRXJyb3IyID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfaXRlcmF0b3IyID0gdGhpcy5wbGF5ZXJTcHJpdGVWZWNbU3ltYm9sLml0ZXJhdG9yXSgpLCBfc3RlcDI7ICEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjIgPSAoX3N0ZXAyID0gX2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpOyBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiA9IHRydWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyU3ByaXRlID0gX3N0ZXAyLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgcGxheWVyU3ByaXRlLmluaXQodGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgX2RpZEl0ZXJhdG9yRXJyb3IyID0gdHJ1ZTtcbiAgICAgICAgICAgIF9pdGVyYXRvckVycm9yMiA9IGVycjtcbiAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiAmJiBfaXRlcmF0b3IyWydyZXR1cm4nXSkge1xuICAgICAgICAgICAgICAgICAgICBfaXRlcmF0b3IyWydyZXR1cm4nXSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICAgICAgaWYgKF9kaWRJdGVyYXRvckVycm9yMikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBfaXRlcmF0b3JFcnJvcjI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgLy90aGlzLnN0YXJ0R2FtZSgpO1xuICAgICAgICBFdmVudFByb2Nlc3Muc2V0RHVlbCh0aGlzKTtcbiAgICAgICAgR2FtZUNvbm4uc2VuZFBhY2tldChDV19FTlRFUlJPT01fUkVRVUVTVCwge30pOyAvL+eUqOaIt+i/m+WFpeaIv+mXtOivt+axglxuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7XG4gICAgICAgIC8vdGhpcy50dXJuRnVuY1t0aGlzLnBoYXNlU3RhdGVdKCk7XG4gICAgfVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc5N2IyY0tIRm01QXc3eTB2VThrZHJZTycsICdtb25zdGVyJyk7XG4vLyBTY3JpcHRcXG1vbnN0ZXIuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgYXRrOiAwLFxuICAgICAgICBocDogMCxcbiAgICAgICAgbWF4SHA6IDAsXG4gICAgICAgIGlzQXRrZWQ6IHRydWUgfSxcblxuICAgIC8v5pys5Zue5ZCI5piv5ZCm5pS75Ye76L+HXG4gICAgLy/miaPpmaRIUFxuICAgIHJlZHVjZUhwOiBmdW5jdGlvbiByZWR1Y2VIcChudW0pIHtcbiAgICAgICAgaWYgKG51bSA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ocCAtPSBudW07XG4gICAgICAgIC8v5q275LqG5bCx5p2A5o6J6L+Z5Liq6ZqP5LuOXG4gICAgICAgIGlmICh0aGlzLmlzRGVhZCgpKSB0aGlzLl9wbGF5ZXIua2lsbE1vbnN0ZXIodGhpcyk7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgLy/lm57lpI1IUFxuICAgIGFkZEhwOiBmdW5jdGlvbiBhZGRIcChudW0pIHtcbiAgICAgICAgaWYgKG51bSA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ocCArPSBudW07XG4gICAgICAgIGlmICh0aGlzLmhwID4gdGhpcy5tYXhIcCkgdGhpcy5ocCA9IHRoaXMubWF4SHA7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgaXNEZWFkOiBmdW5jdGlvbiBpc0RlYWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmhwIDw9IDApIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkLCBwbGF5ZXIsIGlkeCkge1xuICAgICAgICB0aGlzLmNhcmROYW1lID0gY2FyZC5jYXJkTmFtZTtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IGNhcmQuY3JpdGljYWw7XG4gICAgICAgIHRoaXMuYXRrID0gY2FyZC5hdGs7XG4gICAgICAgIHRoaXMuaHAgPSBjYXJkLmhwO1xuICAgICAgICB0aGlzLm1heEhwID0gY2FyZC5ocDtcblxuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuX2lkeCA9IGlkeDtcbiAgICB9LFxuXG4gICAgLy/mm7TmlrDnvJblj7dcbiAgICByZWZyZXNoSWR4OiBmdW5jdGlvbiByZWZyZXNoSWR4KGlkeCkge1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzhjMGE0QnV0Sk1BcXV3OWQ1c01xZmknLCAncGxheWVyJyk7XG4vLyBTY3JpcHRcXHBsYXllci5qc1xuXG52YXIgQ2FyZCA9IHJlcXVpcmUoJ2NhcmQnKTtcbnZhciBNb25zdGVyID0gcmVxdWlyZSgnbW9uc3RlcicpO1xudmFyIENhcmREYXRhTWFuYWdlciA9IHJlcXVpcmUoJy4vZGF0YS9DYXJkRGF0YU1hbmFnZXInKTtcblxudmFyIFBMQVlFUl9VUERBVEVfSVNUVVJOQUNUSVZFID0gMTtcbnZhciBQTEFZRVJfVVBEQVRFX0hQID0gMSA8PCAxO1xudmFyIFBMQVlFUl9VUERBVEVfQ1JJVElDQUwgPSAxIDw8IDI7XG52YXIgUExBWUVSX1VQREFURV9NQVhDUklUSUNBTCA9IDEgPDwgMztcbnZhciBQTEFZRVJfVVBEQVRFX0lTUkVBRFkgPSAxIDw8IDQ7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgY2FyZFByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgbW9uc3RlclByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgZHVlbDogbnVsbCwgLy/miJjmlpfnrqHnkIZcbiAgICAgICAgaWR4OiAtMSxcbiAgICAgICAgdGVhbUNvbG9yOiAtMSxcbiAgICAgICAgaXNUdXJuQWN0aXZlOiBmYWxzZSwgLy/mmK/lkKblj6/ku6XooYzliqhcbiAgICAgICAgaXNSZWFkeTogZmFsc2UsIC8v5piv5ZCm5YeG5aSH5ri45oiPXG5cbiAgICAgICAgaGVyb05hbWU6ICcnLCAvL+eOqeWutuWQjeWtl1xuICAgICAgICBocDogMzAsIC8v6Iux6ZuE55Sf5ZG95YC8XG4gICAgICAgIGNyaXRpY2FsOiAwLCAvL+iLsembhOW9k+WJjeawtOaZtuaVsFxuICAgICAgICBtYXhDcml0aWNhbDogMCwgLy/oi7Hpm4TlvZPliY3lm57lkIjmnIDlpKfmsLTmmbbmlbBcblxuICAgICAgICBkZWNrQXJyYXk6IFtdLCAvL+WNoee7hOaVsOe7hO+8iENhcmTnsbvlnovvvIlcbiAgICAgICAgaGFuZEFycmF5OiBbXSwgLy/miYvniYzmlbDnu4TvvIhDYXJk57G75Z6L77yJXG4gICAgICAgIGZpZWxkQXJyYXk6IFtdIH0sXG5cbiAgICAvL+WcuuS4iumaj+S7juaVsOe7hO+8iE1vbnN0ZXLnsbvlnovvvIlcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGR1ZWwpIHtcbiAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICB9LFxuXG4gICAgLy/miZPljIXmlbDmja7lrozmlbRcbiAgICBwYWNrRGF0YUFsbDogZnVuY3Rpb24gcGFja0RhdGFBbGwoZGF0YSkge1xuICAgICAgICBkYXRhLmlkeCA9IHRoaXMuaWR4O1xuICAgICAgICBkYXRhLnRlbUNvbG9yID0gdGhpcy50ZWFtQ29sb3I7XG4gICAgICAgIGRhdGEuaXNUdXJuQWN0aXZlID0gdGhpcy5pc1R1cm5BY3RpdmU7XG4gICAgICAgIGRhdGEuaXNSZWFkeSA9IHRoaXMuaXNSZWFkeTtcbiAgICAgICAgZGF0YS5oZXJvTmFtZSA9IHRoaXMuaGVyb05hbWU7XG4gICAgICAgIGRhdGEuaHAgPSB0aGlzLmhwO1xuICAgICAgICBkYXRhLmNyaXRpY2FsID0gdGhpcy5jcml0aXRjYWw7XG4gICAgICAgIGRhdGEubWF4Q3JpdGljYWwgPSB0aGlzLm1heENyaXRpY2FsO1xuICAgIH0sXG5cbiAgICAvL+ino+W8gOaVsOaNruWujOaVtFxuICAgIHVuUGFja0RhdGFBbGw6IGZ1bmN0aW9uIHVuUGFja0RhdGFBbGwoZGF0YSkge1xuICAgICAgICB0aGlzLmlkeCA9IGRhdGEuaWR4O1xuICAgICAgICB0aGlzLnRlYW1Db2xvciA9IGRhdGEudGVtQ29sb3I7XG4gICAgICAgIHRoaXMuaXNUdXJuQWN0aXZlID0gZGF0YS5pc1R1cm5BY3RpdmU7XG4gICAgICAgIHRoaXMuaXNSZWFkeSA9IGRhdGEuaXNSZWFkeTtcbiAgICAgICAgdGhpcy5oZXJvTmFtZSA9IGRhdGEuaGVyb05hbWU7XG4gICAgICAgIHRoaXMuaHAgPSBkYXRhLmhwO1xuICAgICAgICB0aGlzLmNyaXRpdGNhbCA9IGRhdGEuY3JpdGljYWw7XG4gICAgICAgIHRoaXMubWF4Q3JpdGljYWwgPSBkYXRhLm1heENyaXRpY2FsO1xuICAgIH0sXG5cbiAgICAvL+aJk+WMheaVsOaNrlxuICAgIHBhY2tEYXRhOiBmdW5jdGlvbiBwYWNrRGF0YShkYXRhLCBmbGFnKSB7XG4gICAgICAgIGRhdGEuZmxhZyA9IGZsYWc7XG4gICAgICAgIGRhdGEuaWR4ID0gdGhpcy5pZHg7XG5cbiAgICAgICAgaWYgKGZsYWcgJiBQTEFZRVJfVVBEQVRFX0lTVFVSTkFDVElWRSkgZGF0YS5pc1R1cm5BY3RpdmUgPSB0aGlzLl9pc1R1cm5BY3RpdmU7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9IUCkgZGF0YS5ocCA9IHRoaXMuaHA7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9DUklUSUNBTCkgZGF0YS5jcml0aWNhbCA9IHRoaXMuY3JpdGljYWw7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9NQVhDUklUSUNBTCkgZGF0YS5tYXhDcml0aWNhbCA9IHRoaXMubWF4Q3JpdGljYWw7XG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9JU1JFQURZKSBkYXRhLmlzUmVhZHkgPSB0aGlzLmlzUmVhZHk7XG4gICAgfSxcblxuICAgIC8v6Kej5byA5pWw5o2uXG4gICAgdW5QYWNrRGF0YTogZnVuY3Rpb24gdW5QYWNrRGF0YShkYXRhKSB7XG4gICAgICAgIHZhciBmbGFnID0gZGF0YS5mbGFnO1xuXG4gICAgICAgIGlmIChmbGFnICYgUExBWUVSX1VQREFURV9JU1RVUk5BQ1RJVkUpIHRoaXMuX2lzVHVybkFjdGl2ZSA9IGRhdGEuaXNUdXJuQWN0aXZlO1xuICAgICAgICBpZiAoZmxhZyAmIFBMQVlFUl9VUERBVEVfSFApIHRoaXMuaHAgPSBkYXRhLmhwO1xuICAgICAgICBpZiAoZmxhZyAmIFBMQVlFUl9VUERBVEVfQ1JJVElDQUwpIHRoaXMuY3JpdGljYWwgPSBkYXRhLmNyaXRpY2FsO1xuICAgICAgICBpZiAoZmxhZyAmIFBMQVlFUl9VUERBVEVfSVNSRUFEWSkgdGhpcy5pc1JlYWR5ID0gZGF0YS5pc1JlYWR5O1xuICAgIH0sXG5cbiAgICAvL+agueaNrueJjOaxoOmaj+acuuWIm+W7uuWNoee7hFxuICAgIGNyZWF0ZURlY2s6IGZ1bmN0aW9uIGNyZWF0ZURlY2soY2FyZEFycmF5KSB7XG4gICAgICAgIHZhciBkZWNrQXJyYXkgPSB0aGlzLmRlY2tBcnJheTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMwOyArK2kpIHtcbiAgICAgICAgICAgIGRlY2tBcnJheVtpXSA9IG5ldyBDYXJkKCk7XG4gICAgICAgICAgICB2YXIgcmFuZG9tS2V5ID0gY2FyZEFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhcmRBcnJheS5sZW5ndGgpXTtcbiAgICAgICAgICAgIHZhciBjYXJkRGF0YSA9IENhcmREYXRhTWFuYWdlci5jYXJkTWFwW3JhbmRvbUtleV07XG4gICAgICAgICAgICBkZWNrQXJyYXlbaV0uaW5pdChjYXJkRGF0YSwgdGhpcywgaSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/orr7nva7mmK/lkKblj6/ku6XooYzliqhcbiAgICBzZXRUdXJuQWN0aXZlOiBmdW5jdGlvbiBzZXRUdXJuQWN0aXZlKHZhbCkge1xuICAgICAgICB0aGlzLl9pc1R1cm5BY3RpdmUgPSB2YWw7XG4gICAgfSxcblxuICAgIC8v5rC05pm25Zue5aSNXG4gICAgY3JpdGljYWxSZWNvdmVyOiBmdW5jdGlvbiBjcml0aWNhbFJlY292ZXIoKSB7XG4gICAgICAgIHRoaXMuY3JpdGljYWwgPSB0aGlzLm1heENyaXRpY2FsO1xuICAgICAgICB0aGlzLnJlZnJlc2hjcml0aWNhbHNwcml0ZSgpOyAvL+WIt+aWsOawtOaZtuWbvueJh1xuICAgIH0sXG5cbiAgICAvL+awtOaZtuWinuWKoFxuICAgIGNyaXRpY2FsUGx1czogZnVuY3Rpb24gY3JpdGljYWxQbHVzKG51bSkge1xuICAgICAgICB0aGlzLm1heENyaXRpY2FsICs9IG51bTtcbiAgICAgICAgdGhpcy5jcml0aWNhbCArPSBudW07XG4gICAgICAgIGlmICh0aGlzLm1heENyaXRpY2FsID4gMTApIHRoaXMubWF4Q3JpdGljYWwgPSAxMDtcbiAgICAgICAgaWYgKHRoaXMuY3JpdGljYWwgPiAxMCkgdGhpcy5jcml0aWNhbCA9IDEwO1xuICAgICAgICB0aGlzLnJlZnJlc2hjcml0aWNhbHNwcml0ZSgpOyAvL+WIt+aWsOawtOaZtuWbvueJh1xuICAgIH0sXG5cbiAgICAvL+mHjee9rumaj+S7juaUu+WHu+asoeaVsFxuICAgIGF3YWtlbk1vbnN0ZXI6IGZ1bmN0aW9uIGF3YWtlbk1vbnN0ZXIoKSB7XG4gICAgICAgIHZhciBmaWVsZEFycmF5ID0gdGhpcy5maWVsZEFycmF5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZmllbGRBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZmllbGRBcnJheVtpXS5pc0F0a2VkID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgLy/miaPpmaRIUFxuICAgIHJlZHVjZUhwOiBmdW5jdGlvbiByZWR1Y2VIcChudW0pIHtcbiAgICAgICAgaWYgKG51bSA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ocCAtPSBudW07XG4gICAgICAgIHRoaXMucmVmcmVzaEhwTGFiZWwoKTtcbiAgICB9LFxuXG4gICAgLy/lm57lpI1IUFxuICAgIGFkZEhwOiBmdW5jdGlvbiBhZGRIcChudW0pIHtcbiAgICAgICAgaWYgKG51bSA8PSAwKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5ocCArPSBudW07XG4gICAgICAgIGlmICh0aGlzLmhwID4gMzApIHRoaXMuaHAgPSAzMDtcblxuICAgICAgICB0aGlzLnJlZnJlc2hIcExhYmVsKCk7XG4gICAgfSxcblxuICAgIC8v5Yib5bu65omL54mMXG4gICAgY3JlYXRlQ2FyZFRvSGFuZDogZnVuY3Rpb24gY3JlYXRlQ2FyZFRvSGFuZChjYXJkKSB7XG4gICAgICAgIC8v6LaF6L+HMTDlvKDlsLHniIbngrhcbiAgICAgICAgaWYgKHRoaXMuaGFuZEFycmF5Lmxlbmd0aCA+PSAxMCkge1xuICAgICAgICAgICAgc2hvd1RpcExhYmVsKFwi5omL54mM6LaF5Ye6MTDlvKDvvIzmir3nmoTniYznm7TmjqXmkafmr4FcIik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL+aUueWPmOW6j+WPt++8jOWKoOWFpeaJi+eJjOaVsOe7hFxuICAgICAgICBjYXJkLl9pZHggPSB0aGlzLmhhbmRBcnJheS5sZW5ndGg7XG4gICAgICAgIHRoaXMuaGFuZEFycmF5LnB1c2goY2FyZCk7XG5cbiAgICAgICAgdmFyIGNhcmRTcHJpdGU7XG4gICAgICAgIGlmICh0aGlzLmNhcmRQb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgIGNhcmRTcHJpdGUgPSB0aGlzLmNhcmRQb29sLmdldCh0aGlzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhcmRTcHJpdGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLmNhcmRQcmVmYWIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oYW5kRmlsZWRMYXlvdXQubm9kZS5hZGRDaGlsZChjYXJkU3ByaXRlKTtcbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5LnB1c2goY2FyZFNwcml0ZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEhhbmRDYXJkKCk7IC8v5Yi35paw5omL54mM5Zu+54mHXG4gICAgfSxcblxuICAgIC8v5oq954mMXG4gICAgZHJhd0RlY2s6IGZ1bmN0aW9uIGRyYXdEZWNrKG51bSkge1xuICAgICAgICB2YXIgZGVja0FycmF5ID0gdGhpcy5kZWNrQXJyYXk7XG5cbiAgICAgICAgaWYgKGRlY2tBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgY2FyZCA9IGRlY2tBcnJheS5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuZGVja0xhYmVsLnN0cmluZyA9IGRlY2tBcnJheS5sZW5ndGgudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlQ2FyZFRvSGFuZChjYXJkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucmVkdWNlSHAoMSk7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwodGhpcy5oZXJvTmFtZSArIFwiIOeahOeJjOW6k+ayoeeJjOS6hu+8jOaKvTHlvKDlsJExSFBcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobnVtIDw9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZHVlbC5jaGVja1dpbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kcmF3RGVjayhudW0gLSAxKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+WPrOWUpOmaj+S7jlxuICAgIHN1bW1lck1vbnN0ZXI6IGZ1bmN0aW9uIHN1bW1lck1vbnN0ZXIoY2FyZFNwcml0ZSkge1xuICAgICAgICAvL+WmguaenOmaj+S7juW3sua7oei/lOWbnlxuICAgICAgICBpZiAodGhpcy5maWVsZEFycmF5Lmxlbmd0aCA+IDcpIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgaWR4ID0gY2FyZFNwcml0ZS5faWR4O1xuICAgICAgICB2YXIgY2FyZCA9IHRoaXMuaGFuZEFycmF5W2lkeF07IC8v6I635Y+W5Y2h54mM5a+56LGhXG4gICAgICAgIGlmIChjYXJkKSB7XG4gICAgICAgICAgICB2YXIgY3JpdGljYWwgPSBjYXJkLmNyaXRpY2FsO1xuICAgICAgICAgICAgLy/lpoLmnpzmsLTmmbbkuI3lpJ/ov5Tlm55cbiAgICAgICAgICAgIGlmIChjcml0aWNhbCA+IHRoaXMuY3JpdGljYWwpIHtcbiAgICAgICAgICAgICAgICBzaG93VGlwTGFiZWwodGhpcy5oZXJvTmFtZSArIFwiIOWPquaciSBcIiArIHRoaXMuY3JpdGljYWwgKyAnIOS4quawtOaZtizkuI3og73lj6zllKTotLnnlKjkuLonICsgY3JpdGljYWwgKyAnIOeahCAnICsgY2FyZC5jYXJkTmFtZSArICcg5Yiw5Zy65LiKJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmNyaXRpY2FsIC09IGNyaXRpY2FsO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoY3JpdGljYWxzcHJpdGUoKTtcblxuICAgICAgICAgICAgLy/liJvlu7rpmo/ku47lr7nosaHlubbliqDlhaXpmo/ku47mlbDnu4RcbiAgICAgICAgICAgIHZhciBtb25zdGVyID0gbmV3IE1vbnN0ZXIoKTtcbiAgICAgICAgICAgIG1vbnN0ZXIuaW5pdChjYXJkLCB0aGlzLCB0aGlzLmZpZWxkQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuZmllbGRBcnJheS5wdXNoKG1vbnN0ZXIpO1xuXG4gICAgICAgICAgICAvL+WIm+W7uumaj+S7juWbvueJh+i1hOa6kFxuICAgICAgICAgICAgdmFyIG1vbnN0ZXJTcHJpdGU7XG4gICAgICAgICAgICBpZiAodGhpcy5tb25zdGVyUG9vbC5zaXplKCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgbW9uc3RlclNwcml0ZSA9IHRoaXMubW9uc3RlclBvb2wuZ2V0KHRoaXMpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtb25zdGVyU3ByaXRlID0gY2MuaW5zdGFudGlhdGUodGhpcy5tb25zdGVyUHJlZmFiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5tb25zdGVyRmllbGRMYXlvdXQuYWRkQ2hpbGQobW9uc3RlclNwcml0ZSk7XG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheS5wdXNoKG1vbnN0ZXJTcHJpdGUpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoTW9uc3RlckZpZWxkKCk7IC8v5Yi35paw6ZqP5LuO5Yy6XG4gICAgICAgICAgICAvL+WIoOmZpOaJi+eJjFxuICAgICAgICAgICAgdGhpcy5jYXJkUG9vbC5wdXQoY2FyZFNwcml0ZS5ub2RlKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZEFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoQXJyYXlJZHgodGhpcy5oYW5kQXJyYXkpO1xuICAgICAgICAgICAgLy9jYy5sb2coJ2FmdGVyIHN1bW1lciBtb25zdGVyLCB0aGUgaGFuZGFycmF5Lmxlbmd0aCBpcyAlZCcsdGhpcy5oYW5kQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuaGFuZENhcmRTcHJpdGVBcnJheS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEhhbmRDYXJkKCk7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwodGhpcy5oZXJvTmFtZSArIFwiIOS7juaJi+eJjOWPrOWUpOS6hjHlvKAgXCIgKyBjYXJkLmNhcmROYW1lICsgJyDliLDlnLrkuIonKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+W5suaOiemaj+S7jlxuICAgIGtpbGxNb25zdGVyOiBmdW5jdGlvbiBraWxsTW9uc3Rlcihtb25zdGVyKSB7XG4gICAgICAgIGNjLmxvZygnbW9uc3RlclNwcml0ZUFycmF5OiVzJywgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY2MubG9nKCdmaWVsZEFycmF5OiVzJywgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY2MubG9nKCdfaWR4OiVzJywgbW9uc3Rlci5faWR4KTtcbiAgICAgICAgdmFyIGlkeCA9IG1vbnN0ZXIuX2lkeDtcbiAgICAgICAgdmFyIG1vbnN0ZXJTcHJpdGUgPSB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheVtpZHhdO1xuXG4gICAgICAgIHRoaXMubW9uc3RlclBvb2wucHV0KG1vbnN0ZXJTcHJpdGUpO1xuICAgICAgICB0aGlzLmZpZWxkQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEFycmF5SWR4KHRoaXMuZmllbGRBcnJheSk7XG4gICAgICAgIHRoaXMubW9uc3RlclNwcml0ZUFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgICBjYy5sb2coJ21vbnN0ZXJTcHJpdGVBcnJheTolcycsIHRoaXMubW9uc3RlclNwcml0ZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgIGNjLmxvZygnZmllbGRBcnJheTolcycsIHRoaXMuZmllbGRBcnJheS5sZW5ndGgpO1xuICAgICAgICB0aGlzLnJlZnJlc2hNb25zdGVyRmllbGQoKTtcbiAgICB9LFxuXG4gICAgLy/mlbDnu4Tlj5jliqjlkI7pnIDopoHliLfmlrBpZHhcbiAgICByZWZyZXNoQXJyYXlJZHg6IGZ1bmN0aW9uIHJlZnJlc2hBcnJheUlkeChhcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBhcnJheVtpXS5yZWZyZXNoSWR4KGkpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nlYzpnaLliLfmlrAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvL+aJi+eJjOWbvueJh+WIt+aWsFxuICAgIHJlZnJlc2hIYW5kQ2FyZDogZnVuY3Rpb24gcmVmcmVzaEhhbmRDYXJkKCkge1xuICAgICAgICB2YXIgaGFuZEFycmF5ID0gdGhpcy5oYW5kQXJyYXk7XG4gICAgICAgIHZhciBoYW5kQ2FyZFNwcml0ZUFycmF5ID0gdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5O1xuICAgICAgICB2YXIgYXJyYXlMZW5ndGggPSBoYW5kQXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0pIHtcbiAgICAgICAgICAgICAgICBoYW5kQ2FyZFNwcml0ZUFycmF5W2ldLmdldENvbXBvbmVudCgnQ2FyZFNwcml0ZScpLmluaXQoaGFuZEFycmF5W2ldLCB0aGlzLCBpKTtcbiAgICAgICAgICAgICAgICBoYW5kQ2FyZFNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDkwICogaSArIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3Nwcml0ZScpLndpZHRoIC8gMiAtIHRoaXMuaGFuZEZpbGVkTGF5b3V0Lm5vZGUud2lkdGggLyAyLCAwKTtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhoYW5kQ2FyZFNwcml0ZUFycmF5W2ldLmdldENoaWxkQnlOYW1lKCdzcHJpdGUnKS53aWR0aCk7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2codGhpcy5oYW5kRmlsZWRMYXlvdXQubm9kZS53aWR0aCk7XG4gICAgICAgICAgICAgICAgLy9oYW5kQ2FyZFNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDAsMCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjYy5sb2coJ2hhbmRDYXJkU3ByaXRlQXJyYXkgaXMgbGVzcyB0aGFuIGhhbmRBcnJheSEgJWQvJWQnLCBpLCBhcnJheUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+maj+S7juWbvueJh+WIt+aWsFxuICAgIHJlZnJlc2hNb25zdGVyRmllbGQ6IGZ1bmN0aW9uIHJlZnJlc2hNb25zdGVyRmllbGQoKSB7XG4gICAgICAgIHZhciBmaWVsZEFycmF5ID0gdGhpcy5maWVsZEFycmF5O1xuICAgICAgICB2YXIgbW9uc3RlclNwcml0ZUFycmF5ID0gdGhpcy5tb25zdGVyU3ByaXRlQXJyYXk7XG4gICAgICAgIHZhciBhcnJheUxlbmd0aCA9IGZpZWxkQXJyYXkubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlMZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKG1vbnN0ZXJTcHJpdGVBcnJheVtpXSkge1xuICAgICAgICAgICAgICAgIG1vbnN0ZXJTcHJpdGVBcnJheVtpXS5nZXRDb21wb25lbnQoJ01vbnN0ZXJTcHJpdGUnKS5pbml0KGZpZWxkQXJyYXlbaV0sIHRoaXMsIGkpO1xuICAgICAgICAgICAgICAgIG1vbnN0ZXJTcHJpdGVBcnJheVtpXS5zZXRQb3NpdGlvbigxMTAgKiBpICsgbW9uc3RlclNwcml0ZUFycmF5W2ldLndpZHRoIC8gMiAtIHRoaXMubW9uc3RlckZpZWxkTGF5b3V0LndpZHRoIC8gMiwgMCk7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2cobW9uc3RlclNwcml0ZUFycmF5W2ldLndpZHRoKTtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyh0aGlzLm1vbnN0ZXJGaWVsZExheW91dC5ub2RlLndpZHRoKTtcbiAgICAgICAgICAgICAgICAvL21vbnN0ZXJTcHJpdGVBcnJheVtpXS5zZXRQb3NpdGlvbigwLDApO1xuICAgICAgICAgICAgICAgIGlmIChmaWVsZEFycmF5W2ldLmlzQXRrZWQpIG1vbnN0ZXJTcHJpdGVBcnJheVtpXS5vcGFjaXR5ID0gMTAwO2Vsc2UgbW9uc3RlclNwcml0ZUFycmF5W2ldLm9wYWNpdHkgPSAyNTU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNjLmxvZygnbW9uc3RlclNwcml0ZUFycmF5IGlzIGxlc3MgdGhhbiBmaWVsZEFycmF5ISAlZC8lZCcsIGksIGFycmF5TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc1NzE3Mk14VGR4SUtwdmdUdnk4S2VVVycsICdzb2NrZXQuaW8nKTtcbi8vIFNjcmlwdFxcTmV0V29ya1xcc29ja2V0LmlvLmpzXG5cbmlmICghY2Muc3lzLmlzTmF0aXZlKSB7XG4gIChmdW5jdGlvbiAoZikge1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IGYoKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICBkZWZpbmUoW10sIGYpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZztpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBnID0gd2luZG93O1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGcgPSBnbG9iYWw7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGcgPSBzZWxmO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZyA9IHRoaXM7XG4gICAgICB9Zy5pbyA9IGYoKTtcbiAgICB9XG4gIH0pKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVmaW5lLCBtb2R1bGUsIGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsIG4sIHIpIHtcbiAgICAgIGZ1bmN0aW9uIHMobywgdSkge1xuICAgICAgICBpZiAoIW5bb10pIHtcbiAgICAgICAgICBpZiAoIXRbb10pIHtcbiAgICAgICAgICAgIHZhciBhID0gdHlwZW9mIHJlcXVpcmUgPT0gXCJmdW5jdGlvblwiICYmIHJlcXVpcmU7aWYgKCF1ICYmIGEpIHJldHVybiBhKG8sICEwKTtpZiAoaSkgcmV0dXJuIGkobywgITApO3ZhciBmID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIG8gKyBcIidcIik7dGhyb3cgKGYuY29kZSA9IFwiTU9EVUxFX05PVF9GT1VORFwiLCBmKTtcbiAgICAgICAgICB9dmFyIGwgPSBuW29dID0geyBleHBvcnRzOiB7fSB9O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgbiA9IHRbb11bMV1bZV07cmV0dXJuIHMobiA/IG4gOiBlKTtcbiAgICAgICAgICB9LCBsLCBsLmV4cG9ydHMsIGUsIHQsIG4sIHIpO1xuICAgICAgICB9cmV0dXJuIG5bb10uZXhwb3J0cztcbiAgICAgIH12YXIgaSA9IHR5cGVvZiByZXF1aXJlID09IFwiZnVuY3Rpb25cIiAmJiByZXF1aXJlO2ZvciAodmFyIG8gPSAwOyBvIDwgci5sZW5ndGg7IG8rKykgcyhyW29dKTtyZXR1cm4gcztcbiAgICB9KSh7IDE6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgdXJsID0gX2RlcmVxXygnLi91cmwnKTtcbiAgICAgICAgdmFyIHBhcnNlciA9IF9kZXJlcV8oJ3NvY2tldC5pby1wYXJzZXInKTtcbiAgICAgICAgdmFyIE1hbmFnZXIgPSBfZGVyZXFfKCcuL21hbmFnZXInKTtcbiAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZXhwb3J0cyA9IGxvb2t1cDtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNYW5hZ2VycyBjYWNoZS5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgY2FjaGUgPSBleHBvcnRzLm1hbmFnZXJzID0ge307XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTG9va3MgdXAgYW4gZXhpc3RpbmcgYE1hbmFnZXJgIGZvciBtdWx0aXBsZXhpbmcuXHJcbiAgICAgICAgICogSWYgdGhlIHVzZXIgc3VtbW9uczpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAgYGlvKCdodHRwOi8vbG9jYWxob3N0L2EnKTtgXHJcbiAgICAgICAgICogICBgaW8oJ2h0dHA6Ly9sb2NhbGhvc3QvYicpO2BcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFdlIHJldXNlIHRoZSBleGlzdGluZyBpbnN0YW5jZSBiYXNlZCBvbiBzYW1lIHNjaGVtZS9wb3J0L2hvc3QsXHJcbiAgICAgICAgICogYW5kIHdlIGluaXRpYWxpemUgc29ja2V0cyBmb3IgZWFjaCBuYW1lc3BhY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvb2t1cCh1cmksIG9wdHMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHVyaSA9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgICAgICAgIHZhciBwYXJzZWQgPSB1cmwodXJpKTtcbiAgICAgICAgICB2YXIgc291cmNlID0gcGFyc2VkLnNvdXJjZTtcbiAgICAgICAgICB2YXIgaWQgPSBwYXJzZWQuaWQ7XG4gICAgICAgICAgdmFyIHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICAgICAgICB2YXIgc2FtZU5hbWVzcGFjZSA9IGNhY2hlW2lkXSAmJiBwYXRoIGluIGNhY2hlW2lkXS5uc3BzO1xuICAgICAgICAgIHZhciBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fCBvcHRzWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8IGZhbHNlID09PSBvcHRzLm11bHRpcGxleCB8fCBzYW1lTmFtZXNwYWNlO1xuXG4gICAgICAgICAgdmFyIGlvO1xuXG4gICAgICAgICAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIGRlYnVnKCdpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzJywgc291cmNlKTtcbiAgICAgICAgICAgIGlvID0gTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgICAgICBkZWJ1ZygnbmV3IGlvIGluc3RhbmNlIGZvciAlcycsIHNvdXJjZSk7XG4gICAgICAgICAgICAgIGNhY2hlW2lkXSA9IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBgY29ubmVjdGAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRXhwb3NlIGNvbnN0cnVjdG9ycyBmb3Igc3RhbmRhbG9uZSBidWlsZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5NYW5hZ2VyID0gX2RlcmVxXygnLi9tYW5hZ2VyJyk7XG4gICAgICAgIGV4cG9ydHMuU29ja2V0ID0gX2RlcmVxXygnLi9zb2NrZXQnKTtcbiAgICAgIH0sIHsgXCIuL21hbmFnZXJcIjogMiwgXCIuL3NvY2tldFwiOiA0LCBcIi4vdXJsXCI6IDUsIFwiZGVidWdcIjogMTQsIFwic29ja2V0LmlvLXBhcnNlclwiOiA0MCB9XSwgMjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBlaW8gPSBfZGVyZXFfKCdlbmdpbmUuaW8tY2xpZW50Jyk7XG4gICAgICAgIHZhciBTb2NrZXQgPSBfZGVyZXFfKCcuL3NvY2tldCcpO1xuICAgICAgICB2YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG4gICAgICAgIHZhciBwYXJzZXIgPSBfZGVyZXFfKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG4gICAgICAgIHZhciBvbiA9IF9kZXJlcV8oJy4vb24nKTtcbiAgICAgICAgdmFyIGJpbmQgPSBfZGVyZXFfKCdjb21wb25lbnQtYmluZCcpO1xuICAgICAgICB2YXIgZGVidWcgPSBfZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXInKTtcbiAgICAgICAgdmFyIGluZGV4T2YgPSBfZGVyZXFfKCdpbmRleG9mJyk7XG4gICAgICAgIHZhciBCYWNrb2ZmID0gX2RlcmVxXygnYmFja28yJyk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSUU2KyBoYXNPd25Qcm9wZXJ0eVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBNYW5hZ2VyO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGBNYW5hZ2VyYCBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBlbmdpbmUgaW5zdGFuY2Ugb3IgZW5naW5lIHVyaS9vcHRzXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIE1hbmFnZXIodXJpLCBvcHRzKSB7XG4gICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1hbmFnZXIpKSByZXR1cm4gbmV3IE1hbmFnZXIodXJpLCBvcHRzKTtcbiAgICAgICAgICBpZiAodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8ICcvc29ja2V0LmlvJztcbiAgICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgICB0aGlzLnN1YnMgPSBbXTtcbiAgICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTtcbiAgICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICAgIHRoaXMucmFuZG9taXphdGlvbkZhY3RvcihvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IgfHwgMC41KTtcbiAgICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgICB0aGlzLmNvbm5lY3RpbmcgPSBbXTtcbiAgICAgICAgICB0aGlzLmxhc3RQaW5nID0gbnVsbDtcbiAgICAgICAgICB0aGlzLmVuY29kaW5nID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5wYWNrZXRCdWZmZXIgPSBbXTtcbiAgICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgcGFyc2VyLkVuY29kZXIoKTtcbiAgICAgICAgICB0aGlzLmRlY29kZXIgPSBuZXcgcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgICB0aGlzLmF1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7XG4gICAgICAgICAgaWYgKHRoaXMuYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvcGFnYXRlIGdpdmVuIGV2ZW50IHRvIHNvY2tldHMgYW5kIGVtaXQgb24gYHRoaXNgXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5lbWl0QWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIGZvciAodmFyIG5zcCBpbiB0aGlzLm5zcHMpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0aGlzLm5zcHMsIG5zcCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0uZW1pdC5hcHBseSh0aGlzLm5zcHNbbnNwXSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVXBkYXRlIGBzb2NrZXQuaWRgIG9mIGFsbCBzb2NrZXRzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS51cGRhdGVTb2NrZXRJZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZm9yICh2YXIgbnNwIGluIHRoaXMubnNwcykge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRoaXMubnNwcywgbnNwKSkge1xuICAgICAgICAgICAgICB0aGlzLm5zcHNbbnNwXS5pZCA9IHRoaXMuZW5naW5lLmlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIoTWFuYWdlci5wcm90b3R5cGUpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIGByZWNvbm5lY3Rpb25gIGNvbmZpZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gdHJ1ZS9mYWxzZSBpZiBpdCBzaG91bGQgYXV0b21hdGljYWxseSByZWNvbm5lY3RcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb24gPSBmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgcmVjb25uZWN0aW9uIGF0dGVtcHRzIGNvbmZpZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzIGJlZm9yZSBnaXZpbmcgdXBcclxuICAgICAgICAgKiBAcmV0dXJuIHtNYW5hZ2VyfSBzZWxmIG9yIHZhbHVlXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxyXG4gICAgICAgICAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheSA9IHY7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNaW4odik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucmFuZG9taXphdGlvbkZhY3RvciA9IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGhpcy5fcmFuZG9taXphdGlvbkZhY3RvcjtcbiAgICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgICB0aGlzLmJhY2tvZmYgJiYgdGhpcy5iYWNrb2ZmLnNldEppdHRlcih2KTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBtYXhpbXVtIGRlbGF5IGJldHdlZW4gcmVjb25uZWN0aW9ucy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkZWxheVxyXG4gICAgICAgICAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnJlY29ubmVjdGlvbkRlbGF5TWF4ID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heCA9IHY7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmICYmIHRoaXMuYmFja29mZi5zZXRNYXgodik7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2V0cyB0aGUgY29ubmVjdGlvbiB0aW1lb3V0LiBgZmFsc2VgIHRvIGRpc2FibGVcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGYgb3IgdmFsdWVcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLnRpbWVvdXQgPSBmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgICAgdGhpcy5fdGltZW91dCA9IHY7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XHJcbiAgICAgICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5tYXliZVJlY29ubmVjdE9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgICAgaWYgKCF0aGlzLnJlY29ubmVjdGluZyAmJiB0aGlzLl9yZWNvbm5lY3Rpb24gJiYgdGhpcy5iYWNrb2ZmLmF0dGVtcHRzID09PSAwKSB7XG4gICAgICAgICAgICAvLyBrZWVwcyByZWNvbm5lY3Rpb24gZnJvbSBmaXJpbmcgdHdpY2UgZm9yIHRoZSBzYW1lIHJlY29ubmVjdGlvbiBsb29wXG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbmFsLCBjYWxsYmFja1xyXG4gICAgICAgICAqIEByZXR1cm4ge01hbmFnZXJ9IHNlbGZcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLm9wZW4gPSBNYW5hZ2VyLnByb3RvdHlwZS5jb25uZWN0ID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgZGVidWcoJ3JlYWR5U3RhdGUgJXMnLCB0aGlzLnJlYWR5U3RhdGUpO1xuICAgICAgICAgIGlmICh+dGhpcy5yZWFkeVN0YXRlLmluZGV4T2YoJ29wZW4nKSkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICBkZWJ1Zygnb3BlbmluZyAlcycsIHRoaXMudXJpKTtcbiAgICAgICAgICB0aGlzLmVuZ2luZSA9IGVpbyh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgICAgICAgICB2YXIgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcblxuICAgICAgICAgIC8vIGVtaXQgYG9wZW5gXG4gICAgICAgICAgdmFyIG9wZW5TdWIgPSBvbihzb2NrZXQsICdvcGVuJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbm9wZW4oKTtcbiAgICAgICAgICAgIGZuICYmIGZuKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBlbWl0IGBjb25uZWN0X2Vycm9yYFxuICAgICAgICAgIHZhciBlcnJvclN1YiA9IG9uKHNvY2tldCwgJ2Vycm9yJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIGRlYnVnKCdjb25uZWN0X2Vycm9yJyk7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgICAgICAgICAgc2VsZi5lbWl0QWxsKCdjb25uZWN0X2Vycm9yJywgZGF0YSk7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignQ29ubmVjdGlvbiBlcnJvcicpO1xuICAgICAgICAgICAgICBlcnIuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgIGZuKGVycik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBPbmx5IGRvIHRoaXMgaWYgdGhlcmUgaXMgbm8gZm4gdG8gaGFuZGxlIHRoZSBlcnJvclxuICAgICAgICAgICAgICBzZWxmLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBlbWl0IGBjb25uZWN0X3RpbWVvdXRgXG4gICAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICB2YXIgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgICAgICBkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHdpbGwgdGltZW91dCBhZnRlciAlZCcsIHRpbWVvdXQpO1xuXG4gICAgICAgICAgICAvLyBzZXQgdGltZXJcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBkZWJ1ZygnY29ubmVjdCBhdHRlbXB0IHRpbWVkIG91dCBhZnRlciAlZCcsIHRpbWVvdXQpO1xuICAgICAgICAgICAgICBvcGVuU3ViLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdlcnJvcicsICd0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgIHNlbGYuZW1pdEFsbCgnY29ubmVjdF90aW1lb3V0JywgdGltZW91dCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcblxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goe1xuICAgICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWIpO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlYnVnKCdvcGVuJyk7XG5cbiAgICAgICAgICAvLyBjbGVhciBvbGQgc3Vic1xuICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuXG4gICAgICAgICAgLy8gbWFyayBhcyBvcGVuXG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW4nO1xuICAgICAgICAgIHRoaXMuZW1pdCgnb3BlbicpO1xuXG4gICAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgICAgdmFyIHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2RhdGEnLCBiaW5kKHRoaXMsICdvbmRhdGEnKSkpO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BpbmcnLCBiaW5kKHRoaXMsICdvbnBpbmcnKSkpO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ3BvbmcnLCBiaW5kKHRoaXMsICdvbnBvbmcnKSkpO1xuICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgJ2Vycm9yJywgYmluZCh0aGlzLCAnb25lcnJvcicpKSk7XG4gICAgICAgICAgdGhpcy5zdWJzLnB1c2gob24oc29ja2V0LCAnY2xvc2UnLCBiaW5kKHRoaXMsICdvbmNsb3NlJykpKTtcbiAgICAgICAgICB0aGlzLnN1YnMucHVzaChvbih0aGlzLmRlY29kZXIsICdkZWNvZGVkJywgYmluZCh0aGlzLCAnb25kZWNvZGVkJykpKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vbnBpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5sYXN0UGluZyA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdGhpcy5lbWl0QWxsKCdwaW5nJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vbnBvbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5lbWl0QWxsKCdwb25nJywgbmV3IERhdGUoKSAtIHRoaXMubGFzdFBpbmcpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aXRoIGRhdGEuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vbmRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHRoaXMuZGVjb2Rlci5hZGQoZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5vbmRlY29kZWQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIE1hbmFnZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgZGVidWcoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICB0aGlzLmVtaXRBbGwoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7U29ja2V0fVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUuc29ja2V0ID0gZnVuY3Rpb24gKG5zcCkge1xuICAgICAgICAgIHZhciBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICBpZiAoIXNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0ID0gbmV3IFNvY2tldCh0aGlzLCBuc3ApO1xuICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3RpbmcnLCBvbkNvbm5lY3RpbmcpO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzb2NrZXQuaWQgPSBzZWxmLmVuZ2luZS5pZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvQ29ubmVjdCkge1xuICAgICAgICAgICAgICAvLyBtYW51YWxseSBjYWxsIGhlcmUgc2luY2UgY29ubmVjdGluZyBldm5ldCBpcyBmaXJlZCBiZWZvcmUgbGlzdGVuaW5nXG4gICAgICAgICAgICAgIG9uQ29ubmVjdGluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIG9uQ29ubmVjdGluZygpIHtcbiAgICAgICAgICAgIGlmICghIH5pbmRleE9mKHNlbGYuY29ubmVjdGluZywgc29ja2V0KSkge1xuICAgICAgICAgICAgICBzZWxmLmNvbm5lY3RpbmcucHVzaChzb2NrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0XHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICAgICAgICB2YXIgaW5kZXggPSBpbmRleE9mKHRoaXMuY29ubmVjdGluZywgc29ja2V0KTtcbiAgICAgICAgICBpZiAofmluZGV4KSB0aGlzLmNvbm5lY3Rpbmcuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICBpZiAodGhpcy5jb25uZWN0aW5nLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgICAgdGhpcy5jbG9zZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFdyaXRlcyBhIHBhY2tldC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgZGVidWcoJ3dyaXRpbmcgcGFja2V0ICVqJywgcGFja2V0KTtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICBpZiAoIXNlbGYuZW5jb2RpbmcpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZSwgdGhlbiB3cml0ZSB0byBlbmdpbmUgd2l0aCByZXN1bHRcbiAgICAgICAgICAgIHNlbGYuZW5jb2RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQsIGZ1bmN0aW9uIChlbmNvZGVkUGFja2V0cykge1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbmdpbmUud3JpdGUoZW5jb2RlZFBhY2tldHNbaV0sIHBhY2tldC5vcHRpb25zKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzZWxmLmVuY29kaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgIHNlbGYucHJvY2Vzc1BhY2tldFF1ZXVlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYWRkIHBhY2tldCB0byB0aGUgcXVldWVcbiAgICAgICAgICAgIHNlbGYucGFja2V0QnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSWYgcGFja2V0IGJ1ZmZlciBpcyBub24tZW1wdHksIGJlZ2lucyBlbmNvZGluZyB0aGVcclxuICAgICAgICAgKiBuZXh0IHBhY2tldCBpbiBsaW5lLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUucHJvY2Vzc1BhY2tldFF1ZXVlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnBhY2tldEJ1ZmZlci5sZW5ndGggPiAwICYmICF0aGlzLmVuY29kaW5nKSB7XG4gICAgICAgICAgICB2YXIgcGFjayA9IHRoaXMucGFja2V0QnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5jbGVhbnVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlYnVnKCdjbGVhbnVwJyk7XG5cbiAgICAgICAgICB2YXIgc3ViO1xuICAgICAgICAgIHdoaWxlIChzdWIgPSB0aGlzLnN1YnMuc2hpZnQoKSkgc3ViLmRlc3Ryb3koKTtcblxuICAgICAgICAgIHRoaXMucGFja2V0QnVmZmVyID0gW107XG4gICAgICAgICAgdGhpcy5lbmNvZGluZyA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMubGFzdFBpbmcgPSBudWxsO1xuXG4gICAgICAgICAgdGhpcy5kZWNvZGVyLmRlc3Ryb3koKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5jbG9zZSA9IE1hbmFnZXIucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZGVidWcoJ2Rpc2Nvbm5lY3QnKTtcbiAgICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGBvbmNsb3NlYCB3aWxsIG5vdCBmaXJlIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIGFuIG9wZW4gZXZlbnQgbmV2ZXIgaGFwcGVuZWRcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcbiAgICAgICAgICBpZiAodGhpcy5lbmdpbmUpIHRoaXMuZW5naW5lLmNsb3NlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25jbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICBkZWJ1Zygnb25jbG9zZScpO1xuXG4gICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NlZCc7XG4gICAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbik7XG5cbiAgICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBNYW5hZ2VyLnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdCkgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICBpZiAodGhpcy5iYWNrb2ZmLmF0dGVtcHRzID49IHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzKSB7XG4gICAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IGZhaWxlZCcpO1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRBbGwoJ3JlY29ubmVjdF9mYWlsZWQnKTtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgZGVidWcoJ3dpbGwgd2FpdCAlZG1zIGJlZm9yZSByZWNvbm5lY3QgYXR0ZW1wdCcsIGRlbGF5KTtcblxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpIHJldHVybjtcblxuICAgICAgICAgICAgICBkZWJ1ZygnYXR0ZW1wdGluZyByZWNvbm5lY3QnKTtcbiAgICAgICAgICAgICAgc2VsZi5lbWl0QWxsKCdyZWNvbm5lY3RfYXR0ZW1wdCcsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICAgICAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0aW5nJywgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcblxuICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIHNlbGYub3BlbihmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgZGVidWcoJ3JlY29ubmVjdCBhdHRlbXB0IGVycm9yJyk7XG4gICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdEFsbCgncmVjb25uZWN0X2Vycm9yJywgZXJyLmRhdGEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBkZWJ1ZygncmVjb25uZWN0IHN1Y2Nlc3MnKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuXG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaCh7XG4gICAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgTWFuYWdlci5wcm90b3R5cGUub25yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICAgICAgICB0aGlzLnVwZGF0ZVNvY2tldElkcygpO1xuICAgICAgICAgIHRoaXMuZW1pdEFsbCgncmVjb25uZWN0JywgYXR0ZW1wdCk7XG4gICAgICAgIH07XG4gICAgICB9LCB7IFwiLi9vblwiOiAzLCBcIi4vc29ja2V0XCI6IDQsIFwiYmFja28yXCI6IDgsIFwiY29tcG9uZW50LWJpbmRcIjogMTEsIFwiY29tcG9uZW50LWVtaXR0ZXJcIjogMTIsIFwiZGVidWdcIjogMTQsIFwiZW5naW5lLmlvLWNsaWVudFwiOiAxNiwgXCJpbmRleG9mXCI6IDMyLCBcInNvY2tldC5pby1wYXJzZXJcIjogNDAgfV0sIDM6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBvbjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBIZWxwZXIgZm9yIHN1YnNjcmlwdGlvbnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdHxFdmVudEVtaXR0ZXJ9IG9iaiB3aXRoIGBFbWl0dGVyYCBtaXhpbiBvciBgRXZlbnRFbWl0dGVyYFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBuYW1lXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gICAgICAgICAgb2JqLm9uKGV2LCBmbik7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgIG9iai5yZW1vdmVMaXN0ZW5lcihldiwgZm4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH0sIHt9XSwgNDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIHZhciBwYXJzZXIgPSBfZGVyZXFfKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG4gICAgICAgIHZhciBFbWl0dGVyID0gX2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTtcbiAgICAgICAgdmFyIHRvQXJyYXkgPSBfZGVyZXFfKCd0by1hcnJheScpO1xuICAgICAgICB2YXIgb24gPSBfZGVyZXFfKCcuL29uJyk7XG4gICAgICAgIHZhciBiaW5kID0gX2RlcmVxXygnY29tcG9uZW50LWJpbmQnKTtcbiAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDpzb2NrZXQnKTtcbiAgICAgICAgdmFyIGhhc0JpbiA9IF9kZXJlcV8oJ2hhcy1iaW5hcnknKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBTb2NrZXQ7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSW50ZXJuYWwgZXZlbnRzIChibGFja2xpc3RlZCkuXHJcbiAgICAgICAgICogVGhlc2UgZXZlbnRzIGNhbid0IGJlIGVtaXR0ZWQgYnkgdGhlIHVzZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgZXZlbnRzID0ge1xuICAgICAgICAgIGNvbm5lY3Q6IDEsXG4gICAgICAgICAgY29ubmVjdF9lcnJvcjogMSxcbiAgICAgICAgICBjb25uZWN0X3RpbWVvdXQ6IDEsXG4gICAgICAgICAgY29ubmVjdGluZzogMSxcbiAgICAgICAgICBkaXNjb25uZWN0OiAxLFxuICAgICAgICAgIGVycm9yOiAxLFxuICAgICAgICAgIHJlY29ubmVjdDogMSxcbiAgICAgICAgICByZWNvbm5lY3RfYXR0ZW1wdDogMSxcbiAgICAgICAgICByZWNvbm5lY3RfZmFpbGVkOiAxLFxuICAgICAgICAgIHJlY29ubmVjdF9lcnJvcjogMSxcbiAgICAgICAgICByZWNvbm5lY3Rpbmc6IDEsXG4gICAgICAgICAgcGluZzogMSxcbiAgICAgICAgICBwb25nOiAxXG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hvcnRjdXQgdG8gYEVtaXR0ZXIjZW1pdGAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIGVtaXQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBTb2NrZXQoaW8sIG5zcCkge1xuICAgICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgICB0aGlzLmpzb24gPSB0aGlzOyAvLyBjb21wYXRcbiAgICAgICAgICB0aGlzLmlkcyA9IDA7XG4gICAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gICAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgICAgaWYgKHRoaXMuaW8uYXV0b0Nvbm5lY3QpIHRoaXMub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWl4IGluIGBFbWl0dGVyYC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5zdWJFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuc3VicykgcmV0dXJuO1xuXG4gICAgICAgICAgdmFyIGlvID0gdGhpcy5pbztcbiAgICAgICAgICB0aGlzLnN1YnMgPSBbb24oaW8sICdvcGVuJywgYmluZCh0aGlzLCAnb25vcGVuJykpLCBvbihpbywgJ3BhY2tldCcsIGJpbmQodGhpcywgJ29ucGFja2V0JykpLCBvbihpbywgJ2Nsb3NlJywgYmluZCh0aGlzLCAnb25jbG9zZScpKV07XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogXCJPcGVuc1wiIHRoZSBzb2NrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUub3BlbiA9IFNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHJldHVybiB0aGlzO1xuXG4gICAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgICB0aGlzLmlvLm9wZW4oKTsgLy8gZW5zdXJlIG9wZW5cbiAgICAgICAgICBpZiAoJ29wZW4nID09IHRoaXMuaW8ucmVhZHlTdGF0ZSkgdGhpcy5vbm9wZW4oKTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3RpbmcnKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgIGFyZ3MudW5zaGlmdCgnbWVzc2FnZScpO1xuICAgICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdmVycmlkZSBgZW1pdGAuXHJcbiAgICAgICAgICogSWYgdGhlIGV2ZW50IGlzIGluIGBldmVudHNgLCBpdCdzIGVtaXR0ZWQgbm9ybWFsbHkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgbmFtZVxyXG4gICAgICAgICAqIEByZXR1cm4ge1NvY2tldH0gc2VsZlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICAgICAgICAgIGVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBhcmdzID0gdG9BcnJheShhcmd1bWVudHMpO1xuICAgICAgICAgIHZhciBwYXJzZXJUeXBlID0gcGFyc2VyLkVWRU5UOyAvLyBkZWZhdWx0XG4gICAgICAgICAgaWYgKGhhc0JpbihhcmdzKSkge1xuICAgICAgICAgICAgcGFyc2VyVHlwZSA9IHBhcnNlci5CSU5BUllfRVZFTlQ7XG4gICAgICAgICAgfSAvLyBiaW5hcnlcbiAgICAgICAgICB2YXIgcGFja2V0ID0geyB0eXBlOiBwYXJzZXJUeXBlLCBkYXRhOiBhcmdzIH07XG5cbiAgICAgICAgICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICAgICAgICAgIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gIXRoaXMuZmxhZ3MgfHwgZmFsc2UgIT09IHRoaXMuZmxhZ3MuY29tcHJlc3M7XG5cbiAgICAgICAgICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBkZWJ1ZygnZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkJywgdGhpcy5pZHMpO1xuICAgICAgICAgICAgdGhpcy5hY2tzW3RoaXMuaWRzXSA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICBwYWNrZXQuaWQgPSB0aGlzLmlkcysrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWxldGUgdGhpcy5mbGFncztcblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNlbmRzIGEgcGFja2V0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIHBhY2tldC5uc3AgPSB0aGlzLm5zcDtcbiAgICAgICAgICB0aGlzLmlvLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBgb3BlbmAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9ub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWJ1ZygndHJhbnNwb3J0IGlzIG9wZW4gLSBjb25uZWN0aW5nJyk7XG5cbiAgICAgICAgICAvLyB3cml0ZSBjb25uZWN0IHBhY2tldCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICBpZiAoJy8nICE9IHRoaXMubnNwKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHBhcnNlci5DT05ORUNUIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uY2xvc2UgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgICAgICAgZGVidWcoJ2Nsb3NlICglcyknLCByZWFzb24pO1xuICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5kaXNjb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmlkO1xuICAgICAgICAgIHRoaXMuZW1pdCgnZGlzY29ubmVjdCcsIHJlYXNvbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdpdGggc29ja2V0IHBhY2tldC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9ucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIGlmIChwYWNrZXQubnNwICE9IHRoaXMubnNwKSByZXR1cm47XG5cbiAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHBhcnNlci5DT05ORUNUOlxuICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdCgpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBwYXJzZXIuRVZFTlQ6XG4gICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBwYXJzZXIuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkFDSzpcbiAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBwYXJzZXIuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBwYXJzZXIuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgcGFyc2VyLkVSUk9SOlxuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgZXZlbnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbmV2ZW50ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIHZhciBhcmdzID0gcGFja2V0LmRhdGEgfHwgW107XG4gICAgICAgICAgZGVidWcoJ2VtaXR0aW5nIGV2ZW50ICVqJywgYXJncyk7XG5cbiAgICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGRlYnVnKCdhdHRhY2hpbmcgYWNrIGNhbGxiYWNrIHRvIGV2ZW50Jyk7XG4gICAgICAgICAgICBhcmdzLnB1c2godGhpcy5hY2socGFja2V0LmlkKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBlbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIucHVzaChhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuYWNrID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHZhciBzZW50ID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHNlbnQpIHJldHVybjtcbiAgICAgICAgICAgIHNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBkZWJ1Zygnc2VuZGluZyBhY2sgJWonLCBhcmdzKTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSBoYXNCaW4oYXJncykgPyBwYXJzZXIuQklOQVJZX0FDSyA6IHBhcnNlci5BQ0s7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgZGF0YTogYXJnc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBhIHNlcnZlciBhY2tub3dsZWdlbWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uYWNrID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgIHZhciBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgYWNrKSB7XG4gICAgICAgICAgICBkZWJ1ZygnY2FsbGluZyBhY2sgJXMgd2l0aCAlaicsIHBhY2tldC5pZCwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgYWNrLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoJ2JhZCBhY2sgJXMnLCBwYWNrZXQuaWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgY29ubmVjdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUub25jb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLmRpc2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuZW1pdCgnY29ubmVjdCcpO1xuICAgICAgICAgIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuZW1pdEJ1ZmZlcmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLnJlY2VpdmVCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGVtaXQuYXBwbHkodGhpcywgdGhpcy5yZWNlaXZlQnVmZmVyW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG5cbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh0aGlzLnNlbmRCdWZmZXJbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUub25kaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGRlYnVnKCdzZXJ2ZXIgZGlzY29ubmVjdCAoJXMpJywgdGhpcy5uc3ApO1xuICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgIHRoaXMub25jbG9zZSgnaW8gc2VydmVyIGRpc2Nvbm5lY3QnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxyXG4gICAgICAgICAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXHJcbiAgICAgICAgICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGUuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgU29ja2V0LnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICh0aGlzLnN1YnMpIHtcbiAgICAgICAgICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnN1YnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdGhpcy5zdWJzW2ldLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3VicyA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5pby5kZXN0cm95KHRoaXMpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IHNlbGZcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICBkZWJ1ZygncGVyZm9ybWluZyBkaXNjb25uZWN0ICglcyknLCB0aGlzLm5zcCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHBhcnNlci5ESVNDT05ORUNUIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gICAgICAgICAgdGhpcy5kZXN0cm95KCk7XG5cbiAgICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoJ2lvIGNsaWVudCBkaXNjb25uZWN0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXHJcbiAgICAgICAgICogQHJldHVybiB7U29ja2V0fSBzZWxmXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBTb2NrZXQucHJvdG90eXBlLmNvbXByZXNzID0gZnVuY3Rpb24gKGNvbXByZXNzKSB7XG4gICAgICAgICAgdGhpcy5mbGFncyA9IHRoaXMuZmxhZ3MgfHwge307XG4gICAgICAgICAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgfSwgeyBcIi4vb25cIjogMywgXCJjb21wb25lbnQtYmluZFwiOiAxMSwgXCJjb21wb25lbnQtZW1pdHRlclwiOiAxMiwgXCJkZWJ1Z1wiOiAxNCwgXCJoYXMtYmluYXJ5XCI6IDMwLCBcInNvY2tldC5pby1wYXJzZXJcIjogNDAsIFwidG8tYXJyYXlcIjogNDMgfV0sIDU6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBwYXJzZXVyaSA9IF9kZXJlcV8oJ3BhcnNldXJpJyk7XG4gICAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnc29ja2V0LmlvLWNsaWVudDp1cmwnKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gdXJsO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBVUkwgcGFyc2VyLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBBbiBvYmplY3QgbWVhbnQgdG8gbWltaWMgd2luZG93LmxvY2F0aW9uLlxyXG4gICAgICAgICAgICogICAgICAgICAgICAgICAgIERlZmF1bHRzIHRvIHdpbmRvdy5sb2NhdGlvbi5cclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIHVybCh1cmksIGxvYykge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHVyaTtcblxuICAgICAgICAgICAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgICAgICAgICAgIHZhciBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uO1xuICAgICAgICAgICAgaWYgKG51bGwgPT0gdXJpKSB1cmkgPSBsb2MucHJvdG9jb2wgKyAnLy8nICsgbG9jLmhvc3Q7XG5cbiAgICAgICAgICAgIC8vIHJlbGF0aXZlIHBhdGggc3VwcG9ydFxuICAgICAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgICAgaWYgKCcvJyA9PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICAgICAgICAgICAgaWYgKCcvJyA9PSB1cmkuY2hhckF0KDEpKSB7XG4gICAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoJ3Byb3RvY29sLWxlc3MgdXJsICVzJywgdXJpKTtcbiAgICAgICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGxvYykge1xuICAgICAgICAgICAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgJy8vJyArIHVyaTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdXJpID0gJ2h0dHBzOi8vJyArIHVyaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBwYXJzZVxuICAgICAgICAgICAgICBkZWJ1ZygncGFyc2UgJXMnLCB1cmkpO1xuICAgICAgICAgICAgICBvYmogPSBwYXJzZXVyaSh1cmkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICAgICAgICAgIGlmICghb2JqLnBvcnQpIHtcbiAgICAgICAgICAgICAgaWYgKC9eKGh0dHB8d3MpJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICAgICAgb2JqLnBvcnQgPSAnODAnO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKC9eKGh0dHB8d3MpcyQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgICAgIG9iai5wb3J0ID0gJzQ0Myc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCAnLyc7XG5cbiAgICAgICAgICAgIHZhciBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZignOicpICE9PSAtMTtcbiAgICAgICAgICAgIHZhciBob3N0ID0gaXB2NiA/ICdbJyArIG9iai5ob3N0ICsgJ10nIDogb2JqLmhvc3Q7XG5cbiAgICAgICAgICAgIC8vIGRlZmluZSB1bmlxdWUgaWRcbiAgICAgICAgICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArICc6Ly8nICsgaG9zdCArICc6JyArIG9iai5wb3J0O1xuICAgICAgICAgICAgLy8gZGVmaW5lIGhyZWZcbiAgICAgICAgICAgIG9iai5ocmVmID0gb2JqLnByb3RvY29sICsgJzovLycgKyBob3N0ICsgKGxvYyAmJiBsb2MucG9ydCA9PSBvYmoucG9ydCA/ICcnIDogJzonICsgb2JqLnBvcnQpO1xuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCJkZWJ1Z1wiOiAxNCwgXCJwYXJzZXVyaVwiOiAzOCB9XSwgNjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhZnRlcjtcblxuICAgICAgICBmdW5jdGlvbiBhZnRlcihjb3VudCwgY2FsbGJhY2ssIGVycl9jYikge1xuICAgICAgICAgIHZhciBiYWlsID0gZmFsc2U7XG4gICAgICAgICAgZXJyX2NiID0gZXJyX2NiIHx8IG5vb3A7XG4gICAgICAgICAgcHJveHkuY291bnQgPSBjb3VudDtcblxuICAgICAgICAgIHJldHVybiBjb3VudCA9PT0gMCA/IGNhbGxiYWNrKCkgOiBwcm94eTtcblxuICAgICAgICAgIGZ1bmN0aW9uIHByb3h5KGVyciwgcmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAocHJveHkuY291bnQgPD0gMCkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FmdGVyIGNhbGxlZCB0b28gbWFueSB0aW1lcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLS1wcm94eS5jb3VudDtcblxuICAgICAgICAgICAgLy8gYWZ0ZXIgZmlyc3QgZXJyb3IsIHJlc3QgYXJlIHBhc3NlZCB0byBlcnJfY2JcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgYmFpbCA9IHRydWU7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICAgIC8vIGZ1dHVyZSBlcnJvciBjYWxsYmFja3Mgd2lsbCBnbyB0byBlcnJvciBoYW5kbGVyXG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gZXJyX2NiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwcm94eS5jb3VudCA9PT0gMCAmJiAhYmFpbCkge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCByZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5vb3AoKSB7fVxuICAgICAgfSwge31dLCA3OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAvKipcclxuICAgICAgICAgKiBBbiBhYnN0cmFjdGlvbiBmb3Igc2xpY2luZyBhbiBhcnJheWJ1ZmZlciBldmVuIHdoZW5cclxuICAgICAgICAgKiBBcnJheUJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgaXMgbm90IHN1cHBvcnRlZFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcnJheWJ1ZmZlciwgc3RhcnQsIGVuZCkge1xuICAgICAgICAgIHZhciBieXRlcyA9IGFycmF5YnVmZmVyLmJ5dGVMZW5ndGg7XG4gICAgICAgICAgc3RhcnQgPSBzdGFydCB8fCAwO1xuICAgICAgICAgIGVuZCA9IGVuZCB8fCBieXRlcztcblxuICAgICAgICAgIGlmIChhcnJheWJ1ZmZlci5zbGljZSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5YnVmZmVyLnNsaWNlKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzdGFydCA8IDApIHtcbiAgICAgICAgICAgIHN0YXJ0ICs9IGJ5dGVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW5kIDwgMCkge1xuICAgICAgICAgICAgZW5kICs9IGJ5dGVzO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZW5kID4gYnl0ZXMpIHtcbiAgICAgICAgICAgIGVuZCA9IGJ5dGVzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzdGFydCA+PSBieXRlcyB8fCBzdGFydCA+PSBlbmQgfHwgYnl0ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXlCdWZmZXIoMCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGFidiA9IG5ldyBVaW50OEFycmF5KGFycmF5YnVmZmVyKTtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFVpbnQ4QXJyYXkoZW5kIC0gc3RhcnQpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydCwgaWkgPSAwOyBpIDwgZW5kOyBpKyssIGlpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpaV0gPSBhYnZbaV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQuYnVmZmVyO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCA4OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4cG9zZSBgQmFja29mZmAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBCYWNrb2ZmO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIC0gYG1pbmAgaW5pdGlhbCB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyBbMTAwXVxyXG4gICAgICAgICAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxyXG4gICAgICAgICAqIC0gYGppdHRlcmAgWzBdXHJcbiAgICAgICAgICogLSBgZmFjdG9yYCBbMl1cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICAgICAgICAgIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gICAgICAgICAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICAgICAgICAgIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gICAgICAgICAgdGhpcy5hdHRlbXB0cyA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBCYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gICAgICAgICAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgICAgICB2YXIgZGV2aWF0aW9uID0gTWF0aC5mbG9vcihyYW5kICogdGhpcy5qaXR0ZXIgKiBtcyk7XG4gICAgICAgICAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEJhY2tvZmYucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBCYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbiAobWluKSB7XG4gICAgICAgICAgdGhpcy5tcyA9IG1pbjtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTZXQgdGhlIG1heGltdW0gZHVyYXRpb25cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24gKG1heCkge1xuICAgICAgICAgIHRoaXMubWF4ID0gbWF4O1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFNldCB0aGUgaml0dGVyXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEJhY2tvZmYucHJvdG90eXBlLnNldEppdHRlciA9IGZ1bmN0aW9uIChqaXR0ZXIpIHtcbiAgICAgICAgICB0aGlzLmppdHRlciA9IGppdHRlcjtcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgOTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLypcclxuICAgICAgICAgKiBiYXNlNjQtYXJyYXlidWZmZXJcclxuICAgICAgICAgKiBodHRwczovL2dpdGh1Yi5jb20vbmlrbGFzdmgvYmFzZTY0LWFycmF5YnVmZmVyXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBDb3B5cmlnaHQgKGMpIDIwMTIgTmlrbGFzIHZvbiBIZXJ0emVuXHJcbiAgICAgICAgICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxyXG4gICAgICAgICAqL1xuICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgICAgICAgdmFyIGNoYXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvXCI7XG5cbiAgICAgICAgICAvLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG4gICAgICAgICAgdmFyIGxvb2t1cCA9IG5ldyBVaW50OEFycmF5KDI1Nik7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZSA9IGZ1bmN0aW9uIChhcnJheWJ1ZmZlcikge1xuICAgICAgICAgICAgdmFyIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgbGVuID0gYnl0ZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGJhc2U2NCA9IFwiXCI7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgICAgICAgIGJhc2U2NCArPSBjaGFyc1soYnl0ZXNbaV0gJiAzKSA8PCA0IHwgYnl0ZXNbaSArIDFdID4+IDRdO1xuICAgICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKGJ5dGVzW2kgKyAxXSAmIDE1KSA8PCAyIHwgYnl0ZXNbaSArIDJdID4+IDZdO1xuICAgICAgICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaSArIDJdICYgNjNdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGVuICUgMyA9PT0gMikge1xuICAgICAgICAgICAgICBiYXNlNjQgPSBiYXNlNjQuc3Vic3RyaW5nKDAsIGJhc2U2NC5sZW5ndGggLSAxKSArIFwiPVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgXCI9PVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gYmFzZTY0O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBleHBvcnRzLmRlY29kZSA9IGZ1bmN0aW9uIChiYXNlNjQpIHtcbiAgICAgICAgICAgIHZhciBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSxcbiAgICAgICAgICAgICAgICBsZW4gPSBiYXNlNjQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgcCA9IDAsXG4gICAgICAgICAgICAgICAgZW5jb2RlZDEsXG4gICAgICAgICAgICAgICAgZW5jb2RlZDIsXG4gICAgICAgICAgICAgICAgZW5jb2RlZDMsXG4gICAgICAgICAgICAgICAgZW5jb2RlZDQ7XG5cbiAgICAgICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSBcIj1cIikge1xuICAgICAgICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgICAgICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09IFwiPVwiKSB7XG4gICAgICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksXG4gICAgICAgICAgICAgICAgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICAgICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICAgICAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgICAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAyKV07XG4gICAgICAgICAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAzKV07XG5cbiAgICAgICAgICAgICAgYnl0ZXNbcCsrXSA9IGVuY29kZWQxIDw8IDIgfCBlbmNvZGVkMiA+PiA0O1xuICAgICAgICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQyICYgMTUpIDw8IDQgfCBlbmNvZGVkMyA+PiAyO1xuICAgICAgICAgICAgICBieXRlc1twKytdID0gKGVuY29kZWQzICYgMykgPDwgNiB8IGVuY29kZWQ0ICYgNjM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbiAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuICAgICAgfSwge31dLCAxMDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENyZWF0ZSBhIGJsb2IgYnVpbGRlciBldmVuIHdoZW4gdmVuZG9yIHByZWZpeGVzIGV4aXN0XHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBCbG9iQnVpbGRlciA9IGdsb2JhbC5CbG9iQnVpbGRlciB8fCBnbG9iYWwuV2ViS2l0QmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLk1TQmxvYkJ1aWxkZXIgfHwgZ2xvYmFsLk1vekJsb2JCdWlsZGVyO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIGlzIHN1cHBvcnRlZFxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgYmxvYlN1cHBvcnRlZCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgYSA9IG5ldyBCbG9iKFsnaGknXSk7XG4gICAgICAgICAgICAgIHJldHVybiBhLnNpemUgPT09IDI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiBCbG9iIGNvbnN0cnVjdG9yIHN1cHBvcnRzIEFycmF5QnVmZmVyVmlld3NcclxuICAgICAgICAgICAqIEZhaWxzIGluIFNhZmFyaSA2LCBzbyB3ZSBuZWVkIHRvIG1hcCB0byBBcnJheUJ1ZmZlcnMgdGhlcmUuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPSBibG9iU3VwcG9ydGVkICYmIChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB2YXIgYiA9IG5ldyBCbG9iKFtuZXcgVWludDhBcnJheShbMSwgMl0pXSk7XG4gICAgICAgICAgICAgIHJldHVybiBiLnNpemUgPT09IDI7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSgpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiBCbG9iQnVpbGRlciBpcyBzdXBwb3J0ZWRcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGJsb2JCdWlsZGVyU3VwcG9ydGVkID0gQmxvYkJ1aWxkZXIgJiYgQmxvYkJ1aWxkZXIucHJvdG90eXBlLmFwcGVuZCAmJiBCbG9iQnVpbGRlci5wcm90b3R5cGUuZ2V0QmxvYjtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSGVscGVyIGZ1bmN0aW9uIHRoYXQgbWFwcyBBcnJheUJ1ZmZlclZpZXdzIHRvIEFycmF5QnVmZmVyc1xyXG4gICAgICAgICAgICogVXNlZCBieSBCbG9iQnVpbGRlciBjb25zdHJ1Y3RvciBhbmQgb2xkIGJyb3dzZXJzIHRoYXQgZGlkbid0XHJcbiAgICAgICAgICAgKiBzdXBwb3J0IGl0IGluIHRoZSBCbG9iIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBtYXBBcnJheUJ1ZmZlclZpZXdzKGFyeSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGNodW5rID0gYXJ5W2ldO1xuICAgICAgICAgICAgICBpZiAoY2h1bmsuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmID0gY2h1bmsuYnVmZmVyO1xuXG4gICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBpcyBhIHN1YmFycmF5LCBtYWtlIGEgY29weSBzbyB3ZSBvbmx5XG4gICAgICAgICAgICAgICAgLy8gaW5jbHVkZSB0aGUgc3ViYXJyYXkgcmVnaW9uIGZyb20gdGhlIHVuZGVybHlpbmcgYnVmZmVyXG4gICAgICAgICAgICAgICAgaWYgKGNodW5rLmJ5dGVMZW5ndGggIT09IGJ1Zi5ieXRlTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgY29weSA9IG5ldyBVaW50OEFycmF5KGNodW5rLmJ5dGVMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgY29weS5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmLCBjaHVuay5ieXRlT2Zmc2V0LCBjaHVuay5ieXRlTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgICBidWYgPSBjb3B5LmJ1ZmZlcjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhcnlbaV0gPSBidWY7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBCbG9iQnVpbGRlckNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgICAgICAgICAgIHZhciBiYiA9IG5ldyBCbG9iQnVpbGRlcigpO1xuICAgICAgICAgICAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICBiYi5hcHBlbmQoYXJ5W2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZSA/IGJiLmdldEJsb2Iob3B0aW9ucy50eXBlKSA6IGJiLmdldEJsb2IoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gQmxvYkNvbnN0cnVjdG9yKGFyeSwgb3B0aW9ucykge1xuICAgICAgICAgICAgbWFwQXJyYXlCdWZmZXJWaWV3cyhhcnkpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBCbG9iKGFyeSwgb3B0aW9ucyB8fCB7fSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChibG9iU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgIHJldHVybiBibG9iU3VwcG9ydHNBcnJheUJ1ZmZlclZpZXcgPyBnbG9iYWwuQmxvYiA6IEJsb2JDb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYmxvYkJ1aWxkZXJTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJsb2JCdWlsZGVyQ29uc3RydWN0b3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pKCk7XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7fV0sIDExOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAvKipcclxuICAgICAgICAgKiBTbGljZSByZWZlcmVuY2UuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHNsaWNlID0gW10uc2xpY2U7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQmluZCBgb2JqYCB0byBgZm5gLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBmbiBvciBzdHJpbmdcclxuICAgICAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaiwgZm4pIHtcbiAgICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGZuKSBmbiA9IG9ialtmbl07XG4gICAgICAgICAgaWYgKCdmdW5jdGlvbicgIT0gdHlwZW9mIGZuKSB0aHJvdyBuZXcgRXJyb3IoJ2JpbmQoKSByZXF1aXJlcyBhIGZ1bmN0aW9uJyk7XG4gICAgICAgICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMik7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseShvYmosIGFyZ3MuY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDEyOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICAgICAgICAgIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIG1peGluKG9iaikge1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICAgICAgICAgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG9uLmZuID0gZm47XG4gICAgICAgICAgdGhpcy5vbihldmVudCwgb24pO1xuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAgICAgICAgICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnQsIGZuKSB7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gICAgICAgICAgLy8gYWxsXG4gICAgICAgICAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzcGVjaWZpYyBldmVudFxuICAgICAgICAgIHZhciBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgICAgICAgIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAgICAgICAgIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgICAgICAgICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gICAgICAgICAgdmFyIGNiO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICAgICAgICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gICAgICAgICAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICAgICAgICAgIGlmIChjYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtBcnJheX1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuICEhdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgMTM6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgIHZhciBmbiA9IGZ1bmN0aW9uIGZuKCkge307XG4gICAgICAgICAgZm4ucHJvdG90eXBlID0gYi5wcm90b3R5cGU7XG4gICAgICAgICAgYS5wcm90b3R5cGUgPSBuZXcgZm4oKTtcbiAgICAgICAgICBhLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGE7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDE0OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgaXMgdGhlIHdlYiBicm93c2VyIGltcGxlbWVudGF0aW9uIG9mIGBkZWJ1ZygpYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEV4cG9zZSBgZGVidWcoKWAgYXMgdGhlIG1vZHVsZS5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuL2RlYnVnJyk7XG4gICAgICAgIGV4cG9ydHMubG9nID0gbG9nO1xuICAgICAgICBleHBvcnRzLmZvcm1hdEFyZ3MgPSBmb3JtYXRBcmdzO1xuICAgICAgICBleHBvcnRzLnNhdmUgPSBzYXZlO1xuICAgICAgICBleHBvcnRzLmxvYWQgPSBsb2FkO1xuICAgICAgICBleHBvcnRzLnVzZUNvbG9ycyA9IHVzZUNvbG9ycztcbiAgICAgICAgZXhwb3J0cy5zdG9yYWdlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGNocm9tZSAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgY2hyb21lLnN0b3JhZ2UgPyBjaHJvbWUuc3RvcmFnZS5sb2NhbCA6IGxvY2Fsc3RvcmFnZSgpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvbG9ycy5cclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLmNvbG9ycyA9IFsnbGlnaHRzZWFncmVlbicsICdmb3Jlc3RncmVlbicsICdnb2xkZW5yb2QnLCAnZG9kZ2VyYmx1ZScsICdkYXJrb3JjaGlkJywgJ2NyaW1zb24nXTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxyXG4gICAgICAgICAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxyXG4gICAgICAgICAqIHRvIHN1cHBvcnQgXCIlY1wiIENTUyBjdXN0b21pemF0aW9ucy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuICAgICAgICAgIC8vIGlzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG4gICAgICAgICAgcmV0dXJuICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgfHxcbiAgICAgICAgICAvLyBpcyBmaXJlYnVnPyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zOTgxMjAvMzc2NzczXG4gICAgICAgICAgd2luZG93LmNvbnNvbGUgJiYgKGNvbnNvbGUuZmlyZWJ1ZyB8fCBjb25zb2xlLmV4Y2VwdGlvbiAmJiBjb25zb2xlLnRhYmxlKSB8fFxuICAgICAgICAgIC8vIGlzIGZpcmVmb3ggPj0gdjMxP1xuICAgICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuICAgICAgICAgIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvZmlyZWZveFxcLyhcXGQrKS8pICYmIHBhcnNlSW50KFJlZ0V4cC4kMSwgMTApID49IDMxO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTWFwICVqIHRvIGBKU09OLnN0cmluZ2lmeSgpYCwgc2luY2Ugbm8gV2ViIEluc3BlY3RvcnMgZG8gdGhhdCBieSBkZWZhdWx0LlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ29sb3JpemUgbG9nIGFyZ3VtZW50cyBpZiBlbmFibGVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBmb3JtYXRBcmdzKCkge1xuICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgIHZhciB1c2VDb2xvcnMgPSB0aGlzLnVzZUNvbG9ycztcblxuICAgICAgICAgIGFyZ3NbMF0gPSAodXNlQ29sb3JzID8gJyVjJyA6ICcnKSArIHRoaXMubmFtZXNwYWNlICsgKHVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArIGFyZ3NbMF0gKyAodXNlQ29sb3JzID8gJyVjICcgOiAnICcpICsgJysnICsgZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG4gICAgICAgICAgaWYgKCF1c2VDb2xvcnMpIHJldHVybiBhcmdzO1xuXG4gICAgICAgICAgdmFyIGMgPSAnY29sb3I6ICcgKyB0aGlzLmNvbG9yO1xuICAgICAgICAgIGFyZ3MgPSBbYXJnc1swXSwgYywgJ2NvbG9yOiBpbmhlcml0J10uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDEpKTtcblxuICAgICAgICAgIC8vIHRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG4gICAgICAgICAgLy8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuICAgICAgICAgIC8vIGZpZ3VyZSBvdXQgdGhlIGNvcnJlY3QgaW5kZXggdG8gaW5zZXJ0IHRoZSBDU1MgaW50b1xuICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgdmFyIGxhc3RDID0gMDtcbiAgICAgICAgICBhcmdzWzBdLnJlcGxhY2UoLyVbYS16JV0vZywgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAoJyUlJyA9PT0gbWF0Y2gpIHJldHVybjtcbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICBpZiAoJyVjJyA9PT0gbWF0Y2gpIHtcbiAgICAgICAgICAgICAgLy8gd2Ugb25seSBhcmUgaW50ZXJlc3RlZCBpbiB0aGUgKmxhc3QqICVjXG4gICAgICAgICAgICAgIC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG4gICAgICAgICAgICAgIGxhc3RDID0gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG4gICAgICAgICAgcmV0dXJuIGFyZ3M7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbnZva2VzIGBjb25zb2xlLmxvZygpYCB3aGVuIGF2YWlsYWJsZS5cclxuICAgICAgICAgKiBOby1vcCB3aGVuIGBjb25zb2xlLmxvZ2AgaXMgbm90IGEgXCJmdW5jdGlvblwiLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBsb2coKSB7XG4gICAgICAgICAgLy8gdGhpcyBoYWNrZXJ5IGlzIHJlcXVpcmVkIGZvciBJRTgvOSwgd2hlcmVcbiAgICAgICAgICAvLyB0aGUgYGNvbnNvbGUubG9nYCBmdW5jdGlvbiBkb2Vzbid0IGhhdmUgJ2FwcGx5J1xuICAgICAgICAgIHJldHVybiAnb2JqZWN0JyA9PT0gdHlwZW9mIGNvbnNvbGUgJiYgY29uc29sZS5sb2cgJiYgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5LmNhbGwoY29uc29sZS5sb2csIGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTYXZlIGBuYW1lc3BhY2VzYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChudWxsID09IG5hbWVzcGFjZXMpIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHBvcnRzLnN0b3JhZ2UuZGVidWcgPSBuYW1lc3BhY2VzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBMb2FkIGBuYW1lc3BhY2VzYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBsb2FkKCkge1xuICAgICAgICAgIHZhciByO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByID0gZXhwb3J0cy5zdG9yYWdlLmRlYnVnO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmFibGUgbmFtZXNwYWNlcyBsaXN0ZWQgaW4gYGxvY2FsU3RvcmFnZS5kZWJ1Z2AgaW5pdGlhbGx5LlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuZW5hYmxlKGxvYWQoKSk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTG9jYWxzdG9yYWdlIGF0dGVtcHRzIHRvIHJldHVybiB0aGUgbG9jYWxzdG9yYWdlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXHJcbiAgICAgICAgICogd2hlbiBhIHVzZXIgZGlzYWJsZXMgY29va2llcy9sb2NhbHN0b3JhZ2VcclxuICAgICAgICAgKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7TG9jYWxTdG9yYWdlfVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhbFN0b3JhZ2U7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuICAgICAgfSwgeyBcIi4vZGVidWdcIjogMTUgfV0sIDE1OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoaXMgaXMgdGhlIGNvbW1vbiBsb2dpYyBmb3IgYm90aCB0aGUgTm9kZS5qcyBhbmQgd2ViIGJyb3dzZXJcclxuICAgICAgICAgKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogRXhwb3NlIGBkZWJ1ZygpYCBhcyB0aGUgbW9kdWxlLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGRlYnVnO1xuICAgICAgICBleHBvcnRzLmNvZXJjZSA9IGNvZXJjZTtcbiAgICAgICAgZXhwb3J0cy5kaXNhYmxlID0gZGlzYWJsZTtcbiAgICAgICAgZXhwb3J0cy5lbmFibGUgPSBlbmFibGU7XG4gICAgICAgIGV4cG9ydHMuZW5hYmxlZCA9IGVuYWJsZWQ7XG4gICAgICAgIGV4cG9ydHMuaHVtYW5pemUgPSBfZGVyZXFfKCdtcycpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFRoZSBjdXJyZW50bHkgYWN0aXZlIGRlYnVnIG1vZGUgbmFtZXMsIGFuZCBuYW1lcyB0byBza2lwLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMubmFtZXMgPSBbXTtcbiAgICAgICAgZXhwb3J0cy5za2lwcyA9IFtdO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyY2FzZWQgbGV0dGVyLCBpLmUuIFwiblwiLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuZm9ybWF0dGVycyA9IHt9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFByZXZpb3VzbHkgYXNzaWduZWQgY29sb3IuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHByZXZDb2xvciA9IDA7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJldmlvdXMgbG9nIHRpbWVzdGFtcC5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgcHJldlRpbWU7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VsZWN0IGEgY29sb3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gc2VsZWN0Q29sb3IoKSB7XG4gICAgICAgICAgcmV0dXJuIGV4cG9ydHMuY29sb3JzW3ByZXZDb2xvcisrICUgZXhwb3J0cy5jb2xvcnMubGVuZ3RoXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxyXG4gICAgICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZGVidWcobmFtZXNwYWNlKSB7XG5cbiAgICAgICAgICAvLyBkZWZpbmUgdGhlIGBkaXNhYmxlZGAgdmVyc2lvblxuICAgICAgICAgIGZ1bmN0aW9uIGRpc2FibGVkKCkge31cbiAgICAgICAgICBkaXNhYmxlZC5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAvLyBkZWZpbmUgdGhlIGBlbmFibGVkYCB2ZXJzaW9uXG4gICAgICAgICAgZnVuY3Rpb24gZW5hYmxlZCgpIHtcblxuICAgICAgICAgICAgdmFyIHNlbGYgPSBlbmFibGVkO1xuXG4gICAgICAgICAgICAvLyBzZXQgYGRpZmZgIHRpbWVzdGFtcFxuICAgICAgICAgICAgdmFyIGN1cnIgPSArbmV3IERhdGUoKTtcbiAgICAgICAgICAgIHZhciBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG4gICAgICAgICAgICBzZWxmLmRpZmYgPSBtcztcbiAgICAgICAgICAgIHNlbGYucHJldiA9IHByZXZUaW1lO1xuICAgICAgICAgICAgc2VsZi5jdXJyID0gY3VycjtcbiAgICAgICAgICAgIHByZXZUaW1lID0gY3VycjtcblxuICAgICAgICAgICAgLy8gYWRkIHRoZSBgY29sb3JgIGlmIG5vdCBzZXRcbiAgICAgICAgICAgIGlmIChudWxsID09IHNlbGYudXNlQ29sb3JzKSBzZWxmLnVzZUNvbG9ycyA9IGV4cG9ydHMudXNlQ29sb3JzKCk7XG4gICAgICAgICAgICBpZiAobnVsbCA9PSBzZWxmLmNvbG9yICYmIHNlbGYudXNlQ29sb3JzKSBzZWxmLmNvbG9yID0gc2VsZWN0Q29sb3IoKTtcblxuICAgICAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuXG4gICAgICAgICAgICBhcmdzWzBdID0gZXhwb3J0cy5jb2VyY2UoYXJnc1swXSk7XG5cbiAgICAgICAgICAgIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIGFyZ3NbMF0pIHtcbiAgICAgICAgICAgICAgLy8gYW55dGhpbmcgZWxzZSBsZXQncyBpbnNwZWN0IHdpdGggJW9cbiAgICAgICAgICAgICAgYXJncyA9IFsnJW8nXS5jb25jYXQoYXJncyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG4gICAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgICAgYXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16JV0pL2csIGZ1bmN0aW9uIChtYXRjaCwgZm9ybWF0KSB7XG4gICAgICAgICAgICAgIC8vIGlmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcbiAgICAgICAgICAgICAgaWYgKG1hdGNoID09PSAnJSUnKSByZXR1cm4gbWF0Y2g7XG4gICAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgICAgIHZhciBmb3JtYXR0ZXIgPSBleHBvcnRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcbiAgICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBmb3JtYXR0ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsID0gYXJnc1tpbmRleF07XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gbm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuICAgICAgICAgICAgICAgIGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgICAgICBpbmRleC0tO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGV4cG9ydHMuZm9ybWF0QXJncykge1xuICAgICAgICAgICAgICBhcmdzID0gZXhwb3J0cy5mb3JtYXRBcmdzLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGxvZ0ZuID0gZW5hYmxlZC5sb2cgfHwgZXhwb3J0cy5sb2cgfHwgY29uc29sZS5sb2cuYmluZChjb25zb2xlKTtcbiAgICAgICAgICAgIGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbmFibGVkLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgdmFyIGZuID0gZXhwb3J0cy5lbmFibGVkKG5hbWVzcGFjZSkgPyBlbmFibGVkIDogZGlzYWJsZWQ7XG5cbiAgICAgICAgICBmbi5uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cbiAgICAgICAgICByZXR1cm4gZm47XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmFibGVzIGEgZGVidWcgbW9kZSBieSBuYW1lc3BhY2VzLiBUaGlzIGNhbiBpbmNsdWRlIG1vZGVzXHJcbiAgICAgICAgICogc2VwYXJhdGVkIGJ5IGEgY29sb24gYW5kIHdpbGRjYXJkcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuICAgICAgICAgIGV4cG9ydHMuc2F2ZShuYW1lc3BhY2VzKTtcblxuICAgICAgICAgIHZhciBzcGxpdCA9IChuYW1lc3BhY2VzIHx8ICcnKS5zcGxpdCgvW1xccyxdKy8pO1xuICAgICAgICAgIHZhciBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXNwbGl0W2ldKSBjb250aW51ZTsgLy8gaWdub3JlIGVtcHR5IHN0cmluZ3NcbiAgICAgICAgICAgIG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuICAgICAgICAgICAgaWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuICAgICAgICAgICAgICBleHBvcnRzLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnN1YnN0cigxKSArICckJykpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhwb3J0cy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERpc2FibGUgZGVidWcgb3V0cHV0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgICAgIGV4cG9ydHMuZW5hYmxlKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGVuYWJsZWQobmFtZSkge1xuICAgICAgICAgIHZhciBpLCBsZW47XG4gICAgICAgICAgZm9yIChpID0gMCwgbGVuID0gZXhwb3J0cy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGV4cG9ydHMuc2tpcHNbaV0udGVzdChuYW1lKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGV4cG9ydHMubmFtZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChleHBvcnRzLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENvZXJjZSBgdmFsYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxyXG4gICAgICAgICAqIEByZXR1cm4ge01peGVkfVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGNvZXJjZSh2YWwpIHtcbiAgICAgICAgICBpZiAodmFsIGluc3RhbmNlb2YgRXJyb3IpIHJldHVybiB2YWwuc3RhY2sgfHwgdmFsLm1lc3NhZ2U7XG4gICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgfVxuICAgICAgfSwgeyBcIm1zXCI6IDM1IH1dLCAxNjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IF9kZXJlcV8oJy4vbGliLycpO1xuICAgICAgfSwgeyBcIi4vbGliL1wiOiAxNyB9XSwgMTc6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBfZGVyZXFfKCcuL3NvY2tldCcpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4cG9ydHMgcGFyc2VyXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICovXG4gICAgICAgIG1vZHVsZS5leHBvcnRzLnBhcnNlciA9IF9kZXJlcV8oJ2VuZ2luZS5pby1wYXJzZXInKTtcbiAgICAgIH0sIHsgXCIuL3NvY2tldFwiOiAxOCwgXCJlbmdpbmUuaW8tcGFyc2VyXCI6IDI3IH1dLCAxODogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciB0cmFuc3BvcnRzID0gX2RlcmVxXygnLi90cmFuc3BvcnRzJyk7XG4gICAgICAgICAgdmFyIEVtaXR0ZXIgPSBfZGVyZXFfKCdjb21wb25lbnQtZW1pdHRlcicpO1xuICAgICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6c29ja2V0Jyk7XG4gICAgICAgICAgdmFyIGluZGV4ID0gX2RlcmVxXygnaW5kZXhvZicpO1xuICAgICAgICAgIHZhciBwYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4gICAgICAgICAgdmFyIHBhcnNldXJpID0gX2RlcmVxXygncGFyc2V1cmknKTtcbiAgICAgICAgICB2YXIgcGFyc2Vqc29uID0gX2RlcmVxXygncGFyc2Vqc29uJyk7XG4gICAgICAgICAgdmFyIHBhcnNlcXMgPSBfZGVyZXFfKCdwYXJzZXFzJyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFNvY2tldDtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTm9vcCBmdW5jdGlvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gbm9vcCgpIHt9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFNvY2tldCBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gU29ja2V0KHVyaSwgb3B0cykge1xuICAgICAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFNvY2tldCkpIHJldHVybiBuZXcgU29ja2V0KHVyaSwgb3B0cyk7XG5cbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gICAgICAgICAgICBpZiAodXJpICYmICdvYmplY3QnID09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgICAgdXJpID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHVyaSkge1xuICAgICAgICAgICAgICB1cmkgPSBwYXJzZXVyaSh1cmkpO1xuICAgICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICAgIG9wdHMuc2VjdXJlID0gdXJpLnByb3RvY29sID09ICdodHRwcycgfHwgdXJpLnByb3RvY29sID09ICd3c3MnO1xuICAgICAgICAgICAgICBvcHRzLnBvcnQgPSB1cmkucG9ydDtcbiAgICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSkgb3B0cy5xdWVyeSA9IHVyaS5xdWVyeTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZXVyaShvcHRzLmhvc3QpLmhvc3Q7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2VjdXJlID0gbnVsbCAhPSBvcHRzLnNlY3VyZSA/IG9wdHMuc2VjdXJlIDogZ2xvYmFsLmxvY2F0aW9uICYmICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KSB7XG4gICAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgICAgb3B0cy5wb3J0ID0gdGhpcy5zZWN1cmUgPyAnNDQzJyA6ICc4MCc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWdlbnQgPSBvcHRzLmFnZW50IHx8IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWUgfHwgKGdsb2JhbC5sb2NhdGlvbiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogJ2xvY2FsaG9zdCcpO1xuICAgICAgICAgICAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0IHx8IChnbG9iYWwubG9jYXRpb24gJiYgbG9jYXRpb24ucG9ydCA/IGxvY2F0aW9uLnBvcnQgOiB0aGlzLnNlY3VyZSA/IDQ0MyA6IDgwKTtcbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSBvcHRzLnF1ZXJ5IHx8IHt9O1xuICAgICAgICAgICAgaWYgKCdzdHJpbmcnID09IHR5cGVvZiB0aGlzLnF1ZXJ5KSB0aGlzLnF1ZXJ5ID0gcGFyc2Vxcy5kZWNvZGUodGhpcy5xdWVyeSk7XG4gICAgICAgICAgICB0aGlzLnVwZ3JhZGUgPSBmYWxzZSAhPT0gb3B0cy51cGdyYWRlO1xuICAgICAgICAgICAgdGhpcy5wYXRoID0gKG9wdHMucGF0aCB8fCAnL2VuZ2luZS5pbycpLnJlcGxhY2UoL1xcLyQvLCAnJykgKyAnLyc7XG4gICAgICAgICAgICB0aGlzLmZvcmNlSlNPTlAgPSAhIW9wdHMuZm9yY2VKU09OUDtcbiAgICAgICAgICAgIHRoaXMuanNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcbiAgICAgICAgICAgIHRoaXMuZm9yY2VCYXNlNjQgPSAhIW9wdHMuZm9yY2VCYXNlNjQ7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZXNYRFIgPSAhIW9wdHMuZW5hYmxlc1hEUjtcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wUGFyYW0gPSBvcHRzLnRpbWVzdGFtcFBhcmFtIHx8ICd0JztcbiAgICAgICAgICAgIHRoaXMudGltZXN0YW1wUmVxdWVzdHMgPSBvcHRzLnRpbWVzdGFtcFJlcXVlc3RzO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzID0gb3B0cy50cmFuc3BvcnRzIHx8IFsncG9sbGluZycsICd3ZWJzb2NrZXQnXTtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICcnO1xuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5wb2xpY3lQb3J0ID0gb3B0cy5wb2xpY3lQb3J0IHx8IDg0MztcbiAgICAgICAgICAgIHRoaXMucmVtZW1iZXJVcGdyYWRlID0gb3B0cy5yZW1lbWJlclVwZ3JhZGUgfHwgZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmJpbmFyeVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5vbmx5QmluYXJ5VXBncmFkZXMgPSBvcHRzLm9ubHlCaW5hcnlVcGdyYWRlcztcbiAgICAgICAgICAgIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSBmYWxzZSAhPT0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZSA/IG9wdHMucGVyTWVzc2FnZURlZmxhdGUgfHwge30gOiBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKHRydWUgPT09IHRoaXMucGVyTWVzc2FnZURlZmxhdGUpIHRoaXMucGVyTWVzc2FnZURlZmxhdGUgPSB7fTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlck1lc3NhZ2VEZWZsYXRlICYmIG51bGwgPT0gdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZS50aHJlc2hvbGQgPSAxMDI0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICAgIHRoaXMucGZ4ID0gb3B0cy5wZnggfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMua2V5ID0gb3B0cy5rZXkgfHwgbnVsbDtcbiAgICAgICAgICAgIHRoaXMucGFzc3BocmFzZSA9IG9wdHMucGFzc3BocmFzZSB8fCBudWxsO1xuICAgICAgICAgICAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0IHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLmNhID0gb3B0cy5jYSB8fCBudWxsO1xuICAgICAgICAgICAgdGhpcy5jaXBoZXJzID0gb3B0cy5jaXBoZXJzIHx8IG51bGw7XG4gICAgICAgICAgICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkID09PSB1bmRlZmluZWQgPyB0cnVlIDogb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgICAgICAgICAgIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgICB2YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsO1xuICAgICAgICAgICAgaWYgKGZyZWVHbG9iYWwuZ2xvYmFsID09PSBmcmVlR2xvYmFsKSB7XG4gICAgICAgICAgICAgIGlmIChvcHRzLmV4dHJhSGVhZGVycyAmJiBPYmplY3Qua2V5cyhvcHRzLmV4dHJhSGVhZGVycykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZXh0cmFIZWFkZXJzID0gb3B0cy5leHRyYUhlYWRlcnM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNaXggaW4gYEVtaXR0ZXJgLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBFbWl0dGVyKFNvY2tldC5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBQcm90b2NvbCB2ZXJzaW9uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b2NvbCA9IHBhcnNlci5wcm90b2NvbDsgLy8gdGhpcyBpcyBhbiBpbnRcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRXhwb3NlIGRlcHMgZm9yIGxlZ2FjeSBjb21wYXRpYmlsaXR5XHJcbiAgICAgICAgICAgKiBhbmQgc3RhbmRhbG9uZSBicm93c2VyIGFjY2Vzcy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LlNvY2tldCA9IFNvY2tldDtcbiAgICAgICAgICBTb2NrZXQuVHJhbnNwb3J0ID0gX2RlcmVxXygnLi90cmFuc3BvcnQnKTtcbiAgICAgICAgICBTb2NrZXQudHJhbnNwb3J0cyA9IF9kZXJlcV8oJy4vdHJhbnNwb3J0cycpO1xuICAgICAgICAgIFNvY2tldC5wYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0cmFuc3BvcnQgbmFtZVxyXG4gICAgICAgICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuY3JlYXRlVHJhbnNwb3J0ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGRlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBjbG9uZSh0aGlzLnF1ZXJ5KTtcblxuICAgICAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgICAgICBxdWVyeS5FSU8gPSBwYXJzZXIucHJvdG9jb2w7XG5cbiAgICAgICAgICAgIC8vIHRyYW5zcG9ydCBuYW1lXG4gICAgICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuXG4gICAgICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgICAgIGlmICh0aGlzLmlkKSBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuXG4gICAgICAgICAgICB2YXIgdHJhbnNwb3J0ID0gbmV3IHRyYW5zcG9ydHNbbmFtZV0oe1xuICAgICAgICAgICAgICBhZ2VudDogdGhpcy5hZ2VudCxcbiAgICAgICAgICAgICAgaG9zdG5hbWU6IHRoaXMuaG9zdG5hbWUsXG4gICAgICAgICAgICAgIHBvcnQ6IHRoaXMucG9ydCxcbiAgICAgICAgICAgICAgc2VjdXJlOiB0aGlzLnNlY3VyZSxcbiAgICAgICAgICAgICAgcGF0aDogdGhpcy5wYXRoLFxuICAgICAgICAgICAgICBxdWVyeTogcXVlcnksXG4gICAgICAgICAgICAgIGZvcmNlSlNPTlA6IHRoaXMuZm9yY2VKU09OUCxcbiAgICAgICAgICAgICAganNvbnA6IHRoaXMuanNvbnAsXG4gICAgICAgICAgICAgIGZvcmNlQmFzZTY0OiB0aGlzLmZvcmNlQmFzZTY0LFxuICAgICAgICAgICAgICBlbmFibGVzWERSOiB0aGlzLmVuYWJsZXNYRFIsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcFJlcXVlc3RzOiB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzLFxuICAgICAgICAgICAgICB0aW1lc3RhbXBQYXJhbTogdGhpcy50aW1lc3RhbXBQYXJhbSxcbiAgICAgICAgICAgICAgcG9saWN5UG9ydDogdGhpcy5wb2xpY3lQb3J0LFxuICAgICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICAgIHBmeDogdGhpcy5wZngsXG4gICAgICAgICAgICAgIGtleTogdGhpcy5rZXksXG4gICAgICAgICAgICAgIHBhc3NwaHJhc2U6IHRoaXMucGFzc3BocmFzZSxcbiAgICAgICAgICAgICAgY2VydDogdGhpcy5jZXJ0LFxuICAgICAgICAgICAgICBjYTogdGhpcy5jYSxcbiAgICAgICAgICAgICAgY2lwaGVyczogdGhpcy5jaXBoZXJzLFxuICAgICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRoaXMucmVqZWN0VW5hdXRob3JpemVkLFxuICAgICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZTogdGhpcy5wZXJNZXNzYWdlRGVmbGF0ZSxcbiAgICAgICAgICAgICAgZXh0cmFIZWFkZXJzOiB0aGlzLmV4dHJhSGVhZGVyc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB0cmFuc3BvcnQ7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICAgICAgICAgICAgdmFyIG8gPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBvW2ldID0gb2JqW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEluaXRpYWxpemVzIHRyYW5zcG9ydCB0byB1c2UgYW5kIHN0YXJ0cyBwcm9iZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc3BvcnQ7XG4gICAgICAgICAgICBpZiAodGhpcy5yZW1lbWJlclVwZ3JhZGUgJiYgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJiB0aGlzLnRyYW5zcG9ydHMuaW5kZXhPZignd2Vic29ja2V0JykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gJ3dlYnNvY2tldCc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKDAgPT09IHRoaXMudHJhbnNwb3J0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0KCdlcnJvcicsICdObyB0cmFuc3BvcnRzIGF2YWlsYWJsZScpO1xuICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy50cmFuc3BvcnRzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ29wZW5pbmcnO1xuXG4gICAgICAgICAgICAvLyBSZXRyeSB3aXRoIHRoZSBuZXh0IHRyYW5zcG9ydCBpZiB0aGUgdHJhbnNwb3J0IGlzIGRpc2FibGVkIChqc29ucDogZmFsc2UpXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQuIERpc2FibGVzIHRoZSBleGlzdGluZyBvbmUgKGlmIGFueSkuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuc2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKHRyYW5zcG9ydCkge1xuICAgICAgICAgICAgZGVidWcoJ3NldHRpbmcgdHJhbnNwb3J0ICVzJywgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ2NsZWFyaW5nIGV4aXN0aW5nIHRyYW5zcG9ydCAlcycsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG5cbiAgICAgICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gICAgICAgICAgICB0cmFuc3BvcnQub24oJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLm9uRHJhaW4oKTtcbiAgICAgICAgICAgIH0pLm9uKCdwYWNrZXQnLCBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgICAgIH0pLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICAgICAgICAgIH0pLm9uKCdjbG9zZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkNsb3NlKCd0cmFuc3BvcnQgY2xvc2UnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFByb2JlcyBhIHRyYW5zcG9ydC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHJhbnNwb3J0IG5hbWVcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLnByb2JlID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgICAgICAgICAgIHZhciB0cmFuc3BvcnQgPSB0aGlzLmNyZWF0ZVRyYW5zcG9ydChuYW1lLCB7IHByb2JlOiAxIH0pLFxuICAgICAgICAgICAgICAgIGZhaWxlZCA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0T3BlbigpIHtcbiAgICAgICAgICAgICAgaWYgKHNlbGYub25seUJpbmFyeVVwZ3JhZGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHVwZ3JhZGVMb3Nlc0JpbmFyeSA9ICF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmIHNlbGYudHJhbnNwb3J0LnN1cHBvcnRzQmluYXJ5O1xuICAgICAgICAgICAgICAgIGZhaWxlZCA9IGZhaWxlZCB8fCB1cGdyYWRlTG9zZXNCaW5hcnk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiAncGluZycsIGRhdGE6ICdwcm9iZScgfV0pO1xuICAgICAgICAgICAgICB0cmFuc3BvcnQub25jZSgncGFja2V0JywgZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGlmIChmYWlsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoJ3BvbmcnID09IG1zZy50eXBlICYmICdwcm9iZScgPT0gbXNnLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIHBvbmcnLCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgIHNlbGYudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHNlbGYuZW1pdCgndXBncmFkaW5nJywgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNwb3J0KSByZXR1cm47XG4gICAgICAgICAgICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gJ3dlYnNvY2tldCcgPT0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgICAgICAgICAgIGRlYnVnKCdwYXVzaW5nIGN1cnJlbnQgdHJhbnNwb3J0IFwiJXNcIicsIHNlbGYudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc3BvcnQucGF1c2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmICgnY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ2NoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcblxuICAgICAgICAgICAgICAgICAgICBzZWxmLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiAndXBncmFkZScgfV0pO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGUnLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgICB2YXIgZXJyID0gbmV3IEVycm9yKCdwcm9iZSBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgICAgICAgc2VsZi5lbWl0KCd1cGdyYWRlRXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCgpIHtcbiAgICAgICAgICAgICAgaWYgKGZhaWxlZCkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgIC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuICAgICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgIGNsZWFudXAoKTtcblxuICAgICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9IYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gICAgICAgICAgICBmdW5jdGlvbiBvbmVycm9yKGVycikge1xuICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoJ3Byb2JlIGVycm9yOiAnICsgZXJyKTtcbiAgICAgICAgICAgICAgZXJyb3IudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG5cbiAgICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG5cbiAgICAgICAgICAgICAgZGVidWcoJ3Byb2JlIHRyYW5zcG9ydCBcIiVzXCIgZmFpbGVkIGJlY2F1c2Ugb2YgZXJyb3I6ICVzJywgbmFtZSwgZXJyKTtcblxuICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3VwZ3JhZGVFcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gb25UcmFuc3BvcnRDbG9zZSgpIHtcbiAgICAgICAgICAgICAgb25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgICAgICBmdW5jdGlvbiBvbmNsb3NlKCkge1xuICAgICAgICAgICAgICBvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9XaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICAgICAgZnVuY3Rpb24gb251cGdyYWRlKHRvKSB7XG4gICAgICAgICAgICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdcIiVzXCIgd29ya3MgLSBhYm9ydGluZyBcIiVzXCInLCB0by5uYW1lLCB0cmFuc3BvcnQubmFtZSk7XG4gICAgICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9SZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY2xvc2UnLCBvbmNsb3NlKTtcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcigndXBncmFkaW5nJywgb251cGdyYWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoJ29wZW4nLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoJ2Vycm9yJywgb25lcnJvcik7XG4gICAgICAgICAgICB0cmFuc3BvcnQub25jZSgnY2xvc2UnLCBvblRyYW5zcG9ydENsb3NlKTtcblxuICAgICAgICAgICAgdGhpcy5vbmNlKCdjbG9zZScsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCd1cGdyYWRpbmcnLCBvbnVwZ3JhZGUpO1xuXG4gICAgICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkZWJ1Zygnc29ja2V0IG9wZW4nKTtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuJztcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSAnd2Vic29ja2V0JyA9PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG5cbiAgICAgICAgICAgIC8vIHdlIGNoZWNrIGZvciBgcmVhZHlTdGF0ZWAgaW4gY2FzZSBhbiBgb3BlbmBcbiAgICAgICAgICAgIC8vIGxpc3RlbmVyIGFscmVhZHkgY2xvc2VkIHRoZSBzb2NrZXRcbiAgICAgICAgICAgIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMudXBncmFkZSAmJiB0aGlzLnRyYW5zcG9ydC5wYXVzZSkge1xuICAgICAgICAgICAgICBkZWJ1Zygnc3RhcnRpbmcgdXBncmFkZSBwcm9iZXMnKTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJvYmUodGhpcy51cGdyYWRlc1tpXSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgICAgaWYgKCdvcGVuaW5nJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ29wZW4nID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICBkZWJ1Zygnc29ja2V0IHJlY2VpdmU6IHR5cGUgXCIlc1wiLCBkYXRhIFwiJXNcIicsIHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuXG4gICAgICAgICAgICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCdoZWFydGJlYXQnKTtcblxuICAgICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnb3Blbic6XG4gICAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZHNoYWtlKHBhcnNlanNvbihwYWNrZXQuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwb25nJzpcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UGluZygpO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdwb25nJyk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ3NlcnZlciBlcnJvcicpO1xuICAgICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbWVzc2FnZScsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWJ1ZygncGFja2V0IHJlY2VpdmVkIHdpdGggc29ja2V0IHJlYWR5U3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gaGFuZHNoYWtlIG9ialxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub25IYW5kc2hha2UgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdoYW5kc2hha2UnLCBkYXRhKTtcbiAgICAgICAgICAgIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICAgICAgdGhpcy51cGdyYWRlcyA9IHRoaXMuZmlsdGVyVXBncmFkZXMoZGF0YS51cGdyYWRlcyk7XG4gICAgICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICAgICAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICAgICAgaWYgKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5zZXRQaW5nKCk7XG5cbiAgICAgICAgICAgIC8vIFByb2xvbmcgbGl2ZW5lc3Mgb2Ygc29ja2V0IG9uIGhlYXJ0YmVhdFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignaGVhcnRiZWF0JywgdGhpcy5vbkhlYXJ0YmVhdCk7XG4gICAgICAgICAgICB0aGlzLm9uKCdoZWFydGJlYXQnLCB0aGlzLm9uSGVhcnRiZWF0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBSZXNldHMgcGluZyB0aW1lb3V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLm9uSGVhcnRiZWF0ID0gZnVuY3Rpb24gKHRpbWVvdXQpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgc2VsZi5waW5nVGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmICgnY2xvc2VkJyA9PSBzZWxmLnJlYWR5U3RhdGUpIHJldHVybjtcbiAgICAgICAgICAgICAgc2VsZi5vbkNsb3NlKCdwaW5nIHRpbWVvdXQnKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQgfHwgc2VsZi5waW5nSW50ZXJ2YWwgKyBzZWxmLnBpbmdUaW1lb3V0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBQaW5ncyBzZXJ2ZXIgZXZlcnkgYHRoaXMucGluZ0ludGVydmFsYCBhbmQgZXhwZWN0cyByZXNwb25zZVxyXG4gICAgICAgICAgICogd2l0aGluIGB0aGlzLnBpbmdUaW1lb3V0YCBvciBjbG9zZXMgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5zZXRQaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYucGluZ0ludGVydmFsVGltZXIpO1xuICAgICAgICAgICAgc2VsZi5waW5nSW50ZXJ2YWxUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBkZWJ1Zygnd3JpdGluZyBwaW5nIHBhY2tldCAtIGV4cGVjdGluZyBwb25nIHdpdGhpbiAlc21zJywgc2VsZi5waW5nVGltZW91dCk7XG4gICAgICAgICAgICAgIHNlbGYucGluZygpO1xuICAgICAgICAgICAgICBzZWxmLm9uSGVhcnRiZWF0KHNlbGYucGluZ1RpbWVvdXQpO1xuICAgICAgICAgICAgfSwgc2VsZi5waW5nSW50ZXJ2YWwpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICogU2VuZHMgYSBwaW5nIHBhY2tldC5cclxuICAgICAgICAgICpcclxuICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5waW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5zZW5kUGFja2V0KCdwaW5nJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLmVtaXQoJ3BpbmcnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub25EcmFpbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIuc3BsaWNlKDAsIHRoaXMucHJldkJ1ZmZlckxlbik7XG5cbiAgICAgICAgICAgIC8vIHNldHRpbmcgcHJldkJ1ZmZlckxlbiA9IDAgaXMgdmVyeSBpbXBvcnRhbnRcbiAgICAgICAgICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgICAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG5cbiAgICAgICAgICAgIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2RyYWluJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5mbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgnY2xvc2VkJyAhPSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiYgIXRoaXMudXBncmFkaW5nICYmIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGRlYnVnKCdmbHVzaGluZyAlZCBwYWNrZXRzIGluIHNvY2tldCcsIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuc2VuZCh0aGlzLndyaXRlQnVmZmVyKTtcbiAgICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgICAgdGhpcy5wcmV2QnVmZmVyTGVuID0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgnZmx1c2gnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTZW5kcyBhIG1lc3NhZ2UuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBmdW5jdGlvbi5cclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxyXG4gICAgICAgICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBTb2NrZXQucHJvdG90eXBlLndyaXRlID0gU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFBhY2tldCgnbWVzc2FnZScsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU2VuZHMgYSBwYWNrZXQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEuXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cclxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuc2VuZFBhY2tldCA9IGZ1bmN0aW9uICh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgICBkYXRhID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgICBmbiA9IG9wdGlvbnM7XG4gICAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJ2Nsb3NpbmcnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnY2xvc2VkJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcblxuICAgICAgICAgICAgdmFyIHBhY2tldCA9IHtcbiAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncGFja2V0Q3JlYXRlJywgcGFja2V0KTtcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIucHVzaChwYWNrZXQpO1xuICAgICAgICAgICAgaWYgKGZuKSB0aGlzLm9uY2UoJ2ZsdXNoJywgZm4pO1xuICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJ2Nsb3NpbmcnO1xuXG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgICBpZiAodGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uY2UoJ2RyYWluJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudXBncmFkaW5nKSB7XG4gICAgICAgICAgICAgICAgd2FpdEZvclVwZ3JhZGUoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgICBzZWxmLm9uQ2xvc2UoJ2ZvcmNlZCBjbG9zZScpO1xuICAgICAgICAgICAgICBkZWJ1Zygnc29ja2V0IGNsb3NpbmcgLSB0ZWxsaW5nIHRyYW5zcG9ydCB0byBjbG9zZScpO1xuICAgICAgICAgICAgICBzZWxmLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjbGVhbnVwQW5kQ2xvc2UoKSB7XG4gICAgICAgICAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ3VwZ3JhZGUnLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiB3YWl0Rm9yVXBncmFkZSgpIHtcbiAgICAgICAgICAgICAgLy8gd2FpdCBmb3IgdXBncmFkZSB0byBmaW5pc2ggc2luY2Ugd2UgY2FuJ3Qgc2VuZCBwYWNrZXRzIHdoaWxlIHBhdXNpbmcgYSB0cmFuc3BvcnRcbiAgICAgICAgICAgICAgc2VsZi5vbmNlKCd1cGdyYWRlJywgY2xlYW51cEFuZENsb3NlKTtcbiAgICAgICAgICAgICAgc2VsZi5vbmNlKCd1cGdyYWRlRXJyb3InLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgU29ja2V0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgZGVidWcoJ3NvY2tldCBlcnJvciAlaicsIGVycik7XG4gICAgICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgndHJhbnNwb3J0IGVycm9yJywgZXJyKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uIChyZWFzb24sIGRlc2MpIHtcbiAgICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUgfHwgJ2Nsb3NpbmcnID09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICBkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLCByZWFzb24pO1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJzXG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnBpbmdJbnRlcnZhbFRpbWVyKTtcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG5cbiAgICAgICAgICAgICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygnY2xvc2UnKTtcblxuICAgICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuXG4gICAgICAgICAgICAgIC8vIHNldCByZWFkeSBzdGF0ZVxuICAgICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnY2xvc2VkJztcblxuICAgICAgICAgICAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgICAgICAgICAgIHRoaXMuaWQgPSBudWxsO1xuXG4gICAgICAgICAgICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICAgICAgICAgICAgdGhpcy5lbWl0KCdjbG9zZScsIHJlYXNvbiwgZGVzYyk7XG5cbiAgICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgICAgICAgICAgICBzZWxmLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgICAgICAgIHNlbGYucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gc2VydmVyIHVwZ3JhZGVzXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFNvY2tldC5wcm90b3R5cGUuZmlsdGVyVXBncmFkZXMgPSBmdW5jdGlvbiAodXBncmFkZXMpIHtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgaiA9IHVwZ3JhZGVzLmxlbmd0aDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgICBpZiAofmluZGV4KHRoaXMudHJhbnNwb3J0cywgdXBncmFkZXNbaV0pKSBmaWx0ZXJlZFVwZ3JhZGVzLnB1c2godXBncmFkZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCIuL3RyYW5zcG9ydFwiOiAxOSwgXCIuL3RyYW5zcG9ydHNcIjogMjAsIFwiY29tcG9uZW50LWVtaXR0ZXJcIjogMjYsIFwiZGVidWdcIjogMTQsIFwiZW5naW5lLmlvLXBhcnNlclwiOiAyNywgXCJpbmRleG9mXCI6IDMyLCBcInBhcnNlanNvblwiOiAzNiwgXCJwYXJzZXFzXCI6IDM3LCBcInBhcnNldXJpXCI6IDM4IH1dLCAxOTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO1xuICAgICAgICB2YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBUcmFuc3BvcnQ7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNwb3J0IGFic3RyYWN0IGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gVHJhbnNwb3J0KG9wdHMpIHtcbiAgICAgICAgICB0aGlzLnBhdGggPSBvcHRzLnBhdGg7XG4gICAgICAgICAgdGhpcy5ob3N0bmFtZSA9IG9wdHMuaG9zdG5hbWU7XG4gICAgICAgICAgdGhpcy5wb3J0ID0gb3B0cy5wb3J0O1xuICAgICAgICAgIHRoaXMuc2VjdXJlID0gb3B0cy5zZWN1cmU7XG4gICAgICAgICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gICAgICAgICAgdGhpcy50aW1lc3RhbXBQYXJhbSA9IG9wdHMudGltZXN0YW1wUGFyYW07XG4gICAgICAgICAgdGhpcy50aW1lc3RhbXBSZXF1ZXN0cyA9IG9wdHMudGltZXN0YW1wUmVxdWVzdHM7XG4gICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gJyc7XG4gICAgICAgICAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQgfHwgZmFsc2U7XG4gICAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICAgICAgICB0aGlzLmVuYWJsZXNYRFIgPSBvcHRzLmVuYWJsZXNYRFI7XG5cbiAgICAgICAgICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICB0aGlzLnBmeCA9IG9wdHMucGZ4O1xuICAgICAgICAgIHRoaXMua2V5ID0gb3B0cy5rZXk7XG4gICAgICAgICAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICAgICAgICAgIHRoaXMuY2VydCA9IG9wdHMuY2VydDtcbiAgICAgICAgICB0aGlzLmNhID0gb3B0cy5jYTtcbiAgICAgICAgICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gICAgICAgICAgdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQgPSBvcHRzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAgICAgICAgIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlcihUcmFuc3BvcnQucHJvdG90eXBlKTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbWl0cyBhbiBlcnJvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcclxuICAgICAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9IGZvciBjaGFpbmluZ1xyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKG1zZywgZGVzYykge1xuICAgICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IobXNnKTtcbiAgICAgICAgICBlcnIudHlwZSA9ICdUcmFuc3BvcnRFcnJvcic7XG4gICAgICAgICAgZXJyLmRlc2NyaXB0aW9uID0gZGVzYztcbiAgICAgICAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCdjbG9zZWQnID09IHRoaXMucmVhZHlTdGF0ZSB8fCAnJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdvcGVuaW5nJztcbiAgICAgICAgICAgIHRoaXMuZG9PcGVuKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBUcmFuc3BvcnQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gdGhpcy5yZWFkeVN0YXRlIHx8ICdvcGVuJyA9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBUcmFuc3BvcnQucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICAgICAgICAgIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RyYW5zcG9ydCBub3Qgb3BlbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBUcmFuc3BvcnQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSAnb3Blbic7XG4gICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgdGhpcy5lbWl0KCdvcGVuJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdpdGggZGF0YS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIHZhciBwYWNrZXQgPSBwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICAgIHRoaXMub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgdGhpcy5lbWl0KCdwYWNrZXQnLCBwYWNrZXQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdjbG9zZWQnO1xuICAgICAgICAgIHRoaXMuZW1pdCgnY2xvc2UnKTtcbiAgICAgICAgfTtcbiAgICAgIH0sIHsgXCJjb21wb25lbnQtZW1pdHRlclwiOiAyNiwgXCJlbmdpbmUuaW8tcGFyc2VyXCI6IDI3IH1dLCAyMDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSBkZXBlbmRlbmNpZXNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gX2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gICAgICAgICAgdmFyIFhIUiA9IF9kZXJlcV8oJy4vcG9sbGluZy14aHInKTtcbiAgICAgICAgICB2YXIgSlNPTlAgPSBfZGVyZXFfKCcuL3BvbGxpbmctanNvbnAnKTtcbiAgICAgICAgICB2YXIgd2Vic29ja2V0ID0gX2RlcmVxXygnLi93ZWJzb2NrZXQnKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRXhwb3J0IHRyYW5zcG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMucG9sbGluZyA9IHBvbGxpbmc7XG4gICAgICAgICAgZXhwb3J0cy53ZWJzb2NrZXQgPSB3ZWJzb2NrZXQ7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFBvbGxpbmcgdHJhbnNwb3J0IHBvbHltb3JwaGljIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICogRGVjaWRlcyBvbiB4aHIgdnMganNvbnAgYmFzZWQgb24gZmVhdHVyZSBkZXRlY3Rpb24uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIHBvbGxpbmcob3B0cykge1xuICAgICAgICAgICAgdmFyIHhocjtcbiAgICAgICAgICAgIHZhciB4ZCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHhzID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIganNvbnAgPSBmYWxzZSAhPT0gb3B0cy5qc29ucDtcblxuICAgICAgICAgICAgaWYgKGdsb2JhbC5sb2NhdGlvbikge1xuICAgICAgICAgICAgICB2YXIgaXNTU0wgPSAnaHR0cHM6JyA9PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgICAgdmFyIHBvcnQgPSBsb2NhdGlvbi5wb3J0O1xuXG4gICAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgICAgaWYgKCFwb3J0KSB7XG4gICAgICAgICAgICAgICAgcG9ydCA9IGlzU1NMID8gNDQzIDogODA7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB4ZCA9IG9wdHMuaG9zdG5hbWUgIT0gbG9jYXRpb24uaG9zdG5hbWUgfHwgcG9ydCAhPSBvcHRzLnBvcnQ7XG4gICAgICAgICAgICAgIHhzID0gb3B0cy5zZWN1cmUgIT0gaXNTU0w7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG9wdHMueGRvbWFpbiA9IHhkO1xuICAgICAgICAgICAgb3B0cy54c2NoZW1lID0geHM7XG4gICAgICAgICAgICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cyk7XG5cbiAgICAgICAgICAgIGlmICgnb3BlbicgaW4geGhyICYmICFvcHRzLmZvcmNlSlNPTlApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBYSFIob3B0cyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWpzb25wKSB0aHJvdyBuZXcgRXJyb3IoJ0pTT05QIGRpc2FibGVkJyk7XG4gICAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTlAob3B0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwgeyBcIi4vcG9sbGluZy1qc29ucFwiOiAyMSwgXCIuL3BvbGxpbmcteGhyXCI6IDIyLCBcIi4vd2Vic29ja2V0XCI6IDI0LCBcInhtbGh0dHByZXF1ZXN0LXNzbFwiOiAyNSB9XSwgMjE6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1vZHVsZSByZXF1aXJlbWVudHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBQb2xsaW5nID0gX2RlcmVxXygnLi9wb2xsaW5nJyk7XG4gICAgICAgICAgdmFyIGluaGVyaXQgPSBfZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBNb2R1bGUgZXhwb3J0cy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBKU09OUFBvbGxpbmc7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgck5ld2xpbmUgPSAvXFxuL2c7XG4gICAgICAgICAgdmFyIHJFc2NhcGVkTmV3bGluZSA9IC9cXFxcbi9nO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBHbG9iYWwgSlNPTlAgY2FsbGJhY2tzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgY2FsbGJhY2tzO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsYmFja3MgY291bnQuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBpbmRleCA9IDA7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE5vb3AuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIGVtcHR5KCkge31cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSlNPTlAgUG9sbGluZyBjb25zdHJ1Y3Rvci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cy5cclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIEpTT05QUG9sbGluZyhvcHRzKSB7XG4gICAgICAgICAgICBQb2xsaW5nLmNhbGwodGhpcywgb3B0cyk7XG5cbiAgICAgICAgICAgIHRoaXMucXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuXG4gICAgICAgICAgICAvLyBkZWZpbmUgZ2xvYmFsIGNhbGxiYWNrcyBhcnJheSBpZiBub3QgcHJlc2VudFxuICAgICAgICAgICAgLy8gd2UgZG8gdGhpcyBoZXJlIChsYXppbHkpIHRvIGF2b2lkIHVubmVlZGVkIGdsb2JhbCBwb2xsdXRpb25cbiAgICAgICAgICAgIGlmICghY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gY29uc2lkZXIgbXVsdGlwbGUgZW5naW5lcyBpbiB0aGUgc2FtZSBwYWdlXG4gICAgICAgICAgICAgIGlmICghZ2xvYmFsLl9fX2VpbykgZ2xvYmFsLl9fX2VpbyA9IFtdO1xuICAgICAgICAgICAgICBjYWxsYmFja3MgPSBnbG9iYWwuX19fZWlvO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWxsYmFjayBpZGVudGlmaWVyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gY2FsbGJhY2tzLmxlbmd0aDtcblxuICAgICAgICAgICAgLy8gYWRkIGNhbGxiYWNrIHRvIGpzb25wIGdsb2JhbFxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgY2FsbGJhY2tzLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICBzZWxmLm9uRGF0YShtc2cpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0byBxdWVyeSBzdHJpbmdcbiAgICAgICAgICAgIHRoaXMucXVlcnkuaiA9IHRoaXMuaW5kZXg7XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgc3B1cmlvdXMgZXJyb3JzIGZyb20gYmVpbmcgZW1pdHRlZCB3aGVuIHRoZSB3aW5kb3cgaXMgdW5sb2FkZWRcbiAgICAgICAgICAgIGlmIChnbG9iYWwuZG9jdW1lbnQgJiYgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5zY3JpcHQpIHNlbGYuc2NyaXB0Lm9uZXJyb3IgPSBlbXB0eTtcbiAgICAgICAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSW5oZXJpdHMgZnJvbSBQb2xsaW5nLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBpbmhlcml0KEpTT05QUG9sbGluZywgUG9sbGluZyk7XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogSlNPTlAgb25seSBzdXBwb3J0cyBiaW5hcnkgYXMgYmFzZTY0IGVuY29kZWQgc3RyaW5nc1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBKU09OUFBvbGxpbmcucHJvdG90eXBlLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENsb3NlcyB0aGUgc29ja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBKU09OUFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zY3JpcHQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgICAgICAgICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICB0aGlzLmZvcm0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmZvcm0pO1xuICAgICAgICAgICAgICB0aGlzLmZvcm0gPSBudWxsO1xuICAgICAgICAgICAgICB0aGlzLmlmcmFtZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFBvbGxpbmcucHJvdG90eXBlLmRvQ2xvc2UuY2FsbCh0aGlzKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBTdGFydHMgYSBwb2xsIGN5Y2xlLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBKU09OUFBvbGxpbmcucHJvdG90eXBlLmRvUG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgICAgICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gdGhpcy51cmkoKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkVycm9yKCdqc29ucCBwb2xsIGVycm9yJywgZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICAgICAgICBpZiAoaW5zZXJ0QXQpIHtcbiAgICAgICAgICAgICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAoZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICAgICAgICAgIHZhciBpc1VBZ2Vja28gPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9nZWNrby9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgICAgICAgICAgIGlmIChpc1VBZ2Vja28pIHtcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogV3JpdGVzIHdpdGggYSBoaWRkZW4gaWZyYW1lLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmRcclxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxlZCB1cG9uIGZsdXNoLlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIEpTT05QUG9sbGluZy5wcm90b3R5cGUuZG9Xcml0ZSA9IGZ1bmN0aW9uIChkYXRhLCBmbikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgICB2YXIgZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zvcm0nKTtcbiAgICAgICAgICAgICAgdmFyIGFyZWEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZXh0YXJlYScpO1xuICAgICAgICAgICAgICB2YXIgaWQgPSB0aGlzLmlmcmFtZUlkID0gJ2Vpb19pZnJhbWVfJyArIHRoaXMuaW5kZXg7XG4gICAgICAgICAgICAgIHZhciBpZnJhbWU7XG5cbiAgICAgICAgICAgICAgZm9ybS5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuICAgICAgICAgICAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgICAgZm9ybS5zdHlsZS50b3AgPSAnLTEwMDBweCc7XG4gICAgICAgICAgICAgIGZvcm0uc3R5bGUubGVmdCA9ICctMTAwMHB4JztcbiAgICAgICAgICAgICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICAgICAgICAgICAgZm9ybS5tZXRob2QgPSAnUE9TVCc7XG4gICAgICAgICAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsICd1dGYtOCcpO1xuICAgICAgICAgICAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgICAgICAgICAgIGZvcm0uYXBwZW5kQ2hpbGQoYXJlYSk7XG4gICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgICAgICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgICAgICAgICAgdGhpcy5hcmVhID0gYXJlYTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMudXJpKCk7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICBpbml0SWZyYW1lKCk7XG4gICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGluaXRJZnJhbWUoKSB7XG4gICAgICAgICAgICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYub25FcnJvcignanNvbnAgcG9sbGluZyBpZnJhbWUgcmVtb3ZhbCBlcnJvcicsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICAgICAgICAgICAgdmFyIGh0bWwgPSAnPGlmcmFtZSBzcmM9XCJqYXZhc2NyaXB0OjBcIiBuYW1lPVwiJyArIHNlbGYuaWZyYW1lSWQgKyAnXCI+JztcbiAgICAgICAgICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGh0bWwpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgICAgICAgICAgaWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO1xuICAgICAgICAgICAgICAgIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDowJztcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmcmFtZS5pZCA9IHNlbGYuaWZyYW1lSWQ7XG5cbiAgICAgICAgICAgICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgICAgICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpbml0SWZyYW1lKCk7XG5cbiAgICAgICAgICAgIC8vIGVzY2FwZSBcXG4gdG8gcHJldmVudCBpdCBmcm9tIGJlaW5nIGNvbnZlcnRlZCBpbnRvIFxcclxcbiBieSBzb21lIFVBc1xuICAgICAgICAgICAgLy8gZG91YmxlIGVzY2FwaW5nIGlzIHJlcXVpcmVkIGZvciBlc2NhcGVkIG5ldyBsaW5lcyBiZWNhdXNlIHVuZXNjYXBpbmcgb2YgbmV3IGxpbmVzIGNhbiBiZSBkb25lIHNhZmVseSBvbiBzZXJ2ZXItc2lkZVxuICAgICAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZShyRXNjYXBlZE5ld2xpbmUsICdcXFxcXFxuJyk7XG4gICAgICAgICAgICB0aGlzLmFyZWEudmFsdWUgPSBkYXRhLnJlcGxhY2Uock5ld2xpbmUsICdcXFxcbicpO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICAgICAgICAgICAgdGhpcy5pZnJhbWUub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5pZnJhbWUub25sb2FkID0gY29tcGxldGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCIuL3BvbGxpbmdcIjogMjMsIFwiY29tcG9uZW50LWluaGVyaXRcIjogMTMgfV0sIDIyOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIHJlcXVpcmVtZW50cy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gX2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gICAgICAgICAgdmFyIFBvbGxpbmcgPSBfZGVyZXFfKCcuL3BvbGxpbmcnKTtcbiAgICAgICAgICB2YXIgRW1pdHRlciA9IF9kZXJlcV8oJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG4gICAgICAgICAgdmFyIGluaGVyaXQgPSBfZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuICAgICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZy14aHInKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gWEhSO1xuICAgICAgICAgIG1vZHVsZS5leHBvcnRzLlJlcXVlc3QgPSBSZXF1ZXN0O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBFbXB0eSBmdW5jdGlvblxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBlbXB0eSgpIHt9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBYSFIob3B0cykge1xuICAgICAgICAgICAgUG9sbGluZy5jYWxsKHRoaXMsIG9wdHMpO1xuXG4gICAgICAgICAgICBpZiAoZ2xvYmFsLmxvY2F0aW9uKSB7XG4gICAgICAgICAgICAgIHZhciBpc1NTTCA9ICdodHRwczonID09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICAgICAgICB2YXIgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG5cbiAgICAgICAgICAgICAgLy8gc29tZSB1c2VyIGFnZW50cyBoYXZlIGVtcHR5IGBsb2NhdGlvbi5wb3J0YFxuICAgICAgICAgICAgICBpZiAoIXBvcnQpIHtcbiAgICAgICAgICAgICAgICBwb3J0ID0gaXNTU0wgPyA0NDMgOiA4MDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHRoaXMueGQgPSBvcHRzLmhvc3RuYW1lICE9IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSB8fCBwb3J0ICE9IG9wdHMucG9ydDtcbiAgICAgICAgICAgICAgdGhpcy54cyA9IG9wdHMuc2VjdXJlICE9IGlzU1NMO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEluaGVyaXRzIGZyb20gUG9sbGluZy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgaW5oZXJpdChYSFIsIFBvbGxpbmcpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFhIUi5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICAgICAgb3B0cy51cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICAgICAgb3B0cy54ZCA9IHRoaXMueGQ7XG4gICAgICAgICAgICBvcHRzLnhzID0gdGhpcy54cztcbiAgICAgICAgICAgIG9wdHMuYWdlbnQgPSB0aGlzLmFnZW50IHx8IGZhbHNlO1xuICAgICAgICAgICAgb3B0cy5zdXBwb3J0c0JpbmFyeSA9IHRoaXMuc3VwcG9ydHNCaW5hcnk7XG4gICAgICAgICAgICBvcHRzLmVuYWJsZXNYRFIgPSB0aGlzLmVuYWJsZXNYRFI7XG5cbiAgICAgICAgICAgIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgICAgICAgICAgIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gICAgICAgICAgICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gICAgICAgICAgICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gICAgICAgICAgICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgICAgICAgICAgIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgICAgICAgICAgIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG5cbiAgICAgICAgICAgIC8vIG90aGVyIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgICBvcHRzLmV4dHJhSGVhZGVycyA9IHRoaXMuZXh0cmFIZWFkZXJzO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlcXVlc3Qob3B0cyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogU2VuZHMgZGF0YS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSB0byBzZW5kLlxyXG4gICAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgWEhSLnByb3RvdHlwZS5kb1dyaXRlID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gICAgICAgICAgICB2YXIgaXNCaW5hcnkgPSB0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycgJiYgZGF0YSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlcSA9IHRoaXMucmVxdWVzdCh7IG1ldGhvZDogJ1BPU1QnLCBkYXRhOiBkYXRhLCBpc0JpbmFyeTogaXNCaW5hcnkgfSk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICByZXEub24oJ3N1Y2Nlc3MnLCBmbik7XG4gICAgICAgICAgICByZXEub24oJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoJ3hociBwb3N0IGVycm9yJywgZXJyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZW5kWGhyID0gcmVxO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFhIUi5wcm90b3R5cGUuZG9Qb2xsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGVidWcoJ3hociBwb2xsJyk7XG4gICAgICAgICAgICB2YXIgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICByZXEub24oJ2RhdGEnLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICBzZWxmLm9uRGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVxLm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgc2VsZi5vbkVycm9yKCd4aHIgcG9sbCBlcnJvcicsIGVycik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucG9sbFhociA9IHJlcTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIFJlcXVlc3Qob3B0cykge1xuICAgICAgICAgICAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCAnR0VUJztcbiAgICAgICAgICAgIHRoaXMudXJpID0gb3B0cy51cmk7XG4gICAgICAgICAgICB0aGlzLnhkID0gISFvcHRzLnhkO1xuICAgICAgICAgICAgdGhpcy54cyA9ICEhb3B0cy54cztcbiAgICAgICAgICAgIHRoaXMuYXN5bmMgPSBmYWxzZSAhPT0gb3B0cy5hc3luYztcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IHVuZGVmaW5lZCAhPSBvcHRzLmRhdGEgPyBvcHRzLmRhdGEgOiBudWxsO1xuICAgICAgICAgICAgdGhpcy5hZ2VudCA9IG9wdHMuYWdlbnQ7XG4gICAgICAgICAgICB0aGlzLmlzQmluYXJ5ID0gb3B0cy5pc0JpbmFyeTtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBvcHRzLnN1cHBvcnRzQmluYXJ5O1xuICAgICAgICAgICAgdGhpcy5lbmFibGVzWERSID0gb3B0cy5lbmFibGVzWERSO1xuXG4gICAgICAgICAgICAvLyBTU0wgb3B0aW9ucyBmb3IgTm9kZS5qcyBjbGllbnRcbiAgICAgICAgICAgIHRoaXMucGZ4ID0gb3B0cy5wZng7XG4gICAgICAgICAgICB0aGlzLmtleSA9IG9wdHMua2V5O1xuICAgICAgICAgICAgdGhpcy5wYXNzcGhyYXNlID0gb3B0cy5wYXNzcGhyYXNlO1xuICAgICAgICAgICAgdGhpcy5jZXJ0ID0gb3B0cy5jZXJ0O1xuICAgICAgICAgICAgdGhpcy5jYSA9IG9wdHMuY2E7XG4gICAgICAgICAgICB0aGlzLmNpcGhlcnMgPSBvcHRzLmNpcGhlcnM7XG4gICAgICAgICAgICB0aGlzLnJlamVjdFVuYXV0aG9yaXplZCA9IG9wdHMucmVqZWN0VW5hdXRob3JpemVkO1xuXG4gICAgICAgICAgICAvLyBvdGhlciBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgdGhpcy5leHRyYUhlYWRlcnMgPSBvcHRzLmV4dHJhSGVhZGVycztcblxuICAgICAgICAgICAgdGhpcy5jcmVhdGUoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIEVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB7IGFnZW50OiB0aGlzLmFnZW50LCB4ZG9tYWluOiB0aGlzLnhkLCB4c2NoZW1lOiB0aGlzLnhzLCBlbmFibGVzWERSOiB0aGlzLmVuYWJsZXNYRFIgfTtcblxuICAgICAgICAgICAgLy8gU1NMIG9wdGlvbnMgZm9yIE5vZGUuanMgY2xpZW50XG4gICAgICAgICAgICBvcHRzLnBmeCA9IHRoaXMucGZ4O1xuICAgICAgICAgICAgb3B0cy5rZXkgPSB0aGlzLmtleTtcbiAgICAgICAgICAgIG9wdHMucGFzc3BocmFzZSA9IHRoaXMucGFzc3BocmFzZTtcbiAgICAgICAgICAgIG9wdHMuY2VydCA9IHRoaXMuY2VydDtcbiAgICAgICAgICAgIG9wdHMuY2EgPSB0aGlzLmNhO1xuICAgICAgICAgICAgb3B0cy5jaXBoZXJzID0gdGhpcy5jaXBoZXJzO1xuICAgICAgICAgICAgb3B0cy5yZWplY3RVbmF1dGhvcml6ZWQgPSB0aGlzLnJlamVjdFVuYXV0aG9yaXplZDtcblxuICAgICAgICAgICAgdmFyIHhociA9IHRoaXMueGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KG9wdHMpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBkZWJ1ZygneGhyIG9wZW4gJXM6ICVzJywgdGhpcy5tZXRob2QsIHRoaXMudXJpKTtcbiAgICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHRoaXMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmV4dHJhSGVhZGVycy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGksIHRoaXMuZXh0cmFIZWFkZXJzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgICAgaWYgKHRoaXMuc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGhhcyB0byBiZSBkb25lIGFmdGVyIG9wZW4gYmVjYXVzZSBGaXJlZm94IGlzIHN0dXBpZFxuICAgICAgICAgICAgICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTMyMTY5MDMvZ2V0LWJpbmFyeS1kYXRhLXdpdGgteG1saHR0cHJlcXVlc3QtaW4tYS1maXJlZm94LWV4dGVuc2lvblxuICAgICAgICAgICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYXJyYXlidWZmZXInO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKCdQT1NUJyA9PSB0aGlzLm1ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JpbmFyeSkge1xuICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICAgIGlmICgnd2l0aENyZWRlbnRpYWxzJyBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoNCAhPSB4aHIucmVhZHlTdGF0ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgaWYgKDIwMCA9PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT0geGhyLnN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLm9uTG9hZCgpO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbkVycm9yKHhoci5zdGF0dXMpO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgZGVidWcoJ3hociBkYXRhICVzJywgdGhpcy5kYXRhKTtcbiAgICAgICAgICAgICAgeGhyLnNlbmQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZocm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAgICAgICAgICAgLy8gb2NjdXJzLiAgVGhlcmVmb3JlLCBhbHNvLCB3ZSBjYW5ub3QgdGhyb3cgaGVyZSBhdCBhbGwuXG4gICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF0gPSB0aGlzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVzcG9uc2UuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLm9uU3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3VjY2VzcycpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2FsbGVkIGlmIHdlIGhhdmUgZGF0YS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZGF0YScsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKHRydWUpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENsZWFucyB1cCBob3VzZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUuY2xlYW51cCA9IGZ1bmN0aW9uIChmcm9tRXJyb3IpIHtcbiAgICAgICAgICAgIGlmICgndW5kZWZpbmVkJyA9PSB0eXBlb2YgdGhpcy54aHIgfHwgbnVsbCA9PT0gdGhpcy54aHIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8geG1saHR0cHJlcXVlc3RcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1hEUigpKSB7XG4gICAgICAgICAgICAgIHRoaXMueGhyLm9ubG9hZCA9IHRoaXMueGhyLm9uZXJyb3IgPSBlbXB0eTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGdsb2JhbC5kb2N1bWVudCkge1xuICAgICAgICAgICAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLmluZGV4XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCB1cG9uIGxvYWQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFJlcXVlc3QucHJvdG90eXBlLm9uTG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgdmFyIGNvbnRlbnRUeXBlO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ0NvbnRlbnQtVHlwZScpLnNwbGl0KCc7JylbMF07XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgIGlmIChjb250ZW50VHlwZSA9PT0gJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2U7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheSh0aGlzLnhoci5yZXNwb25zZSkpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdWk4QXJyID0gbmV3IFVpbnQ4QXJyYXkodGhpcy54aHIucmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YUFycmF5ID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGlkeCA9IDAsIGxlbmd0aCA9IHVpOEFyci5sZW5ndGg7IGlkeCA8IGxlbmd0aDsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBkYXRhQXJyYXkucHVzaCh1aThBcnJbaWR4XSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBkYXRhID0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBkYXRhQXJyYXkpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobnVsbCAhPSBkYXRhKSB7XG4gICAgICAgICAgICAgIHRoaXMub25EYXRhKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENoZWNrIGlmIGl0IGhhcyBYRG9tYWluUmVxdWVzdC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUuaGFzWERSID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmICF0aGlzLnhzICYmIHRoaXMuZW5hYmxlc1hEUjtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBYm9ydHMgdGhlIHJlcXVlc3QuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgUmVxdWVzdC5wcm90b3R5cGUuYWJvcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XHJcbiAgICAgICAgICAgKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXHJcbiAgICAgICAgICAgKiBlbWl0dGVkLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBpZiAoZ2xvYmFsLmRvY3VtZW50KSB7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuICAgICAgICAgICAgaWYgKGdsb2JhbC5hdHRhY2hFdmVudCkge1xuICAgICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoJ29udW5sb2FkJywgdW5sb2FkSGFuZGxlcik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgICAgICAgICAgICBpZiAoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCIuL3BvbGxpbmdcIjogMjMsIFwiY29tcG9uZW50LWVtaXR0ZXJcIjogMjYsIFwiY29tcG9uZW50LWluaGVyaXRcIjogMTMsIFwiZGVidWdcIjogMTQsIFwieG1saHR0cHJlcXVlc3Qtc3NsXCI6IDI1IH1dLCAyMzogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgVHJhbnNwb3J0ID0gX2RlcmVxXygnLi4vdHJhbnNwb3J0Jyk7XG4gICAgICAgIHZhciBwYXJzZXFzID0gX2RlcmVxXygncGFyc2VxcycpO1xuICAgICAgICB2YXIgcGFyc2VyID0gX2RlcmVxXygnZW5naW5lLmlvLXBhcnNlcicpO1xuICAgICAgICB2YXIgaW5oZXJpdCA9IF9kZXJlcV8oJ2NvbXBvbmVudC1pbmhlcml0Jyk7XG4gICAgICAgIHZhciB5ZWFzdCA9IF9kZXJlcV8oJ3llYXN0Jyk7XG4gICAgICAgIHZhciBkZWJ1ZyA9IF9kZXJlcV8oJ2RlYnVnJykoJ2VuZ2luZS5pby1jbGllbnQ6cG9sbGluZycpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gUG9sbGluZztcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJcyBYSFIyIHN1cHBvcnRlZD9cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIFhNTEh0dHBSZXF1ZXN0ID0gX2RlcmVxXygneG1saHR0cHJlcXVlc3Qtc3NsJyk7XG4gICAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCh7IHhkb21haW46IGZhbHNlIH0pO1xuICAgICAgICAgIHJldHVybiBudWxsICE9IHhoci5yZXNwb25zZVR5cGU7XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUG9sbGluZyBpbnRlcmZhY2UuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIFBvbGxpbmcob3B0cykge1xuICAgICAgICAgIHZhciBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgICBpZiAoIWhhc1hIUjIgfHwgZm9yY2VCYXNlNjQpIHtcbiAgICAgICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgVHJhbnNwb3J0LmNhbGwodGhpcywgb3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cclxuICAgICAgICAgKi9cblxuICAgICAgICBpbmhlcml0KFBvbGxpbmcsIFRyYW5zcG9ydCk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogVHJhbnNwb3J0IG5hbWUuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICdwb2xsaW5nJztcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXHJcbiAgICAgICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5wb2xsKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGF1c2VzIHBvbGxpbmcuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uIChvblBhdXNlKSB7XG4gICAgICAgICAgdmFyIHBlbmRpbmcgPSAwO1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9ICdwYXVzaW5nJztcblxuICAgICAgICAgIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICAgICAgZGVidWcoJ3BhdXNlZCcpO1xuICAgICAgICAgICAgc2VsZi5yZWFkeVN0YXRlID0gJ3BhdXNlZCc7XG4gICAgICAgICAgICBvblBhdXNlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgdmFyIHRvdGFsID0gMDtcblxuICAgICAgICAgICAgaWYgKHRoaXMucG9sbGluZykge1xuICAgICAgICAgICAgICBkZWJ1Zygnd2UgYXJlIGN1cnJlbnRseSBwb2xsaW5nIC0gd2FpdGluZyB0byBwYXVzZScpO1xuICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICB0aGlzLm9uY2UoJ3BvbGxDb21wbGV0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHBvbGxpbmcgY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMud3JpdGFibGUpIHtcbiAgICAgICAgICAgICAgZGVidWcoJ3dlIGFyZSBjdXJyZW50bHkgd3JpdGluZyAtIHdhaXRpbmcgdG8gcGF1c2UnKTtcbiAgICAgICAgICAgICAgdG90YWwrKztcbiAgICAgICAgICAgICAgdGhpcy5vbmNlKCdkcmFpbicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygncHJlLXBhdXNlIHdyaXRpbmcgY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBTdGFydHMgcG9sbGluZyBjeWNsZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgUG9sbGluZy5wcm90b3R5cGUucG9sbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBkZWJ1ZygncG9sbGluZycpO1xuICAgICAgICAgIHRoaXMucG9sbGluZyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5kb1BvbGwoKTtcbiAgICAgICAgICB0aGlzLmVtaXQoJ3BvbGwnKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFBvbGxpbmcucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIGRlYnVnKCdwb2xsaW5nIGdvdCBkYXRhICVzJywgZGF0YSk7XG4gICAgICAgICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2socGFja2V0LCBpbmRleCwgdG90YWwpIHtcbiAgICAgICAgICAgIC8vIGlmIGl0cyB0aGUgZmlyc3QgbWVzc2FnZSB3ZSBjb25zaWRlciB0aGUgdHJhbnNwb3J0IG9wZW5cbiAgICAgICAgICAgIGlmICgnb3BlbmluZycgPT0gc2VsZi5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgIHNlbGYub25PcGVuKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmICgnY2xvc2UnID09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSBieXBhc3Mgb25EYXRhIGFuZCBoYW5kbGUgdGhlIG1lc3NhZ2VcbiAgICAgICAgICAgIHNlbGYub25QYWNrZXQocGFja2V0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gZGVjb2RlIHBheWxvYWRcbiAgICAgICAgICBwYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlLCBjYWxsYmFjayk7XG5cbiAgICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICAgIGlmICgnY2xvc2VkJyAhPSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgICAgICAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCgncG9sbENvbXBsZXRlJyk7XG5cbiAgICAgICAgICAgIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgIHRoaXMucG9sbCgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVidWcoJ2lnbm9yaW5nIHBvbGwgLSB0cmFuc3BvcnQgc3RhdGUgXCIlc1wiJywgdGhpcy5yZWFkeVN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS5kb0Nsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAgICAgZGVidWcoJ3dyaXRpbmcgY2xvc2UgcGFja2V0Jyk7XG4gICAgICAgICAgICBzZWxmLndyaXRlKFt7IHR5cGU6ICdjbG9zZScgfV0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgnb3BlbicgPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBkZWJ1ZygndHJhbnNwb3J0IG9wZW4gLSBjbG9zaW5nJyk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpbiBjYXNlIHdlJ3JlIHRyeWluZyB0byBjbG9zZSB3aGlsZVxuICAgICAgICAgICAgLy8gaGFuZHNoYWtpbmcgaXMgaW4gcHJvZ3Jlc3MgKEdILTE2NClcbiAgICAgICAgICAgIGRlYnVnKCd0cmFuc3BvcnQgbm90IG9wZW4gLSBkZWZlcnJpbmcgY2xvc2UnKTtcbiAgICAgICAgICAgIHRoaXMub25jZSgnb3BlbicsIGNsb3NlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBQb2xsaW5nLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChwYWNrZXRzKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgY2FsbGJhY2tmbiA9IGZ1bmN0aW9uIGNhbGxiYWNrZm4oKSB7XG4gICAgICAgICAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuZW1pdCgnZHJhaW4nKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgIHBhcnNlci5lbmNvZGVQYXlsb2FkKHBhY2tldHMsIHRoaXMuc3VwcG9ydHNCaW5hcnksIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICBzZWxmLmRvV3JpdGUoZGF0YSwgY2FsbGJhY2tmbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIFBvbGxpbmcucHJvdG90eXBlLnVyaSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICAgICAgICAgIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICdodHRwcycgOiAnaHR0cCc7XG4gICAgICAgICAgdmFyIHBvcnQgPSAnJztcblxuICAgICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVlcnkgPSBwYXJzZXFzLmVuY29kZShxdWVyeSk7XG5cbiAgICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICAgIGlmICh0aGlzLnBvcnQgJiYgKCdodHRwcycgPT0gc2NoZW1hICYmIHRoaXMucG9ydCAhPSA0NDMgfHwgJ2h0dHAnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKSB7XG4gICAgICAgICAgICBwb3J0ID0gJzonICsgdGhpcy5wb3J0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHByZXBlbmQgPyB0byBxdWVyeVxuICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gJz8nICsgcXVlcnk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gICAgICAgICAgcmV0dXJuIHNjaGVtYSArICc6Ly8nICsgKGlwdjYgPyAnWycgKyB0aGlzLmhvc3RuYW1lICsgJ10nIDogdGhpcy5ob3N0bmFtZSkgKyBwb3J0ICsgdGhpcy5wYXRoICsgcXVlcnk7XG4gICAgICAgIH07XG4gICAgICB9LCB7IFwiLi4vdHJhbnNwb3J0XCI6IDE5LCBcImNvbXBvbmVudC1pbmhlcml0XCI6IDEzLCBcImRlYnVnXCI6IDE0LCBcImVuZ2luZS5pby1wYXJzZXJcIjogMjcsIFwicGFyc2Vxc1wiOiAzNywgXCJ4bWxodHRwcmVxdWVzdC1zc2xcIjogMjUsIFwieWVhc3RcIjogNDUgfV0sIDI0OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIFRyYW5zcG9ydCA9IF9kZXJlcV8oJy4uL3RyYW5zcG9ydCcpO1xuICAgICAgICAgIHZhciBwYXJzZXIgPSBfZGVyZXFfKCdlbmdpbmUuaW8tcGFyc2VyJyk7XG4gICAgICAgICAgdmFyIHBhcnNlcXMgPSBfZGVyZXFfKCdwYXJzZXFzJyk7XG4gICAgICAgICAgdmFyIGluaGVyaXQgPSBfZGVyZXFfKCdjb21wb25lbnQtaW5oZXJpdCcpO1xuICAgICAgICAgIHZhciB5ZWFzdCA9IF9kZXJlcV8oJ3llYXN0Jyk7XG4gICAgICAgICAgdmFyIGRlYnVnID0gX2RlcmVxXygnZGVidWcnKSgnZW5naW5lLmlvLWNsaWVudDp3ZWJzb2NrZXQnKTtcbiAgICAgICAgICB2YXIgQnJvd3NlcldlYlNvY2tldCA9IGdsb2JhbC5XZWJTb2NrZXQgfHwgZ2xvYmFsLk1veldlYlNvY2tldDtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogR2V0IGVpdGhlciB0aGUgYFdlYlNvY2tldGAgb3IgYE1veldlYlNvY2tldGAgZ2xvYmFsc1xyXG4gICAgICAgICAgICogaW4gdGhlIGJyb3dzZXIgb3IgdHJ5IHRvIHJlc29sdmUgV2ViU29ja2V0LWNvbXBhdGlibGVcclxuICAgICAgICAgICAqIGludGVyZmFjZSBleHBvc2VkIGJ5IGB3c2AgZm9yIE5vZGUtbGlrZSBlbnZpcm9ubWVudC5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIFdlYlNvY2tldCA9IEJyb3dzZXJXZWJTb2NrZXQ7XG4gICAgICAgICAgaWYgKCFXZWJTb2NrZXQgJiYgdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIFdlYlNvY2tldCA9IF9kZXJlcV8oJ3dzJyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gV1M7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSB7T2JqZWN0fSBjb25uZWN0aW9uIG9wdGlvbnNcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIFdTKG9wdHMpIHtcbiAgICAgICAgICAgIHZhciBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgICAgIGlmIChmb3JjZUJhc2U2NCkge1xuICAgICAgICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBlck1lc3NhZ2VEZWZsYXRlID0gb3B0cy5wZXJNZXNzYWdlRGVmbGF0ZTtcbiAgICAgICAgICAgIFRyYW5zcG9ydC5jYWxsKHRoaXMsIG9wdHMpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGluaGVyaXQoV1MsIFRyYW5zcG9ydCk7XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIFRyYW5zcG9ydCBuYW1lLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogV2ViU29ja2V0cyBzdXBwb3J0IGJpbmFyeVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBPcGVucyBzb2NrZXQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5kb09wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2soKSkge1xuICAgICAgICAgICAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHZhciB1cmkgPSB0aGlzLnVyaSgpO1xuICAgICAgICAgICAgdmFyIHByb3RvY29scyA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBvcHRzID0ge1xuICAgICAgICAgICAgICBhZ2VudDogdGhpcy5hZ2VudCxcbiAgICAgICAgICAgICAgcGVyTWVzc2FnZURlZmxhdGU6IHRoaXMucGVyTWVzc2FnZURlZmxhdGVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIFNTTCBvcHRpb25zIGZvciBOb2RlLmpzIGNsaWVudFxuICAgICAgICAgICAgb3B0cy5wZnggPSB0aGlzLnBmeDtcbiAgICAgICAgICAgIG9wdHMua2V5ID0gdGhpcy5rZXk7XG4gICAgICAgICAgICBvcHRzLnBhc3NwaHJhc2UgPSB0aGlzLnBhc3NwaHJhc2U7XG4gICAgICAgICAgICBvcHRzLmNlcnQgPSB0aGlzLmNlcnQ7XG4gICAgICAgICAgICBvcHRzLmNhID0gdGhpcy5jYTtcbiAgICAgICAgICAgIG9wdHMuY2lwaGVycyA9IHRoaXMuY2lwaGVycztcbiAgICAgICAgICAgIG9wdHMucmVqZWN0VW5hdXRob3JpemVkID0gdGhpcy5yZWplY3RVbmF1dGhvcml6ZWQ7XG4gICAgICAgICAgICBpZiAodGhpcy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgb3B0cy5oZWFkZXJzID0gdGhpcy5leHRyYUhlYWRlcnM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMud3MgPSBCcm93c2VyV2ViU29ja2V0ID8gbmV3IFdlYlNvY2tldCh1cmkpIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLndzLmJpbmFyeVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICB0aGlzLnN1cHBvcnRzQmluYXJ5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLndzLnN1cHBvcnRzICYmIHRoaXMud3Muc3VwcG9ydHMuYmluYXJ5KSB7XG4gICAgICAgICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSAnYnVmZmVyJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMud3MuYmluYXJ5VHlwZSA9ICdhcnJheWJ1ZmZlcic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHNlbGYub25PcGVuKCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy53cy5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICBzZWxmLm9uRGF0YShldi5kYXRhKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoJ3dlYnNvY2tldCBlcnJvcicsIGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBPdmVycmlkZSBgb25EYXRhYCB0byB1c2UgYSB0aW1lciBvbiBpT1MuXHJcbiAgICAgICAgICAgKiBTZWU6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL21sb3VnaHJhbi8yMDUyMDA2XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yICYmIC9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgICAgICAgV1MucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkRhdGEuY2FsbChzZWxmLCBkYXRhKTtcbiAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogV3JpdGVzIGRhdGEgdG8gc29ja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IG9mIHBhY2tldHMuXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgV1MucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgICAgICAgICAgIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgICAgICAgICAgIHZhciB0b3RhbCA9IHBhY2tldHMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b3RhbDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAoZnVuY3Rpb24gKHBhY2tldCkge1xuICAgICAgICAgICAgICAgIHBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0LCBzZWxmLnN1cHBvcnRzQmluYXJ5LCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFsd2F5cyBjcmVhdGUgYSBuZXcgb2JqZWN0IChHSC00MzcpXG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRzID0ge307XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYWNrZXQub3B0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGxlbiA9ICdzdHJpbmcnID09IHR5cGVvZiBkYXRhID8gZ2xvYmFsLkJ1ZmZlci5ieXRlTGVuZ3RoKGRhdGEpIDogZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGxlbiA8IHNlbGYucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRzLmNvbXByZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC8vU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgICAgLy9oYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgICAgICAgICAgIC8vdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChCcm93c2VyV2ViU29ja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVHlwZUVycm9yIGlzIHRocm93biB3aGVuIHBhc3NpbmcgdGhlIHNlY29uZCBhcmd1bWVudCBvbiBTYWZhcmlcbiAgICAgICAgICAgICAgICAgICAgICBzZWxmLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi53cy5zZW5kKGRhdGEsIG9wdHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCd3ZWJzb2NrZXQgY2xvc2VkIGJlZm9yZSBvbmNsb3NlIGV2ZW50Jyk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgZG9uZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KShwYWNrZXRzW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgICAgICAgc2VsZi5lbWl0KCdmbHVzaCcpO1xuXG4gICAgICAgICAgICAgIC8vIGZha2UgZHJhaW5cbiAgICAgICAgICAgICAgLy8gZGVmZXIgdG8gbmV4dCB0aWNrIHRvIGFsbG93IFNvY2tldCB0byBjbGVhciB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQoJ2RyYWluJyk7XG4gICAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENhbGxlZCB1cG9uIGNsb3NlXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIFdTLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ2xvc2VzIHNvY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgV1MucHJvdG90eXBlLmRvQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBXUy5wcm90b3R5cGUudXJpID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgICAgIHZhciBzY2hlbWEgPSB0aGlzLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgICAgICAgICAgIHZhciBwb3J0ID0gJyc7XG5cbiAgICAgICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgICAgICBpZiAodGhpcy5wb3J0ICYmICgnd3NzJyA9PSBzY2hlbWEgJiYgdGhpcy5wb3J0ICE9IDQ0MyB8fCAnd3MnID09IHNjaGVtYSAmJiB0aGlzLnBvcnQgIT0gODApKSB7XG4gICAgICAgICAgICAgIHBvcnQgPSAnOicgKyB0aGlzLnBvcnQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gICAgICAgICAgICBpZiAodGhpcy50aW1lc3RhbXBSZXF1ZXN0cykge1xuICAgICAgICAgICAgICBxdWVyeVt0aGlzLnRpbWVzdGFtcFBhcmFtXSA9IHllYXN0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNvbW11bmljYXRlIGJpbmFyeSBzdXBwb3J0IGNhcGFiaWxpdGllc1xuICAgICAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHF1ZXJ5ID0gcGFyc2Vxcy5lbmNvZGUocXVlcnkpO1xuXG4gICAgICAgICAgICAvLyBwcmVwZW5kID8gdG8gcXVlcnlcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcXVlcnkgPSAnPycgKyBxdWVyeTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlwdjYgPSB0aGlzLmhvc3RuYW1lLmluZGV4T2YoJzonKSAhPT0gLTE7XG4gICAgICAgICAgICByZXR1cm4gc2NoZW1hICsgJzovLycgKyAoaXB2NiA/ICdbJyArIHRoaXMuaG9zdG5hbWUgKyAnXScgOiB0aGlzLmhvc3RuYW1lKSArIHBvcnQgKyB0aGlzLnBhdGggKyBxdWVyeTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IHdoZXRoZXIgdGhpcyB0cmFuc3BvcnQgaXMgYXZhaWxhYmxlLlxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgV1MucHJvdG90eXBlLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICEhV2ViU29ja2V0ICYmICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0ICYmIHRoaXMubmFtZSA9PT0gV1MucHJvdG90eXBlLm5hbWUpO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi4vdHJhbnNwb3J0XCI6IDE5LCBcImNvbXBvbmVudC1pbmhlcml0XCI6IDEzLCBcImRlYnVnXCI6IDE0LCBcImVuZ2luZS5pby1wYXJzZXJcIjogMjcsIFwicGFyc2Vxc1wiOiAzNywgXCJ3c1wiOiB1bmRlZmluZWQsIFwieWVhc3RcIjogNDUgfV0sIDI1OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAvLyBicm93c2VyIHNoaW0gZm9yIHhtbGh0dHByZXF1ZXN0IG1vZHVsZVxuICAgICAgICB2YXIgaGFzQ09SUyA9IF9kZXJlcV8oJ2hhcy1jb3JzJyk7XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob3B0cykge1xuICAgICAgICAgIHZhciB4ZG9tYWluID0gb3B0cy54ZG9tYWluO1xuXG4gICAgICAgICAgLy8gc2NoZW1lIG11c3QgYmUgc2FtZSB3aGVuIHVzaWduIFhEb21haW5SZXF1ZXN0XG4gICAgICAgICAgLy8gaHR0cDovL2Jsb2dzLm1zZG4uY29tL2IvaWVpbnRlcm5hbHMvYXJjaGl2ZS8yMDEwLzA1LzEzL3hkb21haW5yZXF1ZXN0LXJlc3RyaWN0aW9ucy1saW1pdGF0aW9ucy1hbmQtd29ya2Fyb3VuZHMuYXNweFxuICAgICAgICAgIHZhciB4c2NoZW1lID0gb3B0cy54c2NoZW1lO1xuXG4gICAgICAgICAgLy8gWERvbWFpblJlcXVlc3QgaGFzIGEgZmxvdyBvZiBub3Qgc2VuZGluZyBjb29raWUsIHRoZXJlZm9yZSBpdCBzaG91bGQgYmUgZGlzYWJsZWQgYXMgYSBkZWZhdWx0LlxuICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2VuZ2luZS5pby1jbGllbnQvcHVsbC8yMTdcbiAgICAgICAgICB2YXIgZW5hYmxlc1hEUiA9IG9wdHMuZW5hYmxlc1hEUjtcblxuICAgICAgICAgIC8vIFhNTEh0dHBSZXF1ZXN0IGNhbiBiZSBkaXNhYmxlZCBvbiBJRVxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgIC8vIFVzZSBYRG9tYWluUmVxdWVzdCBmb3IgSUU4IGlmIGVuYWJsZXNYRFIgaXMgdHJ1ZVxuICAgICAgICAgIC8vIGJlY2F1c2UgbG9hZGluZyBiYXIga2VlcHMgZmxhc2hpbmcgd2hlbiB1c2luZyBqc29ucC1wb2xsaW5nXG4gICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3l1amlvc2FrYS9zb2NrZS5pby1pZTgtbG9hZGluZy1leGFtcGxlXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXhzY2hlbWUgJiYgZW5hYmxlc1hEUikge1xuICAgICAgICAgICAgICByZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgIGlmICgheGRvbWFpbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9LCB7IFwiaGFzLWNvcnNcIjogMzEgfV0sIDI2OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEV4cG9zZSBgRW1pdHRlcmAuXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFbWl0dGVyO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICAgICAgICAgIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqXHJcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIG1peGluKG9iaikge1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAgICAgICAgICogQHJldHVybiB7RW1pdHRlcn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgKHRoaXMuX2NhbGxiYWNrc1tldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICAgICAgICAgKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChldmVudCwgZm4pIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gICAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgICBzZWxmLm9mZihldmVudCwgb24pO1xuICAgICAgICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBvbi5mbiA9IGZuO1xuICAgICAgICAgIHRoaXMub24oZXZlbnQsIG9uKTtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxyXG4gICAgICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgRW1pdHRlci5wcm90b3R5cGUub2ZmID0gRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50LCBmbikge1xuICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAgICAgICAgIC8vIGFsbFxuICAgICAgICAgIGlmICgwID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgICAgICAgICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XG5cbiAgICAgICAgICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gICAgICAgICAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyByZW1vdmUgc3BlY2lmaWMgaGFuZGxlclxuICAgICAgICAgIHZhciBjYjtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2IgPSBjYWxsYmFja3NbaV07XG4gICAgICAgICAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgICAgICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICAgICAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5cclxuICAgICAgICAgKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF07XG5cbiAgICAgICAgICBpZiAoY2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW107XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn1cclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHJldHVybiAhIXRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDI3OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgdmFyIGtleXMgPSBfZGVyZXFfKCcuL2tleXMnKTtcbiAgICAgICAgICB2YXIgaGFzQmluYXJ5ID0gX2RlcmVxXygnaGFzLWJpbmFyeScpO1xuICAgICAgICAgIHZhciBzbGljZUJ1ZmZlciA9IF9kZXJlcV8oJ2FycmF5YnVmZmVyLnNsaWNlJyk7XG4gICAgICAgICAgdmFyIGJhc2U2NGVuY29kZXIgPSBfZGVyZXFfKCdiYXNlNjQtYXJyYXlidWZmZXInKTtcbiAgICAgICAgICB2YXIgYWZ0ZXIgPSBfZGVyZXFfKCdhZnRlcicpO1xuICAgICAgICAgIHZhciB1dGY4ID0gX2RlcmVxXygndXRmOCcpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBhbiBhbmRyb2lkIGJyb3dzZXIuIFRoYXQgcmVxdWlyZXMgdXMgdG8gdXNlXHJcbiAgICAgICAgICAgKiBBcnJheUJ1ZmZlciB3aXRoIHBvbGxpbmcgdHJhbnNwb3J0cy4uLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIGh0dHA6Ly9naGluZGEubmV0L2pwZWctYmxvYi1hamF4LWFuZHJvaWQvXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBpc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9BbmRyb2lkL2kpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVjayBpZiB3ZSBhcmUgcnVubmluZyBpbiBQaGFudG9tSlMuXHJcbiAgICAgICAgICAgKiBVcGxvYWRpbmcgYSBCbG9iIHdpdGggUGhhbnRvbUpTIGRvZXMgbm90IHdvcmsgY29ycmVjdGx5LCBhcyByZXBvcnRlZCBoZXJlOlxyXG4gICAgICAgICAgICogaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEzOTVcclxuICAgICAgICAgICAqIEB0eXBlIGJvb2xlYW5cclxuICAgICAgICAgICAqL1xuICAgICAgICAgIHZhciBpc1BoYW50b21KUyA9IC9QaGFudG9tSlMvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBXaGVuIHRydWUsIGF2b2lkcyB1c2luZyBCbG9icyB0byBlbmNvZGUgcGF5bG9hZHMuXHJcbiAgICAgICAgICAgKiBAdHlwZSBib29sZWFuXHJcbiAgICAgICAgICAgKi9cbiAgICAgICAgICB2YXIgZG9udFNlbmRCbG9icyA9IGlzQW5kcm9pZCB8fCBpc1BoYW50b21KUztcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQ3VycmVudCBwcm90b2NvbCB2ZXJzaW9uLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLnByb3RvY29sID0gMztcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUGFja2V0IHR5cGVzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgcGFja2V0cyA9IGV4cG9ydHMucGFja2V0cyA9IHtcbiAgICAgICAgICAgIG9wZW46IDAsIC8vIG5vbi13c1xuICAgICAgICAgICAgY2xvc2U6IDEsIC8vIG5vbi13c1xuICAgICAgICAgICAgcGluZzogMixcbiAgICAgICAgICAgIHBvbmc6IDMsXG4gICAgICAgICAgICBtZXNzYWdlOiA0LFxuICAgICAgICAgICAgdXBncmFkZTogNSxcbiAgICAgICAgICAgIG5vb3A6IDZcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdmFyIHBhY2tldHNsaXN0ID0ga2V5cyhwYWNrZXRzKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUHJlbWFkZSBlcnJvciBwYWNrZXQuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBlcnIgPSB7IHR5cGU6ICdlcnJvcicsIGRhdGE6ICdwYXJzZXIgZXJyb3InIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIENyZWF0ZSBhIGJsb2IgYXBpIGV2ZW4gZm9yIGJsb2IgYnVpbGRlciB3aGVuIHZlbmRvciBwcmVmaXhlcyBleGlzdFxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgQmxvYiA9IF9kZXJlcV8oJ2Jsb2InKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRW5jb2RlcyBhIHBhY2tldC5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICAgPHBhY2tldCB0eXBlIGlkPiBbIDxkYXRhPiBdXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogRXhhbXBsZTpcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICAgNWhlbGxvIHdvcmxkXHJcbiAgICAgICAgICAgKiAgICAgM1xyXG4gICAgICAgICAgICogICAgIDRcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBCaW5hcnkgaXMgZW5jb2RlZCBpbiBhbiBpZGVudGljYWwgcHJpbmNpcGxlXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIHV0ZjhlbmNvZGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICAgICAgICAgICAgc3VwcG9ydHNCaW5hcnkgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHV0ZjhlbmNvZGUpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSB1dGY4ZW5jb2RlO1xuICAgICAgICAgICAgICB1dGY4ZW5jb2RlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGEgPSBwYWNrZXQuZGF0YSA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogcGFja2V0LmRhdGEuYnVmZmVyIHx8IHBhY2tldC5kYXRhO1xuXG4gICAgICAgICAgICBpZiAoZ2xvYmFsLkFycmF5QnVmZmVyICYmIGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBnbG9iYWwuQmxvYikge1xuICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG1pZ2h0IGJlIGFuIG9iamVjdCB3aXRoIHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5iYXNlNjQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJhc2U2NE9iamVjdChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VuZGluZyBkYXRhIGFzIGEgdXRmLTggc3RyaW5nXG4gICAgICAgICAgICB2YXIgZW5jb2RlZCA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuXG4gICAgICAgICAgICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBwYWNrZXQuZGF0YSkge1xuICAgICAgICAgICAgICBlbmNvZGVkICs9IHV0ZjhlbmNvZGUgPyB1dGY4LmVuY29kZShTdHJpbmcocGFja2V0LmRhdGEpKSA6IFN0cmluZyhwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygnJyArIGVuY29kZWQpO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICBmdW5jdGlvbiBlbmNvZGVCYXNlNjRPYmplY3QocGFja2V0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgLy8gcGFja2V0IGRhdGEgaXMgYW4gb2JqZWN0IHsgYmFzZTY0OiB0cnVlLCBkYXRhOiBkYXRhQXNCYXNlNjRTdHJpbmcgfVxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnYicgKyBleHBvcnRzLnBhY2tldHNbcGFja2V0LnR5cGVdICsgcGFja2V0LmRhdGEuZGF0YTtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhtZXNzYWdlKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZSBwYWNrZXQgaGVscGVycyBmb3IgYmluYXJ5IHR5cGVzXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZUFycmF5QnVmZmVyKHBhY2tldCwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAoIXN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZUJhc2U2NFBhY2tldChwYWNrZXQsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgICAgIHZhciBjb250ZW50QXJyYXkgPSBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgICAgICAgICAgIHZhciByZXN1bHRCdWZmZXIgPSBuZXcgVWludDhBcnJheSgxICsgZGF0YS5ieXRlTGVuZ3RoKTtcblxuICAgICAgICAgICAgcmVzdWx0QnVmZmVyWzBdID0gcGFja2V0c1twYWNrZXQudHlwZV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRlbnRBcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICByZXN1bHRCdWZmZXJbaSArIDFdID0gY29udGVudEFycmF5W2ldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0QnVmZmVyLmJ1ZmZlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZW5jb2RlQmxvYkFzQXJyYXlCdWZmZXIocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICghc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0KHBhY2tldCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBwYWNrZXQuZGF0YSA9IGZyLnJlc3VsdDtcbiAgICAgICAgICAgICAgZXhwb3J0cy5lbmNvZGVQYWNrZXQocGFja2V0LCBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmci5yZWFkQXNBcnJheUJ1ZmZlcihwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gZW5jb2RlQmxvYihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgaWYgKCFzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cy5lbmNvZGVCYXNlNjRQYWNrZXQocGFja2V0LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkb250U2VuZEJsb2JzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNBcnJheUJ1ZmZlcihwYWNrZXQsIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBuZXcgVWludDhBcnJheSgxKTtcbiAgICAgICAgICAgIGxlbmd0aFswXSA9IHBhY2tldHNbcGFja2V0LnR5cGVdO1xuICAgICAgICAgICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbbGVuZ3RoLmJ1ZmZlciwgcGFja2V0LmRhdGFdKTtcblxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGJsb2IpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRW5jb2RlcyBhIHBhY2tldCB3aXRoIGJpbmFyeSBkYXRhIGluIGEgYmFzZTY0IHN0cmluZ1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQsIGhhcyBgdHlwZWAgYW5kIGBkYXRhYFxyXG4gICAgICAgICAgICogQHJldHVybiB7U3RyaW5nfSBiYXNlNjQgZW5jb2RlZCBtZXNzYWdlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZW5jb2RlQmFzZTY0UGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJ2InICsgZXhwb3J0cy5wYWNrZXRzW3BhY2tldC50eXBlXTtcbiAgICAgICAgICAgIGlmIChCbG9iICYmIHBhY2tldC5kYXRhIGluc3RhbmNlb2YgZ2xvYmFsLkJsb2IpIHtcbiAgICAgICAgICAgICAgdmFyIGZyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBiNjQgPSBmci5yZXN1bHQuc3BsaXQoJywnKVsxXTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhtZXNzYWdlICsgYjY0KTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZyLnJlYWRBc0RhdGFVUkwocGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYjY0ZGF0YTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHdpdGggdHlwZWQgYXJyYXlzXG4gICAgICAgICAgICAgIHZhciB0eXBlZCA9IG5ldyBVaW50OEFycmF5KHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgdmFyIGJhc2ljID0gbmV3IEFycmF5KHR5cGVkLmxlbmd0aCk7XG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBiYXNpY1tpXSA9IHR5cGVkW2ldO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGI2NGRhdGEgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhc2ljKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gZ2xvYmFsLmJ0b2EoYjY0ZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2sobWVzc2FnZSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogRGVjb2RlcyBhIHBhY2tldC4gQ2hhbmdlcyBmb3JtYXQgdG8gQmxvYiBpZiByZXF1ZXN0ZWQuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGB0eXBlYCBhbmQgYGRhdGFgIChpZiBhbnkpXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSwgYmluYXJ5VHlwZSwgdXRmOGRlY29kZSkge1xuICAgICAgICAgICAgLy8gU3RyaW5nIGRhdGFcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJyB8fCBkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuY2hhckF0KDApID09ICdiJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldChkYXRhLnN1YnN0cigxKSwgYmluYXJ5VHlwZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAodXRmOGRlY29kZSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBkYXRhID0gdXRmOC5kZWNvZGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIHR5cGUgPSBkYXRhLmNoYXJBdCgwKTtcblxuICAgICAgICAgICAgICBpZiAoTnVtYmVyKHR5cGUpICE9IHR5cGUgfHwgIXBhY2tldHNsaXN0W3R5cGVdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVycjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSwgZGF0YTogZGF0YS5zdWJzdHJpbmcoMSkgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiBwYWNrZXRzbGlzdFt0eXBlXSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhc0FycmF5ID0gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGFzQXJyYXlbMF07XG4gICAgICAgICAgICB2YXIgcmVzdCA9IHNsaWNlQnVmZmVyKGRhdGEsIDEpO1xuICAgICAgICAgICAgaWYgKEJsb2IgJiYgYmluYXJ5VHlwZSA9PT0gJ2Jsb2InKSB7XG4gICAgICAgICAgICAgIHJlc3QgPSBuZXcgQmxvYihbcmVzdF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogcGFja2V0c2xpc3RbdHlwZV0sIGRhdGE6IHJlc3QgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBEZWNvZGVzIGEgcGFja2V0IGVuY29kZWQgaW4gYSBiYXNlNjQgc3RyaW5nXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGJhc2U2NCBlbmNvZGVkIG1lc3NhZ2VcclxuICAgICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBgdHlwZWAgYW5kIGBkYXRhYCAoaWYgYW55KVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmRlY29kZUJhc2U2NFBhY2tldCA9IGZ1bmN0aW9uIChtc2csIGJpbmFyeVR5cGUpIHtcbiAgICAgICAgICAgIHZhciB0eXBlID0gcGFja2V0c2xpc3RbbXNnLmNoYXJBdCgwKV07XG4gICAgICAgICAgICBpZiAoIWdsb2JhbC5BcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICByZXR1cm4geyB0eXBlOiB0eXBlLCBkYXRhOiB7IGJhc2U2NDogdHJ1ZSwgZGF0YTogbXNnLnN1YnN0cigxKSB9IH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkYXRhID0gYmFzZTY0ZW5jb2Rlci5kZWNvZGUobXNnLnN1YnN0cigxKSk7XG5cbiAgICAgICAgICAgIGlmIChiaW5hcnlUeXBlID09PSAnYmxvYicgJiYgQmxvYikge1xuICAgICAgICAgICAgICBkYXRhID0gbmV3IEJsb2IoW2RhdGFdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogdHlwZSwgZGF0YTogZGF0YSB9O1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqICAgICA8bGVuZ3RoPjpkYXRhXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogRXhhbXBsZTpcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiAgICAgMTE6aGVsbG8gd29ybGQyOmhpXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogSWYgYW55IGNvbnRlbnRzIGFyZSBiaW5hcnksIHRoZXkgd2lsbCBiZSBlbmNvZGVkIGFzIGJhc2U2NCBzdHJpbmdzLiBCYXNlNjRcclxuICAgICAgICAgICAqIGVuY29kZWQgc3RyaW5ncyBhcmUgbWFya2VkIHdpdGggYSBiIGJlZm9yZSB0aGUgbGVuZ3RoIHNwZWNpZmllclxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcclxuICAgICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbiAocGFja2V0cywgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN1cHBvcnRzQmluYXJ5ID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSBzdXBwb3J0c0JpbmFyeTtcbiAgICAgICAgICAgICAgc3VwcG9ydHNCaW5hcnkgPSBudWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNCaW5hcnkgPSBoYXNCaW5hcnkocGFja2V0cyk7XG5cbiAgICAgICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSAmJiBpc0JpbmFyeSkge1xuICAgICAgICAgICAgICBpZiAoQmxvYiAmJiAhZG9udFNlbmRCbG9icykge1xuICAgICAgICAgICAgICAgIHJldHVybiBleHBvcnRzLmVuY29kZVBheWxvYWRBc0Jsb2IocGFja2V0cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIocGFja2V0cywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXBhY2tldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjaygnMDonKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG1lc3NhZ2UubGVuZ3RoICsgJzonICsgbWVzc2FnZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgIWlzQmluYXJ5ID8gZmFsc2UgOiBzdXBwb3J0c0JpbmFyeSwgdHJ1ZSwgZnVuY3Rpb24gKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBkb25lQ2FsbGJhY2sobnVsbCwgc2V0TGVuZ3RoSGVhZGVyKG1lc3NhZ2UpKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKHJlc3VsdHMuam9pbignJykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogQXN5bmMgYXJyYXkgbWFwIHVzaW5nIGFmdGVyXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGZ1bmN0aW9uIG1hcChhcnksIGVhY2gsIGRvbmUpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoYXJ5Lmxlbmd0aCk7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IGFmdGVyKGFyeS5sZW5ndGgsIGRvbmUpO1xuXG4gICAgICAgICAgICB2YXIgZWFjaFdpdGhJbmRleCA9IGZ1bmN0aW9uIGVhY2hXaXRoSW5kZXgoaSwgZWwsIGNiKSB7XG4gICAgICAgICAgICAgIGVhY2goZWwsIGZ1bmN0aW9uIChlcnJvciwgbXNnKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2ldID0gbXNnO1xuICAgICAgICAgICAgICAgIGNiKGVycm9yLCByZXN1bHQpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJ5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIGVhY2hXaXRoSW5kZXgoaSwgYXJ5W2ldLCBuZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBQb3NzaWJsZSBiaW5hcnkgY29udGVudHMgYXJlXHJcbiAgICAgICAgICAgKiBkZWNvZGVkIGZyb20gdGhlaXIgYmFzZTY0IHJlcHJlc2VudGF0aW9uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEsIGNhbGxiYWNrIG1ldGhvZFxyXG4gICAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGRhdGEgIT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5KGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaW5hcnlUeXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrID0gYmluYXJ5VHlwZTtcbiAgICAgICAgICAgICAgYmluYXJ5VHlwZSA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwYWNrZXQ7XG4gICAgICAgICAgICBpZiAoZGF0YSA9PSAnJykge1xuICAgICAgICAgICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gJycsXG4gICAgICAgICAgICAgICAgbixcbiAgICAgICAgICAgICAgICBtc2c7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGNociA9IGRhdGEuY2hhckF0KGkpO1xuXG4gICAgICAgICAgICAgIGlmICgnOicgIT0gY2hyKSB7XG4gICAgICAgICAgICAgICAgbGVuZ3RoICs9IGNocjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJycgPT0gbGVuZ3RoIHx8IGxlbmd0aCAhPSAobiA9IE51bWJlcihsZW5ndGgpKSkge1xuICAgICAgICAgICAgICAgICAgLy8gcGFyc2VyIGVycm9yIC0gaWdub3JpbmcgcGF5bG9hZFxuICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbXNnID0gZGF0YS5zdWJzdHIoaSArIDEsIG4pO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxlbmd0aCAhPSBtc2cubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobXNnLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgcGFja2V0ID0gZXhwb3J0cy5kZWNvZGVQYWNrZXQobXNnLCBiaW5hcnlUeXBlLCB0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgaWYgKGVyci50eXBlID09IHBhY2tldC50eXBlICYmIGVyci5kYXRhID09IHBhY2tldC5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcnNlciBlcnJvciBpbiBpbmRpdmlkdWFsIHBhY2tldCAtIGlnbm9yaW5nIHBheWxvYWRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHZhciByZXQgPSBjYWxsYmFjayhwYWNrZXQsIGkgKyBuLCBsKTtcbiAgICAgICAgICAgICAgICAgIGlmIChmYWxzZSA9PT0gcmV0KSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWR2YW5jZSBjdXJzb3JcbiAgICAgICAgICAgICAgICBpICs9IG47XG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxlbmd0aCAhPSAnJykge1xuICAgICAgICAgICAgICAvLyBwYXJzZXIgZXJyb3IgLSBpZ25vcmluZyBwYXlsb2FkXG4gICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpIGFzIGJpbmFyeS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiA8MSA9IGJpbmFyeSwgMCA9IHN0cmluZz48bnVtYmVyIGZyb20gMC05PjxudW1iZXIgZnJvbSAwLTk+Wy4uLl08bnVtYmVyXHJcbiAgICAgICAgICAgKiAyNTU+PGRhdGE+XHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogRXhhbXBsZTpcclxuICAgICAgICAgICAqIDEgMyAyNTUgMSAyIDMsIGlmIHRoZSBiaW5hcnkgY29udGVudHMgYXJlIGludGVycHJldGVkIGFzIDggYml0IGludGVnZXJzXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xyXG4gICAgICAgICAgICogQHJldHVybiB7QXJyYXlCdWZmZXJ9IGVuY29kZWQgcGF5bG9hZFxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQXJyYXlCdWZmZXIgPSBmdW5jdGlvbiAocGFja2V0cywgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIGlmICghcGFja2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBBcnJheUJ1ZmZlcigwKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGVuY29kZU9uZShwYWNrZXQsIGRvbmVDYWxsYmFjaykge1xuICAgICAgICAgICAgICBleHBvcnRzLmVuY29kZVBhY2tldChwYWNrZXQsIHRydWUsIHRydWUsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbmVDYWxsYmFjayhudWxsLCBkYXRhKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uIChlcnIsIGVuY29kZWRQYWNrZXRzKSB7XG4gICAgICAgICAgICAgIHZhciB0b3RhbExlbmd0aCA9IGVuY29kZWRQYWNrZXRzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxlbjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHAgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICBsZW4gPSBwLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbGVuID0gcC5ieXRlTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgbGVuLnRvU3RyaW5nKCkubGVuZ3RoICsgbGVuICsgMjsgLy8gc3RyaW5nL2JpbmFyeSBpZGVudGlmaWVyICsgc2VwYXJhdG9yID0gMlxuICAgICAgICAgICAgICB9LCAwKTtcblxuICAgICAgICAgICAgICB2YXIgcmVzdWx0QXJyYXkgPSBuZXcgVWludDhBcnJheSh0b3RhbExlbmd0aCk7XG5cbiAgICAgICAgICAgICAgdmFyIGJ1ZmZlckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgZW5jb2RlZFBhY2tldHMuZm9yRWFjaChmdW5jdGlvbiAocCkge1xuICAgICAgICAgICAgICAgIHZhciBpc1N0cmluZyA9IHR5cGVvZiBwID09PSAnc3RyaW5nJztcbiAgICAgICAgICAgICAgICB2YXIgYWIgPSBwO1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShwLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmlld1tpXSA9IHAuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGFiID0gdmlldy5idWZmZXI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAvLyBub3QgdHJ1ZSBiaW5hcnlcbiAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gdHJ1ZSBiaW5hcnlcbiAgICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGVuU3RyID0gYWIuYnl0ZUxlbmd0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuU3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdEFycmF5W2J1ZmZlckluZGV4KytdID0gMjU1O1xuXG4gICAgICAgICAgICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICByZXN1bHRBcnJheVtidWZmZXJJbmRleCsrXSA9IHZpZXdbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2socmVzdWx0QXJyYXkuYnVmZmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEVuY29kZSBhcyBCbG9iXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGF5bG9hZEFzQmxvYiA9IGZ1bmN0aW9uIChwYWNrZXRzLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgZnVuY3Rpb24gZW5jb2RlT25lKHBhY2tldCwgZG9uZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGV4cG9ydHMuZW5jb2RlUGFja2V0KHBhY2tldCwgdHJ1ZSwgdHJ1ZSwgZnVuY3Rpb24gKGVuY29kZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYmluYXJ5SWRlbnRpZmllciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgICAgICAgICAgIGJpbmFyeUlkZW50aWZpZXJbMF0gPSAxO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZW5jb2RlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoZW5jb2RlZC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNvZGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdbaV0gPSBlbmNvZGVkLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBlbmNvZGVkID0gdmlldy5idWZmZXI7XG4gICAgICAgICAgICAgICAgICBiaW5hcnlJZGVudGlmaWVyWzBdID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgbGVuID0gZW5jb2RlZCBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gZW5jb2RlZC5ieXRlTGVuZ3RoIDogZW5jb2RlZC5zaXplO1xuXG4gICAgICAgICAgICAgICAgdmFyIGxlblN0ciA9IGxlbi50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHZhciBsZW5ndGhBcnkgPSBuZXcgVWludDhBcnJheShsZW5TdHIubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5TdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGxlbmd0aEFyeVtpXSA9IHBhcnNlSW50KGxlblN0cltpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxlbmd0aEFyeVtsZW5TdHIubGVuZ3RoXSA9IDI1NTtcblxuICAgICAgICAgICAgICAgIGlmIChCbG9iKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtiaW5hcnlJZGVudGlmaWVyLmJ1ZmZlciwgbGVuZ3RoQXJ5LmJ1ZmZlciwgZW5jb2RlZF0pO1xuICAgICAgICAgICAgICAgICAgZG9uZUNhbGxiYWNrKG51bGwsIGJsb2IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1hcChwYWNrZXRzLCBlbmNvZGVPbmUsIGZ1bmN0aW9uIChlcnIsIHJlc3VsdHMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBCbG9iKHJlc3VsdHMpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvKlxyXG4gICAgICAgICAgICogRGVjb2RlcyBkYXRhIHdoZW4gYSBwYXlsb2FkIGlzIG1heWJlIGV4cGVjdGVkLiBTdHJpbmdzIGFyZSBkZWNvZGVkIGJ5XHJcbiAgICAgICAgICAgKiBpbnRlcnByZXRpbmcgZWFjaCBieXRlIGFzIGEga2V5IGNvZGUgZm9yIGVudHJpZXMgbWFya2VkIHRvIHN0YXJ0IHdpdGggMC4gU2VlXHJcbiAgICAgICAgICAgKiBkZXNjcmlwdGlvbiBvZiBlbmNvZGVQYXlsb2FkQXNCaW5hcnlcclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBkYXRhLCBjYWxsYmFjayBtZXRob2RcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZGVjb2RlUGF5bG9hZEFzQmluYXJ5ID0gZnVuY3Rpb24gKGRhdGEsIGJpbmFyeVR5cGUsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJpbmFyeVR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sgPSBiaW5hcnlUeXBlO1xuICAgICAgICAgICAgICBiaW5hcnlUeXBlID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJ1ZmZlclRhaWwgPSBkYXRhO1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcnMgPSBbXTtcblxuICAgICAgICAgICAgdmFyIG51bWJlclRvb0xvbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHdoaWxlIChidWZmZXJUYWlsLmJ5dGVMZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHZhciB0YWlsQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJUYWlsKTtcbiAgICAgICAgICAgICAgdmFyIGlzU3RyaW5nID0gdGFpbEFycmF5WzBdID09PSAwO1xuICAgICAgICAgICAgICB2YXIgbXNnTGVuZ3RoID0gJyc7XG5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7OyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFpbEFycmF5W2ldID09IDI1NSkgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBpZiAobXNnTGVuZ3RoLmxlbmd0aCA+IDMxMCkge1xuICAgICAgICAgICAgICAgICAgbnVtYmVyVG9vTG9uZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtc2dMZW5ndGggKz0gdGFpbEFycmF5W2ldO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKG51bWJlclRvb0xvbmcpIHJldHVybiBjYWxsYmFjayhlcnIsIDAsIDEpO1xuXG4gICAgICAgICAgICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCAyICsgbXNnTGVuZ3RoLmxlbmd0aCk7XG4gICAgICAgICAgICAgIG1zZ0xlbmd0aCA9IHBhcnNlSW50KG1zZ0xlbmd0aCk7XG5cbiAgICAgICAgICAgICAgdmFyIG1zZyA9IHNsaWNlQnVmZmVyKGJ1ZmZlclRhaWwsIDAsIG1zZ0xlbmd0aCk7XG4gICAgICAgICAgICAgIGlmIChpc1N0cmluZykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICBtc2cgPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KG1zZykpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGlQaG9uZSBTYWZhcmkgZG9lc24ndCBsZXQgeW91IGFwcGx5IHRvIHR5cGVkIGFycmF5c1xuICAgICAgICAgICAgICAgICAgdmFyIHR5cGVkID0gbmV3IFVpbnQ4QXJyYXkobXNnKTtcbiAgICAgICAgICAgICAgICAgIG1zZyA9ICcnO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0eXBlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBtc2cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSh0eXBlZFtpXSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgYnVmZmVycy5wdXNoKG1zZyk7XG4gICAgICAgICAgICAgIGJ1ZmZlclRhaWwgPSBzbGljZUJ1ZmZlcihidWZmZXJUYWlsLCBtc2dMZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdG90YWwgPSBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgICAgIGJ1ZmZlcnMuZm9yRWFjaChmdW5jdGlvbiAoYnVmZmVyLCBpKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGV4cG9ydHMuZGVjb2RlUGFja2V0KGJ1ZmZlciwgYmluYXJ5VHlwZSwgdHJ1ZSksIGksIHRvdGFsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi9rZXlzXCI6IDI4LCBcImFmdGVyXCI6IDYsIFwiYXJyYXlidWZmZXIuc2xpY2VcIjogNywgXCJiYXNlNjQtYXJyYXlidWZmZXJcIjogOSwgXCJibG9iXCI6IDEwLCBcImhhcy1iaW5hcnlcIjogMjksIFwidXRmOFwiOiA0NCB9XSwgMjg6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogR2V0cyB0aGUga2V5cyBmb3IgYW4gb2JqZWN0LlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHJldHVybiB7QXJyYXl9IGtleXNcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gICAgICAgICAgdmFyIGFyciA9IFtdO1xuICAgICAgICAgIHZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4gICAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbChvYmosIGkpKSB7XG4gICAgICAgICAgICAgIGFyci5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gYXJyO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAyOTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgaXNBcnJheSA9IF9kZXJlcV8oJ2lzYXJyYXknKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIFJpZ2h0IG5vdyBvbmx5IEJ1ZmZlciBhbmQgQXJyYXlCdWZmZXIgYXJlIHN1cHBvcnRlZC4uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGFueXRoaW5nXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBoYXNCaW5hcnkoZGF0YSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBfaGFzQmluYXJ5KG9iaikge1xuICAgICAgICAgICAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgIGlmIChnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIob2JqKSB8fCBnbG9iYWwuQXJyYXlCdWZmZXIgJiYgb2JqIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgZ2xvYmFsLkJsb2IgJiYgb2JqIGluc3RhbmNlb2YgQmxvYiB8fCBnbG9iYWwuRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvYmoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGlmIChfaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG9iaiAmJiAnb2JqZWN0JyA9PSB0eXBlb2Ygb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9iai50b0pTT04pIHtcbiAgICAgICAgICAgICAgICAgIG9iaiA9IG9iai50b0pTT04oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSAmJiBfaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBfaGFzQmluYXJ5KGRhdGEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHsgXCJpc2FycmF5XCI6IDMzIH1dLCAzMDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcblxuICAgICAgICAgIC8qXHJcbiAgICAgICAgICAgKiBNb2R1bGUgcmVxdWlyZW1lbnRzLlxyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgaXNBcnJheSA9IF9kZXJlcV8oJ2lzYXJyYXknKTtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIGV4cG9ydHMuXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gaGFzQmluYXJ5O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBDaGVja3MgZm9yIGJpbmFyeSBkYXRhLlxyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIFJpZ2h0IG5vdyBvbmx5IEJ1ZmZlciBhbmQgQXJyYXlCdWZmZXIgYXJlIHN1cHBvcnRlZC4uXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGFueXRoaW5nXHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBmdW5jdGlvbiBoYXNCaW5hcnkoZGF0YSkge1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBfaGFzQmluYXJ5KG9iaikge1xuICAgICAgICAgICAgICBpZiAoIW9iaikgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICAgIGlmIChnbG9iYWwuQnVmZmVyICYmIGdsb2JhbC5CdWZmZXIuaXNCdWZmZXIgJiYgZ2xvYmFsLkJ1ZmZlci5pc0J1ZmZlcihvYmopIHx8IGdsb2JhbC5BcnJheUJ1ZmZlciAmJiBvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBnbG9iYWwuQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iIHx8IGdsb2JhbC5GaWxlICYmIG9iaiBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgaWYgKF9oYXNCaW5hcnkob2JqW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmopIHtcbiAgICAgICAgICAgICAgICAvLyBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9BdXRvbWF0dGljL2hhcy1iaW5hcnkvcHVsbC80XG4gICAgICAgICAgICAgICAgaWYgKG9iai50b0pTT04gJiYgJ2Z1bmN0aW9uJyA9PSB0eXBlb2Ygb2JqLnRvSlNPTikge1xuICAgICAgICAgICAgICAgICAgb2JqID0gb2JqLnRvSlNPTigpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIF9oYXNCaW5hcnkob2JqW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9oYXNCaW5hcnkoZGF0YSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwgeyBcImlzYXJyYXlcIjogMzMgfV0sIDMxOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1vZHVsZSBleHBvcnRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogTG9naWMgYm9ycm93ZWQgZnJvbSBNb2Rlcm5penI6XHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiAgIC0gaHR0cHM6Ly9naXRodWIuY29tL01vZGVybml6ci9Nb2Rlcm5penIvYmxvYi9tYXN0ZXIvZmVhdHVyZS1kZXRlY3RzL2NvcnMuanNcclxuICAgICAgICAgKi9cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJiAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgLy8gaWYgWE1MSHR0cCBzdXBwb3J0IGlzIGRpc2FibGVkIGluIElFIHRoZW4gaXQgd2lsbCB0aHJvd1xuICAgICAgICAgIC8vIHdoZW4gdHJ5aW5nIHRvIGNyZWF0ZVxuICAgICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sIHt9XSwgMzI6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgdmFyIGluZGV4T2YgPSBbXS5pbmRleE9mO1xuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyciwgb2JqKSB7XG4gICAgICAgICAgaWYgKGluZGV4T2YpIHJldHVybiBhcnIuaW5kZXhPZihvYmopO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoYXJyW2ldID09PSBvYmopIHJldHVybiBpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDMzOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xuICAgICAgICB9O1xuICAgICAgfSwge31dLCAzNDogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKiEgSlNPTiB2My4zLjIgfCBodHRwOi8vYmVzdGllanMuZ2l0aHViLmlvL2pzb24zIHwgQ29weXJpZ2h0IDIwMTItMjAxNCwgS2l0IENhbWJyaWRnZSB8IGh0dHA6Ly9raXQubWl0LWxpY2Vuc2Uub3JnICovXG4gICAgICAgICAgOyhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBEZXRlY3QgdGhlIGBkZWZpbmVgIGZ1bmN0aW9uIGV4cG9zZWQgYnkgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLiBUaGVcbiAgICAgICAgICAgIC8vIHN0cmljdCBgZGVmaW5lYCBjaGVjayBpcyBuZWNlc3NhcnkgZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBgci5qc2AuXG4gICAgICAgICAgICB2YXIgaXNMb2FkZXIgPSB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZDtcblxuICAgICAgICAgICAgLy8gQSBzZXQgb2YgdHlwZXMgdXNlZCB0byBkaXN0aW5ndWlzaCBvYmplY3RzIGZyb20gcHJpbWl0aXZlcy5cbiAgICAgICAgICAgIHZhciBvYmplY3RUeXBlcyA9IHtcbiAgICAgICAgICAgICAgXCJmdW5jdGlvblwiOiB0cnVlLFxuICAgICAgICAgICAgICBcIm9iamVjdFwiOiB0cnVlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgdGhlIGBleHBvcnRzYCBvYmplY3QgZXhwb3NlZCBieSBDb21tb25KUyBpbXBsZW1lbnRhdGlvbnMuXG4gICAgICAgICAgICB2YXIgZnJlZUV4cG9ydHMgPSBvYmplY3RUeXBlc1t0eXBlb2YgZXhwb3J0c10gJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4gICAgICAgICAgICAvLyBVc2UgdGhlIGBnbG9iYWxgIG9iamVjdCBleHBvc2VkIGJ5IE5vZGUgKGluY2x1ZGluZyBCcm93c2VyaWZ5IHZpYVxuICAgICAgICAgICAgLy8gYGluc2VydC1tb2R1bGUtZ2xvYmFsc2ApLCBOYXJ3aGFsLCBhbmQgUmluZ28gYXMgdGhlIGRlZmF1bHQgY29udGV4dCxcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgYHdpbmRvd2Agb2JqZWN0IGluIGJyb3dzZXJzLiBSaGlubyBleHBvcnRzIGEgYGdsb2JhbGAgZnVuY3Rpb25cbiAgICAgICAgICAgIC8vIGluc3RlYWQuXG4gICAgICAgICAgICB2YXIgcm9vdCA9IG9iamVjdFR5cGVzW3R5cGVvZiB3aW5kb3ddICYmIHdpbmRvdyB8fCB0aGlzLFxuICAgICAgICAgICAgICAgIGZyZWVHbG9iYWwgPSBmcmVlRXhwb3J0cyAmJiBvYmplY3RUeXBlc1t0eXBlb2YgbW9kdWxlXSAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiB0eXBlb2YgZ2xvYmFsID09IFwib2JqZWN0XCIgJiYgZ2xvYmFsO1xuXG4gICAgICAgICAgICBpZiAoZnJlZUdsb2JhbCAmJiAoZnJlZUdsb2JhbFtcImdsb2JhbFwiXSA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsW1wid2luZG93XCJdID09PSBmcmVlR2xvYmFsIHx8IGZyZWVHbG9iYWxbXCJzZWxmXCJdID09PSBmcmVlR2xvYmFsKSkge1xuICAgICAgICAgICAgICByb290ID0gZnJlZUdsb2JhbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHVibGljOiBJbml0aWFsaXplcyBKU09OIDMgdXNpbmcgdGhlIGdpdmVuIGBjb250ZXh0YCBvYmplY3QsIGF0dGFjaGluZyB0aGVcbiAgICAgICAgICAgIC8vIGBzdHJpbmdpZnlgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucyB0byB0aGUgc3BlY2lmaWVkIGBleHBvcnRzYCBvYmplY3QuXG4gICAgICAgICAgICBmdW5jdGlvbiBydW5JbkNvbnRleHQoY29udGV4dCwgZXhwb3J0cykge1xuICAgICAgICAgICAgICBjb250ZXh0IHx8IChjb250ZXh0ID0gcm9vdFtcIk9iamVjdFwiXSgpKTtcbiAgICAgICAgICAgICAgZXhwb3J0cyB8fCAoZXhwb3J0cyA9IHJvb3RbXCJPYmplY3RcIl0oKSk7XG5cbiAgICAgICAgICAgICAgLy8gTmF0aXZlIGNvbnN0cnVjdG9yIGFsaWFzZXMuXG4gICAgICAgICAgICAgIHZhciBOdW1iZXIgPSBjb250ZXh0W1wiTnVtYmVyXCJdIHx8IHJvb3RbXCJOdW1iZXJcIl0sXG4gICAgICAgICAgICAgICAgICBTdHJpbmcgPSBjb250ZXh0W1wiU3RyaW5nXCJdIHx8IHJvb3RbXCJTdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgICBPYmplY3QgPSBjb250ZXh0W1wiT2JqZWN0XCJdIHx8IHJvb3RbXCJPYmplY3RcIl0sXG4gICAgICAgICAgICAgICAgICBEYXRlID0gY29udGV4dFtcIkRhdGVcIl0gfHwgcm9vdFtcIkRhdGVcIl0sXG4gICAgICAgICAgICAgICAgICBTeW50YXhFcnJvciA9IGNvbnRleHRbXCJTeW50YXhFcnJvclwiXSB8fCByb290W1wiU3ludGF4RXJyb3JcIl0sXG4gICAgICAgICAgICAgICAgICBUeXBlRXJyb3IgPSBjb250ZXh0W1wiVHlwZUVycm9yXCJdIHx8IHJvb3RbXCJUeXBlRXJyb3JcIl0sXG4gICAgICAgICAgICAgICAgICBNYXRoID0gY29udGV4dFtcIk1hdGhcIl0gfHwgcm9vdFtcIk1hdGhcIl0sXG4gICAgICAgICAgICAgICAgICBuYXRpdmVKU09OID0gY29udGV4dFtcIkpTT05cIl0gfHwgcm9vdFtcIkpTT05cIl07XG5cbiAgICAgICAgICAgICAgLy8gRGVsZWdhdGUgdG8gdGhlIG5hdGl2ZSBgc3RyaW5naWZ5YCBhbmQgYHBhcnNlYCBpbXBsZW1lbnRhdGlvbnMuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgbmF0aXZlSlNPTiA9PSBcIm9iamVjdFwiICYmIG5hdGl2ZUpTT04pIHtcbiAgICAgICAgICAgICAgICBleHBvcnRzLnN0cmluZ2lmeSA9IG5hdGl2ZUpTT04uc3RyaW5naWZ5O1xuICAgICAgICAgICAgICAgIGV4cG9ydHMucGFyc2UgPSBuYXRpdmVKU09OLnBhcnNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gQ29udmVuaWVuY2UgYWxpYXNlcy5cbiAgICAgICAgICAgICAgdmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZSxcbiAgICAgICAgICAgICAgICAgIGdldENsYXNzID0gb2JqZWN0UHJvdG8udG9TdHJpbmcsXG4gICAgICAgICAgICAgICAgICBpc1Byb3BlcnR5LFxuICAgICAgICAgICAgICAgICAgZm9yRWFjaCxcbiAgICAgICAgICAgICAgICAgIHVuZGVmO1xuXG4gICAgICAgICAgICAgIC8vIFRlc3QgdGhlIGBEYXRlI2dldFVUQypgIG1ldGhvZHMuIEJhc2VkIG9uIHdvcmsgYnkgQFlhZmZsZS5cbiAgICAgICAgICAgICAgdmFyIGlzRXh0ZW5kZWQgPSBuZXcgRGF0ZSgtMzUwOTgyNzMzNDU3MzI5Mik7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGBnZXRVVENGdWxsWWVhcmAsIGBNb250aGAsIGFuZCBgRGF0ZWAgbWV0aG9kcyByZXR1cm4gbm9uc2Vuc2ljYWxcbiAgICAgICAgICAgICAgICAvLyByZXN1bHRzIGZvciBjZXJ0YWluIGRhdGVzIGluIE9wZXJhID49IDEwLjUzLlxuICAgICAgICAgICAgICAgIGlzRXh0ZW5kZWQgPSBpc0V4dGVuZGVkLmdldFVUQ0Z1bGxZZWFyKCkgPT0gLTEwOTI1MiAmJiBpc0V4dGVuZGVkLmdldFVUQ01vbnRoKCkgPT09IDAgJiYgaXNFeHRlbmRlZC5nZXRVVENEYXRlKCkgPT09IDEgJiZcbiAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPCAyLjAuMiBzdG9yZXMgdGhlIGludGVybmFsIG1pbGxpc2Vjb25kIHRpbWUgdmFsdWUgY29ycmVjdGx5LFxuICAgICAgICAgICAgICAgIC8vIGJ1dCBjbGlwcyB0aGUgdmFsdWVzIHJldHVybmVkIGJ5IHRoZSBkYXRlIG1ldGhvZHMgdG8gdGhlIHJhbmdlIG9mXG4gICAgICAgICAgICAgICAgLy8gc2lnbmVkIDMyLWJpdCBpbnRlZ2VycyAoWy0yICoqIDMxLCAyICoqIDMxIC0gMV0pLlxuICAgICAgICAgICAgICAgIGlzRXh0ZW5kZWQuZ2V0VVRDSG91cnMoKSA9PSAxMCAmJiBpc0V4dGVuZGVkLmdldFVUQ01pbnV0ZXMoKSA9PSAzNyAmJiBpc0V4dGVuZGVkLmdldFVUQ1NlY29uZHMoKSA9PSA2ICYmIGlzRXh0ZW5kZWQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgPT0gNzA4O1xuICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG5cbiAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgd2hldGhlciB0aGUgbmF0aXZlIGBKU09OLnN0cmluZ2lmeWAgYW5kIGBwYXJzZWBcbiAgICAgICAgICAgICAgLy8gaW1wbGVtZW50YXRpb25zIGFyZSBzcGVjLWNvbXBsaWFudC4gQmFzZWQgb24gd29yayBieSBLZW4gU255ZGVyLlxuICAgICAgICAgICAgICBmdW5jdGlvbiBoYXMobmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChoYXNbbmFtZV0gIT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gY2FjaGVkIGZlYXR1cmUgdGVzdCByZXN1bHQuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gaGFzW25hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgaXNTdXBwb3J0ZWQ7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJidWctc3RyaW5nLWNoYXItaW5kZXhcIikge1xuICAgICAgICAgICAgICAgICAgLy8gSUUgPD0gNyBkb2Vzbid0IHN1cHBvcnQgYWNjZXNzaW5nIHN0cmluZyBjaGFyYWN0ZXJzIHVzaW5nIHNxdWFyZVxuICAgICAgICAgICAgICAgICAgLy8gYnJhY2tldCBub3RhdGlvbi4gSUUgOCBvbmx5IHN1cHBvcnRzIHRoaXMgZm9yIHByaW1pdGl2ZXMuXG4gICAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IFwiYVwiWzBdICE9IFwiYVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmFtZSA9PSBcImpzb25cIikge1xuICAgICAgICAgICAgICAgICAgLy8gSW5kaWNhdGVzIHdoZXRoZXIgYm90aCBgSlNPTi5zdHJpbmdpZnlgIGFuZCBgSlNPTi5wYXJzZWAgYXJlXG4gICAgICAgICAgICAgICAgICAvLyBzdXBwb3J0ZWQuXG4gICAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IGhhcyhcImpzb24tc3RyaW5naWZ5XCIpICYmIGhhcyhcImpzb24tcGFyc2VcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBzZXJpYWxpemVkID0gXCJ7XFxcImFcXFwiOlsxLHRydWUsZmFsc2UsbnVsbCxcXFwiXFxcXHUwMDAwXFxcXGJcXFxcblxcXFxmXFxcXHJcXFxcdFxcXCJdfVwiO1xuICAgICAgICAgICAgICAgICAgLy8gVGVzdCBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICAgICAgICAgICAgaWYgKG5hbWUgPT0gXCJqc29uLXN0cmluZ2lmeVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHJpbmdpZnkgPSBleHBvcnRzLnN0cmluZ2lmeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeVN1cHBvcnRlZCA9IHR5cGVvZiBzdHJpbmdpZnkgPT0gXCJmdW5jdGlvblwiICYmIGlzRXh0ZW5kZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdHJpbmdpZnlTdXBwb3J0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBBIHRlc3QgZnVuY3Rpb24gb2JqZWN0IHdpdGggYSBjdXN0b20gYHRvSlNPTmAgbWV0aG9kLlxuICAgICAgICAgICAgICAgICAgICAgICh2YWx1ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICAgIH0pLnRvSlNPTiA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnlTdXBwb3J0ZWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmlyZWZveCAzLjFiMSBhbmQgYjIgc2VyaWFsaXplIHN0cmluZywgbnVtYmVyLCBhbmQgYm9vbGVhblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJpbWl0aXZlcyBhcyBvYmplY3QgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkoMCkgPT09IFwiMFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIsIGFuZCBKU09OIDIgc2VyaWFsaXplIHdyYXBwZWQgcHJpbWl0aXZlcyBhcyBvYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBOdW1iZXIoKSkgPT09IFwiMFwiICYmIHN0cmluZ2lmeShuZXcgU3RyaW5nKCkpID09ICdcIlwiJyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgMy4xYjEsIDIgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHZhbHVlIGlzIGBudWxsYCwgYHVuZGVmaW5lZGAsIG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCBkZWZpbmUgYSBjYW5vbmljYWwgSlNPTiByZXByZXNlbnRhdGlvbiAodGhpcyBhcHBsaWVzIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvYmplY3RzIHdpdGggYHRvSlNPTmAgcHJvcGVydGllcyBhcyB3ZWxsLCAqdW5sZXNzKiB0aGV5IGFyZSBuZXN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpdGhpbiBhbiBvYmplY3Qgb3IgYXJyYXkpLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KGdldENsYXNzKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIDggc2VyaWFsaXplcyBgdW5kZWZpbmVkYCBhcyBgXCJ1bmRlZmluZWRcImAuIFNhZmFyaSA8PSA1LjEuNyBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIzIHBhc3MgdGhpcyB0ZXN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KHVuZGVmKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuNyBhbmQgRkYgMy4xYjMgdGhyb3cgYEVycm9yYHMgYW5kIGBUeXBlRXJyb3JgcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHJlc3BlY3RpdmVseSwgaWYgdGhlIHZhbHVlIGlzIG9taXR0ZWQgZW50aXJlbHkuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkoKSA9PT0gdW5kZWYgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZGIDMuMWIxLCAyIHRocm93IGFuIGVycm9yIGlmIHRoZSBnaXZlbiB2YWx1ZSBpcyBub3QgYSBudW1iZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdHJpbmcsIGFycmF5LCBvYmplY3QsIEJvb2xlYW4sIG9yIGBudWxsYCBsaXRlcmFsLiBUaGlzIGFwcGxpZXMgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9iamVjdHMgd2l0aCBjdXN0b20gYHRvSlNPTmAgbWV0aG9kcyBhcyB3ZWxsLCB1bmxlc3MgdGhleSBhcmUgbmVzdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpbnNpZGUgb2JqZWN0IG9yIGFycmF5IGxpdGVyYWxzLiBZVUkgMy4wLjBiMSBpZ25vcmVzIGN1c3RvbSBgdG9KU09OYFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWV0aG9kcyBlbnRpcmVseS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeSh2YWx1ZSkgPT09IFwiMVwiICYmIHN0cmluZ2lmeShbdmFsdWVdKSA9PSBcIlsxXVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcm90b3R5cGUgPD0gMS42LjEgc2VyaWFsaXplcyBgW3VuZGVmaW5lZF1gIGFzIGBcIltdXCJgIGluc3RlYWQgb2ZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcIltudWxsXVwiYC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmluZ2lmeShbdW5kZWZdKSA9PSBcIltudWxsXVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBZVUkgMy4wLjBiMSBmYWlscyB0byBzZXJpYWxpemUgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG51bGwpID09IFwibnVsbFwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgMiBoYWx0cyBzZXJpYWxpemF0aW9uIGlmIGFuIGFycmF5IGNvbnRhaW5zIGEgZnVuY3Rpb246XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgWzEsIHRydWUsIGdldENsYXNzLCAxXWAgc2VyaWFsaXplcyBhcyBcIlsxLHRydWUsXSxcIi4gRkYgMy4xYjNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsaWRlcyBub24tSlNPTiB2YWx1ZXMgZnJvbSBvYmplY3RzIGFuZCBhcnJheXMsIHVubGVzcyB0aGV5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWZpbmUgY3VzdG9tIGB0b0pTT05gIG1ldGhvZHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkoW3VuZGVmLCBnZXRDbGFzcywgbnVsbF0pID09IFwiW251bGwsbnVsbCxudWxsXVwiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW1wbGUgc2VyaWFsaXphdGlvbiB0ZXN0LiBGRiAzLjFiMSB1c2VzIFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hlcmUgY2hhcmFjdGVyIGVzY2FwZSBjb2RlcyBhcmUgZXhwZWN0ZWQgKGUuZy4sIGBcXGJgID0+IGBcXHUwMDA4YCkuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkoeyBcImFcIjogW3ZhbHVlLCB0cnVlLCBmYWxzZSwgbnVsbCwgXCJcXHgwMFxcYlxcblxcZlxcclxcdFwiXSB9KSA9PSBzZXJpYWxpemVkICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSBhbmQgYjIgaWdub3JlIHRoZSBgZmlsdGVyYCBhbmQgYHdpZHRoYCBhcmd1bWVudHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkobnVsbCwgdmFsdWUpID09PSBcIjFcIiAmJiBzdHJpbmdpZnkoWzEsIDJdLCBudWxsLCAxKSA9PSBcIltcXG4gMSxcXG4gMlxcbl1cIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gSlNPTiAyLCBQcm90b3R5cGUgPD0gMS43LCBhbmQgb2xkZXIgV2ViS2l0IGJ1aWxkcyBpbmNvcnJlY3RseVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2VyaWFsaXplIGV4dGVuZGVkIHllYXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC04LjY0ZTE1KSkgPT0gJ1wiLTI3MTgyMS0wNC0yMFQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LCBidXQgcmVxdWlyZWQgaW4gNS4xLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKDguNjRlMTUpKSA9PSAnXCIrMjc1NzYwLTA5LTEzVDAwOjAwOjAwLjAwMFpcIicgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpcmVmb3ggPD0gMTEuMCBpbmNvcnJlY3RseSBzZXJpYWxpemVzIHllYXJzIHByaW9yIHRvIDAgYXMgbmVnYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdXItZGlnaXQgeWVhcnMgaW5zdGVhZCBvZiBzaXgtZGlnaXQgeWVhcnMuIENyZWRpdHM6IEBZYWZmbGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdpZnkobmV3IERhdGUoLTYyMTk4NzU1MmU1KSkgPT0gJ1wiLTAwMDAwMS0wMS0wMVQwMDowMDowMC4wMDBaXCInICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTYWZhcmkgPD0gNS4xLjUgYW5kIE9wZXJhID49IDEwLjUzIGluY29ycmVjdGx5IHNlcmlhbGl6ZSBtaWxsaXNlY29uZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFsdWVzIGxlc3MgdGhhbiAxMDAwLiBDcmVkaXRzOiBAWWFmZmxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5KG5ldyBEYXRlKC0xKSkgPT0gJ1wiMTk2OS0xMi0zMVQyMzo1OTo1OS45OTlaXCInO1xuICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RyaW5naWZ5U3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlzU3VwcG9ydGVkID0gc3RyaW5naWZ5U3VwcG9ydGVkO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gVGVzdCBgSlNPTi5wYXJzZWAuXG4gICAgICAgICAgICAgICAgICBpZiAobmFtZSA9PSBcImpzb24tcGFyc2VcIikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyc2UgPSBleHBvcnRzLnBhcnNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGRiAzLjFiMSwgYjIgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYSBiYXJlIGxpdGVyYWwgaXMgcHJvdmlkZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb25mb3JtaW5nIGltcGxlbWVudGF0aW9ucyBzaG91bGQgYWxzbyBjb2VyY2UgdGhlIGluaXRpYWwgYXJndW1lbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGEgc3RyaW5nIHByaW9yIHRvIHBhcnNpbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyc2UoXCIwXCIpID09PSAwICYmICFwYXJzZShmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGxlIHBhcnNpbmcgdGVzdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwYXJzZShzZXJpYWxpemVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnNlU3VwcG9ydGVkID0gdmFsdWVbXCJhXCJdLmxlbmd0aCA9PSA1ICYmIHZhbHVlW1wiYVwiXVswXSA9PT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcnNlU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSA1LjEuMiBhbmQgRkYgMy4xYjEgYWxsb3cgdW5lc2NhcGVkIHRhYnMgaW4gc3RyaW5ncy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlU3VwcG9ydGVkID0gIXBhcnNlKCdcIlxcdFwiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgNC4wIGFuZCA0LjAuMSBhbGxvdyBsZWFkaW5nIGArYCBzaWducyBhbmQgbGVhZGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWNpbWFsIHBvaW50cy4gRkYgNC4wLCA0LjAuMSwgYW5kIElFIDktMTAgYWxzbyBhbGxvd1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjZXJ0YWluIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMDFcIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJzZVN1cHBvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRkYgNC4wLCA0LjAuMSwgYW5kIFJoaW5vIDEuN1IzLVI0IGFsbG93IHRyYWlsaW5nIGRlY2ltYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gcG9pbnRzLiBUaGVzZSBlbnZpcm9ubWVudHMsIGFsb25nIHdpdGggRkYgMy4xYjEgYW5kIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsc28gYWxsb3cgdHJhaWxpbmcgY29tbWFzIGluIEpTT04gb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IHBhcnNlKFwiMS5cIikgIT09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChleGNlcHRpb24pIHt9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZVN1cHBvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpc1N1cHBvcnRlZCA9IHBhcnNlU3VwcG9ydGVkO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gaGFzW25hbWVdID0gISFpc1N1cHBvcnRlZDtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmICghaGFzKFwianNvblwiKSkge1xuICAgICAgICAgICAgICAgIC8vIENvbW1vbiBgW1tDbGFzc11dYCBuYW1lIGFsaWFzZXMuXG4gICAgICAgICAgICAgICAgdmFyIGZ1bmN0aW9uQ2xhc3MgPSBcIltvYmplY3QgRnVuY3Rpb25dXCIsXG4gICAgICAgICAgICAgICAgICAgIGRhdGVDbGFzcyA9IFwiW29iamVjdCBEYXRlXVwiLFxuICAgICAgICAgICAgICAgICAgICBudW1iZXJDbGFzcyA9IFwiW29iamVjdCBOdW1iZXJdXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0cmluZ0NsYXNzID0gXCJbb2JqZWN0IFN0cmluZ11cIixcbiAgICAgICAgICAgICAgICAgICAgYXJyYXlDbGFzcyA9IFwiW29iamVjdCBBcnJheV1cIixcbiAgICAgICAgICAgICAgICAgICAgYm9vbGVhbkNsYXNzID0gXCJbb2JqZWN0IEJvb2xlYW5dXCI7XG5cbiAgICAgICAgICAgICAgICAvLyBEZXRlY3QgaW5jb21wbGV0ZSBzdXBwb3J0IGZvciBhY2Nlc3Npbmcgc3RyaW5nIGNoYXJhY3RlcnMgYnkgaW5kZXguXG4gICAgICAgICAgICAgICAgdmFyIGNoYXJJbmRleEJ1Z2d5ID0gaGFzKFwiYnVnLXN0cmluZy1jaGFyLWluZGV4XCIpO1xuXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGFkZGl0aW9uYWwgdXRpbGl0eSBtZXRob2RzIGlmIHRoZSBgRGF0ZWAgbWV0aG9kcyBhcmUgYnVnZ3kuXG4gICAgICAgICAgICAgICAgaWYgKCFpc0V4dGVuZGVkKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICAgICAgICAgICAgICAgICAgLy8gQSBtYXBwaW5nIGJldHdlZW4gdGhlIG1vbnRocyBvZiB0aGUgeWVhciBhbmQgdGhlIG51bWJlciBvZiBkYXlzIGJldHdlZW5cbiAgICAgICAgICAgICAgICAgIC8vIEphbnVhcnkgMXN0IGFuZCB0aGUgZmlyc3Qgb2YgdGhlIHJlc3BlY3RpdmUgbW9udGguXG4gICAgICAgICAgICAgICAgICB2YXIgTW9udGhzID0gWzAsIDMxLCA1OSwgOTAsIDEyMCwgMTUxLCAxODEsIDIxMiwgMjQzLCAyNzMsIDMwNCwgMzM0XTtcbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2YgZGF5cyBiZXR3ZWVuIHRoZSBVbml4IGVwb2NoIGFuZCB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIGZpcnN0IGRheSBvZiB0aGUgZ2l2ZW4gbW9udGguXG4gICAgICAgICAgICAgICAgICB2YXIgZ2V0RGF5ID0gZnVuY3Rpb24gZ2V0RGF5KHllYXIsIG1vbnRoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBNb250aHNbbW9udGhdICsgMzY1ICogKHllYXIgLSAxOTcwKSArIGZsb29yKCh5ZWFyIC0gMTk2OSArIChtb250aCA9ICsobW9udGggPiAxKSkpIC8gNCkgLSBmbG9vcigoeWVhciAtIDE5MDEgKyBtb250aCkgLyAxMDApICsgZmxvb3IoKHllYXIgLSAxNjAxICsgbW9udGgpIC8gNDAwKTtcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IERldGVybWluZXMgaWYgYSBwcm9wZXJ0eSBpcyBhIGRpcmVjdCBwcm9wZXJ0eSBvZiB0aGUgZ2l2ZW5cbiAgICAgICAgICAgICAgICAvLyBvYmplY3QuIERlbGVnYXRlcyB0byB0aGUgbmF0aXZlIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIG1ldGhvZC5cbiAgICAgICAgICAgICAgICBpZiAoIShpc1Byb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtZW1iZXJzID0ge30sXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChtZW1iZXJzLl9fcHJvdG9fXyA9IG51bGwsIG1lbWJlcnMuX19wcm90b19fID0ge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSAqcHJvdG8qIHByb3BlcnR5IGNhbm5vdCBiZSBzZXQgbXVsdGlwbGUgdGltZXMgaW4gcmVjZW50XG4gICAgICAgICAgICAgICAgICAgICAgLy8gdmVyc2lvbnMgb2YgRmlyZWZveCBhbmQgU2VhTW9ua2V5LlxuICAgICAgICAgICAgICAgICAgICAgIFwidG9TdHJpbmdcIjogMVxuICAgICAgICAgICAgICAgICAgICB9LCBtZW1iZXJzKS50b1N0cmluZyAhPSBnZXRDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFNhZmFyaSA8PSAyLjAuMyBkb2Vzbid0IGltcGxlbWVudCBgT2JqZWN0I2hhc093blByb3BlcnR5YCwgYnV0XG4gICAgICAgICAgICAgICAgICAgICAgLy8gc3VwcG9ydHMgdGhlIG11dGFibGUgKnByb3RvKiBwcm9wZXJ0eS5cbiAgICAgICAgICAgICAgICAgICAgICBpc1Byb3BlcnR5ID0gZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDYXB0dXJlIGFuZCBicmVhayB0aGUgb2JqZWN0J3MgcHJvdG90eXBlIGNoYWluIChzZWUgc2VjdGlvbiA4LjYuMlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgdGhlIEVTIDUuMSBzcGVjKS4gVGhlIHBhcmVudGhlc2l6ZWQgZXhwcmVzc2lvbiBwcmV2ZW50cyBhblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5zYWZlIHRyYW5zZm9ybWF0aW9uIGJ5IHRoZSBDbG9zdXJlIENvbXBpbGVyLlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gdGhpcy5fX3Byb3RvX18sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gKHByb3BlcnR5IGluICh0aGlzLl9fcHJvdG9fXyA9IG51bGwsIHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHByb3RvdHlwZSBjaGFpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19wcm90b19fID0gb3JpZ2luYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ2FwdHVyZSBhIHJlZmVyZW5jZSB0byB0aGUgdG9wLWxldmVsIGBPYmplY3RgIGNvbnN0cnVjdG9yLlxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yID0gbWVtYmVycy5jb25zdHJ1Y3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBVc2UgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgdG8gc2ltdWxhdGUgYE9iamVjdCNoYXNPd25Qcm9wZXJ0eWAgaW5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBvdGhlciBlbnZpcm9ubWVudHMuXG4gICAgICAgICAgICAgICAgICAgICAgaXNQcm9wZXJ0eSA9IGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9ICh0aGlzLmNvbnN0cnVjdG9yIHx8IGNvbnN0cnVjdG9yKS5wcm90b3R5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkgaW4gdGhpcyAmJiAhKHByb3BlcnR5IGluIHBhcmVudCAmJiB0aGlzW3Byb3BlcnR5XSA9PT0gcGFyZW50W3Byb3BlcnR5XSk7XG4gICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzUHJvcGVydHkuY2FsbCh0aGlzLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBOb3JtYWxpemVzIHRoZSBgZm9yLi4uaW5gIGl0ZXJhdGlvbiBhbGdvcml0aG0gYWNyb3NzXG4gICAgICAgICAgICAgICAgLy8gZW52aXJvbm1lbnRzLiBFYWNoIGVudW1lcmF0ZWQga2V5IGlzIHlpZWxkZWQgdG8gYSBgY2FsbGJhY2tgIGZ1bmN0aW9uLlxuICAgICAgICAgICAgICAgIGZvckVhY2ggPSBmdW5jdGlvbiAob2JqZWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgdmFyIHNpemUgPSAwLFxuICAgICAgICAgICAgICAgICAgICAgIFByb3BlcnRpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgbWVtYmVycyxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTtcblxuICAgICAgICAgICAgICAgICAgLy8gVGVzdHMgZm9yIGJ1Z3MgaW4gdGhlIGN1cnJlbnQgZW52aXJvbm1lbnQncyBgZm9yLi4uaW5gIGFsZ29yaXRobS4gVGhlXG4gICAgICAgICAgICAgICAgICAvLyBgdmFsdWVPZmAgcHJvcGVydHkgaW5oZXJpdHMgdGhlIG5vbi1lbnVtZXJhYmxlIGZsYWcgZnJvbVxuICAgICAgICAgICAgICAgICAgLy8gYE9iamVjdC5wcm90b3R5cGVgIGluIG9sZGVyIHZlcnNpb25zIG9mIElFLCBOZXRzY2FwZSwgYW5kIE1vemlsbGEuXG4gICAgICAgICAgICAgICAgICAoUHJvcGVydGllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZU9mID0gMDtcbiAgICAgICAgICAgICAgICAgIH0pLnByb3RvdHlwZS52YWx1ZU9mID0gMDtcblxuICAgICAgICAgICAgICAgICAgLy8gSXRlcmF0ZSBvdmVyIGEgbmV3IGluc3RhbmNlIG9mIHRoZSBgUHJvcGVydGllc2AgY2xhc3MuXG4gICAgICAgICAgICAgICAgICBtZW1iZXJzID0gbmV3IFByb3BlcnRpZXMoKTtcbiAgICAgICAgICAgICAgICAgIGZvciAocHJvcGVydHkgaW4gbWVtYmVycykge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZ25vcmUgYWxsIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNQcm9wZXJ0eS5jYWxsKG1lbWJlcnMsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgIHNpemUrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgUHJvcGVydGllcyA9IG1lbWJlcnMgPSBudWxsO1xuXG4gICAgICAgICAgICAgICAgICAvLyBOb3JtYWxpemUgdGhlIGl0ZXJhdGlvbiBhbGdvcml0aG0uXG4gICAgICAgICAgICAgICAgICBpZiAoIXNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQSBsaXN0IG9mIG5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgaW5oZXJpdGVkIGZyb20gYE9iamVjdC5wcm90b3R5cGVgLlxuICAgICAgICAgICAgICAgICAgICBtZW1iZXJzID0gW1widmFsdWVPZlwiLCBcInRvU3RyaW5nXCIsIFwidG9Mb2NhbGVTdHJpbmdcIiwgXCJwcm9wZXJ0eUlzRW51bWVyYWJsZVwiLCBcImlzUHJvdG90eXBlT2ZcIiwgXCJoYXNPd25Qcm9wZXJ0eVwiLCBcImNvbnN0cnVjdG9yXCJdO1xuICAgICAgICAgICAgICAgICAgICAvLyBJRSA8PSA4LCBNb3ppbGxhIDEuMCwgYW5kIE5ldHNjYXBlIDYuMiBpZ25vcmUgc2hhZG93ZWQgbm9uLWVudW1lcmFibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvcGVydGllcy5cbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgaGFzUHJvcGVydHkgPSAhaXNGdW5jdGlvbiAmJiB0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yICE9IFwiZnVuY3Rpb25cIiAmJiBvYmplY3RUeXBlc1t0eXBlb2Ygb2JqZWN0Lmhhc093blByb3BlcnR5XSAmJiBvYmplY3QuaGFzT3duUHJvcGVydHkgfHwgaXNQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gR2Vja28gPD0gMS4wIGVudW1lcmF0ZXMgdGhlIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyB1bmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2VydGFpbiBjb25kaXRpb25zOyBJRSBkb2VzIG5vdC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaGFzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGludm9rZSB0aGUgY2FsbGJhY2sgZm9yIGVhY2ggbm9uLWVudW1lcmFibGUgcHJvcGVydHkuXG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZW5ndGggPSBtZW1iZXJzLmxlbmd0aDsgcHJvcGVydHkgPSBtZW1iZXJzWy0tbGVuZ3RoXTsgaGFzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSAmJiBjYWxsYmFjayhwcm9wZXJ0eSkpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzaXplID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2FmYXJpIDw9IDIuMC40IGVudW1lcmF0ZXMgc2hhZG93ZWQgcHJvcGVydGllcyB0d2ljZS5cbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgc2V0IG9mIGl0ZXJhdGVkIHByb3BlcnRpZXMuXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIG1lbWJlcnMgPSB7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaXNGdW5jdGlvbiA9IGdldENsYXNzLmNhbGwob2JqZWN0KSA9PSBmdW5jdGlvbkNsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3RvcmUgZWFjaCBwcm9wZXJ0eSBuYW1lIHRvIHByZXZlbnQgZG91YmxlIGVudW1lcmF0aW9uLiBUaGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBwcm90b3R5cGVgIHByb3BlcnR5IG9mIGZ1bmN0aW9ucyBpcyBub3QgZW51bWVyYXRlZCBkdWUgdG8gY3Jvc3MtXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbnZpcm9ubWVudCBpbmNvbnNpc3RlbmNpZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShpc0Z1bmN0aW9uICYmIHByb3BlcnR5ID09IFwicHJvdG90eXBlXCIpICYmICFpc1Byb3BlcnR5LmNhbGwobWVtYmVycywgcHJvcGVydHkpICYmIChtZW1iZXJzW3Byb3BlcnR5XSA9IDEpICYmIGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhwcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gYnVncyBkZXRlY3RlZDsgdXNlIHRoZSBzdGFuZGFyZCBgZm9yLi4uaW5gIGFsZ29yaXRobS5cbiAgICAgICAgICAgICAgICAgICAgZm9yRWFjaCA9IGZ1bmN0aW9uIChvYmplY3QsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGlzRnVuY3Rpb24gPSBnZXRDbGFzcy5jYWxsKG9iamVjdCkgPT0gZnVuY3Rpb25DbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29uc3RydWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKGlzRnVuY3Rpb24gJiYgcHJvcGVydHkgPT0gXCJwcm90b3R5cGVcIikgJiYgaXNQcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpICYmICEoaXNDb25zdHJ1Y3RvciA9IHByb3BlcnR5ID09PSBcImNvbnN0cnVjdG9yXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gTWFudWFsbHkgaW52b2tlIHRoZSBjYWxsYmFjayBmb3IgdGhlIGBjb25zdHJ1Y3RvcmAgcHJvcGVydHkgZHVlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgLy8gY3Jvc3MtZW52aXJvbm1lbnQgaW5jb25zaXN0ZW5jaWVzLlxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbnN0cnVjdG9yIHx8IGlzUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5ID0gXCJjb25zdHJ1Y3RvclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socHJvcGVydHkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiBmb3JFYWNoKG9iamVjdCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyBQdWJsaWM6IFNlcmlhbGl6ZXMgYSBKYXZhU2NyaXB0IGB2YWx1ZWAgYXMgYSBKU09OIHN0cmluZy4gVGhlIG9wdGlvbmFsXG4gICAgICAgICAgICAgICAgLy8gYGZpbHRlcmAgYXJndW1lbnQgbWF5IHNwZWNpZnkgZWl0aGVyIGEgZnVuY3Rpb24gdGhhdCBhbHRlcnMgaG93IG9iamVjdCBhbmRcbiAgICAgICAgICAgICAgICAvLyBhcnJheSBtZW1iZXJzIGFyZSBzZXJpYWxpemVkLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIGFuZCBudW1iZXJzIHRoYXRcbiAgICAgICAgICAgICAgICAvLyBpbmRpY2F0ZXMgd2hpY2ggcHJvcGVydGllcyBzaG91bGQgYmUgc2VyaWFsaXplZC4gVGhlIG9wdGlvbmFsIGB3aWR0aGBcbiAgICAgICAgICAgICAgICAvLyBhcmd1bWVudCBtYXkgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIG51bWJlciB0aGF0IHNwZWNpZmllcyB0aGUgaW5kZW50YXRpb25cbiAgICAgICAgICAgICAgICAvLyBsZXZlbCBvZiB0aGUgb3V0cHV0LlxuICAgICAgICAgICAgICAgIGlmICghaGFzKFwianNvbi1zdHJpbmdpZnlcIikpIHtcbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHRoZWlyIGVzY2FwZWQgZXF1aXZhbGVudHMuXG4gICAgICAgICAgICAgICAgICB2YXIgRXNjYXBlcyA9IHtcbiAgICAgICAgICAgICAgICAgICAgOTI6IFwiXFxcXFxcXFxcIixcbiAgICAgICAgICAgICAgICAgICAgMzQ6ICdcXFxcXCInLFxuICAgICAgICAgICAgICAgICAgICA4OiBcIlxcXFxiXCIsXG4gICAgICAgICAgICAgICAgICAgIDEyOiBcIlxcXFxmXCIsXG4gICAgICAgICAgICAgICAgICAgIDEwOiBcIlxcXFxuXCIsXG4gICAgICAgICAgICAgICAgICAgIDEzOiBcIlxcXFxyXCIsXG4gICAgICAgICAgICAgICAgICAgIDk6IFwiXFxcXHRcIlxuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IENvbnZlcnRzIGB2YWx1ZWAgaW50byBhIHplcm8tcGFkZGVkIHN0cmluZyBzdWNoIHRoYXQgaXRzXG4gICAgICAgICAgICAgICAgICAvLyBsZW5ndGggaXMgYXQgbGVhc3QgZXF1YWwgdG8gYHdpZHRoYC4gVGhlIGB3aWR0aGAgbXVzdCBiZSA8PSA2LlxuICAgICAgICAgICAgICAgICAgdmFyIGxlYWRpbmdaZXJvZXMgPSBcIjAwMDAwMFwiO1xuICAgICAgICAgICAgICAgICAgdmFyIHRvUGFkZGVkU3RyaW5nID0gZnVuY3Rpb24gdG9QYWRkZWRTdHJpbmcod2lkdGgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBgfHwgMGAgZXhwcmVzc2lvbiBpcyBuZWNlc3NhcnkgdG8gd29yayBhcm91bmQgYSBidWcgaW5cbiAgICAgICAgICAgICAgICAgICAgLy8gT3BlcmEgPD0gNy41NHUyIHdoZXJlIGAwID09IC0wYCwgYnV0IGBTdHJpbmcoLTApICE9PSBcIjBcImAuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAobGVhZGluZ1plcm9lcyArICh2YWx1ZSB8fCAwKSkuc2xpY2UoLXdpZHRoKTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBEb3VibGUtcXVvdGVzIGEgc3RyaW5nIGB2YWx1ZWAsIHJlcGxhY2luZyBhbGwgQVNDSUkgY29udHJvbFxuICAgICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVycyAoY2hhcmFjdGVycyB3aXRoIGNvZGUgdW5pdCB2YWx1ZXMgYmV0d2VlbiAwIGFuZCAzMSkgd2l0aFxuICAgICAgICAgICAgICAgICAgLy8gdGhlaXIgZXNjYXBlZCBlcXVpdmFsZW50cy4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIGBRdW90ZSh2YWx1ZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjMuXG4gICAgICAgICAgICAgICAgICB2YXIgdW5pY29kZVByZWZpeCA9IFwiXFxcXHUwMFwiO1xuICAgICAgICAgICAgICAgICAgdmFyIHF1b3RlID0gZnVuY3Rpb24gcXVvdGUodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9ICdcIicsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSB2YWx1ZS5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VDaGFySW5kZXggPSAhY2hhckluZGV4QnVnZ3kgfHwgbGVuZ3RoID4gMTA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzeW1ib2xzID0gdXNlQ2hhckluZGV4ICYmIChjaGFySW5kZXhCdWdneSA/IHZhbHVlLnNwbGl0KFwiXCIpIDogdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKDsgaW5kZXggPCBsZW5ndGg7IGluZGV4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgY2hhckNvZGUgPSB2YWx1ZS5jaGFyQ29kZUF0KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgY2hhcmFjdGVyIGlzIGEgY29udHJvbCBjaGFyYWN0ZXIsIGFwcGVuZCBpdHMgVW5pY29kZSBvclxuICAgICAgICAgICAgICAgICAgICAgIC8vIHNob3J0aGFuZCBlc2NhcGUgc2VxdWVuY2U7IG90aGVyd2lzZSwgYXBwZW5kIHRoZSBjaGFyYWN0ZXIgYXMtaXMuXG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA4OmNhc2UgOTpjYXNlIDEwOmNhc2UgMTI6Y2FzZSAxMzpjYXNlIDM0OmNhc2UgOTI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBFc2NhcGVzW2NoYXJDb2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPCAzMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB1bmljb2RlUHJlZml4ICsgdG9QYWRkZWRTdHJpbmcoMiwgY2hhckNvZGUudG9TdHJpbmcoMTYpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdXNlQ2hhckluZGV4ID8gc3ltYm9sc1tpbmRleF0gOiB2YWx1ZS5jaGFyQXQoaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ICsgJ1wiJztcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSBzZXJpYWxpemVzIGFuIG9iamVjdC4gSW1wbGVtZW50cyB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIGBTdHIoa2V5LCBob2xkZXIpYCwgYEpPKHZhbHVlKWAsIGFuZCBgSkEodmFsdWUpYCBvcGVyYXRpb25zLlxuICAgICAgICAgICAgICAgICAgdmFyIHNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZShwcm9wZXJ0eSwgb2JqZWN0LCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB2YWx1ZSwgY2xhc3NOYW1lLCB5ZWFyLCBtb250aCwgZGF0ZSwgdGltZSwgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIG1pbGxpc2Vjb25kcywgcmVzdWx0cywgZWxlbWVudCwgaW5kZXgsIGxlbmd0aCwgcHJlZml4LCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gTmVjZXNzYXJ5IGZvciBob3N0IG9iamVjdCBzdXBwb3J0LlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7fVxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwib2JqZWN0XCIgJiYgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWUgPSBnZXRDbGFzcy5jYWxsKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGRhdGVDbGFzcyAmJiAhaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID4gLTEgLyAwICYmIHZhbHVlIDwgMSAvIDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGF0ZXMgYXJlIHNlcmlhbGl6ZWQgYWNjb3JkaW5nIHRvIHRoZSBgRGF0ZSN0b0pTT05gIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQgaW4gRVMgNS4xIHNlY3Rpb24gMTUuOS41LjQ0LiBTZWUgc2VjdGlvbiAxNS45LjEuMTVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRoZSBJU08gODYwMSBkYXRlIHRpbWUgc3RyaW5nIGZvcm1hdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldERheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE1hbnVhbGx5IGNvbXB1dGUgdGhlIHllYXIsIG1vbnRoLCBkYXRlLCBob3VycywgbWludXRlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZWNvbmRzLCBhbmQgbWlsbGlzZWNvbmRzIGlmIHRoZSBgZ2V0VVRDKmAgbWV0aG9kcyBhcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBidWdneS4gQWRhcHRlZCBmcm9tIEBZYWZmbGUncyBgZGF0ZS1zaGltYCBwcm9qZWN0LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSBmbG9vcih2YWx1ZSAvIDg2NGU1KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHllYXIgPSBmbG9vcihkYXRlIC8gMzY1LjI0MjUpICsgMTk3MCAtIDE7IGdldERheSh5ZWFyICsgMSwgMCkgPD0gZGF0ZTsgeWVhcisrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKG1vbnRoID0gZmxvb3IoKGRhdGUgLSBnZXREYXkoeWVhciwgMCkpIC8gMzAuNDIpOyBnZXREYXkoeWVhciwgbW9udGggKyAxKSA8PSBkYXRlOyBtb250aCsrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRlID0gMSArIGRhdGUgLSBnZXREYXkoeWVhciwgbW9udGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBgdGltZWAgdmFsdWUgc3BlY2lmaWVzIHRoZSB0aW1lIHdpdGhpbiB0aGUgZGF5IChzZWUgRVNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyA1LjEgc2VjdGlvbiAxNS45LjEuMikuIFRoZSBmb3JtdWxhIGAoQSAlIEIgKyBCKSAlIEJgIGlzIHVzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0byBjb21wdXRlIGBBIG1vZHVsbyBCYCwgYXMgdGhlIGAlYCBvcGVyYXRvciBkb2VzIG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvcnJlc3BvbmQgdG8gdGhlIGBtb2R1bG9gIG9wZXJhdGlvbiBmb3IgbmVnYXRpdmUgbnVtYmVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lID0gKHZhbHVlICUgODY0ZTUgKyA4NjRlNSkgJSA4NjRlNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMsIGFuZCBtaWxsaXNlY29uZHMgYXJlIG9idGFpbmVkIGJ5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVjb21wb3NpbmcgdGhlIHRpbWUgd2l0aGluIHRoZSBkYXkuIFNlZSBzZWN0aW9uIDE1LjkuMS4xMC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBob3VycyA9IGZsb29yKHRpbWUgLyAzNmU1KSAlIDI0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBmbG9vcih0aW1lIC8gNmU0KSAlIDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY29uZHMgPSBmbG9vcih0aW1lIC8gMWUzKSAlIDYwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbGxpc2Vjb25kcyA9IHRpbWUgJSAxZTM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeWVhciA9IHZhbHVlLmdldFVUQ0Z1bGxZZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9udGggPSB2YWx1ZS5nZXRVVENNb250aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGUgPSB2YWx1ZS5nZXRVVENEYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG91cnMgPSB2YWx1ZS5nZXRVVENIb3VycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSB2YWx1ZS5nZXRVVENNaW51dGVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vjb25kcyA9IHZhbHVlLmdldFVUQ1NlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaWxsaXNlY29uZHMgPSB2YWx1ZS5nZXRVVENNaWxsaXNlY29uZHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgZXh0ZW5kZWQgeWVhcnMgY29ycmVjdGx5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9ICh5ZWFyIDw9IDAgfHwgeWVhciA+PSAxZTQgPyAoeWVhciA8IDAgPyBcIi1cIiA6IFwiK1wiKSArIHRvUGFkZGVkU3RyaW5nKDYsIHllYXIgPCAwID8gLXllYXIgOiB5ZWFyKSA6IHRvUGFkZGVkU3RyaW5nKDQsIHllYXIpKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbW9udGggKyAxKSArIFwiLVwiICsgdG9QYWRkZWRTdHJpbmcoMiwgZGF0ZSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBNb250aHMsIGRhdGVzLCBob3VycywgbWludXRlcywgYW5kIHNlY29uZHMgc2hvdWxkIGhhdmUgdHdvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGRpZ2l0czsgbWlsbGlzZWNvbmRzIHNob3VsZCBoYXZlIHRocmVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBcIlRcIiArIHRvUGFkZGVkU3RyaW5nKDIsIGhvdXJzKSArIFwiOlwiICsgdG9QYWRkZWRTdHJpbmcoMiwgbWludXRlcykgKyBcIjpcIiArIHRvUGFkZGVkU3RyaW5nKDIsIHNlY29uZHMpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTWlsbGlzZWNvbmRzIGFyZSBvcHRpb25hbCBpbiBFUyA1LjAsIGJ1dCByZXF1aXJlZCBpbiA1LjEuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFwiLlwiICsgdG9QYWRkZWRTdHJpbmcoMywgbWlsbGlzZWNvbmRzKSArIFwiWlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlLnRvSlNPTiA9PSBcImZ1bmN0aW9uXCIgJiYgKGNsYXNzTmFtZSAhPSBudW1iZXJDbGFzcyAmJiBjbGFzc05hbWUgIT0gc3RyaW5nQ2xhc3MgJiYgY2xhc3NOYW1lICE9IGFycmF5Q2xhc3MgfHwgaXNQcm9wZXJ0eS5jYWxsKHZhbHVlLCBcInRvSlNPTlwiKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFByb3RvdHlwZSA8PSAxLjYuMSBhZGRzIG5vbi1zdGFuZGFyZCBgdG9KU09OYCBtZXRob2RzIHRvIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYE51bWJlcmAsIGBTdHJpbmdgLCBgRGF0ZWAsIGFuZCBgQXJyYXlgIHByb3RvdHlwZXMuIEpTT04gM1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlcyBhbGwgYHRvSlNPTmAgbWV0aG9kcyBvbiB0aGVzZSBvYmplY3RzIHVubGVzcyB0aGV5IGFyZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVmaW5lZCBkaXJlY3RseSBvbiBhbiBpbnN0YW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudG9KU09OKHByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSWYgYSByZXBsYWNlbWVudCBmdW5jdGlvbiB3YXMgcHJvdmlkZWQsIGNhbGwgaXQgdG8gb2J0YWluIHRoZSB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBzZXJpYWxpemF0aW9uLlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2FsbGJhY2suY2FsbChvYmplY3QsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwibnVsbFwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGJvb2xlYW5DbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIEJvb2xlYW5zIGFyZSByZXByZXNlbnRlZCBsaXRlcmFsbHkuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gbnVtYmVyQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIGBJbmZpbml0eWAgYW5kIGBOYU5gIGFyZSBzZXJpYWxpemVkIGFzXG4gICAgICAgICAgICAgICAgICAgICAgLy8gYFwibnVsbFwiYC5cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWUgPiAtMSAvIDAgJiYgdmFsdWUgPCAxIC8gMCA/IFwiXCIgKyB2YWx1ZSA6IFwibnVsbFwiO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBzdHJpbmdDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZ3MgYXJlIGRvdWJsZS1xdW90ZWQgYW5kIGVzY2FwZWQuXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1b3RlKFwiXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGlzIGlzIGEgbGluZWFyIHNlYXJjaDsgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2YgdW5pcXVlIG5lc3RlZCBvYmplY3RzLlxuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGVuZ3RoID0gc3RhY2subGVuZ3RoOyBsZW5ndGgtLTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGFja1tsZW5ndGhdID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDeWNsaWMgc3RydWN0dXJlcyBjYW5ub3QgYmUgc2VyaWFsaXplZCBieSBgSlNPTi5zdHJpbmdpZnlgLlxuICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGluZGVudGF0aW9uIGxldmVsIGFuZCBpbmRlbnQgb25lIGFkZGl0aW9uYWwgbGV2ZWwuXG4gICAgICAgICAgICAgICAgICAgICAgcHJlZml4ID0gaW5kZW50YXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgaW5kZW50YXRpb24gKz0gd2hpdGVzcGFjZTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY2xhc3NOYW1lID09IGFycmF5Q2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlY3Vyc2l2ZWx5IHNlcmlhbGl6ZSBhcnJheSBlbGVtZW50cy5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaW5kZXggPSAwLCBsZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGluZGV4IDwgbGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQgPSBzZXJpYWxpemUoaW5kZXgsIHZhbHVlLCBjYWxsYmFjaywgcHJvcGVydGllcywgd2hpdGVzcGFjZSwgaW5kZW50YXRpb24sIHN0YWNrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGVsZW1lbnQgPT09IHVuZGVmID8gXCJudWxsXCIgOiBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdHMubGVuZ3RoID8gd2hpdGVzcGFjZSA/IFwiW1xcblwiICsgaW5kZW50YXRpb24gKyByZXN1bHRzLmpvaW4oXCIsXFxuXCIgKyBpbmRlbnRhdGlvbikgKyBcIlxcblwiICsgcHJlZml4ICsgXCJdXCIgOiBcIltcIiArIHJlc3VsdHMuam9pbihcIixcIikgKyBcIl1cIiA6IFwiW11cIjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjdXJzaXZlbHkgc2VyaWFsaXplIG9iamVjdCBtZW1iZXJzLiBNZW1iZXJzIGFyZSBzZWxlY3RlZCBmcm9tXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlaXRoZXIgYSB1c2VyLXNwZWNpZmllZCBsaXN0IG9mIHByb3BlcnR5IG5hbWVzLCBvciB0aGUgb2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpdHNlbGYuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JFYWNoKHByb3BlcnRpZXMgfHwgdmFsdWUsIGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHNlcmlhbGl6ZShwcm9wZXJ0eSwgdmFsdWUsIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBpbmRlbnRhdGlvbiwgc3RhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBY2NvcmRpbmcgdG8gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMzogXCJJZiBgZ2FwYCB7d2hpdGVzcGFjZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBub3QgdGhlIGVtcHR5IHN0cmluZywgbGV0IGBtZW1iZXJgIHtxdW90ZShwcm9wZXJ0eSkgKyBcIjpcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBiZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBgbWVtYmVyYCBhbmQgdGhlIGBzcGFjZWAgY2hhcmFjdGVyLlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIFwiYHNwYWNlYCBjaGFyYWN0ZXJcIiByZWZlcnMgdG8gdGhlIGxpdGVyYWwgc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFyYWN0ZXIsIG5vdCB0aGUgYHNwYWNlYCB7d2lkdGh9IGFyZ3VtZW50IHByb3ZpZGVkIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYEpTT04uc3RyaW5naWZ5YC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2gocXVvdGUocHJvcGVydHkpICsgXCI6XCIgKyAod2hpdGVzcGFjZSA/IFwiIFwiIDogXCJcIikgKyBlbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRzLmxlbmd0aCA/IHdoaXRlc3BhY2UgPyBcIntcXG5cIiArIGluZGVudGF0aW9uICsgcmVzdWx0cy5qb2luKFwiLFxcblwiICsgaW5kZW50YXRpb24pICsgXCJcXG5cIiArIHByZWZpeCArIFwifVwiIDogXCJ7XCIgKyByZXN1bHRzLmpvaW4oXCIsXCIpICsgXCJ9XCIgOiBcInt9XCI7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgb2JqZWN0IGZyb20gdGhlIHRyYXZlcnNlZCBvYmplY3Qgc3RhY2suXG4gICAgICAgICAgICAgICAgICAgICAgc3RhY2sucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgLy8gUHVibGljOiBgSlNPTi5zdHJpbmdpZnlgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMy5cbiAgICAgICAgICAgICAgICAgIGV4cG9ydHMuc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHNvdXJjZSwgZmlsdGVyLCB3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2hpdGVzcGFjZSwgY2FsbGJhY2ssIHByb3BlcnRpZXMsIGNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iamVjdFR5cGVzW3R5cGVvZiBmaWx0ZXJdICYmIGZpbHRlcikge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbChmaWx0ZXIpKSA9PSBmdW5jdGlvbkNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayA9IGZpbHRlcjtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNsYXNzTmFtZSA9PSBhcnJheUNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBwcm9wZXJ0eSBuYW1lcyBhcnJheSBpbnRvIGEgbWFrZXNoaWZ0IHNldC5cbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGluZGV4ID0gMCwgbGVuZ3RoID0gZmlsdGVyLmxlbmd0aCwgdmFsdWU7IGluZGV4IDwgbGVuZ3RoOyB2YWx1ZSA9IGZpbHRlcltpbmRleCsrXSwgKGNsYXNzTmFtZSA9IGdldENsYXNzLmNhbGwodmFsdWUpLCBjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MgfHwgY2xhc3NOYW1lID09IG51bWJlckNsYXNzKSAmJiAocHJvcGVydGllc1t2YWx1ZV0gPSAxKSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh3aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2xhc3NOYW1lID0gZ2V0Q2xhc3MuY2FsbCh3aWR0aCkpID09IG51bWJlckNsYXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb252ZXJ0IHRoZSBgd2lkdGhgIHRvIGFuIGludGVnZXIgYW5kIGNyZWF0ZSBhIHN0cmluZyBjb250YWluaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgd2lkdGhgIG51bWJlciBvZiBzcGFjZSBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCh3aWR0aCAtPSB3aWR0aCAlIDEpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHdoaXRlc3BhY2UgPSBcIlwiLCB3aWR0aCA+IDEwICYmICh3aWR0aCA9IDEwKTsgd2hpdGVzcGFjZS5sZW5ndGggPCB3aWR0aDsgd2hpdGVzcGFjZSArPSBcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjbGFzc05hbWUgPT0gc3RyaW5nQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaXRlc3BhY2UgPSB3aWR0aC5sZW5ndGggPD0gMTAgPyB3aWR0aCA6IHdpZHRoLnNsaWNlKDAsIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gT3BlcmEgPD0gNy41NHUyIGRpc2NhcmRzIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGVtcHR5IHN0cmluZyBrZXlzXG4gICAgICAgICAgICAgICAgICAgIC8vIChgXCJcImApIG9ubHkgaWYgdGhleSBhcmUgdXNlZCBkaXJlY3RseSB3aXRoaW4gYW4gb2JqZWN0IG1lbWJlciBsaXN0XG4gICAgICAgICAgICAgICAgICAgIC8vIChlLmcuLCBgIShcIlwiIGluIHsgXCJcIjogMX0pYCkuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemUoXCJcIiwgKHZhbHVlID0ge30sIHZhbHVlW1wiXCJdID0gc291cmNlLCB2YWx1ZSksIGNhbGxiYWNrLCBwcm9wZXJ0aWVzLCB3aGl0ZXNwYWNlLCBcIlwiLCBbXSk7XG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFB1YmxpYzogUGFyc2VzIGEgSlNPTiBzb3VyY2Ugc3RyaW5nLlxuICAgICAgICAgICAgICAgIGlmICghaGFzKFwianNvbi1wYXJzZVwiKSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGZyb21DaGFyQ29kZSA9IFN0cmluZy5mcm9tQ2hhckNvZGU7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBBIG1hcCBvZiBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycyBhbmQgdGhlaXIgdW5lc2NhcGVkXG4gICAgICAgICAgICAgICAgICAvLyBlcXVpdmFsZW50cy5cbiAgICAgICAgICAgICAgICAgIHZhciBVbmVzY2FwZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIDkyOiBcIlxcXFxcIixcbiAgICAgICAgICAgICAgICAgICAgMzQ6ICdcIicsXG4gICAgICAgICAgICAgICAgICAgIDQ3OiBcIi9cIixcbiAgICAgICAgICAgICAgICAgICAgOTg6IFwiXFxiXCIsXG4gICAgICAgICAgICAgICAgICAgIDExNjogXCJcXHRcIixcbiAgICAgICAgICAgICAgICAgICAgMTEwOiBcIlxcblwiLFxuICAgICAgICAgICAgICAgICAgICAxMDI6IFwiXFxmXCIsXG4gICAgICAgICAgICAgICAgICAgIDExNDogXCJcXHJcIlxuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IFN0b3JlcyB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICAgICAgICAgICAgdmFyIEluZGV4LCBTb3VyY2U7XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBSZXNldHMgdGhlIHBhcnNlciBzdGF0ZSBhbmQgdGhyb3dzIGEgYFN5bnRheEVycm9yYC5cbiAgICAgICAgICAgICAgICAgIHZhciBhYm9ydCA9IGZ1bmN0aW9uIGFib3J0KCkge1xuICAgICAgICAgICAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IFN5bnRheEVycm9yKCk7XG4gICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAvLyBJbnRlcm5hbDogUmV0dXJucyB0aGUgbmV4dCB0b2tlbiwgb3IgYFwiJFwiYCBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkXG4gICAgICAgICAgICAgICAgICAvLyB0aGUgZW5kIG9mIHRoZSBzb3VyY2Ugc3RyaW5nLiBBIHRva2VuIG1heSBiZSBhIHN0cmluZywgbnVtYmVyLCBgbnVsbGBcbiAgICAgICAgICAgICAgICAgIC8vIGxpdGVyYWwsIG9yIEJvb2xlYW4gbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgIHZhciBsZXggPSBmdW5jdGlvbiBsZXgoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzb3VyY2UgPSBTb3VyY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbixcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTaWduZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKEluZGV4IDwgbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSA5OmNhc2UgMTA6Y2FzZSAxMzpjYXNlIDMyOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHdoaXRlc3BhY2UgdG9rZW5zLCBpbmNsdWRpbmcgdGFicywgY2FycmlhZ2UgcmV0dXJucywgbGluZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmZWVkcywgYW5kIHNwYWNlIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAxMjM6Y2FzZSAxMjU6Y2FzZSA5MTpjYXNlIDkzOmNhc2UgNTg6Y2FzZSA0NDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgYSBwdW5jdHVhdG9yIHRva2VuIChge2AsIGB9YCwgYFtgLCBgXWAsIGA6YCwgb3IgYCxgKSBhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBjaGFySW5kZXhCdWdneSA/IHNvdXJjZS5jaGFyQXQoSW5kZXgpIDogc291cmNlW0luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAzNDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYFwiYCBkZWxpbWl0cyBhIEpTT04gc3RyaW5nOyBhZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYmVnaW4gcGFyc2luZyB0aGUgc3RyaW5nLiBTdHJpbmcgdG9rZW5zIGFyZSBwcmVmaXhlZCB3aXRoIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzZW50aW5lbCBgQGAgY2hhcmFjdGVyIHRvIGRpc3Rpbmd1aXNoIHRoZW0gZnJvbSBwdW5jdHVhdG9ycyBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5kLW9mLXN0cmluZyB0b2tlbnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFsdWUgPSBcIkBcIiwgSW5kZXgrKzsgSW5kZXggPCBsZW5ndGg7KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlIDwgMzIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXNjYXBlZCBBU0NJSSBjb250cm9sIGNoYXJhY3RlcnMgKHRob3NlIHdpdGggYSBjb2RlIHVuaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxlc3MgdGhhbiB0aGUgc3BhY2UgY2hhcmFjdGVyKSBhcmUgbm90IHBlcm1pdHRlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaGFyQ29kZSA9PSA5Mikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSByZXZlcnNlIHNvbGlkdXMgKGBcXGApIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYW4gZXNjYXBlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29udHJvbCBjaGFyYWN0ZXIgKGluY2x1ZGluZyBgXCJgLCBgXFxgLCBhbmQgYC9gKSBvciBVbmljb2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KCsrSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoIChjaGFyQ29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDkyOmNhc2UgMzQ6Y2FzZSA0NzpjYXNlIDk4OmNhc2UgMTE2OmNhc2UgMTEwOmNhc2UgMTAyOmNhc2UgMTE0OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldml2ZSBlc2NhcGVkIGNvbnRyb2wgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSBVbmVzY2FwZXNbY2hhckNvZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTE3OlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGBcXHVgIG1hcmtzIHRoZSBiZWdpbm5pbmcgb2YgYSBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgYW5kIHZhbGlkYXRlIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvdXItZGlnaXQgY29kZSBwb2ludC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWdpbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChwb3NpdGlvbiA9IEluZGV4ICsgNDsgSW5kZXggPCBwb3NpdGlvbjsgSW5kZXgrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIHZhbGlkIHNlcXVlbmNlIGNvbXByaXNlcyBmb3VyIGhleGRpZ2l0cyAoY2FzZS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluc2Vuc2l0aXZlKSB0aGF0IGZvcm0gYSBzaW5nbGUgaGV4YWRlY2ltYWwgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIShjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NyB8fCBjaGFyQ29kZSA+PSA5NyAmJiBjaGFyQ29kZSA8PSAxMDIgfHwgY2hhckNvZGUgPj0gNjUgJiYgY2hhckNvZGUgPD0gNzApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEludmFsaWQgVW5pY29kZSBlc2NhcGUgc2VxdWVuY2UuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJldml2ZSB0aGUgZXNjYXBlZCBjaGFyYWN0ZXIuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gZnJvbUNoYXJDb2RlKFwiMHhcIiArIHNvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZhbGlkIGVzY2FwZSBzZXF1ZW5jZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQW4gdW5lc2NhcGVkIGRvdWJsZS1xdW90ZSBjaGFyYWN0ZXIgbWFya3MgdGhlIGVuZCBvZiB0aGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW4gPSBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE9wdGltaXplIGZvciB0aGUgY29tbW9uIGNhc2Ugd2hlcmUgYSBzdHJpbmcgaXMgdmFsaWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoY2hhckNvZGUgPj0gMzIgJiYgY2hhckNvZGUgIT0gOTIgJiYgY2hhckNvZGUgIT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdCgrK0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFwcGVuZCB0aGUgc3RyaW5nIGFzLWlzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gc291cmNlLnNsaWNlKGJlZ2luLCBJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuY2hhckNvZGVBdChJbmRleCkgPT0gMzQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIHRoZSBuZXh0IGNoYXJhY3RlciBhbmQgcmV0dXJuIHRoZSByZXZpdmVkIHN0cmluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbnRlcm1pbmF0ZWQgc3RyaW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgbnVtYmVycyBhbmQgbGl0ZXJhbHMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luID0gSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgcGFzdCB0aGUgbmVnYXRpdmUgc2lnbiwgaWYgb25lIGlzIHNwZWNpZmllZC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID09IDQ1KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTaWduZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgYW4gaW50ZWdlciBvciBmbG9hdGluZy1wb2ludCB2YWx1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGVhZGluZyB6ZXJvZXMgYXJlIGludGVycHJldGVkIGFzIG9jdGFsIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSA0OCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCArIDEpLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1NykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgb2N0YWwgbGl0ZXJhbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzU2lnbmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2UgdGhlIGludGVnZXIgY29tcG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoOyBJbmRleCA8IGxlbmd0aCAmJiAoY2hhckNvZGUgPSBzb3VyY2UuY2hhckNvZGVBdChJbmRleCksIGNoYXJDb2RlID49IDQ4ICYmIGNoYXJDb2RlIDw9IDU3KTsgSW5kZXgrKyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRmxvYXRzIGNhbm5vdCBjb250YWluIGEgbGVhZGluZyBkZWNpbWFsIHBvaW50OyBob3dldmVyLCB0aGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2FzZSBpcyBhbHJlYWR5IGFjY291bnRlZCBmb3IgYnkgdGhlIHBhcnNlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpID09IDQ2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9ICsrSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQYXJzZSB0aGUgZGVjaW1hbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDsgcG9zaXRpb24gPCBsZW5ndGggJiYgKGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQocG9zaXRpb24pLCBjaGFyQ29kZSA+PSA0OCAmJiBjaGFyQ29kZSA8PSA1Nyk7IHBvc2l0aW9uKyspO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09IEluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElsbGVnYWwgdHJhaWxpbmcgZGVjaW1hbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZGV4ID0gcG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIGV4cG9uZW50cy4gVGhlIGBlYCBkZW5vdGluZyB0aGUgZXhwb25lbnQgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjYXNlLWluc2Vuc2l0aXZlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGFyQ29kZSA9PSAxMDEgfHwgY2hhckNvZGUgPT0gNjkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJDb2RlID0gc291cmNlLmNoYXJDb2RlQXQoKytJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTa2lwIHBhc3QgdGhlIHNpZ24gZm9sbG93aW5nIHRoZSBleHBvbmVudCwgaWYgb25lIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzcGVjaWZpZWQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hhckNvZGUgPT0gNDMgfHwgY2hhckNvZGUgPT0gNDUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlIHRoZSBleHBvbmVudGlhbCBjb21wb25lbnQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHBvc2l0aW9uID0gSW5kZXg7IHBvc2l0aW9uIDwgbGVuZ3RoICYmIChjaGFyQ29kZSA9IHNvdXJjZS5jaGFyQ29kZUF0KHBvc2l0aW9uKSwgY2hhckNvZGUgPj0gNDggJiYgY2hhckNvZGUgPD0gNTcpOyBwb3NpdGlvbisrKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSBJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbGxlZ2FsIGVtcHR5IGV4cG9uZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXggPSBwb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29lcmNlIHRoZSBwYXJzZWQgdmFsdWUgdG8gYSBKYXZhU2NyaXB0IG51bWJlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gK3NvdXJjZS5zbGljZShiZWdpbiwgSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgbmVnYXRpdmUgc2lnbiBtYXkgb25seSBwcmVjZWRlIG51bWJlcnMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc1NpZ25lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYHRydWVgLCBgZmFsc2VgLCBhbmQgYG51bGxgIGxpdGVyYWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDQpID09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzb3VyY2Uuc2xpY2UoSW5kZXgsIEluZGV4ICsgNSkgPT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc291cmNlLnNsaWNlKEluZGV4LCBJbmRleCArIDQpID09IFwibnVsbFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5kZXggKz0gNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVbnJlY29nbml6ZWQgdG9rZW4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgc2VudGluZWwgYCRgIGNoYXJhY3RlciBpZiB0aGUgcGFyc2VyIGhhcyByZWFjaGVkIHRoZSBlbmRcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgdGhlIHNvdXJjZSBzdHJpbmcuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcIiRcIjtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBQYXJzZXMgYSBKU09OIGB2YWx1ZWAgdG9rZW4uXG4gICAgICAgICAgICAgICAgICB2YXIgZ2V0ID0gZnVuY3Rpb24gZ2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzLCBoYXNNZW1iZXJzO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIGVuZCBvZiBpbnB1dC5cbiAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICgoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5jaGFyQXQoMCkgOiB2YWx1ZVswXSkgPT0gXCJAXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgc2VudGluZWwgYEBgIGNoYXJhY3Rlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgLy8gUGFyc2Ugb2JqZWN0IGFuZCBhcnJheSBsaXRlcmFscy5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCJbXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlcyBhIEpTT04gYXJyYXksIHJldHVybmluZyBhIG5ldyBKYXZhU2NyaXB0IGFycmF5LlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7OyBoYXNNZW1iZXJzIHx8IChoYXNNZW1iZXJzID0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBsZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQSBjbG9zaW5nIHNxdWFyZSBicmFja2V0IG1hcmtzIHRoZSBlbmQgb2YgdGhlIGFycmF5IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBhcnJheSBsaXRlcmFsIGNvbnRhaW5zIGVsZW1lbnRzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0aW5nIHRoZSBwcmV2aW91cyBlbGVtZW50IGZyb20gdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGxleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiXVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIGFycmF5IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEEgYCxgIG11c3Qgc2VwYXJhdGUgZWFjaCBhcnJheSBlbGVtZW50LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRWxpc2lvbnMgYW5kIGxlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gXCIsXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChnZXQodmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gXCJ7XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFBhcnNlcyBhIEpTT04gb2JqZWN0LCByZXR1cm5pbmcgYSBuZXcgSmF2YVNjcmlwdCBvYmplY3QuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDs7IGhhc01lbWJlcnMgfHwgKGhhc01lbWJlcnMgPSB0cnVlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGxleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGNsb3NpbmcgY3VybHkgYnJhY2UgbWFya3MgdGhlIGVuZCBvZiB0aGUgb2JqZWN0IGxpdGVyYWwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHRoZSBvYmplY3QgbGl0ZXJhbCBjb250YWlucyBtZW1iZXJzLCB0aGUgY3VycmVudCB0b2tlblxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG91bGQgYmUgYSBjb21tYSBzZXBhcmF0b3IuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoYXNNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwiLFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGxleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVuZXhwZWN0ZWQgdHJhaWxpbmcgYCxgIGluIG9iamVjdCBsaXRlcmFsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBIGAsYCBtdXN0IHNlcGFyYXRlIGVhY2ggb2JqZWN0IG1lbWJlci5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExlYWRpbmcgY29tbWFzIGFyZSBub3QgcGVybWl0dGVkLCBvYmplY3QgcHJvcGVydHkgbmFtZXMgbXVzdCBiZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb3VibGUtcXVvdGVkIHN0cmluZ3MsIGFuZCBhIGA6YCBtdXN0IHNlcGFyYXRlIGVhY2ggcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFtZSBhbmQgdmFsdWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIixcIiB8fCB0eXBlb2YgdmFsdWUgIT0gXCJzdHJpbmdcIiB8fCAoY2hhckluZGV4QnVnZ3kgPyB2YWx1ZS5jaGFyQXQoMCkgOiB2YWx1ZVswXSkgIT0gXCJAXCIgfHwgbGV4KCkgIT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhYm9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHNbdmFsdWUuc2xpY2UoMSldID0gZ2V0KGxleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyBVbmV4cGVjdGVkIHRva2VuIGVuY291bnRlcmVkLlxuICAgICAgICAgICAgICAgICAgICAgIGFib3J0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgLy8gSW50ZXJuYWw6IFVwZGF0ZXMgYSB0cmF2ZXJzZWQgb2JqZWN0IG1lbWJlci5cbiAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB3YWxrKHNvdXJjZSwgcHJvcGVydHksIGNhbGxiYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNvdXJjZVtwcm9wZXJ0eV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc291cmNlW3Byb3BlcnR5XSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIEludGVybmFsOiBSZWN1cnNpdmVseSB0cmF2ZXJzZXMgYSBwYXJzZWQgSlNPTiBvYmplY3QsIGludm9raW5nIHRoZVxuICAgICAgICAgICAgICAgICAgLy8gYGNhbGxiYWNrYCBmdW5jdGlvbiBmb3IgZWFjaCB2YWx1ZS4gVGhpcyBpcyBhbiBpbXBsZW1lbnRhdGlvbiBvZiB0aGVcbiAgICAgICAgICAgICAgICAgIC8vIGBXYWxrKGhvbGRlciwgbmFtZSlgIG9wZXJhdGlvbiBkZWZpbmVkIGluIEVTIDUuMSBzZWN0aW9uIDE1LjEyLjIuXG4gICAgICAgICAgICAgICAgICB2YXIgd2FsayA9IGZ1bmN0aW9uIHdhbGsoc291cmNlLCBwcm9wZXJ0eSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW3Byb3BlcnR5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcIm9iamVjdFwiICYmIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gYGZvckVhY2hgIGNhbid0IGJlIHVzZWQgdG8gdHJhdmVyc2UgYW4gYXJyYXkgaW4gT3BlcmEgPD0gOC41NFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgaXRzIGBPYmplY3QjaGFzT3duUHJvcGVydHlgIGltcGxlbWVudGF0aW9uIHJldHVybnMgYGZhbHNlYFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBhcnJheSBpbmRpY2VzIChlLmcuLCBgIVsxLCAyLCAzXS5oYXNPd25Qcm9wZXJ0eShcIjBcIilgKS5cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2V0Q2xhc3MuY2FsbCh2YWx1ZSkgPT0gYXJyYXlDbGFzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZW5ndGggPSB2YWx1ZS5sZW5ndGg7IGxlbmd0aC0tOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGUodmFsdWUsIGxlbmd0aCwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JFYWNoKHZhbHVlLCBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlKHZhbHVlLCBwcm9wZXJ0eSwgY2FsbGJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjay5jYWxsKHNvdXJjZSwgcHJvcGVydHksIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgIC8vIFB1YmxpYzogYEpTT04ucGFyc2VgLiBTZWUgRVMgNS4xIHNlY3Rpb24gMTUuMTIuMi5cbiAgICAgICAgICAgICAgICAgIGV4cG9ydHMucGFyc2UgPSBmdW5jdGlvbiAoc291cmNlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0LCB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgICAgICBTb3VyY2UgPSBcIlwiICsgc291cmNlO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBnZXQobGV4KCkpO1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiBhIEpTT04gc3RyaW5nIGNvbnRhaW5zIG11bHRpcGxlIHRva2VucywgaXQgaXMgaW52YWxpZC5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGxleCgpICE9IFwiJFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgYWJvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgcGFyc2VyIHN0YXRlLlxuICAgICAgICAgICAgICAgICAgICBJbmRleCA9IFNvdXJjZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayAmJiBnZXRDbGFzcy5jYWxsKGNhbGxiYWNrKSA9PSBmdW5jdGlvbkNsYXNzID8gd2FsaygodmFsdWUgPSB7fSwgdmFsdWVbXCJcIl0gPSByZXN1bHQsIHZhbHVlKSwgXCJcIiwgY2FsbGJhY2spIDogcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBleHBvcnRzW1wicnVuSW5Db250ZXh0XCJdID0gcnVuSW5Db250ZXh0O1xuICAgICAgICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGZyZWVFeHBvcnRzICYmICFpc0xvYWRlcikge1xuICAgICAgICAgICAgICAvLyBFeHBvcnQgZm9yIENvbW1vbkpTIGVudmlyb25tZW50cy5cbiAgICAgICAgICAgICAgcnVuSW5Db250ZXh0KHJvb3QsIGZyZWVFeHBvcnRzKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIEV4cG9ydCBmb3Igd2ViIGJyb3dzZXJzIGFuZCBKYXZhU2NyaXB0IGVuZ2luZXMuXG4gICAgICAgICAgICAgIHZhciBuYXRpdmVKU09OID0gcm9vdC5KU09OLFxuICAgICAgICAgICAgICAgICAgcHJldmlvdXNKU09OID0gcm9vdFtcIkpTT04zXCJdLFxuICAgICAgICAgICAgICAgICAgaXNSZXN0b3JlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgIHZhciBKU09OMyA9IHJ1bkluQ29udGV4dChyb290LCByb290W1wiSlNPTjNcIl0gPSB7XG4gICAgICAgICAgICAgICAgLy8gUHVibGljOiBSZXN0b3JlcyB0aGUgb3JpZ2luYWwgdmFsdWUgb2YgdGhlIGdsb2JhbCBgSlNPTmAgb2JqZWN0IGFuZFxuICAgICAgICAgICAgICAgIC8vIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhlIGBKU09OM2Agb2JqZWN0LlxuICAgICAgICAgICAgICAgIFwibm9Db25mbGljdFwiOiBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICAgICAgICAgICAgaWYgKCFpc1Jlc3RvcmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzUmVzdG9yZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByb290LkpTT04gPSBuYXRpdmVKU09OO1xuICAgICAgICAgICAgICAgICAgICByb290W1wiSlNPTjNcIl0gPSBwcmV2aW91c0pTT047XG4gICAgICAgICAgICAgICAgICAgIG5hdGl2ZUpTT04gPSBwcmV2aW91c0pTT04gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04zO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgcm9vdC5KU09OID0ge1xuICAgICAgICAgICAgICAgIFwicGFyc2VcIjogSlNPTjMucGFyc2UsXG4gICAgICAgICAgICAgICAgXCJzdHJpbmdpZnlcIjogSlNPTjMuc3RyaW5naWZ5XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEV4cG9ydCBmb3IgYXN5bmNocm9ub3VzIG1vZHVsZSBsb2FkZXJzLlxuICAgICAgICAgICAgaWYgKGlzTG9hZGVyKSB7XG4gICAgICAgICAgICAgIGRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEpTT04zO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KS5jYWxsKHRoaXMpO1xuICAgICAgICB9KS5jYWxsKHRoaXMsIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDoge30pO1xuICAgICAgfSwge31dLCAzNTogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogSGVscGVycy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgcyA9IDEwMDA7XG4gICAgICAgIHZhciBtID0gcyAqIDYwO1xuICAgICAgICB2YXIgaCA9IG0gKiA2MDtcbiAgICAgICAgdmFyIGQgPSBoICogMjQ7XG4gICAgICAgIHZhciB5ID0gZCAqIDM2NS4yNTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJzZSBvciBmb3JtYXQgdGhlIGdpdmVuIGB2YWxgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogT3B0aW9uczpcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqICAtIGBsb25nYCB2ZXJib3NlIGZvcm1hdHRpbmcgW2ZhbHNlXVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSB2YWxcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xyXG4gICAgICAgICAqIEByZXR1cm4ge1N0cmluZ3xOdW1iZXJ9XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIHZhbCkgcmV0dXJuIHBhcnNlKHZhbCk7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMubG9uZyA/IGxvbmcodmFsKSA6IHNob3J0KHZhbCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcn1cclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgICAgICAgICBzdHIgPSAnJyArIHN0cjtcbiAgICAgICAgICBpZiAoc3RyLmxlbmd0aCA+IDEwMDAwKSByZXR1cm47XG4gICAgICAgICAgdmFyIG1hdGNoID0gL14oKD86XFxkKyk/XFwuP1xcZCspICoobWlsbGlzZWNvbmRzP3xtc2Vjcz98bXN8c2Vjb25kcz98c2Vjcz98c3xtaW51dGVzP3xtaW5zP3xtfGhvdXJzP3xocnM/fGh8ZGF5cz98ZHx5ZWFycz98eXJzP3x5KT8kL2kuZXhlYyhzdHIpO1xuICAgICAgICAgIGlmICghbWF0Y2gpIHJldHVybjtcbiAgICAgICAgICB2YXIgbiA9IHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xuICAgICAgICAgIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICd5ZWFycyc6XG4gICAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIGNhc2UgJ3lycyc6XG4gICAgICAgICAgICBjYXNlICd5cic6XG4gICAgICAgICAgICBjYXNlICd5JzpcbiAgICAgICAgICAgICAgcmV0dXJuIG4gKiB5O1xuICAgICAgICAgICAgY2FzZSAnZGF5cyc6XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgIHJldHVybiBuICogZDtcbiAgICAgICAgICAgIGNhc2UgJ2hvdXJzJzpcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgY2FzZSAnaHJzJzpcbiAgICAgICAgICAgIGNhc2UgJ2hyJzpcbiAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICByZXR1cm4gbiAqIGg7XG4gICAgICAgICAgICBjYXNlICdtaW51dGVzJzpcbiAgICAgICAgICAgIGNhc2UgJ21pbnV0ZSc6XG4gICAgICAgICAgICBjYXNlICdtaW5zJzpcbiAgICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgcmV0dXJuIG4gKiBtO1xuICAgICAgICAgICAgY2FzZSAnc2Vjb25kcyc6XG4gICAgICAgICAgICBjYXNlICdzZWNvbmQnOlxuICAgICAgICAgICAgY2FzZSAnc2Vjcyc6XG4gICAgICAgICAgICBjYXNlICdzZWMnOlxuICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgIHJldHVybiBuICogcztcbiAgICAgICAgICAgIGNhc2UgJ21pbGxpc2Vjb25kcyc6XG4gICAgICAgICAgICBjYXNlICdtaWxsaXNlY29uZCc6XG4gICAgICAgICAgICBjYXNlICdtc2Vjcyc6XG4gICAgICAgICAgICBjYXNlICdtc2VjJzpcbiAgICAgICAgICAgIGNhc2UgJ21zJzpcbiAgICAgICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogU2hvcnQgZm9ybWF0IGZvciBgbXNgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIHNob3J0KG1zKSB7XG4gICAgICAgICAgaWYgKG1zID49IGQpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gZCkgKyAnZCc7XG4gICAgICAgICAgaWYgKG1zID49IGgpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gICAgICAgICAgaWYgKG1zID49IG0pIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gbSkgKyAnbSc7XG4gICAgICAgICAgaWYgKG1zID49IHMpIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gcykgKyAncyc7XG4gICAgICAgICAgcmV0dXJuIG1zICsgJ21zJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IG1zXHJcbiAgICAgICAgICogQHJldHVybiB7U3RyaW5nfVxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIGxvbmcobXMpIHtcbiAgICAgICAgICByZXR1cm4gcGx1cmFsKG1zLCBkLCAnZGF5JykgfHwgcGx1cmFsKG1zLCBoLCAnaG91cicpIHx8IHBsdXJhbChtcywgbSwgJ21pbnV0ZScpIHx8IHBsdXJhbChtcywgcywgJ3NlY29uZCcpIHx8IG1zICsgJyBtcyc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQbHVyYWxpemF0aW9uIGhlbHBlci5cclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBwbHVyYWwobXMsIG4sIG5hbWUpIHtcbiAgICAgICAgICBpZiAobXMgPCBuKSByZXR1cm47XG4gICAgICAgICAgaWYgKG1zIDwgbiAqIDEuNSkgcmV0dXJuIE1hdGguZmxvb3IobXMgLyBuKSArICcgJyArIG5hbWU7XG4gICAgICAgICAgcmV0dXJuIE1hdGguY2VpbChtcyAvIG4pICsgJyAnICsgbmFtZSArICdzJztcbiAgICAgICAgfVxuICAgICAgfSwge31dLCAzNjogW2Z1bmN0aW9uIChfZGVyZXFfLCBtb2R1bGUsIGV4cG9ydHMpIHtcbiAgICAgICAgKGZ1bmN0aW9uIChnbG9iYWwpIHtcbiAgICAgICAgICAvKipcclxuICAgICAgICAgICAqIEpTT04gcGFyc2UuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHNlZSBCYXNlZCBvbiBqUXVlcnkjcGFyc2VKU09OIChNSVQpIGFuZCBKU09OMlxyXG4gICAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIHZhciBydmFsaWRjaGFycyA9IC9eW1xcXSw6e31cXHNdKiQvO1xuICAgICAgICAgIHZhciBydmFsaWRlc2NhcGUgPSAvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nO1xuICAgICAgICAgIHZhciBydmFsaWR0b2tlbnMgPSAvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2c7XG4gICAgICAgICAgdmFyIHJ2YWxpZGJyYWNlcyA9IC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZztcbiAgICAgICAgICB2YXIgcnRyaW1MZWZ0ID0gL15cXHMrLztcbiAgICAgICAgICB2YXIgcnRyaW1SaWdodCA9IC9cXHMrJC87XG5cbiAgICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlanNvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgfHwgIWRhdGEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UocnRyaW1MZWZ0LCAnJykucmVwbGFjZShydHJpbVJpZ2h0LCAnJyk7XG5cbiAgICAgICAgICAgIC8vIEF0dGVtcHQgdG8gcGFyc2UgdXNpbmcgdGhlIG5hdGl2ZSBKU09OIHBhcnNlciBmaXJzdFxuICAgICAgICAgICAgaWYgKGdsb2JhbC5KU09OICYmIEpTT04ucGFyc2UpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChydmFsaWRjaGFycy50ZXN0KGRhdGEucmVwbGFjZShydmFsaWRlc2NhcGUsICdAJykucmVwbGFjZShydmFsaWR0b2tlbnMsICddJykucmVwbGFjZShydmFsaWRicmFjZXMsICcnKSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGdW5jdGlvbigncmV0dXJuICcgKyBkYXRhKSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7fV0sIDM3OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAvKipcclxuICAgICAgICAgKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXHJcbiAgICAgICAgICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5lbmNvZGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgdmFyIHN0ciA9ICcnO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGgpIHN0ciArPSAnJic7XG4gICAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gc3RyO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHFzXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5kZWNvZGUgPSBmdW5jdGlvbiAocXMpIHtcbiAgICAgICAgICB2YXIgcXJ5ID0ge307XG4gICAgICAgICAgdmFyIHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICAgICAgcXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYWlyWzBdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBxcnk7XG4gICAgICAgIH07XG4gICAgICB9LCB7fV0sIDM4OiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYXJzZXMgYW4gVVJJXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgdmFyIHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5cbiAgICAgICAgdmFyIHBhcnRzID0gWydzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ107XG5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZXVyaShzdHIpIHtcbiAgICAgICAgICB2YXIgc3JjID0gc3RyLFxuICAgICAgICAgICAgICBiID0gc3RyLmluZGV4T2YoJ1snKSxcbiAgICAgICAgICAgICAgZSA9IHN0ci5pbmRleE9mKCddJyk7XG5cbiAgICAgICAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhzdHIgfHwgJycpLFxuICAgICAgICAgICAgICB1cmkgPSB7fSxcbiAgICAgICAgICAgICAgaSA9IDE0O1xuXG4gICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgICAgIHVyaS5hdXRob3JpdHkgPSB1cmkuYXV0aG9yaXR5LnJlcGxhY2UoJ1snLCAnJykucmVwbGFjZSgnXScsICcnKS5yZXBsYWNlKC87L2csICc6Jyk7XG4gICAgICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHVyaTtcbiAgICAgICAgfTtcbiAgICAgIH0sIHt9XSwgMzk6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLypnbG9iYWwgQmxvYixGaWxlKi9cblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogTW9kdWxlIHJlcXVpcmVtZW50c1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICB2YXIgaXNBcnJheSA9IF9kZXJlcV8oJ2lzYXJyYXknKTtcbiAgICAgICAgICB2YXIgaXNCdWYgPSBfZGVyZXFfKCcuL2lzLWJ1ZmZlcicpO1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxyXG4gICAgICAgICAgICogQW55dGhpbmcgd2l0aCBibG9icyBvciBmaWxlcyBzaG91bGQgYmUgZmVkIHRocm91Z2ggcmVtb3ZlQmxvYnMgYmVmb3JlIGNvbWluZ1xyXG4gICAgICAgICAgICogaGVyZS5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxyXG4gICAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcclxuICAgICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICAgKi9cblxuICAgICAgICAgIGV4cG9ydHMuZGVjb25zdHJ1Y3RQYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgICAgICAgICB2YXIgYnVmZmVycyA9IFtdO1xuICAgICAgICAgICAgdmFyIHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEpIHtcbiAgICAgICAgICAgICAgaWYgKCFkYXRhKSByZXR1cm4gZGF0YTtcblxuICAgICAgICAgICAgICBpZiAoaXNCdWYoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGxhY2Vob2xkZXIgPSB7IF9wbGFjZWhvbGRlcjogdHJ1ZSwgbnVtOiBidWZmZXJzLmxlbmd0aCB9O1xuICAgICAgICAgICAgICAgIGJ1ZmZlcnMucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdEYXRhID0gbmV3IEFycmF5KGRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIG5ld0RhdGFbaV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCdvYmplY3QnID09IHR5cGVvZiBkYXRhICYmICEoZGF0YSBpbnN0YW5jZW9mIERhdGUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0RhdGEgPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgICAgbmV3RGF0YVtrZXldID0gX2RlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdEYXRhO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGFjayA9IHBhY2tldDtcbiAgICAgICAgICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhKTtcbiAgICAgICAgICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgICAgICAgICByZXR1cm4geyBwYWNrZXQ6IHBhY2ssIGJ1ZmZlcnM6IGJ1ZmZlcnMgfTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBSZWNvbnN0cnVjdHMgYSBiaW5hcnkgcGFja2V0IGZyb20gaXRzIHBsYWNlaG9sZGVyIHBhY2tldCBhbmQgYnVmZmVyc1xyXG4gICAgICAgICAgICpcclxuICAgICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBldmVudCBwYWNrZXQgd2l0aCBwbGFjZWhvbGRlcnNcclxuICAgICAgICAgICAqIEBwYXJhbSB7QXJyYXl9IGJ1ZmZlcnMgLSBiaW5hcnkgYnVmZmVycyB0byBwdXQgaW4gcGxhY2Vob2xkZXIgcG9zaXRpb25zXHJcbiAgICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHJlY29uc3RydWN0ZWQgcGFja2V0XHJcbiAgICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAgICovXG5cbiAgICAgICAgICBleHBvcnRzLnJlY29uc3RydWN0UGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCwgYnVmZmVycykge1xuICAgICAgICAgICAgdmFyIGN1clBsYWNlSG9sZGVyID0gMDtcblxuICAgICAgICAgICAgZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEpIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEgJiYgZGF0YS5fcGxhY2Vob2xkZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgYnVmID0gYnVmZmVyc1tkYXRhLm51bV07IC8vIGFwcHJvcHJpYXRlIGJ1ZmZlciAoc2hvdWxkIGJlIG5hdHVyYWwgb3JkZXIgYW55d2F5KVxuICAgICAgICAgICAgICAgIHJldHVybiBidWY7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgZGF0YVtpXSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YSAmJiAnb2JqZWN0JyA9PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICBkYXRhW2tleV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIHBhY2tldC5hdHRhY2htZW50cyA9IHVuZGVmaW5lZDsgLy8gbm8gbG9uZ2VyIHVzZWZ1bFxuICAgICAgICAgICAgcmV0dXJuIHBhY2tldDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgKiBBc3luY2hyb25vdXNseSByZW1vdmVzIEJsb2JzIG9yIEZpbGVzIGZyb20gZGF0YSB2aWFcclxuICAgICAgICAgICAqIEZpbGVSZWFkZXIncyByZWFkQXNBcnJheUJ1ZmZlciBtZXRob2QuIFVzZWQgYmVmb3JlIGVuY29kaW5nXHJcbiAgICAgICAgICAgKiBkYXRhIGFzIG1zZ3BhY2suIENhbGxzIGNhbGxiYWNrIHdpdGggdGhlIGJsb2JsZXNzIGRhdGEuXHJcbiAgICAgICAgICAgKlxyXG4gICAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGRhdGFcclxuICAgICAgICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZXhwb3J0cy5yZW1vdmVCbG9icyA9IGZ1bmN0aW9uIChkYXRhLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgZnVuY3Rpb24gX3JlbW92ZUJsb2JzKG9iaiwgY3VyS2V5LCBjb250YWluaW5nT2JqZWN0KSB7XG4gICAgICAgICAgICAgIGlmICghb2JqKSByZXR1cm4gb2JqO1xuXG4gICAgICAgICAgICAgIC8vIGNvbnZlcnQgYW55IGJsb2JcbiAgICAgICAgICAgICAgaWYgKGdsb2JhbC5CbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IgfHwgZ2xvYmFsLkZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdCbG9icysrO1xuXG4gICAgICAgICAgICAgICAgLy8gYXN5bmMgZmlsZXJlYWRlclxuICAgICAgICAgICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgICAgICAgICBmaWxlUmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRoaXMucmVzdWx0ID09IGFycmF5YnVmZmVyXG4gICAgICAgICAgICAgICAgICBpZiAoY29udGFpbmluZ09iamVjdCkge1xuICAgICAgICAgICAgICAgICAgICBjb250YWluaW5nT2JqZWN0W2N1cktleV0gPSB0aGlzLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2JsZXNzRGF0YSA9IHRoaXMucmVzdWx0O1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvLyBpZiBub3RoaW5nIHBlbmRpbmcgaXRzIGNhbGxiYWNrIHRpbWVcbiAgICAgICAgICAgICAgICAgIGlmICghIC0tcGVuZGluZ0Jsb2JzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGJsb2JsZXNzRGF0YSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGZpbGVSZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIob2JqKTsgLy8gYmxvYiAtPiBhcnJheWJ1ZmZlclxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgICAgICAgLy8gaGFuZGxlIGFycmF5XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iai5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBfcmVtb3ZlQmxvYnMob2JqW2ldLCBpLCBvYmopO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAob2JqICYmICdvYmplY3QnID09IHR5cGVvZiBvYmogJiYgIWlzQnVmKG9iaikpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGFuZCBvYmplY3RcbiAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgICAgICAgX3JlbW92ZUJsb2JzKG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcGVuZGluZ0Jsb2JzID0gMDtcbiAgICAgICAgICAgIHZhciBibG9ibGVzc0RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgX3JlbW92ZUJsb2JzKGJsb2JsZXNzRGF0YSk7XG4gICAgICAgICAgICBpZiAoIXBlbmRpbmdCbG9icykge1xuICAgICAgICAgICAgICBjYWxsYmFjayhibG9ibGVzc0RhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG4gICAgICAgIH0pLmNhbGwodGhpcywgdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB7fSk7XG4gICAgICB9LCB7IFwiLi9pcy1idWZmZXJcIjogNDEsIFwiaXNhcnJheVwiOiAzMyB9XSwgNDA6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogTW9kdWxlIGRlcGVuZGVuY2llcy5cclxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgZGVidWcgPSBfZGVyZXFfKCdkZWJ1ZycpKCdzb2NrZXQuaW8tcGFyc2VyJyk7XG4gICAgICAgIHZhciBqc29uID0gX2RlcmVxXygnanNvbjMnKTtcbiAgICAgICAgdmFyIGlzQXJyYXkgPSBfZGVyZXFfKCdpc2FycmF5Jyk7XG4gICAgICAgIHZhciBFbWl0dGVyID0gX2RlcmVxXygnY29tcG9uZW50LWVtaXR0ZXInKTtcbiAgICAgICAgdmFyIGJpbmFyeSA9IF9kZXJlcV8oJy4vYmluYXJ5Jyk7XG4gICAgICAgIHZhciBpc0J1ZiA9IF9kZXJlcV8oJy4vaXMtYnVmZmVyJyk7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUHJvdG9jb2wgdmVyc2lvbi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5wcm90b2NvbCA9IDQ7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFja2V0IHR5cGVzLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLnR5cGVzID0gWydDT05ORUNUJywgJ0RJU0NPTk5FQ1QnLCAnRVZFTlQnLCAnQUNLJywgJ0VSUk9SJywgJ0JJTkFSWV9FVkVOVCcsICdCSU5BUllfQUNLJ107XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogUGFja2V0IHR5cGUgYGNvbm5lY3RgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkNPTk5FQ1QgPSAwO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBkaXNjb25uZWN0YC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5ESVNDT05ORUNUID0gMTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSBgZXZlbnRgLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkVWRU5UID0gMjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSBgYWNrYC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5BQ0sgPSAzO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhY2tldCB0eXBlIGBlcnJvcmAuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuRVJST1IgPSA0O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFBhY2tldCB0eXBlICdiaW5hcnkgZXZlbnQnXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuQklOQVJZX0VWRU5UID0gNTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBQYWNrZXQgdHlwZSBgYmluYXJ5IGFja2AuIEZvciBhY2tzIHdpdGggYmluYXJ5IGFyZ3VtZW50cy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZXhwb3J0cy5CSU5BUllfQUNLID0gNjtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGVyIGNvbnN0cnVjdG9yLlxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBleHBvcnRzLkVuY29kZXIgPSBFbmNvZGVyO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXIgY29uc3RydWN0b3IuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGV4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBzb2NrZXQuaW8gRW5jb2RlciBpbnN0YW5jZVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBFbmNvZGVyKCkge31cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcclxuICAgICAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XHJcbiAgICAgICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSBmdW5jdGlvbiB0byBoYW5kbGUgZW5jb2RpbmdzIChsaWtlbHkgZW5naW5lLndyaXRlKVxyXG4gICAgICAgICAqIEByZXR1cm4gQ2FsbHMgY2FsbGJhY2sgd2l0aCBBcnJheSBvZiBlbmNvZGluZ3NcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVuY29kZXIucHJvdG90eXBlLmVuY29kZSA9IGZ1bmN0aW9uIChvYmosIGNhbGxiYWNrKSB7XG4gICAgICAgICAgZGVidWcoJ2VuY29kaW5nIHBhY2tldCAlaicsIG9iaik7XG5cbiAgICAgICAgICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gb2JqLnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IG9iai50eXBlKSB7XG4gICAgICAgICAgICBlbmNvZGVBc0JpbmFyeShvYmosIGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGVuY29kaW5nID0gZW5jb2RlQXNTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGNhbGxiYWNrKFtlbmNvZGluZ10pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGUgcGFja2V0IGFzIHN0cmluZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IGVuY29kZWRcclxuICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgKi9cblxuICAgICAgICBmdW5jdGlvbiBlbmNvZGVBc1N0cmluZyhvYmopIHtcbiAgICAgICAgICB2YXIgc3RyID0gJyc7XG4gICAgICAgICAgdmFyIG5zcCA9IGZhbHNlO1xuXG4gICAgICAgICAgLy8gZmlyc3QgaXMgdHlwZVxuICAgICAgICAgIHN0ciArPSBvYmoudHlwZTtcblxuICAgICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICAgIGlmIChleHBvcnRzLkJJTkFSWV9FVkVOVCA9PSBvYmoudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gb2JqLnR5cGUpIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouYXR0YWNobWVudHM7XG4gICAgICAgICAgICBzdHIgKz0gJy0nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGlmIHdlIGhhdmUgYSBuYW1lc3BhY2Ugb3RoZXIgdGhhbiBgL2BcbiAgICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgICBpZiAob2JqLm5zcCAmJiAnLycgIT0gb2JqLm5zcCkge1xuICAgICAgICAgICAgbnNwID0gdHJ1ZTtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IHRoZSBpZFxuICAgICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgaWYgKG5zcCkge1xuICAgICAgICAgICAgICBzdHIgKz0gJywnO1xuICAgICAgICAgICAgICBuc3AgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0ciArPSBvYmouaWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8ganNvbiBkYXRhXG4gICAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIGlmIChuc3ApIHN0ciArPSAnLCc7XG4gICAgICAgICAgICBzdHIgKz0ganNvbi5zdHJpbmdpZnkob2JqLmRhdGEpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlYnVnKCdlbmNvZGVkICVqIGFzICVzJywgb2JqLCBzdHIpO1xuICAgICAgICAgIHJldHVybiBzdHI7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcclxuICAgICAgICAgKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXHJcbiAgICAgICAgICogYSBsaXN0IG9mIGJ1ZmZlcnMuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQHJldHVybiB7QnVmZmVyfSBlbmNvZGVkXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlQXNCaW5hcnkob2JqLCBjYWxsYmFjaykge1xuXG4gICAgICAgICAgZnVuY3Rpb24gd3JpdGVFbmNvZGluZyhibG9ibGVzc0RhdGEpIHtcbiAgICAgICAgICAgIHZhciBkZWNvbnN0cnVjdGlvbiA9IGJpbmFyeS5kZWNvbnN0cnVjdFBhY2tldChibG9ibGVzc0RhdGEpO1xuICAgICAgICAgICAgdmFyIHBhY2sgPSBlbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgICAgICAgICAgdmFyIGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuXG4gICAgICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgICAgICBjYWxsYmFjayhidWZmZXJzKTsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYmluYXJ5LnJlbW92ZUJsb2JzKG9iaiwgd3JpdGVFbmNvZGluZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcclxuICAgICAgICAgKiBBIHNvY2tldC5pbyBEZWNvZGVyIGluc3RhbmNlXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIGZ1bmN0aW9uIERlY29kZXIoKSB7XG4gICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1peCBpbiBgRW1pdHRlcmAgd2l0aCBEZWNvZGVyLlxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEVtaXR0ZXIoRGVjb2Rlci5wcm90b3R5cGUpO1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlY29kZXMgYW4gZWNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cblxuICAgICAgICBEZWNvZGVyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgdmFyIHBhY2tldDtcbiAgICAgICAgICBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIG9iaikge1xuICAgICAgICAgICAgcGFja2V0ID0gZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBpZiAoZXhwb3J0cy5CSU5BUllfRVZFTlQgPT0gcGFja2V0LnR5cGUgfHwgZXhwb3J0cy5CSU5BUllfQUNLID09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgIC8vIGJpbmFyeSBwYWNrZXQncyBqc29uXG4gICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG5cbiAgICAgICAgICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvci5yZWNvblBhY2suYXR0YWNobWVudHMgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICAgICAgICAgIHRoaXMuZW1pdCgnZGVjb2RlZCcsIHBhY2tldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0J1ZihvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXQnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHBhY2tldCA9IHRoaXMucmVjb25zdHJ1Y3Rvci50YWtlQmluYXJ5RGF0YShvYmopO1xuICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgLy8gcmVjZWl2ZWQgZmluYWwgYnVmZmVyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ2RlY29kZWQnLCBwYWNrZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biB0eXBlOiAnICsgb2JqKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxyXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICAgIHZhciBwID0ge307XG4gICAgICAgICAgdmFyIGkgPSAwO1xuXG4gICAgICAgICAgLy8gbG9vayB1cCB0eXBlXG4gICAgICAgICAgcC50eXBlID0gTnVtYmVyKHN0ci5jaGFyQXQoMCkpO1xuICAgICAgICAgIGlmIChudWxsID09IGV4cG9ydHMudHlwZXNbcC50eXBlXSkgcmV0dXJuIGVycm9yKCk7XG5cbiAgICAgICAgICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gICAgICAgICAgaWYgKGV4cG9ydHMuQklOQVJZX0VWRU5UID09IHAudHlwZSB8fCBleHBvcnRzLkJJTkFSWV9BQ0sgPT0gcC50eXBlKSB7XG4gICAgICAgICAgICB2YXIgYnVmID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAoc3RyLmNoYXJBdCgrK2kpICE9ICctJykge1xuICAgICAgICAgICAgICBidWYgKz0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgaWYgKGkgPT0gc3RyLmxlbmd0aCkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVmICE9IE51bWJlcihidWYpIHx8IHN0ci5jaGFyQXQoaSkgIT0gJy0nKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSWxsZWdhbCBhdHRhY2htZW50cycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgICAgaWYgKCcvJyA9PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgICAgICAgICAgcC5uc3AgPSAnJztcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICBpZiAoJywnID09IGMpIGJyZWFrO1xuICAgICAgICAgICAgICBwLm5zcCArPSBjO1xuICAgICAgICAgICAgICBpZiAoaSA9PSBzdHIubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSAnLyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gbG9vayB1cCBpZFxuICAgICAgICAgIHZhciBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gICAgICAgICAgaWYgKCcnICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgICAgICAgICBwLmlkID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwLmlkICs9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgIGlmIChpID09IHN0ci5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5pZCA9IE51bWJlcihwLmlkKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICAgICAgICAgIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHAuZGF0YSA9IGpzb24ucGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBlcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGRlYnVnKCdkZWNvZGVkICVzIGFzICVqJywgc3RyLCBwKTtcbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAYXBpIHB1YmxpY1xyXG4gICAgICAgICAqL1xuXG4gICAgICAgIERlY29kZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxyXG4gICAgICAgICAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXHJcbiAgICAgICAgICogZGVjb2RlZC5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcclxuICAgICAgICAgKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgZnVuY3Rpb24gQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cclxuICAgICAgICAgKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxyXG4gICAgICAgICAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXHJcbiAgICAgICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXHJcbiAgICAgICAgICogQGFwaSBwcml2YXRlXHJcbiAgICAgICAgICovXG5cbiAgICAgICAgQmluYXJ5UmVjb25zdHJ1Y3Rvci5wcm90b3R5cGUudGFrZUJpbmFyeURhdGEgPSBmdW5jdGlvbiAoYmluRGF0YSkge1xuICAgICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICAgIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICAgICAgICAgIHZhciBwYWNrZXQgPSBiaW5hcnkucmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBhcGkgcHJpdmF0ZVxyXG4gICAgICAgICAqL1xuXG4gICAgICAgIEJpbmFyeVJlY29uc3RydWN0b3IucHJvdG90eXBlLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBudWxsO1xuICAgICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGVycm9yKGRhdGEpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogZXhwb3J0cy5FUlJPUixcbiAgICAgICAgICAgIGRhdGE6ICdwYXJzZXIgZXJyb3InXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSwgeyBcIi4vYmluYXJ5XCI6IDM5LCBcIi4vaXMtYnVmZmVyXCI6IDQxLCBcImNvbXBvbmVudC1lbWl0dGVyXCI6IDQyLCBcImRlYnVnXCI6IDE0LCBcImlzYXJyYXlcIjogMzMsIFwianNvbjNcIjogMzQgfV0sIDQxOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICAoZnVuY3Rpb24gKGdsb2JhbCkge1xuXG4gICAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBpc0J1ZjtcblxuICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIGJ1ZmZlciBvciBhbiBhcnJheWJ1ZmZlci5cclxuICAgICAgICAgICAqXHJcbiAgICAgICAgICAgKiBAYXBpIHByaXZhdGVcclxuICAgICAgICAgICAqL1xuXG4gICAgICAgICAgZnVuY3Rpb24gaXNCdWYob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsLkJ1ZmZlciAmJiBnbG9iYWwuQnVmZmVyLmlzQnVmZmVyKG9iaikgfHwgZ2xvYmFsLkFycmF5QnVmZmVyICYmIG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHt9XSwgNDI6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIGFyZ3VtZW50c1s0XVsyNl1bMF0uYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgIH0sIHsgXCJkdXBcIjogMjYgfV0sIDQzOiBbZnVuY3Rpb24gKF9kZXJlcV8sIG1vZHVsZSwgZXhwb3J0cykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IHRvQXJyYXk7XG5cbiAgICAgICAgZnVuY3Rpb24gdG9BcnJheShsaXN0LCBpbmRleCkge1xuICAgICAgICAgIHZhciBhcnJheSA9IFtdO1xuXG4gICAgICAgICAgaW5kZXggPSBpbmRleCB8fCAwO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4IHx8IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcnJheVtpIC0gaW5kZXhdID0gbGlzdFtpXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gYXJyYXk7XG4gICAgICAgIH1cbiAgICAgIH0sIHt9XSwgNDQ6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgIChmdW5jdGlvbiAoZ2xvYmFsKSB7XG4gICAgICAgICAgLyohIGh0dHBzOi8vbXRocy5iZS91dGY4anMgdjIuMC4wIGJ5IEBtYXRoaWFzICovXG4gICAgICAgICAgOyhmdW5jdGlvbiAocm9vdCkge1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZXMgYGV4cG9ydHNgXG4gICAgICAgICAgICB2YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzO1xuXG4gICAgICAgICAgICAvLyBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYFxuICAgICAgICAgICAgdmFyIGZyZWVNb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiBtb2R1bGUuZXhwb3J0cyA9PSBmcmVlRXhwb3J0cyAmJiBtb2R1bGU7XG5cbiAgICAgICAgICAgIC8vIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgLCBmcm9tIE5vZGUuanMgb3IgQnJvd3NlcmlmaWVkIGNvZGUsXG4gICAgICAgICAgICAvLyBhbmQgdXNlIGl0IGFzIGByb290YFxuICAgICAgICAgICAgdmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbDtcbiAgICAgICAgICAgIGlmIChmcmVlR2xvYmFsLmdsb2JhbCA9PT0gZnJlZUdsb2JhbCB8fCBmcmVlR2xvYmFsLndpbmRvdyA9PT0gZnJlZUdsb2JhbCkge1xuICAgICAgICAgICAgICByb290ID0gZnJlZUdsb2JhbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyotLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSovXG5cbiAgICAgICAgICAgIHZhciBzdHJpbmdGcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlO1xuXG4gICAgICAgICAgICAvLyBUYWtlbiBmcm9tIGh0dHBzOi8vbXRocy5iZS9wdW55Y29kZVxuICAgICAgICAgICAgZnVuY3Rpb24gdWNzMmRlY29kZShzdHJpbmcpIHtcbiAgICAgICAgICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgICAgICAgIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgIHZhciBleHRyYTtcbiAgICAgICAgICAgICAgd2hpbGUgKGNvdW50ZXIgPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID49IDB4RDgwMCAmJiB2YWx1ZSA8PSAweERCRkYgJiYgY291bnRlciA8IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgLy8gaGlnaCBzdXJyb2dhdGUsIGFuZCB0aGVyZSBpcyBhIG5leHQgY2hhcmFjdGVyXG4gICAgICAgICAgICAgICAgICBleHRyYSA9IHN0cmluZy5jaGFyQ29kZUF0KGNvdW50ZXIrKyk7XG4gICAgICAgICAgICAgICAgICBpZiAoKGV4dHJhICYgMHhGQzAwKSA9PSAweERDMDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbG93IHN1cnJvZ2F0ZVxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCgoKHZhbHVlICYgMHgzRkYpIDw8IDEwKSArIChleHRyYSAmIDB4M0ZGKSArIDB4MTAwMDApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5tYXRjaGVkIHN1cnJvZ2F0ZTsgb25seSBhcHBlbmQgdGhpcyBjb2RlIHVuaXQsIGluIGNhc2UgdGhlIG5leHRcbiAgICAgICAgICAgICAgICAgICAgLy8gY29kZSB1bml0IGlzIHRoZSBoaWdoIHN1cnJvZ2F0ZSBvZiBhIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlci0tO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBvdXRwdXQucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiBvdXRwdXQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFRha2VuIGZyb20gaHR0cHM6Ly9tdGhzLmJlL3B1bnljb2RlXG4gICAgICAgICAgICBmdW5jdGlvbiB1Y3MyZW5jb2RlKGFycmF5KSB7XG4gICAgICAgICAgICAgIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgICAgICAgIHZhciBvdXRwdXQgPSAnJztcbiAgICAgICAgICAgICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPiAweEZGRkYpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlIC09IDB4MTAwMDA7XG4gICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gc3RyaW5nRnJvbUNoYXJDb2RlKHZhbHVlID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlID0gMHhEQzAwIHwgdmFsdWUgJiAweDNGRjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHN0cmluZ0Zyb21DaGFyQ29kZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gY2hlY2tTY2FsYXJWYWx1ZShjb2RlUG9pbnQpIHtcbiAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA+PSAweEQ4MDAgJiYgY29kZVBvaW50IDw9IDB4REZGRikge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdMb25lIHN1cnJvZ2F0ZSBVKycgKyBjb2RlUG9pbnQudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKCkgKyAnIGlzIG5vdCBhIHNjYWxhciB2YWx1ZScpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAgICAgZnVuY3Rpb24gY3JlYXRlQnl0ZShjb2RlUG9pbnQsIHNoaWZ0KSB7XG4gICAgICAgICAgICAgIHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IHNoaWZ0ICYgMHgzRiB8IDB4ODApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBlbmNvZGVDb2RlUG9pbnQoY29kZVBvaW50KSB7XG4gICAgICAgICAgICAgIGlmICgoY29kZVBvaW50ICYgMHhGRkZGRkY4MCkgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIDEtYnl0ZSBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHJldHVybiBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgc3ltYm9sID0gJyc7XG4gICAgICAgICAgICAgIGlmICgoY29kZVBvaW50ICYgMHhGRkZGRjgwMCkgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIDItYnl0ZSBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgIHN5bWJvbCA9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgPj4gNiAmIDB4MUYgfCAweEMwKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICgoY29kZVBvaW50ICYgMHhGRkZGMDAwMCkgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIDMtYnl0ZSBzZXF1ZW5jZVxuICAgICAgICAgICAgICAgIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KTtcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDEyICYgMHgwRiB8IDB4RTApO1xuICAgICAgICAgICAgICAgIHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoKGNvZGVQb2ludCAmIDB4RkZFMDAwMDApID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyA0LWJ5dGUgc2VxdWVuY2VcbiAgICAgICAgICAgICAgICBzeW1ib2wgPSBzdHJpbmdGcm9tQ2hhckNvZGUoY29kZVBvaW50ID4+IDE4ICYgMHgwNyB8IDB4RjApO1xuICAgICAgICAgICAgICAgIHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgMTIpO1xuICAgICAgICAgICAgICAgIHN5bWJvbCArPSBjcmVhdGVCeXRlKGNvZGVQb2ludCwgNik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3ltYm9sICs9IHN0cmluZ0Zyb21DaGFyQ29kZShjb2RlUG9pbnQgJiAweDNGIHwgMHg4MCk7XG4gICAgICAgICAgICAgIHJldHVybiBzeW1ib2w7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIHV0ZjhlbmNvZGUoc3RyaW5nKSB7XG4gICAgICAgICAgICAgIHZhciBjb2RlUG9pbnRzID0gdWNzMmRlY29kZShzdHJpbmcpO1xuICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gY29kZVBvaW50cy5sZW5ndGg7XG4gICAgICAgICAgICAgIHZhciBpbmRleCA9IC0xO1xuICAgICAgICAgICAgICB2YXIgY29kZVBvaW50O1xuICAgICAgICAgICAgICB2YXIgYnl0ZVN0cmluZyA9ICcnO1xuICAgICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludCA9IGNvZGVQb2ludHNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIGJ5dGVTdHJpbmcgKz0gZW5jb2RlQ29kZVBvaW50KGNvZGVQb2ludCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGJ5dGVTdHJpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8qLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG4gICAgICAgICAgICBmdW5jdGlvbiByZWFkQ29udGludWF0aW9uQnl0ZSgpIHtcbiAgICAgICAgICAgICAgaWYgKGJ5dGVJbmRleCA+PSBieXRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcignSW52YWxpZCBieXRlIGluZGV4Jyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgY29udGludWF0aW9uQnl0ZSA9IGJ5dGVBcnJheVtieXRlSW5kZXhdICYgMHhGRjtcbiAgICAgICAgICAgICAgYnl0ZUluZGV4Kys7XG5cbiAgICAgICAgICAgICAgaWYgKChjb250aW51YXRpb25CeXRlICYgMHhDMCkgPT0gMHg4MCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb250aW51YXRpb25CeXRlICYgMHgzRjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIElmIHdlIGVuZCB1cCBoZXJlLCBpdOKAmXMgbm90IGEgY29udGludWF0aW9uIGJ5dGVcbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgY29udGludWF0aW9uIGJ5dGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZGVjb2RlU3ltYm9sKCkge1xuICAgICAgICAgICAgICB2YXIgYnl0ZTE7XG4gICAgICAgICAgICAgIHZhciBieXRlMjtcbiAgICAgICAgICAgICAgdmFyIGJ5dGUzO1xuICAgICAgICAgICAgICB2YXIgYnl0ZTQ7XG4gICAgICAgICAgICAgIHZhciBjb2RlUG9pbnQ7XG5cbiAgICAgICAgICAgICAgaWYgKGJ5dGVJbmRleCA+IGJ5dGVDb3VudCkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGJ5dGUgaW5kZXgnKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPT0gYnl0ZUNvdW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmVhZCBmaXJzdCBieXRlXG4gICAgICAgICAgICAgIGJ5dGUxID0gYnl0ZUFycmF5W2J5dGVJbmRleF0gJiAweEZGO1xuICAgICAgICAgICAgICBieXRlSW5kZXgrKztcblxuICAgICAgICAgICAgICAvLyAxLWJ5dGUgc2VxdWVuY2UgKG5vIGNvbnRpbnVhdGlvbiBieXRlcylcbiAgICAgICAgICAgICAgaWYgKChieXRlMSAmIDB4ODApID09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnl0ZTE7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyAyLWJ5dGUgc2VxdWVuY2VcbiAgICAgICAgICAgICAgaWYgKChieXRlMSAmIDB4RTApID09IDB4QzApIHtcbiAgICAgICAgICAgICAgICB2YXIgYnl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludCA9IChieXRlMSAmIDB4MUYpIDw8IDYgfCBieXRlMjtcbiAgICAgICAgICAgICAgICBpZiAoY29kZVBvaW50ID49IDB4ODApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlUG9pbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gMy1ieXRlIHNlcXVlbmNlIChtYXkgaW5jbHVkZSB1bnBhaXJlZCBzdXJyb2dhdGVzKVxuICAgICAgICAgICAgICBpZiAoKGJ5dGUxICYgMHhGMCkgPT0gMHhFMCkge1xuICAgICAgICAgICAgICAgIGJ5dGUyID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcbiAgICAgICAgICAgICAgICBieXRlMyA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG4gICAgICAgICAgICAgICAgY29kZVBvaW50ID0gKGJ5dGUxICYgMHgwRikgPDwgMTIgfCBieXRlMiA8PCA2IHwgYnl0ZTM7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA+PSAweDA4MDApIHtcbiAgICAgICAgICAgICAgICAgIGNoZWNrU2NhbGFyVmFsdWUoY29kZVBvaW50KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlUG9pbnQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdJbnZhbGlkIGNvbnRpbnVhdGlvbiBieXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gNC1ieXRlIHNlcXVlbmNlXG4gICAgICAgICAgICAgIGlmICgoYnl0ZTEgJiAweEY4KSA9PSAweEYwKSB7XG4gICAgICAgICAgICAgICAgYnl0ZTIgPSByZWFkQ29udGludWF0aW9uQnl0ZSgpO1xuICAgICAgICAgICAgICAgIGJ5dGUzID0gcmVhZENvbnRpbnVhdGlvbkJ5dGUoKTtcbiAgICAgICAgICAgICAgICBieXRlNCA9IHJlYWRDb250aW51YXRpb25CeXRlKCk7XG4gICAgICAgICAgICAgICAgY29kZVBvaW50ID0gKGJ5dGUxICYgMHgwRikgPDwgMHgxMiB8IGJ5dGUyIDw8IDB4MEMgfCBieXRlMyA8PCAweDA2IHwgYnl0ZTQ7XG4gICAgICAgICAgICAgICAgaWYgKGNvZGVQb2ludCA+PSAweDAxMDAwMCAmJiBjb2RlUG9pbnQgPD0gMHgxMEZGRkYpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBjb2RlUG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0ludmFsaWQgVVRGLTggZGV0ZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGJ5dGVBcnJheTtcbiAgICAgICAgICAgIHZhciBieXRlQ291bnQ7XG4gICAgICAgICAgICB2YXIgYnl0ZUluZGV4O1xuICAgICAgICAgICAgZnVuY3Rpb24gdXRmOGRlY29kZShieXRlU3RyaW5nKSB7XG4gICAgICAgICAgICAgIGJ5dGVBcnJheSA9IHVjczJkZWNvZGUoYnl0ZVN0cmluZyk7XG4gICAgICAgICAgICAgIGJ5dGVDb3VudCA9IGJ5dGVBcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgIGJ5dGVJbmRleCA9IDA7XG4gICAgICAgICAgICAgIHZhciBjb2RlUG9pbnRzID0gW107XG4gICAgICAgICAgICAgIHZhciB0bXA7XG4gICAgICAgICAgICAgIHdoaWxlICgodG1wID0gZGVjb2RlU3ltYm9sKCkpICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGNvZGVQb2ludHMucHVzaCh0bXApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB1Y3MyZW5jb2RlKGNvZGVQb2ludHMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvKi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tKi9cblxuICAgICAgICAgICAgdmFyIHV0ZjggPSB7XG4gICAgICAgICAgICAgICd2ZXJzaW9uJzogJzIuMC4wJyxcbiAgICAgICAgICAgICAgJ2VuY29kZSc6IHV0ZjhlbmNvZGUsXG4gICAgICAgICAgICAgICdkZWNvZGUnOiB1dGY4ZGVjb2RlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyBTb21lIEFNRCBidWlsZCBvcHRpbWl6ZXJzLCBsaWtlIHIuanMsIGNoZWNrIGZvciBzcGVjaWZpYyBjb25kaXRpb24gcGF0dGVybnNcbiAgICAgICAgICAgIC8vIGxpa2UgdGhlIGZvbGxvd2luZzpcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1dGY4O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZnJlZUV4cG9ydHMgJiYgIWZyZWVFeHBvcnRzLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgIGlmIChmcmVlTW9kdWxlKSB7XG4gICAgICAgICAgICAgICAgLy8gaW4gTm9kZS5qcyBvciBSaW5nb0pTIHYwLjguMCtcbiAgICAgICAgICAgICAgICBmcmVlTW9kdWxlLmV4cG9ydHMgPSB1dGY4O1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGluIE5hcndoYWwgb3IgUmluZ29KUyB2MC43LjAtXG4gICAgICAgICAgICAgICAgdmFyIG9iamVjdCA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdC5oYXNPd25Qcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdXRmOCkge1xuICAgICAgICAgICAgICAgICAgaGFzT3duUHJvcGVydHkuY2FsbCh1dGY4LCBrZXkpICYmIChmcmVlRXhwb3J0c1trZXldID0gdXRmOFtrZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIGluIFJoaW5vIG9yIGEgd2ViIGJyb3dzZXJcbiAgICAgICAgICAgICAgcm9vdC51dGY4ID0gdXRmODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSh0aGlzKTtcbiAgICAgICAgfSkuY2FsbCh0aGlzLCB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHt9KTtcbiAgICAgIH0sIHt9XSwgNDU6IFtmdW5jdGlvbiAoX2RlcmVxXywgbW9kdWxlLCBleHBvcnRzKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcblxuICAgICAgICB2YXIgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLFxuICAgICAgICAgICAgbGVuZ3RoID0gNjQsXG4gICAgICAgICAgICBtYXAgPSB7fSxcbiAgICAgICAgICAgIHNlZWQgPSAwLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBwcmV2O1xuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybiBhIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIHNwZWNpZmllZCBudW1iZXIuXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbnVtIFRoZSBudW1iZXIgdG8gY29udmVydC5cclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBudW1iZXIuXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuICAgICAgICAgIHZhciBlbmNvZGVkID0gJyc7XG5cbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBlbmNvZGVkID0gYWxwaGFiZXRbbnVtICUgbGVuZ3RoXSArIGVuY29kZWQ7XG4gICAgICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gICAgICAgICAgfSB3aGlsZSAobnVtID4gMCk7XG5cbiAgICAgICAgICByZXR1cm4gZW5jb2RlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXHJcbiAgICAgICAgICogQGFwaSBwdWJsaWNcclxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgICAgICAgIHZhciBkZWNvZGVkID0gMDtcblxuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBkZWNvZGVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd9IEEgdW5pcXVlIGlkLlxyXG4gICAgICAgICAqIEBhcGkgcHVibGljXHJcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHllYXN0KCkge1xuICAgICAgICAgIHZhciBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuXG4gICAgICAgICAgaWYgKG5vdyAhPT0gcHJldikgcmV0dXJuIHNlZWQgPSAwLCBwcmV2ID0gbm93O1xuICAgICAgICAgIHJldHVybiBub3cgKyAnLicgKyBlbmNvZGUoc2VlZCsrKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIE1hcCBlYWNoIGNoYXJhY3RlciB0byBpdHMgaW5kZXguXG4gICAgICAgIC8vXG4gICAgICAgIGZvciAoOyBpIDwgbGVuZ3RoOyBpKyspIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIEV4cG9zZSB0aGUgYHllYXN0YCwgYGVuY29kZWAgYW5kIGBkZWNvZGVgIGZ1bmN0aW9ucy5cbiAgICAgICAgLy9cbiAgICAgICAgeWVhc3QuZW5jb2RlID0gZW5jb2RlO1xuICAgICAgICB5ZWFzdC5kZWNvZGUgPSBkZWNvZGU7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0geWVhc3Q7XG4gICAgICB9LCB7fV0gfSwge30sIFsxXSkoMSk7XG4gIH0pO1xufTtcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI3NjYzVmhBcjFHUUw4VlBCQ3RKZHJrJywgJ3R5cGUnKTtcbi8vIFNjcmlwdFxcdHlwZS5qc1xuXG4vL+WbnuWQiOmYtuautVxud2luZG93LlBIQVNFX05VTEwgPSAwO1xud2luZG93LlBIQVNFX0JFR0lOX1RVUk4gPSAxO1xud2luZG93LlBIQVNFX01BSU5fVFVSTiA9IDI7XG53aW5kb3cuUEhBU0VfRU5EX1RVUk4gPSAzO1xuXG4vL+WuouaIt+err+S4juacjeWKoeerr+mAmuS/oeWHveaVsFxuXG4vL+eZu+W9lVxud2luZG93LldDX0NPTk5FQ1RFRCA9ICdXQ19DT05ORUNURUQnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgei/nuaOpeWTjeW6lFxud2luZG93LkNXX0xPR0lOX1JFUVVFU1QgPSAnQ1dfTE9HSU5fUkVRVUVTVCc7IC8v5a6i5oi356uv5ZCR5pyN5Yqh56uv5Y+R6YCB55m75b2V6K+35rGCXG53aW5kb3cuV0NfTE9HSU5fUkVTUE9OU0UgPSAnV0NfTE9HSU5fUkVTUE9OU0UnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgeeZu+W9leWTjeW6lFxud2luZG93LkNXX0VOVEVSUk9PTV9SRVFVRVNUID0gJ0NXX0VOVEVSUk9PTV9SRVFVRVNUJzsgLy/lrqLmiLfnq6/lkJHmnI3liqHnq6/lj5HpgIHov5vlhaXmiL/pl7Tor7fmsYJcbndpbmRvdy5XQ19FTlRFUlJPT01fUkVTUE9OU0UgPSAnV0NfRU5URVJST09NX1JFU1BPTlNFJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIHov5vlhaXmiL/pl7Tlk43lupRcblxuLy/ogYrlpKlcbndpbmRvdy5DV19DSEFUX0FERF9SRVFVRVNUID0gJ0NXX0NIQVRfQUREX1JFUVVFU1QnOyAvL+WuouaIt+err+WQkeacjeWKoeerr+WPkemAgeiBiuWkqeS/oeaBr+ivt+axglxud2luZG93LldDX0NIQVRfQUREX1JFU1BPTlNFID0gJ1dDX0NIQVRfQUREX1JFU1BPTlNFJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIHogYrlpKnkv6Hmga/lk43lupRcbndpbmRvdy5XQ19DSEFUX0FERCA9ICdXQ19DSEFUX0FERCc7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCB6IGK5aSp5L+h5oGvXG5cbi8vUGxheWVyXG53aW5kb3cuV0NfUExBWUVSX0FERCA9ICdXQ19QTEFZRVJfQUREJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIFQTEFZRVLmt7vliqAo6Ieq5bexKVxud2luZG93LldDX1BMQVlFUl9BRERfT1RIRVIgPSAnV0NfUExBWUVSX0FERF9PVEhFUic7IC8v5pyN5Yqh56uv5ZCR5a6i5oi356uv5Y+R6YCBUExBWUVS5re75YqgKOWIq+S6uilcbndpbmRvdy5XQ19QTEFZRVJfVVBEQVRFID0gJ1dDX1BMQVlFUl9VUERBVEUnOyAvL+acjeWKoeerr+WQkeWuouaIt+err+WPkemAgVBMQVlFUuabtOaWsFxuXG4vL+aIv+mXtFxud2luZG93LkNXX0RVRUxSRUFEWV9SRVFVRVNUID0gJ0NXX0RVRUxSRUFEWV9SRVFVRVNUJzsgLy/lrqLmiLfnq6/lkJHmnI3liqHnq6/lj5HpgIHlh4blpIflvIDlp4vmuLjmiI/or7fmsYJcbndpbmRvdy5XQ19EVUVMUkVBRFlfUkVTUE9OU0UgPSAnV0NfRFVFTFJFQURZX1JFU1BPTlNFJzsgLy/mnI3liqHnq6/lkJHlrqLmiLfnq6/lj5HpgIHlh4blpIflvIDlp4vmuLjmiI/lk43lupRcbndpbmRvdy5XQ19EVUVMUkVBRFkgPSAnV0NfRFVFTFJFQURZJzsgLy/mnI3liqHnq6/nu5nlrqLmiLfnq6/lj5HpgIHnlKjmiLflh4blpIdcbndpbmRvdy5zaG93VGlwTGFiZWwgPSBmdW5jdGlvbiBzaG93VGlwTGFiZWwoc3RyLCBjb2xvcikge1xuICAgIC8v5paH5a2X5qCH562+5Yib5bu6XG4gICAgdmFyIG5vZGUgPSBuZXcgY2MuTm9kZSgpO1xuICAgIHZhciBsYWJlbCA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcbiAgICBpZiAoY29sb3IpIG5vZGUuY29sb3IgPSBjb2xvcjtcblxuICAgIGxhYmVsLnN0cmluZyA9IHN0cjtcbiAgICBub2RlLnNldFBvc2l0aW9uKDAsIDApO1xuICAgIHZhciBzY2VuZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkuZ2V0Q2hpbGRCeU5hbWUoJ0NhbnZhcycpO1xuICAgIHNjZW5lLmFkZENoaWxkKG5vZGUpO1xuXG4gICAgLy8y56eS5ZCO5raI5aSxXG4gICAgdmFyIGZhZGVvdXQgPSBjYy5mYWRlT3V0KDIpO1xuICAgIHZhciBjYWxsRnVuYyA9IGNjLmNhbGxGdW5jKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGNjLmxvZygnbm9kZSBpcyB3aGF0OiVzJywgbm9kZS54KTtcbiAgICAgICAgbm9kZS5kZXN0cm95KCk7XG4gICAgfSwgbm9kZSwgbnVsbCk7XG5cbiAgICB2YXIgc2VxID0gY2Muc2VxdWVuY2UoZmFkZW91dCwgY2FsbEZ1bmMpO1xuICAgIG5vZGUucnVuQWN0aW9uKHNlcSk7XG59O1xuXG5jYy5fUkZwb3AoKTsiXX0=
