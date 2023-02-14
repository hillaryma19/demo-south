<template>
  <baidu-map
    id="map"
    :style="{ height: `${height}px` }"
    :center="center"
    :zoom="zoom"
    @ready="mapReady"
    @click="getClickInfo"
    ><!-- bm-marker 就是标注点 定位在point的经纬度上 跳动的动画 -->
    <!-- <bm-marker
      :position="point"
      animation="BMAP_ANIMATION_BOUNCE"
    ></bm-marker> -->
  </baidu-map>
</template>

<script>
const locationImg = require("@/assets/img/car.png");
export default {
  props: {
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      map: {},
      BMap: {},
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "geometry",
            stylers: {
              color: "#20ab6a",
            },
          },
        ],
      },
      point: {},
      location: locationImg,
    };
  },
  methods: {
    mapReady({ BMap, map }) {
      console.log(BMap, map, "==BMap, map");
      this.center.lng = 116.404;
      this.center.lat = 39.915;
      this.zoom = 15;
      this.map = map;
      this.BMap = BMap;
      // 添加鼠标滚动缩放
      map.enableScrollWheelZoom();
      //添加比例尺控件
      map.addControl(new BMap.ScaleControl());
      //添加地图类型控件
      map.addControl(new BMap.MapTypeControl());
      //设置地图皮肤
      // map.setMapStyleV2({ styleJson: this.mapStyle.styleJson });
      console.log(BMap, map, "==BMap, map");
    },
    //添加Marker
    addMarker(item, index) {
      console.log(item.point, "==item.point");
      const _this = this;
      let point = item.point
        ? new _this.BMap.Point(item.point.lng, item.point.lat)
        : new _this.BMap.Point(item.longitude, item.latitude);
      let marker = new _this.BMap.Marker(point, {
        icon: new _this.BMap.Icon(_this.location, new _this.BMap.Size(50, 50)),
        offset: new _this.BMap.Size(10, -16),
      });
      item.name = `label-${item.point.lng}`;
      _this.addLabel(marker, item); //添加label
      _this.map.addOverlay(marker); //挂载标注
    },
    //添加标注label
    addLabel(markers, item) {
      let _this = this;
      let label = new _this.BMap.Label(item["name"], {
        offset: new _this.BMap.Size(24, -20),
      });
      //label设置样式
      label.setStyle({
        color: "black",
        fontSize: "12px",
        height: "34px",
        border: null,
        padding: "5px",
        // background: `url(${labels})  `,
      });
      markers.setLabel(label);
    },

    //添加标注title
    addTitle(markers, point, item) {
      let _this = this;
      let opts = {
        width: 200, // 信息窗口宽度
        height: 100, // 信息窗口高度
        title: item.name, // 信息窗口标题
      };
      let sContent = `<h2 style='margin:0 0 5px 0;padding:0.2em 0'>
            ${item && item.title ? item.title : "标题"}</h2><h5>${
        item && item.detail ? item.detail : "内容"
      }</h5>`;
      let infoWindow = new _this.BMap.InfoWindow(sContent, opts); // 创建信息窗口对象
      markers.addEventListener("mouseover", function (e) {
        _this.map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
      markers.addEventListener("mouseout", function (e) {
        _this.map.closeInfoWindow(infoWindow, point); //关闭信息窗口
      });
    },

    //添加圆circle
    circle(item) {
      let _this = this;
      _this.map.addOverlay(
        new _this.BMap.Circle(
          { lng: item.longitude, lat: item.latitude },
          900,
          {
            strokeColor: "blue",
            strokeWeight: 2,
            strokeOpacity: 0.5,
          }
        )
      );
    },

    //添加线路polyline
    addPolyline() {
      let _this = this,
        res = {};
      let path = "M0 0 L-4 2 L0 -2 L4 2 Z";
      let sy = new _this.BMap.Symbol(path, {
        fillColor: "#fff",
        fillOpacity: 0.6,
        scale: 0.8, //图标缩放大小
        strokeColor: "#fff", //设置矢量图标的线填充颜色
        strokeWeight: 0, //设置线宽
      });
      let icons = new _this.BMap.IconSequence(sy, "5%", "4%");
      let polyline = new _this.BMap.Polyline(res, {
        icons: [icons], //添加线路箭头
        strokeColor: _this.searchModel.color,
        enableClicking: false, //是否响应点击事件，默认为true
        strokeWeight: "6", //折线的宽度，以像素为单位
        strokeOpacity: 0.5, //折线的透明度，取值范围0 - 1
      });
      _this.map.addOverlay(polyline);
      _this.map.setViewport(res); //根据提供的地理区域或坐标设置地图视野，调整后的视野会保证包含提供的地									理区域或坐标
    },
    //获取定位
    getPosition(BMap, map) {
      new BMap.Geolocation().getCurrentPosition(function (r) {
        console.log(r);
      });
    },

    //强制刷新地图
    refreshMap() {
      this.refresh = false;
      this.$nextTick(() => {
        this.refresh = true;
      });
    },
    // 点击地图
    getClickInfo(e) {
      console.log(e, "=000");
      // this.addMarker(e);
    },
  },
};
</script>
