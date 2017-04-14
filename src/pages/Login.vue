<template>
    <main class="kd-body kd-body-login login">
        <div class="logo"></div>
        <form @submit.prevent>
            <input type="text" v-model.trim="user.name" placeholder="账号">
            <input type="password" v-model="user.password" placeholder="密码">
            <input type="text" v-model.trim="secureCode" placeholder="验证码">
            <img :src="secureCodeUrl" alt="验证码" @click="changeSecureCode">
            <a class="btn" @click="doLogin">登 录</a>
        </form>
        <router-link to="/register">新会员注册</router-link>
    </main>
</template>

<script>
    import * as ajax from '../api';

    export default {
        name: 'LoginPage',
        data(){
            return {
                user: {
                    name: '',
                    password: ''
                },
                secureCode: '',
                secureCodeVersion: Math.random(),

                validators: {
                    user: {
                        name: '',
                        password: ''
                    },
                    secureCode: ''
                }
            };
        },
        computed: {
            // state

            // getters

            // computed
            secureCodeUrl(){
                return '/api/index/secure_code_img.html?v=' + this.secureCodeVersion;
            },
            introducer(){
                let pid = this.$route.query.p;
                if(pid && /^\d+$/.test(pid)){
                    return pid;
                }else{
                    return false;
                }
            }
        },
        created(){
            this.writeIntroducer();
        },
        methods: {
            // mutations
            setUser(payload){
                return this.$store.commit('uSetUser', payload);
            },

            // actions
            fetchUserInfo(){
                return this.$store.dispatch('uFetchUserInfo');
            },

            // methods
            doLogin(){
                if(!this.validate()) return;
                let vm = this;

                return ajax.apiLogin({
                    userName: this.user.name,
                    password: this.user.password,
                    secureCode: this.secureCode
                }).then(json => {
                    if(typeof json === 'undefined') return;
                    this.changeSecureCode();
                    
                    if(json.S === 120){ // 登录成功
                        this.$success({
                            title: '登录成功',
                            content: '欢迎来到十一选五',
                            cancelButton: function(){
                                if(this.$route.query.redirect){
                                    this.$router.push({
                                        path: this.$route.query.redirect
                                    });
                                }else{
                                    this.$router.push({
                                        name: 'HomePage'
                                    });
                                }
                            }
                        });
                        this.fetchUserInfo();
                    }else{
                        this.$error({
                            title: '失败',
                            content: json.S + ': ' + json.D,
                            cancelButton: function(){
                                vm.secureCode = '';
                                vm.validators.secureCode = '';
                            }
                        });
                    }
                });
            },
            changeSecureCode(){
                this.secureCodeVersion = Math.random();
            },
            writeIntroducer(){
                if(this.introducer === false) return;

                return ajax.apiSaveIntroducer({
                    introducerId: this.introducer
                }).then(json => {
                    if(typeof json === 'undefined') return;
                    if(json.S !== '180'){
                        console.log(json);
                    }else{
                        this.setUser({
                            introducerId: this.introducer
                        });
                    }
                });
            },

            // validators
            validate(){
                if(!this.validateUserName(this.user.name)) return false;
                if(!this.validateUserPassword(this.user.password)) return false;
                if(!this.validateSecureCode(this.secureCode)) return false;

                return true;
            },
            validateUserName(val){
                if(val === ''){
                    this.$error({
                        content: '用户名不能为空！'
                    });
                    return false;
                }else if(!/^[a-zA-Z0-9_]+$/.test(val)){
                    this.$error({
                        content: '用户名只能是数字、字母组合！'
                    });
                    return false;
                }else if(val.length > 20 || val.length < 2){
                    this.$error({
                        content: '用户名长度必须在2-20个字符！'
                    });
                    return false;
                }

                return true;
            },
            validateUserPassword(val){
                if(val === ''){
                    this.$error({
                        content: '密码不能为空！'
                    });
                    return false;
                }else if(/[\s\t\n\r]+/g.test(val)){
                    this.$error({
                        content: '密码不能包含空格！'
                    });
                    return false;
                }else if(val.length > 20 || val.length < 6){
                    this.$error({
                        content: '密码长度只能是6-20个字符！'
                    });
                    return false;
                }

                return true;
            },
            validateSecureCode(val){
                if(val === ''){
                    this.$error({
                        content: '验证码不能为空！'
                    });
                    return false;
                }else if(!/^\d{4}$/.test(val)){
                    this.$error({
                        content: '验证码不正确！'
                    });
                    return false;
                }

                return true;
            }
        }
    };
</script>
