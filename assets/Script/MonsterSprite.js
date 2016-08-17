cc.Class({
    extends: cc.Component,

    properties: {
        //
        srcPos: null,   //node的pos
        player: null,   //Player引用
        idx: -1,        //数组索引
        
        //-----------------------控件-------------------------------------
        hpLabel: {
            default: null,
            type: cc.Label
        },
        
        atkLabel: {
            default: null,
            type: cc.Label
        },
        
        nameLabel: {
            default: null,
            type: cc.Label
        },
    },

    //触摸回调
    setInputControl: function() {
        this.node.on('touchstart', function(event) {
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            this.srcPos.x = this.node.x;
            this.srcPos.y = this.node.y;
        }, this);
        
        this.node.on('touchmove', function(event) {
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x+moveX, this.srcPos.y+moveY);
        }, this);
        
        this.node.on('touchend', function(event) {
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            var player = this.player;
            var duel = player.getDuel();
            var playerSprite = duel.getPlayerSprite(0);
            var opponentPlayerSprite = duel.getPlayerSprite(1);
            var boundBox, pos, oppoAddX, oppoAddY;
            
            //判断是否移动到对方英雄上
            boundBox = opponentPlayerSprite.heroIconSprite.node.getBoundingBox();
            oppoAddX = playerSprite.monsterFieldLayout.x + playerSprite.node.x - opponentPlayerSprite.node.x;
            oppoAddY = playerSprite.monsterFieldLayout.y + playerSprite.node.y - opponentPlayerSprite.node.y;
            pos = new cc.v2(this.node.x+oppoAddX, this.node.y+oppoAddY);
            if(boundBox.contains(pos))
            {
                duel.monsterAtkPlayer(this.idx, opponentPlayerSprite.getIdx());    //攻击玩家
                this.node.setPosition(this.srcPos.x, this.srcPos.y);                    
                return;
            }
            
            //判断是否移动到对方随从上
            var monsterSpriteArray = opponentPlayerSprite.monsterSpriteArray;
            oppoAddX = playerSprite.monsterFieldLayout.x + playerSprite.node.x - opponentPlayerSprite.node.x - opponentPlayerSprite.monsterFieldLayout.x;
            oppoAddY = playerSprite.monsterFieldLayout.y + playerSprite.node.y - opponentPlayerSprite.node.y - opponentPlayerSprite.monsterFieldLayout.y;
            for(var i=0; i<monsterSpriteArray.length; ++i)
            {
                boundBox = monsterSpriteArray[i].getBoundingBox();
                pos = new cc.v2(this.node.x+oppoAddX, this.node.y+oppoAddY);
                if(boundBox.contains(pos))
                {
                    duel.monsterAtkMonster(this.idx, opponentPlayerSprite.getIdx(), i); //攻击对方随从
                    this.node.setPosition(this.srcPos.x, this.srcPos.y);                    
                    return;
                }
            }
            
            //什么都没做，复位
            this.node.setPosition(this.srcPos.x, this.srcPos.y);                    
        }, this);
        
        
    },
    
    //是否激活
    isTurnActive: function() { return this.player.getIsTurnActive(); },
    
    //本回合是否攻击过
    isAtked: function() {
        var monster = this.player.fieldArray[this.idx];
        return monster.isAtked;
    },
    
    // use this for initialization
    onLoad: function () {
        this.srcPos = {'x':0,'y':0};

        this.setInputControl();
    },
    
    init: function(monster, player, idx) {
        this.hpLabel.string   = monster.hp.toString();
        this.atkLabel.string  = monster.atk.toString();
        this.nameLabel.string = monster.cardName.toString();
        
        this.player = player;
        this.idx = idx;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
