import Vue from 'vue';
import Vuex from 'vuex';

import page from './modules/page';
import user from './modules/user';
import gasd from './modules/gasd';
import gagd from './modules/gagd';
import gaah from './modules/gaah';
import gajx from './modules/gajx';
import gash from './modules/gash';
import gazj from './modules/gazj';
import gajs from './modules/gajs';
import galn from './modules/galn';

Vue.use(Vuex);

const state = {
    name: '', // 站点名称
    domain: '', // 站点域名
    time: '', // 站点系统时间

    guestVisitable: 0, // 游客是否能够访问

    status: 1, // 站点状态，1开启，0关闭
    textWhenCloseSite: '', // 当站点关闭时显示的文本

    contactInfo: '', // 联系我们信息
    copyrightInfo: '', // 版权信息
    techInfo: '', // 技术支持信息

    gameIndexes: ['sd', 'gd', 'ah', 'jx', 'sh', 'zj', 'js', 'ln'], // 游戏索引
};

const getters = {
    //
};

const mutations = {
    setSite(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in setSite()!');
            return;
        }

        let key, declude = ' gameIndexes ';
        for(key in payload){
            if(!payload.hasOwnProperty(key)) continue;
            if(!state.hasOwnProperty(key)) continue;
            if(declude.indexOf(' ' + key + ' ') > -1) continue;

            state[key] = payload[key];
        }
    }
};

const actions = {
    //
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        page,
        user,
        gasd,
        gagd,
        gaah,
        gajx,
        gash,
        gazj,
        gajs,
        galn
    }
});
