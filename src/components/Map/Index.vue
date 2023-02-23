<template>
  <div class="map-wrapper">
    <div
      id="map"
      class="map"
      :style="{ width: '100%', height: `${height}px` }"
    ></div>
    <div class="popup" ref="popInfo" v-show="isPopupVisible">弹框</div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { Overlay } from "ol";
import { defaults as defaultControls } from "ol/control";
import { Projection } from "ol/proj";
import ImageWMS from "ol/source/ImageWMS";
import Image from "ol/layer/Image";
import WMTSTileGrid from "ol/tilegrid/WMTS.js";
//手绘地图以 WMTS （Web Map Tile Service, Web 地图瓦片形式）加载
import { Vector as VectorSource, XYZ, WMTS } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import * as turf from "@/utils/turf";
import {
  DragAndDrop,
  DragPan,
  defaults as defaultInteractions,
} from "ol/interaction.js";
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format.js";
import { fromLonLat } from "ol/proj";
import Drag from "@/utils/map/js/drag.js";
import mapFuns from "@/utils/map/js/map-funs.js";
// import { draw, vector, raster } from "./draw.js";
const locationImg = require("@/assets/img/location.png");
const dragAndDropInteraction = new DragAndDrop({
  formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON],
});
const multiArray = [
  [116.495393, 39.950565],
  [109.68103788247656, 32.46230294495827],
  [120.74812974880018, 29.260359882274035],
  [93.44625568598238, 37.21947185582839],
];
window.map = null;
export default {
  props: {
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      map: null,
      image: null,
      isPopupVisible: false,
      popupInfo: null,
      dropEvent: null,
      drop: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      const _this = this;
      const projection = new Projection({
        code: "EPSG:4326",
        units: "degrees",
        axisOrientation: "neu",
      });
      const xyz = new TileLayer({
        source: new XYZ({
          url: "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=49ea1deec0ffd88ef13a3f69987e9a63",
          wrapX: true,
        }),
      });
      this.image = new Image({
        source: new ImageWMS({
          //不能设置为0，否则地图不展示。
          ratio: 1,
          url: "http://192.168.1.51:8080/geoserver/yangchao/wms?service=WMS&version=1.1.0&request=GetMap&layers=yangchao%3Abeijing_all&bbox=115.41728200000011%2C39.43828200000007%2C117.50012600000011%2C41.05924400000007&width=768&height=597&srs=EPSG%3A4326&styles=&format=application/openlayers",
          serverType: "geoserver",
        }),
        visible: true,
      });
      _this.satelliteMap = new TileLayer({
        source: new WMTS({
          url: "http://192.168.1.51:8080/geoserver/gwc/service/wmts",
          layer: "yangchao:北京市_18", //注意每个图层这里不同
          matrixSet: "EPSG:4326",
          format: "image/png",
          style: "",
          projection: projection,
          tileGrid: new WMTSTileGrid({
            tileSize: [256, 256],
            extent: [-180.0, -90.0, 180.0, 90.0],
            origin: [-180.0, 90.0],
            resolutions: [
              0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125,
              0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125,
              0.001373291015625, 6.866455078125e-4, 3.4332275390625e-4,
              1.71661376953125e-4, 8.58306884765625e-5, 4.291534423828125e-5,
              2.1457672119140625e-5, 1.0728836059570312e-5,
              5.364418029785156e-6, 2.682209014892578e-6, 1.341104507446289e-6,
              6.705522537231445e-7, 3.3527612686157227e-7,
            ],
            matrixIds: [
              "EPSG:4326:0",
              "EPSG:4326:1",
              "EPSG:4326:2",
              "EPSG:4326:3",
              "EPSG:4326:4",
              "EPSG:4326:5",
              "EPSG:4326:6",
              "EPSG:4326:7",
              "EPSG:4326:8",
              "EPSG:4326:9",
              "EPSG:4326:10",
              "EPSG:4326:11",
              "EPSG:4326:12",
              "EPSG:4326:13",
              "EPSG:4326:14",
              "EPSG:4326:15",
              "EPSG:4326:16",
              "EPSG:4326:17",
              "EPSG:4326:18",
              "EPSG:4326:19",
              "EPSG:4326:20",
              "EPSG:4326:21",
            ],
          }),
          wrapX: true,
        }),
        visible: false,
      });
      this.map = new Map({
        target: document.getElementById("map"),
        interactions: defaultInteractions().extend([
          dragAndDropInteraction,
          new Drag(),
        ]),
        //interactions new Drag(), draw: raster, vector
        layers: [xyz],
        view: new View({
          projection: "EPSG:4326",
          center: [116.4, 39.9],
          zoom: 4,
          minZoom: 1,
          maxZoom: 18,
        }),
        //加载控件到地图容器中
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
      });
      window.map = this.map;
      multiArray.forEach((item, index) => {
        let id = index + 1,
          name = "icon-" + index;
        // mapFuns.addIconLayer(id, name, locationImg, item);
        mapFuns.addTextLayer(id, name, locationImg, item, "facility");
      });
      this.singleClick(); //绑定地图点击事件
      this.addOverlay();
      // this.addDragAndDrop();
      mapFuns.renderGif();
      // mapFuns.interactionSnapAndDraw();
    },
    addDragAndDrop() {
      const _this = this;
      const source = new VectorSource(); //创建一个没有初始数据的矢量源
      const layer = new VectorLayer({
        //创建一个新的layer，并将其添加到地图
        source: source,
      });
      this.drop = new DragAndDrop({
        source: source,
        formatConstructors: [GeoJSON, GPX, IGC, KML, TopoJSON],
      });

      this.drop.on("addfeatures", (e) => {
        console.log(e, "---------------");
      });
      window.map.addInteraction(this.drop);
      window.map.addLayer(layer);
    },
    singleClick() {
      const _this = this;
      // this.$API.commandStaffFindAll({cp:1,rows:30}).then(res =>{})
      window.map.on("singleclick", (e) => {
        console.log(
          e,
          e.coordinate,
          window.map.getPixelFromCoordinate(e.coordinate),
          "===singleClick"
        );
        let feature = window.map.forEachFeatureAtPixel(
          e.pixel,
          (feature) => feature
        );
        this.initLayers();
        if (feature) {
          // let id = feature.id;
          const getTitle = feature.get("title");
          const textFill = feature.getStyle().getText().getFill();
          if (getTitle && getTitle.indexOf("-facility") != -1) {
            // 设置弹窗位置
            let coordinates = feature.getGeometry().getCoordinates();
            textFill.setColor("#000");
            _this.isPopupVisible = true;
            _this.popupInfo.setPosition(coordinates);
            mapFuns.setCenter(coordinates);
          } else {
            _this.isPopupVisible = false;
          }
        } else {
          _this.isPopupVisible = false;
        }
      });
      // window.map.once("pointerdrag", function (event) {
      //   console.log(event, "地图发生拖拽");
      //   console.log("pointerdrag事件注销");
      // });
    },
    initLayers() {
      const getLayersArray = window.map.getAllLayers();
      getLayersArray.forEach((item) => {
        if (item.get("name")) {
          item
            .getSource()
            .getFeatures()
            .forEach((feature) => {
              const txt = feature.getStyle().getText();
              if (txt) {
                const textFill = txt.getFill();
                textFill.setColor("#fff");
                item.changed();
              }
            });
        }
      });
    },
    // 创建Overlay
    addOverlay() {
      //添加弹窗元素
      let elPopup = this.$refs.popInfo;
      this.popupInfo = new Overlay({
        element: elPopup,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -30],
        zIndex: 8,
      });
      window.map.addOverlay(this.popupInfo);
    },
  },
};
</script>
<style lang="scss" scoped>
.map-wrapper {
  width: 100%;
  height: 100%;
  #map {
    width: 100%;
    height: 100%;
  }
  .popup {
    width: 200px;
    height: 200px;
    background-color: lightgreen;
  }
}
</style>
