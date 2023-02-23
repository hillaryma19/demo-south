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
              <div
                class="deploy-btn"
                draggable
                @dragstart="onDragStart($event, scope.row)"
                @dragend="onDragEnd($event)"
              >
                部署
              </div>
              <!-- <el-button type="primary" size="mini" plain>部署</el-button> -->
              <!-- @click="handleDeploy(scope.row)" -->
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
import mapFuns from "@/utils/map/js/map-funs.js";
const locationImg = require("@/assets/img/location.png");
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
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      dragData: {},
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
    onDragStart(event, item) {
      // event.dataTransfer.setData("currentId", item.id);
      event.dataTransfer.setData("currentName", item.name);
      this.dragData = item;
    },
    onDragEnd(evt) {
      const event = evt;
      const eX = event.clientX;
      const eY = event.clientY;
      const target = event.target;
      const tx = target.offsetWidth + target.offsetLeft;
      const ty = target.offsetHeight + target.offsetTop;
      const x = eX - tx;
      const y = eY - ty - 50;
      // event.dataTransfer.setData("currentId", item.id);
      // const name = event.dataTransfer.getData("currentName");
      const coordinates = window.map.getCoordinateFromPixel([x, y]);
      console.log(event, coordinates, x, y, "==coordinates");
      mapFuns.addTextLayer(
        this.dragData.id,
        this.dragData.name,
        locationImg,
        coordinates,
        "facility"
      );
    },
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
