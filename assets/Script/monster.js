
cc.Class({
    extends: cc.Component,

    properties: {
        idx: 0,        //数组索引
        cardName: "",
        critical:0,
        atk:0,
        hp:0,
        maxHp: 0,
        isAtked: true,     //本回合是否攻击过
    },
    
    //打包数据完整
    packDataAll: function(data) {
        data.idx = this.idx;
        
        data.cardName = this.cardName;
        data.critical = this.critical;
        data.atk = this.atk;
        data.hp = this.hp;
        data.maxHp = this.maxHp;
        data.isAtked = this.isAtked;
    },
    
    //解开数据完整
    unPackDataAll: function(data) {
        this.idx = data.idx;
        
        this.cardName = data.cardName;
        this.critical = data.critical;
        this.atk = data.atk;
        this.hp = data.hp;
        this.maxHp = data.maxHp;
        this.isAtked = data.isAtked;
    },
    
    //打包数据
    packData: function(data, flag) {
        data.flag = flag;
        data.idx = this.idx;
    
        if(flag & MONSTER_UPDATE_CARDNAME)
            data.cardName = this.cardName;
        if(flag & MONSTER_UPDATE_CRITICAL)
            data.critical = this.critical;
        if(flag & MONSTER_UPDATE_ATK)
            data.atk = this.atk;
        if(flag & MONSTER_UPDATE_HP)
            data.hp = this.hp;    
        if(flag & MONSTER_UPDATE_MAXHP)
            data.maxHp = this.maxHp;
        if(flag & MONSTER_UPDATE_ISATKED)
            data.isAtked = this.isAtked;
    },
    
    
    //解开数据
    unPackData: function(data) {
        var flag = data.flag;
        this.idx = data.idx;
    
        if(flag & MONSTER_UPDATE_CARDNAME)
            this.cardName = data.cardName;
        if(flag & MONSTER_UPDATE_CRITICAL)
            this.critical = data.critical;
        if(flag & MONSTER_UPDATE_ATK)
            this.atk = data.atk;
        if(flag & MONSTER_UPDATE_HP)
            this.hp = data.hp;    
        if(flag & MONSTER_UPDATE_MAXHP)
            this.maxHp = data.maxHp;
        if(flag & MONSTER_UPDATE_ISATKED)
            this.isAtked = data.isAtked;
    },
    
    // use this for initialization
    onLoad: function () {
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
