import Vue from 'vue';
import Layout from './layouts/Default';
import elements from './elements';
import router from './router';
import store from './store';

// Vue.config.productionTip = false;
var routerInterceptor = function(to, from, next){
    let exclude = (to.name === 'LoginPage' || to.name === 'RegisterPage');
    if(store.state.user.isUserLogined){
        if(exclude){
            next({
                name: 'HomePage'
            });
        }else{
            next();
        }
    }else{
        if(exclude){
            next();
        }else{
            next({
                name: 'LoginPage',
                query: {
                    redirect: to.fullPath
                }
            });
        }
    }
};

router.beforeEach((to, from, next) => {
    if(!store.state.user.isUserLogined){// when refresh page
        store.dispatch('uFetchUserInfo').then(() => {
            routerInterceptor(to, from, next);
        });
    }else{
        routerInterceptor(to, from, next);
    }
});

new Vue({
    el: '#page',
    router,
    store,
    render: h => h(Layout)
});
