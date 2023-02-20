<template>
  <div class="g-wrapper">
    <div class="pad-tp-10 pad-bt-10">
      <el-button plain type="primary" size="small" @click="handleAdd"
        >新建计划</el-button
      >
    </div>
    <div class="g-container">
      <Gantt
        @onGanttTreeClick="handleOnTreeClick"
        @onGanttTaskClick="handleOnTaskClick"
      ></Gantt>
    </div>
    <plan-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></plan-add>
    <plan-task-detail
      :dialog-data="dialogTaskDetailData"
      @handleDialogInfo="getTaskDetailDialogInfo"
    ></plan-task-detail>
  </div>
</template>

<script>
const Gantt = () => import("@/components/Gantt/Index.vue");
const PlanAdd = () => import("./PlanAdd.vue");
const PlanTaskDetail = () => import("./PlanTaskDetail.vue");
export default {
  name: "PlanFormulation",
  components: { Gantt, PlanAdd, PlanTaskDetail },
  data() {
    return {
      dialogData: {
        dialogVisible: false,
        dialogType: 1, // 1添加 2编辑
      },
      dialogTaskDetailData: {
        dialogVisible: false,
      },
    };
  },
  methods: {
    // 点击添加
    handleAdd(data) {
      this.dialogData.dialogVisible = true;
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    getTaskDetailDialogInfo() {
      this.dialogTaskDetailData.dialogVisible = false;
    },
    handleOnTreeClick(params) {
      let type = params.type;
      // if (params.type == 1) {
      //   // 添加
      //   this.dialogData.dialogVisible = true;
      //   this.dialogData.dialogType = 1;
      // } else if (params.type == 2) {
      //   // 编辑
      //   this.dialogData.dialogVisible = true;
      //   this.dialogData.dialogType = 2;
      // }
      this.dialogData.dialogVisible = true;
      this.dialogData.dialogType = type;
    },
    handleOnTaskClick(params) {
      console.log(params, "==params");
      this.dialogTaskDetailData.dialogVisible = true;
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.g-wrapper {
  width: 100%;
  height: 100%;
  .g-container {
    height: calc(100% - 55px);
  }
}
</style>
