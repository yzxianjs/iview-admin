<template>
  <div class="userManagement" style="margin: 92px 15px">
    <div class="theader">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <hr />
    <div class="container">
      <el-input
        style="width: 260px;margin-right:10px"
        v-model="tableDataName"
        clearable
        placeholder="请输入姓名"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      <el-button style="margin-left: 10px;" type="primary" icon="el-icon-plus" @click="addUsers">添加</el-button>
    </div>
    <el-table
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
      style="width: 100%"
    >
      <el-table-column prop="account" label="账号" align="center" width="180"></el-table-column>
      <el-table-column prop="nickname" label="姓名" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
      <el-table-column prop="deptName" label="部门" align="center"></el-table-column>
      <el-table-column prop="creatName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
      <el-table-column prop="desc" width="200%" label="状态" class="switchVal" align="center">
        <template slot-scope="scope">
          <el-switch
            @change="changeSwitch(scope.$index, scope.row)"
            v-model="scope.row.isDisabled"
            active-text="冻结"
            on-color="#00A854"
            on-text="解冻"
            on-value="1"
            off-color="#F04134"
            off-text="禁止"
            off-value="0"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400px">
        <template slot-scope="scope">
          <!-- <el-button size="mini"  @click="handleView(scope.$index, scope.row)">查看</el-button> -->
          <el-button size="mini" @click="handleChange(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleAllot(scope.$index, scope.row)">分配角色</el-button>
          <el-button size="mini" type="success" @click="handleReset(scope.$index, scope.row)">重置密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="panation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <!-- 添加弹窗 -->

    <el-dialog title="用户管理" :visible.sync="dialogFormVisible" center>
      <div class="adduser">
        <el-form :model="form" ref="form" :label-position="labelPosition" :rules="rules">
          <el-form-item label="姓名" prop="nickname">
            <el-input v-model="form.nickname" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="部门" prop="deptName">
            <el-tree :data="dataTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            <el-input v-model="form.pFullName" autocomplete="off" style="width:300px"></el-input>
            <!-- <el-input v-model="form.pid" autocomplete="off" style="width:300px"></el-input> -->
          </el-form-item>
          <el-form-item label="角色" prop="roleName">
            <el-tree :data="dataTree1" :props="defaultProps1" @node-click="handleNodeClick1"></el-tree>
            <el-input v-model="form.pName" autocomplete="off" style="width:300px"></el-input>
            <!-- <el-input v-model="form.pid" autocomplete="off" style="width:300px"></el-input> -->
          </el-form-item>
          <!-- <el-form-item label="状态" prop="isDisabled">
            <el-switch v-model="form.isDisabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>-->
        </el-form>
      </div>
      <div slot="footer">
        <el-button type="primary" @click="_save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userManagement",
  inject: ["reload"],
  data() {
    return {
      labelPosition: "top",
      tableDataName: "",
      flag: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      pagesize: 10,
      tableData: [],
      form: {
        nickname: "",
        account: "",
        roleName: "",
        deptName: "",
        createTime: "",
        isDisabled: false,
        creatName: "",
        deptId: "",
        roleId: ""
      },
      dataTree: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      dataTree1: [],
      defaultProps1: {
        children: "children",
        label: "name"
      },
      rules: {
        // nickname: [{ required: true, message: '请输入姓名', trigger: 'blur' },
        //     { min: 3, max: 6, message: '长度在 3 到 6个字符', trigger: 'blur' }],
        // account: [{required: true, message: '账号', trigger: 'blur'},{
        //   pattern: /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/,
        //   message: '请输入正确账号'
        // }],
      }
    };
  },

  methods: {
    getList() {
      this.$axios.post(this.CD_.qj_url + "user/getUserPage").then(res => {
        console.log(res);
        this.tableData = res.data.data.pageInfo.list;
      });
    },
    //获取部门
    handleNodeClick(dataTree) {
      this.$axios.post(this.CD_.qj_url + "dept/zTreeLzist").then(res => {
        // console.log(dataTree);
        this.dataTree = res.data.data.roleTreeList;
        // console.log(this.dataTree)
        this.form.pFullName = dataTree.name;
        this.form.deptId = dataTree.id;
      });
    },
    handleNodeClick1(dataTree1) {
      this.$axios.post(this.CD_.qj_url + "role/roleTreeList").then(res => {
        console.log(res);
        this.dataTree1 = res.data.data.roleTreeList;
        // console.log(this.dataTree)
        this.form.pName = dataTree1.name;
        this.form.roleId = dataTree1.pId;
      });
    },
    search() {
      // 查询
      //搜索
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      let data = {
        nickname: this.tableDataName
      };
      console.log(data);
      this.$axios.post(this.CD_.qj_url + "user/pageList", data).then(res => {
        console.log(res);
        this.tableData = res.data.data.pageInfo.list;
      });
    },
    addUsers() {
      //添加用户
      this.dialogFormVisible = true;
    },
    _save() {
      // 弹窗确定按钮
      let data = {
        nickname: this.form.nickname,
        account: this.form.account,
        deptId: this.form.deptId,
        roleId: this.form.roleId
      };
      console.log(data);
      this.$axios
        .post(this.CD_.qj_url + "user/addUserMenger", data)
        .then(res => {
          this.$notify({
            title: "成功",
            message: "操作成功",
            type: "success"
          });
          this.reload();
        });
      this.form = "";
      this.dialogFormVisible = false;
    },
    handleDelete(index, row) {
      //删除
      this.form = row;
      this.$axios
        .get(this.CD_.qj_url + "user/deleteMenger", {
          params: {
            id: this.form.Id
          }
        })
        .then(res => {
          this.tableData.splice(index, 1);
        });
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success"
      });
    },
    //分页
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
    },
    changeSwitch(index, row) {
      console.log(row);
      if (row.on) {
        this.$confirm("是否解冻", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$axios
              .get(this.CD_.qj_url + "user/freezeMenger", {
                params: {
                  id: row.Id
                }
              })
              .then(res => {});
            row.on = true;
          })
          .catch(() => {
            row.on = false;
          });
      } else {
        this.$confirm("是否冻结？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            console.log(data);
            this.$axios
              .get(this.CD_.qj_url + "user/unfreezeMenger", {
                params: {
                  id: row.Id
                }
              })
              .then(res => {});
            row.on = false;
          })
          .catch(() => {
            row.on = true;
          });
      }
    },
    handleChange(index, row) {
      this.$router.push({ path: "/userChange", query: row });
    },
    handleReset(index, row) {
      this.$confirm("是否重置密码?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .get(this.CD_.qj_url + "user/czMenger", {
              params: {
                account: row.account
              }
            })
            .then(res => {});
          this.$message({
            type: "success",
            message: "重置成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消重置"
          });
        });
    }
  },

  async created() {
    this.getList();
    this.handleNodeClick();
    this.handleNodeClick1();
  }
};
</script>
<style lang='scss' scoped>
.userManagement {
  .theader {
    margin: 20px 15px;
    .bread {
      font-size: 18px;
      font-family: 楷体;
    }
  }
  .container {
    margin: 20px 0 20px 50px;
  }
  .adduser {
    padding-left: 30%;
  }
  .panation {
    margin: 20px 0 0 50px;
  }
}
</style>
