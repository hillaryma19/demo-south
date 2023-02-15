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
            v-show="!isFold"
          >
            <el-container direction="vertical">
              <div class="left-title">环境部署</div>
              <div class="">
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
            v-show="!isFold"
          ></div>
          <div
            class="fold-box pointer"
            @click="handleLeftFold"
            :style="{ right: isFold ? `-20px` : `20px` }"
          >
            <el-tooltip
              class="item"
              effect="dark"
              :content="isFold ? '展开' : '折叠'"
              placement="top"
            >
              <i
                class="fold"
                :class="{
                  'el-icon-s-unfold': !isFold,
                  'el-icon-s-fold': isFold,
                }"
              ></i>
            </el-tooltip>
          </div>
        </div>
        <div class="right-container" v-if="currentComponent == 'FormationTree'">
          <Equip></Equip>
        </div>
      </div>
      <div
        class="bottom-container"
        ref
        :style="{ width: `${rightWidth}px` }"
        v-show="activeName == 5 || activeName == 6 || activeName == 7"
      >
        <div
          @mousedown="onVerticalMousedown"
          class="resize-line resize-line-y"
          :style="{ width: `${rightWidth}px` }"
          ref="verticalResize"
        ></div>
        <div
          class="bottom-component scroll-bar-style"
          ref="bottomPanel"
          :style="{ height: `${rightHeight}px` }"
        >
          <div class="flex-between">
            <GroupUser :active-name="activeName"></GroupUser>
            <GroupPower
              v-if="activeName == 5"
              :active-name="activeName"
            ></GroupPower>
            <GroupAuth
              v-if="activeName == 6"
              :active-name="activeName"
            ></GroupAuth>
            <GroupCommunicate
              v-if="activeName == 7"
              :active-name="activeName"
            ></GroupCommunicate>
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
      rightWidth: 420,
      rightHeight: 400,
      currentComponent: "FormationTree",
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
      leftPanelWidth: 500,
      isFold: false,
      isVerticalResize: false,
      verticalResizeY: {
        start: 0,
        end: 0,
      },
      splitterVerticalMoveY: 0,
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
        case "3":
          component = "FormationTree";
          break;
        case "4":
          component = "DeploymentTree";
          break;
        case "5":
          component = "GroupTree";
          break;
        case "6":
          component = "GroupTree";
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
        }
        if (leftTab) {
          this.leftTabWidth = leftTab.offsetWidth;
        }
        if (leftTree) {
          this.leftTreeWidth = leftTree.offsetWidth;
        }
        this.rightWidth =
          this.wrapperInnerWidth - this.leftTabWidth - this.leftTreeWidth;
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
        maxWidth = 1200,
        minWidth = 120;
      this.isHorizontalResize = false;
      this.leftPanelWidth = panelWidth + this.horizontalResizeX.end;
      if (this.leftPanelWidth > maxWidth) {
        this.leftPanelWidth = maxWidth;
      }
      if (this.leftPanelWidth < minWidth) {
        this.isFold = true;
        this.leftPanelWidth = minWidth;
      } else if (this.leftPanelWidth > minWidth) {
        this.isFold = false;
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
      let maxHeight = 800,
        minHeight = 120,
        bottomPanelDom = this.$refs.bottomPanel,
        bottomPanelHeight = bottomPanelDom.offsetHeight,
        delta = bottomPanelHeight - this.verticalResizeY.end;
      this.isVerticalResize = false;
      this.rightHeight = delta;
      if (this.rightHeight > maxHeight) {
        this.rightHeight = maxHeight;
      }
      if (this.rightHeight < minHeight) {
        this.rightHeight = minHeight;
      }
      this.onWindowResize();
      window.removeEventListener("mousemove", this.onVerticalResizeMove);
      window.removeEventListener("touchmove", this.onVerticalResizeMove);
      window.removeEventListener("mouseup", this.onVerticalResizeMouseup);
      window.removeEventListener("touchend", this.onVerticalResizeMouseup);
      window.removeEventListener("contextmenu", this.onVerticalResizeMouseup);
    },
    handleLeftFold() {
      this.isFold = !this.isFold;
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

      .left-container {
        position: relative;
        height: 100%;
        background-color: #fff;
        .left-component {
          height: 100%;
          padding: 0 12px;
        }
        .fold-box {
          position: absolute;
          top: 0;
          right: 28px;
          line-height: 32px;
          .fold {
            font-size: 18px;
            cursor: pointer;
            &:hover {
              opacity: 0.8;
            }
          }
        }
      }
      .right-container {
        flex: 1;
        height: 100%;
        padding: 0 12px 0 20px;
      }
    }
    .resize-line {
      position: absolute;
      background-color: #c0c4cc;
      z-index: 1;
    }
    .resize-line-x {
      right: -12px;
      top: 0;
      margin: 0 12px;
      width: 2px;
      height: 100%;
      cursor: w-resize;
    }
    .resize-line-y {
      right: 0;
      top: 0;
      height: 2px;
      cursor: n-resize;
    }
    .bottom-container {
      position: absolute;
      right: 0;
      bottom: 0;
      background-color: #fff;
      .bottom-component {
        overflow-y: auto;
        padding: 12px;
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
