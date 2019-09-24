<template>
    <fragment>
        <template v-for="(row,index) in menuList">
            <!--一级菜单-->
            <el-menu-item v-if="row.children.length==0" :index="resolvePath(row)"
                          @select="handleSelect"
                          :key="row.id">
                <i :class="row.icon"></i>
                <span slot="title">{{row.typeName}}</span>
            </el-menu-item>

            <!--二级菜单-->
            <template v-else-if="row.children.length>0">
                <!--二级子类-->
                <el-submenu :index="row.id+''" :key="row.typename">
                    <template slot="title">
                        <i :class="row.icon"></i>
                        <span>{{ row.typeName }}</span>
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
            // console.log(this.$route.meta);
        },
        methods: {
            resolvePath(row) {
                const {parentName, modName} = row;
                if (parentName != '') {
                    return `/${parentName}/${modName}`;
                } else {
                    return `/${modName}`;
                }
            },
            handleSelect(key, path) {
                console.log(key, path);
            },
        },
        components: {},
    };
</script>

<style scoped>

</style>