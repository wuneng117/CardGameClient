//处理对战流程的关键类

const Player = require('player');
const ChatWnd = require('ChatWnd');
const PlayerSprite = require('PlayerSprite');
var GameConn = require('./NetWork/GameConn');

//对战状态
var DUEL_STATE_REST     = 0;
var DUEL_STATE_PLAYING  = 1;

//分组
var TEAM_COLOR_NONE = -1;
var TEAM_COLOR_RED  = 1;
var TEAM_COLOR_BLUE = 2;

cc.Class({
    extends: cc.Component,

    properties: {
        playerVec: [],  //玩家数组

        //-----------------------控件-------------------------------------------
        playerSpriteVec: [PlayerSprite],    //玩家控件数组

        //聊天窗口脚本
        chatWnd: {
            default: null,
            type: ChatWnd
        },
    },
    
    //添加玩家到玩家数组
    addPlayer: function(param) {
        var idx = param.idx;
        var player = this.playerVec[idx];
        //玩家数据已存在
        if(player)
        {
            cc.log('WC_PLAYER_ADD error! player(%d) is already exited.', idx);
            return;
        }
        
        //创建玩家并加入玩家数组
        player = new Player();
        player.init(this);
        player.unPackDataAll(param);
        this.playerVec[idx] = player;
    },

    //刷新玩家控件
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
    summonMonster: function(cardIdx) { GameConn.sendPacket(CW_MONSTER_SUMMON_REQUEST, cardIdx); },
    //随从攻击玩家
    monsterAtkPlayer: function(monsterIdx, playerIdx) { GameConn.sendPacket(CW_MONSTER_ATTACKPLAYER_REQUEST, {idx: monsterIdx, targetPlayerIdx: playerIdx}); },
    //随从攻击随从
    monsterAtkMonster: function(monsterIdx, playerIdx, targetMonsterIdx) { GameConn.sendPacket(CW_MONSTER_ATTACKMONSTER_REQUEST, {idx: monsterIdx, targetPlayerIdx: playerIdx, targetMonsterIdx:targetMonsterIdx}); },
    
    //回合结束（按钮调用）
    turnEnd_BtnEvent: function(event) {
        //不是自己行动不能按
        var player = this.playerVec[this.playerSpriteVec[0].getIdx()];
        if(!player.getIsTurnActive())
            return;
            
        GameConn.sendPacket(CW_ENDPHASE_REQUEST, {});  //用户结束回合请求
    },
    
    addChatItem: function(message, isSystem) { this.chatWnd.addChatItem(message, isSystem); },
     
    getPlayer: function(idx) { return this.playerVec[idx]; },   //获取player
    getPlayerSprite: function(idx) { return this.playerSpriteVec[idx]; },   //获取playersprite
    
    //根据player的idx获取playersprite
    getPlayerSpriteByPlayer: function(idx) {
        for(var playerSprite of this.playerSpriteVec)
        {
            if(playerSprite.getIdx() === idx)
                return playerSprite;
        }
        
        return null;    
    },
 
    // use this for initialization
    onLoad: function () {
        //初始化玩家控件
        for(var playerSprite of this.playerSpriteVec)
            playerSprite.init(this);
    },

    start: function() {
        GameConn.setDuel(this);
        GameConn.sendPacket(CW_ENTERROOM_REQUEST, {});  //用户进入房间请求
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
    },
});
