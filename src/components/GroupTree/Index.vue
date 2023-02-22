<template>
  <div class="container">
    <div class="pad-bt-10">
      <el-input
          placeholder="请输入搜索内容"
          suffix-icon="el-icon-search"
          v-model="keyword"
          size="small"
      >
      </el-input>
    </div>
    <div
        class="scroll-bar-style"
        ref="leftBox"
    >
      <div
          class="pad-bt-10 flex-between"
          style="align-items: center;"
      >
        <el-tooltip
            effect="dark"
            content="添加编组"
            placement="top"
        >
          <i
              class="pointer add-btn el-icon-circle-plus-outline"
              @click="handleAddMarshal(1)"
          ></i>
        </el-tooltip>
        <el-popover
            placement="right-start"
            title="力量模板库"
            width="260"
            trigger="click"
        >
          <el-button
              slot="reference"
              type="text"
          > 选择力量模板
          </el-button>
          <div>
            <el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                v-model="keyword"
                size="small"
            >
            </el-input>
            <div
                class="tree-iframe scroll-bar-style"
                style="margin-top: 10px;height: 64%"
            >
              <el-tree
                  :data="treeData"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  default-expand-all
                  :indent="0"
                  class="tree-line"
              >
                <div
                    class="custom-tree-container"
                    slot-scope="{ node, data }"
                >
                  <div
                      class="custom-tree-box"
                      @drop="onDrop($event, node, data)"
                      @dragover="onDragOver($event, node, data)"
                      @dragleave="onDragLeave($event, node, data)"
                  >
                    <!--                    <div @click="handleNodeClick(data)">-->
                    <div>
                      <span
                          class="tree-label text-ellipsis line-clamp-1"
                          v-if="!data.children"
                          :class="{ active: data.selected }"
                          @click.stop="onItemClick(node)"
                      >
                        {{ node.label }}
                      </span>
                      <span
                          class="tree-label text-ellipsis line-clamp-1"
                          v-else
                      >
                        {{ node.label }}
                      </span>
                    </div>
                  </div>
                </div>
              </el-tree>
            </div>
          </div>
        </el-popover>
      </div>
      <el-tree
          ref="tree"
          :data="treeData"
          :props="defaultProps"
          :expand-on-click-node="false"
          default-expand-all
          :filter-node-method="filterNode"
          :indent="0"
          class="tree-line"
          draggable
      >
        <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
        >
          <span>{{ node.label }}</span>
          <span>
            <i
                class="el-icon-edit tree-icon"
                @click="() => handleAddMarshal(2, data)"
            ></i>
            <i
                class="el-icon-remove-outline tree-icon"
                @click="() => handleNodeClick(data, 2)"
            ></i>
            <i
                class="el-icon-circle-plus-outline tree-icon"
                @click="() => handleAddMarshal(1, data)"
            ></i>
          </span> </span></el-tree>
    </div>
    <group-add
        :dialog-data="groupDialogData"
        @handleDialogInfo="getGroupDialogInfo"
    ></group-add>
  </div>
</template>

<script>
import {scenarioPowerRemove} from "@/api/scenario.js";
import {isMac, isWindows} from "@/utils/util.js";

const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");

