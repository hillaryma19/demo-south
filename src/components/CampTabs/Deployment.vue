<template>
  <div class="container">
    <div class="pad-tp-10 pad-bt-10"><CampSelect></CampSelect></div>
    <DeployTree></DeployTree>
  </div>
</template>

<script>
const DeployTree = () => import("@/components/DeployTree/Index.vue");
import { facilityFindAll } from "@/api/facility.js";
export default {
  name: "PowerDeployment",
  components: { DeployTree },
  data() {
    return {
      tableHeight: 200,
      cp: 1,
      rows: 20,
      total: 0,
      loading: false,
      tableData: [
        {
          name: "设施1",
          address: "设施1设施1设施1设施1设施1",
        },
        {
          name: "设施2",
          address: "设施2设施2设施2设施2设施2",
        },
        {
          name: "设施3",
          address: "设施3设施3设施3设施3设施3",
        },
      ],
      dialogData: {
        dialogVisible: false,
      },
      drawerData: {
        drawerVisible: false,
        drawerHeight: 500,
        type: 2,
      },
      activeName: "1",
      treeData: [
        {
          label: "力量一级 1",
          children: [
            {
              label: "力量二级 1-1",
              children: [
                {
                  label: "力量三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 2",
          children: [
            {
              label: "力量二级 2-1",
              children: [
                {
                  label: "力量三级 2-1-1",
                },
              ],
            },
            {
              label: "力量二级 2-2",
              children: [
                {
                  label: "力量三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 3",
          children: [
            {
              label: "力量二级 3-1",
              children: [
                {
                  label: "力量三级 3-1-1",
                },
              ],
            },
            {
              label: "力量二级 3-2",
              children: [
                {
                  label: "力量三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      listData: [
        { id: 1, name: "康维尔240型“北京”号飞机" },
        { id: 2, name: "道格拉斯DC-3/C-47型飞机" },
        { id: 3, name: "里-2型飞机" },
        { id: 4, name: "伊尔-12型飞机" },
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
        let wrapperInner2 = this.$refs.wrapperInner2;
        if (wrapperInner2) {
          let innerHeight = wrapperInner2.offsetHeight,
            tHeight = 200;
          if (innerHeight) {
            this.drawerData.drawerHeight = innerHeight - 4;
            tHeight = parseFloat(innerHeight / 2) - 90;
            tHeight < 0
              ? (this.tableHeight = 200)
              : (this.tableHeight = tHeight);
            console.log(this.tableHeight, "==this.tableHeight333", innerHeight);
          }
        }
      });
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    getDrawerInfo() {
      this.drawerData.drawerVisible = false;
    },
    handleNodeClick(data) {
      if (!data.children) {
        this.drawerData.drawerVisible = true;
      }
    },
    handleTabClick(tab) {
      this.activeName = tab.name;
      console.log(tab);
    },
    // 点击部署
    handleDeploy(data) {
      console.log(data, "==999");
      this.dialogData.dialogVisible = true;
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
.container {
  width: 100%;
  height: 100%;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    .tabs-box {
      position: absolute;
      left: 0;
      top: 0;
      background: #fff;
      padding: 0 0 4px 0;
    }
    .left {
      width: 280px;
      height: 100%;
      .tree-box {
        height: 50%;
        overflow-y: auto;
        padding-bottom: 10px;
      }
      .facility-box {
        // flex: 1;
        border-top: 1px solid #dcdfe6;
        height: 50%;
        overflow-y: auto;
      }
    }
  }
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
