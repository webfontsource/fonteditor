/**
 * @file Font.js
 * @author mengke01
 * @date 
 * @description
 * font字体绘制
 */


define(
    function(require) {
        var ShapeConstructor = require('./Shape');
        var glyfDraw = require('../glyf/draw');

        var proto = {
            
            type: 'circle',

            /**
             * 对形状进行缩放平移调整
             * 
             * @param {Object} shape shape对象
             * @param {Object} camera camera对象
             * @return {Object} shape对象
             */
            adjust: function(shape, camera) {
                ShapeConstructor.prototype.adjust.call(this, shape, camera);
                var center = camera.center;
                var ratio = camera.ratio;
                var scale = camera.scale;
                var _shape = shape['_shape'];

                var coordinates = [];
                shape.coordinates.forEach(function(p) {
                    coordinates.push({
                        x: p.x * scale,
                        y: p.y * scale,
                        isOnCurve: p.isOnCurve
                    });
                });

                _shape.coordinates = coordinates;
                _shape.xMax = shape.xMax * scale;
                _shape.yMax = shape.yMax * scale;
                _shape.xMin = shape.xMin * scale;
                _shape.yMin = shape.yMin * scale;

            },

            /**
             * 获取shape的矩形区域
             * 
             * @param {Object} shape shape数据
             * @param {Object} 矩形区域
             */
            getRect: function(shape) {
                return {
                    x: shape.x,
                    y: shape.y,
                    width: shape.width,
                    height:shape.height,
                };
            },

            /**
             * 判断点是否在font内部，此处只检测边缘
             * 
             * @param {Object} shape shape数据
             * @param {number} x x偏移
             * @param {number} y y偏移
             * @param {boolean} 是否
             */
            isIn: function(shape, x, y) {
                return x <= shape.x + shape.width 
                    && x >= shape.x - shape.width
                    && y <= shape.y + shape.height
                    && y >= shape.y - shape.height;
            },

            /**
             * 绘制一个shape对象
             * 
             * @param {CanvasContext} ctx canvas的context
             * @param {Object} shape shape数据
             */
            draw: function(ctx, shape) {
                glyfDraw(ctx, shape);
            }
        };



        return ShapeConstructor.derive(proto);
    }
);