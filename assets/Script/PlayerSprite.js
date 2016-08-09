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
        idx: -1,        //对应玩家IDX
        duel: null,    //游戏管理
        handCardSpriteArray: [], //手牌图片数组
        monsterSpriteArray: [], //随从图片数组
        
        //---------------------节点池管理---------------------------------------
        cardPool: null,
        monsterPool: null,
        
        //-----------------------控件-------------------------------------------
        //手牌区
        handFiledLayout: {
            default: null,
            type: cc.Layout
        },
        
        //场上随从区
        monsterFieldLayout: {
            default: null,
            type: cc.Node
        },
        
        //头像
        heroIconSprite: {
            default: null,
            type: cc.Sprite
        },
        
        //血量显示
        heroHpLabel: {
            default: null,
            type: cc.Label
        },
        
        //水晶
        criticalSpriteArray :[cc.Sprite],
        
        //卡组牌数
        deckLabel: {
            default: null,
            type: cc.Label
        },
    },
    
    init: function(duel) {
        this.idx = -1;
        this.duel = duel;
        for(var node of this.handCardSpriteArray)
        {
            this.cardPool.put(node);
        }
        this.handCardSpriteArray = [];
        
        for(var node1 of this.monsterSpriteArray)
        {
            this.cardPool.put(node);
        }
        this.monsterSpriteArray = [];
        
        //头像
        
        //HP
        this.heroHpLabel.string = '0';
        //水晶
        for(var criticalSprite of criticalSpriteArray)
        {
            criticalSprite.setVisible(0);
        }
        this.deckLabel.string = '0';
    },
    
    //界面刷新
    refresh: function() {
        var player = this.duel.getPlayer(this.idx);
        //水晶图片刷新
        var criticalSpriteArray = this.criticalSpriteArray;
        var i=0;
        for(; i<this.critical; ++i)
        {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(0,255,0);
        }
        for(;i<this.maxCritical; ++i)
        {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(255,0,0);
        }
        for(;i<criticalSpriteArray.length; ++i)
        {
            criticalSpriteArray[i].setVisible(0);
        }
    
        this.heroHpLabel.string = this.hp.toString();  
    },
    
    setIdx: function(idx) { this.idx = idx;},
    getIdx: function() { return this.idx;},
    
    // use this for initialization
    onLoad: function () {
        this.cardPool = new cc.NodePool('card');
        //cc.log('this.cardPool type');
        //cc.log(this.cardPool);
        this.monsterPool = new cc.NodePool('monster');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
