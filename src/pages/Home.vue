<template>
    <main class="kd-body">
        <mod-home-user-info></mod-home-user-info>
        <mod-home-game-list></mod-home-game-list>
    </main>
</template>

<script>
    import HomeUserInfo from '../components/HomeUserInfo';
    import HomeGameList from '../components/HomeGameList';

    export default {
        name: 'PageHome',
        components: {
            modHomeUserInfo: HomeUserInfo,
            modHomeGameList: HomeGameList
        }
    };
</script>
