<template>
  <div class="t-wrapper">
    <el-tabs v-model="activeName" @tab-click="handleTabClick" class="tabs-step">
      <el-tab-pane
        v-for="item in tabs"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      >
      </el-tab-pane>
    </el-tabs>
    <div class="content">
      <component
        :is="currentComponent"
        :active-name="activeName"
        @changeView="changeView"
      ></component>
    </div>
  </div>
</template>

<script>
const CampTab = () => import("./components/CampTab.vue");
const BasicInfoCamp = () => import("./components/BasicInfoCamp.vue");
export default {
  name: "TabPage",
  components: { CampTab, BasicInfoCamp },
  data() {
    return {
      currentComponent: "BasicInfoCamp",
      activeName: "1",
      currentName: "想定信息",
      tabs: [
        { id: "1", name: "想定信息" },
        { id: "2", name: "环境部署" },
        { id: "3", name: "想定部署/想定部署" },
        { id: "4", name: "编组编组" },
        { id: "5", name: "计划任务" },
      ],
    };
  },
  created() {
    console.log(3322);
  },
  methods: {
    handleTabClick(tab, type) {
      let name = tab.name,
        component = "";
      switch (name) {
        case "1":
          component = "BasicInfoCamp";
          break;
        case "2":
          component = "CampTab";
          break;
        case "3":
          component = "CampTab";
          break;
        case "4":
          component = "CampTab";
          break;
        case "5":
          component = "CampTab";
          break;
        default:
          break;
      }
      this.currentComponent = component;
      // console.log(tab, event);
    },
    changeView(view, item) {
      console.log(view, item, "==view, item");
      this.activeName = "2";
      this.currentComponent = view;
    },
  },
};
</script>
<style lang="scss" scoped>
.t-wrapper {
  height: 100%;
  .content {
    height: calc(100% - 90px);
  }
  ::v-deep .tabs-step {
    padding: 0 10px;
    .el-tabs__header {
      margin-bottom: 0px;
    }
  }
  .step-top {
    border-bottom: 1px solid #dcdfe6;
    .current-name {
      font-weight: 600;
      font-size: 15px;
    }
  }
  .component-box {
    height: calc(100% - 30px);
    padding-top: 10px;
  }
}
</style>
