var LOGIN_ERROR_NOERROR = 0;
var LOGIN_ERROR_NOTFOUND = 1;
var LOGIN_ERROR_PASSWORD_ERROR = 2;

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
    },

    // use this for initialization
    onLoad: function () {

    },
    
    statics: {
        gameConn: null, //网络连接
        
        init: function(conn) {
            cc.log('EventProcess 初始化');
            this.gameConn = conn;
            
            //注册消息处理函数
            this.gameConn.registerHandler('disconnect', this.disconnect.bind(this));
            this.gameConn.registerHandler(WC_CONNECTED, this[WC_CONNECTED].bind(this));
            this.gameConn.registerHandler(WC_LOGIN, this[WC_LOGIN].bind(this));
            
        },
        
        //服务器断开连接
        disconnect: function() {
            this.gameConn.disconnect();
        },
        
        //连接响应
        WC_CONNECTED: function(param) {
            this.gameConn.connectSuccess(param.idx);
            cc.log('收到服务器连接响应，clientid: %d, name: %s', param.idx, param.name);
            //var gameConn = this.gameConn;
            //var socket = gameConn.socket;
            
            //gameConn.clientId = idx;
            
           
        },
        
        //登录响应
        WC_LOGIN: function(param) {
            if(param.error == LOGIN_ERROR_NOERROR)
            {
                this.gameConn.loginSuccess(param.account);
                cc.log("登录成功,error:%d", param.error);
            }
            else if(param.error == LOGIN_ERROR_PASSWORD_ERROR)
            {
                showTipLabel('登录失败，密码错误');
            }
            else if(param.error == LOGIN_ERROR_NOTFOUND)
            {
                showTipLabel('登录失败，账号不存在');
            }
            else
            {
                showTipLabel('登录失败，未知错误');
            }
        },
        
    },
    

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
