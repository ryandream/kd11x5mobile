import * as ajax from '../../api';

const state = {
    title: '', // 页面标题
    className: '' // 页面的class
};

const getters = {
    //
};

const mutations = {
    pSetPage(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in pSetPage()!');
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
    //
};

export default {
    state,
    getters,
    mutations,
    actions
};
