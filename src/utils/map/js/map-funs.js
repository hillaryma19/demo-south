import { OSM, Vector as VectorSource, Stamen } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import Feature from "ol/Feature.js";
import { Point, Polygon } from "ol/geom.js";
import {
  Fill, Icon, Style, Text,
  Circle as CircleStyle,
} from "ol/style";
import { DragPan } from "ol/interaction.js";

import { Draw } from "ol/interaction.js";
import Snap from 'ol/interaction/Snap.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import "@/utils/gifler.min.js";
const gifImg = require("@/assets/img/rain.gif");

// 地图上添加icon
function addIconLayer(id, title, url, coordinates, type) {
  const concatTitle = `${title}-${type}`
  const vectorSource = new VectorSource()
  const feature = new Feature({
    geometry: new Point(coordinates),
    title: concatTitle
  })
  const style = new Style({
    image: new Icon({ src: url, scale: 1, anchor: [0.5, 1.45] })
  })
  const layer = new VectorLayer({
    source: vectorSource,
    name: title, title: title, zIndex: 4
  })
  feature.setStyle(style)
  feature.setId(id)
  window.iconLayer = layer
  window.map.addLayer(window.iconLayer)
  window.iconLayer.getSource().addFeature(feature)
}

// 地图上添加文字
function addTextLayer(id, title, url, coordinates, type) {
  const concatTitle = `${title}-${type}`
  const vectorSource = new VectorSource()
  const feature = new Feature({
    geometry: new Point(coordinates),
    title: concatTitle
  })
  let icon = null, style = null
  // new Style({
  //   image: new Icon({ src: url, scale: 0.05, crossOrigin: 'anonymous', }),
  //   text: new Text({
  //     fill: new Fill({ color: '#fff' }),
  //     font: '20px sans-serif',
  //     text: title,
  //     scale: [0.65, 0.65], offsetY: 20
  //   })
  // })
  if (url) {
    icon = new Icon({ src: url, scale: 0.05, crossOrigin: 'anonymous', })
  }
  style = new Style({
    image: icon ? icon : '',
    text: new Text({
      fill: new Fill({ color: '#fff' }),
      font: '20px sans-serif',
      text: title,
      scale: [0.65, 0.65], offsetY: 20
    })
  })
  const layer = new VectorLayer({
    source: vectorSource,
    name: title,
    title: title,
    zIndex: 5
  })
  feature.setId(id)
  feature.setStyle(style)
  window.textLayer = layer
  window.map.addLayer(window.textLayer)
  window.textLayer.getSource().addFeature(feature)
}
// 设置中心点
function setCenter(coordinate, zoom) {
  window.map.getView().animate({
    center: coordinate,
    zoom: zoom ? zoom : zoom,
    rotation: undefined,
    duration: 500
  })
}

// 获取拖拽pan
function getDragPan() {
  let pan = null
  window.map.getInteractions().forEach(element => {
    if (element instanceof DragPan) {
      pan = element
    }
  })
  return pan
}

// 禁止拖拽
function prohibitDrag() {
  let pan = getDragPan();
  pan.setActive(false) // false禁止拖拽，true允许拖拽
}

// 允许拖拽
function allowDrag() {
  let pan = getDragPan();
  pan.setActive(true) // false禁止拖拽，true允许拖拽
}

function createClusterLabel(data) {
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
}

// 地图上渲染gif
function renderGif() {
  const stamenFeature = new Feature({
    geometry: new Point([106.33652343750002, 42.844335937500006]),
  });

  const vectorSource = new VectorSource({
    features: [stamenFeature],
  });

  const stamenVectorLayer = new VectorLayer({
    source: vectorSource,
  });

  const stamenTileLayer = new TileLayer({
    source: new Stamen({
      layer: 'toner',
    }),
  });
  // window.map.addLayer(stamenTileLayer)
  window.map.addLayer(stamenVectorLayer)
  const gifUrl = gifImg;
  const gif = window.gifler(gifUrl);
  gif.frames(
    document.createElement("canvas"),
    function (ctx, frame) {
      if (!stamenFeature.getStyle()) {
        stamenFeature.setStyle(
          new Style({
            image: new Icon({
              img: ctx.canvas,
              imgSize: [frame.width, frame.height],
              opacity: 0.8,
              scale: 0.3
            }),
          })
        );
      }
      ctx.clearRect(0, 0, frame.width, frame.height);
      ctx.drawImage(frame.buffer, frame.x, frame.y);
      window.map.render();
    },
    true
  );
}

// Tracing around a Polygon
function interactionSnapAndDraw() {
  // features in this layer will be snapped to
  const baseVector = new VectorLayer({
    source: new VectorSource({
      format: new GeoJSON(),
      url: 'data/geojson/fire.json',
    }),
    style: {
      'fill-color': 'rgba(255, 0, 0, 0.3)',
      'stroke-color': 'rgba(255, 0, 0, 0.9)',
      'stroke-width': 0.5,
    },
  });

  // this is where the drawn features go
  const drawVector = new VectorLayer({
    source: new VectorSource(),
    style: {
      'stroke-color': 'rgba(100, 255, 0, 1)',
      'stroke-width': 2,
      'fill-color': 'rgba(100, 255, 0, 0.3)',
    },
  });
  let drawInteraction;
  const snapInteraction = new Snap({
    source: baseVector.getSource(),
  });
  const typeSelect = 'Polygon'; // LineString ||  Polygon
  window.map.addLayer(baseVector)
  window.map.addLayer(drawVector)
  function addInteraction() {
    const value = typeSelect;
    if (value !== 'None') {
      drawInteraction = new Draw({
        type: value,
        source: drawVector.getSource(),
        trace: true,
        traceSource: baseVector.getSource(),
        style: {
          'stroke-color': 'rgba(255, 255, 100, 0.5)',
          'stroke-width': 1.5,
          'fill-color': 'rgba(255, 255, 100, 0.25)',
          'circle-radius': 6,
          'circle-fill-color': 'rgba(255, 255, 100, 0.5)',
        },
      });
      window.map.addInteraction(drawInteraction);
      window.map.addInteraction(snapInteraction);
    }
  }
  window.map.removeInteraction(drawInteraction);
  window.map.removeInteraction(snapInteraction);
  addInteraction()
}

export default {
  addIconLayer, addTextLayer, setCenter, prohibitDrag, allowDrag, renderGif, interactionSnapAndDraw
}