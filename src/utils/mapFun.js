import 'ol/ol.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM';
import { Vector as VectorSource } from 'ol/source';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import { Vector as VectorLayer } from "ol/layer";
import { Vector as SourceLayer } from "ol/source";
import { Style, Fill, Circle as CircleStyle, Icon, Stroke, Text } from 'ol/style'
import Feature from 'ol/Feature';
import { Circle } from 'ol/geom';
import DragPan from 'ol/interaction/DragPan'//先在项目中引用此包
import { fromLonLat } from 'ol/proj';
import Cluster from 'ol/source/Cluster';
import { Overlay } from "ol";
import { defaults as defaultControls } from 'ol/control';
import { LineString } from 'ol/geom';
import * as turf from '@turf/turf'
import { Point, Polygon, } from 'ol/geom'
import LinearRing from 'ol/geom/LinearRing';
import { title } from 'process';

function defaultStyle(v) {
    let styleObj = new Style({
        // fill: new Fill({ //填充颜色
        //     color: "rgba(255,255,255,0.1)"
        // }),
        stroke: new Stroke({ // 边缘颜色
            // color: "rgba(156,63,55)",
            color: "rgba(255, 65, 65, 1)",
            width: 4
        }),
    })
    return styleObj
}

function defaultStyle_1(v) {
    let styleObj = new Style({
        // fill: new Fill({ //填充颜色
        //     color: "rgba(255,65,65,0.1)"
        // }),
        stroke: new Stroke({ // 边缘颜色
            // color: "rgba(255, 65, 65, 1)",
            color: "rgba(156,63,55)",

            width: 4
        }),
    })
    return styleObj
}

//画圆
function addCircular(arr, type) {
    let featureArr = [];
    arr.forEach((item, index) => {
        let circle = new Circle(item.site, getRadius(item.radius));// 新建圆对象
        let feature = new Feature({
            title: item.name,
            geometry: circle,
        });// 新建Feature对象 并将circle传入
        let style = new Style({
            // fill: new Fill({ //填充颜色
            //     color: "rgba(255,65,65,0.1)"
            // }),
            stroke: new Stroke({ // 边缘颜色
                color: "rgba(255, 65, 65, 1)",
                width: 4
            }),
        });
        feature.setStyle(style)
        featureArr.push(feature)
        addIcon(item.site, require('@/assets/img/position.png'), item.name + '-名称', item.id)
        addTextIcon(item.site, require('@/assets/img/mapTextBackground.png'), item.name, item.id)
        //场景为干扰 添加扇形
        // if (type == '1') {
        //     addCurve(item.site, 0.01, 100, 30, 0, item.name);
        // }
    })

    let source = new VectorSource()
    source.addFeatures(featureArr)
    let layer = new VectorLayer({
        name: "阵地集合",
        title: "阵地集合"
    })
    layer.setSource(source)
    window.map.addLayer(layer)
}
//半径计算
function getRadius(radius) {
    let metersPerUnit = window.map.getView().getProjection().getMetersPerUnit();
    let circleRadius = radius / metersPerUnit;
    return circleRadius;
}

// 绘制坐标点
function addPoint() {
    let feature = new Feature({
        title: 'beijing',
        geometry: new Point([116.403218, 39.92372]),
    })
    feature.setStyle(
        new Style({
            image: new CircleStyle({
                fill: new Fill({
                    color: 'blue',
                }),
                radius: 4,
            }),
        })
    );
    let source = new VectorSource()
    source.addFeature(feature)
    let layer = new VectorLayer({
        name: 'test1'
    })
    layer.setSource(source)
    window.map.addLayer(layer)
}

function pointermove() {
    window.map.on("pointermove", (e) => {
        if (window.map.hasFeatureAtPixel(e.pixel)) {
            window.map.getViewport().style.cursor = "pointer";
        } else {
            window.map.getViewport().style.cursor = "inherit";
        }
    });
}

