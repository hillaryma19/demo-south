<template>
  <div class="container">
    <div class="inner clearfix" ref="wrapperInner">
      <Map
        v-show="currentComponent != 'FormationTree'"
        :height="drawerData.drawerHeight"
      ></Map>
      <div
        class="left-tree flex-row"
        ref="leftTree"
        :style="{ left: `${leftTabWidth}px` }"
      >
        <div class="left-container">
          <div
            class="left-component"
            ref="leftBox"
            :style="{ width: `${leftPanelWidth}px` }"
            v-show="!isLtFold"
          >
            <el-container direction="vertical" style="height: 100%">
              <div class="panel-tit-box pad-tp-10">
                <div class="panel-title flex-start">
                  <span class="line"></span><span>{{ leftTitle }}</span>
                </div>
              </div>
              <div class="" style="flex: 1">
                <component
                  :is="currentComponent"
                  :active-name="activeName"
                  @changeView="changeView"
                ></component>
              </div>
            </el-container>
          </div>
          <div
            @mousedown="onHorizontalMousedown"
            class="resize-line resize-line-x"
            ref="horizontalResize"
            v-show="!isLtFold"
          ></div>
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
      <div
        class="bottom-container"
        ref
        :style="{ width: `${bottomPanelWidth}px` }"
        v-show="activeName == 2 || activeName == 3 || activeName == 4"
      >
        <div
          @mousedown="onVerticalMousedown"
          class="resize-line resize-line-y"
          :style="{ width: `${bottomPanelWidth}px` }"
          ref="verticalResize"
        ></div>
        <div
          class="bottom-component scroll-bar-style"
          ref="bottomPanel"
          :style="{ height: `${bottomPanelHeight}px` }"
        >
          <div class="bottom-inner">
            <div class="panel-tit-box flex-between">
              <div class="panel-title flex-start">
                <span class="line"></span><span>{{ bottomPanelTitle }}</span>
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
          </div>
        </div>
      </div>
    </div>
    <right-panel
      :drawer-data="drawerData"
      @handleDrawerInfo="getDrawerInfo"
    ></right-panel>
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
  </div>
</template>

<script>
const FormationTree = () => import("@/components/CampTabs/FormationTree.vue");
const DeploymentTree = () => import("@/components/CampTabs/DeploymentTree.vue");
const GroupTree = () => import("@/components/CampTabs/GroupTree.vue");
const GroupPower = () => import("@/components/CampTabs/GroupPower.vue");
const GroupAuth = () => import("@/components/CampTabs/GroupAuth.vue");
const GroupCommunicate = () =>
  import("@/components/CampTabs/GroupCommunicate.vue");
const GroupUser = () => import("@/components/CampTabs/GroupUser.vue");
const Scheme = () => import("@/components/CampTabs/Scheme.vue");
const Plan = () => import("@/components/CampTabs/Plan.vue");
const RightPanel = () => import("@/components/RightPanel/Index.vue");
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const Map = () => import("@/components/Map/Index.vue");
const Equip = () => import("@/components/Equip/Index.vue");
const Environment = () => import("@/components/CampTabs/Environment.vue");
const leftTitleArray = [
  "环境部署",
  "想定编程/想定部署",
  "想定编组",
  "计划任务",
];
export default {
  name: "PowerFormation",
  components: {
    RightPanel,
    PowerAdd,
    FormationTree,
    DeploymentTree,
    GroupTree,
    Scheme,
    Plan,
    Map,
    Equip,
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
      leftTreeWidth: 500,
      wrapperInnerWidth: 1000,
      wrapperInnerHeight: 1000,
      bottomPanelWidth: 420,
      bottomPanelHeight: 400,
      currentComponent: "Environment",
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
    console.log(999);
  },
  mounted() {
    this.$nextTick(() => {
      // this.onWindowResize();
      this.handleActiveName(this.activeName);
      window.onresize = () => {
        // this.onWindowResize();
        this.handleActiveName(this.activeName);
      };
    });
  },
  methods: {
    handleActiveName(val) {
      let name = val,
        component = "";
      switch (name) {
        case "2":
          component = "Environment";
          this.leftTitle = leftTitleArray[0];
          break;
        case "3":
          component = "Environment";
          this.leftTitle = leftTitleArray[1];
          break;
        case "4":
          component = "DeploymentTree";
          this.leftTitle = leftTitleArray[2];
          break;
        case "5":
          component = "GroupTree";
          this.leftTitle = leftTitleArray[3];
          break;
        case "6":
          component = "GroupTree";
          this.leftTitle = leftTitleArray[4];
          break;
        case "7":
          component = "GroupTree";
          break;
        case "8":
          component = "Scheme";
          break;
        case "9":
          component = "Plan";
          break;

        default:
          break;
      }
      this.currentComponent = component;
      this.onWindowResize();
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
        let wrapperInner = this.$refs.wrapperInner,
          leftTab = this.$refs.tabsContainer,
          leftTree = this.$refs.leftTree;

        if (wrapperInner) {
          this.drawerData.drawerHeight = wrapperInner.offsetHeight - 4;
          this.wrapperInnerWidth = wrapperInner.offsetWidth;
          this.wrapperInnerHeight = wrapperInner.offsetHeight;
        }
        if (leftTab) {
          this.leftTabWidth = leftTab.offsetWidth;
        }
        if (leftTree) {
          this.leftTreeWidth = leftTree.offsetWidth;
        }
        this.bottomPanelWidth =
          this.wrapperInnerWidth - this.leftTabWidth - this.leftTreeWidth - 10;
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
      console.log(resizeDom, "==resizeDom");
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
        maxWidth = this.wrapperInnerWidth,
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
      height: calc(100% - 10px);
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
        overflow-y: auto;
        padding: 10px;
        .bottom-inner {
          height: 100%;
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
