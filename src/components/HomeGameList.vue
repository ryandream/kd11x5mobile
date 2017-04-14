<template>
    <section>
        <ul class="productlist">
            <li v-for="(game, id) in gameList" :key="'game-item-' + id">
                <router-link :to="'/game/' + id">
                    <div class="pl-img"><img :src="'../../static/css/images/icon_syw' + id + '.png'" alt="">
                    </div>
                    <div class="maininfo">
                        <h2 class="title">{{ game.name }}</h2>
                        <p class="info">{{ game.advantage }}</p>
                    </div>
                </router-link>
            </li>
        </ul>
    </section>
</template>

<script>
    import gameBasic from '../mixins/gameBasic';

    export default {
        name: 'ComHomeGameList',
        mixins: [gameBasic]
    };
</script>