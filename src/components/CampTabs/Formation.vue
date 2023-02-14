<template>
  <div class="container">
    <div class="inner" ref="wrapperInner">
      <el-container style="height: 100%">
        <div class="left-container">
          <div
            class="left-f scroll-bar-style"
            ref="leftBox"
            :style="{ width: `${leftPanelWidth}px` }"
            v-show="!isFold"
          >
            <div class="pad-bt-10 flex-between">
              <el-button size="small" type="primary" @click="handleAdd(1)"
                >创建力量编程</el-button
              >
            </div>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              default-expand-all
            >
              <div class="custom-tree-container" slot-scope="{ node, data }">
                <div
                  class="custom-tree-box"
                  @drop="onDrop($event, node, data)"
                  @dragover="onDragOver($event, node, data)"
                  @dragleave="onDragLeave($event, node, data)"
                >
                  <div @click="handleNodeClick(data)">
                    <span
                      class="tree-label text-ellipsis line-clamp-1"
                      v-if="!data.children"
                      >{{ node.label }}</span
                    >
                    <span
                      class="tree-label text-ellipsis line-clamp-1"
                      v-else
                      >{{ node.label }}</span
                    >
                  </div>
                  <span v-if="data.flag != 2">
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleAdd(1, node, data)"
                    >
                      创建
                    </el-button>
                    <!-- <el-button
                    type="text"
                    size="small"
                    @click="() => handleAdd(2, node, data)"
                  >
                    编辑
                  </el-button> -->
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleDel(node, data)"
                    >
                      删除
                    </el-button>
                  </span>
                  <span v-if="data.flag == 2">
                    <el-button
                      type="text"
                      size="small"
                      @click="() => handleDel(node, data)"
                    >
                      删除
                    </el-button>
                  </span>
                </div>
              </div></el-tree
            >
          </div>
          <div
            @mousedown="onHorizontalMousedown"
            class="resize-line"
            ref="horizontalResize"
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
        <div class="middle-f">
          <ul class="scroll-bar-style">
            <li
              class="move"
              draggable
              v-for="(item, index) in listData"
              @dragstart="onDragStart($event, item)"
              @click.stop="onItemClick(item, index)"
              :key="item.id"
              :class="{ active: item.selected }"
            >
              {{ item.label }}
            </li>
          </ul>
        </div>
      </el-container>
    </div>
    <right-panel
      :drawer-data="drawerData"
      @handleDrawerInfo="getDrawerInfo"
    ></right-panel>
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
    <formation-add
      :dialog-data="formationDialogData"
      @handleDialogInfo="getFormationDialogInfo"
    ></formation-add>
    <!-- 装备数量 -->
    <model-add
      :dialog-data="modelDialogData"
      @handleDialogInfo="getModelDialogInfo"
    ></model-add>
  </div>
</template>

