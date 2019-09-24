<template>
    <div class="dictChange">
        <div class="theader">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>字典管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <hr/>
        <div class="edit-btn">
            <span>基本信息</span>
            <el-button plain size="small" class="fr" @click="_goBack">返回列表</el-button>
        </div>
        <div class="prove-form">
            <el-form :model="form" ref="form" :label-position="labelPosition">
                <el-form-item label="名称" prop="tname">
                    <el-input v-model="form.tname" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="类型编码" prop="tcode">
                    <el-input v-model="form.tcode" autocomplete="off" style="width:300px" disabled></el-input>
                </el-form-item>
                <el-form-item label="是否系统字典" prop="tsystem_flag">
                    <el-select v-model="form.tsystem_flag" placeholder="请选择" style="width:300px">
                        <el-option v-for="(item, index) in options1" :key="index" :label="item.label"
                                   :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="字典描述" prop="tdescription">
                    <el-input v-model="form.tdescription" autocomplete="off" style="width:300px"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="tstatus">
                    <el-select v-model="form.tstatus" placeholder="状态" style="width:300px">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-button type="primary" @click="_save" class="saveButton">保存</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dictChange',
        data() {
            return {
                labelPosition: 'top',
                dialogTableVisible: false,
                dialogFormVisible: false,
                currentPage: 1,
                tableDataName: '',
                totalItems: 0,
                pagesize: 10,
                tableData: [],
                options: [
                    {value: 'true', label: '正常'},
                    {value: 'false', label: '禁用'},
                ],
                options1: [
                    {value: 'Y', label: '是'},
                    {value: 'N', label: '否'},
                ],
                form: {
                    tname: '',
                    tcode: '',
                    tsystem_flag: '',
                    tdescription: '',
                    tstatus: '',
                    tdictTypeId: '',
                },
                rules: {
                    name: [{required: true, message: '请输入名称', trigger: 'change'}],
                    lxbm: [
                        {required: true, message: '请输入类型编码', trigger: 'change'},
                    ],
                    isZd: [{required: true, message: '请选择字典类型', trigger: 'change'}],
                },
            };
        },

        methods: {
            getObj() {
                let row = this.$route.query;
                this.form = row;
                console.log(row);
            },
            _goBack() {
                this.$router.push({path: '/dictionaryManagement'});
            },
            _save() {
                let data = {
                    name: this.form.tname,
                    code: this.form.tcode,
                    systemFlag: this.form.tsystem_flag,
                    description: this.form.tdescription,
                    status: this.form.tstatus,
                    dictTypeId: this.form.tdictTypeId,
                };
                console.log(data);
                this.$axios
                    .post(this.CD_.qj_url + 'dict/update', data)
                    .then(res => {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success',
                        });
                    });
                this._goBack();
            },
        },

        created() {
            this.getObj();
        },
    };
</script>

<style lang='scss' scoped>
    @import "src/styles/variables.scss";
    @import "src/styles/memnerCommon.scss";

    .dictChange {
        padding: 0 100px;
        .theader {
            padding: 20px 15px;
            .bread {
                font-size: 18px;
                font-family: 楷体;
            }
        }
        .box {
            height: 100%;
            margin-left: 15px;
            .body {
                span {
                    font-size: 20px;
                    color: #259b24;
                }
                .conten {
                    margin-top: 20px;
                    margin-left: 60px;
                }
            }
        }
        .prove-form {
            background: #fff;
            padding: 24px 80px;
        }
        .edit-btn {
            display: flex;
            justify-content: space-between;
        }
        .saveButton {
            margin-left: 30%;
        }
    }
</style>
