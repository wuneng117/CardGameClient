//回合阶段
window.PHASE_NULL = 0;
window.PHASE_BEGIN_TURN = 1;
window.PHASE_MAIN_TURN = 2;
window.PHASE_END_TURN = 3;

//客户端与服务端通信函数
window.WC_CONNECTED = 'WC_CONNECTED';
window.CW_LOGIN_REQUEST = 'CW_LOGIN_REQUEST';
window.WC_LOGIN_RESPONSE = 'WC_LOGIN_RESPONSE';
window.CW_ENTERROOM_REQUEST = 'CW_ENTERROOM_REQUEST';
window.WC_ENTERROOM_RESPONSE = 'WC_ENTERROOM_RESPONSE';
window.CW_CHAT_ADD_REQUEST = 'CW_CHAT_ADD_REQUEST';
window.WC_CHAT_ADD_RESPONSE = 'WC_CHAT_ADD_RESPONSE';

window.showTipLabel = function showTipLabel(str, color) 
{
    //文字标签创建
    var node = new cc.Node();
    var label = node.addComponent(cc.Label);
    if(color)
        node.color = color;
        
    label.string = str;
    node.setPosition(0,0);
    var scene = cc.director.getScene().getChildByName('Canvas');
    scene.addChild(node);
    
    //2秒后消失
    var fadeout = cc.fadeOut(2);
    var callFunc = cc.callFunc(function(node) {
        cc.log('node is what:%s', node.x);
        node.destroy();
    }, node, null)
    
    var seq = cc.sequence(fadeout, callFunc);
    node.runAction(seq);
}
