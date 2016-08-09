//回合阶段
window.PHASE_NULL = 0;
window.PHASE_BEGIN_TURN = 1;
window.PHASE_MAIN_TURN = 2;
window.PHASE_END_TURN = 3;

//客户端与服务端通信函数

//登录
window.WC_CONNECTED = 'WC_CONNECTED';           //服务端向客户端发送连接响应
window.CW_LOGIN_REQUEST = 'CW_LOGIN_REQUEST';   //客户端向服务端发送登录请求
window.WC_LOGIN_RESPONSE = 'WC_LOGIN_RESPONSE'; //服务端向客户端发送登录响应
window.CW_ENTERROOM_REQUEST = 'CW_ENTERROOM_REQUEST';   //客户端向服务端发送进入房间请求
window.WC_ENTERROOM_RESPONSE = 'WC_ENTERROOM_RESPONSE'; //服务端向客户端发送进入房间响应

//聊天
window.CW_CHAT_ADD_REQUEST = 'CW_CHAT_ADD_REQUEST';     //客户端向服务端发送聊天信息请求
window.WC_CHAT_ADD_RESPONSE = 'WC_CHAT_ADD_RESPONSE';   //服务端向客户端发送聊天信息响应
window.WC_CHAT_ADD = 'WC_CHAT_ADD';                     //服务端向客户端发送聊天信息

//Player
window.WC_PLAYER_ADD = 'WC_PLAYER_ADD';   //服务端向客户端发送PLAYER添加(自己)
window.WC_PLAYER_ADD_OTHER = 'WC_PLAYER_ADD_OTHER';   //服务端向客户端发送PLAYER添加(别人)
window.WC_PLAYER_UPDATE = 'WC_PLAYER_UPDATE';   //服务端向客户端发送PLAYER更新

//房间
window.CW_DUELREADY_REQUEST = 'CW_DUELREADY_REQUEST';   //客户端向服务端发送准备开始游戏请求
window.WC_DUELREADY_RESPONSE = 'WC_DUELREADY_RESPONSE';   //服务端向客户端发送准备开始游戏响应
window.WC_DUELREADY = 'WC_DUELREADY';   //服务端给客户端发送用户准备
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
