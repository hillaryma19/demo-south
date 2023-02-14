<template>
  <div id="map" class="map" :style="{ height: `${height}px` }"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import OSM from "ol/source/OSM.js";
import TileLayer from "ol/layer/Tile.js";
import XYZ from "ol/source/XYZ";

export default {
  props: {
    height: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return { map: null };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      console.log(444);
      this.map = new Map({
        target: "map", // 指向对象
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
      console.log(this.map);
    },
  },
};
</script>
<style lang="scss" scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
