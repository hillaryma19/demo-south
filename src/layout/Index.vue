<template>
  <div :class="appClass" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
      </div>
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <!-- <keep-alive :exclude="[]"> -->
          <router-view :key="pathKey" />
          <!-- </keep-alive> -->
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
const Sidebar = () => import("./components/Sidebar/Index.vue");
const Navbar = () => import("./components/Navbars/Index.vue");
import ResizeMixin from "../utils/mixins/resize.js";

export default {
  name: "LayoutPage",
  components: {
    Navbar,
    Sidebar,
  },
  mixins: [ResizeMixin],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      needTagsView: (state) => state.settings.tagsView,
    }),
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    appClass() {
      return {
        mobileClass: this.device === "mobile",
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
      };
    },
    pathKey() {
      return this.$route.fullPath;
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch("closeSideBar", { withoutAnimation: false });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/variables.scss";
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: stretch;
  -webkit-align-items: stretch;
  -ms-flex-align: stretch;
  align-items: stretch;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  // overflow-y: auto;
  overflow: hidden;
  .content {
    display: inline-block;
    transition: all 1s;
    padding: 12px 24px;
    border-radius: 4px;
  }
  .el-drawer__wrapper {
    width: 520px;
    left: auto;
    // height: calc(100vh - 54px);
    // top: 54px;
  }
}

.app-wrapper {
  // @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
  .app-main {
    height: 100%;
    // height: calc(100% - 50px);
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