function addIcon(position, url, title, id) {
    const vectorSource = new VectorSource()
    window.iconLayer = new VectorLayer({
        source: vectorSource,
        title: title,
        name: title,
        zIndex: 12,
    })
    // 添加图层
    window.map.addLayer(window.iconLayer)
    // 设置图片位置
    const iconFeature = new Feature({
        geometry: new Point(position),
        title: title
    })
    // 设置样式，这里使用图片
    iconFeature.setStyle(new Style({
        image: new Icon({
            src: url,
            scale: 0.5,
            anchor: [0.5, 1.45]
        }),
    }))
    iconFeature.setId(id)
    // 将图片Feature添加到Source
    window.iconLayer.getSource().addFeature(iconFeature)
}

function addUAV(position, url, name, id) {
    if (window.uavLayer == null) {
        const vectorSource = new VectorSource()
        window.uavLayer = new VectorLayer({
            source: vectorSource,
            title: name,
            name: name,
            zIndex: 12,
            visible: window.uavIsShow
        })
        // 添加图层
        window.map.addLayer(window.uavLayer)
    }
    // 设置图片位置
    const iconFeature = new Feature({
        geometry: new Point(position),
        title: id
    })
    // 设置样式，这里使用图片
    iconFeature.setStyle(new Style({
        image: new Icon({
            src: url,
            scale: 0.5,
            // rotation: Math.random() * (5 - 1) + 1,
            anchor: [0.5, 1.45]
        }),
    }))
    iconFeature.setId('无人机' + id)
    // 将图片Feature添加到Source
    window.uavList[id] = iconFeature;
    window.uavLayer.getSource().addFeature(iconFeature)
}

function addTextIcon(position, url, title, id) {
    const vectorSource = new VectorSource()
    window.textIconLayer = new VectorLayer({
        source: vectorSource,
        name: title,
        title: title
    })
    window.textIconLayer.setZIndex(10)
    // 添加图层
    window.map.addLayer(window.textIconLayer)
    // 设置图片位置
    const iconFeature = new Feature({
        geometry: new Point(position),
        title: title + '-名称'
    })
    // 设置样式，这里使用图片
    iconFeature.setStyle(new Style({
        image: new Icon({
            src: url,
            scale: 1
        }),
        text: new Text({ // 设置字体
            fill: new Fill({ // 字体颜色
                color: "#fff",
            }),
            font: "20px sans-serif", // 字体样式
            text: title, // 字体内容
            scale: [0.65, 0.65],
        }),
    }))
    iconFeature.setId(id)
    // 将图片Feature添加到Source
    window.textIconLayer.getSource().addFeature(iconFeature)
}
// 取消图标
function removeIcon() {
    if (window.iconLayer) {
        // 移除图层
        window.map.removeLayer(window.iconLayer)
        window.iconLayer = null
    }
}

function addGeoJsonMap(data) {
    let arr = data || []
    var polygon = turf.polygon(arr[0]);
    var centroid = turf.centroid(polygon);
    let polygonFeature = new Feature({
        title: "阵地",
        type: "polygon",
        geometry: new Polygon(arr[0])
    })
    polygonFeature.setStyle(new Style({
        stroke: new Stroke({
            width: 4,
            color: [63, 221, 250, 1]
        }),
        fill: new Fill({
            color: [0, 0, 0, 0.05]
        })
        // text: new Text({
        // text: "这是区域"
        // })
    }))
    let polygonLayer = new VectorLayer({
        name: "阵地",
        title: "阵地",
        source: new VectorSource({
            features: [polygonFeature]
        })
    })
    window.map.addLayer(polygonLayer)
}

