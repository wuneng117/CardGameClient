//处理对战流程的关键类

const Player = require('player');

var tempDeck = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L'];
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
        
        cardPrefab: {
            default: null,
            type: cc.Prefab
        },

        //自己
        localPlayer: {
            default: null,
            type: Player
        },
        
        //对手
        opponentPlayer: {
            default: null,
            type: Player
        },

        turn: 0,    //当前双方总回合数
        turnPhase: 0,   //行动状态
        
        //状态相关
        enterTurnFunc: {
            default: []
        },
        
        turnFunc: {
            default: []
        },
        
        leaveTurnFunc: {
            default: []
        },
    },
    
    setInputControl: function() {
        var self = this;
        this.node.on('touchstart', function(event) {
            cc.log('1231312321313213123');
            cc.log(event.getLocationX());
        }, this);

    },
    
    //开始游戏
    startGame: function() {
        //玩家初始化
        this.localPlayer.init(this);
        this.opponentPlayer.init(this);
        
        //根据牌池生成卡组
        this.localPlayer.createDeck(tempDeck);
        this.opponentPlayer.createDeck(tempDeck);
        
        //初始化对手player,
        this.localPlayer._opponentPlayer = this.opponentPlayer;
        this.opponentPlayer._opponentPlayer = this.localPlayer;
        
        var isFirstPlayer = true;   //先手后手
        
        if(isFirstPlayer)
        {
            this.turnPlayer = this.localPlayer;
            this.turnOpponent = this.opponentPlayer;
        }
        else
        {
            this.turnPlayer = this.opponentPlayer;
            this.turnOpponent = this.localPlayer;            
        }
        
        this.turn = 1;
        
        this.turnPlayer.drawDeck(3);
        this.turnOpponent.drawDeck(3);
        this.changePhase(PHASE_BEGIN_TURN);
        
       //showTipLabel('开始游戏');
    },
    
    //交换行动
    turnPlayerChange: function() {
        //cc.log('turnPlayerChange, turnPlayer:%s, turnOpponent:%s', this.turnPlayer.heroName, this.turnOpponent.heroName);
        var tempPlayer = this.turnPlayer;
        //cc.log('tempPlayerName:%s', tempPlayer.heroName);
        this.turnPlayer = this.turnOpponent;
        //cc.log('turnPlayer:%s', this.turnPlayer.heroName);

        this.turnOpponent = tempPlayer;
        //cc.log('turnopponent:%s', this.turnOpponent.heroName);

    },
    
    //随从攻击玩家
    monsterAtkPlayer: function(monster, player) {
        if(!monster || monster.atk <= 0 || monster.isAtked === true)
            return;
                
        monster.isAtked = true;
        player.reduceHp(monster.atk);
        player.refreshMonsterField();
        
        showTipLabel(monster._player.heroName + '的' + monster.cardName + ' 攻击了玩家 ' + player.heroName);

        this.checkWin();
    },
    
    //随从攻击随从
    monsterAtkMonster: function(src, dest) {
        if(!src || !dest || src.atk <= 0 || src.isAtked === true)
            return;
    
        src.isAtked = true;
        var damage = src.atk;
        dest.reduceHp(damage);
        
        damage = dest.atk;
        src.reduceHp(damage);
        
        showTipLabel(src._player.heroName + '的' + src.cardName + ' 攻击了 ' + dest._player.heroName + '的' + dest.cardName, cc.Color.RED);
    },
    
    //判断输赢
    checkWin: function() {
        if(this.turnPlayer.hp <= 0 && this.turnOpponent.hp <= 0)
        {
            showTipLabel("平局");
        }
        else if(this.turnPlayer.hp <= 0)
        {
            showTipLabel("%s 胜利", this.opponentPlayer.heroName);
        }
        else if(this.turnOpponent.hp <= 0)
        {
            showTipLabel("% 胜利", this.turnPlayer.heroName);
        }
    },
    
    //回合结束（按钮调用）
    turnEnd: function() {
        //不是MainPhase这个按钮不能按
        if(this.turnPhase !== PHASE_MAIN_TURN)
            return;
            
        this.changePhase(PHASE_END_TURN);
    },
  
    enterBeginTurn: function() {
        cc.log('is enter BeginTurn?');
        ++this.turn;
        this.turnPlayerChange();
        
        showTipLabel(this.turnPlayer.heroName + '的回合');
        this.turnPlayer.setTurnActive(true);    //可以行动
        this.turnPlayer.criticalPlus(1);        //增加水晶
        this.turnPlayer.criticalRecover();      //回复水晶
        this.turnPlayer.awakenMonster();        //重置随从攻击次数
        this.turnPlayer.drawDeck(1);            //抽1张卡
        
    },
    
    beginTurn: function(){
        //进入主流程
        
        this.changePhase(PHASE_MAIN_TURN);
    },
    
    leaveBeginTurn: function() {

    },
    
    enterMainTurn: function() {
        
    },
    
    mainTurn: function(){
        
    },
    
    leaveMainTurn: function() {
        
    },
    
    enterEndTurn: function() {
        
    },
    
    endTurn: function(){
        this.changePhase(PHASE_BEGIN_TURN);
    },
    
    leaveEndTurn: function() {
        
        this.turnPlayer.setTurnActive(false);
    },
        
    changePhase: function(nextTurnType) {
        if(this.turnPhase !== 0)
        {
            this.leaveTurnFunc[this.turnPhase]();
        }
        
        this.enterTurnFunc[nextTurnType]();
        this.turnPhase = nextTurnType;
    },
    
    // use this for initialization
    onLoad: function () {
        //this.setInputControl();
        //
        this.enterTurnFunc[PHASE_BEGIN_TURN] = this.enterBeginTurn.bind(this);
        this.enterTurnFunc[PHASE_MAIN_TURN] = this.enterMainTurn.bind(this);
        this.enterTurnFunc[PHASE_END_TURN] = this.enterEndTurn.bind(this);

        this.turnFunc[PHASE_BEGIN_TURN] = this.beginTurn.bind(this);
        this.turnFunc[PHASE_MAIN_TURN] = this.mainTurn.bind(this);
        this.turnFunc[PHASE_END_TURN] = this.endTurn.bind(this);
        
        this.leaveTurnFunc[PHASE_BEGIN_TURN] = this.leaveBeginTurn.bind(this);
        this.leaveTurnFunc[PHASE_MAIN_TURN] = this.leaveMainTurn.bind(this);
        this.leaveTurnFunc[PHASE_END_TURN] = this.leaveEndTurn.bind(this);
        

    },

    start: function() {
        this.startGame();
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.turnFunc[this.turnPhase]();
    },
});
