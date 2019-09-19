<template>
    <section class="sideBar">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <a href="/" class="logo">
                <i class="icon iconfont icon-admin"></i>
                <h1 v-if="!isCollapse">虚拟世界</h1>
            </a>
            <el-menu
                    default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse"
                    :unique-opened="true"
                    background-color="#161C2A"
                    text-color="#fff"
                    active-text-color="#2DB7F5"
            >
                <menu-item :menuList="menuList"></menu-item>
            </el-menu>
            <!--<el-menu
                    default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
                    @close="handleClose" :collapse="isCollapse"
                    :unique-opened="true"
                    background-color="#161C2A"
                    text-color="#fff"
                    active-text-color="#2DB7F5"
            >
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="1-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">导航二</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                    <i class="el-icon-document"></i>
                    <span slot="title">导航三</span>
                </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title">导航四</span>
                </el-menu-item>
                <el-submenu index="5">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="5-1">选项1</el-menu-item>
                        <el-menu-item index="5-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="5-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="5-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="5-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-submenu index="6">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">导航一</span>
                    </template>
                    <el-menu-item-group>
                        <span slot="title">分组一</span>
                        <el-menu-item index="6-1">选项1</el-menu-item>
                        <el-menu-item index="6-2">选项2</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="分组2">
                        <el-menu-item index="6-3">选项3</el-menu-item>
                    </el-menu-item-group>
                    <el-submenu index="6-4">
                        <span slot="title">选项4</span>
                        <el-menu-item index="6-4-1">选项1</el-menu-item>
                    </el-submenu>
                </el-submenu>
            </el-menu>-->
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
                this.toTree(res.data);
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
                menuList = JSON.parse(menuList);
                menuList = menuList.sort((a, b) => {
                    a.children = [];
                    b.children = [];
                    return a.sotrank - b.sotrank;
                }).map(row => {
                    menuList.forEach(item => {
                        if (row.reid == item.id) {
                            item.children.push(row);
                        }
                    });
                    return row;
                }).filter(row => row.topid == 0);
                console.log(menuList);
                this.menuList = menuList;
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