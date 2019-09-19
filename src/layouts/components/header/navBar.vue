<template>
    <el-row :gutter="10" class="navBar">
        <el-col :span="1">
            <div class="toggle" @click="toggleSideBar">
                <i class="icon iconfont icon-menu-fold"></i>
            </div>
        </el-col>
        <el-col :span="18">
            <breadcrumb/>
        </el-col>
        <el-col :span="4" class="rightMenu">
            <div class="search">
                <i class="icon el-icon-search"></i>
            </div>

        </el-col>
    </el-row>
</template>

<script>
    import {mapActions, mapState} from 'vuex';
    import breadcrumb from '@/components/Breadcrumb/breadcrumb';

    export default {
        name: 'navBar',
        data() {
            return {};
        },
        mounted() {
        },
        computed: {
            ...mapState('app', ['sideBarStatus']),
        },
        methods: {
            ...mapActions('app', ['toggleSideBar']),
        },
        components: {breadcrumb},
    };
</script>

<style scoped lang="scss">
    .navBar {
        height: 50px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, .08);
        display: flex;
        align-items: center;

        .toggle {
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all .3s ease;
            &:hover {
                background-color: rgba(0, 0, 0, .1);
            }
            .icon {
                font-size: 20px;
            }
        }
    }
</style>