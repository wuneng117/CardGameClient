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
        srcPos: {
            default: {}
        },
        
        _player: null,  //Player引用
        _idx: 0,        //数组索引
        
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

    setInputControl: function() {
        this.node.on('touchstart', function(event) {
            cc.log(this.isAtked());
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            this.srcPos.x = this.node.x;
            this.srcPos.y = this.node.y;
            //cc.log('srcX:%d', this.srcPos.x);
        }, this);
        
        this.node.on('touchmove', function(event) {
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x+moveX, this.srcPos.y+moveY);
            //cc.log('srcX:%d', this.srcPos.x);
            //cc.log('startX:%d',event.getStartLocation().x);
            //cc.log(moveX);
        }, this);
        
        this.node.on('touchend', function(event) {
            if(!this.isTurnActive() || this.isAtked())
                return;
            
            var player = this._player;
            var duel = player.duel;
            var opponentPlayer = this.getPlayerSprite(1);
            //var opponentPlayer = player;
            var boundBox, pos, oppoAddX, oppoAddY;
            
            //判断是否移动到对方英雄上
            boundBox = opponentPlayer.heroIconSprite.node.getBoundingBox();
            oppoAddY = player.monsterFieldLayout.x + player.node.x - opponentPlayer.node.x;
            oppoAddY = player.monsterFieldLayout.y + player.node.y - opponentPlayer.node.y;
            pos = new cc.v2(this.node.x+oppoAddX, this.node.y+oppoAddY);
            if(boundBox.contains(pos))
            {
                duel.monsterAtkPlayer(this._idx, opponentPlayer.getIdx());    //攻击玩家
                this.resetPosToSrc();
                return;
            }
            
            //判断是否移动到对方随从上
            var monsterSpriteArray = opponentPlayer.monsterSpriteArray;
            oppoAddX = player.monsterFieldLayout.x + player.node.x - opponentPlayer.node.x - opponentPlayer.monsterFieldLayout.x;
            oppoAddY = player.monsterFieldLayout.y + player.node.y - opponentPlayer.node.y - opponentPlayer.monsterFieldLayout.y;
            //cc.log('opponentPlayer.monsterSpriteArray.length:%d', monsterSpriteArray.length);
            for(var i=0; i<monsterSpriteArray.length; ++i)
            {
                boundBox = monsterSpriteArray[i].getBoundingBox();
                pos = new cc.v2(this.node.x+oppoAddX, this.node.y+oppoAddY);
                if(boundBox.contains(pos))
                {
                    duel.monsterAtkMonster(this._idx, opponentPlayer.getIdx(), i); //攻击对方随从
                    this.resetPosToSrc();
                    return;
                }
            }
            
            //什么都没做，复位
            this.resetPosToSrc();
        }, this);
        
        
    },
    
    //是否激活
    isTurnActive: function() { return this._player.isTurnActive; },
    
    //本回合是否攻击过
    isAtked: function() {
        var monster = this._player.fieldArray[this._idx];
        return monster.isAtked;
    },
    
    resetPosToSrc: function() {
        this.node.setPosition(this.srcPos.x, this.srcPos.y);
    },
    
    // use this for initialization
    onLoad: function () {
        this.srcPos = {'x':0,'y':0};

        this.setInputControl();
    },
    
    init: function(monster, player, idx) {
    
        this.hpLabel.string = monster.hp.toString();
        this.atkLabel.string = monster.atk.toString();
        this.nameLabel.string = monster.cardName.toString();
        
        this._player = player;
        this._idx = idx;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
