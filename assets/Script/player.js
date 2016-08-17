const Card = require('card');
const Monster = require('monster');

cc.Class({
    extends: cc.Component,

    properties: {
        duel: null, //战斗管理
        idx: -1,
        teamColor: -1,
        isTurnActive: false,    //是否可以行动
        isReady: false, //是否准备游戏
        
        heroName: '',   //玩家名字
        hp: 30,         //英雄生命值
        critical: 0,    //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        deckNum: 30,    //牌组剩余卡牌
        deckArray:  [],  //卡组数组（Card类型）
        handArray:  [],  //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（Monster类型）
    },
    
    init: function(duel) { this.duel = duel; },
    
    //打包数据完整
    packDataAll: function(data) {
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
    unPackDataAll: function(data) {
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
    packData: function(data, flag) {
        data.flag = flag;
        data.idx  = this.idx;
       
        if(flag & PLAYER_UPDATE_ISTURNACTIVE)
            data.isTurnActive = this.isTurnActive;
        if(flag & PLAYER_UPDATE_HP)
            data.hp = this.hp;
        if(flag & PLAYER_UPDATE_CRITICAL)
            data.critical = this.critical;
        if(flag & PLAYER_UPDATE_MAXCRITICAL)
            data.maxCritical = this.maxCritical;
        if(flag & PLAYER_UPDATE_ISREADY)
            data.isReady = this.isReady;
        if(flag & PLAYER_UPDATE_DECKNUM)
            data.deckNum = this.deckNum;
        if(flag & PLAYER_UPDATE_TEAMCOLOR)
            data.teamColor = this.teamColor;
    },
    
    //解开数据
    unPackData: function(data) {
        var flag = data.flag;
        
        if(flag & PLAYER_UPDATE_ISTURNACTIVE)
            this.isTurnActive = data.isTurnActive;
        if(flag & PLAYER_UPDATE_HP)
            this.hp = data.hp;
        if(flag & PLAYER_UPDATE_CRITICAL)
            this.critical = data.critical;
        if(flag & PLAYER_UPDATE_ISREADY)
            this.isReady = data.isReady;
        if(flag & PLAYER_UPDATE_DECKNUM)
            this.deckNum= data.deckNum;
        if(flag & PLAYER_UPDATE_TEAMCOLOR)
            this.teamColor = data.teamColor;
    },

    //创建手牌
    handCardCreate: function(data) {
        var card = new Card();
        card.unPackDataAll(data);
        this.handArray.push(card);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.createCardSprite(card);
    },
    
    //删除手牌
    handCardDelete: function(idx) {
        this.handArray.splice(idx, 1);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteCardSprite(idx);
    },
    
    //刷新手牌
    handCardUpdate: function(data) {
        var card = this.handArray[data.idx];
        card.unPackData(data);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshCardSprite();
    },
    
    //召唤随从请求
    summonMonster: function(cardIdx) { this.duel.summonMonster(cardIdx); },
    
    //创建随从
    monsterCreate: function(data) {
        cc.log("创建了一个随从");
        var monster = new Monster();
        monster.unPackDataAll(data);
        this.fieldArray.push(monster);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.createMonsterSprite(monster);
    },
    
    //删除随从
    monsterDelete: function(idx) {
        this.fieldArray.splice(idx, 1);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteMonsterSprite(idx);
    },
    
    //刷新随从
    monsterUpdate: function(data) {
        var monster = this.fieldArray[data.idx];
        monster.unPackData(data);
        
        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshMonsterSprite();
    },
        
    getDuel: function()         { return this.duel; },
    getIdx: function()          { return this.idx; },
    getIsTurnActive: function() { return this.isTurnActive; },
    getHeroName: function()     { return this.heroName; },
    getHp: function()           { return this.hp; },
    getCritical: function()     { return this.critical; },
    getMaxCritical: function()  { return this.maxCritical; },
    getDeckNum: function()      { return this.deckNum; },
    getHandCard: function(idx)  { return this.handArray[idx]; },     //获取手牌
    
    
    
    // use this for initialization
    onLoad: function () {

    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
