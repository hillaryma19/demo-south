<template>
  <div class="container">
    <div class="inner" ref="wrapperInner">
      <baidu-map
        id="map"
        :style="{ height: `${drawerData.drawerHeight}px` }"
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
      <div class="tabs-box">
        <el-tabs
          v-model="activeName"
          tab-position="left"
          @tab-click="handleTabClick"
        >
          <el-tab-pane label="阵营1" name="1">
            <el-container style="height: 100%">
              <div class="left scroll-bar-style" ref="leftBox">
                <el-tree
                  :data="treeData"
                  :props="defaultProps"
                  :expand-on-click-node="false"
                  default-expand-all
                >
                  <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span v-if="!data.children">
                      <el-button
                        type="text"
                        size="small"
                        @click="() => handleNodeClick(data)"
                      >
                        详情
                      </el-button>
                      <el-button
                        type="text"
                        size="small"
                        @click="() => handleDeploy(data)"
                      >
                        部署
                      </el-button>
                    </span>
                  </span></el-tree
                >
              </div>
            </el-container>
          </el-tab-pane>
          <el-tab-pane label="阵营2" name="2">阵营2</el-tab-pane>
          <el-tab-pane label="阵营3" name="3">阵营3</el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <right-panel
      :drawer-data="drawerData"
      @handleDrawerInfo="getDrawerInfo"
    ></right-panel>
    <power-add
      :dialog-data="dialogData"
      @handleDialogInfo="getDialogInfo"
    ></power-add>
  </div>
</template>

<script>
const RightPanel = () => import("@/components/RightPanel/Index.vue");
const PowerAdd = () => import("@/components/CampTabs/PowerAdd.vue");
const locationImg = require("@/assets/img/location.png");
export default {
  name: "PowerDeployment",
  components: { RightPanel, PowerAdd },
  data() {
    return {
      center: { lng: 0, lat: 0 },
      zoom: 3,
      dialogData: {
        dialogVisible: false,
      },
      drawerData: {
        drawerVisible: false,
        drawerHeight: 500,
        type: 2,
      },
      activeName: "1",
      treeData: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      listData: [
        { id: 1, name: "康维尔240型“北京”号飞机" },
        { id: 2, name: "道格拉斯DC-3/C-47型飞机" },
        { id: 3, name: "里-2型飞机" },
        { id: 4, name: "伊尔-12型飞机" },
      ],
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
  mounted() {
    this.$nextTick(() => {
      this.onWindowResize();
      window.onresize = () => {
        this.onWindowResize();
      };
    });
  },
  methods: {
    onWindowResize() {
      this.$nextTick(() => {
        let wrapperInner = this.$refs.wrapperInner;
        if (wrapperInner) {
          this.drawerData.drawerHeight = wrapperInner.offsetHeight;
          console.log(wrapperInner.offsetHeight);
        }
      });
    },
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
      let _this = this;
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
      this.addMarker(e);
    },
    getDialogInfo() {
      this.dialogData.dialogVisible = false;
    },
    getDrawerInfo() {
      this.drawerData.drawerVisible = false;
    },
    handleNodeClick(data) {
      if (!data.children) {
        this.drawerData.drawerVisible = true;
      }
    },
    handleTabClick(tab) {
      this.activeName = tab.name;
      console.log(tab);
    },
    // 点击部署
    handleDeploy(data) {
      console.log(data, "==999");
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    .tabs-box {
      position: absolute;
      left: 0;
      top: 0;
      background: #fff;
      padding: 0 0 4px 0;
    }
    .left {
      width: 200px;
      height: 100%;
    }
  }
  #map {
    width: 100%;
    height: 100%;
  }
}
</style>
