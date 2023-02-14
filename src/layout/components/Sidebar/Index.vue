<template>
  <div :class="{ 'has-logo': showLogo }">
    <!-- <div class="hamburger-box pad-bt-10 pad-tp-10">
      <hamburger
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="handleToggleSideBar"
      />
    </div> -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo.vue";
import SidebarItem from "./SidebarItem.vue";
import variables from "@/assets/scss/variables.scss";
import Hamburger from "@/components/Hamburger/Index.vue";

export default {
  components: { SidebarItem, Logo, Hamburger },
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      let routesData = this.$router.options.routes;
      let newRoutesData = [];
      routesData.forEach((item) => {
        if (!item.hidden) {
          newRoutesData.push(item);
        }
      });
      console.log(routesData, "==routesData");
      return newRoutesData;
      // return this.$router.options.routes
    },

    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  methods: {
    handleToggleSideBar() {
      this.$store.dispatch("handleToggleSidebar");
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-box {
  color: #909399;
  background-color: #1b2736;
}
// .hamburger-container {
//   line-height: 46px;
//   height: 100%;
//   // float: left;
//   cursor: pointer;
//   transition: background 0.3s;
//   -webkit-tap-highlight-color: transparent;

//   &:hover {
//     background: rgba(0, 0, 0, 0.025);
//   }
// }
</style>
