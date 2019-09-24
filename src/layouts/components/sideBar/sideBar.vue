<template>
    <section class="sideBar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <a href="/" class="logo">
                <i class="icon iconfont icon-admin"></i>
                <h1 v-if="!isCollapse">世界</h1>
            </a>
            <el-menu
                    default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse"
                    :unique-opened="true"
                    router
                    background-color="#161C2A"
                    text-color="#fff"
                    active-text-color="#2DB7F5"
            >
                <menu-item :menuList="menuList"></menu-item>
            </el-menu>
        </el-scrollbar>
    </section>
</template>

<script>
    import {mapState} from 'vuex';
    import axios from 'axios';
    import menuItem from './menuItem';

    export default {
        name: 'sideBar',
        data() {
            return {
                // isCollapse: false,
                menuList: [],
            };
        },
        mounted() {
            axios.get('/menu').then(res => {
                // console.log(res.data.data);
                this.toTree(res.data.data);
            }, reason => {
                console.log(reason);
            });
        },
        computed: {
            // ...mapState('app', ['sideBarStatus']),
            isCollapse() {
                return this.$store.state.app.sideBarStatus;
            },
        },
        methods: {
            toTree(menuList) {
                // console.log('->', menuList);
                menuList.sort((a, b) => {
                    a.children = [];
                    b.children = [];
                    a.parentName = '';
                    b.parentName = '';
                    return a['sortRank'] - b['sortRank'];
                });
                let tmp = JSON.parse(JSON.stringify(menuList));
                menuList = menuList.map(row => {
                    menuList.forEach(item => {
                        if (row.id == item.parentId) {
                            item.parentName = [row.modName];
                            row.children.push(item);
                        }
                    });
                    return row;
                }).filter(row => row.topId == 0);
                // console.log(menuList);
                this.menuList = menuList;
                console.log(this.menuList);
            },
            handleOpen(key, keyPath) {
                // console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                // console.log(key, keyPath);
            },
        },
        components: {
            menuItem,
        },
    };
</script>

<style scoped>

</style>