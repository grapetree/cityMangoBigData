var map;
var layersgroup_base;

var pointstring1;
var pointstring2;
(function selectPointstring(){
    console.log(1111111111);
}());


//初始化地图
function initmap() {
    var layers = [];

    var projection = ol.proj.get('EPSG:4326')

    var mousePositionControl = new ol.control.MousePosition({
        coordinateFormat: ol.coordinate.createStringXY(4),
        projection: 'EPSG:4326',
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });

    var attribution = new ol.control.Attribution({
        collapsible: true,
        label: 'I',
        collapsed: true,
        tipLabel: '地图版权'
    });

    //var mapExtent = [116.768306946875, 28.193113646093753, 116.901917346875, 28.28168084609375];

    map = new ol.Map({
        controls: ol.control
        //.defaults()
            .defaults({attribution: false/*,zoom:false*/})
            .extend([attribution])
            .extend([
                new ol.control.ScaleLine({
                    units: 'metric'//'degrees'
                })
            ])
            .extend([mousePositionControl]),
        logo: null,
        //layers: layers,
        target: document.getElementById('MyMapDiv'),
        view: new ol.View({
            projection: projection,
            //extent:[mapExtent[0]+0.03,mapExtent[1]+0.02,mapExtent[2]-0.03,mapExtent[3]-0.02],
            maxZoom: 16,
            minZoom: 10
        })
    });

    //zoomslider = new ol.control.ZoomSlider();
    //map.addControl(zoomslider)

    //华坪县坐标
    var lon = 101.2871;
    var lat = 26.64;
    var zoom = 12;
    var center = [lon, lat];

    map.getView().setCenter(center);
    map.getView().setZoom(zoom);


    /**
     * Add a click handler to the map to render the popup.
     */
    map.on('singleclick', function (evt) {

        var feature = map.forEachFeatureAtPixel(
            evt.pixel,
            function (feature) {
                return feature
            }/*,
            function (layer) {
                //return layer === pointLayer1;
                return false;
            }*/
        );


        if (feature) {
            var type = feature.getGeometry().getType();
            if (type != 'Point') return;
            if (feature.get('id') == null) return;

            if (feature.get("type") == 1) {
                window.parent.windowThisFun.getDeviceListByBaseCode(feature.get('id'));
                //此处根据id去后台取回下属设备组合格式后，给pointstring2,然后调用refreshVectorLayer(2)
                //注：界面上返回按钮调用refreshVectorLayer方法之前最好也重新从后台取数据放入pointstring1.防止后台被其他用户编辑后数据改变。
                setTimeout(function () {
                    refreshVectorLayer(2);
                },300)

            } else {
                console.log(feature.get('id'));
                window.parent.windowThisFun.showModal(feature.get('id'))
            }


        }
    });
    // change mouse cursor when over marker
    map.on('pointermove', function (e) {
        /*    if (e.dragging) {
              $(element).popover('destroy');
              return;
            }*/
        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel,{
            layerFilter: function (layer) {
                return layer.get('layername') !== 'mastLayer';
            }
        });
        //console.log("hit:"+hit);
        map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

    addVectorLayer();
    refreshVectorLayer(1);
}


var mastLayer;

/**
 * 加载basegroup图层组，目前为 全球矢量地图服务 和 全球矢量中文注记服务
 * */
function loadlayersgroup_base() {
    //console.log("进入gis_index.js中loadlayersgroup_base()");

    layersgroup_base = new ol.layer.Group();
    layersgroup_base.set('layername', 'layersgroup_base');

    //加载天地图
    layersgroup_base.getLayers().push(getTdtLayer2('img_c'));
    layersgroup_base.getLayers().push(getTdtLayer2('cia_c'));

    map.addLayer(layersgroup_base);

    //遮罩层
    var polygonstring = {
        "type": "FeatureCollection",
        "features":
            [
                {
                    "type": "Feature",
                    "geometry":
                        {
                            "type": "Polygon",
                            //"coordinates": [[[0,0],[0,180],[180,0],[180,180]]]
                            "coordinates": [[[0, 180], [180, 180], [180, 0], [0, 0]]]
                        }
                }
            ]
    };

    var polygonArr = new ol.format.GeoJSON().readFeatures(polygonstring);
    var vectorSource = new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        features: polygonArr,
        strategy: ol.loadingstrategy.bbox
    });

    mastLayer = new ol.layer.Vector({
        visible: true,
        source: vectorSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0)'
            })
        })
    });
    mastLayer.set('layername', 'mastLayer');
    map.addLayer(mastLayer);
    //mastLayer.setVisible(false);
    mastLayer.setZIndex(99);


}

