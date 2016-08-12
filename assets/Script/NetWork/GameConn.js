//网络连接单例
const EventProcess = require('EventProcess');

var CLIENT_STATE_DISCONNECT = -1;
var CLIENT_STATE_GUIDE = 0;
var CLIENT_STATE_LOGININ = 1;
var CLIENT_STATE_DISBAND = 2;


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
    
    //account结构
    //function Account(account, password){
    //    this.account = account;
    //    this.password = password;
    //}

    statics: {
        socket : null, //socket.io连接
        clientId : -1,  //连接编号
        account: null,  //服务器传回来的账号信息
        state: CLIENT_STATE_DISCONNECT,  //账号状态
        
        //初始化SOCKETIO
        init: function() {
            if(cc.sys.isNative) {
                window.io = SocketIO;
            }
            else {
                window.io = require('socket.io');
            }
        },
        
        //为EventPRocess设置duel
        setDuel: function(duel) {
            EventProcess.setDuel(duel);    
        },
        
        //连接服务器
        connectToServer: function() {
            if(this.socket || this.state !== CLIENT_STATE_DISCONNECT)
            {
                cc.log('已经与服务器建立连接，不要重复连接');
                return;
            }
            
            this.socket = window.io('http://localhost:3000');
            EventProcess.init(this);
        },
        
        //服务器连接成功
        connectSuccess: function(idx) {
            this.setClientId(idx);
            this.state = CLIENT_STATE_GUIDE;
        },
                
        //账号登录
        login: function(account, password) {
            if(!this.socket || this.state === CLIENT_STATE_DISCONNECT)
            {
                cc.log("服务器根本没有连上……无法登录");
                return;
            }
            
            if(this.state === CLIENT_STATE_LOGININ)
            {
                cc.log('已经登录账号，请不要重复登录');
                return;
            }
            
            if(this.state === CLIENT_STATE_DISBAND)
            {
                cc.log('您已被服务器ban,无法登录');
                return;
            }
            
            cc.log("准备账号登录，账号为：%s, 密码：%s", account, password);
            this.socket.emit(CW_LOGIN_REQUEST, {'AccountName': account, 'password': password});
        },
        
        //登录成功
        loginSuccess: function(account) {
            this.account = account;
            this.state = CLIENT_STATE_LOGININ;
        },
        
        //给客户端发送消息
        sendPacket: function(msgID, param) {
            this.socket.emit(msgID, param);
        },
        
        //注册服务器事件函数
        registerHandler: function(msgID, func) {
            this.socket.on(msgID, func);
        },
        
        //服务器断开连接事件
        disconnect: function() {
            console.log('server disconnected, my idx:', this.clientId);
            
            //初始化
            //this.socket = null;
            this.clientId = -1;
            this.account = null;
            this.state = CLIENT_STATE_DISCONNECT;
            
            //如果在战斗中，进行一些其他处理
        },

        //设置clientId
        setClientId: function(idx) {
            this.clientId = idx;  
        },
        
        //获取账号名字
        getAccountName: function() {
            if(this.account)
                return this.account.account;
            else
                return null;
        },

        
    },
    
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
