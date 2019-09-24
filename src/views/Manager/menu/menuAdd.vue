<template>
    <section>
        menuAdd
        <el-button type="primary" @click="test">返回test</el-button>
    </section>
</template>

<script>
    export default {
        name: 'menuAdd',
        data() {
            return {};
        },
        mounted() {
        },
        methods: {
            test() {
                this.$router.push({path: '/test'});
            },
        },
        components: {},
    };
</script>

<style scoped>

</style>