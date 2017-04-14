<template>
    <ul class="ant-table-pagination">
        <li class="ant-pagination-total-text">共 {{ currentPage }}/{{ totalPages }} 页，{{ totalCount }} 条记录</li>
        <li title="上一页" class="ant-pagination-prev" @click="prev">&lt;</li>
        <template v-if="totalPages > 9">
            <li title="1" class="ant-pagination-item" :class="{'ant-pagination-item-active': currentPage === 1}" @click="go(1)">1</li>
            <li title="向前 5 页" class="ant-pagination-jump-next" v-if="currentPage >= 5" @click="go(currentPage - 5)">...</li>
            <li :title="page" class="ant-pagination-item" :class="{'ant-pagination-item-active': currentPage === page}" v-for="page in tempFivePages" @click="go(page)">{{ page }}</li>
            <li title="向后 5 页" class="ant-pagination-jump-next" v-if="(totalPages - currentPage) >= 4" @click="go(currentPage + 5)">...</li>
            <li :title="totalPages" class="ant-pagination-item" :class="{'ant-pagination-item-active': currentPage === totalPages}" @click="go(totalPages)">{{ totalPages }}</li>
        </template>
        <template v-else>
            <li :title="page" class="ant-pagination-item" :class="{'ant-pagination-item-active': currentPage === page}" v-for="page in totalPages" @click="go(page)">{{ page }}</li>
        </template>
        <li title="下一页" class="ant-pagination-next" @click="next">&gt;</li>
    </ul>
</template>

<script>
    export default {
        name: 'ElementPager',
        data(){
            return {
                tempFivePages: []
            };
        },
        props: {
            currentPage: Number,
            totalPages: Number,
            totalCount: Number
        },
        computed: {
            isFirstDisabled(){
                return this.currentPage === 1;
            },
            isLastDisabled(){
                return this.currentPage === this.totalPages;
            },
            isPrevDisabled(){
                return this.currentPage === 1;
            },
            isNextDisabled(){
                return this.currentPage === this.totalPages;
            }
        },
        created(){
            this.generateFivePages(this.currentPage);
        },
        watch: {
            currentPage(pageNum){
                this.generateFivePages(pageNum);
            },
            totalPages(){
                this.generateFivePages(this.currentPage);
            }
        },
        methods: {
            go(pageNum){
                if(pageNum < 1){
                    pageNum = 1;
                }else if(pageNum > this.totalPages){
                    pageNum = this.totalPages;
                }

                if(this.currentPage === pageNum) return;

                this.$emit('toPage', pageNum);
            },
            first(){
                if(this.isFirstDisabled) return;
                this.go(1);
            },
            last(){
                if(this.isLastDisabled) return;
                this.go(this.totalPages);
            },
            prev(){
                if(this.isPrevDisabled) return;
                this.go(this.currentPage - 1);
            },
            next(){
                if(this.isNextDisabled) return;
                this.go(this.currentPage + 1);
            },
            generateFivePages(pageNum){
                let list = [], i;
                if(this.totalPages > 9){
                    if(pageNum >= 5 && (this.totalPages - pageNum >= 4)){
                        list = [pageNum - 2, pageNum - 1, pageNum, pageNum + 1, pageNum + 2];
                    }else if(this.totalPages - pageNum < 4){
                        list = [this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1];
                    }else if(pageNum < 5){
                        list = [2, 3, 4, 5];
                    }
                }
                this.tempFivePages = list;
            }
        }
    };
</script>