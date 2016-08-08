const Card = require('card');
const Monster = require('monster');
const CardDataManager = require('./data/CardDataManager');

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
        
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        monsterPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        duel: null, //战斗管理
        //_opponentPlayer: null,  //对手player
        _isTurnActive: false,    //是否可以行动
        
        heroName: '',   //玩家名字
        hp: 30,         //英雄生命值
        critical: 0,    //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        //handCard: 0,    
        deckArray: [],  //卡组数组（Card类型）
        handArray: [],  //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（CardMonster类型）
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
        this.duel = duel;
        this.hp = 30;
        this.critical = 0;
        this.maxCritical = 0;
        this.deckArray = [];
        this.handArray = [];
        this.fieldArray = [];
        for(var i=0; i<this.handCardSpriteArray.length; ++i)
        {
            //this.handCardSpriteArray[i].destory();
            this.cardPool.put(this.handCardSpriteArray[i]);
        }
        
        this.refreshcriticalsprite();
        this.refreshHandCard();

    },
    
    //打包数据
    packData: function(data, flag)
    {
        data.flag = flag;
        data.idx = this.idx;
       
        if(flag & PLAYTER_UPDATE_ISTURNACTIVE)
            data.isTurnActive = this._isTurnActive;
        if(flag & PLAYTER_UPDATE_HP)
            data.hp = this.hp;
        if(flag & PLAYTER_UPDATE_CRITICAL)
            data.critical = this.critical;
        if(flag & PLAYTER_UPDATE_MAXCRITICAL)
            data.maxCritical = this.maxCritical;
    },
    
    //解开数据
    unPackData: function(data)
    {
        var flag = data.flag;
        
        if(flag & PLAYTER_UPDATE_ISTURNACTIVE)
            this._isTurnActive = data.isTurnActive;
        if(flag & PLAYTER_UPDATE_HP)
            this.hp = data.hp;
        if(flag & PLAYTER_UPDATE_CRITICAL)
            this.critical = data.critical;
        if(flag & PLAYTER_UPDATE_MAXCRITICAL)
            this.maxCritical = data.maxCritical;
    },
    
    //根据牌池随机创建卡组
    createDeck: function(cardArray) {
        var deckArray = this.deckArray;
        
        for(var i=0; i<30; ++i)
        {
            deckArray[i] = new Card();
            var randomKey = cardArray[Math.floor(Math.random()*cardArray.length)];
            var cardData = CardDataManager.cardMap[randomKey];
            deckArray[i].init(cardData, this, i);
        }
    },
    
    //设置是否可以行动
    setTurnActive: function(val) {
        this._isTurnActive = val;
    },
    
    //水晶回复
    criticalRecover() {
        this.critical = this.maxCritical;
        this.refreshcriticalsprite();   //刷新水晶图片
    },
    
    //水晶增加
    criticalPlus: function(num) {
        this.maxCritical += num;
        this.critical += num;
        if(this.maxCritical > 10)
            this.maxCritical = 10;
        if(this.critical > 10)
            this.critical = 10;
        this.refreshcriticalsprite();   //刷新水晶图片
    },
    
    //重置随从攻击次数
    awakenMonster:function() {
        var fieldArray = this.fieldArray;
        
        for(var i=0; i<fieldArray.length; ++i)
        {
            fieldArray[i].isAtked = false;
        }
        
        this.refreshMonsterField();
    },
    
    //扣除HP
    reduceHp: function(num) {
        if(num <= 0)
            return;
        
        this.hp -= num;
        this.refreshHpLabel();
    },
    
    //回复HP
    addHp: function(num) {
        if(num <= 0)
            return;
            
        this.hp+= num;
        if(this.hp > 30)
            this.hp = 30;
        
        this.refreshHpLabel();
    },
    
    //创建手牌
    createCardToHand: function(card) {
        //超过10张就爆炸
        if(this.handArray.length >= 10)
        {
            showTipLabel("手牌超出10张，抽的牌直接摧毁");
            return;
        }
            
        //改变序号，加入手牌数组
        card._idx = this.handArray.length;
        this.handArray.push(card);
        
        var cardSprite;
        if(this.cardPool.size() > 0)
        {
            cardSprite = this.cardPool.get(this);
        }
        else
        {
            cardSprite = cc.instantiate(this.cardPrefab);
        }
        
        this.handFiledLayout.node.addChild(cardSprite);
        this.handCardSpriteArray.push(cardSprite);
        this.refreshHandCard(); //刷新手牌图片
    },
  
    //抽牌
    drawDeck: function(num) {
        var deckArray = this.deckArray;
        
        if(deckArray.length > 0)
        {
            var card = deckArray.pop();
            this.deckLabel.string = deckArray.length.toString();
            this.createCardToHand(card);
        }
        else
        {
            this.reduceHp(1);
            showTipLabel(this.heroName + " 的牌库没牌了，抽1张少1HP");
        }
        
        if(num<=1)
        {
            this.duel.checkWin();
        }
        else
        {
            this.drawDeck(num-1);
        }
    },
    
    //召唤随从
    summerMonster: function(cardSprite) {
        //如果随从已满返回
        if(this.fieldArray.length > 7)
            return false;
            
        var idx = cardSprite._idx;
        var card = this.handArray[idx]; //获取卡牌对象
        if(card)
        {
            var critical = card.critical;
            //如果水晶不够返回
            if(critical > this.critical)
            {
                showTipLabel(this.heroName + " 只有 " + this.critical + ' 个水晶,不能召唤费用为' + critical + ' 的 ' + card.cardName + ' 到场上');
                return false;
            }
        
            this.critical -= critical;
            this.refreshcriticalsprite();
            
            //创建随从对象并加入随从数组
            var monster = new Monster();
            monster.init(card, this, this.fieldArray.length);
            this.fieldArray.push(monster);
            
            //创建随从图片资源
            var monsterSprite;
            if(this.monsterPool.size() > 0)
            {
                monsterSprite = this.monsterPool.get(this);
            }
            else
            {
                monsterSprite = cc.instantiate(this.monsterPrefab);
            }

            this.monsterFieldLayout.addChild(monsterSprite);
            this.monsterSpriteArray.push(monsterSprite);
            this.refreshMonsterField(); //刷新随从区
            //删除手牌
            this.cardPool.put(cardSprite.node);
            this.handArray.splice(idx,1);
            this.refreshArrayIdx(this.handArray);
            //cc.log('after summer monster, the handarray.length is %d',this.handArray.length);
            this.handCardSpriteArray.splice(idx,1);
            this.refreshHandCard();
            showTipLabel(this.heroName + " 从手牌召唤了1张 " + card.cardName + ' 到场上');

        }
        else
        {
            return false;            
        }
    },
    
    //干掉随从
    killMonster: function(monster) {
        cc.log('monsterSpriteArray:%s', this.monsterSpriteArray.length)
        cc.log('fieldArray:%s', this.monsterSpriteArray.length)
        cc.log('_idx:%s', monster._idx)
        var idx = monster._idx;
        var monsterSprite = this.monsterSpriteArray[idx];
        
        this.monsterPool.put(monsterSprite);
        this.fieldArray.splice(idx,1);
        this.refreshArrayIdx(this.fieldArray);
        this.monsterSpriteArray.splice(idx,1);
        cc.log('monsterSpriteArray:%s', this.monsterSpriteArray.length)
        cc.log('fieldArray:%s', this.fieldArray.length)
        this.refreshMonsterField();
    },
    
    //数组变动后需要刷新idx
    refreshArrayIdx: function(array) {
        for(var i=0; i<array.length; ++i)
        {
            array[i].refreshIdx(i);
        }
    },
    
    //-----------------------界面刷新---------------------------------------
    //手牌图片刷新
    refreshHandCard: function() {
        var handArray = this.handArray;
        var handCardSpriteArray = this.handCardSpriteArray;
        var arrayLength = handArray.length;

        for(var i=0; i<arrayLength; ++i)
        {
            if(handCardSpriteArray[i])
            {
                handCardSpriteArray[i].getComponent('CardSprite').init(handArray[i], this, i);
                handCardSpriteArray[i].setPosition(90*i+handCardSpriteArray[i].getChildByName('sprite').width/2-this.handFiledLayout.node.width/2, 0);
                //cc.log(handCardSpriteArray[i].getChildByName('sprite').width);
                //cc.log(this.handFiledLayout.node.width);
                //handCardSpriteArray[i].setPosition(0,0);
                
            }
            else
            {
                cc.log('handCardSpriteArray is less than handArray! %d/%d',i,arrayLength);
                break;
            }
        }
    },
    
    //随从图片刷新
    refreshMonsterField: function() {
        var fieldArray = this.fieldArray;
        var monsterSpriteArray = this.monsterSpriteArray;
        var arrayLength = fieldArray.length;

        for(var i=0; i<arrayLength; ++i)
        {
            if(monsterSpriteArray[i])
            {
                monsterSpriteArray[i].getComponent('MonsterSprite').init(fieldArray[i], this, i);
                monsterSpriteArray[i].setPosition(110*i+monsterSpriteArray[i].width/2-this.monsterFieldLayout.width/2, 0);
                //cc.log(monsterSpriteArray[i].width);
                //cc.log(this.monsterFieldLayout.node.width);
                //monsterSpriteArray[i].setPosition(0,0);
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
    
    //水晶图片刷新
    refreshcriticalsprite: function() {
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
    },
    
    refreshHpLabel: function() {
        this.heroHpLabel.string = this.hp.toString();  
    },
    
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