<script>
import { scenarioPowerRemove } from "@/api/scenario.js";
const RightPanel = () => import("@/components/RightPanel/Index.vue");
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const FormationAdd = () => import("@/components/CampTabs/FormationAdd.vue");
const ModelAdd = () => import("@/components/CampTabs/ModelAdd.vue");
import { isMac, isWindows } from "@/utils/util.js";
export default {
  name: "PowerFormation",
  components: { RightPanel, PowerAdd, FormationAdd, ModelAdd },
  data() {
    return {
      atMac: false,
      atWindows: false,
      isCtrl: false,
      isShift: false,
      formationDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      modelDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      dialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      drawerData: {
        drawerVisible: false,
        drawerHeight: 500,
        type: 3,
      },
      activeName: "1",
      treeData: [
        {
          label: "力量一级 1",
          flag: 1,
          children: [
            {
              label: "力量二级 1-1",
              flag: 1,
              children: [
                {
                  label: "力量三级 1-1-1",
                  flag: 1,
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 2",
          flag: 1,
          children: [
            {
              label: "力量二级 2-1",
              flag: 1,
              children: [
                {
                  label: "力量三级 2-1-1",
                  flag: 1,
                },
              ],
            },
            {
              label: "力量二级 2-2",
              flag: 1,
              children: [
                {
                  label: "力量三级 2-2-1",
                  flag: 1,
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 3",
          flag: 1,
          children: [
            {
              label: "力量二级 3-1",
              flag: 1,
              children: [
                {
                  label: "力量三级 3-1-1",
                  flag: 1,
                },
              ],
            },
            {
              label: "力量二级 3-2",
              flag: 1,
              children: [
                {
                  label: "力量三级 3-2-1",
                  flag: 1,
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
        { id: 1, label: "康维尔240型“北京”号飞机", selected: false, flag: 2 },
        { id: 2, label: "道格拉斯DC-3/C-47型飞机", selected: false, flag: 2 },
        { id: 3, label: "里-2型飞机", selected: false, flag: 2 },
        { id: 4, label: "伊尔-12型飞机", selected: false, flag: 2 },
      ],
      isDragging: false,
      isDragHover: false,
      currentTreeData: {},
      dropEvent: {},
      isHorizontalResize: false,
      horizontalResizeX: {
        start: 0,
        end: 0,
      },
      splitterHorizontalMoveY: 0,
      splitterHorizontalMoveX: 0,
      leftPanelWidth: 500,
      isFold: false,
    };
  },
  created() {
    this.atWindows = isWindows();
    this.atMac = isMac();
    this.removeKeyEventListener();
    this.addKeyEventListener();
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
    onKeydownEvent(e) {
      const _this = this;
      const event = e || event || window.event;
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 16:
          _this.isShift = true;
          break;
        case 17:
          if (_this.atWindows) _this.isCtrl = true;
          break;
        case 91:
          if (_this.atMac) _this.isCtrl = true;
          break;
      }
    },
    onKeyupEvent(e) {
      const _this = this;
      const event = e || event || window.event;
      const keyCode = event.keyCode;
      switch (keyCode) {
        case 16:
          _this.isShift = false;
          break;
        case 17:
          if (_this.atWindows) _this.isCtrl = false;
          break;
        case 91:
          if (_this.atMac) _this.isCtrl = false;
          break;
      }
    },
    addKeyEventListener() {
      document.addEventListener("keydown", this.onKeydownEvent);
      document.addEventListener("keyup", this.onKeyupEvent);
    },
    removeKeyEventListener() {
      document.removeEventListener("keydown", this.onKeydownEvent);
      document.removeEventListener("keyup", this.onKeyupEvent);
    },
    onItemClick(item, index) {
      if (!this.isCtrl && !this.isShift) {
        this.listData.forEach((data) => {
          if (data.id != item.id) data.selected = false;
        });
        item.selected = !item.selected;
        this.$set(this.listData, index, item);
      }
      if (this.isCtrl) {
        item.selected = !item.selected;
        this.$set(this.listData, index, item);
      }
      if (this.isShift) {
        const len = this.listData.length;
        let resultIndex = -1;
        for (let i = len - 1; i > -1; i--) {
          if (this.listData[i].selected) {
            resultIndex = i;
            break;
          }
        }
        if (resultIndex < index) {
          for (let i = resultIndex; i <= index; i++) {
            this.listData[i].selected = true;
            this.$set(this.listData, i, this.listData[i]);
          }
        } else {
          for (let i = index; i <= resultIndex; i++) {
            this.listData[i].selected = true;
            this.$set(this.listData, i, this.listData[i]);
          }
        }
      }
      this.$forceUpdate();
    },
    onDragStart(event, item) {
      this.isDragging = true;
      this.isDragHover = false;
      event.dataTransfer.setData("currentId", item.id);
      event.dataTransfer.setData("currentName", item.label);
      console.log(event, "==onDragStart");
    },
    onDrop(event, node, data) {
      console.log(node, data, "==node, data");
      this.modelDialogData.dialogVisible = true;
      this.modelDialogData.data = this.listData;
      this.currentTreeData = data;
      this.dropEvent = event;
      return;
      let obj = {
        label: event.dataTransfer.getData("currentName"),
        id: event.dataTransfer.getData("currentId"),
        flag: 2,
      };
      this.isDragging = false;
      this.isDragHover = false;
      this.$message({
        type: "success",
        message: "添加成功!",
      });
      event.target.style.background = "";
      // if (data.flag == 1 && !data.children) {
      //   this.$set(data, "children", []);
      //   this.$set(data, "isII", true);

      //   this.listData.forEach((item) => {
      //     if (item.selected) {
      //       data.children.push(item);
      //     }
      //   });
      // } else {
      //   if (data.isII) {
      //     this.listData.forEach((item) => {
      //       if (item.selected) {
      //         data.children.push(item);
      //       }
      //     });
      //   }
      // }
      this.listData.forEach((item) => {
        if (item.selected) {
          data.children.push(item);
        }
      });
      this.listData.forEach((item) => {
        item.selected = false;
      });
      this.$forceUpdate();
    },
    onDragOver(event) {
      event.preventDefault();
      this.isDragHover = true;
      event.target.style.background = "#ebeef5";
      // console.log(event, "==onDragOver");
    },
    onDragLeave(event) {
      event.preventDefault();
      this.isDragHover = false;
      event.target.style.background = "";
      // console.log(event, "==onDragLeave");
    },
    onWindowResize() {
      this.$nextTick(() => {
        let leftBox = this.$refs.leftBox;
        if (leftBox) {
          this.drawerData.drawerHeight = leftBox.offsetHeight - 4;
        }
      });
    },
    // 点击添加
    handleAdd(type, node, data) {
      console.log(node, data, "=999");
      this.formationDialogData.dialogVisible = true;
      this.formationDialogData.dialogType = type;
    },
    // 点击删除
    handleDel(node, data) {
      console.log(node, data, "=666");
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          scenarioPowerRemove({ id: data.id }).then((res) => {
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
    getModelDialogInfo() {
      console.log(this.currentTreeData, "==this.currentTreeData");
      this.modelDialogData.dialogVisible = false;
      this.listData.forEach((item) => {
        if (item.selected) {
          if (!this.currentTreeData.children) {
            this.currentTreeData.children = [];
            this.currentTreeData.children.push(item);
          }
        }
      });
      this.listData.forEach((item) => {
        item.selected = false;
      });
      this.dropEvent.target.style.background = "";
      this.$forceUpdate();
    },
    getFormationDialogInfo() {
      this.formationDialogData.dialogVisible = false;
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

    // Horizontal resize
    onHorizontalMousedown(event) {
      event.preventDefault();
      console.log(333);
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
      console.log(this.horizontalResizeX.end, "==this.horizontalResizeX.end");
    },
    onHorizontalResizeMouseup() {
      let leftPanelDom = this.$refs.leftBox,
        panelWidth = leftPanelDom.offsetWidth || 0,
        maxWidth = 800,
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
      window.removeEventListener("mousemove", this.onHorizontalResizeMove);
      window.removeEventListener("touchmove", this.onHorizontalResizeMove);
      window.removeEventListener("mouseup", this.onHorizontalResizeMouseup);
      window.removeEventListener("touchend", this.onHorizontalResizeMouseup);
      window.removeEventListener("contextmenu", this.onHorizontalResizeMouseup);
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
    height: 100%;
    width: 100%;
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
      // border: 1px dashed #dcdfe6;
      // border-radius: 4px;
      background-color: #c0c4cc;
    }
    .left-container {
      position: relative;
      padding-left: 10px;
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
    .left-f {
      width: 520px;
      height: 100%;
      padding-right: 12px;
    }
    .resize-line {
      position: absolute;
      width: 2px;
      height: 100%;
      background-color: #c0c4cc;
      margin: 0 12px;
      cursor: w-resize;
      right: -12px;
      top: 0;
      z-index: 1;
    }
    .middle-f {
      flex: 1;
      height: 100%;
      padding: 0 12px 0 20px;
      // border-left: 1px solid #dcdfe6;
      // border-right: 1px solid #dcdfe6;
      > ul {
        height: calc(100% - 42px);
        overflow-y: auto;
        li {
          line-height: 28px;
          padding-left: 4px;
          transition: all 0.2s ease-in-out;
          margin-bottom: 6px;
          border-radius: 2px;
          &:hover {
            background-color: #ebeef5;
          }
          &.active {
            background-color: #ebeef5;
          }
        }
      }
    }
  }
}
</style>
