import Vue from "vue";
Vue.filter("currency", function(val) {
  if (val) {
    val = val.toString().replace(/[^-\d.]/g, ""); //清除"数字"和"."以外的字符
    let val1 = parseFloat(val).toFixed(2); //保留两位小数
    let val2 = val1.toString();
    let arr = val2.split(".");
    let arr1 = arr[0].split("");
    let str3 = "";
    let arr2 = [];
    for (let i = arr1.length - 1, j = 0; i >= 0; i--, j++) {
      str3 = "" + arr1[i] + str3;
      if (j % 3 == 2) {
        arr2.unshift(str3);
        str3 = "";
      } else if (i == 0) {
        arr2.unshift(str3);
      }
    }
    let str4 = arr2.join(",");
    let str5 = str4 + "." + arr[1];
    //处理负数
    if (str5[0] && str5[1] && str5[0] == "-" && str5[1] == ",") {
      str5 = "-" + str5.substr(2);
    }
    return str5;
  } else {
    return "0.00";
  }
});
Vue.filter("formatDate", function(time, mark, n) {
  if (time == null || time == "") {
    return "";
  } else {
    var date = new Date(parseInt(time));
    var dYear = date.getFullYear();
    var dMonth = date.getMonth() + 1;
    var dDate = date.getDate();
    var dHours = date.getHours();
    var dMinutes = date.getMinutes();
    var dSeconds = date.getSeconds();
    if (dMonth < 10) {
      dMonth = "0" + dMonth;
    }
    if (dDate < 10) {
      dDate = "0" + dDate;
    }
    if (dHours < 10) {
      dHours = "0" + dHours;
    }
    if (dMinutes < 10) {
      dMinutes = "0" + dMinutes;
    }
    if (dSeconds < 10) {
      dSeconds = "0" + dSeconds;
    }
    if (mark) {
      if (n == 3) {
        return dHours + mark + dMinutes + mark + dSeconds;
      } else if (n == 0) {
        return dHours + mark + dMinutes;
      } else if (n == 1) {
        return dYear + mark + dMonth + mark + dDate;
      } else if (n == 2) {
        return (
          dYear + mark + dMonth + mark + dDate + " " + dHours + ":" + dMinutes
        );
      } else {
        return (
          dYear +
          mark +
          dMonth +
          mark +
          dDate +
          " " +
          dHours +
          ":" +
          dMinutes +
          ":" +
          dSeconds
        );
      }
    } else {
      if (n == -1) {
        return dYear;
      } else if (n == 0) {
        return dYear + "-" + dMonth;
      } else if (n == 1) {
        return dYear + "-" + dMonth + "-" + dDate;
      } else if (n == 2) {
        return (
          dYear + "-" + dMonth + "-" + dDate + " " + dHours + ":" + dMinutes
        );
      } else {
        return (
          dYear +
          "-" +
          dMonth +
          "-" +
          dDate +
          " " +
          dHours +
          ":" +
          dMinutes +
          ":" +
          dSeconds
        );
      }
    }
  }
});
Vue.filter("status", function(flag) {
  let str = "";
  switch (flag) {
    case 1:
      str = "未发布";
      break;
    case 2:
      str = "待审核";
      break;
    case 3:
      str = "待上架";
      break;
    case 4:
      str = "在售";
      break;
    case 5:
      str = "店铺下架";
      break;
    case 6:
      str = "锁定";
      break;
    case 7:
      str = "申请解锁";
      break;
    case 8:
      str = "平台下架"; //平台下架
      break;
    case 9:
      str = "系统下架"; //系统下架
      break;
    case 10:
      str = "定时下架"; //定时下架
      break;
    case 11:
      str = "下线"; //下线
      break;
    case 20:
      str = "审核驳回";
      break;
    case 30:
      str = "删除";
      break;
    default:
      str = "后台返回null";
      break;
  }
  return str;
});
Vue.filter("activity", function(arr) {
  let str = "";
  let activityArr = [
    null,
    "单品降价",
    "满额降价",
    "单品赠品",
    "满额赠品",
    "单品优惠券",
    "满额优惠券",
    "多买打折活动",
    "套装",
    "送积分活动",
    "加价购活动",
    "一口价",
    "打折",
    "秒杀",
    "接龙"
  ];
  if (arr && arr.length) {
    arr.forEach(function(item) {
      str += activityArr[item] + " ";
    });
  } else {
    str = "无";
  }

  return str;
});
Vue.filter("orderStatus", function(status) {
  let str = "";
  switch (status) {
    case 0:
      str = "系统处理中";
      break;
    case 1:
      str = "待付款";
      break;
    case 2:
      str = "待发货";
      break;
    case 3:
      str = "待收货";
      break;
    case 4:
      str = "待评价";
      break;
    case 5:
      str = "已完成";
      break;
    case 6:
      str = "已取消";
      break;
    case 7:
      str = "已关闭";
      break;
    case 8:
      str = "已删除";
      break;
    case 9:
      str = "订单过期";
      break;
    case 10:
      str = "待付尾款";
      break;
    case 11:
      str = "未付尾款";
      break;
    case 12:
      str = "锁单";
      break;
    case 13:
      str = "待付定金";
      break;
    case 14:
      str = "待审核";
      break;
    case 15:
      str = "已审核";
      break;
    case 16:
      str = "已驳回";
      break;
    case 17:
      str = "待仓库发货";
      break;
    case 18:
      str = "差异审核";
      break;
    default:
      str = "";
      break;
  }
  return str;
});

