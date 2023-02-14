<template>
  <div class="drawer" v-if="drawerData.drawerVisible">
    <div
      class="drawer-inner flex-column"
      :style="{ height: `${drawerData.drawerHeight}px` }"
    >
      <div class="drawer-header flex-between">
        <div>详情</div>
        <div @click="handleClose" class="el-icon-close pointer"></div>
      </div>
      <div class="drawer-body">
        <el-form
          :model="form"
          label-width="80px"
          size="small"
          class="form-wrapper"
          label-position="right"
        >
          <el-form-item label="力量名称">
            <el-input v-model="form.name" placeholder="力量名称"></el-input>
          </el-form-item>
          <el-form-item label="力量描述">
            <el-input v-model="form.desc" placeholder="力量描述"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RightPanel",
  props: {
    drawerData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      form: {
        name: "",
        desc: "",
      },
    };
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit("handleDrawerInfo", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  animation: drawer-in 0.3s;
  border: 1px solid #dcdfe6;
  border-radius: 2px;
  // box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
  //   0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
  .drawer-inner {
    background-color: #fff;
    .drawer-header {
      padding: 12px;
      font-size: 14px;
      .el-icon-close {
        font-size: 20px;
      }
    }
    .drawer-body {
      flex: 1;
      padding: 0 12px 12px;
    }
  }
}

@keyframes drawer-in {
  0% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  100% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
}

@keyframes drawer-out {
  0% {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }

  100% {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }
}
</style>
