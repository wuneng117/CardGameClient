//登录界面默认脚本

//加载默认模块
require('type');        //全局枚举
require('GlobalFunc');  //全局函数
const GameConn = require('./NetWork/GameConn');

cc.Class({
    extends: cc.Component,

    properties: {
        //-----------------------控件-------------------------------------------
        account_Editbox : {
            default: null,
            type: cc.EditBox
        },  
        
        password_Editbox : {
            default: null,
            type: cc.EditBox
        }
    },
    
    // use this for initialization
    onLoad: function () {
        GameConn.init();    //连接初始化
        gCardDataManager = require('./data/CardDataManager');
        gCardDataManager.init();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    //登录按钮    
    login_BtnEvent: function(event) {
        var account = this.account_Editbox.string;
        if(account === '')
        {
            showTipLabel("账号不能为空", cc.Color.RED);
            return;
        }
        
        var password = this.password_Editbox.string;
        if(password === '')
        {
            showTipLabel("密码不能为空", cc.Color.RED);
            return;
        }
        
        cc.log("input account: %s, password: %s",account, password);
        if(GameConn.getState() == CLIENT_STATE_DISCONNECT)
        {
            GameConn.connectToServer();
            GameConn.setAccount(account, password);
        }
        else
            GameConn.login(account, password);
    },
});
