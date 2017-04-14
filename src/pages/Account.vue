<template>
    <main class="kd-body">
        <div class="uc_wap" id="wrapper">
            <div class="mc_sce">
                <div class="fi_li">
                    <img src="../../static/css/images/icon_money.png" class="response"> 我的余额：<span style="font-size:1.2rem;color:#f70000">{{ balance }}</span>元
                </div>
                <div class="fi_li">
                    积分：<span style="color:#f70000">{{ score }}</span>
                </div>
            </div>
            <ul class="mc_sce_an">
                <li style="width:33%;float:left;text-align:center;">
                    <a class="cz_btn" href="">积分明细</a>
                </li>
                <li style="width:33%;float:left;text-align:center;">
                    <a class="cz_btn" href="">提现</a>
                </li>
                <li style="width:33%;float:left;text-align:center;">
                    <a class="cz_btn" href="">充值</a>
                </li>
            </ul>
            <div class="panel_list">
                <ul>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon1.png" class="response_1">
                            购彩记录
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon2.png" class="response_1">
                            我的追号
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon3.png" class="response_1">
                            我的中奖
                        </a>
                    </li>
                </ul>
            </div>
            <div class="panel_list">
                <ul>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon4.png" class="response_1">
                            账户明细
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon5.png" class="response_1">
                            实名认证
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon6.png" class="response_1">
                            绑定银行卡
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon7.png" class="response_1">
                            绑定手机
                        </a>
                    </li>
                    <li>
                        <a href="">
                            <img src="../../static/css/images/icon8.png" class="response_1">
                            修改密码
                        </a>
                    </li>
                </ul>
            </div>
            <div class="panel_list_1">
                <ul>
                    <li class="panel_top">
                        <a @click="doLogout">退出登录</a>
                    </li>
                </ul>
            </div>
            <p class="tishi_txt">
                温馨提醒：购买彩票有风险，在线投注需谨慎
                不向未满18周岁的青少年出售彩票！
            </p>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'PageAccount',
        computed: {
            // state
            balance(){
                return this.$store.state.user.balance;
            },
            score(){
                return this.$store.state.user.score;
            },

            // getters

            // computed
        },
        created(){
            this.fetchUserDetail();
        },
        methods: {
            // mutations
            setUser(payload){
                this.$store.commit('uSetUser', payload);
            },

            // actions
            fetchUserDetail(){
                return this.$store.dispatch('uFetchUserDetail');
            },

            // methods
            doLogout(){
                let vm = this;
                return ajax.apiLogout().then(json => {
                    if(typeof json === 'undefined') return;
                    if(json.S === 190){
                        this.$success({
                            title: '登出成功',
                            content: '欢迎再来十一选五！',
                            cancelButton: function(){
                                this.$router.push({
                                    name: 'LoginPage'
                                });
                            }
                        });
                        this.setUser({
                            isUserLogined: false
                        });
                    }else{
                        console.log(json);
                    }
                });
            }
        }
    };
</script>
