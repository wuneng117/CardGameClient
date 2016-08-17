//-----------------------------------------全局函数----------------------------------------------
//中间文字提示
window.showTipLabel = function showTipLabel(str, color) 
{
    //文字标签创建
    var node = new cc.Node();
    var label = node.addComponent(cc.Label);
    if(color)
        node.color = color;
    
    //节点添加在场景默认Canvas根节点中心
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