/**
 * 获取天地图wmts服务图层---------正常方式
 *
 * @param {String} t
 * 1.'vec_c' 全球矢量地图服务
 * 2.'cva_c' 全球矢量中文注记服务
 * 3.'img_c' 全球影像底图服务
 * 4.'cia_c' 全球影像中文注记服务
 * 5.更多服务可查询http://www.tianditu.com/service/query.html#
 * @returns
 */
function getTdtLayer2(t) {
    var projection = ol.proj.get('EPSG:4326')
    var projectionExtent = projection.getExtent()
    var size = ol.extent.getWidth(projectionExtent) / 256
    var resolutions = new Array(20)
    var matrixIds = new Array(20)

    for (var z = 0; z <= 20; ++z) {
        resolutions[z] = size / Math.pow(2, z)
        matrixIds[z] = z
    }

    var layername = t.substr(0, 3)

    var attribution = new ol.Attribution({
        html: ' <!--<a href="http://www.tianditu.cn/">-->地图数据版权所有：&copy;天地图<!--</a>-->'
    });

    var layer = new ol.layer.Tile({
        name: 'ssss',
        source: new ol.source.WMTS({
            attributions: [attribution],
            url: 'http://t{0-6}.tianditu.com/' + t + '/wmts',
            layer: layername,
            format: 'tiles',
            tileGrid: new ol.tilegrid.WMTS({
                origin: ol.extent.getTopLeft(projectionExtent),
                resolutions: resolutions,
                matrixIds: matrixIds
            }),
            matrixSet: 'c',
            style: 'default'
        })
    })

    return layer
}

function getstyle_jidi(feature) {
    var src_str = 'image/location_new1.png';

    var image_point = new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ ({
            scale: 1,
            // anchor: [25, 40],
            anchor: [0.5, 1],
            // anchorXUnits: 'pixels',
            // anchorYUnits: 'pixels',
            //src: 'image/dw_red.png'
            src:src_str
        })
    );

    var style = new ol.style.Style({
        image: image_point,
        text: new ol.style.Text({
            textAlign: 'left',
            textBaseline: 'middle',
            font: 'nomarl 18px Arial',
            text: feature.get('name'),//'名称',
            fill: new ol.style.Fill({color: "#aa3300"}),
            stroke: new ol.style.Stroke({color: "#ffffff", width: 3}),
            offsetX: 20,
            offsetY: -20,
            placement: 'point',
            maxAngle: 0.7853981633974483,
            overflow: true,
            rotation: "0"
        })
    });

    return style;
}
function getstyle_shebei(feature) {

    var src_str = 'image/location_new2.png';

    var image_point = new ol.style.Icon(
        /** @type {olx.style.IconOptions} */ ({
            scale: 1,
            // anchor: [25, 40],
            anchor: [0.5, 1],
            // anchorXUnits: 'pixels',
            // anchorYUnits: 'pixels',
            //src: 'image/dw_red.png'
            src:src_str
        })
    );

    var style = new ol.style.Style({
        image: image_point,
        text: new ol.style.Text({
            textAlign: 'left',
            textBaseline: 'middle',
            font: 'nomarl 18px Arial',
            text: feature.get('name'),//'名称',
            fill: new ol.style.Fill({color: "#aa3300"}),
            stroke: new ol.style.Stroke({color: "#ffffff", width: 3}),
            offsetX: 20,
            offsetY: -20,
            placement: 'point',
            maxAngle: 0.7853981633974483,
            overflow: true,
            rotation: "0"
        })
    });

    return style;
}


var pointVectorSource1;
var pointVectorSource2;

var pointLayer1;
var pointLayer2;

