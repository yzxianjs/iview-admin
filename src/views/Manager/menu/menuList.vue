<template>
    <section>
        <el-card class="box-card" shadow="hover">
            <div class="header">
                <span slot="header"><h3>菜单管理列表</h3></span>
                <section class="rightBtn">
                    <el-button type="primary" size="mini" icon="el-icon-plus" @click="dialogTableVisible = true">添加</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-delete">删除</el-button>
                    <el-button type="primary" size="mini" icon="el-icon-s-management">修改</el-button>
                </section>
            </div>
            <el-dialog
                    :title="actionType"
                    :visible.sync="dialogTableVisible"
                    :destroy-on-close="true"
                    :modal-append-to-body="false"
                    :before-close="cancel">
                <el-form ref="form" :model="form" label-width="100px">
                    <el-form-item label="菜单名称">
                        <el-input v-model="form.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="上级菜单">
                        <el-select v-model="form.parentId" placeholder="请选择父级菜单名称">
                            <el-option v-for="item in menuList" :label="item.typeName" :key="item.id"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="显示权重">
                        <el-input v-model="form.sortRank" type="Number"></el-input>
                    </el-form-item>

                    <el-form-item label="授权标识">
                        <el-input v-model="form.modName"></el-input>
                        <span style="color: #409EFF">路由名称, 名称要有意义</span>
                    </el-form-item>

                    <el-form-item label="顶级栏目">
                        <el-radio-group v-model="form.topId">
                            <el-radio :label="0">顶级菜单</el-radio>
                            <el-radio :label="1">子级栏目</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="菜单描述">
                        <el-input v-model="form.description" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单关键字">
                        <el-input v-model="form.keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="左侧图标">
                        <el-input v-model="form.icon" style="width: 200px">
                            <i slot="suffix" class="el-icon-setting"></i>
                        </el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="cancel">取 消</el-button>
                    <el-button type="primary" @click="menuAdd">确 定</el-button>
                </div>
            </el-dialog>

            <el-table
                    border
                    size="mini"
                    style="width: 100%;margin-top: 12px"
                    :data="menuData"
                    row-key="id"
                    :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                    default-expand-all
                    @selection-change="handleSelectionChange"
            >
                <el-table-column
                        prop="id"
                        label="操作"
                        type="selection"
                        width="50">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="菜单ID"
                        align="center"
                        width="80">
                </el-table-column>
                <el-table-column
                        prop="typeName"
                        label="菜单名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="上级菜单">
                    <template slot-scope="scope">
                        {{scope.row.parent ==''?'一级菜单':scope.row.typeName}}
                    </template>
                </el-table-column>
                <el-table-column prop="topId" label="类型">
                    <template slot-scope="scope">
                        {{scope.row.topId ==0?'顶级菜单':'子级菜单'}}
                    </template>
                </el-table-column>
                <el-table-column prop="sortRank" label="排序号"></el-table-column>
                <el-table-column prop="" label="菜单路径"></el-table-column>
                <el-table-column prop="modName" label="授权标识"></el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </section>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'menuList',
        data() {
            return {
                dialogTableVisible: false,
                menuData: [],
                actionType: '新增数据',
                form: {
                    typeName: '',
                    parentId: 0,
                    modName: '',
                    topId: 1,
                    sortRank: 50,
                    description: '',
                    keywords: '',
                    icon: '',
                },
                menuList: [],
            };
        },
        mounted() {
            this.getMenuData();

        },
        methods: {
            getMenuData() {
                axios.get('/menu').then(res => {
                    this.menuList = JSON.parse(JSON.stringify(res.data.data));
                    this.toTree(res.data.data);
                }, reason => {
                    console.log(reason);
                });
            },
            toTree(menuData) {
                menuData.sort((a, b) => {
                    a.children = [];
                    b.children = [];
                    a.parent = '';
                    b.parent = '';
                    return a['sortrank'] - b['sortrank'];
                });
                menuData = menuData.map(row => {
                    menuData.forEach(item => {
                        if (row.topId == item.id) {
                            item.parent = [row.modName];
                            row.children.push(item);
                        }
                    });
                    if (row.children.length == 0) {
                        // row.hasChildren = false;
                    } else {
                        row.hasChildren = true;
                    }
                    return row;
                }).filter(row => row.topId == 0);
                // console.log(menuData);
                this.menuData = menuData;
            },
            menuAdd() {
                let _topId = this.form.topId == 0 ? 0 : this.form.parentId;
                let data = Object.assign(JSON.parse(JSON.stringify(this.form)), {topId: _topId});
                // console.log(data);
                if (this.actionType == '新增数据') {
                    axios.post('/menu', data).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                message: '数据新增成功',
                                type: 'success',
                            });
                            this.getMenuData();
                        }
                    }, reason => {
                        console.log(reason);
                    });
                } else if (this.actionType == '修改数据') {
                    axios.put('/menu', data).then(res => {
                        if (res.status == 200) {
                            this.$message({
                                message: '数据修改成功',
                                type: 'success',
                            });
                            this.getMenuData();
                        }
                    }, reason => {
                        console.log(reason);
                    });
                }

                this.form.typeName = '';
                this.form.parentId = '';
                this.form.modName = '';
                this.form.topId = '';
                this.form.sortRank = 50;
                this.form.description = '';
                this.form.keywords = '';
                this.form.icon = '';
                this.dialogTableVisible = false;
            },
            cancel(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        this.form.typeName = '';
                        this.form.parentId = '';
                        this.form.modName = '';
                        this.form.topId = '';
                        this.form.sortRank = 50;
                        this.form.description = '';
                        this.form.keywords = '';
                        this.form.icon = '';
                        this.dialogTableVisible = false;
                        done();
                    })
                    .catch(_ => {
                    });

            },
            handleSelectionChange(row) {
                console.log(row);
            },
            handleUpdate(row) {
                let {typeName, parentId, modName, topId, sortRank, description, keywords, icon, id} = row;
                this.actionType = '修改数据';
                this.form.id = id;
                this.form.typeName = typeName;
                this.form.parentId = parentId;
                this.form.modName = modName;
                this.form.topId = topId;
                this.form.sortRank = sortRank;
                this.form.description = description;
                this.form.keywords = keywords;
                this.form.icon = icon;
                this.dialogTableVisible = false;
                this.dialogTableVisible = true;
            },
            handleDel(row) {
                axios.delete('/menu', {params: {id: row.id}}).then(data => {
                    if (data.status == 200) {
                        this.$message({
                            message: '数据删除成功',
                            type: 'info',
                        });
                        this.getMenuData();
                    }
                }, reason => {
                });
            },
            rowKey(row) {

            },

        },
        components: {},
    };
</script>
<style>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

    .el-tree-node .el-tree-node__content {
        padding: 10px;
        border: 1px solid #999;
        border-bottom: none;
    }

    .el-tree .el-tree-node {
        background: red;
    }
</style>
<style scoped lang="scss">
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .rightBtn {

        }

    }

    .custom-tree-node {
        display: flex;
        justify-content: space-between;
    }
</style>