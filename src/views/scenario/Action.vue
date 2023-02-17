<template>
  <div class="a-wrapper">
    <div class="pad-bt-10 flex-between" ref="pageTop">
      <el-button type="primary" size="small" @click="handleAdd">添加</el-button>
      <el-button type="info" size="small" plain @click="handleBack"
        >返回</el-button
      >
    </div>
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
      <el-table-column align="center" type="index" width="50">
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="date"
        label="开始点"
        min-width="60"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="name"
        label="目标经纬度"
        min-width="120"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="name"
        label="动作/条件"
        min-width="160"
      >
      </el-table-column>
      <el-table-column align="center" prop="name" label="类型" min-width="80">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title=""
            :width="scope.row.imgWidth"
            trigger="hover"
            content=""
            ><el-image
              class="type-img pointer"
              fit="contain"
              :src="scope.row.img"
              :style="{
                width: `${scope.row.imgWidth}px`,
                height: `${scope.row.imgHeight}px`,
              }"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <el-image
              slot="reference"
              class="type-img pointer"
              fit="contain"
              :src="scope.row.img"
              @load="handleImgLoad($event, scope.row)"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="name"
        label="时间值"
        min-width="140"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="name"
        label="备注"
        min-width="120"
      >
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)"
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
const peppaImg = require("@/assets/img/peppa.jpg");
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
          date: "(0,0)",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          img: peppaImg,
        },
        {
          date: "(0,0)",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          img: peppaImg,
        },
        {
          date: "(0,0)",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          img: peppaImg,
        },
        {
          date: "(0,0)",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          img: peppaImg,
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
    // 点击删除
    handleDel(row) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("确认删除");
        })
        .catch(() => {});
    },
    handleImgLoad(e, row) {
      let url = row.img,
        winWidth = window.innerWidth,
        winHeight = window.innerHeight,
        img = new Image();
      img.src = url;
      img.onload = () => {
        row.imgWidth = img.width;
        row.imgHeight = img.height;
        if (img.width > winWidth) {
          row.imgWidth = winWidth - 50;
        }
        if (img.height > winHeight) {
          row.imgHeight = winHeight - 50;
        }
      };
    },
    handleBack() {
      this.$router.push({ path: "/scenario/tab", query: { activeName: "5" } });
    },
  },
};
</script>
<style lang="scss" scoped>
.a-wrapper {
  width: 100%;
  height: 100%;
  padding: 10px;
  ::v-deep .el-table .cell.el-tooltip {
    height: 23px;
  }
  ::v-deep .type-img {
    width: 80px;
    height: 23px;
    .image-slot {
      background-color: #eee;
      width: 100%;
      height: 100%;
      i {
        font-size: 18px;
        line-height: 23px;
      }
    }
  }
}
</style>
