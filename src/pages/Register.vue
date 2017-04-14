<template>
    <main class="kd-body">
        <div class="uc_wap" id="wrapper">
            <form action="" method="post" id="sform">
                <div class="reg_login">
                    <div class="reg_list">
                        <ul>
                            <li>
                                <div class="f_box">
                                    <input type="text" v-model.trim="user.name" placeholder="用户名" class="reg-inmput-txt">
                                </div>
                            </li>
                            <li>
                                <div class="f_box">
                                    <input type="text" v-model.trim="user.mobile" placeholder="手机号" class="reg-inmput-txt">
                                </div>
                            </li>
                            <li>
                                <div class="f_box">
                                    <input type="text" v-model.trim="user.weixin" placeholder="微信号" class="reg-inmput-txt">
                                </div>
                            </li>
                            <li>
                                <div class="f_box">
                                    <input type="text" v-model.trim="user.qq" placeholder="QQ号码" class="reg-inmput-txt">
                                </div>
                            </li>
                            <li>
                                <div class="f_box">
                                    <input type="password" v-model="user.password" placeholder="密码" class="reg-inmput-txt">
                                </div>
                            </li>
                            <li>
                                <div class="f_box">
                                    <input type="text" v-model.trim="secureCode" placeholder="验证码" class="reg-inmput-txt">
                                    <img :src="secureCodeUrl" alt="验证码" @click="changeSecureCode">
                                </div>
                            </li>
                        </ul>
                    </div>
                    <a class="reg_btn" @click="doRegister">提交注册</a>
                    <div class="loadingimg">正在注册中.....</div>
                    <p class="t_c"><span class="color_999">提交注册时，即视为我已满18岁并同意<a href="javascript:;">《用户注册协议》</a></span></p>
                </div>
            </form>
        </div>
    </main>
</template>

<script>
    import * as ajax from '../api';

    export default {
        data(){
            return {
                user: {
                    name: '',
                    qq: '',
                    weixin: '',
                    mobile: '',
                    password: ''
                },
                secureCode: '',
                secureCodeVersion: Math.random(),

                validators: {
                    user: {
                        name: '',
                        qq: '',
                        weixin: '',
                        mobile: '',
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
            }
        },
        watch: {
            'user.mobile': {
                handler(val){
                    val = val.toString();
                    if(val.length > 11){
                        this.user.mobile = val.substr(0, 11);
                    }
                },
                deep: true
            }
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
            doRegister(){
                if(!this.validate()) return;
                let vm = this;
                return ajax.apiRegister({
                    userName: this.user.name,
                    password: this.user.password,
                    weixin: this.user.weixin,
                    qq: this.user.qq,
                    mobile: this.user.mobile,
                    secureCode: this.secureCode
                }).then(json => {
                    if(typeof json === 'undefined') return;
                    this.changeSecureCode();

                    if(json.S === 191){ // 注册成功
                        this.$success({
                            title: '注册成功',
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

            // validators
            validate(){
                if(!this.validateUserName(this.user.name)) return false;
                if(!this.validateUserMobile(this.user.mobile)) return false;
                if(!this.validateUserWeiXin(this.user.weixin)) return false;
                if(!this.validateUserQQ(this.user.qq)) return false;
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
            validateUserQQ(val){
                if(val === ''){
                    this.$error({
                        content: 'QQ不能为空！'
                    });
                    return false;
                }else if(/[^\d]/.test(val)){
                    this.$error({
                        content: 'QQ只能是数字！'
                    });
                    return false;
                }else if(val.length > 15 || val.length < 5){
                    this.$error({
                        content: '标准QQ长度为5-15个数字！'
                    });
                    return false;
                }else if(!/^[1-9][0-9]+$/.test(val)){
                    this.$error({
                        content: 'QQ格式不正确！'
                    });
                    return false;
                }

                return true;
            },
            validateUserWeiXin(val){
                if(val === ''){
                    this.$error({
                        content: '微信不能为空！'
                    });
                    return false;
                }else if(val.length > 20){
                    this.$error({
                        content: '微信长度不能超过20个字符！'
                    });
                    return false;
                }else if(!/^[a-zA-Z0-9_]+$/.test(val)){
                    this.$error({
                        content: '微信格式不正确！'
                    });
                    return false;
                }

                return true;
            },
            validateUserMobile(val){
                if(val === ''){
                    this.$error({
                        content: '手机号码不能为空！'
                    });
                    return false;
                }else if(/[^\d]/.test(val)){
                    this.$error({
                        content: '手机号码只能是数字组成！'
                    });
                    return false;
                }else if(!/^1[34578]\d+$/.test(val)){
                    this.$error({
                        content: '手机号码无效！'
                    });
                    return false;
                }else if(val.length !== 11){
                    this.$error({
                        content: '手机号码必须是11位标准号码！'
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
