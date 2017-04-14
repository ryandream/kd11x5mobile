<template>
    <transition enter-active-class="animated zoom-in" leave-active-class="animated bounce-out">
        <section class="ant-modal" v-show="isOpened">
            <div class="ant-modal-mask"></div>
            <div class="ant-modal-content">
                <button  class="ant-modal-close" @click="cancel"><span class="ant-modal-close-x"></span></button>
                <div class="ant-modal-body">
                    <i class="anticon" :class="'ant-confirm-' + type"></i>
                    <span class="ant-confirm-title" v-html="title"></span>
                    <div class="ant-confirm-content" v-html="content"></div>
                    <div class="ant-confirm-btns">
                        <button v-if="confirmButton.show" type="button" class="ant-btn-lg" @click="confirm"><span>{{ confirmButton.text ? confirmButton.text : '确定' }}</span></button>
                        <button v-if="cancelButton.show" type="button" class="ant-btn-lg" @click="cancel"><span>{{ cancelButton.text ? cancelButton.text : '知道了' }}</span></button>
                    </div>
                </div>
            </div>
        </section>
    </transition>
</template>

<script>
    export default {
        name: 'ElementAlert',
        data(){
            return {
                isOpened: false,
                type: 'success', // success, error, fail, info
                title: '',
                content: '',
                cancelButton: {
                    show: true,
                    text: ''
                },
                confirmButton: {
                    show: false,
                    text: ''
                }
            };
        },
        methods: {
            cancelCallback(){},
            confirmCallback(){
                return true;
            },
            open(options){
                this.$el.removeEventListener('animationend', this.resetButtons);
                
                if(!!options.title === false || !!options.content === false){
                    console.log('title and content are needed arguments!');
                    return;
                }

                this.title = options.title,
                this.content = options.content;

                if(options.type){
                    this.type = options.type;
                }

                if(options.confirmButton){
                    this.confirmCallback = options.confirmButton;
                    this.confirmButton.show = true;
                }else if(options.confirmButton === false){
                    this.confirmButton.show = false;
                }

                if(options.confirmButtonText){
                    this.confirmButton.text = options.confirmButtonText;
                }

                if(options.cancelButton){
                    this.cancelCallback = options.cancelButton;
                    this.cancelButton.show = true;
                }else if(options.cancelButton === false){
                    this.cancelButton.show = false;
                }

                if(options.cancelButtonText){
                    this.cancelButton.text = options.cancelButtonText;
                }

                this.isOpened = true;
            },
            close(){
                this.isOpened = false;
                this.$el.addEventListener('animationend', this.resetButtons);
            },
            confirm(){
                if(this.confirmButton.show && this.confirmCallback.apply(this, arguments) === true){
                    this.close();
                }
            },
            cancel(){
                if(this.cancelButton.show){
                    this.cancelCallback.apply(this, arguments);
                }
                this.close();
            },
            resetButtons(){
                this.cancelButton = {
                    show: true,
                    text: ''
                };
                this.confirmButton = {
                    show: false,
                    text: ''
                };
                this.cancelCallback = function(){};
                this.confirmCallback = function(){
                    return true;
                };
            }
        }
    };
</script>

<style>
    /*遮罩*/
    .ant-modal {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 2000;
    }
    .ant-modal-mask {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #373737;
        z-index: 1000;
        opacity: .25;
    }
    .ant-modal-content {
        background-color: #fff;
        border: 0;
        border-radius: 4px;
        background-clip: padding-box;
        box-shadow: 0 2px 8px rgba(0,0,0,.2);
        width: 65%;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -webkit-transform: translate(-50%, -50%);
        z-index: 2000;
        padding: 30px 40px;
    }
    .ant-modal-body {
        font-size: 14px;
        line-height: 1.5;
    }
    .ant-modal-body>.anticon {
        font-size: 24px;
        margin-right: 16px;
        padding: 0 1px;
        float: left;
        display: inline-block;
        font-style: normal;
        vertical-align: baseline;
        text-align: center;
        text-transform: none;
        line-height: 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .ant-modal-body > .anticon.ant-confirm-info:before {
        content: "\E62C";
        color: #108ee9;
        font-family: anticon !important
    }
    .ant-modal-body > .anticon.ant-confirm-error:before,
    .ant-modal-body > .anticon.ant-confirm-fail:before {
        content: "\E62E";
        color: #f50;
        font-family: anticon !important
    }
    .ant-modal-body > .anticon.ant-confirm-success:before {
        content: "\E630";
        color: #87d068;
        font-family: anticon !important
    }
    .ant-modal-body .ant-confirm-title {
        color: #666;
        font-weight: 700;
        font-size: 14px;
    }
    .ant-modal-body .ant-confirm-content {
        margin-left: 42px;
        font-size: 12px;
        color: #666;
        margin-top: 8px;
    }
    .ant-confirm-btns {
        margin-top: 30px;
        float: right;
    }
    .ant-btn-lg {
        padding: 4px 15px 5px;
        font-size: 14px;
        border-radius: 4px;
        outline: 0;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 500;
        text-align: center;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid  #108ee9;
        white-space: nowrap;
        line-height: 1.5;
        user-select: none;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        position: relative;
        color: #fff;
        background-color: #108ee9;
        -webkit-appearance: button;
    }
    .ant-modal-close {
        cursor: pointer;
        border: 0;
        background: transparent;
        position: absolute;
        right: 18px;
        top: 16px;
        z-index: 10;
        font-weight: 700;
        line-height: 1;
        text-decoration: none;
        transition: color .3s ease;
        color: #999;
        outline: 0;
    }
    .ant-modal-close-x {
        display: block;
        font-style: normal;
        vertical-align: baseline;
        text-align: center;
        text-transform: none;
        text-rendering: auto;
        width: 14px;
        height: 14px;
        font-size: 14px;
        line-height: 1;
    }
    .ant-modal-close-x:before {
        content: "\E633";
        display: block;
        font-family: anticon!important;
    }
</style>
