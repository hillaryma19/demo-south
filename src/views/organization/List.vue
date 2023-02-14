<template>
  <div class="wrapper">
    <div ref="top" class="top flex-between">
      <div>
        <el-button type="primary" size="small" @click="handleAdd"
          >新建体系</el-button
        >
      </div>
      <div class="flex-end">
        <div class="search-box flex-start">
          <div class="search-title">体系名称：</div>
          <div>
            <el-input
              size="small"
              v-model="searchData.scenarioName"
              placeholder="请输入体系名称"
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
        label="体系名称"
        min-width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="体系说明"
        min-width="200"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作" min-width="90">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="editMarshal(row.id)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="removeMarshal(row.id)"
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
    <group-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></group-add>
  </div>
</template>

<script>
import { marshalFindAll, marshalRemove } from "@/api/marshal";

const GroupAdd = () => import("./components/GroupAdd.vue");
export default {
  name: "OrganizationList",
  components: {
    GroupAdd,
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
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],
      dialogData: {
        dialogVisible: false,
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
    handleAdd() {
      this.dialogData.dialogVisible = true;
    },
    handleClick(row) {
      console.log(row);
    },
    //编辑
    editMarshal(row) {
      this.dialogData.id = row.id;
      this.dialogData.dialogVisible = true;
    },
    //删除
    removeMarshal(row) {
      let params = {
        id: row.id,
      };
      marshalRemove(params).then((res) => {
        console.log(res, "==099");
      });
      this.getListData();
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
      marshalFindAll(params).then((res) => {
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