function addGeoJsonMap_s() {
    let arr = [
        [
            [
                [
                    117.210024,
                    40.082262
                ],
                [
                    117.105315,
                    40.074479
                ],
                [
                    117.105315,
                    40.074479
                ],
                [
                    117.102851,
                    40.073563
                ],
                [
                    117.102235,
                    40.073105
                ],
                [
                    117.102235,
                    40.073105
                ],
                [
                    117.102851,
                    40.073563
                ],
                [
                    116.999989,
                    40.030053
                ],
                [
                    116.927924,
                    40.054788
                ],
                [
                    116.783794,
                    40.035093
                ],
                [
                    116.757925,
                    39.968176
                ],
                [
                    116.786874,
                    39.886963
                ],
                [
                    116.926076,
                    39.835524
                ],
                [
                    116.949482,
                    39.778529
                ],
                [
                    116.902055,
                    39.763813
                ],
                [
                    116.90575,
                    39.687883
                ],
                [
                    116.812128,
                    39.616018
                ],
                [
                    116.717273,
                    39.603572
                ],
                [
                    116.717273,
                    39.603572
                ],
                [
                    116.720969,
                    39.599884
                ],
                [
                    116.720969,
                    39.599884
                ],
                [
                    116.726512,
                    39.595274
                ],
                [
                    116.726512,
                    39.595274
                ],
                [
                    116.703106,
                    39.588819
                ],
                [
                    116.703106,
                    39.588819
                ],
                [
                    116.607636,
                    39.619705
                ],
                [
                    116.524484,
                    39.596657
                ],
                [
                    116.440716,
                    39.527466
                ],
                [
                    116.433325,
                    39.44296
                ],
                [
                    116.332927,
                    39.457744
                ],
                [
                    116.245464,
                    39.515466
                ],
                [
                    116.204196,
                    39.588819
                ],
                [
                    116.10195,
                    39.576368
                ],
                [
                    116.10195,
                    39.576368
                ],
                [
                    115.957204,
                    39.561147
                ],
                [
                    115.910393,
                    39.600345
                ],
                [
                    115.910393,
                    39.600345
                ],
                [
                    115.855574,
                    39.554689
                ],
                [
                    115.855574,
                    39.554689
                ],
                [
                    115.846951,
                    39.550999
                ],
                [
                    115.846951,
                    39.550999
                ],
                [
                    115.821081,
                    39.517312
                ],
                [
                    115.821081,
                    39.517312
                ],
                [
                    115.752712,
                    39.512696
                ],
                [
                    115.752712,
                    39.512696
                ],
                [
                    115.738545,
                    39.539464
                ],
                [
                    115.738545,
                    39.539925
                ],
                [
                    115.738545,
                    39.539464
                ],
                [
                    115.738545,
                    39.539925
                ],
                [
                    115.737314,
                    39.544078
                ],
                [
                    115.737314,
                    39.544078
                ],
                [
                    115.723763,
                    39.544539
                ],
                [
                    115.723763,
                    39.544539
                ],
                [
                    115.721299,
                    39.543617
                ],
                [
                    115.721299,
                    39.543617
                ],
                [
                    115.721299,
                    39.55146
                ],
                [
                    115.721299,
                    39.55146
                ],
                [
                    115.716988,
                    39.560225
                ],
                [
                    115.716988,
                    39.560225
                ],
                [
                    115.699125,
                    39.577751
                ],
                [
                    115.698509,
                    39.577751
                ],
                [
                    115.698509,
                    39.577751
                ],
                [
                    115.699125,
                    39.577751
                ],
                [
                    115.698509,
                    39.577751
                ],
                [
                    115.69543,
                    39.579135
                ],
                [
                    115.69543,
                    39.579135
                ],
                [
                    115.586408,
                    39.58928
                ],
                [
                    115.478619,
                    39.650578
                ],
                [
                    115.478619,
                    39.650578
                ],
                [
                    115.498945,
                    39.69617
                ],
                [
                    115.498945,
                    39.69617
                ],
                [
                    115.443511,
                    39.785426
                ],
                [
                    115.443511,
                    39.785426
                ],
                [
                    115.567314,
                    39.816224
                ],
                [
                    115.514344,
                    39.837821
                ],
                [
                    115.522967,
                    39.898898
                ],
                [
                    115.426264,
                    39.95029
                ],
                [
                    115.454597,
                    40.029595
                ],
                [
                    115.599343,
                    40.11979
                ],
                [
                    115.73485,
                    40.129398
                ],
                [
                    115.773038,
                    40.176044
                ],
                [
                    115.85311,
                    40.148609
                ],
                [
                    115.89869,
                    40.234536
                ],
                [
                    115.968907,
                    40.264219
                ],
                [
                    115.9184,
                    40.354103
                ],
                [
                    115.861733,
                    40.364589
                ],
                [
                    115.861733,
                    40.364589
                ],
                [
                    115.779197,
                    40.442501
                ],
                [
                    115.755792,
                    40.540333
                ],
                [
                    115.907929,
                    40.617133
                ],
                [
                    116.005247,
                    40.58397
                ],
                [
                    116.088399,
                    40.62667
                ],
                [
                    116.22021,
                    40.744181
                ],
                [
                    116.247311,
                    40.791762
                ],
                [
                    116.464738,
                    40.771827
                ],
                [
                    116.334159,
                    40.90446
                ],
                [
                    116.473977,
                    40.895867
                ],
                [
                    116.455499,
                    40.98084
                ],
                [
                    116.519557,
                    40.981292
                ],
                [
                    116.519557,
                    40.981292
                ],
                [
                    116.599013,
                    40.974516
                ],
                [
                    116.615643,
                    41.053072
                ],
                [
                    116.688324,
                    41.044499
                ],
                [
                    116.677853,
                    40.970902
                ],
                [
                    116.730208,
                    40.897676
                ],
                [
                    116.858323,
                    40.833423
                ],
                [
                    116.964881,
                    40.70972
                ],
                [
                    117.110858,
                    40.70836
                ],
                [
                    117.286401,
                    40.660719
                ],
                [
                    117.386799,
                    40.684317
                ],
                [
                    117.49582,
                    40.674334
                ],
                [
                    117.389879,
                    40.5617
                ],
                [
                    117.344299,
                    40.582152
                ],
                [
                    117.213104,
                    40.512136
                ],
                [
                    117.225423,
                    40.369148
                ],
                [
                    117.309191,
                    40.279284
                ],
                [
                    117.309807,
                    40.279284
                ],
                [
                    117.309191,
                    40.279284
                ],
                [
                    117.309807,
                    40.279284
                ],
                [
                    117.389879,
                    40.228141
                ],
                [
                    117.367089,
                    40.172387
                ],
                [
                    117.367089,
                    40.172844
                ],
                [
                    117.367089,
                    40.173301
                ],
                [
                    117.367089,
                    40.173301
                ],
                [
                    117.367089,
                    40.172844
                ],
                [
                    117.367089,
                    40.172387
                ],
                [
                    117.344299,
                    40.13443
                ],
                [
                    117.210024,
                    40.082262
                ]
            ]
        ]
    ]
    var polygon = turf.polygon(arr[0]);
    var centroid = turf.centroid(polygon);
    let polygonFeature = new Feature({
        title: "遮罩",
        type: "polygon",
        geometry: new Polygon(arr[0])
    })
    polygonFeature.setStyle(new Style({
        fill: new Fill({
            color: [1, 1, 1, 0.6]
        })
    }))
    window.Mask = new VectorLayer({
        name: "遮罩",
        title: "遮罩",
        source: new VectorSource({
            features: [polygonFeature]
        }),
        visible: true
    })
    window.map.addLayer(window.Mask)
}

