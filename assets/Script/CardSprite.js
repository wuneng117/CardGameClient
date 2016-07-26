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

    // use this for initialization
    onLoad: function () {

    },
    
    init: function(card) {
    
        this.hpLabel.string = card.hp.toString();
        this.criticalLabel.string = card.critical.toString();
        this.atklabel.string = card.atk.toString();
        this.nameLabel.string = card.cardName.toString();
    },
    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
