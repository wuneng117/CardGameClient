//回合阶段
window.PHASE_NULL = 0;
window.PHASE_BEGIN_TURN = 1;
window.PHASE_MAIN_TURN = 2;
window.PHASE_END_TURN = 3;

window.gCardDataManager = null;     //卡牌DATA管理

//Player更新标志
window.PLAYER_UPDATE_ISTURNACTIVE   = 1;
window.PLAYER_UPDATE_HP             = 1<<1;
window.PLAYER_UPDATE_CRITICAL       = 1<<2;
window.PLAYER_UPDATE_MAXCRITICAL    = 1<<3;
window.PLAYER_UPDATE_ISREADY        = 1<<4;
window.PLAYER_UPDATE_DECKNUM        = 1<<5;
window.PLAYER_UPDATE_TEAMCOLOR      = 1<<6;

//Card更新标志
window.CARD_UPDATE_CARDNAME = 1<<1;
window.CARD_UPDATE_CRITICAL = 1<<2;
window.CARD_UPDATE_ATK      = 1<<3;
window.CARD_UPDATE_HP       = 1<<4;

//Monster更新标志
window.MONSTER_UPDATE_CARDNAME  = 1<<1;
window.MONSTER_UPDATE_CRITICAL  = 1<<2;
window.MONSTER_UPDATE_ATK       = 1<<3;
window.MONSTER_UPDATE_HP        = 1<<4;
window.MONSTER_UPDATE_MAXHP     = 1<<5;
window.MONSTER_UPDATE_ISATKED   = 1<<6;

//-------------------------------客户端与服务端通信函数----------------------------------------

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
window.WC_PLAYER_ADD = 'WC_PLAYER_ADD';                 //服务端向客户端发送PLAYER添加(自己)
window.WC_PLAYER_ADD_OTHER = 'WC_PLAYER_ADD_OTHER';     //服务端向客户端发送PLAYER添加(别人)
window.WC_PLAYER_UPDATE = 'WC_PLAYER_UPDATE';           //服务端向客户端发送PLAYER更新

//房间
window.CW_DUELREADY_REQUEST = 'CW_DUELREADY_REQUEST';       //客户端向服务端发送准备开始游戏请求
window.WC_DUELREADY_RESPONSE = 'WC_DUELREADY_RESPONSE';     //服务端向客户端发送准备开始游戏响应
window.WC_DUELREADY = 'WC_DUELREADY';   //服务端给客户端发送用户准备

//手牌
window.WC_HANDCARD_UPDATE = 'WC_HANDCARD_UPDATE';    //手牌更新
window.WC_HANDCARD_CREATE = 'WC_HANDCARD_CREATE';    //手牌创建
window.WC_HANDCARD_DELETE = 'WC_HANDCARD_DELETE';    //手牌删除

//随从
window.CW_MONSTER_SUMMON_REQUEST = 'CW_MONSTER_SUMMON_REQUEST';        //客户端向服务端发送召唤随从请求
window.WC_MONSTER_SUMMON_RESPONSE = 'WC_MONSTER_SUMMON_RESPONSE';      //服务端向客户端发送召唤随从响应
window.CW_MONSTER_ATTACKMONSTER_REQUEST = 'CW_MONSTER_ATTACKMONSTER_REQUEST';        //客户端向服务端发送随从攻击随从请求
window.WC_MONSTER_ATTACKMONSTER_RESPONSE = 'WC_MONSTER_ATTACKMONSTER_RESPONSE';      //服务端向客户端发送随从攻击随从响应
window.CW_MONSTER_ATTACKPLAYER_REQUEST = 'CW_MONSTER_ATTACKPLAYER_REQUEST';        //客户端向服务端发送随从攻击玩家请求
window.WC_MONSTER_ATTACKPLAYER_RESPONSE = 'WC_MONSTER_ATTACKPLAYER_RESPONSE';      //服务端向客户端发送随从攻击玩家响应
window.WC_MONSTER_CREATE = 'WC_MONSTER_CREATE'; //随从创建
window.WC_MONSTER_UPDATE = 'WC_MONSTER_UPDATE'; //随从更新
window.WC_MONSTER_DELETE = 'WC_MONSTER_DELETE'; //随从删除

//结束回合
window.CW_ENDPHASE_REQUEST = 'CW_ENDPHASE_REQUEST';   //客户端向服务端发送回合结束请求
window.WC_END_PHASE_RESPONSE = 'WC_END_PHASE_RESPONSE'; //服务端向客户端发送回合结束响应

//----------------------------------------------------------------------------------------------------