function addVectorLayer() {
    //console.log(jidipointstring)
    /*if (jidipointstring) {
        var pointArr = new ol.format.GeoJSON().readFeatures(jidipointstring);

        //添加点图层
        var pointVectorSource = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            features: pointArr,
            strategy: ol.loadingstrategy.bbox
        });

        var pointLayer = new ol.layer.Vector({
            visible: true,
            source: pointVectorSource,
            style: getstyle_jidi
        });
        pointLayer.set('layername', 'pointLayer');
        map.addLayer(pointLayer);
        var pointVectorSourceExtent = pointVectorSource.getExtent();
        //设置显示范围
        if (!ol.extent.isEmpty(pointVectorSourceExtent)) {
            map.getView().fit(pointVectorSourceExtent);
        }
        console.log("基地数：" + pointLayer.getSource().getFeatures().length)

    }*/

    //添加点图层
    pointVectorSource1 = new ol.source.Vector();

    pointLayer1 = new ol.layer.Vector({
        visible: true,
        source: pointVectorSource1,
        style: getstyle_jidi
    });
    pointLayer1.set('layername', 'pointLayer1');
    map.addLayer(pointLayer1);
    pointLayer1.setVisible(false);
    pointLayer1.setZIndex(998);

    //添加点图层
    pointVectorSource2 = new ol.source.Vector();

    pointLayer2 = new ol.layer.Vector({
        visible: true,
        source: pointVectorSource2,
        style: getstyle_shebei
    });
    pointLayer2.set('layername', 'pointLayer2');
    map.addLayer(pointLayer2);
    pointLayer2.setVisible(false);
    pointLayer2.setZIndex(999);
}

function refreshVectorLayer(layertype) {
    console.log("refreshVectorLayer");
    pointstring1 = window.parent.windowThisFun.state.pointstring1;
    pointLayer1.setVisible(false);
    pointLayer2.setVisible(false);
    document.getElementById("return_button").style.display = "none";
    if (layertype == 1) {
        console.log(pointstring1);

        console.log(pointstring1.length);

        if(pointstring1.type == undefined) return;

        pointLayer1.setVisible(true);
        var pointArr1 = new ol.format.GeoJSON().readFeatures(pointstring1);
        pointVectorSource1 = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            features: pointArr1,
            strategy: ol.loadingstrategy.bbox
        });
        pointLayer1.setSource(pointVectorSource1);

        var pointVectorSourceExtent = pointVectorSource1.getExtent();
        //设置显示范围
        if (!ol.extent.isEmpty(pointVectorSourceExtent)) {
            map.getView().fit(pointVectorSourceExtent);
        }
        console.log("合作社数：" + pointVectorSource1.getFeatures().length)

    } else if (layertype == 2) {
        pointstring2 = window.parent.windowThisFun.state.pointstring2;
        console.log(pointstring2);
        if(pointstring2.type == undefined) return;
        pointLayer2.setVisible(true);
        var pointArr2 = new ol.format.GeoJSON().readFeatures(pointstring2);
        pointVectorSource2 = new ol.source.Vector({
            format: new ol.format.GeoJSON(),
            features: pointArr2,
            strategy: ol.loadingstrategy.bbox
        });
        pointLayer2.setSource(pointVectorSource2);

        var pointVectorSourceExtent = pointVectorSource2.getExtent();
        //设置显示范围
        if (!ol.extent.isEmpty(pointVectorSourceExtent)) {
            map.getView().fit(pointVectorSourceExtent);
        }
        console.log("设备数：" + pointVectorSource2.getFeatures().length)

        document.getElementById("return_button").style.display = "";
    }
    if (map.getView().getZoom() >= 16) {
        map.getView().setZoom(16);
    }


}

function locationByid(layername, item_id) {
    var searchlayer;

    var alllayers = map.getLayers();
    var alllayerscount = alllayers.getLength();
    for (i = alllayerscount - 1; i >= 0; i--) {
        var templayer = alllayers.item(i);
        if (templayer.get('layername') == layername) {
            //console.log("找到图层");
            searchlayer = templayer;
            break;
        }
    }

    var currentfeature = null;
    var features = searchlayer.getSource().getFeatures();

    for (i = 0; i < features.length; i++) {
        //console.log("features[i].get('id'):"+features[i].get('id'));
        if (features[i].get('id') == item_id) {
            //console.log("找到feature");
            currentfeature = features[i];
            break;
        }
    }

    if (currentfeature) {
        var geo = currentfeature.getGeometry();
        var geotype = geo.getType();

        if (geotype == 'Point') {
            map.getView().setCenter(geo.getCoordinates())
            map.getView().setZoom(15)
        } else if (geotype == 'Polygon') {
            map.getView().fit(geo.getExtent(), {padding: [100, 100, 100, 100]})
            if (map.getView().getZoom() >= 16) {
                map.getView().setZoom(16);
            }
        } else {
            console.log('error');
        }

    }
}
