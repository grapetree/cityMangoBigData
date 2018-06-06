/**
 * 3D 波士顿矩阵
 *
 * @author jia ming
 */

import blue1 from './img/blue1.png';
import blue2 from './img/blue2.png';
import blue3 from './img/blue3.png';

import green1 from './img/green1.png';
import green2 from './img/green2.png';
import green3 from './img/green3.png';
import greenball from './img/greenball.png';

import red1 from './img/red1.png';
import red2 from './img/red2.png';
import red3 from './img/red3.png';
import redball from './img/redball.png';

import yellow1 from './img/yellow1.png';
import yellow2 from './img/yellow2.png';
import yellow3 from './img/yellow3.png';
import yellowball from './img/yellowball.png';


import arrow_right from './img/arrow_right.png';
import arrow_up from './img/arrow_up.png';
import blueball from './img/blueball.png';

import line_right from './img/line_right.png';
import line_up from './img/line_up.png';

import * as THREE from 'three';
import controlScene from './ballControls';
var boxHeight = 780;
var boxOffset = 73;
var boxPosition = 97;
var arrowR = 50;
//箭头线长度
var arrowL = 2700;
//箭头位置
var arrowP = 1066;
//箭头长度
var arrowSize = 200;

var xName = "PC传播力度指数";
var yName = "两微端传播力度指数";



var canvas;

var constQuadrant = {
    name: ["第一象限", "第二象限", "第三象限", "第四象限"],
    color: ["#e52654", "#00bba8", "#085aba", "#329ee1"]
};

function resetCanvas(preserveTransform) {
    if(!canvas) canvas = document.createElement("canvas");
    var context = canvas.getContext("2d");
    if(preserveTransform) context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(preserveTransform) context.restore();
    canvas.width = 256;
    canvas.height = 256;
}

var createTextureWithText = function(text, style) {
    style = style || {};

    resetCanvas();

    var context = canvas.getContext("2d");
    var fontSize = Math.floor(Math.min(canvas.width, canvas.height) / text.length);
    context.font = "normal normal bolder " + fontSize + "px 黑体";
    context.textBaseline = "middle";
    context.fillStyle = style.fillStyle || "#FFFFFF";
    var x = (canvas.width - text.length * fontSize) / 2;
    var y = canvas.height / 2;
    context.fillText(text, x, y);
    context.strokeStyle = style.strokeStyle || "#000000";
    context.strokeText(text, x, y);

    var image = new Image();
    image.src = canvas.toDataURL();
    var texture = new THREE.Texture(image);
    texture.needsUpdate = true;
    return texture;
};

var createTooltipTableData = function(info) {
    var ary = [];

    ary.push("<div class = 'fore-float-tip-3dball' >");
    ary.push("<table class ='fore-float-table-tip-list'>");
    ary.push("<tr height='36px'>");
    ary.push("<td colspan=2>");
    ary.push(info.districtName);
    ary.push("</td>");
    ary.push("</tr>");

    ary.push("<tr>");
    ary.push("<td>");
    ary.push(xName);
    ary.push(" : ");
    ary.push("</td>");
    ary.push("<td style='padding-right:25px;'>");
    ary.push(info.x.toFixed(2));
    ary.push("</td>");
    ary.push("</tr>");

    ary.push("<tr>");
    ary.push("<td>");
    ary.push(yName);
    ary.push(" : ");
    ary.push("</td>");
    ary.push("<td style='padding-right:25px;'>");
    ary.push(info.y);
    ary.push("</td>");
    ary.push("</tr>");

    ary.push("<tr>");
    ary.push("<td colspan=2 style='color:" + constQuadrant.color[info.quadrant] + "'>");
    ary.push(constQuadrant.name[info.quadrant]);
    ary.push("</td>");
    ary.push("</tr>");

    ary.push("</table>");
    ary.push("</div>");

    return ary.join("");
};

