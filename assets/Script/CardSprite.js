cc.Class({
    extends: cc.Component,

    properties: {
        srcPos: null,  //node的pos    
        player: null,  //Player引用
        idx: 0,        //数组索引
        
        //-----------------------控件-------------------------------------
        hpLabel: {
            default: null,
            type: cc.Label
        },
        
        criticalLabel: {
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
            if(!this.isTurnActive())
                return;
                
            this.srcPos.x = this.node.x;
            this.srcPos.y = this.node.y;
        }, this);
        
        this.node.on('touchmove', function(event) {
            if(!this.isTurnActive())
                return;
            
            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x+moveX, this.srcPos.y+moveY);
        }, this);
        
        this.node.on('touchend', function(event) {
            if(!this.isTurnActive())
                return;
            
            var duel = this.player.getDuel();
            var playerSprite = duel.getPlayerSprite(0);
            var boundBox = playerSprite.monsterFieldLayout.getBoundingBox();
            var pos = new cc.v2(this.node.x+this.node.parent.x, this.node.y+this.node.parent.y);
            if(boundBox.contains(pos))
                this.player.summonMonster(this.idx);
            
            this.node.setPosition(this.srcPos.x, this.srcPos.y);
        }, this); 
    },
    
    //是否激活
    isTurnActive: function() { return this.player.getIsTurnActive(); },
    
    // use this for initialization
    onLoad: function () {
        this.srcPos = {'x':0,'y':0};

        this.setInputControl();
    },
    
    init: function(card, player, idx) {
        if(card.isHide)
        {
            this.hpLabel.string = '??';
            this.criticalLabel.string = '??';
            this.atkLabel.string  = '??';
            this.nameLabel.string = '??';
        }
        else
        {
            this.hpLabel.string = card.hp.toString();
            this.criticalLabel.string = card.critical.toString();
            this.atkLabel.string  = card.atk.toString();
            this.nameLabel.string = card.cardName.toString();
        }
        
        this.player = player;
        this.idx = idx;
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
