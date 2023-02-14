<template>
  <div style="width: 100%; height: 100%">
    <div class="map" id="map"></div>
    <el-card id="popup" class="popup">
      <div class="popupContainer"></div>
    </el-card>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import Overlay from "ol/Overlay";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import View from "ol/View";
import { transform } from "ol/proj";
import XYZ from "ol/source/XYZ";
import Point from "ol/geom/Point";
import GeoJSON from "ol/format/GeoJSON";
import { Fill, Stroke, Icon, Style } from "ol/style";
import markerImg from "@/assets/img/location.png";
export default {
  name: "openlayersMap",
  data() {
    return {
      mapObj: null,
      mapDom: null,
      mapPointList: [],
      pointLayerSource: null,
      pointLayer: null,
      markerIcon: markerImg,
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    // 清除地图 某些情况 地图容器会存在两个 导致地图无法正常显示 这个问题折腾了我半天。
    // 找了半天官方貌似也没有提供 对应的 api，自己动手了。
    mapClear() {
      if (this.mapDom) {
        this.mapDom.innerHTML = "";
        this.mapDom = null;
      }
    },

    // 初始化地图
    initMap() {
      // 先尝试清除
      this.mapClear();
      // 获取地图容器
      this.mapDom = document.getElementById("map");

      // 初始化地图配置
      this.mapObj = new Map({
        target: this.mapDom, // 地图容器
        view: new View({
          //设置你的地图初始中心点
          center: [117.990969, 36.635013], // 地图中心点
          zoom: 10, // 缩放
          projection: "EPSG:4326", // 坐标系
        }),
      });

      // 添加一个使用离线瓦片地图的层
      const offlineMapLayer = new TileLayer({
        source: new XYZ({
          //这里的url就是你要改的地方
          // url: "http://192.168.3.6:8081" + "/{z}/{x}/{y}.png", // 设置本地离线瓦片所在路径
          url: "http://127.0.0.1:8081" + "/{z}/{x}/{y}.png", // 设置本地离线瓦片所在路径
        }),
      });
      // 将图层添加到地图
      this.mapObj.addLayer(offlineMapLayer);

      // 加载地理坐标
      this.addPoint();
    },

    // 添加地理坐标
    addPoint() {
      this.delPointAll();
      // 地理坐标数组
      const pointData = [{ longitude: 117.990969, latitude: 36.635013 }];

      pointData.map((item) => {
        // 创建点
        const point = new Feature({
          geometry: new Point([item.longitude, item.latitude]),
          data: item,
        });

        // 点的样式
        const iconStyle = new Style({
          image: new Icon({
            // color: "#ffffff",
            crossOrigin: "anonymous",
            src: this.markerIcon,
            scale: 0.1,
          }),
        });
        // 设置样式
        point.setStyle(iconStyle);
        // 保存到数据  方便删除
        this.mapPointList.push(point);
      });

      // 创建geojson据源
      this.pointLayerSource = new VectorSource({ features: this.mapPointList });
      // 创建图层 并加载数据
      this.pointLayer = new VectorLayer({ source: this.pointLayerSource });
      // 将图层添加地图上
      this.mapObj.addLayer(this.pointLayer);
    },

    // 地理点位删除
    delPointAll() {
      // 判断 删除的数据源是否存在
      if (this.pointLayerSource) {
        // 遍历删除
        this.mapPointList.map((item) => {
          this.pointLayerSource.removeFeature(item);
        });

        // 删除图层 重置数据
        this.mapObj.removeLayer(this.pointLayer);
        this.pointLayerSource = null;
        this.pointLayer = null;
        this.mapPointList = [];
      }
    },
  },
  beforeDestroy() {
    this.mapClear();
  },
};
</script>

<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>