function getCenter(coordinate, level) {
    //定位过度动画
    window.map.getView().animate({
        center: coordinate, // 中心点
        zoom: level ? level : 15, // 缩放级别
        rotation: undefined, // 缩放完成view视图旋转弧度
        duration: 500, // 缩放持续时间，默认不需要设置
    });
}

function prohibit() {
    let pan = getPan();
    pan.setActive(false)//false禁止拖拽，true允许拖拽
}

function allow() {
    let pan = getPan();
    pan.setActive(true)//false禁止拖拽，true允许拖拽
}

function getPan() {
    let pan = null
    window.map.getInteractions().forEach(element => {
        if (element instanceof DragPan) {
            pan = element
        }
    })
    return pan
}

function line() {
    // var line = [[116.3063882454204, 39.713151213940364], [116.30623288380139, 39.712567882071575], [116.30613054621755, 39.7113765525989]]
    let featureLine = new Feature({
        geometry: new LineString([
            [116.403218, 39.92372],
            [116.503218, 39.62372],
        ]),
    });
    let source = new VectorSource()
    source.addFeature(featureLine)
    let layer = new VectorLayer({
        name: '线',
        title: "线"
    })
    layer.setSource(source)
    window.map.addLayer(layer)
}

function addCurve(origin, radius, sides, r, angel, name) {
    const SectorStyle = new Style({
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0)'
        }),
        stroke: new Stroke({
            color: 'rgba(32, 157, 230, 0.8)',
            width: 2
        }),
    })
    let featyreArr = []
    let sector = createSector(origin, radius, sides, r, angel)
    featyreArr[0] = new Feature(sector)
    featyreArr[0].setStyle(SectorStyle)
    let vectorSource = new VectorSource(); // 创建一个数据源
    vectorSource.addFeatures([...featyreArr]); // 把图形加进数据源
    window.sectorLayer[name] = new VectorLayer({ // 创建一个图层，把数据源加进图层
        source: vectorSource,
        title: "扇形",
        name: angel,
        id: name,
        visible: false,
        zIndex: 2
    });
    window.map.addLayer(window.sectorLayer[name]); // 把图层加进地图
}