Vue.filter("refundStatus", function(status) {
  let str = "";
  switch (status) {
    case 1:
      str = "等待商家处理";
      break;
    case 2:
      str = "等待买家修改退货信息";
      break;
    case 3:
      str = "等待买家发货";
      break;
    case 4:
      str = "等待卖家收货";
      break;
    case 5:
      str = "退款关闭";
      break;
    case 6:
      str = "退款成功";
      break;
    case 7:
      str = "退款中";
      break;
    case 8:
      str = "退款中";
      break;
    default:
      str = "";
      break;
  }
  return str;
});
Vue.filter("payWays", function(status) {
  let str = "";
  switch (status) {
    case "AP":
      str = "支付宝";
      break;
    case "AP_H5":
      str = "支付宝 H5";
      break;
    case "AP_APP":
      str = "支付宝 APP";
      break;
    case "AP_BAR_CODE":
      str = "支付宝 扫码枪";
      break;
    case "WX":
      str = "微信";
      break;
    case "WX_H5":
      str = "微信 H5";
      break;
    case "WX_APP":
      str = "微信 APP";
      break;
    case "WX_BAR_CODE":
      str = "微信 扫码枪";
      break;
    case "SX":
      str = "授信";
      break;
    case "YFK":
      str = "预付款";
      break;
    case "在线支付":
      str = "在线支付";
      break;
    default:
      str = "无";
      break;
  }
  return str;
});
Vue.filter("payType", function(status) {
  let str = "";
  switch (status) {
    case "AP":
      str = "支付宝支付";
      break;
    case "AP_H5":
      str = "支付宝 H5支付";
      break;
    case "AP_APP":
      str = "支付宝 APP支付";
      break;
    case "AP_BAR_CODE":
      str = "支付宝 扫码枪支付";
      break;
    case "WX":
      str = "微信支付";
      break;
    case "WX_H5":
      str = "微信 H5支付";
      break;
    case "WX_APP":
      str = "微信 APP支付";
      break;
    case "WX_BAR_CODE":
      str = "微信 扫码枪支付";
      break;
    case "SX":
      str = "授信支付";
      break;
    case "YFK":
      str = "预付款支付";
      break;
    case "YUE":
      str = "余额支付";
      break;
    case "在线支付":
      str = "在线支付";
      break;
    default:
      str = "未支付";
      break;
  }
  return str;
});
Vue.filter("outStatus", function(status) {
  let str = "";
  switch (status) {
    case 0:
      str = "待拣货";
      break;
    case 1:
      str = "待出库";
      break;
    case 2:
      str = "待审核";
      break;
    case 3:
      str = "已关闭";
      break;
    case 4:
      str = "待发运";
      break;
    case 5:
      str = "已完成";
      break;
    case 6:
      str = "已关闭";
      break;
    case 7:
      str = "拒收待审核";
      break;
    case 8:
      str = "已拒收";
      break;
    case 9:
      str = "拒收入库";
      break;
    default:
      str = "";
      break;
  }
  return str;
});

Vue.filter("prizeLevel", function(status) {
  let str = "";
  switch (status) {
    case 1:
      str = "特等奖";
      break;
    case 2:
      str = "一等奖";
      break;
    case 3:
      str = "二等奖";
      break;
    case 4:
      str = "三等奖";
      break;
    case 5:
      str = "四等奖";
      break;
    case 6:
      str = "特别奖";
      break;
    case 7:
      str = "纪念奖";
      break;
    case 8:
      str = "参与奖";
      break;
    default:
      str = "";
      break;
  }
  return str;
});

//保留n位小数 四舍五入
Vue.filter("decimal", function(num, n) {
  //默认4位小数
  n = parseInt(n) || 4;
  if (isNaN(n)) {
    n = 4;
  }
  num = parseFloat(num);
  if (isNaN(num)) {
    return 0;
  } else {
    let mul = Math.pow(10, n);
    return Math.round(num * mul) / mul;
  }
});

// 只显示开头和结尾，中间****
Vue.filter("hideMiddle", function(val) {
  let first = val.substr(0, 2);
  let last = val.substr(val.length - 2, 2);
  return `${first}***${last}`;
});
