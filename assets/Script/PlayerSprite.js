const CardSprite = require('CardSprite')

cc.Class({
    extends: cc.Component,

    properties: {
        idx: -1,        //对应玩家IDX,不是数组的IDX!
        duel: null,     //游戏管理
        handCardSpriteArray: [], //手牌图片数组
        monsterSpriteArray:  [], //随从图片数组
        
        //------------------------模板------------------------------------------
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        monsterPrefab: {
            default: null,
            type: cc.Prefab
        },
        
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
        
        //名字
        heroNameLabel: {
            default: null,
            type: cc.Label
        },
                
        //卡组牌数
        deckLabel: {
            default: null,
            type: cc.Label
        },

        //水晶
        criticalSpriteArray :[cc.Sprite],
    },
    
    init: function(duel) {
        this.idx = -1;
        this.duel = duel;
        for(var node of this.handCardSpriteArray)
            this.cardPool.put(node);

        this.handCardSpriteArray = [];
        
        for(var node1 of this.monsterSpriteArray)
            this.cardPool.put(node);

        this.monsterSpriteArray = [];
        
        //头像
        
        this.heroHpLabel.string = '0';  //HP
        this.heroNameLabel.string = ''; //名字
        this.deckLabel.string = '30';   //牌组剩余
        
        //水晶
        for(var criticalSprite of this.criticalSpriteArray)
            criticalSprite.setVisible(0);
    },
    
    //界面刷新
    refresh: function() {
        var player = this.duel.getPlayer(this.idx);
        if(!player)
            return;

        //水晶图片刷新
        var criticalSpriteArray = this.criticalSpriteArray;
        var i=0;
        var criticalNum = player.getCritical();
        var maxCriticalNum = player.getMaxCritical();
        
        for(; i<criticalNum; ++i)
        {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(0,255,0);
        }
        for(;i<maxCriticalNum; ++i)
        {
            criticalSpriteArray[i].setVisible(1);
            criticalSpriteArray[i].node.color = new cc.Color(255,0,0);
        }
        for(;i<criticalSpriteArray.length; ++i)
        {
            criticalSpriteArray[i].setVisible(0);
        }
    
        this.heroHpLabel.string     = player.getHp().toString();  
        this.heroNameLabel.string   = player.getHeroName();
        this.deckLabel.string       = player.getDeckNum().toString();
    },
    
    //创建手牌图片
    createCardSprite: function(card) {
        var cardSprite;
        if(this.cardPool.size() > 0)
            cardSprite = this.cardPool.get(this);
        else
            cardSprite = cc.instantiate(this.cardPrefab);
        
        this.handFiledLayout.node.addChild(cardSprite);
        this.handCardSpriteArray.push(cardSprite);
        this.refreshCardSprite(); //刷新手牌图片
    },
    
    //删除手牌图片
    deleteCardSprite: function(idx) {
        var cardSprite = this.handCardSpriteArray[idx];
        this.cardPool.put(cardSprite);
        this.handCardSpriteArray.splice(idx, 1);
        this.refreshCardSprite(); //刷新手牌图片
    },
    
    //创建随从图片
    createMonsterSprite: function(monster) {
        //创建随从图片资源
        var monsterSprite;
        if(this.monsterPool.size() > 0)
            monsterSprite = this.monsterPool.get(this);
        else
            monsterSprite = cc.instantiate(this.monsterPrefab);
    
        this.monsterFieldLayout.addChild(monsterSprite);
        this.monsterSpriteArray.push(monsterSprite);
        this.refreshMonsterSprite(); //刷新随从区
    },
    
    //删除随从图片
    deleteMonsterSprite: function(idx) {
        var monsterSprite = this.monsterSpriteArray[idx];
        this.monsterPool.put(monsterSprite);
        this.monsterSpriteArray.splice(idx, 1);
        this.refreshMonsterSprite(); //刷新随从图片       
    },
    
    //----------------------------------------界面刷新-------------------------------------------------
    //手牌图片刷新
    refreshCardSprite: function() {
        var player = this.duel.getPlayer(this.idx);
        var handArray = player.handArray;
        var arrayLength = handArray.length;        
        var handCardSpriteArray = this.handCardSpriteArray;

        for(var i=0; i<arrayLength; ++i)
        {
            if(handCardSpriteArray[i])
            {
                handCardSpriteArray[i].getComponent('CardSprite').init(handArray[i], player, i);
                handCardSpriteArray[i].setPosition(90*i+handCardSpriteArray[i].getChildByName('sprite').width/2-this.handFiledLayout.node.width/2, 0);
            }
            else
            {
                cc.log('handCardSpriteArray is less than handArray! %d/%d',i,arrayLength);
                break;
            }
        }
    },
    
    //随从图片刷新
    refreshMonsterSprite: function() {
        var player = this.duel.getPlayer(this.idx);
        var fieldArray = player.fieldArray;
        var arrayLength = fieldArray.length;    
        var monsterSpriteArray = this.monsterSpriteArray;

        for(var i=0; i<arrayLength; ++i)
        {
            if(monsterSpriteArray[i])
            {
                monsterSpriteArray[i].getComponent('MonsterSprite').init(fieldArray[i], player, i);
                monsterSpriteArray[i].setPosition(110*i+monsterSpriteArray[i].width/2-this.monsterFieldLayout.width/2, 0);
                if(fieldArray[i].isAtked)
                    monsterSpriteArray[i].opacity = 100;
                else
                    monsterSpriteArray[i].opacity = 255;
            }
            else
            {
                cc.log('monsterSpriteArray is less than fieldArray! %d/%d',i,arrayLength);
                break;
            }
        }
    },
    
    setIdx: function(idx) { this.idx = idx;},
    getIdx: function() { return this.idx;},
    
    // use this for initialization
    onLoad: function () {
        this.cardPool = new cc.NodePool('card');
        this.monsterPool = new cc.NodePool('monster');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
