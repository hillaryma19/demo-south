<template>
  <div class="container">
    <div class="inner clearfix" ref="wrapperInner">
      <!-- 地图 -->
      <Map
        v-show="currentComponent != 'FormationTree'"
        :height="wrapperInnerHeight"
      ></Map>
      <!-- 左侧 -->
      <div class="left-tree flex-row" ref="leftTree" v-show="activeName != 5">
        <div class="left-container">
          <div
            class="left-component"
            ref="leftBox"
            :style="{ width: `${leftPanelWidth}px` }"
            v-show="!isLtFold"
          >
            <el-container direction="vertical" style="height: 100%">
              <!-- 左侧 title -->
              <div class="panel-tit-box pad-tp-10">
                <div class="panel-title flex-start">
                  <span class="line"></span><span>{{ leftTitle }}</span>
                </div>
              </div>
              <!-- 左侧 组件 -->
              <div class="" style="flex: 1">
                <component
                  :is="currentComponent"
                  :active-name="activeName"
                  @changeView="changeView"
                ></component>
              </div>
            </el-container>
          </div>
          <!-- x resize line -->
          <div
            @mousedown="onHorizontalMousedown"
            class="resize-line resize-line-x"
            ref="horizontalResize"
            v-show="!isLtFold"
          ></div>
          <!-- 左侧折叠icon -->
          <div
            class="fold-box pointer"
            @click="handleLeftFold"
            :style="{ right: isLtFold ? `-20px` : `10px` }"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="isLtFold ? '展开' : '折叠'"
              placement="top"
            >
              <i
                class="fold"
                :class="{
                  'el-icon-s-unfold': !isLtFold,
                  'el-icon-s-fold': isLtFold,
                }"
              ></i>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- 底部 -->
      <div
        class="bottom-container"
        ref
        :style="{ width: `${bottomPanelWidth}px` }"
        v-show="activeName != 1"
      >
        <div
          @mousedown="onVerticalMousedown"
          class="resize-line resize-line-y"
          :style="{ width: `${bottomPanelWidth}px` }"
          ref="verticalResize"
        ></div>
        <div
          class="bottom-component"
          ref="bottomPanel"
          :style="{ height: `${bottomPanelHeight}px` }"
        >
          <div class="bottom-inner">
            <div class="panel-tit-box flex-between">
              <div class="panel-title flex-start">
                <span class="line"></span>
                <span>{{ bottomPanelTitle }}</span>
              </div>
              <div class="fold-box2 pointer" @click="handleBottomFold">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="isBtFold ? '展开' : '折叠'"
                  placement="top"
                >
                  <i
                    class="fold"
                    :class="{
                      'el-icon-caret-bottom': !isBtFold,
                      'el-icon-caret-top': isBtFold,
                    }"
                  ></i>
                </el-tooltip>
              </div>
            </div>
            <div class="panel-content scroll-bar-style">
              <component
                :is="currentBottomComponent"
                :active-name="activeName"
                @changeView="changeView"
              ></component>
              <!-- <environment-details
                v-show="activeName == 2 || activeName == 6 || activeName == 7"
              ></environment-details>
              <deploy-details v-show="activeName == 4"></deploy-details>
              <plan v-show="activeName == 5"></plan> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
  </div>
</template>

<script>
import EnvironmentDetails from "@/components/CampTabs/EnvironmentDetails";
import DeployDetails from "@/components/CampTabs/DeployDetails";
const FormationTree = () => import("@/components/CampTabs/FormationTree.vue");
const DeploymentTree = () => import("@/components/CampTabs/DeploymentTree.vue");
const GroupPower = () => import("@/components/CampTabs/GroupPower.vue");
const GroupAuth = () => import("@/components/CampTabs/GroupAuth.vue");
const GroupCommunicate = () =>
  import("@/components/CampTabs/GroupCommunicate.vue");
