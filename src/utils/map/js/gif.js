import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import Point from 'ol/geom/Point.js';
import View from 'ol/View.js';
import { Icon, Style } from 'ol/style.js';
import { Stamen, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import '@/utils/gifler.min.js'

const stamenFeature = new Feature({
  geometry: new Point([0, 0]),
});

const vectorSource = new VectorSource({
  features: [stamenFeature],
});

export const stamenVectorLayer = new VectorLayer({
  source: vectorSource,
});

export const stamenTileLayer = new TileLayer({
  source: new Stamen({
    layer: 'toner',
  }),
});

// const map = new Map({
//   layers: [stamenayer, vectorLayer],
//   target: document.getElementById('map'),
//   view: new View({
//     center: [0, 0],
//     zoom: 2,
//   }),
// });

// const gifUrl = '@/assets/img/rain.gif';
// const gif = window.gifler(gifUrl);
// gif.frames(
//   document.createElement('canvas'),
//   function (ctx, frame) {
//     if (!iconFeature.getStyle()) {
//       iconFeature.setStyle(
//         new Style({
//           image: new Icon({
//             img: ctx.canvas,
//             imgSize: [frame.width, frame.height],
//             opacity: 0.8,
//           }),
//         })
//       );
//     }
//     ctx.clearRect(0, 0, frame.width, frame.height);
//     ctx.drawImage(frame.buffer, frame.x, frame.y);
//     window.map.render();
//   },
//   true
// );

// change mouse cursor when over icon
// window.map.on('pointermove', function (e) {
//   const pixel = window.map.getEventPixel(e.originalEvent);
//   const hit = window.map.hasFeatureAtPixel(pixel);
//   window.map.getTarget().style.cursor = hit ? 'pointer' : '';
// });
