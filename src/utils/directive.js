import Vue from "vue";
/**仿止双击**/
const preventReClick = Vue.directive("preventReClick", {
  inserted: function(el, binding) {
    el.addEventListener("click", () => {
      if (!el.disabled) {
        el.disabled = true;
        setTimeout(() => {
          el.disabled = false;
        }, binding.value || 1500);
      }
    });
  }
});
/**权限指令**/
const has = Vue.directive("has", {
  inserted: function(el, binding, vnode) {
    let btnPermissionsArr = [];
    let curbtnPermission = "";
    if (binding.value) {
      // 如果指令传值，获取指令参数，根据指令参数和当前登录人按钮权限做比较。
      curbtnPermission = binding.value;
    }
    // 否则获取路由中的参数，根据路由的btnPermissionsArr和当前登录人按钮权限做比较。
    btnPermissionsArr = vnode.context.$route.meta.btnPermissions;
    if (!Vue.prototype.$_has(btnPermissionsArr, curbtnPermission)) {
      if (!el.parentNode) return;
      el.parentNode.removeChild(el);
    }
  }
});
// 权限检查方法
Vue.prototype.$_has = function(value, cur) {
  let isExist = false;
  // 获取用户按钮权限
  if (value == undefined || value == null) {
    return false;
  }
  if (value.join(",").indexOf(cur) > -1) {
    isExist = true;
  }
  return isExist;
};
// 限制input只能输入小写字母
Vue.directive("limitLetter", {
  inserted: function(el, binding, vnode) {
    //el是 input外层的div
    let input = el.tagName === "INPUT" ? el : el.querySelector("input");
    input.addEventListener("keyup", function() {
      input.value = input.value.replace(/[^a-z]/g, "");
      //当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit("input", input.value);
      } else {
        vnode.elm.dispatchEvent(new CustomEvent("input", input.value));
      }
    });
  }
});
// 限制input只能输入数字
Vue.directive("limitNumber", {
  inserted: function(el, binding, vnode) {
    //el是 input外层的div
    let input = el.tagName === "INPUT" ? el : el.querySelector("input");
    input.addEventListener("keyup", function() {
      input.value = input.value.replace(/[^\d]/g, "");
      //当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit("input", input.value);
      } else {
        vnode.elm.dispatchEvent(new CustomEvent("input", input.value));
      }
    });
  }
});
//限制input输入n位小数
Vue.directive("limitDecimal", {
  inserted: function(el, binding, vnode) {
    //el是 input外层的div
    let input = el.tagName === "INPUT" ? el : el.querySelector("input");
    input.addEventListener("keyup", function() {
      let reg = new RegExp("\\d+(\\.\\d{0," + binding.value + "})?");
      input.value = input.value.match(reg) ? input.value.match(reg)[0] : "";
      //当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit("input", input.value);
      } else {
        vnode.elm.dispatchEvent(new CustomEvent("input", input.value));
      }
    });

    input.addEventListener("afterpaste", function() {
      let reg = new RegExp("\\d+(\\.\\d{0," + binding.value + "})?");
      input.value = input.value.match(reg) ? input.value.match(reg)[0] : "";
      //当输入汉字时会导致vue model 数据不同步，因此在回调函数添加上以下代码，手动触发数据的双向绑定
      if (vnode.componentInstance) {
        vnode.componentInstance.$emit("input", input.value);
      } else {
        vnode.elm.dispatchEvent(new CustomEvent("input", input.value));
      }
    });
  }
});
//图片加载失败时加载默认图
// Vue.directive("loadDefaultImage", {
//   bind: function(el) {
//     //在图片加载失败的时候执行onerror方法 给src赋值
//     el.onerror = function() {
//       el.src = require("@/assets/img/defaultImg.png");
//     };
//   }
// });
//图片加载失败时加载默认图
// Vue.directive("loadWDefaultImage", {
//   bind: function(el) {
//     //在图片加载失败的时候执行onerror方法 给src赋值
//     el.onerror = function() {
//       el.src = require("@/assets/img/wDefaultImg.png");
//     };
//   }
// });
// v-dialogDrag: 弹窗拖拽
Vue.directive("dialogDrag", {
  bind(el) {
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    dialogHeaderEl.style.cursor = "move";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = e => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft;
      const disY = e.clientY - dialogHeaderEl.offsetTop;

      // 获取到的值带px 正则匹配替换
      let styL, styT;

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (sty.left.includes("%")) {
        styL =
          +document.body.clientWidth * (+sty.left.replace(/\u0025/g, "") / 100);
        styT =
          +document.body.clientHeight * (+sty.top.replace(/\u0025/g, "") / 100);
      } else {
        styL = +sty.left.replace(/\px/g, "");
        styT = +sty.top.replace(/\px/g, "");
      }

      document.onmousemove = function(e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        // 移动当前元素
        dragDom.style.left = `${l + styL}px`;
        dragDom.style.top = `${t + styT}px`;

        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };

      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
});
export { preventReClick, has };
