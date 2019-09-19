<template>
    <base-layout>
        app
        <el-divider></el-divider>
        <router-view></router-view>
    </base-layout>
</template>

<script>
    import {mapState, mapActions} from 'vuex';

    export default {
        name: 'baseApp',
        data() {
            return {};
        },
        computed: {
            // ...mapState({a: state => state.app.a}),
            appA() {
                return this.$store.state.app.a;
            },
            ...mapState('app', ['a']),
        },
        mounted() {
        },
        methods: {},
        comments: {},
    };
</script>

<style scoped>

</style>