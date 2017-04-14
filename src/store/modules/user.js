import * as ajax from '../../api';

const state = {
    userId: '', // 用户ID
    userName: '', // 用户名
    isUserLogined: false, // 是否登录

    realName: '', // 真实姓名
    qq: '', // QQ账号-
    weixin: '', // 微信账号-
    mobile: '', // 手机号码
    bankCardNo: '', // 银行卡卡号
    balance: 0, // 余额
    score: 0, // 积分
    frozenFund: 0, // 冻结金额
    introducerId: '', // 介绍人ID-
    securityLevel: '0%', // 安全等级

    secureString: '', // 安全密钥

    currentIP: '', // 当前IP
    lastActionDate: '', // 上次登录时间
    lastBetDate: '', // 上次下注时间
    loginDate: '' // 当前登录时间
};

const getters = {
    uHasMobile(state){ // 是否绑定手机
        return !!state.mobile;
    },
    uAuthenticated(state){ // 是否实名认证
        return !!state.realName;
    },
    uHasBankCard(state){ // 是否绑定银行卡
        return !!state.bankCardNo;
    }
};

const mutations = {
    uSetUser(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in uSetUser()!');
            return;
        }

        let key, declude = '  ';
        for(key in payload){
            if(!payload.hasOwnProperty(key)) continue;
            if(!state.hasOwnProperty(key)) continue;
            if(declude.indexOf(' ' + key + ' ') > -1) continue;

            state[key] = payload[key];
        }
    }
};

const actions = {
    uFetchUserInfo({ commit }){
        return ajax.apiFetchUserInfo().then(json => {
            if(typeof json === 'undefined') return;
            if(typeof json.S !== 'undefined'){
                console.log(json);
                return;
            }

            commit('uSetUser', {
                userId: json.USER_ID,
                userName: json.USER_NAME,
                isUserLogined: true,

                loginDate: json.LOGIN_DATE,
                currentIP: json.ACTIVE_IP,
                secureString: json.SECURE_STRING,
                lastBetDate: json.LAST_BET_DATE,
                lastActionDate: json.LAST_ACTION_DATE,
                balance: json.BALANCE,
                frozenFund: json.FROZEN,
                score: json.COIN
            });
        });
    },
    uFetchUserDetail({ commit }, payload){
        payload = payload || {};
        let vm = payload.vm || {};

        return ajax.apiFetchUserDetail().then(json => {
            if(typeof json === 'undefined') return;
            if(typeof json.S !== 'undefined'){
                console.log(json);
                return;
            }
            commit('uSetUser', {
                userId: json.USER_ID,
                bankCardNo: json.Bank_Account_Number,
                realName: json.RealName,
                mobile: json.Mobile_Number,
                securityLevel: json.Safe_Level
            });
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
