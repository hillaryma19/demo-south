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
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
        :indent="0"
        class="tree-line"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="!data.children">
            <el-button
              type="primary"
              size="mini"
              plain
              @click="() => handleDeploy(data)"
            >
              部署
            </el-button>
          </span>
        </span></el-tree
      >
    </div>
    <deployment-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></deployment-add>
  </div>
</template>

<script>
const DeploymentAdd = () => import("@/components/CampTabs/DeploymentAdd.vue");
export default {
  name: "DeployTree",
  components: { DeploymentAdd },
  data() {
    return {
      keyword: "",
      dialogData: {
        dialogVisible: false,
      },
      treeData: [
        {
          label: "力量一级 1",
          children: [
            {
              label: "力量二级 1-1",
              children: [
                {
                  label: "力量三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 2",
          children: [
            {
              label: "力量二级 2-1",
              children: [
                {
                  label: "力量三级 2-1-1",
                },
              ],
            },
            {
              label: "力量二级 2-2",
              children: [
                {
                  label: "力量三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "力量一级 3",
          children: [
            {
              label: "力量二级 3-1",
              children: [
                {
                  label: "力量三级 3-1-1",
                },
              ],
            },
            {
              label: "力量二级 3-2",
              children: [
                {
                  label: "力量三级 3-2-1",
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
  mounted() {},
  methods: {
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    // 点击部署
    handleDeploy(data) {
      this.dialogData.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
