<template>
    <section class="subHeader">
        <div class="subContent">
            <div id="userinfo" class="user2">
                <router-link to="/account" class="second">
                    <img src="../../static/css/images/feddback_from_user.png" style="width:auto;height:auto;">
                    <i>{{ userName }}</i>
                    <i>￥<span id="user_money" style="display:inline-block">{{ balance }}</span></i>
                </router-link>
            </div>
        </div>
        <div class="subContent">
            <router-link class="first" to="/account/money-in">
                <img src="../../static/css/images/btn_1.png">
                <span class="title">充值</span>
            </router-link>
        </div>
        <div class="subContent">
            <a class="third" href="javascript:;">
                <img src="../../static/css/images/btn_3.png">
                <span class="title">在线客服</span>
            </a>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'ComHomeUserInfo',
        computed: {
            // state
            userName(){
                return this.$store.state.user.userName;
            },
            balance(){
                return this.$store.state.user.balance;
            }

            // getters

            // computed
        }
    };
</script>
