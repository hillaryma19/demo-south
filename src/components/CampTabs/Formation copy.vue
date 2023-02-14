<template>
  <div class="container">
    <div class="inner" ref="wrapperInner">
      <el-tabs
        v-model="activeName"
        tab-position="left"
        @tab-click="handleTabClick"
      >
        <el-tab-pane label="阵营1" name="1">
          <el-container style="height: 100%">
            <div class="left scroll-bar-style" ref="leftBox">
              <div>
                <el-button size="small" type="primary" @click="handleAdd"
                  >添加力量</el-button
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
                    :class="{ 'drag-hover': isDragHover }"
                  >
                    <div @click="handleNodeClick(data)">
                      <span
                        v-if="!data.children"
                        @drop="onDrop($event, node, data)"
                        @dragover="onDragOver($event, node, data)"
                        >{{ node.label }}</span
                      >
                      <span v-else>{{ node.label }}</span>
                    </div>
                    <span>
                      <el-button
                        type="text"
                        size="small"
                        @click="() => handleAdd(data)"
                      >
                        添加力量
                      </el-button>
                    </span>
                  </div>
                </div></el-tree
              >
            </div>
            <div class="middle">
              <ul>
                <li
                  class="move"
                  draggable
                  @dragstart="onDragStart($event)"
                  v-for="item in listData"
                  :key="item.id"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </el-container>
        </el-tab-pane>
        <el-tab-pane label="阵营2" name="2">阵营2</el-tab-pane>
        <el-tab-pane label="阵营3" name="3">阵营3</el-tab-pane>
      </el-tabs>
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
const RightPanel = () => import("@/components/RightPanel/Index.vue");
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
export default {
  name: "PowerFormation",
  components: { RightPanel, PowerAdd },
  data() {
    return {
      dialogData: {
        dialogVisible: false,
      },
      drawerData: {
        drawerVisible: false,
        drawerHeight: 500,
        type: 1,
      },
      activeName: "1",
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
    onDragStart(event) {
      this.isDragging = true;
      this.isDragHover = false;
      console.log(event, "==onDragStart");
    },
    onDrop(event, node, data) {
      this.isDragging = false;
      this.isDragHover = false;
      console.log(event, node, data, "==onDrop");
    },
    onDragOver(event) {
      event.preventDefault();
      this.isDragHover = true;
      console.log(event, "==onDragOver");
    },
    onWindowResize() {
      this.$nextTick(() => {
        let leftBox = this.$refs.leftBox;
        if (leftBox) {
          this.drawerData.drawerHeight = leftBox.offsetHeight;
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
      this.activeName = tab.name;
      console.log(tab);
    },
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
      border: 1px dashed #dcdfe6;
      border-radius: 4px;
    }
  }
  ::v-deep .el-tabs--left {
    height: 100%;
    .el-tabs__content {
      height: 100%;
      .el-tab-pane {
        height: 100%;
      }
    }
    .left {
      width: 200px;
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
}
</style>
