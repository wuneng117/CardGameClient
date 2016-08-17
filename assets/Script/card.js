
cc.Class({
    extends: cc.Component,

    properties: {
        idx: 0,        //数组索引
        isHide: false, //隐藏数据
        cardName: "",
        critical:0,
        atk:0,
        hp:0,
    },

    // use this for initialization
    onLoad: function () {
    },
    
    //打包数据完整
    packDataAll: function(data) {
        data.idx    = this.idx;
        data.hide   = this.isHide;

        data.cardName = this.cardName;
        data.critical = this.critical;
        data.atk = this.atk;
        data.hp  = this.hp;
    },

    //解开数据完整
    unPackDataAll: function(data) {
        this.idx    = data.idx;
        this.isHide = data.hide;
        if(this.isHide)
            return;
            
        this.cardName = data.cardName;
        this.critical = data.critical;
        this.atk = data.atk;
        this.hp  = data.hp;
    },
    
    //打包数据
    packData: function(data, flag) {
        data.flag = flag;
        data.idx  = this.idx;
    
        if(flag & CARD_UPDATE_CARDNAME)
            data.cardName = this.cardName;
        if(flag & CARD_UPDATE_CRITICAL)
            data.critical = this.critical;
        if(flag & CARD_UPDATE_ATK)
            data.atk = this.atk;
        if(flag & CARD_UPDATE_HP)
            data.hp = this.hp;    
    },
    
    //解开数据
    unPackData: function(data) {
        var flag    = data.flag;
        this.idx    =  data.idx;
        this.isHide = data.hide;
        
        if(this.isHide)
            return;
            
        if(flag & CARD_UPDATE_CARDNAME)
            this.cardName = data.cardName;
        if(flag & CARD_UPDATE_CRITICAL)
            this.critical = data.critical;
        if(flag & CARD_UPDATE_ATK)
            this.atk = data.atk;
        if(flag & CARD_UPDATE_HP)
            this.hp = data.hp;  
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
