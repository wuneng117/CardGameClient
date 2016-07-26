const Card = require('card');
const CardDataManager = require('./data/CardDataManager')

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
        
        duel: null, //战斗管理
        hp: 30, //英雄生命值
        critical: 0,    //英雄当前水晶数
        maxCritical: 0, //英雄当前回合最大水晶数
        //handCard: 0,    
        deckArray: [],  //卡组数组（Card类型）
        handArray: [],  //手牌数组（Card类型）
        fieldArray: [], //场上随从数组（CardMonster类型）
        handCardSpriteArray: [], //手牌图片数组
        
        //-----------------------控件-------------------------------------------
        //手牌区
        handFiledLayout: {
            default: null,
            type: cc.Layout
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
    },
    
    init: function(duel) {
        this.duel = duel;
        this.hp = 30;
        this.critical = 0;
        this.maxCritical = 0;
        this.deckArray = [];
        this.handArray = [];
        this.fieldArray = [];
        for(var i=0; i<this.handCardSpriteArray.length(); ++i)
        {
            //this.handCardSpriteArray[i].removeFrom
        }
        
    },
    
    //根据牌池随机创建卡组
    createDeck: function(cardArray) {
        for(var i=0; i<30; ++i)
        {
            deckArray[i] = new Card();
            var randomKey = cardArray[Math.floor(Math.random()*cardArray.length)];
            var cardData = CardDataManager.cardMap[randomKey];
            deckArray[i].init(cardData);
        }
    },
    
    //水晶回复
    criticalRecover() {
        this.critical = this.maxCritical;
    },
    
    //水晶增加
    criticalPlus: function(num) {
        this.maxCritical += num;
        this.critical += num;
        if(this.maxCritical > 10)
            this.maxCritical = 10;
        if(this.critical > 10)
            this.critical = 10;
    },
    
    //创建卡牌图片
    createCardToHand: function(card) {
        var cardSprite = cc.instanceof(this.cardPrefab);
        this.handFiledLayout.addChild(cardSprite);
        this.handArray.push(card);
        this.handCardSpriteArray.push(cardSprite);
        this.refreshHandCard(); //刷新手牌图片
    },
  
    //抽牌
    drawDeck: function(num) {
        var deckArray = this.deckArray;
        
        if(deckArray.length > 0)
        {
            var card = deckArray.pop();
            createCardToHand(card);
        }
        else
        {
            --this.hp;
            this.heroHpLabel.string = this.hp.toString();
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
    
    //-----------------------界面刷新---------------------------------------
    //手牌图片刷新
    refreshHandCard: function() {
        var handArray = this.handArray;
        var handCardSpriteArray = this.handCardSpriteArray;
        var arrayLength = handArray.length();

        for(var i=0; i<arrayLength; ++i)
        {
            if(handCardSpriteArray[i])
            {
                handCardSpriteArray[i].getComponent('card').init(handArray[i]);
                handCardSpriteArray[i].setPosition(40*i+handCardSpriteArray[i].width/2-this.handFiledLayout.width/2, 0);
            }
            else
            {
                cc.log('handCardSpriteArray is less than handArray! %d/%d',i,arrayLength);
                break;
            }
        }
    },
    
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
