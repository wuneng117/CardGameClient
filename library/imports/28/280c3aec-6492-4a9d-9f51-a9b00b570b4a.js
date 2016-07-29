var CardDataManager = require('./data/CardDataManager');

cc.Class({
    'extends': cc.Component,

    properties: {},

    // use this for initialization
    onLoad: function onLoad() {
        CardDataManager.init();
    },

    // called every frame
    update: function update(dt) {}
});