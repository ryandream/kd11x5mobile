import { largeOrSmallOfAndValue, oddOrEvenOfAndValue } from '../../common/Lottery';

const state = {
    id: 'gd', // 游戏编码
    name: '广东11选五', // 游戏名称
    advantage: '易中奖', // 游戏优点
    status: 1, // 游戏状态，1开启，0关闭
    closeTime: 30, // 距封盘时间，单位秒(s)
    prevLottery: { // 上期开奖信息
        number: '', // 期号
        balls: [], // 奖号
        status: 1 // 状态，1已开奖，0正在开奖
    },
    currentLottery: { // 即将开奖一期（本期）
        number: '', // 期号
        time: '', // 开奖时间
        status: 1 // 状态，1可下注，0封盘中不可下注
    },
    futureLotteries: [], // 未来n期数据
    categories: {}, // 产品类别列表
    products: {}, // 产品列表
    cart: [], // 购物车
    unitPrices: []
};

const getters = {
    gagdPrevLotteryAndValue(state){ // 和值
        let andValue = 0, ls, oe;
        state.prevLottery.balls.forEach(item => {
            item = parseInt(item, 10);
            andValue += isNaN(item) ? 0 : item;
        });
        ls = largeOrSmallOfAndValue(andValue);
        oe = oddOrEvenOfAndValue(andValue);
        return {
            andValue: andValue,
            largeOrSmall: ls,
            oddOrEven: oe
        };
    }
};

const mutations = {
    gagdSetGame(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetGame()!');
            return;
        }

        let key, declude = ' prevLottery currentLottery categories products cart ';
        for(key in payload){
            if(!payload.hasOwnProperty(key)) continue;
            if(!state.hasOwnProperty(key)) continue;
            if(declude.indexOf(' ' + key + ' ') > -1) continue;

            state[key] = payload[key];
        }
    },
    gagdSetPrevLottery(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetPrevLottery()!');
            return;
        }

        let key;
        for(key in payload){
            if(!payload.hasOwnProperty(key)) continue;
            if(!state.prevLottery.hasOwnProperty(key)) continue;

            state.prevLottery[key] = payload[key];
        }
    },
    gagdSetCurrentLottery(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetCurrentLottery()!');
            return;
        }

        let key;
        if(payload.shift === true){
            if(state.futureLotteries.length === 0) return;
            let first = state.futureLotteries.shift();

            state.currentLottery = {
                number: first.number,
                time: first.time,
                status: 1
            };
        }else{
            for(key in payload){
                if(!payload.hasOwnProperty(key)) continue;
                if(!state.currentLottery.hasOwnProperty(key)) continue;

                state.currentLottery[key] = payload[key];
            }
        }
    },
    gagdSetCategories(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetCategories()!');
            return;
        }

        if(!payload.hasOwnProperty('categories')) return;
        state.categories = payload.categories;
    },
    gagdSetProducts(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetProducts()!');
            return;
        }

        if(!payload.hasOwnProperty('categoryId')){
            state.products = payload.value;
            return;
        }
        if(!payload.hasOwnProperty('productId')){
            state.products[payload.categoryId] = payload.value;
            return;
        }
        let key, cid = payload.categoryId, pid = payload.productId;
        for(key in payload.value){
            if(!payload.value.hasOwnProperty(key)) continue;
            if(!state.products.hasOwnProperty(cid)) continue;
            if(!state.products[cid].hasOwnProperty(pid)) continue;

            state.products[cid][pid][key] = payload.value[key];
        }
    },
    gagdSetCart(state, payload){
        if(typeof payload === 'undefined'){
            console.error('payload is not defined in gagdSetCart()!');
            return;
        }
        state.cart = payload;
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
