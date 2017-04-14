import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

let router = new Router({
    linkActiveClass: 'active',
    routes: [
        { // 首页
            path: '/',
            name: 'HomePage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/Home'], resolve);
            }
        },
        { // 登录
            path: '/login',
            name: 'LoginPage',
            component(resolve){
                require(['../pages/Login'], resolve);
            }
        },
        { // 注册
            path: '/register',
            name: 'RegisterPage',
            component(resolve){
                require(['../pages/Register'], resolve);
            }
        },
        { // 个人中心
            path: '/account',
            name: 'AccountPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/Account'], resolve);
            }
        },
        { // 个人中心-完善资料
            path: '/account/profile',
            name: 'AccountProfilePage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountProfile'], resolve);
            }
        },
        { // 个人中心-账户明细
            path: '/account/balance-sheet',
            name: 'AccountBalanceSheetPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountBalanceSheet'], resolve);
            }
        },
        { // 个人中心-积分明细
            path: '/account/score',
            name: 'AccountScorePage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountScore'], resolve);
            }
        },
        { // 个人中心-实名认证
            path: '/account/real-name-authentication',
            name: 'AccountRealNameAuthenticationPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountRealNameAuthentication'], resolve);
            }
        },
        { // 个人中心-银行卡绑定
            path: '/account/bind-bank-card',
            name: 'AccountBindBankCardPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountBindBankCard'], resolve);
            }
        },
        { // 个人中心-手机绑定
            path: '/account/bind-mobile',
            name: 'AccountBindMobilePage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountBindMobile'], resolve);
            }
        },
        { // 个人中心-充值
            path: 'money-in',
            name: 'AccountMoneyInPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountMoneyIn'], resolve);
            }
        },
        { // 个人中心-提现
            path: 'money-out',
            name: 'AccountMoneyOutPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountMoneyOut'], resolve);
            }
        },
        { // 个人中心-修改密码
            path: '/account/edit-password',
            name: 'AccountEditPasswordPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountEditPassword'], resolve);
            }
        },
        { // 个人中心-购彩记录
            path: '/account/records-of-betting',
            name: 'AccountRecordsOfBettingPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountRecordsOfBetting'], resolve);
            }
        },
        { // 个人中心-我的追号
            path: '/account/records-of-continous-betting',
            name: 'AccountRecordsOfContinousBettingPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountRecordsOfContinousBetting'], resolve);
            }
        },
        { // 个人中心-我的中奖
            path: '/account/records-of-winning',
            name: 'AccountRecordsOfWinningPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/AccountRecordsOfWinning'], resolve);
            }
        },
        { // 游戏页面
            path: '/game/:gameId',
            name: 'GamePage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/Game'], resolve);
            }
        },
        { // 合买大厅
            path: '/buy-together/:gameId',
            name: 'BuyTogetherPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/BuyTogether'], resolve);
            }
        },
        { // 方案详情|合买详情|投注详情
            path: '/plan-detail/:gameId/:id',
            name: 'PlanDetailPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/PlanDetail'], resolve);
            }
        },
        { // 历史开奖
            path: '/history/:gameId',
            name: 'HistoryPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/History'], resolve);
            }
        },
        { // 优惠活动
            path: '/activities',
            name: 'ActivitiesPage',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/Activities'], resolve);
            }
        },
        { // 404错误
            path: '*',
            name: 'Error404Page',
            meta: {
                requireAuth: true
            },
            component(resolve){
                require(['../pages/Error404'], resolve);
            }
        }
    ]
});

export default router;
