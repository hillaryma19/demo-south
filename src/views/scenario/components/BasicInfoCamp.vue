<template>
  <div class="bc-container scroll-bar-style pad-tp-10">
    <div class="title pad-lt-10">基础信息</div>
    <BasicInfo></BasicInfo>
    <!-- <div class="title pad-lt-10">阵营</div> -->
    <Camp></Camp>
  </div>
</template>
<script>
const BasicInfo = () => import("./BasicInfo.vue");
const Camp = () => import("./Camp.vue");
export default {
  name: "BasicInfoCamp",
  components: { BasicInfo, Camp },
};
</script>
<style lang="scss" scoped>
.bc-container {
  height: 100%;
  overflow-y: auto;
  padding: 10px;
  .title {
    font-size: 16px;
    line-height: 32px;
    background-color: rgb(191, 191, 191);
    margin-bottom: 12px;
  }
}
</style>