export default function(dom, clickFn) {
    var mapDeongaree = {
        light: new THREE.TextureLoader().load(yellow1),
        middle: new THREE.TextureLoader().load(yellow2),
        dark: new THREE.TextureLoader().load(yellow3)
    };
    var mapRed = {
        light: new THREE.TextureLoader().load(red1),
        middle: new THREE.TextureLoader().load(red2),
        dark: new THREE.TextureLoader().load(red3)
    };
    var mapBlue = {
        light: new THREE.TextureLoader().load(blue1),
        middle: new THREE.TextureLoader().load(blue2),
        dark: new THREE.TextureLoader().load(blue3)
    };
    var mapGreen = {
        light: new THREE.TextureLoader().load(green1),
        middle: new THREE.TextureLoader().load(green2),
        dark: new THREE.TextureLoader().load(green3)
    };
    var arrowMapUp1 = new THREE.TextureLoader().load(line_up);
    var arrowMapUp2 = new THREE.TextureLoader().load(arrow_up);
    var arrowMapRight1 = new THREE.TextureLoader().load(line_right);
    var arrowMapRight2 = new THREE.TextureLoader().load(arrow_right);

    var ballMap1 = new THREE.TextureLoader().load(redball);
    var ballMap2 = new THREE.TextureLoader().load(greenball);
    var ballMap3 = new THREE.TextureLoader().load(yellowball);
    var ballMap4 = new THREE.TextureLoader().load(blueball);

    /* tooltip */
    var tipTimerConfig = {
        winEvent: window.event,
        tipHeight: 120,
        tipWidth: 320,
        tooltip: null,
        displayText: "",
        show: function(val, winEvent) {
            "use strict";
            var me = this;

            if(winEvent != null) {
                me.winEvent = winEvent;
            }
            if(val != null) {
                me.displayText = val;
            }

            me.calculateBoxAndShow();
        },
        getScrollX: function() {    
            var scrollX = 0;    
            if(document.documentElement && document.documentElement.scrollLeft) {    
                scrollX = document.documentElement.scrollLeft;
            }    
            else if(document.body && document.body.scrollLeft) {    
                scrollX = document.body.scrollLeft;
            }    
            else if(window.pageXOffset) {    
                scrollX = window.pageXOffset;
            }    
            else if(window.scrollX) {    
                scrollX = window.scrollX;
            }    
            return scrollX;
        },
        getScrollY: function() {    
            var scrollY = 0;    
            if(document.documentElement && document.documentElement.scrollTop) {    
                scrollY = document.documentElement.scrollTop;
            }    
            else if(document.body && document.body.scrollTop) {    
                scrollY = document.body.scrollTop;
            }    
            else if(window.pageXOffset) {    
                scrollY = window.pageYOffset;
            }    
            else if(window.scrollY) {    
                scrollY = window.scrollY;
            }    
            return scrollY;
        },
        calculateBoxAndShow: function() {
            "use strict";

            var me = this;
            var _x = 0;
            var _y = 0;
            var _w = document.documentElement.scrollWidth;
            var _h = document.documentElement.scrollHeight;

            var xMouse = me.winEvent.x + me.getScrollX();
            if(_w - xMouse < me.tipWidth) {
                _x = xMouse - me.tipWidth - 10;
            } else {
                _x = xMouse;
            }

            var _yMouse = me.winEvent.y + me.getScrollY();
            if(_h - _yMouse < me.tipHeight + 18) {
                _y = _yMouse - me.tipHeight - 25;
            } else {

                _y = _yMouse + 18;
            }

            me.addTooltip(_x, _y);
        },
        addTooltip: function(page_x, page_y) {
            "use strict";
            var me = this;

            me.tooltip = document.createElement("div");
            me.tooltip.style.left = page_x + "px";
            me.tooltip.style.top = page_y + "px";
            me.tooltip.style.position = "absolute";

            me.tooltip.style.width = me.tipWidth + "px";
            me.tooltip.style.height = me.tipHeight + "px";
            me.tooltip.className = "fore-float-three-tooltip";

            var divInnerHeader = me.createInner();
            divInnerHeader.innerHTML = me.displayText;
            me.tooltip.appendChild(divInnerHeader);

            document.body.appendChild(me.tooltip);
        },
        createInner: function() {
            "use strict";
            var me = this;
            var divInnerHeader = document.createElement('div');
            divInnerHeader.style.width = me.tipWidth + "px";
            divInnerHeader.style.height = me.tipHeight + "px";
            return divInnerHeader;
        },
        ClearDiv: function() {
            "use strict";
            var delDiv = document.body.getElementsByClassName("fore-float-three-tooltip");
            for(var i = delDiv.length - 1; i >= 0; i--) {
                document.body.removeChild(delDiv[i]);
            }
        }
    };

    //开启Three.js渲染器
    var width = 0;
    var height = 0;
    var renderer, raycaster, INTERSECTED; //声明全局变量（对象）
    var mapRotation = true;
    var rotationFlg = -1;
    var zoom = 1;

    var mouse = new THREE.Vector2();
    mouse.x = Number.MAX_VALUE;
    mouse.y = Number.MAX_VALUE;
    var __pointXY = {
        x: 0,
        y: 0
    };

    function initThree() {
        width = dom.offsetWidth; //获取画布「canvas3d」的宽
        height = dom.offsetHeight; //获取画布「canvas3d」的高
        raycaster = new THREE.Raycaster();
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        }); //生成渲染器对象（属性：抗锯齿效果为设置有效）
        renderer.setSize(width, height); //指定渲染器的高宽（和画布框大小一致）
        //      renderer.setClearColor(0xAAAAAA, 0.0); //设置canvas背景色(clearColor)
        renderer.setPixelRatio(window.devicePixelRatio);
        dom.appendChild(renderer.domElement); //追加 【canvas】 元素到 【canvas3d】 元素中。

        //添加tip等功能用
        dom.addEventListener('mousemove', function(e) {
            var theEvent = window.event || e;
            theEvent.preventDefault();

            mouse.x = ((theEvent.clientX - dom.offsetLeft - dom.parentElement.offsetLeft) / dom.offsetWidth) * 2 - 1;
            mouse.y = -((theEvent.clientY - dom.offsetTop - dom.parentElement.offsetTop) / dom.offsetHeight) * 2 + 1;

            __pointXY.x = theEvent.clientX;
            __pointXY.y = theEvent.clientY;

        }, false);

        //点击处理
        dom.addEventListener('click', function(e) {
            if(INTERSECTED != null) {
                INTERSECTED.click();
            }
        }, false);
    }

    //设置相机
    var camera;

    function initCamera() {
        //设置透视投影的相机,默认情况下相机的上方向为Y轴，右方向为X轴，沿着Z轴朝里（视野角：fov 纵横比：aspect 相机离视体积最近的距离：near 相机离视体积最远的距离：far）
        camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

        camera.position.x = 0; //设置相机的位置坐标
        camera.position.y = 4600; //设置相机的位置坐标
        camera.position.z = 0; //设置相机的位置坐标
        camera.up.x = 0; //设置相机的上为「x」轴方向
        camera.up.y = 1; //设置相机的上为「y」轴方向
        camera.up.z = 0; //设置相机的上为「z」轴方向
        // 设置相机的焦点
        var look = new THREE.Vector3({
            x: 0,
            y: 0,
            z: 0
        });
        camera.lookAt(look); //设置视野的中心坐标
    }

    //设置场景
    var scene;

    function initScene() {
        scene = new THREE.Scene();
    }

    //设置光源
    var light;

    function initLight() {
        light = new THREE.DirectionalLight(0xCD2626, 1.0); //设置平行光源
        light.position.copy(camera.position);
        scene.add(light); // 追加光源到场景
    }

    //设置物体与面
    var o3D = new THREE.Object3D();
    var o3DBox = [];
    var ratio = 1;

    function initObject() {
        var r = width;
        if(r > height) r = height;
        ratio = height / 1080;

        boxHeight = boxHeight * ratio;
        boxOffset = boxOffset * ratio;
        boxPosition = boxPosition * ratio;
        arrowR = arrowR * ratio;
        arrowL = arrowL * ratio;
        arrowP = arrowP * ratio;
        arrowSize = arrowSize * ratio;

        // 创建平面的骨架
        var planeGeometry = new THREE.PlaneBufferGeometry(r, r, 1, 1);
        var lineUpGeometry = new THREE.PlaneBufferGeometry(arrowR, arrowL, 1, 1);
        var lineRightGeometry = new THREE.PlaneBufferGeometry(arrowL, arrowR, 1, 1);
        var arrowGeometry = new THREE.PlaneBufferGeometry(arrowSize, arrowSize, 1, 1);
        var planeBroadwiseGeometry = new THREE.PlaneBufferGeometry(arrowL-400, boxHeight + boxOffset * 2, 1, 1);

        var createPlane = function(x, y, z, rotationX, rotationY, map, geo, opacity) {
            if(opacity == null) {
                opacity = 0.55;
            }
            // 创建平面的材料
            var planeMaterial = new THREE.MeshBasicMaterial({
                map: map,
                transparent: true,
                opacity: opacity,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            // 合成平面
            var plane = new THREE.Mesh(geo, planeMaterial);
            // 设置平面的旋转角度
            plane.rotation.x = rotationX * Math.PI;
            // 设置平面的旋转角度
            plane.rotation.y = rotationY * Math.PI;
            // 设置平面的位置
            plane.position.x = x;
            plane.position.y = y;
            plane.position.z = z;
            return plane;
        };
        var createColorPlane = function(option) {
            var _opacity = 1;
            if(option.opacity) {
                _opacity = option.opacity;
            }
            // 创建平面的材料
            var planeMaterial = new THREE.MeshBasicMaterial({
                color: option.color,
                transparent: true,
                opacity: _opacity,
                side: THREE.DoubleSide,
                depthWrite: false
            });

            // 合成平面
            var plane = new THREE.Mesh(option.geo, planeMaterial);
            // 设置平面的旋转角度
            plane.rotation.x = option.rotationX * Math.PI;
            // 设置平面的旋转角度
            plane.rotation.y = option.rotationY * Math.PI;
            // 设置平面的位置
            plane.position.x = option.x;
            plane.position.y = option.y;
            plane.position.z = option.z;
            return plane;
        };
        var createBube3D = function(offsetX, offsetY, map) {
            var b3D = new THREE.Object3D();
            var planeUp = createPlane(
                offsetX * (boxHeight / 2 + boxOffset),
                offsetY * (boxHeight + boxOffset),
                0, -0.5, 0, map.dark, planeGeometry);
            var planeDown = createPlane(
                offsetX * (boxHeight / 2 + boxOffset),
                offsetY * boxOffset,
                0, -0.5, 0, map.light, planeGeometry);
            var planeleft = createPlane(
                offsetX * (boxHeight + boxOffset),
                offsetY * (boxHeight / 2 + boxOffset),
                0, 0, 0.5, map.dark, planeGeometry);
            var planeRight = createPlane(
                offsetX * boxOffset,
                offsetY * (boxHeight / 2 + boxOffset),
                0, 0, 0.5, map.light, planeGeometry);
            var planeFront = createPlane(
                offsetX * (boxHeight / 2 + boxOffset),
                offsetY * (boxHeight / 2 + boxOffset),
                boxHeight / 2, 0, 0, map.middle, planeGeometry);
            var planeBack = createPlane(
                offsetX * (boxHeight / 2 + boxOffset),
                offsetY * (boxHeight / 2 + boxOffset), -1 * (boxHeight / 2), 0, 0, map.middle, planeGeometry);

            // 在场景中添加平面
            b3D.add(planeUp);
            b3D.add(planeDown);
            b3D.add(planeleft);
            b3D.add(planeRight);
            b3D.add(planeFront);
            b3D.add(planeBack);

            return b3D;
        };

        var createArrow3D = function() {
            var a3D = new THREE.Object3D();

            //x, y, z, rotationX, rotationY, map, geo, opacity
            // 横向的plane
            var planeRightLine1 = createPlane(0, -boxHeight - boxOffset, boxHeight / 2 + boxOffset, -0.5, 0, arrowMapRight1,
                lineRightGeometry, 1);
            a3D.add(planeRightLine1);

            var planeRightLine2 = createPlane(0, -boxHeight - boxOffset, boxHeight / 2 + boxOffset,
                0, 0, arrowMapRight1, lineRightGeometry, 1);
            a3D.add(planeRightLine2);

            // 横向的箭头
            var planeRightArrow1 =
                createPlane(arrowP, -boxHeight - boxOffset,
                    boxHeight / 2 + boxOffset, -0.5,
                    0,
                    arrowMapRight2,
                    arrowGeometry, 1);
            a3D.add(planeRightArrow1);
            var planeRightArrow2 =
                createPlane(arrowP, -boxHeight - boxOffset,
                    boxHeight / 2 + boxOffset,
                    0,
                    0,
                    arrowMapRight2,
                    arrowGeometry, 1);
            a3D.add(planeRightArrow2);

            // 横向的面plane
            var planeBroadwiseLR = createColorPlane({
                x: 0,
                y: -boxHeight - boxOffset,
                z: 0,
                rotationX: -0.5,
                rotationY: 0,
                color: "#87e1e0",
                geo: planeBroadwiseGeometry,
                opacity: 0.08
            });
            a3D.add(planeBroadwiseLR);

            // 纵向的plane
            var planeUpLine1 = createPlane(-boxHeight - boxOffset,
                0,
                boxHeight / 2 + boxOffset, 0, 0, arrowMapUp1, lineUpGeometry, 1);
            a3D.add(planeUpLine1);
            var planeUpLine2 = createPlane(-boxHeight - boxOffset,
                0,
                boxHeight / 2 + boxOffset, 0, 0.5, arrowMapUp1, lineUpGeometry, 1);
            a3D.add(planeUpLine2);

            // 纵向的箭头
            var planeUpArrow1 = createPlane(-boxHeight - boxOffset + 5,
                arrowP,
                boxHeight / 2 + boxOffset, 0, 0.5, arrowMapUp2, arrowGeometry, 1);
            a3D.add(planeUpArrow1);
            var planeUpArrow2 = createPlane(-boxHeight - boxOffset + 5,
                arrowP,
                boxHeight / 2 + boxOffset, 0, 0, arrowMapUp2, arrowGeometry, 1);
            a3D.add(planeUpArrow2);

            // 纵向的面plane
            var planeBroadwiseTB = createColorPlane({
                x: -boxHeight - boxOffset,
                y: 0,
                z: 0,
                rotationX: -0.5,
                rotationY: -0.5,
                color: "#87e1e0",
                geo: planeBroadwiseGeometry,
                opacity: 0.08
            });
            a3D.add(planeBroadwiseTB);
            return a3D;
        };

        //右上
        o3DBox.push(createBube3D(1, 1, mapRed));

        //左上
        o3DBox.push(createBube3D(-1, 1, mapGreen));

        //左下
        o3DBox.push(createBube3D(-1, -1, mapDeongaree));

        //右下
        o3DBox.push(createBube3D(1, -1, mapBlue));

        for(var i = 0; i < o3DBox.length; i++) {
            o3D.add(o3DBox[i]);
        }

        //箭头
        o3D.add(createArrow3D());

        o3D.position.x = 0;
        o3D.position.z = 200;
        o3D.rotation.x = -1.34;
        scene.add(o3D);
    }

    var controls;

    function initControl() {
        controls = new controlScene(camera, renderer.domElement, o3D);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.rotateSpeed = 1.5;
        //位置与大小调整
        controls.minDistance = 300;
        controls.maxDistance = 5000;
    }

    //阴影
    function shadow() {

    }

    //动画刷新
    function animate() {

        requestAnimationFrame(animate);
        //console.log(o3D.position.x,o3D.position.y,o3D.rotation.x);

        //旋转处理
        if(mapRotation == true) {
            var y = o3D.rotation.y + (Math.abs((o3D.rotation.y) * 0.005) + 0.001) * rotationFlg;

            if(y > 0.78) {
                o3D.rotation.y = 0.78;
                rotationFlg = rotationFlg * -1;
            } else if(y < -0.78) {
                o3D.rotation.y = -0.78;
                rotationFlg = rotationFlg * -1;
            } else {
                o3D.rotation.y = y;
            }
        }

        var meshList = [];
        var planeList = [];
        for(var i = 0; i < o3DBox.length; i++) {
            for(var j = 0; j < o3DBox[i].children.length; j++) {
                planeList.push(o3DBox[i].children[j]);
                if(o3DBox[i].children[j].type == "Object3D") {
                    var item = o3DBox[i].children[j];
                    for(var k = 0; k < item.children.length; k++) {
                        item.children[k].rotation.x = -1 * (o3D.rotation.x + 1.41);
                        if(item.children[k].info != null) {
                            meshList.push(item.children[k]);
                        }
                    }
                    item.rotation.y = -1 * o3D.rotation.y;
                }
            }
        }

        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(meshList);

        if(intersects.length > 0) {

            if(INTERSECTED != intersects[0].object) {

                if(INTERSECTED) {
                    INTERSECTED.mouseOut();
                }
                INTERSECTED = intersects[0].object;
                INTERSECTED.mouseOver();
            }

        } else {
            if(INTERSECTED) {
                INTERSECTED.mouseOut();
            }
            INTERSECTED = null;

        }

        var planeTarget = raycaster.intersectObjects(planeList);
        if(planeTarget.length > 0) {
            mapRotation = false;
        } else {
            mapRotation = true;
        }

        controls.update();
        renderer.render(scene, camera);
    }

    initThree();
    initScene();
    initCamera();
    initLight();
    initObject();
    initControl();
    shadow();
    animate();

    var createBoxPlane = function(x, y, z, info, map, box, fn) {

        var ballGeometry = new THREE.PlaneBufferGeometry(69, 69, 1, 1);

        // 创建平面的材料
        var ballMaterial = new THREE.MeshBasicMaterial({
            map: map,
            transparent: true,
            depthWrite: false
        });

        // 合成平面
        var ballPlane = new THREE.Mesh(ballGeometry, ballMaterial);

        ballPlane.info = info;

        var textPlane = new THREE.PlaneGeometry(50, 50, 1, 1);
        var textMaterial = new THREE.MeshBasicMaterial({
            map: createTextureWithText(info.displayName, {
                fillStyle: "#000000",
                strokeStyle: "#FFFFFF"
            }),
            depthWrite: false,
            transparent: true
        });
        var label = new THREE.Mesh(textPlane, textMaterial);

        var oBoxItem = new THREE.Object3D();
        // 设置平面的位置
        oBoxItem.position.x = x;
        oBoxItem.position.y = y;
        oBoxItem.position.z = z;
        oBoxItem.add(ballPlane);
        oBoxItem.add(label);
        ballPlane.mouseOut = function() {
            this.geometry = new THREE.PlaneBufferGeometry(69, 69, 1, 1);
            label.geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
            this.material.color = new THREE.Color(0xcfbeff);

            //          mapRotation = true;

            tipTimerConfig.target = null;
            tipTimerConfig.ClearDiv();
        };
        ballPlane.mouseOver = function() {
            this.geometry = new THREE.PlaneBufferGeometry(138, 138, 1, 1);
            label.geometry = new THREE.PlaneGeometry(100, 100, 1, 1);
            this.material.color = new THREE.Color(0xFFFFFF);
            //          mapRotation = false;

            //hide
            tipTimerConfig.ClearDiv();
            // 添加 div
            tipTimerConfig.show(createTooltipTableData(ballPlane.info), __pointXY);
        };
        ballPlane.click = function() {
            tipTimerConfig.target = null;
            tipTimerConfig.ClearDiv();
            if(fn) fn(ballPlane.info);
        };

        ballPlane.mouseOut();

        box.add(oBoxItem);
    };

    //计算位置逻辑------以下---------
    var Robocon = {};
    var maxData = {
        x: 0,
        y: 0
    };
    var minData = {
        x: 1,
        y: 1
    };
    //  var getPosition = function(p, min, max) {
    //      var val = Math.abs(p) - min;
    //      if(val < 1 / 7 * (max - min)) {
    //          val = 1;
    //      } else if(val < 2 / 7 * (max - min)) {
    //          val = 2;
    //      } else if(val < 3 / 7 * (max - min)) {
    //          val = 3;
    //      } else if(val < 4 / 7 * (max - min)) {
    //          val = 4;
    //      } else if(val < 5 / 7 * (max - min)) {
    //          val = 5;
    //      } else if(val < 6 / 7 * (max - min)) {
    //          val = 6;
    //      } else {
    //          val = 7;
    //      }
    //      if(p < 0) {
    //          val = -1 * val;
    //      }
    //      return val;
    //  };

    var getPosition = function(p, min, max) {
        var val = p - min;
        if(val < 1 / 14 * (max - min)) {
            val = -7;
        } else if(val < 2 / 14 * (max - min)) {
            val = -6;
        } else if(val < 3 / 14 * (max - min)) {
            val = -5;
        } else if(val < 4 / 14 * (max - min)) {
            val = -4;
        } else if(val < 5 / 14 * (max - min)) {
            val = -3;
        } else if(val < 6 / 14 * (max - min)) {
            val = -2;
        } else if(val < 7 / 14 * (max - min)) {
            val = -1;
        } else if(val < 8 / 14 * (max - min)) {
            val = 1;
        } else if(val < 9 / 14 * (max - min)) {
            val = 2;
        } else if(val < 10 / 14 * (max - min)) {
            val = 3;
        } else if(val < 11 / 14 * (max - min)) {
            val = 4;
        } else if(val < 12 / 14 * (max - min)) {
            val = 5;
        } else if(val < 13 / 14 * (max - min)) {
            val = 6;
        } else {
            val = 7;
        }

        return val;
    };

    var changeValueToPosition = function(val) {
        if(val < 0) {
            return -1 * boxOffset + boxPosition * val;
        } else {
            return boxOffset + boxPosition * val;
        }
    };
    var changeValueToPositionZ = function(val) {
        return boxPosition * val - 280;
    };

    var randomPositonZ = function(x, y) {

        var key = x + "_" + y;
        var randomMax = 7;
        if(Robocon[key] != null) {
            randomMax = randomMax - Robocon[key].length;
        }
        var p = Math.floor(Math.random() * randomMax) + 1;
        if(randomMax < 7) {
            var to = 1;
            for(var i = 1; i <= 7; i++) {
                if(Robocon[key].indexOf(i) == -1) {
                    if(to == p) {
                        Robocon[key].push(i);
                        return i;
                    }
                    to++;
                }
            }
        }
        if(Robocon[key] == null) Robocon[key] = [];
        if(Robocon[key].length != 7) {
            Robocon[key].push(p);
        }
        return p;
    };

    var changeInfoName = function(info) {
        if(info.districtName == "内蒙古自治区") {
            info.displayName = "内蒙古";
        } else if(info.districtName == "宁夏回族自治区") {
            info.displayName = "宁夏";
        } else if(info.districtName == "新疆维吾尔自治区") {
            info.displayName = "新疆";
        } else if(info.districtName == "广西壮族自治区") {
            info.displayName = "广西";
        } else if(info.districtName == "香港特别行政区") {
            info.displayName = "香港";
        } else if(info.districtName == "澳门特别行政区") {
            info.displayName = "澳门";
        } else {
            info.displayName = info.districtName;
        }
    };

    return {
        init: function() {

        },
        dispose: function() {

        },
        show: function(jsonData) {
            width = dom.offsetWidth;
            height = dom.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();

            //初始化
            for(var i = 0; i < o3DBox.length; i++) {
                for(var j = o3DBox[i].children.length - 1; j >= 0; j--) {
                    if(o3DBox[i].children[j].type == "Object3D") {
                        o3DBox[i].remove(o3DBox[i].children[j]);
                    }
                }
            }
            Robocon = {};
            maxData = {
                x: 0,
                y: 0
            };
            minData = {
                x: 1,
                y: 1
            };
            for(var i = 0; i < jsonData.length; i++) {
                var info = jsonData[i];
                changeInfoName(info);
                var _x = Math.abs(info.x);
                var _y = Math.abs(info.y);
                if(_x > maxData.x) {
                    maxData.x = _x;
                }
                if(_y > maxData.y) {
                    maxData.y = _y;
                }

                if(_x < minData.x) {
                    minData.x = _x;
                }
                if(_y < minData.y) {
                    minData.y = _y;
                }
            }

            //x ：x轴
            //y : y轴
            for(var i = 0; i < jsonData.length; i++) {
                var info = jsonData[i];
                console.log(info);

                var x = getPosition(info.x, minData.x, maxData.x);
                var y = getPosition(info.y, minData.y, maxData.y);
                var z = changeValueToPositionZ(randomPositonZ(x, y));

                x = changeValueToPosition(x);
                y = changeValueToPosition(y);

                //第一象限
                if(y >= 0 && x >= 0) {
                    info.quadrant = 0;
                    createBoxPlane(x, y, z, info, ballMap1, o3DBox[0], clickFn);
                }

                //第二象限
                if(y >= 0 && x < 0) {
                    info.quadrant = 1;
                    createBoxPlane(x, y, z, info, ballMap2, o3DBox[1], clickFn);
                }

                //第三象限
                if(y < 0 && x < 0) {
                    info.quadrant = 2;
                    createBoxPlane(x, y, z, info, ballMap3, o3DBox[2], clickFn);
                }

                //第四象限
                if(y < 0 && x >= 0) {
                    info.quadrant = 3;
                    createBoxPlane(x, y, z, info, ballMap4, o3DBox[3], clickFn);
                }
            }
        },
        hide: function() {
            tipTimerConfig.target = null;
            tipTimerConfig.ClearDiv();
        },
        resize: function(scale, w, h) {

            zoom = scale;

            width = dom.offsetWidth;
            height = dom.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
    }
};