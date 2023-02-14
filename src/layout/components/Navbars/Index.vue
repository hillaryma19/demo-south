<template>
  <div class="navbar flex-between">
    <div class="flex-start">
      <div>
        <hamburger
          :is-active="sidebar.opened"
          class="hamburger-container"
          @toggleClick="handleToggleSideBar"
        />
      </div>
      <div>
        <breadcrumb class="breadcrumb-container" />
      </div>
    </div>

    <div class="flex-start">
      <div class="right-menu">
        <el-dropdown class="avatar-container" trigger="click">
          <div class="avatar-wrapper pointer">
            <span>{{ name ? name : "user" }}</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item>
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">
              <div>退出</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb/Index.vue";
import Hamburger from "@/components/Hamburger/Index.vue";
import { removeCookie } from "@/utils/cookie";

export default {
  name: "NavbarsIndex",
  components: {
    Breadcrumb,
    Hamburger,
  },
  data() {
    return {
      avatar: require("../../../assets/logo.png"),
      name: "",
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
  },
  created() {},
  methods: {
    handleToggleSideBar() {
      this.$store.dispatch("handleToggleSidebar");
    },
    logout() {
      removeCookie("token");
      removeCookie("token");
      removeCookie("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    // float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    // float: left;
  }
  .note-bell-wrap {
    margin-top: 20px;
    padding-right: 20px;
    ::v-deep .el-link {
      font-size: 16px;
    }
  }
  .right-menu {
    // float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        // .el-icon-caret-bottom {
        //   cursor: pointer;
        //   position: absolute;
        //   right: -20px;
        //   top: 25px;
        //   font-size: 12px;
        // }
      }
    }
  }
}
</style>
