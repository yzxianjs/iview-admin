<template>
    <fragment>
        <template v-for="(row,index) in menuList">
            <!--一级菜单-->
            <el-menu-item v-if="row.children.length==0" :index="row.id+''" :key="row.typename">
                <i class="el-icon-s-goods"></i>
                <span slot="title">{{row.typename}}</span>
            </el-menu-item>

            <!--二级菜单-->
            <template v-else-if="row.children.length>0">
                <!--二级子类-->
                <el-submenu :index="row.id+''" :key="row.typename">
                    <template slot="title">
                        <i class="el-icon-s-goods"></i>
                        <span>{{ row.typename }}</span>
                    </template>
                    <!--递归-->
                    <menuItem :menu-list="row.children"></menuItem>
                </el-submenu>
            </template>

        </template>
    </fragment>
</template>


<script>
    export default {
        name: 'menuItem',
        props: {
            menuList: {
                type: Array,
                default: [],
            },
        },
        data() {
            return {};
        },
        computed: {
            isCollapse() {
                return this.$store.state.app.sideBarStatus;
            },
        },
        mounted() {
        },
        methods: {},
        components: {},
    };
</script>

<style scoped>

</style>