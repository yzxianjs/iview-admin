<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in list" :key="item.path">
            <a @click.prevent="handleClickLink(item)">{{item.meta.title}}</a>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: 'breadcrumb',
        data() {
            return {
                list: null,
            };
        },
        mounted() {
            this.getBreadcrumb();
        },
        methods: {
            getBreadcrumb() {
                let matched = this.$route.matched;
                matched = [{path: '/', meta: {title: '首页'}}].concat(matched);
                this.list = matched.filter(item => item.meta && item.meta.title);
            },
            handleClickLink(item) {
                const {redirect, path} = item;
                if (redirect) {
                    console.log('redirect');
                    this.$router.push(redirect);
                    return;
                }
                this.$router.push({path: path});
            },
        },
        watch: {
            $route(route) {
                // if you go to the redirect page, do not update the breadcrumbs

                this.getBreadcrumb();
            },
        },
        components: {},
    };
</script>

<style scoped>

</style>