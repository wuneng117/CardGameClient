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