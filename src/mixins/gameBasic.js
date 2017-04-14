export default {
    computed: {
        // state
        gameIndexes(){
            return this.$store.state.gameIndexes;
        },

        // getters

        // computed
        gameList(){
            let list = {};
            this.$store.state.gameIndexes.forEach(id => {
                list[id] = this.$store.state['ga' + id];
            });
            return list;
        },
        currentGame(){
            let id = this.$route.params.gameId || '';
            if(id === '') return null;

            return this.$store.state['ga' + id];
        }
    }
};