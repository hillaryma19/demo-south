<template>
  <div class="wrapper">
    <div ref="top" class="top flex-between">
      <div>
        <el-button type="primary" size="small" @click="handleAdd(1)"
          >新建设施</el-button
        >
      </div>
      <div class="flex-end">
        <div class="search-box flex-start">
          <div class="search-title">设施名称：</div>
          <div>
            <el-input
              size="small"
              v-model="searchData.scenarioName"
              placeholder="请输入设施名称"
            ></el-input>
          </div>
        </div>
        <el-button type="primary" size="small">查询</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      :height="tableHeight"
      :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
      size="small"
      border
      highlight-current-row
      tooltip-effect="dark"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
    >
      <el-table-column
        prop="name"
        label="设施名称"
        min-width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="设施说明"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="createUser"
        label="创建人"
        min-width="70"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="dateTime"
        label="创建时间"
        min-width="120"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" min-width="90">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="editFacility(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="removeFacility(scope.row)"
            >删除</el-button
          >
        </template></el-table-column
      >
    </el-table>
    <!-- 分页 -->
    <div class="pagination-wrap" ref="paginationWrap">
      <el-pagination
        background
        size="small"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="cp"
        :page-sizes="[20, 30, 50, 100]"
        :page-size="rows"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <facility-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></facility-add>
  </div>
</template>

<script>
import { facilityFindAll, facilityRemove } from "@/api/facility.js";
const FacilityAdd = () => import("./components/FacilityAdd.vue");
export default {
  name: "FacilityList",
  components: {
    FacilityAdd,
  },
  data() {
    return {
      tableHeight: 400,
      cp: 1,
      rows: 20,
      total: 0,
      loading: false,
      searchData: {
        scenarioName: "",
      },
      tableData: [
        {
          id: 1,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 4,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 5,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 6,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 7,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          describe: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogData: {
        dialogVisible: false,
        dialogType: 1,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.onWindowResize();
      window.onresize = () => {
        this.onWindowResize();
      };
    });
  },
  methods: {
    getDialogInfo(params) {
      this.dialogData.dialogVisible = false;
      this.getListData();
      this.tableData.push({
        name: params.name,
        address: params.desc,
      });
    },
    // 点击添加
    handleAdd(type) {
      this.dialogData.dialogVisible = true;
      this.dialogData.dialogType = type;
    },
    handleClick(row) {
      console.log(row);
      this.dialogData.id = row.id;
      this.handleAdd(3);
    },
    //编辑
    editFacility(row) {
      this.dialogData.id = row.id;
      this.handleAdd(2);
    },
    //删除
    removeFacility(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          facilityRemove(params).then((res) => {
            console.log(res, "==res");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getListData();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    onWindowResize() {
      this.$nextTick(() => {
        let winHeight = window.innerHeight,
          topHeight = 0,
          paginationHeight = 50,
          headerHeight = 50;
        if (this.$refs.top) {
          topHeight = this.$refs.top.offsetHeight;
        }
        this.tableHeight =
          winHeight - topHeight - 30 - headerHeight - paginationHeight;
      });
    },
    handleSizeChange(val) {
      this.rows = val;
      this.getListData();
    },
    handleCurrentChange(val) {
      this.cp = val;
      this.getListData();
    },
    getListData() {
      let params = {
        scenarioId: "",
      };
      facilityFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .top {
    padding-bottom: 10px;
  }
}
</style>
