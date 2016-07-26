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

        hpLabel: {
            "default": null,
            type: cc.Label
        },

        criticalLabel: {
            "default": null,
            type: cc.Label
        },

        atkLabel: {
            "default": null,
            type: cc.Label
        },

        nameLabel: {
            "default": null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(card) {

        this.hpLabel.string = card.hp.toString();
        this.criticalLabel.string = card.critical.toString();
        this.atklabel.string = card.atk.toString();
        this.nameLabel.string = card.cardName.toString();
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

cc.Class({
    "extends": cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {},

    // called every frame
    update: function update(dt) {}
});

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
        cardName: "",
        critical: 0,
        atk: 0,
        hp: 0
    },

    // use this for initialization
    onLoad: function onLoad() {},

    init: function init(cardData) {
        this.critical = cardData.critical;
        this.cardName = cardData.cardName;
        this.atk = cardData.atk;
        this.hp = cardData.hp;
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

    //开始游戏
    startGame: function startGame() {
        //玩家初始化
        this.localPlayer.init(this);
        this.opponentPlayer.init(this);

        //根据牌池生成卡组
        this.localPlayer.createDeck(tempDeck);
        this.opponentPlayer.createDeck(tempDeck);

        this.turnPlayer = this.localPlayer;
        this.turnOpponent = this.opponentPlayer;

        this.turn = 1;

        changePhase(PHASE_BEGIN_TURN);
    },

    //判断输赢
    checkWin: function checkWin() {},

    enterBeginTurn: function enterBeginTurn() {
        this.turnPlayer.criticalPlus(1); //增加水晶
        this.turnPlayer.criticalRecover(); //回复水晶

        this.turnPlayer.drawCard(1); //抽1张卡
    },

    beginTurn: function beginTurn() {
        //进入主流程
        changePhase(PHASE_MAIN_TURN);
    },

    leaveBeginTurn: function leaveBeginTurn() {},

    enterMainTurn: function enterMainTurn() {},

    mainTurn: function mainTurn() {},

    leavemainTurn: function leavemainTurn() {},

    enterEndTurn: function enterEndTurn() {},

    endTurn: function endTurn() {},

    leaveEndTurn: function leaveEndTurn() {},

    changePhase: function changePhase(nextTurnType) {
        if (this.turnPhase !== 0) {
            this.leaveTurnFunc[this.turnPhase]();
        }

        this.enterTurnFunc[this.tuanPhase]();
    },

    // use this for initialization
    onLoad: function onLoad() {
        //
        this.enterTurnFunc[PHASE_BEGIN_TURN] = this.enterBeginTurn;
        this.enterTurnFunc[PHASE_MAIN_TURN] = this.enterMainTurn;
        this.enterTurnFunc[PHASE_END_TURN] = this.enterEndTurn;

        this.turnFunc[PHASE_BEGIN_TURN] = this.beginTurn;
        this.turnFunc[PHASE_MAIN_TURN] = this.mainTurn;
        this.turnFunc[PHASE_END_TURN] = this.endTurn;

        this.leaveTurnFunc[PHASE_BEGIN_TURN] = this.leaveBeginTurn;
        this.leaveTurnFunc[PHASE_MAIN_TURN] = this.leaveMainTurn;
        this.leaveTurnFunc[PHASE_END_TURN] = this.leaveEndTurn;
    },

    // called every frame, uncomment this function to activate update callback
    update: function update(dt) {
        //this.turnFunc[this.turnPhase]();
    }
});

