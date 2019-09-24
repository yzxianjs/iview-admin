<template>
  <div class="dictionaryManagement" style="margin: 92px 15px">
    <div class="theader">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>字典管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <hr />
    <div class="container">
      <el-input  style="width: 260px;margin-right:10px" v-model="tableDataName" clearable placeholder="请输入类型名称" ></el-input>
      <!-- <el-select v-model="options.value" placeholder="状态" style="margin:0 15px">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" style="width:300px" ></el-option>  
      </el-select> -->
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      <el-button style="margin: 0 30px;" type="primary" icon="el-icon-plus"  @click="addDict" >添加类型</el-button>
      <el-button style="margin-left: 10px;" type="info" icon="el-icon-arrow-left" plain @click="returnList">返回列表</el-button>
    </div>
    <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"  border>
      <el-table-column prop="tname" label="类型名称" align="center">
        <!-- <template slot-scope="scope">
          <router-link to="/dictInfo">{{ scope.row.tname}}</router-link>
        </template> -->
      </el-table-column>
      <el-table-column prop="tcode" label="类型编码" align="center"></el-table-column>
      <el-table-column prop="tsystem_flag" label="是否是系统字典" align="center">
        <template slot-scope="scope">
          {{scope.row.tsystem_flag==Y?"是":"否"}}
        </template>
      </el-table-column>
      <el-table-column prop="tdescription" label="字典描述" align="center"></el-table-column>
      <el-table-column align="center" prop="tstatus" label="状态">
        <template slot-scope="scope">
          {{scope.row.tstatus==true?"正常":"禁用"}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleAdd(scope.$index, scope.row)">添加基础字典</el-button>
          <el-button size="mini" @click="handleChange(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="panation">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <!-- 添加弹窗 -->

    <el-dialog title="添加字典类型" :visible.sync="dialogFormVisible" center>
      <div class="adduser">


        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-form">



          <el-form-item label="名称" prop="tname">
            <el-input v-model="form.tname" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="类型编码" prop="tcode">
            <el-input v-model="form.tcode" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="系统字典" prop="tsystem_flag">
            <el-select v-model="form.tsystem_flag" placeholder="请选择" style="width:300px">
              <el-option  v-for="(item, index) in options1" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="字典描述" prop="tdescription">
            <el-input v-model="form.tdescription" autocomplete="off" style="width:300px"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="tstatus">
            <el-select v-model="form.tstatus" placeholder="状态" style="width:300px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <!-- <el-input v-model="form.tstatus" autocomplete="off" style="width:300px"></el-input> -->
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="_save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dictionaryManagement",
  inject: ["reload"],
  data() {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      currentPage: 1,
      tableDataName: "",
      totalItems: 0,
      pagesize: 10,
      tableData: [],
      options: [
        { value: "true", label: "正常" },
        { value: "false", label: "禁用" }
      ],
      options1: [
        { value: "Y", label: "是" },
        { value: "N", label: "否" }
      ],
      form: {
        tname: "",
        tcode: "",
        tsystem_flag: "",
        tdescription: "",
        open: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
        lxbm: [
          { required: true, message: "请输入类型编码", trigger: "change" }
        ],
        isZd: [{ required: true, message: "请选择字典类型", trigger: "change" }]
      }
    };
  },
  methods: {
    getList() {
      this.$axios.post(this.CD_.qj_url + "dict/getdictTypePage").then(res => {
        console.log(res)
        this.tableData = res.data.data.pageInfo.list;
      });
    },
    search() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      let data = {
        tname: this.tableDataName,
      };
      console.log(data);
      this.$axios.post(this.CD_.qj_url + "dict/getDictList", data).then(res => {
        console.log(res);
        this.tableData = res.data.data.pageInfo.list;
      });
      (this.tableDataName = "")
    },
    addDict(){ // 添加字典
      this.dialogFormVisible = true;
    },
    _save(){
      // 弹窗确定按钮
      let data = {
        name: this.form.tname,
        code: this.form.tcode,
        systemFlag: this.form.tsystem_flag,
        description: this.form.tdescription,
        status: this.form.status
      };
      console.log(data);
      this.$axios
        .post(this.CD_.qj_url + "dict/adddict", data)
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
    handleAdd(index, row){
      this.$router.push({ path: "/dictInfo", query: row });
    },
    handleChange(index, row){
      this.$router.push({ path: "/dictChange", query: row });
    },
    handleDelete(index, row) {
      //删除
      this.$axios
        .get(this.CD_.qj_url + "dict/delete", {
          params: {
            id: row.tdictTypeId
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
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
    },
    returnList() {
      this.getList();
    },
  },
  async created() {
    // this.getList();
  },
  mounted(){
    this.getList();
  }
};
</script>

<style lang='scss' scoped>
.dictionaryManagement {
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
    padding-left: 20%;
  }
  .panation {
    margin: 20px 0 0 50px;
  }
}
</style>
