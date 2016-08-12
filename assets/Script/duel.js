//处理对战流程的关键类

const Player = require('player');
const ChatWnd = require('ChatWnd');
const PlayerSprite = require('PlayerSprite');
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
    extends: cc.Component,

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
        state : DUEL_STATE_REST,
        
        turn: 0,            //每个玩家一回合加一次
        round: 0,           //每个玩家都行动过一回合加一次

        //-----------------------控件-------------------------------------------
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        playerSpriteVec: [PlayerSprite],    //玩家控件

        //聊天窗口脚本
        chatWnd: {
            default: null,
            type: ChatWnd
        },
    },
    
    setInputControl: function() {
        var self = this;
        this.node.on('touchstart', function(event) {
            cc.log('1231312321313213123');
            cc.log(event.getLocationX());
        }, this);

    },
    
    addPlayer: function(param) {
        var idx = param;
        var player = this.playerVec[idx];
        //玩家数据已存在
        if(player)
        {
            cc.log('WC_PLAYER_ADD error! player(%d) is already exited.', idx);
            return;
        }
        
        //创建玩家并加入玩家数组
        this.createPlayer(param);
    },
    
    createPlayer: function(param) {
        var player = new Player();
        player.init(this);
        player.unPackDataAll(param);
        this.playerVec[param.idx] = player;
    },
    
    getPlayer: function(idx) {
        return this.playerVec[idx];    
    },
    
    getPlayerSprite: function(idx) {
        return this.playerSpriteVec[idx];    
    },
    
    getPlayerSpriteByPlayer: function(idx) {
        for(var playerSprite of this.playerSpriteVec)
        {
            if(playerSprite.getIdx() === idx)
                return playerSprite;
        }
        
        return null;    
    },
    
    refreshPlayerSprite: function(playerIdx) {
        for(var playerSprite of this.playerSpriteVec)    
        {
            if(playerSprite.getIdx() === playerIdx)
            {
                playerSprite.refresh();
                break;
            }
        }
    },
    
    //召唤随从
    summonMonster: function(cardIdx) {
        GameConn.sendPacket(CW_MONSTER_SUMMON_REQUEST, cardIdx); 
    },
 
    //随从攻击玩家
    monsterAtkPlayer: function(monsterIdx, playerIdx) {
        GameConn.sendPacket(CW_MONSTER_ATTACKPLAYER_REQUEST, {idx: monsterIdx, targetPlayerIdx: playerIdx});
    },
    
    //随从攻击随从
    monsterAtkMonster: function(monsterIdx, playerIdx, targetMonsterIdx) {
        GameConn.sendPacket(CW_MONSTER_ATTACKMONSTER_REQUEST, {idx: monsterIdx, targetPlayerIdx: playerIdx, targetMonsterIdx:targetMonsterIdx});
     },
    
    //回合结束（按钮调用）
    turnEnd_BtnEvent: function(event) {
        //不是MainPhase这个按钮不能按
        if(this.phaseState !== PHASE_MAIN_TURN)
            return;
            
        this.changePhase(PHASE_END_TURN);
    },
    
    addChatItem: function(message, isSystem) {
        this.chatWnd.addChatItem(message, isSystem);
    },
    
    // use this for initialization
    onLoad: function () {
        //this.setInputControl();
        //初始化玩家控件
        for(var playerSprite of this.playerSpriteVec)
        {
            playerSprite.init(this);
        }
    },

    start: function() {
        //this.startGame();
        GameConn.setDuel(this);
        GameConn.sendPacket(CW_ENTERROOM_REQUEST, {});  //用户进入房间请求
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        //this.turnFunc[this.phaseState]();
    },
});
