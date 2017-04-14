<template>
    <transition enter-active-class="animated zoom-in" leave-active-class="animated bounce-out">
        <section class="promptbox" v-show="isOpened">
            <div class="promptbox-inner">
                <div class="prompt-head">{{ article.loading ? '加载中...' : article.date + ' ' + article.title }}</div>
                <div class="prompt-body" v-html="article.loading ? '加载中...' : article.content"></div>
                <a class="close" href="javascript:;" @click="close">关闭</a>
            </div>
            <div class="promptbox-overlay" @click="close"></div>
        </section>
    </transition>
</template>

<script>
    import { addClass, removeClass } from '../common/basic';
    import * as ajax from '../api';

    export default {
        name: 'ElementPromptbox',
        data(){
            return {
                article: {
                    id: '',
                    date: '',
                    title: '',
                    content: '',
                    loading: false
                },
                isOpened: false
            };
        },
        methods: {
            fetchArticle(id){
                return ajax.apiFetchInfoDetail(id).then(json => {
                    if(typeof json === 'undefined') return;
                    if(typeof json.S !== 'undefined'){
                        console.log(json);
                        return;
                    }

                    this.article = {
                        id: id,
                        date: json.Add_Date,
                        title: json.Title,
                        content: json.Content
                    };
                });
            },
            open(id){
                this.article.loading = true;
                this.fetchArticle(id).then(() => {
                    this.article.loading = false;
                    this.isOpened = true;
                    addClass(document.body, 'opened-promptbox');
                });
            },
            close(){
                this.isOpened = false;
                removeClass(document.body, 'opened-promptbox');
            }
        }
    };
</script>

<style>
    /*
    * Promptbox
    */
        .opened-promptbox {
            overflow: hidden;
        }
        .promptbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            min-width: 800px;
            z-index: 999;
        }
        .promptbox-inner {
            width: 800px;
            min-height: 500px;
            background: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, .15);
            -webkit-box-shadow: 0 0 5px rgba(0, 0, 0, .15);
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 1;
            transform: translate(-50%, -50%);
            border-radius: 4px;
            -webkit-border-radius: 4px;
        }
        .promptbox-overlay {
            opacity: .15;
            background: #000;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
        }
        .prompt-head {
            padding: 1rem;
            background-color: #f9f9f9;
            border-radius: 4px 4px 0 0;
            -webkit-border-radius: 4px 4px 0 0;
            color: #666;
            border-bottom: 1px solid #e9e9e9;
            font-size: 18px;
            text-align: center;
            letter-spacing: 1px;
            line-height: 21px;
            font-weight: bold;
        }
        .prompt-body{
            padding: 16px 5rem;
            font-size: .875rem;
            line-height: 2;
            max-height: 600px;
            overflow: auto;
        }
        .promptbox-inner .close {
            position: absolute;
            top: 17px;
            right: 10px;
            letter-spacing: 1px;
            font-size: 14px;
        }
</style>
