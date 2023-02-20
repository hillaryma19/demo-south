<template>
  <div
    class="map-wrapper"
    @drop="onDrop($event)"
    @dragover="onDragOver($event)"
    @dragleave="onDragLeave($event)"
  >
    <div
      id="map"
      class="map"
      :style="{ width: '100%', height: `${height}px` }"
    ></div>
    <div class="popup" ref="popInfo" v-show="isPopupVisible">弹框</div>
    <div id="year"></div>
  </div>
</template>

<script>
import "ol/ol.css";
// import { Map, View } from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ";
import { Overlay } from "ol";
import { defaults as defaultControls } from "ol/control";
import { Projection } from "ol/proj";
import ImageWMS from "ol/source/ImageWMS";
import Image from "ol/layer/Image";
import WMTS from "ol/source/WMTS.js"; //手绘地图以 WMTS （Web Map Tile Service, Web 地图瓦片形式）加载
import WMTSTileGrid from "ol/tilegrid/WMTS.js";
import OlGeomPoint from "ol/geom/Point";
import OlStyleStyle from "ol/style/Style";
import OlStyleIcon from "ol/style/Icon";
import Cluster from "ol/source/Cluster";
import Feature from "ol/Feature";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import { Point, Polygon } from "ol/geom";
import * as turf from "@/utils/turf";
import DragAndDrop from "ol/interaction/DragAndDrop";
// import GeoJSON from "ol/format/GeoJSON.js";
import { GeoJSON, GPX, IGC, KML, TopoJSON, GML } from "ol/format";

import DragPan from "ol/interaction/DragPan"; //先在项目中引用此包
import { fromLonLat } from "ol/proj";
import {
  Style,
  Fill,
  Circle as CircleStyle,
  Icon,
  Stroke,
  Text,
} from "ol/style";
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
    onDrop(event) {
      console.log(event, "==node, data");
      this.dropEvent = event;
      const name = event.dataTransfer.getData("currentName");
      // this.createClusterLabel({ name: name, coordinate: e.coordinate });
      let pan = null;
      console.log(name, "==9999");
      window.map.getInteractions().forEach((element) => {
        if (element instanceof DragPan) {
          pan = element;
        }
      });
      console.log(
        pan,
        this.drop,
        fromLonLat([event.clientX, event.clientY]),
        "==pan"
      );

      // this.createClusterLabel({
      //   name: "999",
      //   coordinates: fromLonLat([event.clientX, event.clientY]),
      // });
    },
    onDragOver(event) {
      event.preventDefault();
    },
    onDragLeave(event) {
      event.preventDefault();
    },
    init() {
      let projection = new Projection({
        code: "EPSG:4326",
        units: "degrees",
        axisOrientation: "neu",
      });
      const _this = this;
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
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://t3.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=49ea1deec0ffd88ef13a3f69987e9a63",
              wrapX: true,
            }),
          }),
        ],
        view: new View({
          projection: "EPSG:4326",
          center: [116.4, 39.9],
          zoom: 4,
        }),
        //加载控件到地图容器中
        controls: defaultControls({
          zoom: false,
          rotate: false,
          attribution: false,
        }),
      });
      window.map = this.map;
      this.singleClick(); //绑定地图点击事件
      this.addOverlay();
      this.createClusterLabel({
        name: "beijing",
        coordinates: [116.403218, 39.92372],
      });
      this.addDragAndDrop();
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
        formatConstructors: [GeoJSON, GPX, IGC, KML, TopoJSON, GML],
      });

      this.drop.on("addfeatures", (e) => {
        console.log(e, "---------------");
      });
      window.map.addInteraction(this.drop);
      window.map.addLayer(layer);
      // window.map.getView().fit(source.getExtent());
      var displayFeatureInfo = function (pixel) {
        console.log(pixel, "==pixel");
        var features = [];
        window.map.forEachFeatureAtPixel(pixel, function (feature) {
          features.push(feature);
        });
        console.log(features, "==features");
        return;
        if (features.length > 0) {
          var info = [];
          var i, ii;
          for (i = 0, ii = features.length; i < ii; ++i) {
            info.push(features[i].get("name"));
          }
        } else {
          console.log(44);
        }
      };

      // window.map.on("pointermove", function (evt) {
      //   // console.log(evt, "===evt");
      //   if (evt.dragging) {
      //     return;
      //   }
      //   var pixel = window.map.getEventPixel(evt.originalEvent);
      //   displayFeatureInfo(pixel);
      // });
      console.log(
        new DragAndDrop({
          source: source,
          formatConstructors: [GeoJSON, GPX, IGC, KML, TopoJSON, GML],
        }).DragAndDropEvent,
        this.drop.getKeys(),
        "==GeoJSON"
      );
    },
    createClusterLabel(data) {
      console.log(data.coordinates, "==data.coordinates");
      let feature = new Feature({
        title: data.name,
        geometry: new Point(data.coordinates),
      });
      feature.setId("11");
      feature.setStyle(
        new Style({
          image: new CircleStyle({
            fill: new Fill({
              color: "blue",
            }),
            radius: 10,
          }),
        })
      );
      let source = new VectorSource();
      source.addFeature(feature);
      let layer = new VectorLayer({
        name: "test1",
        title: "beijing",
      });
      layer.setSource(source);
      window.map.addLayer(layer);
    },
    singleClick() {
      const _this = this;
      // this.$API.commandStaffFindAll({cp:1,rows:30}).then(res =>{})
      window.map.on("singleclick", (e) => {
        console.log(e, e.coordinate, "==console.log(e.coordinate)");
        let feature = window.map.forEachFeatureAtPixel(
          e.pixel,
          (feature) => feature
        );
        if (feature) {
          const getTitle = feature.get("title");
          if (getTitle == "beijing") {
            // 设置弹窗位置
            let coordinates = feature.getGeometry().getCoordinates();
            _this.isPopupVisible = true;
            _this.popupInfo.setPosition(coordinates);
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
    // 创建Overlay
    addOverlay() {
      //添加弹窗元素
      let elPopup = this.$refs.popInfo;
      this.popupInfo = new Overlay({
        element: elPopup,
        positioning: "bottom-center",
        stopEvent: false,
        offset: [0, -20],
        zIndex: 17,
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
  #year {
    position: absolute;
    bottom: 1em;
    left: 1em;
    color: white;
    -webkit-text-stroke: 1px black;
    font-size: 2em;
    font-weight: bold;
  }
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
