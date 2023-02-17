<template>
  <div class="e-wrapper pad-tp-10">
    <el-tabs class="tab-border-card" type="border-card">
      <el-tab-pane ref="tabpanel" label="设施模板"
        ><el-table
          :data="tableData"
          :height="tableHeight"
          :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
          border
          size="small"
          highlight-current-row
          tooltip-effect="dark"
          v-loading="loading"
          element-loading-text="加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="date"
            label="设施名称"
            min-width="70"
          >
          </el-table-column>
          <el-table-column
            align="center"
            show-overflow-tooltip
            prop="name"
            label="设施描述"
            min-width="70"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" min-width="50">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="mini"
                @click="handleDeploy(scope.row)"
                >部署</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pad-tp-10 ta-c">
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="cp"
            :page-size="rows"
            layout="prev, pager, next"
            :total="1000"
          >
          </el-pagination></div
      ></el-tab-pane>
      <el-tab-pane label="天气">天气</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "EnvironmentDeploy",
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
    };
  },
  mounted() {
    if (this.$refs.tabpanel) {
      this.$nextTick(() => {
        this.onWindowResize();
        window.onresize = () => {
          this.onWindowResize();
        };
      });
    }
  },
  methods: {
    onWindowResize() {
      this.$nextTick(() => {
        let tabpanel = this.$refs.tabpanel;
        if (tabpanel) {
          let tabpanelEl = this.$refs.tabpanel.$el;
          let tpHeight = tabpanelEl.offsetHeight;
          this.tableHeight = tpHeight - 42;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 点击部署
    handleDeploy(row) {},
  },
};
</script>
<style lang="scss" scoped>
.e-wrapper {
  height: 100%;
  ::v-deep .tab-border-card {
    box-shadow: none;
    height: calc(100% - 10px);
    .el-tabs__content {
      padding: 8px;
      height: calc(100% - 40px);
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
