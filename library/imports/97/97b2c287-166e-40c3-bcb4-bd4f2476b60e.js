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