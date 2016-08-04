window.PLAYER_SELF = 1;
window.PLAYER_OPPONENT = 2;
window.PHASE_BEGIN_TURN = 1;
window.PHASE_MAIN_TURN = 2;
window.PHASE_END_TURN = 3;

window.WC_CONNECTED = 'WC_CONNECTED';
window.CW_LOGIN = 'CW_LOGIN';
window.WC_LOGIN = 'WC_LOGIN';

window.showTipLabel = function showTipLabel(str, color) {
    //文字标签创建
    var node = new cc.Node();
    var label = node.addComponent(cc.Label);
    if (color) node.color = color;

    label.string = str;
    node.setPosition(0, 0);
    var scene = cc.director.getScene().getChildByName('Canvas');
    scene.addChild(node);

    //2秒后消失
    var fadeout = cc.fadeOut(2);
    var callFunc = cc.callFunc(function (node) {
        cc.log('node is what:%s', node.x);
        node.destroy();
    }, node, null);

    var seq = cc.sequence(fadeout, callFunc);
    node.runAction(seq);
};