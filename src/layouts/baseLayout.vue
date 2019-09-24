<template>
    <el-container class="baseContainer " :class="sideBarClass">
        <!--左边侧栏-->
        <side-bar/>
        <el-container class="main-contain">
            <!--顶部导航-->
            <TopHeader/>

            <!--内容区域-->
            <el-main class="content">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {SideBar, Setting, TopHeader} from './components';
    import {mapState} from 'vuex';

    export default {
        name: 'baseLayout',
        data() {
            return {};
        },
        computed: {
            ...mapState('app', ['sideBarStatus']),
            sideBarClass() {
                return this.sideBarStatus ? 'hideSideBar' : 'openSideBar';
            },
        },
        mounted() {
        },
        methods: {},
        comments: {},
        components: {
            SideBar,
            Setting,
            TopHeader,
        },
    };
</script>

<style scoped>
    .main-contain {
        display: flex;
        flex-direction: column;
    }

    .content {
        width: 100%;
        height: 100%;
    }
</style>