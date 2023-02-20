<template>
  <el-dialog
    title="详情"
    :visible="dialogData.dialogVisible"
    width="80%"
    :before-close="handleDialogClose"
  >
    <div class="dialog-content center">
      <div class="dialog-inner">
        <el-steps :space="200" :active="active" finish-status="success">
          <el-step
            v-for="item in steps"
            :key="item.id"
            :title="item.name"
          ></el-step>
        </el-steps>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="handleDialogClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "PlanTaskDetailDialog",
  props: {
    dialogData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      active: 1,
      steps: [
        { id: 1, name: "等待指令起飞" },
        { id: 2, name: "等待指令投递" },
        { id: 3, name: "投递结束，返航" },
      ],
    };
  },
  methods: {
    handleDialogClose() {
      this.$emit("handleDialogInfo", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-content {
  height: 48vh;
  .dialog-inner {
    width: 100%;
  }
}
</style>
