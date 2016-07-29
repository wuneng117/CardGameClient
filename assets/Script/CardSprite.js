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
        
        srcPos: {
            default:{}
        },
        
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
            cc.log('srcX:%d', this.srcPos.x);
            cc.log('ParsrcX:%d', this.node.position.x);
        }, this);
        
        this.node.on('touchmove', function(event) {
            if(!this.isTurnActive())
                return;
            
            var moveX = event.getLocationX() - event.getStartLocation().x;
            var moveY = event.getLocationY() - event.getStartLocation().y;
            this.node.setPosition(this.srcPos.x+moveX, this.srcPos.y+moveY);
            //cc.log('srcX:%d', this.srcPos.x);
            //cc.log('startX:%d',event.getStartLocation().x);
            //cc.log(moveX);
        }, this);
        
        this.node.on('touchend', function(event) {
            if(!this.isTurnActive())
                return;
            
            var boundBox = this._player.monsterFieldLayout.getBoundingBox();
            var pos = new cc.v2(this.node.x+this.node.parent.x, this.node.y+this.node.parent.y);
            if(!boundBox.contains(pos) || !this._player.summerMonster(this))
            {
                //cc.log('summer monster error!')
                this.node.setPosition(this.srcPos.x, this.srcPos.y);
            }
        }, this);
        
        
    },
    
    //是否激活
    isTurnActive: function() {
        return this._player._isTurnActive;
    },
    
    // use this for initialization
    onLoad: function () {
        this.srcPos = {'x':0,'y':0};

        this.setInputControl();
    },
    
    init: function(card, player, idx) {
    
        this.hpLabel.string = card.hp.toString();
        this.criticalLabel.string = card.critical.toString();
        this.atkLabel.string = card.atk.toString();
        this.nameLabel.string = card.cardName.toString();
        
        this._player = player;
        this._idx = idx;
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
