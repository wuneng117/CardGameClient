"use strict";
cc._RFpush(module, '280c3rsZJJKnZ9RqbALVwtK', 'HelloWorld');
// Script\HelloWorld.js

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

cc._RFpop();