const GroupUser = () => import("@/components/CampTabs/GroupUser.vue");
const Scheme = () => import("@/components/CampTabs/Scheme.vue");
const Plan = () => import("@/components/CampTabs/Plan.vue");
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const Map = () => import("@/components/Map/Index.vue");
const Environment = () => import("@/components/CampTabs/Environment.vue");
const GroupTree = () => import("@/components/CampTabs/GroupTree.vue");
const leftTitleArray = [
  "环境部署",
  "想定编程部署",
  // "想定部署",
  "想定编组",
  "计划任务",
];
const defaultLeftWidth = 300;
export default {
  name: "CampTab",
  components: {
    DeployDetails,
    EnvironmentDetails,
    PowerAdd,
    FormationTree,
    DeploymentTree,
    GroupTree,
    Scheme,
    Plan,
    Map,
    GroupPower,
    GroupUser,
    GroupCommunicate,
    GroupAuth,
    Environment,
  },
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  watch: {
    activeName(val) {
      if (val) {
        this.handleActiveName(val);
      }
    },
  },
  data() {
    return {
      leftTabWidth: 0,
      wrapperInnerWidth: 1000,
      wrapperInnerHeight: 1000,
      bottomPanelWidth: 420,
      bottomPanelHeight: 400,
      currentComponent: "Environment",
      currentBottomComponent: "EnvironmentDetails",
      dialogData: {
        dialogVisible: false,
      },
      drawerData: {
        drawerVisible: false,
        drawerHeight: 500,
        type: 1,
      },
      tabActive: "1",
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
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
      isDragging: false,
      isDragHover: false,
      isHorizontalResize: false,
      horizontalResizeX: {
        start: 0,
        end: 0,
      },
      splitterHorizontalMoveY: 0,
      splitterHorizontalMoveX: 0,
      leftPanelWidth: 300,
      isLtFold: false,
      isBtFold: false,
      isVerticalResize: false,
      verticalResizeY: {
        start: 0,
        end: 0,
      },
      splitterVerticalMoveY: 0,
      leftTitle: leftTitleArray[0],
      bottomPanelTitle: "实体属性编辑",
    };
  },
  created() {
    this.removeKeyEventListener();
    this.addKeyEventListener();
  },
  mounted() {
    const _this = this;
    setTimeout(() => {
      _this.$nextTick(() => {
        _this.handleActiveName(_this.activeName);
        window.onresize = () => {
          _this.handleActiveName(_this.activeName);
        };
      });
    }, 100);
  },
  methods: {
    handleActiveName(val) {
      console.log(val, "==vvv");
      let name = val,
        component = "";
      switch (name) {
        case "2":
          component = "Environment";
          this.leftTitle = leftTitleArray[0];
          this.leftPanelWidth = defaultLeftWidth;
          this.bottomPanelTitle = "实体属性编辑";
          this.currentBottomComponent = "EnvironmentDetails";
          break;
        case "3":
          component = "GroupTree";
          this.leftTitle = leftTitleArray[1];
          this.leftPanelWidth = defaultLeftWidth;
          this.bottomPanelTitle = "实体属性编辑";
          this.currentBottomComponent = "EnvironmentDetails";
          break;
        case "4":
          component = "GroupTree";
          this.leftPanelWidth = defaultLeftWidth;
          this.leftTitle = leftTitleArray[3];
          this.bottomPanelTitle = "编组详情";
          this.currentBottomComponent = "DeployDetails";
          break;
        case "5":
          component = "";
          this.leftTitle = leftTitleArray[4];
          this.leftPanelWidth = defaultLeftWidth;
          this.bottomPanelTitle = "计划任务";
          this.currentBottomComponent = "Plan";
          this.bottomPanelWidth = this.wrapperInnerWidth;
          break;
        // case "6":
        //   component = "GroupTree";
        //   this.leftTitle = leftTitleArray[1];
        //   this.leftPanelWidth = defaultLeftWidth;
        //   this.bottomPanelTitle = "实体属性编辑";
        //   this.currentBottomComponent = "EnvironmentDetails";
        //   break;
        // case "7":
        //   component = "DeploymentTree";
        //   this.leftTitle = leftTitleArray[2];
        //   this.leftPanelWidth = defaultLeftWidth;
        //   this.bottomPanelTitle = "实体属性编辑";
        //   this.currentBottomComponent = "EnvironmentDetails";
        //   break;
        default:
          break;
      }
      this.onWindowResize();
      this.currentComponent = component;
    },
    onDragStart(event) {
      this.isDragging = true;
      this.isDragHover = false;
      // console.log(event, "==onDragStart");
    },
    onDrop(event, node, data) {
      this.isDragging = false;
      this.isDragHover = false;
      // console.log(event, node, data, "==onDrop");
    },
    onDragOver(event) {
      event.preventDefault();
      this.isDragHover = true;
      // console.log(event, "==onDragOver");
    },
    onWindowResize() {
      this.$nextTick(() => {
        let leftTree = this.$refs.leftTree,
          wrapperInner = this.$refs.wrapperInner;
        if (wrapperInner) {
          this.wrapperInnerWidth = wrapperInner.offsetWidth;
          this.wrapperInnerHeight = wrapperInner.offsetHeight;
          this.drawerData.drawerHeight = this.wrapperInnerHeight;
          if (this.currentComponent == "Plan") {
            this.leftPanelWidth = this.wrapperInnerWidth - 8;
          }
        }
        if (leftTree) {
          this.leftTabWidth = leftTree.offsetWidth;
        }
        if (this.activeName == 5) {
          this.bottomPanelWidth = this.wrapperInnerWidth;
        } else {
          this.bottomPanelWidth =
            this.wrapperInnerWidth - this.leftTabWidth - 8;
        }
      });
    },
    // 点击添加
    handleAdd(data) {
      console.log(data, "=999");
      this.dialogData.dialogVisible = true;
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
      this.tabActive = tab.name;
      console.log(tab);
    },
    changeView(view, item) {
      console.log(view, item, "==view, item");
      this.currentComponent = view;
    },
    addKeyEventListener() {
      document.addEventListener("keydown", this.onKeydownEvent);
      document.addEventListener("keyup", this.onKeyupEvent);
    },
    removeKeyEventListener() {
      document.removeEventListener("keydown", this.onKeydownEvent);
      document.removeEventListener("keyup", this.onKeyupEvent);
    },
    // Horizontal resize
    onHorizontalMousedown(event) {
      event.preventDefault();
      this.onHorizontalResizeStart(event);
      window.addEventListener("mousemove", this.onHorizontalResizeMove);
      window.addEventListener("touchmove", this.onHorizontalResizeMove);
      window.addEventListener("mouseup", this.onHorizontalResizeMouseup);
      window.addEventListener("touchend", this.onHorizontalResizeMouseup);
      window.addEventListener("contextmenu", this.onHorizontalResizeMouseup);
    },
    onHorizontalResizeStart(event) {
      let resizeDom = this.$refs.horizontalResize;
      this.isHorizontalResize = true;
      this.horizontalResizeX.start =
        event.clientX + document.documentElement.scrollLeft;
      resizeDom.setCapture && resizeDom.setCapture();
      this.splitterHorizontalMoveX = this.horizontalResizeX.start;
      return false;
    },
    onHorizontalResizeMove(event) {
      if (this.isHorizontalResize) {
        let moveX = 0;
        moveX = event.clientX - this.horizontalResizeX.start || 0;
        this.horizontalResizeX.end = moveX;
        this.splitterHorizontalMoveX =
          event.clientX + document.documentElement.scrollLeft;
      }
    },
    onHorizontalResizeMouseup() {
      let leftPanelDom = this.$refs.leftBox,
        panelWidth = leftPanelDom.offsetWidth || 0,
        maxWidth = this.wrapperInnerWidth - 8,
        minWidth = 120;
      this.isHorizontalResize = false;
      this.leftPanelWidth = panelWidth + this.horizontalResizeX.end;
      if (this.leftPanelWidth > maxWidth) {
        this.leftPanelWidth = maxWidth;
      }
      if (this.leftPanelWidth < minWidth) {
        this.isLtFold = true;
        this.leftPanelWidth = minWidth;
      } else if (this.leftPanelWidth > minWidth) {
        this.isLtFold = false;
      }
      this.onWindowResize();
      window.removeEventListener("mousemove", this.onHorizontalResizeMove);
      window.removeEventListener("touchmove", this.onHorizontalResizeMove);
      window.removeEventListener("mouseup", this.onHorizontalResizeMouseup);
      window.removeEventListener("touchend", this.onHorizontalResizeMouseup);
      window.removeEventListener("contextmenu", this.onHorizontalResizeMouseup);
    },
    // Vertical resize
    onVerticalMousedown(event) {
      event.preventDefault();
      this.onVerticalResizeStart(event);
      window.addEventListener("mousemove", this.onVerticalResizeMove);
      window.addEventListener("touchmove", this.onVerticalResizeMove);
      window.addEventListener("mouseup", this.onVerticalResizeMouseup);
      window.addEventListener("touchend", this.onVerticalResizeMouseup);
      window.addEventListener("contextmenu", this.onVerticalResizeMouseup);
    },
    onVerticalResizeStart(event) {
      let resizeDom = this.$refs.verticalResize;
      this.isVerticalResize = true;
      this.verticalResizeY.start =
        event.clientY + document.documentElement.scrollTop;
      resizeDom.setCapture && resizeDom.setCapture();
      this.splitterVerticalMoveY = this.verticalResizeY.start;
      return false;
    },
    onVerticalResizeMove(event) {
      if (this.isVerticalResize) {
        let moveY = 0,
          clientY = event.clientY;
        moveY = event.clientY - this.verticalResizeY.start || 0;
        this.verticalResizeY.end = moveY;
        this.splitterVerticalMoveY = clientY;
      }
    },
    onVerticalResizeMouseup() {
      let maxHeight = this.wrapperInnerHeight,
        minHeight = 120,
        bottomPanelDom = this.$refs.bottomPanel,
        bottomPanelHeight = bottomPanelDom.offsetHeight,
        delta = bottomPanelHeight - this.verticalResizeY.end;
      this.isVerticalResize = false;
      this.bottomPanelHeight = delta;
      if (this.bottomPanelHeight > maxHeight) {
        this.bottomPanelHeight = maxHeight;
        this.isBtFold = true;
      }
      if (this.bottomPanelHeight < minHeight) {
        this.bottomPanelHeight = minHeight;
        this.isBtFold = false;
      }

      this.onWindowResize();
      window.removeEventListener("mousemove", this.onVerticalResizeMove);
      window.removeEventListener("touchmove", this.onVerticalResizeMove);
      window.removeEventListener("mouseup", this.onVerticalResizeMouseup);
      window.removeEventListener("touchend", this.onVerticalResizeMouseup);
      window.removeEventListener("contextmenu", this.onVerticalResizeMouseup);
    },
    handleLeftFold() {
      this.isLtFold = !this.isLtFold;
    },
    handleBottomFold() {
      this.isBtFold = !this.isBtFold;
      if (this.isBtFold) {
        this.bottomPanelHeight = 42;
      } else {
        this.bottomPanelHeight = this.wrapperInnerHeight - 12;
      }
    },
  },
  activated() {
    this.addKeyEventListener();
  },
  deactivated() {
    this.removeKeyEventListener();
  },
  destroyed() {
    this.removeKeyEventListener();
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  .inner {
    position: relative;
    height: 100%;
    width: 100%;
    .panel-tit-box {
      border-bottom: 1px solid #e4e7ed;
      .panel-title {
        line-height: 20px;
        padding-bottom: 8px;
        font-size: 14px;
        .line {
          width: 2px;
          height: 20px;
          margin-right: 5px;
          background-color: #409eff;
          border-radius: 2px;
        }
      }
    }
    .tabs-container {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 80px;
      background-color: #fff;
    }
    .left-tree {
      position: absolute;
      left: 0;
      top: 10px;
      height: calc(100% - 8px);
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      .left-container {
        position: relative;
        height: 100%;
        background-color: #fff;
        .left-component {
          height: 100%;
          padding: 0 10px;
        }
        .fold-box {
          position: absolute;
          top: 12px;
          right: 0;
          line-height: 20px;
        }
      }
    }
    .fold {
      font-size: 18px;
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    .resize-line {
      position: absolute;
      // background-color: #c0c4cc;
      background-color: transparent;
      z-index: 1;
    }
    .resize-line-x {
      right: -12px;
      top: 0;
      margin: 0 12px;
      width: 2px;
      height: 100%;
      cursor: col-resize;
    }
    .resize-line-y {
      right: 0;
      top: 0;
      height: 2px;
      cursor: row-resize;
    }
    .bottom-container {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #fff;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      .bottom-component {
        padding: 10px;
        .bottom-inner {
          position: relative;
          height: 100%;
          .panel-tit-box {
            position: absolute;
            left: 0;
            top: 0;
            z-index: 2;
            width: 100%;
            background-color: #fff;
          }
          .panel-content {
            padding-top: 40px;
            overflow-y: auto;
            height: 100%;
          }
        }
      }
    }
    ::v-deep .custom-tree-container {
      flex: 1;
      padding-right: 8px;
      .custom-tree-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        border: 1px dashed transparent;
      }
    }
    .drag-hover {
      border: 1px dashed #dcdfe6;
      border-radius: 4px;
    }
  }
  ::v-deep .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0;
    background-color: #fff;
  }
  ::v-deep .el-tabs--left {
    height: 100%;
    // .el-tabs__content {
    //   height: 100%;
    //   .el-tab-pane {
    //     height: 100%;
    //   }
    // }
  }
  .left {
    width: 280px;
    height: 100%;
  }
  .middle {
    flex: 1;
    height: 100%;
    border-left: 1px solid #dcdfe6;
    // border-right: 1px solid #dcdfe6;
    > ul {
      padding: 0 12px;
      li {
        line-height: 28px;
        padding-left: 4px;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #ebeef5;
        }
      }
    }
  }
}
</style>
