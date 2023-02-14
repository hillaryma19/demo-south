<template>
  <div class="equip-container">
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
</template>
<script>
import { isMac, isWindows } from "@/utils/util.js";
export default {
  data() {
    return {
      atMac: false,
      atWindows: false,
      isCtrl: false,
      isShift: false,
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
    };
  },
  created() {
    this.atWindows = isWindows();
    this.atMac = isMac();
  },
  methods: {
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
  },
};
</script>
<style lang="scss" scoped>
.equip-container {
  height: 100%;
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
</style>
