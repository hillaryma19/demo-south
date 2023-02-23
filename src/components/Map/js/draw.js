
import { Draw } from "ol/interaction.js";
import { OSM, Vector as VectorSource } from "ol/source.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";
const source = new VectorSource({ wrapX: false });
export const vector = new VectorLayer({
  source: source,
});
export const raster = new TileLayer({ source: new OSM() });
export const draw = new Draw({ source: source, type: "LineString", freehand: true, });
// draw.removeLastPoint(); 撤销
// draw type: LineString, Polygon, Point, Circle, None

// window.map.removeInteraction(draw);

// export default draw