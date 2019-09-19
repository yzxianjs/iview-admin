<template>
    <section class="baseLayout">
        <el-container class="baseContainer">
            <aside class="leftBar">leftBar</aside>
            <el-container>
                <el-header class="header">header</el-header>
                <el-main>
                    main
                </el-main>
            </el-container>
        </el-container>
    </section>
</template>

<script>

    export default {
        name: 'layout',
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
    .baseLayout, .baseContainer {
        height: 100%;
    }
</style>