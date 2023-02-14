<template>
  <div class="container" ref="container">
    <div class="pad-bt-10 flex-between" ref="top">
      <el-button size="small" type="primary" @click="handleAdd(1)"
        >新建</el-button
      >
    </div>
    <div class="list">
      <el-table
        :data="tableData"
        :height="tableHeight"
        :header-cell-style="{ background: '#f5f7fa', color: '#94969A' }"
        size="small"
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
        <el-table-column prop="taskTitle" label="任务标题" min-width="120">
        </el-table-column>
        <el-table-column
          prop="taskContent"
          label="任务内容"
          min-width="180"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" min-width="120">
        </el-table-column>
        <el-table-column prop="endTime" label="结束时间" min-width="120">
        </el-table-column>
        <el-table-column prop="marshalName" label="执行编组" min-width="120">
        </el-table-column>
        <el-table-column
          prop="target"
          label="目标"
          min-width="120"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作"
          ><template slot-scope="scope">
            <el-button type="text" size="small" @click="handleAdd(2, scope.row)"
              >编辑</el-button
            >
            <el-button type="text" size="small" @click="handleDel(scope.row)"
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
    </div>
    <scheme-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></scheme-add>
  </div>
</template>

<script>
import { schemeRemove, schemeFindAll } from "@/api/scenario.js";
const SchemeAdd = () => import("@/components/CampTabs/SchemeAdd.vue");
export default {
  name: "SchemeFormulation",
  components: { SchemeAdd },
  data() {
    return {
      tableHeight: 400,
      cp: 1,
      rows: 20,
      total: 0,
      dialogData: {
        dialogVisible: false,
        dialogType: 1,
      },
      loading: false,
      tableData: [
        {
          taskTitle: "方案1",
          taskContent: "方案1方案1方案1方案1",
          marshalId: "",
          marshalName: "编组1",
          daterange: "",
          startTime: "2023-01-11",
          endTime: "2023-01-12",
          target: "--",
        },
        {
          taskTitle: "方案1",
          taskContent: "方案1方案1方案1方案1",
          marshalId: "",
          marshalName: "编组2",
          daterange: "",
          startTime: "2023-01-11",
          endTime: "2023-01-12",
          target: "--",
        },
        {
          taskTitle: "方案1",
          taskContent: "方案1方案1方案1方案1",
          marshalId: "",
          marshalName: "编组33",
          daterange: "",
          startTime: "2023-01-11",
          endTime: "2023-01-12",
          target: "--",
        },
        {
          taskTitle: "方案1",
          taskContent: "方案1方案1方案1方案1",
          marshalId: "",
          marshalName: "编组33",
          daterange: "",
          startTime: "2023-01-11",
          endTime: "2023-01-12",
          target: "--",
        },
      ],
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
        let winHeight = window.innerHeight,
          topHeight = 0,
          paginationHeight = 50,
          headerHeight = 50;
        if (this.$refs.top) {
          topHeight = this.$refs.top.offsetHeight;
        }
        this.tableHeight =
          winHeight - topHeight - 60 - headerHeight - paginationHeight;
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
      schemeFindAll(params).then((res) => {
        console.log(res, "==099");
      });
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    // 点击添加
    handleAdd() {
      this.dialogData.dialogVisible = true;
    },
    // 点击删除
    handleDel(row) {
      console.log(row, "=666 row");
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          schemeRemove({ id: row.id }).then((res) => {
            console.log(res, "==res");
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
}
</style>
