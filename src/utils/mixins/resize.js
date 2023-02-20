import store from "@/store";
const { body } = document;

const SCREENWIDTH = 992;

export default {
  data() {
    return {
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      timer: false,
    };
  },
  watch: {
    $route(route) {
      if (this.device === "mobile" && this.sidebar.opened) {
        store.dispatch("closeSidebar");
      }
    },
    screenWidth(val) {
      let _this = this;
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        setTimeout(function () {
          _this.timer = false;
        }, 800);
      }
    },
  },
  beforeMount() {
    window.addEventListener("resize", this.$_resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.$_resizeHandler);
  },
  mounted() {
    const _this = this;
    const isMobile = this.$_isMobile();
    _this.$_resetSize();
    if (isMobile) {
      store.dispatch("toggleDevice", "mobile");
      store.dispatch("closeSidebar");
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < SCREENWIDTH;
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch("toggleDevice", isMobile ? "mobile" : "desktop");

        if (isMobile) {
          store.dispatch("closeSidebar");
        }
        (window.screenWidth =
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth),
          (this.screenWidth = window.screenWidth);
        this.$_resetSize();
      }
    },
    $_resetSize() {
      const _this = this;
      let htmlTag = document.getElementsByTagName("html")[0];
      htmlTag.style.fontSize = (_this.screenWidth / 1920) * 20 + "px";
      window.fontSize = (_this.screenWidth / 1920) * 20;
    },
  },
};
