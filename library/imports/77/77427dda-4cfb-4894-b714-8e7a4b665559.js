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
        this.isHide = data.hide;

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