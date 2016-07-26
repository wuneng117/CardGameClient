
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
        cardName: "",
        critical:0,
        atk:0,
        hp:0,
    },

    // use this for initialization
    onLoad: function () {
    },
    
    init: function(cardData){
        this.critical = cardData.critical;
        this.cardName = cardData.cardName;
        this.atk = cardData.atk;
        this.hp = cardData.hp;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
