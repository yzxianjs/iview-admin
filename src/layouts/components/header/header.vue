<template>
    <el-header class="header">
        <navBar></navBar>
        <open-tag></open-tag>
    </el-header>
</template>

<script>
    import navBar from './navBar';
    import openTag from './openTag';

    export default {
        name: 'topHeader',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {},
        components: {
            navBar,
            openTag,
        },

    };
</script>

<style scoped lang="scss">
    .header {
        height: 84px !important;
        padding: 0;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .06);

    }
</style>