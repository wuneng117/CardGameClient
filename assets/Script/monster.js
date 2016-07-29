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
        _player: null,  //Player引用
        _idx: 0,        //数组索引
  
        
        cardName: "",
        critical:0,
        atk:0,
        hp:0,
        maxHp: 0,
        isAtked: true,     //本回合是否攻击过
    },

    //扣除HP
    reduceHp: function(num) {
        if(num <= 0)
            return;
        
        this.hp -= num;
        //死了就杀掉这个随从
        if(this.isDead())
            this._player.killMonster(this);
        
        this._player.refreshMonsterField();
    },
    
    //回复HP
    addHp: function(num) {
        if(num <= 0)
            return;
            
        this.hp+= num;
        if(this.hp > this.maxHp)
            this.hp = this.maxHp;
        
        this._player.refreshMonsterField();
    },
    
    isDead: function() {
        if(this.hp <= 0)
            return true;
    },
    
    // use this for initialization
    onLoad: function () {
    },
    
    init: function(card, player, idx){
        this.cardName = card.cardName;
        this.critical = card.critical;
        this.atk = card.atk;
        this.hp = card.hp;
        this.maxHp = card.hp;
        
        this._player = player;
        this._idx = idx;        
    },

    //更新编号
    refreshIdx: function(idx) {
        this._idx = idx;
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
