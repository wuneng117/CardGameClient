const CardDataManager = require('./data/CardDataManager');

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        CardDataManager.init();
    },

    // called every frame
    update: function (dt) {

    },
});
