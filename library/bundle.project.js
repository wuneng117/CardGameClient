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
},{}],"HelloWorld":[function(require,module,exports){
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
},{"./data/CardDataManager":"CardDataManager"}],"MonsterSprite":[function(require,module,exports){
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

var tempDeck = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
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

        //自己
        localPlayer: {
            'default': null,
            type: Player
        },

        //对手
        opponentPlayer: {
            'default': null,
            type: Player
        },

        turn: 0, //当前双方总回合数
        turnPhase: 0, //行动状态

        //状态相关
        enterTurnFunc: {
            'default': []
        },

        turnFunc: {
            'default': []
        },

        leaveTurnFunc: {
            'default': []
        }
    },

    setInputControl: function setInputControl() {
        var self = this;
        this.node.on('touchstart', function (event) {
            cc.log('1231312321313213123');
            cc.log(event.getLocationX());
        }, this);
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
    turnEnd: function turnEnd() {
        //不是MainPhase这个按钮不能按
        if (this.turnPhase !== PHASE_MAIN_TURN) return;

        this.changePhase(PHASE_END_TURN);
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
        if (this.turnPhase !== 0) {
            this.leaveTurnFunc[this.turnPhase]();
        }

        this.enterTurnFunc[nextTurnType]();
        this.turnPhase = nextTurnType;
    },

    // use this for initialization
    onLoad: function onLoad() {
        //this.setInputControl();
        //
        this.enterTurnFunc[PHASE_BEGIN_TURN] = this.enterBeginTurn.bind(this);
        this.enterTurnFunc[PHASE_MAIN_TURN] = this.enterMainTurn.bind(this);
        this.enterTurnFunc[PHASE_END_TURN] = this.enterEndTurn.bind(this);

        this.turnFunc[PHASE_BEGIN_TURN] = this.beginTurn.bind(this);
        this.turnFunc[PHASE_MAIN_TURN] = this.mainTurn.bind(this);
        this.turnFunc[PHASE_END_TURN] = this.endTurn.bind(this);

        this.leaveTurnFunc[PHASE_BEGIN_TURN] = this.leaveBeginTurn.bind(this);
        this.leaveTurnFunc[PHASE_MAIN_TURN] = this.leaveMainTurn.bind(this);
        this.leaveTurnFunc[PHASE_END_TURN] = this.leaveEndTurn.bind(this);
    },

    start: function start() {
        this.startGame();
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        this.turnFunc[this.turnPhase]();
    }
});

