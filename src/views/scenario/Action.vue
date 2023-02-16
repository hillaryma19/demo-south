<template>
  <div class="a-wrapper">
    <div class="pad-bt-10" ref="pageTop">
      <el-button type="primary" size="mini" @click="handleAdd">添加</el-button>
    </div>
    <el-table
      :data="tableData"
      :height="tableHeight"
      :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
      size="mini"
      border
      align="center"
      highlight-current-row
      tooltip-effect="dark"
      v-loading="loading"
      element-loading-text="加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="date" label="开始点" min-width="60">
      </el-table-column>
      <el-table-column prop="name" label="设施描述" min-width="80">
      </el-table-column>
      <el-table-column label="操作" min-width="50">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleDeploy(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pad-tp-10 ta-c" ref="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="cp"
        :page-size="rows"
        layout="total, prev, pager, next"
        :total="1000"
      >
      </el-pagination>
    </div>
    <action-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></action-add>
  </div>
</template>

<script>
const ActionAdd = () => import("./components/ActionAdd.vue");
export default {
  components: { ActionAdd },
  data() {
    return {
      loading: false,
      cp: 1,
      rows: 20,
      tableHeight: 200,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
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
    onWindowResize() {
      this.$nextTick(() => {
        let pageTop = this.$refs.pageTop,
          pagination = this.$refs.pagination,
          ptHeight = 0,
          pHeight = 0,
          winHeight = window.innerHeight;
        if (pageTop) {
          ptHeight = pageTop.offsetHeight;
        }
        if (pagination) {
          pHeight = pagination.offsetHeight;
        }
        this.tableHeight = winHeight - ptHeight - pHeight - 70;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击添加
    handleAdd() {
      this.dialogData.dialogVisible = true;
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.a-wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
