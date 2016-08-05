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
        
        chatIStrMap: [],    //保存聊天字符串数组
        
        //------------------------------控件------------------------------------
        
        //滚动区域的content 节点
        content: {
            default: null,
            type: cc.Node
        },
        
        //聊天信息 节点
        itemPrefab: {
            default: null,
            type: cc.Prefab
        },
        
        //ScrollView
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    addChatItem: function(str, color) {
        var content = this.content;
        
        var chatItem = cc.instantiate(this.itemPrefab);
        if(!chatItem)
            return;
        
        var strLabel = chatItem.getChildByName('str');
        if(!strLabel)
            return;
        
        //添加ITEM
        chatItem.setPosition(-content.width/2+5, -content.height);
        content.addChild(chatItem);
        //cc.log('content height: %d', content.height);
        strLabel.getComponent('cc.Label').string = str;  //写字
        if(color)
            strLabel.color = color;
        
        //调整大小，刷新到最下面一页
        content.setContentSize(content.width, content.height+strLabel.height);
        //cc.log('content height: %d, strLabel position: %d', content.height, chatItem.getPositionY());
        if(content.height > 200)
            this.scrollView.scrollToBottom();
    }
});
