<template>
    <div class="kd-page" id="page">
        <header class="header" :class="{'home-header': isHomePage}" v-if="!isLoginPage">
            <div class="common-hd" v-if="isRegisterPage">
                <a class="common-hd-back" href="javascript:;"></a>
                <h1 id="head-title">注册</h1>
                <router-link to="/login" class="login_btn">登陆</router-link>
            </div>
            <div class="topmain" v-if="isHomePage">
                <a class="logobox" href="/"></a>
                <a class="logobox2" href="javascript:;"></a>
            </div>
        </header>
        <router-view ref="viewBody"></router-view>
        <footer v-if="isLoginPage">
            <a href="javascript:;" target="_blank">在线客服</a>
        </footer>
        <footer class="footer" v-if="isHomePage">
            <div class="fixed">
                <ul>
                    <li>
                        <router-link to="/buy-together/sd">
                            <i class="icon-hmdj"></i>
                            <span style="font-size: .09rem;color:#fff;">合买大厅</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account/records-of-betting">
                            <i class="icon-kjgk"></i>
                            <span style="font-size: .09rem;color:#fff;">购彩记录</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/account">
                            <i class="icon-grzx"></i>
                            <span style="font-size: .09rem;color:#fff;">个人中心</span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/activities">
                            <i class="icon-zx"></i>
                            <span style="font-size: .09rem;color:#fff;">优惠活动</span>
                        </router-link>
                    </li>
                </ul>
            </div>
        </footer>
        <mod-alert ref="alert"></mod-alert>
    </div>
</template>

<script>
    export default {
        name: 'LayoutDefault',
        computed: {
            // state

            // getters

            // computed
            isLoginPage(){
                return this.$route.name === 'LoginPage';
            },
            isHomePage(){
                return this.$route.name === 'HomePage';
            },
            isRegisterPage(){
                return this.$route.name === 'RegisterPage';
            }
        }

        /*data(){
            return {
                isLoginPage: false,
                isHomePage: false,
                isRegisterPage: false
            };
        },
        computed: {
            // state

            // getters

            // computed
        },
        watch: {
            '$route'(to, from){
                this.validatePage(to);
            }
        },
        created(){
            this.validatePage(this.$route);
        },
        methods: {
            validatePage(route){
                this.isLoginPage = route.name === 'LoginPage';
                this.isHomePage = route.name === 'HomePage';
                this.isRegisterPage = route.name === 'RegisterPage';
            }
        }*/
    };
</script>

<style>
    .kd-page {}
</style>