/**
* APIMethod:OpenLayers绘制扇形的接口扩展
* @param origin 圆心
* @param radius 半径
* @param sides 边数 建议100 少了有棱角，多了增加计算量
* @param r 弧度
* @param angel 旋转角度
* @returns {OpenLayers.Geometry.Polygon}
*/
function createSector(origin, radius, sides, r, angel) {
    let rotation = 360 - r;
    let angle = Math.PI * ((1 / sides) + (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    let rotatedAngle, x, y;
    let points = [];
    for (let i = 0; i < sides; ++i) {
        let an = i * ((360 - rotation) / 360);
        rotatedAngle = angle + (an * 2 * Math.PI / sides);
        x = origin[0] + (radius * Math.cos(rotatedAngle));
        y = origin[1] + (radius * Math.sin(rotatedAngle));
        points.push([x, y]);
    }
    if (rotation != 0) {
        points.push(origin);
    }
    window.ring = new LinearRing(points);
    window.ring.rotate((360 - angel) / 57.3, origin);//绘制好后，需要旋转展示，rotate是逆时针旋转，这边需要顺时针，所以用360减去旋转角度得到顺时针旋转角度
    let list = window.ring.getCoordinates()
    return new Polygon([list]);
}
/**
* APIMethod:OpenLayers绘制环形的接口扩展
* @param origin 圆心
* @param radius 外半径
* @param radius2 内半径
* @param sides 边数
* @param r 弧度
* @param angel 旋转角度（环形右边半径与x正向轴的角度）
* @returns {OpenLayers.Geometry.Polygon}
*/
function createRegularPolygonCurve(origin, radius, sides, r, angel, radius2) {
    let rotation = 360 - r;
    let angle = Math.PI * ((1 / sides) + (1 / 2));
    if (rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    let rotatedAngle, x, y;
    let points = [];
    let points2 = [];
    for (let i = 0; i < sides; ++i) {
        let an = i * ((360 - rotation) / 360);
        rotatedAngle = angle + (an * 2 * Math.PI / sides);
        x = origin[0] + (radius * Math.cos(rotatedAngle));
        y = origin[1] + (radius * Math.sin(rotatedAngle));
        points.push([x, y]);
    }
    for (let i = 0; i < sides; ++i) {
        let an = i * ((360 - rotation) / 360);
        rotatedAngle = angle + (an * 2 * Math.PI / sides);
        x = origin[0] + (radius2 * Math.cos(rotatedAngle));
        y = origin[1] + (radius2 * Math.sin(rotatedAngle));
        if (i == 0) {
            points.unshift([x, y]);
        }
        points2.push([x, y]);
    }
    points2.reverse();
    points = points.concat(points2)
    var ring = new LinearRing(points);
    ring.rotate((360 - angel + r) / 57.3, origin);
    let list = ring.getCoordinates()
    return new Polygon([list]);
}

/**
* 分割点
* @param splitNumber 分割成多少个点
* @param path 要分割的点
* @returns {path}
*/
function analysisPath(splitNumber, path) {
    var tempPath = JSON.parse(JSON.stringify(path))
    var pathResults = []
    var tempPoint = [0, 0]
    if (tempPath.length > 1) {
        for (let i = 0; i < tempPath.length - 1; i++) { // 每两个点之间分割出splitNumber个点
            pathResults.push(tempPath[i])
            for (let j = 0; j < splitNumber; j++) {
                tempPoint[0] = (tempPath[i + 1][0] - tempPath[i][0]) * (j + 1) / splitNumber + tempPath[i][0]
                tempPoint[1] = (tempPath[i + 1][1] - tempPath[i][1]) * (j + 1) / splitNumber + tempPath[i][1]
                pathResults.push(JSON.parse(JSON.stringify(tempPoint)))
            }
        }
        pathResults.push(tempPath[tempPath.length - 1])
        path = JSON.parse(JSON.stringify(pathResults))
        return path
    }
}

function prepare(path, id) {
    if (window.routeCoords[id]) {
        // window.elapsedTime[id] = window.routeCoords[id].length;
        path.forEach(item => {
            window.routeCoords[id].push(item)
        })
        return
    }
    window.routeCoords[id] = path;
    // 矢量元素要呈现的几何图形的特征属性LineString代表线段
    let routes = new LineString(window.routeCoords[id])
    window.routeFeature[id] = new Feature({
        type: 'route',
        geometry: routes
    })
    let geoMarker = new Feature({
        type: 'geoMarker',
        geometry: new Point(window.routeCoords[id][0])
    })
    let styles = {
        route: new Style({
            stroke: new Stroke({
                width: 6,
                color: [0, 0, 0, 0]
            })
        }),
        geoMarker: new Style({
            image: new Icon({
                anchor: [0.5, 0.5], // 图标中心
                src: window.url[id] || require('@/assets/img/ld-background.png'),
                scale: 0.6,
                rotation: -Math.atan2(
                    window.routeCoords[id][0][1] - window.routeCoords[id][1][1],
                    window.routeCoords[id][0][0] - window.routeCoords[id][1][0]
                ),
                rotateWithView: true
            })
        })
    }
    window.trackCollectionLayer[id] = new VectorLayer({
        title: "无人机" + id,
        name: "轨迹",
        zIndex: 15,
        source: new VectorSource({
            features: [
                window.routeFeature[id],
                geoMarker,
            ]
        }),
        style: function (feature) {
            if (feature.get('type') === 'geoMarker') {
                return null
            }
            return styles[feature.get('type')]
        }
    })
    window.map.addLayer(window.trackCollectionLayer[id])
    startAnimation(id)
}

function startAnimation(id) {
    // 隐藏geoMarker
    // this.geoMarker.changed()
    // window.map.getView().setCenter(this.center)

    // 添加事件，地图渲染时触发
    if (window.timer[id]) {
        clearInterval(window.timer[id])
    }
    window.timer[id] = setInterval(() => {
        moveFeature(id)
    }, 60)
    window.elapsedTime[id] = 0
    // window.map.on('postcompose', moveFeature(id))
    // window.map.render()

}

function moveFeature(id) {
    if (window.trackCollectionLayer[id]) {
        window.trackCollectionLayer[id].setVisible(window.uavIsShow)
        //     window.trackCollectionLayer[id].setVisible(true)
    }
    var carStyle, rotation
    // 开始动画
    window.elapsedTime[id]++ // elapsedTime 已过时间
    window.index[id] = Math.round((Number(100) * window.elapsedTime[id]) / 100) // 已经走了多少个点
    var x, y
    if (window.index[id] >= window.routeCoords[id].length) {
        clearInterval(window.timer[id])
        window.map.removeLayer(window.trackCollectionLayer[id]);
        window.trackCollectionLayer[id] = null;
        // window.map.un('postcompose', moveFeature(id))
        return
    }
    let opacity = 1;
    if (window.opacityFlag[id]) {
        if (window.index[id] >= window.routeCoords[id].length - 9) {
            opacity = (window.routeCoords[id].length - window.index[id]) / 10;
        }
        if (window.index[id] <= 10) {
            opacity = window.index[id] / 10;
        }
    } else {
        opacity = 1;
    }

    if (window.routeCoords[id][window.index[id]] && window.routeCoords[id][window.index[id] + 1]) {
        x =
            window.routeCoords[id][window.index[id]][0] - window.routeCoords[id][window.index[id] + 1][0]
        y =
            window.routeCoords[id][window.index[id]][1] - window.routeCoords[id][window.index[id] + 1][1]
        // 返回从原点(0,0)到(x,y)点的线段与x轴正方向之间的弧度值
        rotation = Math.atan2(y, x)
    } else {
        rotation = 0
    }
    carStyle = new Style({
        image: new Icon({
            src: window.url[id] || require('@/assets/img/ld-background.png'),
            rotateWithView: false,
            opacity: opacity,
            // rotation:
            //     -rotation +
            //     Math.atan2(
            //         window.routeCoords[id][0][1] - window.routeCoords[id][1][1],
            //         window.routeCoords[id][0][0] - window.routeCoords[id][1][0]
            //     ) /
            //     2,
            scale: 0.6,
            anchor: [0.5, 0.5] // 图标中心
        })
    })
    var line = new Feature({
        geometry: new LineString(window.routeCoords[id])
    })
    var lineStyle = new Style({
        stroke: new Stroke({
            width: 6,
            color: [0, 0, 0, 0]
        })
    })
    line.setStyle(lineStyle)
    var currentPoint = new Point(window.routeCoords[id][window.index[id]])
    // console.log(window.elapsedTime[id])
    // 添加矢量元素
    var feature = new Feature({
        geometry: currentPoint,
        title: id
    })
    // window.map.un('postcompose', moveFeature(id,opacityFlag ))
    feature.setStyle(carStyle)
    if (window.trackCollectionLayer[id]) {
        window.trackCollectionLayer[id].getSource().clear()
        window.trackCollectionLayer[id].getSource().addFeature(window.routeFeature[id])
        window.trackCollectionLayer[id].getSource().addFeature(feature)
    }
    window.map.render()
}


export default {
    defaultStyle,
    defaultStyle_1,
    addCircular,
    getRadius,
    addPoint,
    pointermove,
    addGeoJsonMap,
    addIcon,
    removeIcon,
    addTextIcon,
    getCenter,
    prohibit,
    getPan,
    allow,
    addUAV,
    line,
    addCurve,
    createRegularPolygonCurve,
    createSector,
    analysisPath,
    prepare,
    startAnimation,
    moveFeature,
    addGeoJsonMap_s
}