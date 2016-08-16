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

        if (flag & PLAYER_UPDATE_ISTURNACTIVE) data.isTurnActive = this.isTurnActive;
        if (flag & PLAYER_UPDATE_HP) data.hp = this.hp;
        if (flag & PLAYER_UPDATE_CRITICAL) data.critical = this.critical;
        if (flag & PLAYER_UPDATE_MAXCRITICAL) data.maxCritical = this.maxCritical;
        if (flag & PLAYER_UPDATE_ISREADY) data.isReady = this.isReady;
        if (flag & PLAYER_UPDATE_DECKNUM) data.deckNum = this.deckNum;
    },

    //解开数据
    unPackData: function unPackData(data) {
        var flag = data.flag;

        if (flag & PLAYER_UPDATE_ISTURNACTIVE) {
            this.isTurnActive = data.isTurnActive;
            cc.log("isTurnActive:" + data.isTurnActive);
        }
        if (flag & PLAYER_UPDATE_HP) this.hp = data.hp;
        if (flag & PLAYER_UPDATE_CRITICAL) this.critical = data.critical;
        if (flag & PLAYER_UPDATE_ISREADY) this.isReady = data.isReady;
        if (flag & PLAYER_UPDATE_DECKNUM) this.deckNum = data.deckNum;
    },

    getDuel: function getDuel() {
        return this.duel;
    },
    getIdx: function getIdx() {
        return this.idx;
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
        playerSprite.createCardSprite(card);
    },

    //删除手牌
    deleteCardSprite: function deleteCardSprite(idx) {
        this.handArray.splice(idx, 1);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteCardSprite(idx);
    },

    //刷新手牌
    handCardUpdate: function handCardUpdate(data) {
        var card = this.handArray[data.idx];
        card.unPackData(data);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshCardSprite();
    },

    //重置随从攻击次数
    awakenMonster: function awakenMonster() {
        var fieldArray = this.fieldArray;

        for (var i = 0; i < fieldArray.length; ++i) {
            fieldArray[i].isAtked = false;
        }

        this.refreshMonsterSprite();
    },

    //召唤随从请求
    summonMonster: function summonMonster(cardIdx) {
        this.duel.summonMonster(cardIdx);
    },

    //创建随从
    createMonster: function createMonster(data) {
        cc.log("创建了一个随从");
        var monster = new Monster();
        monster.unPackDataAll(data);
        this.fieldArray.push(monster);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.createMonsterSprite(monster);
    },

    //删除随从
    monsterDelete: function monsterDelete(idx) {
        this.fieldArray.splice(idx, 1);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.deleteMonsterSprite(idx);
    },

    //刷新随从
    monsterUpdate: function monsterUpdate(data) {
        var monster = this.fieldArray[data.idx];
        monster.unPackData(data);

        var playerSprite = this.duel.getPlayerSpriteByPlayer(this.idx);
        playerSprite.refreshMonsterSprite();
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
        this.refreshMonsterSprite();
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