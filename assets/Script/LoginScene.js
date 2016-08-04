//登录界面默认脚本
require('type');
const GameConn = require('./NetWork/GameConn');

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
        GameConn.init();
        GameConn.connectToServer();
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
        
        cc.log("account: %s, password: %s",account, password);
        GameConn.login(account, password);
    },
    
});