cc._RFpop();
},{"player":"player"}],"monster":[function(require,module,exports){
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
        _opponentPlayer: null, //对手player
        _isTurnActive: false, //是否可以行动

        heroName: '', //玩家名字
        hp: 30, //英雄生命值
        critical: 0, //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        //handCard: 0,   
        deckArray: [], //卡组数组（Card类型）
        handArray: [], //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（CardMonster类型）
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
        this.duel = duel;
        this.hp = 30;
        this.critical = 0;
        this.maxCritical = 0;
        this.deckArray = [];
        this.handArray = [];
        this.fieldArray = [];
        for (var i = 0; i < this.handCardSpriteArray.length; ++i) {
            //this.handCardSpriteArray[i].destory();
            this.cardPool.put(this.handCardSpriteArray[i]);
        }

        this.refreshcriticalsprite();
        this.refreshHandCard();
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

    //水晶图片刷新
    refreshcriticalsprite: function refreshcriticalsprite() {
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
    },

    refreshHpLabel: function refreshHpLabel() {
        this.heroHpLabel.string = this.hp.toString();
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
},{"./data/CardDataManager":"CardDataManager","card":"card","monster":"monster"}]},{},["CardSprite","HelloWorld","duel","card","monster","player","MonsterSprite","CardDataManager","CardData"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvZGF0YS9DYXJkRGF0YU1hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L2RhdGEvQ2FyZERhdGEuanMiLCJhc3NldHMvU2NyaXB0L0NhcmRTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L0hlbGxvV29ybGQuanMiLCJhc3NldHMvU2NyaXB0L01vbnN0ZXJTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L2NhcmQuanMiLCJhc3NldHMvU2NyaXB0L2R1ZWwuanMiLCJhc3NldHMvU2NyaXB0L21vbnN0ZXIuanMiLCJhc3NldHMvU2NyaXB0L3BsYXllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdlNmEwZmF6ZXNwSmZKdXgvWE5YQnlWdCcsICdDYXJkRGF0YU1hbmFnZXInKTtcbi8vIFNjcmlwdFxcZGF0YVxcQ2FyZERhdGFNYW5hZ2VyLmpzXG5cbnZhciBDYXJkRGF0YSA9IHJlcXVpcmUoJ0NhcmREYXRhJyk7XG5cbnZhciBjYXJkRGF0YVRlc3QgPSBbW1wiYVwiLCAwLCAxLCAxXSwgW1wiYlwiLCAxLCAxLCAzXSwgW1wiY1wiLCAxLCAyLCAxXSwgW1wiZFwiLCAyLCAyLCAzXSwgW1wiZVwiLCAyLCAzLCAyXSwgW1wiZlwiLCAyLCA0LCAxXSwgW1wiZ1wiLCAyLCAxLCA0XSwgW1wiaFwiLCAzLCAyLCA0XSwgW1wiaVwiLCAzLCA1LCAxXSwgW1wialwiLCAzLCAzLCAzXSwgW1wia1wiLCAzLCA0LCAyXSwgW1wibFwiLCA0LCAzLCA1XSwgW1wibVwiLCA0LCA1LCAyXSwgW1wiblwiLCA0LCA0LCA0XSwgW1wib1wiLCA0LCAyLCA2XSwgW1wicFwiLCA0LCAxLCA3XSwgW1wicVwiLCA1LCAzLCA2XSwgW1wiclwiLCA1LCA0LCA1XSwgW1wic1wiLCA1LCA1LCA0XSwgW1widFwiLCA1LCA1LCA1XSwgW1widVwiLCA1LCA2LCAyXSwgW1widlwiLCA1LCA2LCAzXSwgW1wid1wiLCA2LCAzLCA4XSwgW1wieFwiLCA2LCA0LCA2XSwgW1wieVwiLCA2LCA1LCA2XSwgW1wielwiLCA2LCA2LCA2XSwgW1wiQVwiLCA2LCA2LCA1XSwgW1wiQlwiLCA2LCA3LCAzXSwgW1wiQ1wiLCA2LCA4LCAxXSwgW1wiRFwiLCA3LCA3LCA3XSwgW1wiRVwiLCA3LCA0LCA4XSwgW1wiRlwiLCA3LCA2LCA4XSwgW1wiR1wiLCA3LCA3LCA3XSwgW1wiSFwiLCA4LCA4LCA4XSwgW1wiSVwiLCA4LCA3LCA5XSwgW1wiSlwiLCA4LCA5LCA2XSwgW1wiS1wiLCA5LCA5LCA5XSwgW1wiTFwiLCAxMCwgMTIsIDEyXV07XG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIHN0YXRpY3M6IHtcbiAgICAgICAgY2FyZE1hcDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IHt9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2FyZERhdGFUZXN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGNhcmQgPSBuZXcgQ2FyZERhdGEoKTtcbiAgICAgICAgICAgICAgICBjYXJkLmNhcmROYW1lID0gY2FyZERhdGFUZXN0W2ldWzBdO1xuICAgICAgICAgICAgICAgIGNhcmQuY3JpdGljYWwgPSBjYXJkRGF0YVRlc3RbaV1bMV07XG4gICAgICAgICAgICAgICAgY2FyZC5hdGsgPSBjYXJkRGF0YVRlc3RbaV1bMl07XG4gICAgICAgICAgICAgICAgY2FyZC5ocCA9IGNhcmREYXRhVGVzdFtpXVszXTtcbiAgICAgICAgICAgICAgICB0aGlzLmNhcmRNYXBbY2FyZC5jYXJkTmFtZV0gPSBjYXJkO1xuICAgICAgICAgICAgICAgIC8vY2MubG9nKGNhcmREYXRhVGVzdFtpXVswXSxjYXJkRGF0YVRlc3RbaV1bMV0sY2FyZERhdGFUZXN0W2ldWzJdLGNhcmREYXRhVGVzdFtpXVszXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICdmMWQ4ZWJCdVB4QnlyWHFnb0RsRzNiTycsICdDYXJkRGF0YScpO1xuLy8gU2NyaXB0XFxkYXRhXFxDYXJkRGF0YS5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgaHA6IDAsXG4gICAgICAgIGF0azogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICcwOWIwMi9pbnVOTlFyaGNta0hNcDNuNycsICdDYXJkU3ByaXRlJyk7XG4vLyBTY3JpcHRcXENhcmRTcHJpdGUuanNcblxuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIHNyY1Bvczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3mjqfku7YtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGhwTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JpdGljYWxMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBhdGtMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBuYW1lTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SW5wdXRDb250cm9sOiBmdW5jdGlvbiBzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHRoaXMuc3JjUG9zLnggPSB0aGlzLm5vZGUueDtcbiAgICAgICAgICAgIHRoaXMuc3JjUG9zLnkgPSB0aGlzLm5vZGUueTtcbiAgICAgICAgICAgIGNjLmxvZygnc3JjWDolZCcsIHRoaXMuc3JjUG9zLngpO1xuICAgICAgICAgICAgY2MubG9nKCdQYXJzcmNYOiVkJywgdGhpcy5ub2RlLnBvc2l0aW9uLngpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBtb3ZlWCA9IGV2ZW50LmdldExvY2F0aW9uWCgpIC0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLng7XG4gICAgICAgICAgICB2YXIgbW92ZVkgPSBldmVudC5nZXRMb2NhdGlvblkoKSAtIGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS55O1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3JjUG9zLnggKyBtb3ZlWCwgdGhpcy5zcmNQb3MueSArIG1vdmVZKTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdzcmNYOiVkJywgdGhpcy5zcmNQb3MueCk7XG4gICAgICAgICAgICAvL2NjLmxvZygnc3RhcnRYOiVkJyxldmVudC5nZXRTdGFydExvY2F0aW9uKCkueCk7XG4gICAgICAgICAgICAvL2NjLmxvZyhtb3ZlWCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgYm91bmRCb3ggPSB0aGlzLl9wbGF5ZXIubW9uc3RlckZpZWxkTGF5b3V0LmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgICAgICB2YXIgcG9zID0gbmV3IGNjLnYyKHRoaXMubm9kZS54ICsgdGhpcy5ub2RlLnBhcmVudC54LCB0aGlzLm5vZGUueSArIHRoaXMubm9kZS5wYXJlbnQueSk7XG4gICAgICAgICAgICBpZiAoIWJvdW5kQm94LmNvbnRhaW5zKHBvcykgfHwgIXRoaXMuX3BsYXllci5zdW1tZXJNb25zdGVyKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgLy9jYy5sb2coJ3N1bW1lciBtb25zdGVyIGVycm9yIScpXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3JjUG9zLngsIHRoaXMuc3JjUG9zLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB0aGlzKTtcbiAgICB9LFxuXG4gICAgLy/mmK/lkKbmv4DmtLtcbiAgICBpc1R1cm5BY3RpdmU6IGZ1bmN0aW9uIGlzVHVybkFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BsYXllci5faXNUdXJuQWN0aXZlO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgdGhpcy5zcmNQb3MgPSB7ICd4JzogMCwgJ3knOiAwIH07XG5cbiAgICAgICAgdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICB9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkLCBwbGF5ZXIsIGlkeCkge1xuXG4gICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmcgPSBjYXJkLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY3JpdGljYWxMYWJlbC5zdHJpbmcgPSBjYXJkLmNyaXRpY2FsLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuYXRrTGFiZWwuc3RyaW5nID0gY2FyZC5hdGsudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gY2FyZC5jYXJkTmFtZS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI4MGMzcnNaSkpLblo5UnFiQUxWd3RLJywgJ0hlbGxvV29ybGQnKTtcbi8vIFNjcmlwdFxcSGVsbG9Xb3JsZC5qc1xuXG52YXIgQ2FyZERhdGFNYW5hZ2VyID0gcmVxdWlyZSgnLi9kYXRhL0NhcmREYXRhTWFuYWdlcicpO1xuXG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7fSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICBDYXJkRGF0YU1hbmFnZXIuaW5pdCgpO1xuICAgIH0sXG5cbiAgICAvLyBjYWxsZWQgZXZlcnkgZnJhbWVcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge31cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZDdkYTRhcUJucEtyclRLMmg2UGJSNTInLCAnTW9uc3RlclNwcml0ZScpO1xuLy8gU2NyaXB0XFxNb25zdGVyU3ByaXRlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIHNyY1Bvczoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIF9wbGF5ZXI6IG51bGwsIC8vUGxheWVy5byV55SoXG4gICAgICAgIF9pZHg6IDAsIC8v5pWw57uE57Si5byVXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaOp+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgaHBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBhdGtMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICBuYW1lTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0SW5wdXRDb250cm9sOiBmdW5jdGlvbiBzZXRJbnB1dENvbnRyb2woKSB7XG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgY2MubG9nKHRoaXMuaXNBdGtlZCgpKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSB8fCB0aGlzLmlzQXRrZWQoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB0aGlzLnNyY1Bvcy54ID0gdGhpcy5ub2RlLng7XG4gICAgICAgICAgICB0aGlzLnNyY1Bvcy55ID0gdGhpcy5ub2RlLnk7XG4gICAgICAgICAgICAvL2NjLmxvZygnc3JjWDolZCcsIHRoaXMuc3JjUG9zLngpO1xuICAgICAgICB9LCB0aGlzKTtcblxuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHVybkFjdGl2ZSgpIHx8IHRoaXMuaXNBdGtlZCgpKSByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBtb3ZlWCA9IGV2ZW50LmdldExvY2F0aW9uWCgpIC0gZXZlbnQuZ2V0U3RhcnRMb2NhdGlvbigpLng7XG4gICAgICAgICAgICB2YXIgbW92ZVkgPSBldmVudC5nZXRMb2NhdGlvblkoKSAtIGV2ZW50LmdldFN0YXJ0TG9jYXRpb24oKS55O1xuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHRoaXMuc3JjUG9zLnggKyBtb3ZlWCwgdGhpcy5zcmNQb3MueSArIG1vdmVZKTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdzcmNYOiVkJywgdGhpcy5zcmNQb3MueCk7XG4gICAgICAgICAgICAvL2NjLmxvZygnc3RhcnRYOiVkJyxldmVudC5nZXRTdGFydExvY2F0aW9uKCkueCk7XG4gICAgICAgICAgICAvL2NjLmxvZyhtb3ZlWCk7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMubm9kZS5vbigndG91Y2hlbmQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R1cm5BY3RpdmUoKSB8fCB0aGlzLmlzQXRrZWQoKSkgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5fcGxheWVyO1xuICAgICAgICAgICAgdmFyIGR1ZWwgPSBwbGF5ZXIuZHVlbDtcbiAgICAgICAgICAgIHZhciBvcHBvbmVudFBsYXllciA9IHBsYXllci5fb3Bwb25lbnRQbGF5ZXI7XG4gICAgICAgICAgICAvL3ZhciBvcHBvbmVudFBsYXllciA9IHBsYXllcjtcbiAgICAgICAgICAgIHZhciBib3VuZEJveCwgcG9zLCBvcHBvQWRkWCwgb3Bwb0FkZFk7XG5cbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm56e75Yqo5Yiw5a+55pa56Iux6ZuE5LiKXG4gICAgICAgICAgICBib3VuZEJveCA9IG9wcG9uZW50UGxheWVyLmhlcm9JY29uU3ByaXRlLm5vZGUuZ2V0Qm91bmRpbmdCb3goKTtcbiAgICAgICAgICAgIG9wcG9BZGRZID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC54ICsgcGxheWVyLm5vZGUueCAtIG9wcG9uZW50UGxheWVyLm5vZGUueDtcbiAgICAgICAgICAgIG9wcG9BZGRZID0gcGxheWVyLm1vbnN0ZXJGaWVsZExheW91dC55ICsgcGxheWVyLm5vZGUueSAtIG9wcG9uZW50UGxheWVyLm5vZGUueTtcbiAgICAgICAgICAgIHBvcyA9IG5ldyBjYy52Mih0aGlzLm5vZGUueCArIG9wcG9BZGRYLCB0aGlzLm5vZGUueSArIG9wcG9BZGRZKTtcbiAgICAgICAgICAgIGlmIChib3VuZEJveC5jb250YWlucyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgZHVlbC5tb25zdGVyQXRrUGxheWVyKHBsYXllci5maWVsZEFycmF5W3RoaXMuX2lkeF0sIG9wcG9uZW50UGxheWVyKTsgLy/mlLvlh7vnjqnlrrZcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0UG9zVG9TcmMoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8v5Yik5pat5piv5ZCm56e75Yqo5Yiw5a+55pa56ZqP5LuO5LiKXG4gICAgICAgICAgICB2YXIgbW9uc3RlclNwcml0ZUFycmF5ID0gb3Bwb25lbnRQbGF5ZXIubW9uc3RlclNwcml0ZUFycmF5O1xuICAgICAgICAgICAgb3Bwb0FkZFggPSBwbGF5ZXIubW9uc3RlckZpZWxkTGF5b3V0LnggKyBwbGF5ZXIubm9kZS54IC0gb3Bwb25lbnRQbGF5ZXIubm9kZS54IC0gb3Bwb25lbnRQbGF5ZXIubW9uc3RlckZpZWxkTGF5b3V0Lng7XG4gICAgICAgICAgICBvcHBvQWRkWSA9IHBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueSArIHBsYXllci5ub2RlLnkgLSBvcHBvbmVudFBsYXllci5ub2RlLnkgLSBvcHBvbmVudFBsYXllci5tb25zdGVyRmllbGRMYXlvdXQueTtcbiAgICAgICAgICAgIC8vY2MubG9nKCdvcHBvbmVudFBsYXllci5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoOiVkJywgbW9uc3RlclNwcml0ZUFycmF5Lmxlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vbnN0ZXJTcHJpdGVBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGJvdW5kQm94ID0gbW9uc3RlclNwcml0ZUFycmF5W2ldLmdldEJvdW5kaW5nQm94KCk7XG4gICAgICAgICAgICAgICAgcG9zID0gbmV3IGNjLnYyKHRoaXMubm9kZS54ICsgb3Bwb0FkZFgsIHRoaXMubm9kZS55ICsgb3Bwb0FkZFkpO1xuICAgICAgICAgICAgICAgIGlmIChib3VuZEJveC5jb250YWlucyhwb3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1ZWwubW9uc3RlckF0a01vbnN0ZXIocGxheWVyLmZpZWxkQXJyYXlbdGhpcy5faWR4XSwgb3Bwb25lbnRQbGF5ZXIuZmllbGRBcnJheVtpXSk7IC8v5pS75Ye75a+55pa56ZqP5LuOXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQb3NUb1NyYygpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL+S7gOS5iOmDveayoeWBmu+8jOWkjeS9jVxuICAgICAgICAgICAgdGhpcy5yZXNldFBvc1RvU3JjKCk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH0sXG5cbiAgICAvL+aYr+WQpua/gOa0u1xuICAgIGlzVHVybkFjdGl2ZTogZnVuY3Rpb24gaXNUdXJuQWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGxheWVyLl9pc1R1cm5BY3RpdmU7XG4gICAgfSxcblxuICAgIC8v5pys5Zue5ZCI5piv5ZCm5pS75Ye76L+HXG4gICAgaXNBdGtlZDogZnVuY3Rpb24gaXNBdGtlZCgpIHtcbiAgICAgICAgdmFyIG1vbnN0ZXIgPSB0aGlzLl9wbGF5ZXIuZmllbGRBcnJheVt0aGlzLl9pZHhdO1xuICAgICAgICByZXR1cm4gbW9uc3Rlci5pc0F0a2VkO1xuICAgIH0sXG5cbiAgICByZXNldFBvc1RvU3JjOiBmdW5jdGlvbiByZXNldFBvc1RvU3JjKCkge1xuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5zcmNQb3MueCwgdGhpcy5zcmNQb3MueSk7XG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xuICAgICAgICB0aGlzLnNyY1BvcyA9IHsgJ3gnOiAwLCAneSc6IDAgfTtcblxuICAgICAgICB0aGlzLnNldElucHV0Q29udHJvbCgpO1xuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KG1vbnN0ZXIsIHBsYXllciwgaWR4KSB7XG5cbiAgICAgICAgdGhpcy5ocExhYmVsLnN0cmluZyA9IG1vbnN0ZXIuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5hdGtMYWJlbC5zdHJpbmcgPSBtb25zdGVyLmF0ay50b1N0cmluZygpO1xuICAgICAgICB0aGlzLm5hbWVMYWJlbC5zdHJpbmcgPSBtb25zdGVyLmNhcmROYW1lLnRvU3RyaW5nKCk7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnNzc0MjczYVRQdElsTGNVam5wTFpsVlonLCAnY2FyZCcpO1xuLy8gU2NyaXB0XFxjYXJkLmpzXG5cblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBfcGxheWVyOiBudWxsLCAvL1BsYXllcuW8leeUqFxuICAgICAgICBfaWR4OiAwLCAvL+aVsOe7hOe0ouW8lVxuXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgYXRrOiAwLFxuICAgICAgICBocDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkRGF0YSwgcGxheWVyLCBpZHgpIHtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IGNhcmREYXRhLmNyaXRpY2FsO1xuICAgICAgICB0aGlzLmNhcmROYW1lID0gY2FyZERhdGEuY2FyZE5hbWU7XG4gICAgICAgIHRoaXMuYXRrID0gY2FyZERhdGEuYXRrO1xuICAgICAgICB0aGlzLmhwID0gY2FyZERhdGEuaHA7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfSxcblxuICAgIC8v5pu05paw57yW5Y+3XG4gICAgcmVmcmVzaElkeDogZnVuY3Rpb24gcmVmcmVzaElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzc0ODY4bENoTEpIa3F4T21HamhVaGtrJywgJ2R1ZWwnKTtcbi8vIFNjcmlwdFxcZHVlbC5qc1xuXG4vL+WkhOeQhuWvueaImOa1geeoi+eahOWFs+mUruexu1xuXG52YXIgUGxheWVyID0gcmVxdWlyZSgncGxheWVyJyk7XG5cbnZhciB0ZW1wRGVjayA9IFsnYScsICdiJywgJ2MnLCAnZCcsICdlJywgJ2YnLCAnZycsICdoJywgJ2knLCAnaicsICdrJywgJ2wnLCAnbScsICduJywgJ28nLCAncCcsICdxJywgJ3InLCAncycsICd0JywgJ3UnLCAndicsICd3JywgJ3gnLCAneScsICd6JywgJ0EnLCAnQicsICdDJywgJ0QnLCAnRScsICdGJywgJ0cnLCAnSCcsICdJJywgJ0onLCAnSycsICdMJ107XG5jYy5DbGFzcyh7XG4gICAgJ2V4dGVuZHMnOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgICAgIGNhcmRQcmVmYWI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlByZWZhYlxuICAgICAgICB9LFxuXG4gICAgICAgIC8v6Ieq5bexXG4gICAgICAgIGxvY2FsUGxheWVyOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBQbGF5ZXJcbiAgICAgICAgfSxcblxuICAgICAgICAvL+WvueaJi1xuICAgICAgICBvcHBvbmVudFBsYXllcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogUGxheWVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHVybjogMCwgLy/lvZPliY3lj4zmlrnmgLvlm57lkIjmlbBcbiAgICAgICAgdHVyblBoYXNlOiAwLCAvL+ihjOWKqOeKtuaAgVxuXG4gICAgICAgIC8v54q25oCB55u45YWzXG4gICAgICAgIGVudGVyVHVybkZ1bmM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW11cbiAgICAgICAgfSxcblxuICAgICAgICB0dXJuRnVuYzoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBbXVxuICAgICAgICB9LFxuXG4gICAgICAgIGxlYXZlVHVybkZ1bmM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW11cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXRJbnB1dENvbnRyb2w6IGZ1bmN0aW9uIHNldElucHV0Q29udHJvbCgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm5vZGUub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGNjLmxvZygnMTIzMTMxMjMyMTMxMzIxMzEyMycpO1xuICAgICAgICAgICAgY2MubG9nKGV2ZW50LmdldExvY2F0aW9uWCgpKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfSxcblxuICAgIC8v5byA5aeL5ri45oiPXG4gICAgc3RhcnRHYW1lOiBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgICAgIC8v546p5a625Yid5aeL5YyWXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuaW5pdCh0aGlzKTtcbiAgICAgICAgdGhpcy5vcHBvbmVudFBsYXllci5pbml0KHRoaXMpO1xuXG4gICAgICAgIC8v5qC55o2u54mM5rGg55Sf5oiQ5Y2h57uEXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuY3JlYXRlRGVjayh0ZW1wRGVjayk7XG4gICAgICAgIHRoaXMub3Bwb25lbnRQbGF5ZXIuY3JlYXRlRGVjayh0ZW1wRGVjayk7XG5cbiAgICAgICAgLy/liJ3lp4vljJblr7nmiYtwbGF5ZXIsXG4gICAgICAgIHRoaXMubG9jYWxQbGF5ZXIuX29wcG9uZW50UGxheWVyID0gdGhpcy5vcHBvbmVudFBsYXllcjtcbiAgICAgICAgdGhpcy5vcHBvbmVudFBsYXllci5fb3Bwb25lbnRQbGF5ZXIgPSB0aGlzLmxvY2FsUGxheWVyO1xuXG4gICAgICAgIHZhciBpc0ZpcnN0UGxheWVyID0gdHJ1ZTsgLy/lhYjmiYvlkI7miYtcblxuICAgICAgICBpZiAoaXNGaXJzdFBsYXllcikge1xuICAgICAgICAgICAgdGhpcy50dXJuUGxheWVyID0gdGhpcy5sb2NhbFBsYXllcjtcbiAgICAgICAgICAgIHRoaXMudHVybk9wcG9uZW50ID0gdGhpcy5vcHBvbmVudFBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudHVyblBsYXllciA9IHRoaXMub3Bwb25lbnRQbGF5ZXI7XG4gICAgICAgICAgICB0aGlzLnR1cm5PcHBvbmVudCA9IHRoaXMubG9jYWxQbGF5ZXI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR1cm4gPSAxO1xuXG4gICAgICAgIHRoaXMudHVyblBsYXllci5kcmF3RGVjaygzKTtcbiAgICAgICAgdGhpcy50dXJuT3Bwb25lbnQuZHJhd0RlY2soMyk7XG4gICAgICAgIHRoaXMuY2hhbmdlUGhhc2UoUEhBU0VfQkVHSU5fVFVSTik7XG5cbiAgICAgICAgLy9zaG93VGlwTGFiZWwoJ+W8gOWni+a4uOaIjycpO1xuICAgIH0sXG5cbiAgICAvL+S6pOaNouihjOWKqFxuICAgIHR1cm5QbGF5ZXJDaGFuZ2U6IGZ1bmN0aW9uIHR1cm5QbGF5ZXJDaGFuZ2UoKSB7XG4gICAgICAgIC8vY2MubG9nKCd0dXJuUGxheWVyQ2hhbmdlLCB0dXJuUGxheWVyOiVzLCB0dXJuT3Bwb25lbnQ6JXMnLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUsIHRoaXMudHVybk9wcG9uZW50Lmhlcm9OYW1lKTtcbiAgICAgICAgdmFyIHRlbXBQbGF5ZXIgPSB0aGlzLnR1cm5QbGF5ZXI7XG4gICAgICAgIC8vY2MubG9nKCd0ZW1wUGxheWVyTmFtZTolcycsIHRlbXBQbGF5ZXIuaGVyb05hbWUpO1xuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIgPSB0aGlzLnR1cm5PcHBvbmVudDtcbiAgICAgICAgLy9jYy5sb2coJ3R1cm5QbGF5ZXI6JXMnLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUpO1xuXG4gICAgICAgIHRoaXMudHVybk9wcG9uZW50ID0gdGVtcFBsYXllcjtcbiAgICAgICAgLy9jYy5sb2coJ3R1cm5vcHBvbmVudDolcycsIHRoaXMudHVybk9wcG9uZW50Lmhlcm9OYW1lKTtcbiAgICB9LFxuXG4gICAgLy/pmo/ku47mlLvlh7vnjqnlrrZcbiAgICBtb25zdGVyQXRrUGxheWVyOiBmdW5jdGlvbiBtb25zdGVyQXRrUGxheWVyKG1vbnN0ZXIsIHBsYXllcikge1xuICAgICAgICBpZiAoIW1vbnN0ZXIgfHwgbW9uc3Rlci5hdGsgPD0gMCB8fCBtb25zdGVyLmlzQXRrZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICBtb25zdGVyLmlzQXRrZWQgPSB0cnVlO1xuICAgICAgICBwbGF5ZXIucmVkdWNlSHAobW9uc3Rlci5hdGspO1xuICAgICAgICBwbGF5ZXIucmVmcmVzaE1vbnN0ZXJGaWVsZCgpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbChtb25zdGVyLl9wbGF5ZXIuaGVyb05hbWUgKyAn55qEJyArIG1vbnN0ZXIuY2FyZE5hbWUgKyAnIOaUu+WHu+S6hueOqeWutiAnICsgcGxheWVyLmhlcm9OYW1lKTtcblxuICAgICAgICB0aGlzLmNoZWNrV2luKCk7XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5pS75Ye76ZqP5LuOXG4gICAgbW9uc3RlckF0a01vbnN0ZXI6IGZ1bmN0aW9uIG1vbnN0ZXJBdGtNb25zdGVyKHNyYywgZGVzdCkge1xuICAgICAgICBpZiAoIXNyYyB8fCAhZGVzdCB8fCBzcmMuYXRrIDw9IDAgfHwgc3JjLmlzQXRrZWQgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgICBzcmMuaXNBdGtlZCA9IHRydWU7XG4gICAgICAgIHZhciBkYW1hZ2UgPSBzcmMuYXRrO1xuICAgICAgICBkZXN0LnJlZHVjZUhwKGRhbWFnZSk7XG5cbiAgICAgICAgZGFtYWdlID0gZGVzdC5hdGs7XG4gICAgICAgIHNyYy5yZWR1Y2VIcChkYW1hZ2UpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbChzcmMuX3BsYXllci5oZXJvTmFtZSArICfnmoQnICsgc3JjLmNhcmROYW1lICsgJyDmlLvlh7vkuoYgJyArIGRlc3QuX3BsYXllci5oZXJvTmFtZSArICfnmoQnICsgZGVzdC5jYXJkTmFtZSwgY2MuQ29sb3IuUkVEKTtcbiAgICB9LFxuXG4gICAgLy/liKTmlq3ovpPotaJcbiAgICBjaGVja1dpbjogZnVuY3Rpb24gY2hlY2tXaW4oKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm5QbGF5ZXIuaHAgPD0gMCAmJiB0aGlzLnR1cm5PcHBvbmVudC5ocCA8PSAwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCLlubPlsYBcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50dXJuUGxheWVyLmhwIDw9IDApIHtcbiAgICAgICAgICAgIHNob3dUaXBMYWJlbChcIiVzIOiDnOWIqVwiLCB0aGlzLm9wcG9uZW50UGxheWVyLmhlcm9OYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR1cm5PcHBvbmVudC5ocCA8PSAwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCIlIOiDnOWIqVwiLCB0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5Zue5ZCI57uT5p2f77yI5oyJ6ZKu6LCD55So77yJXG4gICAgdHVybkVuZDogZnVuY3Rpb24gdHVybkVuZCgpIHtcbiAgICAgICAgLy/kuI3mmK9NYWluUGhhc2Xov5nkuKrmjInpkq7kuI3og73mjIlcbiAgICAgICAgaWYgKHRoaXMudHVyblBoYXNlICE9PSBQSEFTRV9NQUlOX1RVUk4pIHJldHVybjtcblxuICAgICAgICB0aGlzLmNoYW5nZVBoYXNlKFBIQVNFX0VORF9UVVJOKTtcbiAgICB9LFxuXG4gICAgZW50ZXJCZWdpblR1cm46IGZ1bmN0aW9uIGVudGVyQmVnaW5UdXJuKCkge1xuICAgICAgICBjYy5sb2coJ2lzIGVudGVyIEJlZ2luVHVybj8nKTtcbiAgICAgICAgKyt0aGlzLnR1cm47XG4gICAgICAgIHRoaXMudHVyblBsYXllckNoYW5nZSgpO1xuXG4gICAgICAgIHNob3dUaXBMYWJlbCh0aGlzLnR1cm5QbGF5ZXIuaGVyb05hbWUgKyAn55qE5Zue5ZCIJyk7XG4gICAgICAgIHRoaXMudHVyblBsYXllci5zZXRUdXJuQWN0aXZlKHRydWUpOyAvL+WPr+S7peihjOWKqFxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuY3JpdGljYWxQbHVzKDEpOyAvL+WinuWKoOawtOaZtlxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuY3JpdGljYWxSZWNvdmVyKCk7IC8v5Zue5aSN5rC05pm2XG4gICAgICAgIHRoaXMudHVyblBsYXllci5hd2FrZW5Nb25zdGVyKCk7IC8v6YeN572u6ZqP5LuO5pS75Ye75qyh5pWwXG4gICAgICAgIHRoaXMudHVyblBsYXllci5kcmF3RGVjaygxKTsgLy/mir0x5byg5Y2hXG4gICAgfSxcblxuICAgIGJlZ2luVHVybjogZnVuY3Rpb24gYmVnaW5UdXJuKCkge1xuICAgICAgICAvL+i/m+WFpeS4u+a1geeoi1xuXG4gICAgICAgIHRoaXMuY2hhbmdlUGhhc2UoUEhBU0VfTUFJTl9UVVJOKTtcbiAgICB9LFxuXG4gICAgbGVhdmVCZWdpblR1cm46IGZ1bmN0aW9uIGxlYXZlQmVnaW5UdXJuKCkge30sXG5cbiAgICBlbnRlck1haW5UdXJuOiBmdW5jdGlvbiBlbnRlck1haW5UdXJuKCkge30sXG5cbiAgICBtYWluVHVybjogZnVuY3Rpb24gbWFpblR1cm4oKSB7fSxcblxuICAgIGxlYXZlTWFpblR1cm46IGZ1bmN0aW9uIGxlYXZlTWFpblR1cm4oKSB7fSxcblxuICAgIGVudGVyRW5kVHVybjogZnVuY3Rpb24gZW50ZXJFbmRUdXJuKCkge30sXG5cbiAgICBlbmRUdXJuOiBmdW5jdGlvbiBlbmRUdXJuKCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBoYXNlKFBIQVNFX0JFR0lOX1RVUk4pO1xuICAgIH0sXG5cbiAgICBsZWF2ZUVuZFR1cm46IGZ1bmN0aW9uIGxlYXZlRW5kVHVybigpIHtcblxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIuc2V0VHVybkFjdGl2ZShmYWxzZSk7XG4gICAgfSxcblxuICAgIGNoYW5nZVBoYXNlOiBmdW5jdGlvbiBjaGFuZ2VQaGFzZShuZXh0VHVyblR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMudHVyblBoYXNlICE9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmxlYXZlVHVybkZ1bmNbdGhpcy50dXJuUGhhc2VdKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVudGVyVHVybkZ1bmNbbmV4dFR1cm5UeXBlXSgpO1xuICAgICAgICB0aGlzLnR1cm5QaGFzZSA9IG5leHRUdXJuVHlwZTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIC8vdGhpcy5zZXRJbnB1dENvbnRyb2woKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5lbnRlclR1cm5GdW5jW1BIQVNFX0JFR0lOX1RVUk5dID0gdGhpcy5lbnRlckJlZ2luVHVybi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVudGVyVHVybkZ1bmNbUEhBU0VfTUFJTl9UVVJOXSA9IHRoaXMuZW50ZXJNYWluVHVybi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmVudGVyVHVybkZ1bmNbUEhBU0VfRU5EX1RVUk5dID0gdGhpcy5lbnRlckVuZFR1cm4uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLnR1cm5GdW5jW1BIQVNFX0JFR0lOX1RVUk5dID0gdGhpcy5iZWdpblR1cm4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50dXJuRnVuY1tQSEFTRV9NQUlOX1RVUk5dID0gdGhpcy5tYWluVHVybi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnR1cm5GdW5jW1BIQVNFX0VORF9UVVJOXSA9IHRoaXMuZW5kVHVybi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMubGVhdmVUdXJuRnVuY1tQSEFTRV9CRUdJTl9UVVJOXSA9IHRoaXMubGVhdmVCZWdpblR1cm4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5sZWF2ZVR1cm5GdW5jW1BIQVNFX01BSU5fVFVSTl0gPSB0aGlzLmxlYXZlTWFpblR1cm4uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5sZWF2ZVR1cm5GdW5jW1BIQVNFX0VORF9UVVJOXSA9IHRoaXMubGVhdmVFbmRUdXJuLmJpbmQodGhpcyk7XG4gICAgfSxcblxuICAgIHN0YXJ0OiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgICB9LFxuXG4gICAgLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShkdCkge1xuICAgICAgICB0aGlzLnR1cm5GdW5jW3RoaXMudHVyblBoYXNlXSgpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnOTdiMmNLSEZtNUF3N3kwdlU4a2RyWU8nLCAnbW9uc3RlcicpO1xuLy8gU2NyaXB0XFxtb25zdGVyLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cbiAgICAgICAgX3BsYXllcjogbnVsbCwgLy9QbGF5ZXLlvJXnlKhcbiAgICAgICAgX2lkeDogMCwgLy/mlbDnu4TntKLlvJVcblxuICAgICAgICBjYXJkTmFtZTogXCJcIixcbiAgICAgICAgY3JpdGljYWw6IDAsXG4gICAgICAgIGF0azogMCxcbiAgICAgICAgaHA6IDAsXG4gICAgICAgIG1heEhwOiAwLFxuICAgICAgICBpc0F0a2VkOiB0cnVlIH0sXG5cbiAgICAvL+acrOWbnuWQiOaYr+WQpuaUu+WHu+i/h1xuICAgIC8v5omj6ZmkSFBcbiAgICByZWR1Y2VIcDogZnVuY3Rpb24gcmVkdWNlSHAobnVtKSB7XG4gICAgICAgIGlmIChudW0gPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaHAgLT0gbnVtO1xuICAgICAgICAvL+atu+S6huWwseadgOaOiei/meS4qumaj+S7jlxuICAgICAgICBpZiAodGhpcy5pc0RlYWQoKSkgdGhpcy5fcGxheWVyLmtpbGxNb25zdGVyKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX3BsYXllci5yZWZyZXNoTW9uc3RlckZpZWxkKCk7XG4gICAgfSxcblxuICAgIC8v5Zue5aSNSFBcbiAgICBhZGRIcDogZnVuY3Rpb24gYWRkSHAobnVtKSB7XG4gICAgICAgIGlmIChudW0gPD0gMCkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuaHAgKz0gbnVtO1xuICAgICAgICBpZiAodGhpcy5ocCA+IHRoaXMubWF4SHApIHRoaXMuaHAgPSB0aGlzLm1heEhwO1xuXG4gICAgICAgIHRoaXMuX3BsYXllci5yZWZyZXNoTW9uc3RlckZpZWxkKCk7XG4gICAgfSxcblxuICAgIGlzRGVhZDogZnVuY3Rpb24gaXNEZWFkKCkge1xuICAgICAgICBpZiAodGhpcy5ocCA8PSAwKSByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoY2FyZCwgcGxheWVyLCBpZHgpIHtcbiAgICAgICAgdGhpcy5jYXJkTmFtZSA9IGNhcmQuY2FyZE5hbWU7XG4gICAgICAgIHRoaXMuY3JpdGljYWwgPSBjYXJkLmNyaXRpY2FsO1xuICAgICAgICB0aGlzLmF0ayA9IGNhcmQuYXRrO1xuICAgICAgICB0aGlzLmhwID0gY2FyZC5ocDtcbiAgICAgICAgdGhpcy5tYXhIcCA9IGNhcmQuaHA7XG5cbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9pZHggPSBpZHg7XG4gICAgfSxcblxuICAgIC8v5pu05paw57yW5Y+3XG4gICAgcmVmcmVzaElkeDogZnVuY3Rpb24gcmVmcmVzaElkeChpZHgpIHtcbiAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJ2M4YzBhNEJ1dEpNQXF1dzlkNXNNcWZpJywgJ3BsYXllcicpO1xuLy8gU2NyaXB0XFxwbGF5ZXIuanNcblxudmFyIENhcmQgPSByZXF1aXJlKCdjYXJkJyk7XG52YXIgTW9uc3RlciA9IHJlcXVpcmUoJ21vbnN0ZXInKTtcbnZhciBDYXJkRGF0YU1hbmFnZXIgPSByZXF1aXJlKCcuL2RhdGEvQ2FyZERhdGFNYW5hZ2VyJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgY2FyZFByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgbW9uc3RlclByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgZHVlbDogbnVsbCwgLy/miJjmlpfnrqHnkIZcbiAgICAgICAgX29wcG9uZW50UGxheWVyOiBudWxsLCAvL+WvueaJi3BsYXllclxuICAgICAgICBfaXNUdXJuQWN0aXZlOiBmYWxzZSwgLy/mmK/lkKblj6/ku6XooYzliqhcblxuICAgICAgICBoZXJvTmFtZTogJycsIC8v546p5a625ZCN5a2XXG4gICAgICAgIGhwOiAzMCwgLy/oi7Hpm4TnlJ/lkb3lgLxcbiAgICAgICAgY3JpdGljYWw6IDAsIC8v6Iux6ZuE5b2T5YmN5rC05pm25pWwXG4gICAgICAgIG1heENyaXRpY2FsOiAwLCAvL+iLsembhOW9k+WJjeWbnuWQiOacgOWkp+awtOaZtuaVsFxuICAgICAgICAvL2hhbmRDYXJkOiAwLCAgIFxuICAgICAgICBkZWNrQXJyYXk6IFtdLCAvL+WNoee7hOaVsOe7hO+8iENhcmTnsbvlnovvvIlcbiAgICAgICAgaGFuZEFycmF5OiBbXSwgLy/miYvniYzmlbDnu4TvvIhDYXJk57G75Z6L77yJXG4gICAgICAgIGZpZWxkQXJyYXk6IFtdLCAvL+WcuuS4iumaj+S7juaVsOe7hO+8iENhcmRNb25zdGVy57G75Z6L77yJXG4gICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXk6IFtdLCAvL+aJi+eJjOWbvueJh+aVsOe7hFxuICAgICAgICBtb25zdGVyU3ByaXRlQXJyYXk6IFtdLCAvL+maj+S7juWbvueJh+aVsOe7hFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0t6IqC54K55rGg566h55CGLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIGNhcmRQb29sOiBudWxsLFxuICAgICAgICBtb25zdGVyUG9vbDogbnVsbCxcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5o6n5Lu2LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvL+aJi+eJjOWMulxuICAgICAgICBoYW5kRmlsZWRMYXlvdXQ6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxheW91dFxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5Zy65LiK6ZqP5LuO5Yy6XG4gICAgICAgIG1vbnN0ZXJGaWVsZExheW91dDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTm9kZVxuICAgICAgICB9LFxuXG4gICAgICAgIC8v5aS05YOPXG4gICAgICAgIGhlcm9JY29uU3ByaXRlOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5TcHJpdGVcbiAgICAgICAgfSxcblxuICAgICAgICAvL+ihgOmHj+aYvuekulxuICAgICAgICBoZXJvSHBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfSxcblxuICAgICAgICAvL+awtOaZtlxuICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5OiBbY2MuU3ByaXRlXSxcblxuICAgICAgICAvL+WNoee7hOeJjOaVsFxuICAgICAgICBkZWNrTGFiZWw6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGR1ZWwpIHtcbiAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICAgICAgdGhpcy5ocCA9IDMwO1xuICAgICAgICB0aGlzLmNyaXRpY2FsID0gMDtcbiAgICAgICAgdGhpcy5tYXhDcml0aWNhbCA9IDA7XG4gICAgICAgIHRoaXMuZGVja0FycmF5ID0gW107XG4gICAgICAgIHRoaXMuaGFuZEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZmllbGRBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGFuZENhcmRTcHJpdGVBcnJheS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy90aGlzLmhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZGVzdG9yeSgpO1xuICAgICAgICAgICAgdGhpcy5jYXJkUG9vbC5wdXQodGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5W2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaGNyaXRpY2Fsc3ByaXRlKCk7XG4gICAgICAgIHRoaXMucmVmcmVzaEhhbmRDYXJkKCk7XG4gICAgfSxcblxuICAgIC8v5qC55o2u54mM5rGg6ZqP5py65Yib5bu65Y2h57uEXG4gICAgY3JlYXRlRGVjazogZnVuY3Rpb24gY3JlYXRlRGVjayhjYXJkQXJyYXkpIHtcbiAgICAgICAgdmFyIGRlY2tBcnJheSA9IHRoaXMuZGVja0FycmF5O1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzA7ICsraSkge1xuICAgICAgICAgICAgZGVja0FycmF5W2ldID0gbmV3IENhcmQoKTtcbiAgICAgICAgICAgIHZhciByYW5kb21LZXkgPSBjYXJkQXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2FyZEFycmF5Lmxlbmd0aCldO1xuICAgICAgICAgICAgdmFyIGNhcmREYXRhID0gQ2FyZERhdGFNYW5hZ2VyLmNhcmRNYXBbcmFuZG9tS2V5XTtcbiAgICAgICAgICAgIGRlY2tBcnJheVtpXS5pbml0KGNhcmREYXRhLCB0aGlzLCBpKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+iuvue9ruaYr+WQpuWPr+S7peihjOWKqFxuICAgIHNldFR1cm5BY3RpdmU6IGZ1bmN0aW9uIHNldFR1cm5BY3RpdmUodmFsKSB7XG4gICAgICAgIHRoaXMuX2lzVHVybkFjdGl2ZSA9IHZhbDtcbiAgICB9LFxuXG4gICAgLy/msLTmmbblm57lpI1cbiAgICBjcml0aWNhbFJlY292ZXI6IGZ1bmN0aW9uIGNyaXRpY2FsUmVjb3ZlcigpIHtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IHRoaXMubWF4Q3JpdGljYWw7XG4gICAgICAgIHRoaXMucmVmcmVzaGNyaXRpY2Fsc3ByaXRlKCk7IC8v5Yi35paw5rC05pm25Zu+54mHXG4gICAgfSxcblxuICAgIC8v5rC05pm25aKe5YqgXG4gICAgY3JpdGljYWxQbHVzOiBmdW5jdGlvbiBjcml0aWNhbFBsdXMobnVtKSB7XG4gICAgICAgIHRoaXMubWF4Q3JpdGljYWwgKz0gbnVtO1xuICAgICAgICB0aGlzLmNyaXRpY2FsICs9IG51bTtcbiAgICAgICAgaWYgKHRoaXMubWF4Q3JpdGljYWwgPiAxMCkgdGhpcy5tYXhDcml0aWNhbCA9IDEwO1xuICAgICAgICBpZiAodGhpcy5jcml0aWNhbCA+IDEwKSB0aGlzLmNyaXRpY2FsID0gMTA7XG4gICAgICAgIHRoaXMucmVmcmVzaGNyaXRpY2Fsc3ByaXRlKCk7IC8v5Yi35paw5rC05pm25Zu+54mHXG4gICAgfSxcblxuICAgIC8v6YeN572u6ZqP5LuO5pS75Ye75qyh5pWwXG4gICAgYXdha2VuTW9uc3RlcjogZnVuY3Rpb24gYXdha2VuTW9uc3RlcigpIHtcbiAgICAgICAgdmFyIGZpZWxkQXJyYXkgPSB0aGlzLmZpZWxkQXJyYXk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaWVsZEFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBmaWVsZEFycmF5W2ldLmlzQXRrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmVmcmVzaE1vbnN0ZXJGaWVsZCgpO1xuICAgIH0sXG5cbiAgICAvL+aJo+mZpEhQXG4gICAgcmVkdWNlSHA6IGZ1bmN0aW9uIHJlZHVjZUhwKG51bSkge1xuICAgICAgICBpZiAobnVtIDw9IDApIHJldHVybjtcblxuICAgICAgICB0aGlzLmhwIC09IG51bTtcbiAgICAgICAgdGhpcy5yZWZyZXNoSHBMYWJlbCgpO1xuICAgIH0sXG5cbiAgICAvL+WbnuWkjUhQXG4gICAgYWRkSHA6IGZ1bmN0aW9uIGFkZEhwKG51bSkge1xuICAgICAgICBpZiAobnVtIDw9IDApIHJldHVybjtcblxuICAgICAgICB0aGlzLmhwICs9IG51bTtcbiAgICAgICAgaWYgKHRoaXMuaHAgPiAzMCkgdGhpcy5ocCA9IDMwO1xuXG4gICAgICAgIHRoaXMucmVmcmVzaEhwTGFiZWwoKTtcbiAgICB9LFxuXG4gICAgLy/liJvlu7rmiYvniYxcbiAgICBjcmVhdGVDYXJkVG9IYW5kOiBmdW5jdGlvbiBjcmVhdGVDYXJkVG9IYW5kKGNhcmQpIHtcbiAgICAgICAgLy/otoXov4cxMOW8oOWwseeIhueCuFxuICAgICAgICBpZiAodGhpcy5oYW5kQXJyYXkubGVuZ3RoID49IDEwKSB7XG4gICAgICAgICAgICBzaG93VGlwTGFiZWwoXCLmiYvniYzotoXlh7oxMOW8oO+8jOaKveeahOeJjOebtOaOpeaRp+avgVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5pS55Y+Y5bqP5Y+377yM5Yqg5YWl5omL54mM5pWw57uEXG4gICAgICAgIGNhcmQuX2lkeCA9IHRoaXMuaGFuZEFycmF5Lmxlbmd0aDtcbiAgICAgICAgdGhpcy5oYW5kQXJyYXkucHVzaChjYXJkKTtcblxuICAgICAgICB2YXIgY2FyZFNwcml0ZTtcbiAgICAgICAgaWYgKHRoaXMuY2FyZFBvb2wuc2l6ZSgpID4gMCkge1xuICAgICAgICAgICAgY2FyZFNwcml0ZSA9IHRoaXMuY2FyZFBvb2wuZ2V0KHRoaXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FyZFNwcml0ZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuY2FyZFByZWZhYik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhhbmRGaWxlZExheW91dC5ub2RlLmFkZENoaWxkKGNhcmRTcHJpdGUpO1xuICAgICAgICB0aGlzLmhhbmRDYXJkU3ByaXRlQXJyYXkucHVzaChjYXJkU3ByaXRlKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoSGFuZENhcmQoKTsgLy/liLfmlrDmiYvniYzlm77niYdcbiAgICB9LFxuXG4gICAgLy/mir3niYxcbiAgICBkcmF3RGVjazogZnVuY3Rpb24gZHJhd0RlY2sobnVtKSB7XG4gICAgICAgIHZhciBkZWNrQXJyYXkgPSB0aGlzLmRlY2tBcnJheTtcblxuICAgICAgICBpZiAoZGVja0FycmF5Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBjYXJkID0gZGVja0FycmF5LnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5kZWNrTGFiZWwuc3RyaW5nID0gZGVja0FycmF5Lmxlbmd0aC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5jcmVhdGVDYXJkVG9IYW5kKGNhcmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWR1Y2VIcCgxKTtcbiAgICAgICAgICAgIHNob3dUaXBMYWJlbCh0aGlzLmhlcm9OYW1lICsgXCIg55qE54mM5bqT5rKh54mM5LqG77yM5oq9MeW8oOWwkTFIUFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5kdWVsLmNoZWNrV2luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdEZWNrKG51bSAtIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5Y+s5ZSk6ZqP5LuOXG4gICAgc3VtbWVyTW9uc3RlcjogZnVuY3Rpb24gc3VtbWVyTW9uc3RlcihjYXJkU3ByaXRlKSB7XG4gICAgICAgIC8v5aaC5p6c6ZqP5LuO5bey5ruh6L+U5ZueXG4gICAgICAgIGlmICh0aGlzLmZpZWxkQXJyYXkubGVuZ3RoID4gNykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHZhciBpZHggPSBjYXJkU3ByaXRlLl9pZHg7XG4gICAgICAgIHZhciBjYXJkID0gdGhpcy5oYW5kQXJyYXlbaWR4XTsgLy/ojrflj5bljaHniYzlr7nosaFcbiAgICAgICAgaWYgKGNhcmQpIHtcbiAgICAgICAgICAgIHZhciBjcml0aWNhbCA9IGNhcmQuY3JpdGljYWw7XG4gICAgICAgICAgICAvL+WmguaenOawtOaZtuS4jeWkn+i/lOWbnlxuICAgICAgICAgICAgaWYgKGNyaXRpY2FsID4gdGhpcy5jcml0aWNhbCkge1xuICAgICAgICAgICAgICAgIHNob3dUaXBMYWJlbCh0aGlzLmhlcm9OYW1lICsgXCIg5Y+q5pyJIFwiICsgdGhpcy5jcml0aWNhbCArICcg5Liq5rC05pm2LOS4jeiDveWPrOWUpOi0ueeUqOS4uicgKyBjcml0aWNhbCArICcg55qEICcgKyBjYXJkLmNhcmROYW1lICsgJyDliLDlnLrkuIonKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuY3JpdGljYWwgLT0gY3JpdGljYWw7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hjcml0aWNhbHNwcml0ZSgpO1xuXG4gICAgICAgICAgICAvL+WIm+W7uumaj+S7juWvueixoeW5tuWKoOWFpemaj+S7juaVsOe7hFxuICAgICAgICAgICAgdmFyIG1vbnN0ZXIgPSBuZXcgTW9uc3RlcigpO1xuICAgICAgICAgICAgbW9uc3Rlci5pbml0KGNhcmQsIHRoaXMsIHRoaXMuZmllbGRBcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5maWVsZEFycmF5LnB1c2gobW9uc3Rlcik7XG5cbiAgICAgICAgICAgIC8v5Yib5bu66ZqP5LuO5Zu+54mH6LWE5rqQXG4gICAgICAgICAgICB2YXIgbW9uc3RlclNwcml0ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLm1vbnN0ZXJQb29sLnNpemUoKSA+IDApIHtcbiAgICAgICAgICAgICAgICBtb25zdGVyU3ByaXRlID0gdGhpcy5tb25zdGVyUG9vbC5nZXQodGhpcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG1vbnN0ZXJTcHJpdGUgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLm1vbnN0ZXJQcmVmYWIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXJGaWVsZExheW91dC5hZGRDaGlsZChtb25zdGVyU3ByaXRlKTtcbiAgICAgICAgICAgIHRoaXMubW9uc3RlclNwcml0ZUFycmF5LnB1c2gobW9uc3RlclNwcml0ZSk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hNb25zdGVyRmllbGQoKTsgLy/liLfmlrDpmo/ku47ljLpcbiAgICAgICAgICAgIC8v5Yig6Zmk5omL54mMXG4gICAgICAgICAgICB0aGlzLmNhcmRQb29sLnB1dChjYXJkU3ByaXRlLm5vZGUpO1xuICAgICAgICAgICAgdGhpcy5oYW5kQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hBcnJheUlkeCh0aGlzLmhhbmRBcnJheSk7XG4gICAgICAgICAgICAvL2NjLmxvZygnYWZ0ZXIgc3VtbWVyIG1vbnN0ZXIsIHRoZSBoYW5kYXJyYXkubGVuZ3RoIGlzICVkJyx0aGlzLmhhbmRBcnJheS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5LnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoSGFuZENhcmQoKTtcbiAgICAgICAgICAgIHNob3dUaXBMYWJlbCh0aGlzLmhlcm9OYW1lICsgXCIg5LuO5omL54mM5Y+s5ZSk5LqGMeW8oCBcIiArIGNhcmQuY2FyZE5hbWUgKyAnIOWIsOWcuuS4iicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5bmy5o6J6ZqP5LuOXG4gICAga2lsbE1vbnN0ZXI6IGZ1bmN0aW9uIGtpbGxNb25zdGVyKG1vbnN0ZXIpIHtcbiAgICAgICAgY2MubG9nKCdtb25zdGVyU3ByaXRlQXJyYXk6JXMnLCB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheS5sZW5ndGgpO1xuICAgICAgICBjYy5sb2coJ2ZpZWxkQXJyYXk6JXMnLCB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheS5sZW5ndGgpO1xuICAgICAgICBjYy5sb2coJ19pZHg6JXMnLCBtb25zdGVyLl9pZHgpO1xuICAgICAgICB2YXIgaWR4ID0gbW9uc3Rlci5faWR4O1xuICAgICAgICB2YXIgbW9uc3RlclNwcml0ZSA9IHRoaXMubW9uc3RlclNwcml0ZUFycmF5W2lkeF07XG5cbiAgICAgICAgdGhpcy5tb25zdGVyUG9vbC5wdXQobW9uc3RlclNwcml0ZSk7XG4gICAgICAgIHRoaXMuZmllbGRBcnJheS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgdGhpcy5yZWZyZXNoQXJyYXlJZHgodGhpcy5maWVsZEFycmF5KTtcbiAgICAgICAgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIGNjLmxvZygnbW9uc3RlclNwcml0ZUFycmF5OiVzJywgdGhpcy5tb25zdGVyU3ByaXRlQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgY2MubG9nKCdmaWVsZEFycmF5OiVzJywgdGhpcy5maWVsZEFycmF5Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMucmVmcmVzaE1vbnN0ZXJGaWVsZCgpO1xuICAgIH0sXG5cbiAgICAvL+aVsOe7hOWPmOWKqOWQjumcgOimgeWIt+aWsGlkeFxuICAgIHJlZnJlc2hBcnJheUlkeDogZnVuY3Rpb24gcmVmcmVzaEFycmF5SWR4KGFycmF5KSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGFycmF5W2ldLnJlZnJlc2hJZHgoaSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeeVjOmdouWIt+aWsC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8v5omL54mM5Zu+54mH5Yi35pawXG4gICAgcmVmcmVzaEhhbmRDYXJkOiBmdW5jdGlvbiByZWZyZXNoSGFuZENhcmQoKSB7XG4gICAgICAgIHZhciBoYW5kQXJyYXkgPSB0aGlzLmhhbmRBcnJheTtcbiAgICAgICAgdmFyIGhhbmRDYXJkU3ByaXRlQXJyYXkgPSB0aGlzLmhhbmRDYXJkU3ByaXRlQXJyYXk7XG4gICAgICAgIHZhciBhcnJheUxlbmd0aCA9IGhhbmRBcnJheS5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaGFuZENhcmRTcHJpdGVBcnJheVtpXSkge1xuICAgICAgICAgICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZ2V0Q29tcG9uZW50KCdDYXJkU3ByaXRlJykuaW5pdChoYW5kQXJyYXlbaV0sIHRoaXMsIGkpO1xuICAgICAgICAgICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uc2V0UG9zaXRpb24oOTAgKiBpICsgaGFuZENhcmRTcHJpdGVBcnJheVtpXS5nZXRDaGlsZEJ5TmFtZSgnc3ByaXRlJykud2lkdGggLyAyIC0gdGhpcy5oYW5kRmlsZWRMYXlvdXQubm9kZS53aWR0aCAvIDIsIDApO1xuICAgICAgICAgICAgICAgIC8vY2MubG9nKGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZ2V0Q2hpbGRCeU5hbWUoJ3Nwcml0ZScpLndpZHRoKTtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyh0aGlzLmhhbmRGaWxlZExheW91dC5ub2RlLndpZHRoKTtcbiAgICAgICAgICAgICAgICAvL2hhbmRDYXJkU3ByaXRlQXJyYXlbaV0uc2V0UG9zaXRpb24oMCwwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNjLmxvZygnaGFuZENhcmRTcHJpdGVBcnJheSBpcyBsZXNzIHRoYW4gaGFuZEFycmF5ISAlZC8lZCcsIGksIGFycmF5TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v6ZqP5LuO5Zu+54mH5Yi35pawXG4gICAgcmVmcmVzaE1vbnN0ZXJGaWVsZDogZnVuY3Rpb24gcmVmcmVzaE1vbnN0ZXJGaWVsZCgpIHtcbiAgICAgICAgdmFyIGZpZWxkQXJyYXkgPSB0aGlzLmZpZWxkQXJyYXk7XG4gICAgICAgIHZhciBtb25zdGVyU3ByaXRlQXJyYXkgPSB0aGlzLm1vbnN0ZXJTcHJpdGVBcnJheTtcbiAgICAgICAgdmFyIGFycmF5TGVuZ3RoID0gZmllbGRBcnJheS5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAobW9uc3RlclNwcml0ZUFycmF5W2ldKSB7XG4gICAgICAgICAgICAgICAgbW9uc3RlclNwcml0ZUFycmF5W2ldLmdldENvbXBvbmVudCgnTW9uc3RlclNwcml0ZScpLmluaXQoZmllbGRBcnJheVtpXSwgdGhpcywgaSk7XG4gICAgICAgICAgICAgICAgbW9uc3RlclNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDExMCAqIGkgKyBtb25zdGVyU3ByaXRlQXJyYXlbaV0ud2lkdGggLyAyIC0gdGhpcy5tb25zdGVyRmllbGRMYXlvdXQud2lkdGggLyAyLCAwKTtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhtb25zdGVyU3ByaXRlQXJyYXlbaV0ud2lkdGgpO1xuICAgICAgICAgICAgICAgIC8vY2MubG9nKHRoaXMubW9uc3RlckZpZWxkTGF5b3V0Lm5vZGUud2lkdGgpO1xuICAgICAgICAgICAgICAgIC8vbW9uc3RlclNwcml0ZUFycmF5W2ldLnNldFBvc2l0aW9uKDAsMCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpZWxkQXJyYXlbaV0uaXNBdGtlZCkgbW9uc3RlclNwcml0ZUFycmF5W2ldLm9wYWNpdHkgPSAxMDA7ZWxzZSBtb25zdGVyU3ByaXRlQXJyYXlbaV0ub3BhY2l0eSA9IDI1NTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY2MubG9nKCdtb25zdGVyU3ByaXRlQXJyYXkgaXMgbGVzcyB0aGFuIGZpZWxkQXJyYXkhICVkLyVkJywgaSwgYXJyYXlMZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5rC05pm25Zu+54mH5Yi35pawXG4gICAgcmVmcmVzaGNyaXRpY2Fsc3ByaXRlOiBmdW5jdGlvbiByZWZyZXNoY3JpdGljYWxzcHJpdGUoKSB7XG4gICAgICAgIHZhciBjcml0aWNhbFNwcml0ZUFycmF5ID0gdGhpcy5jcml0aWNhbFNwcml0ZUFycmF5O1xuICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgIGZvciAoOyBpIDwgdGhpcy5jcml0aWNhbDsgKytpKSB7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLnNldFZpc2libGUoMSk7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMCwgMjU1LCAwKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKDsgaSA8IHRoaXMubWF4Q3JpdGljYWw7ICsraSkge1xuICAgICAgICAgICAgY3JpdGljYWxTcHJpdGVBcnJheVtpXS5zZXRWaXNpYmxlKDEpO1xuICAgICAgICAgICAgY3JpdGljYWxTcHJpdGVBcnJheVtpXS5ub2RlLmNvbG9yID0gbmV3IGNjLkNvbG9yKDI1NSwgMCwgMCk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICg7IGkgPCBjcml0aWNhbFNwcml0ZUFycmF5Lmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBjcml0aWNhbFNwcml0ZUFycmF5W2ldLnNldFZpc2libGUoMCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVmcmVzaEhwTGFiZWw6IGZ1bmN0aW9uIHJlZnJlc2hIcExhYmVsKCkge1xuICAgICAgICB0aGlzLmhlcm9IcExhYmVsLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgICAgIHRoaXMuY2FyZFBvb2wgPSBuZXcgY2MuTm9kZVBvb2woJ2NhcmQnKTtcbiAgICAgICAgLy9jYy5sb2coJ3RoaXMuY2FyZFBvb2wgdHlwZScpO1xuICAgICAgICAvL2NjLmxvZyh0aGlzLmNhcmRQb29sKTtcbiAgICAgICAgdGhpcy5tb25zdGVyUG9vbCA9IG5ldyBjYy5Ob2RlUG9vbCgnbW9uc3RlcicpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7Il19
