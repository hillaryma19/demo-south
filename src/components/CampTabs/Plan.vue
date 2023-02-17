<template>
  <div class="g-wrapper">
    <div class="pad-tp-10 pad-bt-10">
      <el-button plain type="primary" size="small" @click="handleAdd"
        >新建计划</el-button
      >
    </div>
    <div class="g-container">
      <Gantt @onTaskClick="handleOnTaskClick"></Gantt>
    </div>
    <plan-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></plan-add>
  </div>
</template>

<script>
const Gantt = () => import("@/components/Gantt/Index.vue");
const PlanAdd = () => import("./PlanAdd.vue");
export default {
  name: "PlanFormulation",
  components: { Gantt, PlanAdd },
  data() {
    return {
      dialogData: {
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
    handleOnTaskClick(params) {
      console.log(params, "==params");
      this.dialogData.dialogVisible = true;
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
