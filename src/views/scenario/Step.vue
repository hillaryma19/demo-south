<template>
  <div class="wrapper">
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
    <!-- <div class="pad-bt-10 step-top">
      <div class="pad-bt-10">
        <ul class="flex-start">
          <li style="padding-right: 6px" v-for="tab in tabs" :key="tab.id">
            {{ tab.name }}
          </li>
        </ul>
      </div>
      <div class="flex-between">
        <div>
          <el-link
            v-if="activeName != 1"
            icon="el-icon-arrow-left"
            :underline="false"
            @click="handleTabClick(activeName, 1)"
            >上一步</el-link
          >
        </div>
        <div class="current-name">{{ currentName }}</div>
        <div>
          <el-link
            v-if="activeName != 9"
            :underline="false"
            @click="handleTabClick(activeName, 2)"
            >下一步<i class="el-icon-arrow-right"></i
          ></el-link>
        </div>
      </div>
    </div> -->
    <!-- <div class="component-box">
      <component
        :is="currentComponent"
        :active-name="activeName"
        @changeView="changeView"
      ></component>
    </div> -->
  </div>
</template>

<script>
const BasicInfo = () => import("./components/BasicInfo.vue");
const Camp = () => import("./components/Camp.vue");
const CampTab = () => import("./components/CampTab.vue");
export default {
  name: "StepPage",
  components: { BasicInfo, Camp, CampTab },
  data() {
    return {
      currentComponent: "BasicInfo",
      activeName: "1",
      currentName: "想定信息",
      tabs: [
        { id: "1", name: "想定信息" },
        { id: "2", name: "阵营管理" },
        { id: "3", name: "想定编程" },
        { id: "4", name: "想定部署" },
        { id: "5", name: "编组信息" },
        { id: "6", name: "指挥权限" },
        { id: "7", name: "通讯关系" },
        { id: "8", name: "方案制定" },
        { id: "9", name: "计划制定" },
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
      // let val = Number(tab),
      //   val2 = 0,
      //   val3 = "";
      // if (type == 1) {
      //   val2 = val - 1;
      // } else if (type == 2) {
      //   val2 = val + 1;
      // }
      // val3 = val2.toString();
      // this.activeName = val3;
      // this.tabs.forEach((item) => {
      //   if (item.id == val3) {
      //     this.currentName = item.name;
      //   }
      // });
      switch (name) {
        case "1":
          component = "BasicInfo";
          break;
        case "2":
          component = "Camp";
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
        case "6":
          component = "CampTab";
          break;
        case "7":
          component = "CampTab";
          break;
        case "8":
          component = "CampTab";
          break;
        case "9":
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
.content {
  height: calc(100% - 55px);
}
::v-deep .tabs-step {
  // height: 100%;
  > .el-tabs__content {
    // height: calc(100% - 40px);
    // .el-tab-pane {
    //   height: 100%;
    // }
  }
}
// ::v-deep .el-tabs--border-card {
//   height: 100%;
//   .el-tabs__content {
//     height: calc(100% - 40px);
//     .el-tab-pane {
//       height: 100%;
//     }
//   }
// }
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
</style>