cc._RFpop();
},{"player":"player"}],"player":[function(require,module,exports){
"use strict";
cc._RFpush(module, 'c8c0a4ButJMAquw9d5sMqfi', 'player');
// Script\player.js

var Card = require('card');
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

        duel: null, //战斗管理
        hp: 30, //英雄生命值
        critical: 0, //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        //handCard: 0,   
        deckArray: [], //卡组数组（Card类型）
        handArray: [], //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（CardMonster类型）
        handCardSpriteArray: [], //手牌图片数组

        //-----------------------控件-------------------------------------------
        //手牌区
        handFiledLayout: {
            'default': null,
            type: cc.Layout
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
        for (var i = 0; i < this.handCardSpriteArray.length(); ++i) {
            //this.handCardSpriteArray[i].removeFrom
        }
    },

    //根据牌池随机创建卡组
    createDeck: function createDeck(cardArray) {
        for (var i = 0; i < 30; ++i) {
            deckArray[i] = new Card();
            var randomKey = cardArray[Math.floor(Math.random() * cardArray.length)];
            var cardData = CardDataManager.cardMap[randomKey];
            deckArray[i].init(cardData);
        }
    },

    //水晶回复
    criticalRecover: function criticalRecover() {
        this.critical = this.maxCritical;
    },

    //水晶增加
    criticalPlus: function criticalPlus(num) {
        this.maxCritical += num;
        this.critical += num;
        if (this.maxCritical > 10) this.maxCritical = 10;
        if (this.critical > 10) this.critical = 10;
    },

    //创建卡牌图片
    createCardToHand: function createCardToHand(card) {
        var cardSprite = cc['instanceof'](this.cardPrefab);
        this.handFiledLayout.addChild(cardSprite);
        this.handArray.push(card);
        this.handCardSpriteArray.push(cardSprite);
        this.refreshHandCard(); //刷新手牌图片
    },

    //抽牌
    drawDeck: function drawDeck(num) {
        var deckArray = this.deckArray;

        if (deckArray.length > 0) {
            var card = deckArray.pop();
            createCardToHand(card);
        } else {
            --this.hp;
            this.heroHpLabel.string = this.hp.toString();
        }

        if (num <= 1) {
            this.duel.checkWin();
        } else {
            this.drawDeck(num - 1);
        }
    },

    //-----------------------界面刷新---------------------------------------
    //手牌图片刷新
    refreshHandCard: function refreshHandCard() {
        var handArray = this.handArray;
        var handCardSpriteArray = this.handCardSpriteArray;
        var arrayLength = handArray.length();

        for (var i = 0; i < arrayLength; ++i) {
            if (handCardSpriteArray[i]) {
                handCardSpriteArray[i].getComponent('card').init(handArray[i]);
                handCardSpriteArray[i].setPosition(40 * i + handCardSpriteArray[i].width / 2 - this.handFiledLayout.width / 2, 0);
            } else {
                cc.log('handCardSpriteArray is less than handArray! %d/%d', i, arrayLength);
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
},{"./data/CardDataManager":"CardDataManager","card":"card"}]},{},["CardSprite","HelloWorld","duel","card","player","CardDataManager","CardData"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6L0NvY29zQ3JlYXRvci9yZXNvdXJjZXMvYXBwLmFzYXIvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImFzc2V0cy9TY3JpcHQvZGF0YS9DYXJkRGF0YU1hbmFnZXIuanMiLCJhc3NldHMvU2NyaXB0L2RhdGEvQ2FyZERhdGEuanMiLCJhc3NldHMvU2NyaXB0L0NhcmRTcHJpdGUuanMiLCJhc3NldHMvU2NyaXB0L0hlbGxvV29ybGQuanMiLCJhc3NldHMvU2NyaXB0L2NhcmQuanMiLCJhc3NldHMvU2NyaXB0L2R1ZWwuanMiLCJhc3NldHMvU2NyaXB0L3BsYXllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZTZhMGZhemVzcEpmSnV4L1hOWEJ5VnQnLCAnQ2FyZERhdGFNYW5hZ2VyJyk7XG4vLyBTY3JpcHRcXGRhdGFcXENhcmREYXRhTWFuYWdlci5qc1xuXG52YXIgQ2FyZERhdGEgPSByZXF1aXJlKCdDYXJkRGF0YScpO1xuXG52YXIgY2FyZERhdGFUZXN0ID0gW1tcImFcIiwgMCwgMSwgMV0sIFtcImJcIiwgMSwgMSwgM10sIFtcImNcIiwgMSwgMiwgMV0sIFtcImRcIiwgMiwgMiwgM10sIFtcImVcIiwgMiwgMywgMl0sIFtcImZcIiwgMiwgNCwgMV0sIFtcImdcIiwgMiwgMSwgNF0sIFtcImhcIiwgMywgMiwgNF0sIFtcImlcIiwgMywgNSwgMV0sIFtcImpcIiwgMywgMywgM10sIFtcImtcIiwgMywgNCwgMl0sIFtcImxcIiwgNCwgMywgNV0sIFtcIm1cIiwgNCwgNSwgMl0sIFtcIm5cIiwgNCwgNCwgNF0sIFtcIm9cIiwgNCwgMiwgNl0sIFtcInBcIiwgNCwgMSwgN10sIFtcInFcIiwgNSwgMywgNl0sIFtcInJcIiwgNSwgNCwgNV0sIFtcInNcIiwgNSwgNSwgNF0sIFtcInRcIiwgNSwgNSwgNV0sIFtcInVcIiwgNSwgNiwgMl0sIFtcInZcIiwgNSwgNiwgM10sIFtcIndcIiwgNiwgMywgOF0sIFtcInhcIiwgNiwgNCwgNl0sIFtcInlcIiwgNiwgNSwgNl0sIFtcInpcIiwgNiwgNiwgNl0sIFtcIkFcIiwgNiwgNiwgNV0sIFtcIkJcIiwgNiwgNywgM10sIFtcIkNcIiwgNiwgOCwgMV0sIFtcIkRcIiwgNywgNywgN10sIFtcIkVcIiwgNywgNCwgOF0sIFtcIkZcIiwgNywgNiwgOF0sIFtcIkdcIiwgNywgNywgN10sIFtcIkhcIiwgOCwgOCwgOF0sIFtcIklcIiwgOCwgNywgOV0sIFtcIkpcIiwgOCwgOSwgNl0sIFtcIktcIiwgOSwgOSwgOV0sIFtcIkxcIiwgMTAsIDEyLCAxMl1dO1xuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuXG4gICAgfSxcblxuICAgIC8vIHVzZSB0aGlzIGZvciBpbml0aWFsaXphdGlvblxuICAgIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge30sXG5cbiAgICBzdGF0aWNzOiB7XG4gICAgICAgIGNhcmRNYXA6IHtcbiAgICAgICAgICAgIFwiZGVmYXVsdFwiOiB7fVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGNhcmREYXRhVGVzdCkge1xuICAgICAgICAgICAgICAgIHZhciBjYXJkID0gbmV3IENhcmREYXRhKCk7XG4gICAgICAgICAgICAgICAgY2FyZC5jYXJkTmFtZSA9IGNhcmREYXRhVGVzdFtpXVswXTtcbiAgICAgICAgICAgICAgICBjYXJkLmNyaXRpY2FsID0gY2FyZERhdGFUZXN0W2ldWzFdO1xuICAgICAgICAgICAgICAgIGNhcmQuYXRrID0gY2FyZERhdGFUZXN0W2ldWzJdO1xuICAgICAgICAgICAgICAgIGNhcmQuaHAgPSBjYXJkRGF0YVRlc3RbaV1bM107XG4gICAgICAgICAgICAgICAgdGhpcy5jYXJkTWFwW2NhcmQuY2FyZE5hbWVdID0gY2FyZDtcbiAgICAgICAgICAgICAgICAvL2NjLmxvZyhjYXJkRGF0YVRlc3RbaV1bMF0sY2FyZERhdGFUZXN0W2ldWzFdLGNhcmREYXRhVGVzdFtpXVsyXSxjYXJkRGF0YVRlc3RbaV1bM10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnZjFkOGViQnVQeEJ5clhxZ29EbEczYk8nLCAnQ2FyZERhdGEnKTtcbi8vIFNjcmlwdFxcZGF0YVxcQ2FyZERhdGEuanNcblxuY2MuQ2xhc3Moe1xuICAgIFwiZXh0ZW5kc1wiOiBjYy5Db21wb25lbnQsXG5cbiAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgIC8vIGZvbzoge1xuICAgICAgICAvLyAgICBkZWZhdWx0OiBudWxsLFxuICAgICAgICAvLyAgICB1cmw6IGNjLlRleHR1cmUyRCwgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHR5cGVvZiBkZWZhdWx0XG4gICAgICAgIC8vICAgIHNlcmlhbGl6YWJsZTogdHJ1ZSwgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICB2aXNpYmxlOiB0cnVlLCAgICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgZGlzcGxheU5hbWU6ICdGb28nLCAvLyBvcHRpb25hbFxuICAgICAgICAvLyAgICByZWFkb25seTogZmFsc2UsICAgIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIGZhbHNlXG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIC4uLlxuICAgICAgICBjYXJkTmFtZTogXCJcIixcbiAgICAgICAgY3JpdGljYWw6IDAsXG4gICAgICAgIGhwOiAwLFxuICAgICAgICBhdGs6IDBcbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnMDliMDIvaW51Tk5RcmhjbWtITXAzbjcnLCAnQ2FyZFNwcml0ZScpO1xuLy8gU2NyaXB0XFxDYXJkU3ByaXRlLmpzXG5cbmNjLkNsYXNzKHtcbiAgICBcImV4dGVuZHNcIjogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBocExhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JpdGljYWxMYWJlbDoge1xuICAgICAgICAgICAgXCJkZWZhdWx0XCI6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYWJlbFxuICAgICAgICB9LFxuXG4gICAgICAgIGF0a0xhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH0sXG5cbiAgICAgICAgbmFtZUxhYmVsOiB7XG4gICAgICAgICAgICBcImRlZmF1bHRcIjogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLkxhYmVsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoY2FyZCkge1xuXG4gICAgICAgIHRoaXMuaHBMYWJlbC5zdHJpbmcgPSBjYXJkLmhwLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY3JpdGljYWxMYWJlbC5zdHJpbmcgPSBjYXJkLmNyaXRpY2FsLnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuYXRrbGFiZWwuc3RyaW5nID0gY2FyZC5hdGsudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5uYW1lTGFiZWwuc3RyaW5nID0gY2FyZC5jYXJkTmFtZS50b1N0cmluZygpO1xuICAgIH1cblxufSk7XG4vLyBjYWxsZWQgZXZlcnkgZnJhbWUsIHVuY29tbWVudCB0aGlzIGZ1bmN0aW9uIHRvIGFjdGl2YXRlIHVwZGF0ZSBjYWxsYmFja1xuLy8gdXBkYXRlOiBmdW5jdGlvbiAoZHQpIHtcblxuLy8gfSxcblxuY2MuX1JGcG9wKCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5jYy5fUkZwdXNoKG1vZHVsZSwgJzI4MGMzcnNaSkpLblo5UnFiQUxWd3RLJywgJ0hlbGxvV29ybGQnKTtcbi8vIFNjcmlwdFxcSGVsbG9Xb3JsZC5qc1xuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHt9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZVxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGR0KSB7fVxufSk7XG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3NzQyNzNhVFB0SWxMY1VqbnBMWmxWWicsICdjYXJkJyk7XG4vLyBTY3JpcHRcXGNhcmQuanNcblxuXG5jYy5DbGFzcyh7XG4gICAgXCJleHRlbmRzXCI6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG4gICAgICAgIGNhcmROYW1lOiBcIlwiLFxuICAgICAgICBjcml0aWNhbDogMCxcbiAgICAgICAgYXRrOiAwLFxuICAgICAgICBocDogMFxuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHt9LFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdChjYXJkRGF0YSkge1xuICAgICAgICB0aGlzLmNyaXRpY2FsID0gY2FyZERhdGEuY3JpdGljYWw7XG4gICAgICAgIHRoaXMuY2FyZE5hbWUgPSBjYXJkRGF0YS5jYXJkTmFtZTtcbiAgICAgICAgdGhpcy5hdGsgPSBjYXJkRGF0YS5hdGs7XG4gICAgICAgIHRoaXMuaHAgPSBjYXJkRGF0YS5ocDtcbiAgICB9XG5cbn0pO1xuLy8gY2FsbGVkIGV2ZXJ5IGZyYW1lLCB1bmNvbW1lbnQgdGhpcyBmdW5jdGlvbiB0byBhY3RpdmF0ZSB1cGRhdGUgY2FsbGJhY2tcbi8vIHVwZGF0ZTogZnVuY3Rpb24gKGR0KSB7XG5cbi8vIH0sXG5cbmNjLl9SRnBvcCgpOyIsIlwidXNlIHN0cmljdFwiO1xuY2MuX1JGcHVzaChtb2R1bGUsICc3NDg2OGxDaExKSGtxeE9tR2poVWhraycsICdkdWVsJyk7XG4vLyBTY3JpcHRcXGR1ZWwuanNcblxuLy/lpITnkIblr7nmiJjmtYHnqIvnmoTlhbPplK7nsbtcblxudmFyIFBsYXllciA9IHJlcXVpcmUoJ3BsYXllcicpO1xuXG52YXIgdGVtcERlY2sgPSBbJ2EnLCAnYicsICdjJywgJ2QnLCAnZScsICdmJywgJ2cnLCAnaCcsICdpJywgJ2onLCAnaycsICdsJywgJ20nLCAnbicsICdvJywgJ3AnLCAncScsICdyJywgJ3MnLCAndCcsICd1JywgJ3YnLCAndycsICd4JywgJ3knLCAneicsICdBJywgJ0InLCAnQycsICdEJywgJ0UnLCAnRicsICdHJywgJ0gnLCAnSScsICdKJywgJ0snLCAnTCddO1xuY2MuQ2xhc3Moe1xuICAgICdleHRlbmRzJzogY2MuQ29tcG9uZW50LFxuXG4gICAgcHJvcGVydGllczoge1xuICAgICAgICAvLyBmb286IHtcbiAgICAgICAgLy8gICAgZGVmYXVsdDogbnVsbCxcbiAgICAgICAgLy8gICAgdXJsOiBjYy5UZXh0dXJlMkQsICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0eXBlb2YgZGVmYXVsdFxuICAgICAgICAvLyAgICBzZXJpYWxpemFibGU6IHRydWUsIC8vIG9wdGlvbmFsLCBkZWZhdWx0IGlzIHRydWVcbiAgICAgICAgLy8gICAgdmlzaWJsZTogdHJ1ZSwgICAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIGRpc3BsYXlOYW1lOiAnRm9vJywgLy8gb3B0aW9uYWxcbiAgICAgICAgLy8gICAgcmVhZG9ubHk6IGZhbHNlLCAgICAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyBmYWxzZVxuICAgICAgICAvLyB9LFxuICAgICAgICAvLyAuLi5cblxuICAgICAgICBjYXJkUHJlZmFiOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5QcmVmYWJcbiAgICAgICAgfSxcblxuICAgICAgICAvL+iHquW3sVxuICAgICAgICBsb2NhbFBsYXllcjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogUGxheWVyXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy/lr7nmiYtcbiAgICAgICAgb3Bwb25lbnRQbGF5ZXI6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IFBsYXllclxuICAgICAgICB9LFxuXG4gICAgICAgIHR1cm46IDAsIC8v5b2T5YmN5Y+M5pa55oC75Zue5ZCI5pWwXG4gICAgICAgIHR1cm5QaGFzZTogMCwgLy/ooYzliqjnirbmgIFcblxuICAgICAgICAvL+eKtuaAgeebuOWFs1xuICAgICAgICBlbnRlclR1cm5GdW5jOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHVybkZ1bmM6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogW11cbiAgICAgICAgfSxcblxuICAgICAgICBsZWF2ZVR1cm5GdW5jOiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IFtdXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/lvIDlp4vmuLjmiI9cbiAgICBzdGFydEdhbWU6IGZ1bmN0aW9uIHN0YXJ0R2FtZSgpIHtcbiAgICAgICAgLy/njqnlrrbliJ3lp4vljJZcbiAgICAgICAgdGhpcy5sb2NhbFBsYXllci5pbml0KHRoaXMpO1xuICAgICAgICB0aGlzLm9wcG9uZW50UGxheWVyLmluaXQodGhpcyk7XG5cbiAgICAgICAgLy/moLnmja7niYzmsaDnlJ/miJDljaHnu4RcbiAgICAgICAgdGhpcy5sb2NhbFBsYXllci5jcmVhdGVEZWNrKHRlbXBEZWNrKTtcbiAgICAgICAgdGhpcy5vcHBvbmVudFBsYXllci5jcmVhdGVEZWNrKHRlbXBEZWNrKTtcblxuICAgICAgICB0aGlzLnR1cm5QbGF5ZXIgPSB0aGlzLmxvY2FsUGxheWVyO1xuICAgICAgICB0aGlzLnR1cm5PcHBvbmVudCA9IHRoaXMub3Bwb25lbnRQbGF5ZXI7XG5cbiAgICAgICAgdGhpcy50dXJuID0gMTtcblxuICAgICAgICBjaGFuZ2VQaGFzZShQSEFTRV9CRUdJTl9UVVJOKTtcbiAgICB9LFxuXG4gICAgLy/liKTmlq3ovpPotaJcbiAgICBjaGVja1dpbjogZnVuY3Rpb24gY2hlY2tXaW4oKSB7fSxcblxuICAgIGVudGVyQmVnaW5UdXJuOiBmdW5jdGlvbiBlbnRlckJlZ2luVHVybigpIHtcbiAgICAgICAgdGhpcy50dXJuUGxheWVyLmNyaXRpY2FsUGx1cygxKTsgLy/lop7liqDmsLTmmbZcbiAgICAgICAgdGhpcy50dXJuUGxheWVyLmNyaXRpY2FsUmVjb3ZlcigpOyAvL+WbnuWkjeawtOaZtlxuXG4gICAgICAgIHRoaXMudHVyblBsYXllci5kcmF3Q2FyZCgxKTsgLy/mir0x5byg5Y2hXG4gICAgfSxcblxuICAgIGJlZ2luVHVybjogZnVuY3Rpb24gYmVnaW5UdXJuKCkge1xuICAgICAgICAvL+i/m+WFpeS4u+a1geeoi1xuICAgICAgICBjaGFuZ2VQaGFzZShQSEFTRV9NQUlOX1RVUk4pO1xuICAgIH0sXG5cbiAgICBsZWF2ZUJlZ2luVHVybjogZnVuY3Rpb24gbGVhdmVCZWdpblR1cm4oKSB7fSxcblxuICAgIGVudGVyTWFpblR1cm46IGZ1bmN0aW9uIGVudGVyTWFpblR1cm4oKSB7fSxcblxuICAgIG1haW5UdXJuOiBmdW5jdGlvbiBtYWluVHVybigpIHt9LFxuXG4gICAgbGVhdmVtYWluVHVybjogZnVuY3Rpb24gbGVhdmVtYWluVHVybigpIHt9LFxuXG4gICAgZW50ZXJFbmRUdXJuOiBmdW5jdGlvbiBlbnRlckVuZFR1cm4oKSB7fSxcblxuICAgIGVuZFR1cm46IGZ1bmN0aW9uIGVuZFR1cm4oKSB7fSxcblxuICAgIGxlYXZlRW5kVHVybjogZnVuY3Rpb24gbGVhdmVFbmRUdXJuKCkge30sXG5cbiAgICBjaGFuZ2VQaGFzZTogZnVuY3Rpb24gY2hhbmdlUGhhc2UobmV4dFR1cm5UeXBlKSB7XG4gICAgICAgIGlmICh0aGlzLnR1cm5QaGFzZSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5sZWF2ZVR1cm5GdW5jW3RoaXMudHVyblBoYXNlXSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lbnRlclR1cm5GdW5jW3RoaXMudHVhblBoYXNlXSgpO1xuICAgIH0sXG5cbiAgICAvLyB1c2UgdGhpcyBmb3IgaW5pdGlhbGl6YXRpb25cbiAgICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5lbnRlclR1cm5GdW5jW1BIQVNFX0JFR0lOX1RVUk5dID0gdGhpcy5lbnRlckJlZ2luVHVybjtcbiAgICAgICAgdGhpcy5lbnRlclR1cm5GdW5jW1BIQVNFX01BSU5fVFVSTl0gPSB0aGlzLmVudGVyTWFpblR1cm47XG4gICAgICAgIHRoaXMuZW50ZXJUdXJuRnVuY1tQSEFTRV9FTkRfVFVSTl0gPSB0aGlzLmVudGVyRW5kVHVybjtcblxuICAgICAgICB0aGlzLnR1cm5GdW5jW1BIQVNFX0JFR0lOX1RVUk5dID0gdGhpcy5iZWdpblR1cm47XG4gICAgICAgIHRoaXMudHVybkZ1bmNbUEhBU0VfTUFJTl9UVVJOXSA9IHRoaXMubWFpblR1cm47XG4gICAgICAgIHRoaXMudHVybkZ1bmNbUEhBU0VfRU5EX1RVUk5dID0gdGhpcy5lbmRUdXJuO1xuXG4gICAgICAgIHRoaXMubGVhdmVUdXJuRnVuY1tQSEFTRV9CRUdJTl9UVVJOXSA9IHRoaXMubGVhdmVCZWdpblR1cm47XG4gICAgICAgIHRoaXMubGVhdmVUdXJuRnVuY1tQSEFTRV9NQUlOX1RVUk5dID0gdGhpcy5sZWF2ZU1haW5UdXJuO1xuICAgICAgICB0aGlzLmxlYXZlVHVybkZ1bmNbUEhBU0VfRU5EX1RVUk5dID0gdGhpcy5sZWF2ZUVuZFR1cm47XG4gICAgfSxcblxuICAgIC8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoZHQpIHtcbiAgICAgICAgLy90aGlzLnR1cm5GdW5jW3RoaXMudHVyblBoYXNlXSgpO1xuICAgIH1cbn0pO1xuXG5jYy5fUkZwb3AoKTsiLCJcInVzZSBzdHJpY3RcIjtcbmNjLl9SRnB1c2gobW9kdWxlLCAnYzhjMGE0QnV0Sk1BcXV3OWQ1c01xZmknLCAncGxheWVyJyk7XG4vLyBTY3JpcHRcXHBsYXllci5qc1xuXG52YXIgQ2FyZCA9IHJlcXVpcmUoJ2NhcmQnKTtcbnZhciBDYXJkRGF0YU1hbmFnZXIgPSByZXF1aXJlKCcuL2RhdGEvQ2FyZERhdGFNYW5hZ2VyJyk7XG5cbmNjLkNsYXNzKHtcbiAgICAnZXh0ZW5kcyc6IGNjLkNvbXBvbmVudCxcblxuICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgLy8gZm9vOiB7XG4gICAgICAgIC8vICAgIGRlZmF1bHQ6IG51bGwsXG4gICAgICAgIC8vICAgIHVybDogY2MuVGV4dHVyZTJELCAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHlwZW9mIGRlZmF1bHRcbiAgICAgICAgLy8gICAgc2VyaWFsaXphYmxlOiB0cnVlLCAvLyBvcHRpb25hbCwgZGVmYXVsdCBpcyB0cnVlXG4gICAgICAgIC8vICAgIHZpc2libGU6IHRydWUsICAgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgdHJ1ZVxuICAgICAgICAvLyAgICBkaXNwbGF5TmFtZTogJ0ZvbycsIC8vIG9wdGlvbmFsXG4gICAgICAgIC8vICAgIHJlYWRvbmx5OiBmYWxzZSwgICAgLy8gb3B0aW9uYWwsIGRlZmF1bHQgaXMgZmFsc2VcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gLi4uXG5cbiAgICAgICAgY2FyZFByZWZhYjoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuUHJlZmFiXG4gICAgICAgIH0sXG5cbiAgICAgICAgZHVlbDogbnVsbCwgLy/miJjmlpfnrqHnkIZcbiAgICAgICAgaHA6IDMwLCAvL+iLsembhOeUn+WRveWAvFxuICAgICAgICBjcml0aWNhbDogMCwgLy/oi7Hpm4TlvZPliY3msLTmmbbmlbBcbiAgICAgICAgbWF4Q3JpdGljYWw6IDAsIC8v6Iux6ZuE5b2T5YmN5Zue5ZCI5pyA5aSn5rC05pm25pWwXG4gICAgICAgIC8vaGFuZENhcmQ6IDAsICAgXG4gICAgICAgIGRlY2tBcnJheTogW10sIC8v5Y2h57uE5pWw57uE77yIQ2FyZOexu+Wei++8iVxuICAgICAgICBoYW5kQXJyYXk6IFtdLCAvL+aJi+eJjOaVsOe7hO+8iENhcmTnsbvlnovvvIlcbiAgICAgICAgZmllbGRBcnJheTogW10sIC8v5Zy65LiK6ZqP5LuO5pWw57uE77yIQ2FyZE1vbnN0ZXLnsbvlnovvvIlcbiAgICAgICAgaGFuZENhcmRTcHJpdGVBcnJheTogW10sIC8v5omL54mM5Zu+54mH5pWw57uEXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLeaOp+S7ti0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy/miYvniYzljLpcbiAgICAgICAgaGFuZEZpbGVkTGF5b3V0OiB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IG51bGwsXG4gICAgICAgICAgICB0eXBlOiBjYy5MYXlvdXRcbiAgICAgICAgfSxcbiAgICAgICAgLy/lpLTlg49cbiAgICAgICAgaGVyb0ljb25TcHJpdGU6IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogbnVsbCxcbiAgICAgICAgICAgIHR5cGU6IGNjLlNwcml0ZVxuICAgICAgICB9LFxuICAgICAgICAvL+ihgOmHj+aYvuekulxuICAgICAgICBoZXJvSHBMYWJlbDoge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBudWxsLFxuICAgICAgICAgICAgdHlwZTogY2MuTGFiZWxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KGR1ZWwpIHtcbiAgICAgICAgdGhpcy5kdWVsID0gZHVlbDtcbiAgICAgICAgdGhpcy5ocCA9IDMwO1xuICAgICAgICB0aGlzLmNyaXRpY2FsID0gMDtcbiAgICAgICAgdGhpcy5tYXhDcml0aWNhbCA9IDA7XG4gICAgICAgIHRoaXMuZGVja0FycmF5ID0gW107XG4gICAgICAgIHRoaXMuaGFuZEFycmF5ID0gW107XG4gICAgICAgIHRoaXMuZmllbGRBcnJheSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGFuZENhcmRTcHJpdGVBcnJheS5sZW5ndGgoKTsgKytpKSB7XG4gICAgICAgICAgICAvL3RoaXMuaGFuZENhcmRTcHJpdGVBcnJheVtpXS5yZW1vdmVGcm9tXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/moLnmja7niYzmsaDpmo/mnLrliJvlu7rljaHnu4RcbiAgICBjcmVhdGVEZWNrOiBmdW5jdGlvbiBjcmVhdGVEZWNrKGNhcmRBcnJheSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMwOyArK2kpIHtcbiAgICAgICAgICAgIGRlY2tBcnJheVtpXSA9IG5ldyBDYXJkKCk7XG4gICAgICAgICAgICB2YXIgcmFuZG9tS2V5ID0gY2FyZEFycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNhcmRBcnJheS5sZW5ndGgpXTtcbiAgICAgICAgICAgIHZhciBjYXJkRGF0YSA9IENhcmREYXRhTWFuYWdlci5jYXJkTWFwW3JhbmRvbUtleV07XG4gICAgICAgICAgICBkZWNrQXJyYXlbaV0uaW5pdChjYXJkRGF0YSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/msLTmmbblm57lpI1cbiAgICBjcml0aWNhbFJlY292ZXI6IGZ1bmN0aW9uIGNyaXRpY2FsUmVjb3ZlcigpIHtcbiAgICAgICAgdGhpcy5jcml0aWNhbCA9IHRoaXMubWF4Q3JpdGljYWw7XG4gICAgfSxcblxuICAgIC8v5rC05pm25aKe5YqgXG4gICAgY3JpdGljYWxQbHVzOiBmdW5jdGlvbiBjcml0aWNhbFBsdXMobnVtKSB7XG4gICAgICAgIHRoaXMubWF4Q3JpdGljYWwgKz0gbnVtO1xuICAgICAgICB0aGlzLmNyaXRpY2FsICs9IG51bTtcbiAgICAgICAgaWYgKHRoaXMubWF4Q3JpdGljYWwgPiAxMCkgdGhpcy5tYXhDcml0aWNhbCA9IDEwO1xuICAgICAgICBpZiAodGhpcy5jcml0aWNhbCA+IDEwKSB0aGlzLmNyaXRpY2FsID0gMTA7XG4gICAgfSxcblxuICAgIC8v5Yib5bu65Y2h54mM5Zu+54mHXG4gICAgY3JlYXRlQ2FyZFRvSGFuZDogZnVuY3Rpb24gY3JlYXRlQ2FyZFRvSGFuZChjYXJkKSB7XG4gICAgICAgIHZhciBjYXJkU3ByaXRlID0gY2NbJ2luc3RhbmNlb2YnXSh0aGlzLmNhcmRQcmVmYWIpO1xuICAgICAgICB0aGlzLmhhbmRGaWxlZExheW91dC5hZGRDaGlsZChjYXJkU3ByaXRlKTtcbiAgICAgICAgdGhpcy5oYW5kQXJyYXkucHVzaChjYXJkKTtcbiAgICAgICAgdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5LnB1c2goY2FyZFNwcml0ZSk7XG4gICAgICAgIHRoaXMucmVmcmVzaEhhbmRDYXJkKCk7IC8v5Yi35paw5omL54mM5Zu+54mHXG4gICAgfSxcblxuICAgIC8v5oq954mMXG4gICAgZHJhd0RlY2s6IGZ1bmN0aW9uIGRyYXdEZWNrKG51bSkge1xuICAgICAgICB2YXIgZGVja0FycmF5ID0gdGhpcy5kZWNrQXJyYXk7XG5cbiAgICAgICAgaWYgKGRlY2tBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgY2FyZCA9IGRlY2tBcnJheS5wb3AoKTtcbiAgICAgICAgICAgIGNyZWF0ZUNhcmRUb0hhbmQoY2FyZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAtLXRoaXMuaHA7XG4gICAgICAgICAgICB0aGlzLmhlcm9IcExhYmVsLnN0cmluZyA9IHRoaXMuaHAudG9TdHJpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChudW0gPD0gMSkge1xuICAgICAgICAgICAgdGhpcy5kdWVsLmNoZWNrV2luKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRyYXdEZWNrKG51bSAtIDEpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3nlYzpnaLliLfmlrAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvL+aJi+eJjOWbvueJh+WIt+aWsFxuICAgIHJlZnJlc2hIYW5kQ2FyZDogZnVuY3Rpb24gcmVmcmVzaEhhbmRDYXJkKCkge1xuICAgICAgICB2YXIgaGFuZEFycmF5ID0gdGhpcy5oYW5kQXJyYXk7XG4gICAgICAgIHZhciBoYW5kQ2FyZFNwcml0ZUFycmF5ID0gdGhpcy5oYW5kQ2FyZFNwcml0ZUFycmF5O1xuICAgICAgICB2YXIgYXJyYXlMZW5ndGggPSBoYW5kQXJyYXkubGVuZ3RoKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheUxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoaGFuZENhcmRTcHJpdGVBcnJheVtpXSkge1xuICAgICAgICAgICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uZ2V0Q29tcG9uZW50KCdjYXJkJykuaW5pdChoYW5kQXJyYXlbaV0pO1xuICAgICAgICAgICAgICAgIGhhbmRDYXJkU3ByaXRlQXJyYXlbaV0uc2V0UG9zaXRpb24oNDAgKiBpICsgaGFuZENhcmRTcHJpdGVBcnJheVtpXS53aWR0aCAvIDIgLSB0aGlzLmhhbmRGaWxlZExheW91dC53aWR0aCAvIDIsIDApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjYy5sb2coJ2hhbmRDYXJkU3ByaXRlQXJyYXkgaXMgbGVzcyB0aGFuIGhhbmRBcnJheSEgJWQvJWQnLCBpLCBhcnJheUxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gdXNlIHRoaXMgZm9yIGluaXRpYWxpemF0aW9uXG4gICAgb25Mb2FkOiBmdW5jdGlvbiBvbkxvYWQoKSB7fVxuXG59KTtcbi8vIGNhbGxlZCBldmVyeSBmcmFtZSwgdW5jb21tZW50IHRoaXMgZnVuY3Rpb24gdG8gYWN0aXZhdGUgdXBkYXRlIGNhbGxiYWNrXG4vLyB1cGRhdGU6IGZ1bmN0aW9uIChkdCkge1xuXG4vLyB9LFxuXG5jYy5fUkZwb3AoKTsiXX0=
