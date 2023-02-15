<template>
  <div class="wrapper">
    <div ref="top" class="top flex-between">
      <div>
        <el-button type="primary" size="small" @click="handleAdd(1)"
          >新建想定</el-button
        >
      </div>
      <div class="flex-end">
        <div class="search-box flex-start">
          <div class="search-title">想定名称：</div>
          <div>
            <el-input
              size="small"
              v-model="searchData.scenarioName"
              placeholder="请输入想定名称"
            ></el-input>
          </div>
        </div>
        <div class="search-box flex-start">
          <div class="search-title">推演状态：</div>
          <div>
            <el-select
              size="small"
              v-model="searchData.status"
              placeholder="请选择推演状态"
            >
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <el-button type="primary" size="small" @click="findFuzzy"
          >查询</el-button
        >
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
        label="想定名称"
        min-width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="state"
        label="推演状态"
        min-width="60"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <div class="s-status" :class="[`status_${scope.row.status}`]">
            {{ scope.row.state }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="explain"
        label="想定说明"
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
      <el-table-column label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button @click="editScenario(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="editScenario(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="removeScenario(scope.row)"
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
    <ScenarioAdd
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></ScenarioAdd>
  </div>
</template>

<script>
import {
  scenarioFindAll,
  scenarioFindFuzzy,
  scenarioRemove,
} from "@/api/scenario.js";
const ScenarioAdd = () => import("@/components/CampTabs/ScenarioAdd.vue");
export default {
  name: "OverviewPage",
  components: {
    ScenarioAdd,
  },
  data() {
    return {
      statusOptions: [
        {
          value: "1",
          label: "未开始",
        },
        {
          value: "2",
          label: "进行中",
        },
        {
          value: "3",
          label: "已完成",
        },
      ],
      tableHeight: 400,
      cp: 1,
      rows: 20,
      total: 0,
      loading: false,
      searchData: {
        scenarioName: "",
        status: "",
      },
      tableData: [
        {
          id: 1,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "进行中",
          status: 2,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "已完成",
          status: 3,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 3,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "未开始",
          status: 1,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 4,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "进行中",
          status: 2,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 5,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "进行中",
          status: 2,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 6,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "进行中",
          status: 2,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 7,
          dateTime: "2016-05-03",
          name: "王小虎",
          createUser: "王小虎",
          state: "进行中",
          status: 2,
          explain: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogData: {
        dialogVisible: false,
        dialogType: 1,
      },
    };
  },
  created() {
    // this.getListData();
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
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
      this.getListData();
    },
    // 点击添加
    handleAdd() {
      this.$router.push({ path: "/scenario/tab" });
      // this.dialogData.dialogVisible = true;
      // this.dialogData.dialogType = type;
    },
    editScenario(row) {
      console.log(row, "==row", row.name);
      // this.dialogData.id = row.id;
      // this.handleAdd(2);
      this.$router.push({
        path: "/scenario/tab",
        query: { id: row.id, name: row.name },
      });
    },
    removeScenario(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let params = {
            id: row.id,
          };
          scenarioRemove(params).then((res) => {
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
    handleClick(row) {
      this.$router.push({ path: "/scenario/tab", query: { id: row.name } });
      console.log(row);
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
    // 想定-查询所有想定
    getListData() {
      let params = {
        pageNum: this.cp,
        pageSize: this.rows,
      };
      scenarioFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
    //想定-模糊查询带分页
    findFuzzy() {
      let params = {
        inputStr: "",
        pageNum: this.cp,
        pageSize: this.rows,
      };
      scenarioFindFuzzy(params).then((res) => {
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
