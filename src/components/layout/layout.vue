<template>
    <section class="layout">
        <el-container class="layout-container">
            <el-header class="header">
                <el-row>
                    <el-col :span="4" :offset="2" class="logo">
                        <img src="../../assets/img/logo.svg" alt="">
                    </el-col>
                    <el-col :span="14">
                        <el-menu mode="horizontal" :router="true" :default-active="activeIndex"
                                 @select="handleSelectMenu" class="el-menu-demo">
                            <el-menu-item index="/app" route="/app">应用分析</el-menu-item>
                            <el-menu-item index="/push" route="/push">推送营销</el-menu-item>
                            <el-menu-item index="/dev" route="/dev">开发助手</el-menu-item>
                            <el-menu-item index="/manager" route="/manager">应用管理</el-menu-item>
                        </el-menu>
                    </el-col>
                    <el-col :span="4" class="rightAction">
                        <el-row :gutter="5">
                            <el-col :span="8">
                                <el-dropdown>
                                    <Avatar icon="ios-person" size="large"/>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item>个人最新</el-dropdown-item>
                                        <el-dropdown-item>个人收藏</el-dropdown-item>
                                        <el-dropdown-item disabled>浏览历史</el-dropdown-item>
                                        <el-dropdown-item divided>退出登录</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </el-col>
                            <el-col :span="8">

                                <el-popover
                                        placement="bottom"
                                        width="210"
                                        trigger="hover"
                                        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                    <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 300px;">
                                        <el-tab-pane label="通知" name="first">通知</el-tab-pane>
                                        <el-tab-pane label="公告" name="second">公告</el-tab-pane>
                                        <el-tab-pane label="系统" name="third">系统</el-tab-pane>
                                    </el-tabs>
                                    <el-badge is-dot slot="reference">
                                        <i class="el-icon-message-solid" style="font-size: 20px;"></i>
                                    </el-badge>
                                </el-popover>
                            </el-col>
                            <el-col :span="8">
                                <i class="el-icon-s-tools setting" @click="handleSettingClick"></i>

                                <el-drawer
                                        title="我是标题"
                                        :visible.sync="drawer"
                                        direction="rtl"
                                        :before-close="handleSettingClose">
                                    <span>我来啦!</span>
                                </el-drawer>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-header>
            <el-container class="container">
                <el-aside class="asid">
                    <el-scrollbar>
                        <el-menu
                                default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen"
                                @close="handleClose" :collapse="isCollapse"
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
                        </el-menu>
                    </el-scrollbar>
                </el-aside>
                <el-main>
                    <slot></slot>
                </el-main>
            </el-container>
        </el-container>
    </section>
</template>

<script>
    export default {
        name: 'layout',
        data() {
            return {
                activeIndex: '/app',
                activeName: 'first',
                drawer: false,
                isCollapse: false,
            };
        },
        created() {
            this.activeIndex = this.$route.path;
        },
        mounted() {
        },
        methods: {
            handleSelectMenu(key, keyPath) {
                this.activeIndex = key;
            },
            handleClick(tab, event) {
            },
            handleSettingClick() {
                this.drawer = !this.drawer;
            },
            handleSettingClose() {
                this.drawer = !this.drawer;
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
        },
        comments: {},
        watch: {
            activeIndex(val) {

            },
        },
    };
</script>

<style scoped lang="scss">
    .layout {
        height: 100%;
        .layout-container {
            height: 100%;
        }
        .header {
            width: 100%;
            position: fixed;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07);
            top: 0;
            left: 0;
            right: 0;
            .el-row {
                height: 100%;
            }
            .logo {
                height: 100%;
                display: flex;
                align-items: center;
            }
            .rightAction {
                height: 100%;
                .el-row {
                    height: 100%;
                    display: flex;
                    align-items: center;
                }
            }
            .setting {
                font-size: 20px;
                cursor: pointer;
            }
        }
        .asid {
            width: 240px !important;
            height: calc(100%);
            overflow: hidden;
            background-color: #161C2A;

            .el-menu-vertical-demo {
                height: 100%;
                width: 240px;
            }
        }
        .container {
            height: 100%;
            margin-top: 62px;
        }
    }

</style>