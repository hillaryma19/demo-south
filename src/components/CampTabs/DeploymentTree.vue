<template>
  <div class="container">
    <div class="pad-tp-10 pad-bt-10"><CampSelect></CampSelect></div>
    <DeployTree></DeployTree>
  </div>
</template>

<script>
const DeployTree = () => import("@/components/DeployTree/Index.vue");
const CampSelect = () => import("../CampSelect/Index.vue");
export default {
  name: "PowerDeployment",
  components: { DeployTree, CampSelect },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
