<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    {{ collapse }}==collapse
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/"
      >
        <!-- <svg-icon class="sidebar-logo" style="width: 40px;" class-name="logo-icon" icon-class="logo" /> -->
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <svg-icon class="sidebar-logo" style="width: 120px; " class-name="logo-icon" icon-class="logo" /> -->
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: "You Ku",
      logo: "https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png",
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    color: none;
    & .sidebar-logo {
      // width: 32px;
      // height: 32px;
      vertical-align: middle;
      // margin-right: 12px;
      margin: 0 !important;
      height: 50px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