export default {
  name: "GroupTreeIndex",
  components: {GroupAdd},
  props: {
    activeName: {
      type: [String, Number],
    },
  },
  watch: {
    keyword(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      keyword: "",
      groupDialogData: {
        dialogVisible: false,
        dialogType: 1, // 1：添加；2：编辑
      },
      treeData: [
        {
          label: "编组一级 1",
          children: [
            {
              label: "编组二级 1-1",
              children: [
                {
                  label: "编组三级 1-1-1",
                  selected: false,
                },
                {
                  label: "编组三级 1-1-3",
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          label: "编组一级 2",
          children: [
            {
              label: "编组二级 2-1",
              children: [
                {
                  label: "编组三级 2-1-1",
                  selected: false,
                },
              ],
            },
            {
              label: "编组二级 2-2",
              children: [
                {
                  label: "编组三级 2-2-1",
                  selected: false,
                },
              ],
            },
          ],
        },
        {
          label: "编组一级 3",
          children: [
            {
              label: "编组二级 3-1",
              children: [
                {
                  label: "编组三级 3-1-1",
                  selected: false,
                },
              ],
            },
            {
              label: "编组二级 3-2",
              children: [
                {
                  label: "编组三级 3-2-1",
                  selected: false,
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
      atMac: false,
      atWindows: false,
      isCtrl: false,
      isShift: false,
    };
  },
  created() {
    this.atWindows = isWindows();
    this.atMac = isMac();
    this.removeKeyEventListener();
    this.addKeyEventListener();
  },
  mounted() {
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
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, type) {
      if (type == 1) {
        this.groupDialogData.dialogVisible = true;
        this.groupDialogData.dialogType = 2;
        this.groupDialogData.id = data.label;
      } else if (type == 2) {
        this.handleDel(data);
      }
    },
    // 点击添加编组
    handleAddMarshal(type, data) {
      this.groupDialogData.dialogVisible = true;
      this.groupDialogData.dialogType = type;
      this.groupDialogData.id = data.label;
    },
    getGroupDialogInfo() {
      this.groupDialogData.dialogVisible = false;
    },
    // 点击删除
    handleDel(data) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        scenarioPowerRemove({id: data.id}).then((res) => {
          console.log(res, "==res");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      });
    },

    onItemClick(node) {
      console.log(node.id)
      node.parent.data.children.forEach((data, index) => {
        if (data) {
          if (!this.isCtrl && !this.isShift) {
            console.log(data)
            if (data.id != node.id) {
              data.selected = false;
            }
            // data.selected = !node.selected;
            // this.$set(node.parent.data.children, index, data);
            console.log(data.selected, '2')
          }
          if (node.id == data.$treeNodeId) {
            if (this.isCtrl) {
              data.selected = !data.selected;
              this.$set(node.parent.data.children, index, data);
              console.log(data.selected, data.$treeNodeId, node.id, '3')
            }
            if (this.isShift) {
              const len = node.parent.data.children.length;
              let resultIndex = 0;
              for (let i = len - 1; i > 0; i--) {
                if (node.parent.data.children[i].selected) {
                  resultIndex = i;
                  break;
                }
              }
              if (resultIndex < index) {
                for (let i = resultIndex; i <= index; i++) {
                  console.log(node.parent.data.children.length, node.parent.data.children, i, 'data')
                  node.parent.data.children[i].selected = true;
                  this.$set(node.parent.data.children, i, node.parent.data.children[i]);
                }
              } else {
                for (let i = index; i <= resultIndex; i++) {
                  node.parent.data.children[i].selected = !node.parent.data.children[i].selected;
                  this.$set(node.parent.data.children, i, node.parent.data.children[i]);
                }
              }
            }
          }
        }
      })
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
      // let obj = {
      //   label: event.dataTransfer.getData("currentName"),
      //   id: event.dataTransfer.getData("currentId"),
      //   flag: 2,
      // };
      // this.isDragging = false;
      // this.isDragHover = false;
      // this.$message({
      //   type: "success",
      //   message: "添加成功!",
      // });
      // event.target.style.background = "";
      // // if (data.flag == 1 && !data.children) {
      // //   this.$set(data, "children", []);
      // //   this.$set(data, "isII", true);

      // //   this.listData.forEach((item) => {
      // //     if (item.selected) {
      // //       data.children.push(item);
      // //     }
      // //   });
      // // } else {
      // //   if (data.isII) {
      // //     this.listData.forEach((item) => {
      // //       if (item.selected) {
      // //         data.children.push(item);
      // //       }
      // //     });
      // //   }
      // // }
      // this.listData.forEach((item) => {
      //   if (item.selected) {
      //     data.children.push(item);
      //   }
      // });
      // this.listData.forEach((item) => {
      //   item.selected = false;
      // });
      // this.$forceUpdate();
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
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;

  .add-btn {
    font-size: 18px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #409eff;
    }
  }

  .tree-icon {
    font-size: 16px;
    margin-left: 10px;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: #409eff;
    }
  }
}

.active {
  background-color: #ebeef5;
}
</style>
