<template>
  <div class="header">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in navData"
        :key="item.id"
        :label="item.name"
        :name="item.id"
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      activeName: "1",
      navData: [
        { id: "1", name: "想定", path: "/scenario" },
        { id: "2", name: "组织结构", path: "/org" },
        { id: "3", name: "方案与计划", path: "/scenario" },
      ],
    };
  },
  methods: {
    handleClick(tab) {
      console.log(tab, "=999");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
}
</style>
