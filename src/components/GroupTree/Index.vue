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
    <div class="scroll-bar-style" ref="leftBox">
      <div class="pad-bt-10 flex-between" style="align-items: center;">
        <el-tooltip effect="dark" content="添加编组" placement="top">
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
          <el-button slot="reference" type="text">
            选择力量模板</el-button>
          <div>
            <el-input
                placeholder="请输入搜索内容"
                suffix-icon="el-icon-search"
                v-model="keyword"
                size="small"
            >
            </el-input>
            <el-tree
                :data="treeData"
                :props="defaultProps"
                :expand-on-click-node="false"
                default-expand-all
                :indent="0"
                class="tree-line"
            >
            </el-tree>
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
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
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
          </span> </span
      ></el-tree>
    </div>
    <group-add
      :dialog-data="groupDialogData"
      @handleDialogInfo="getGroupDialogInfo"
    ></group-add>
  </div>
</template>

<script>
import { commandStaffFindAll, communicationFindById } from "@/api/api";
import { scenarioPowerRemove } from "@/api/scenario.js";
const GroupAdd = () => import("@/components/CampTabs/GroupAdd.vue");

export default {
  name: "GroupTreeIndex",
  components: { GroupAdd },
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
                },
              ],
            },
            {
              label: "编组二级 2-2",
              children: [
                {
                  label: "编组三级 2-2-1",
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
                },
              ],
            },
            {
              label: "编组二级 3-2",
              children: [
                {
                  label: "编组三级 3-2-1",
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
    };
  },
  created() {},
  mounted() {},
  methods: {
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
        scenarioPowerRemove({ id: data.id }).then((res) => {
          console.log(res, "==res");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        });
      });
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
</style>
