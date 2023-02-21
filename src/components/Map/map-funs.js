import { Vector as VectorSource, } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
import Feature from "ol/Feature.js";
import { Point } from "ol/geom.js";
import {
  Fill, Icon, Style, Text,
  Circle as CircleStyle,
} from "ol/style";
import { DragPan } from "ol/interaction.js";

// 地图上添加icon
function addIconLayer(id, title, url, coordinates) {
  const vectorSource = new VectorSource()
  const feature = new Feature({
    geometry: new Point(coordinates),
    title: `${title}-text`
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
function addTextLayer(id, title, url, coordinates) {
  const vectorSource = new VectorSource()
  const feature = new Feature({
    geometry: new Point(coordinates), title: `${title}-text`
  })
  const style = new Style({
    image: new Icon({ src: url, scale: 1 }),
    text: new Text({
      fill: new Fill({ color: '#fff' }), font: '20px sans-serif', text: title, scale: [0.65, 0.65], offsetY: 20
    })
  })
  const layer = new VectorLayer({
    source: vectorSource, name: title, title: title, zIndex: 5
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
export default {
  addIconLayer, addTextLayer, setCenter, prohibitDrag, allowDrag
}