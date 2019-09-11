<template>
    <section class="userLayout">
        UserLayout
        <router-view></router-view>
    </section>
</template>

<script>
    export default {
        name: 'UserLayout',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {},
        comments: {},
    };
</script>

<style scoped>
    .userLayout {
        width: 100%;
        height: 100%;
        background-color: #9ceede;
    }
</style>