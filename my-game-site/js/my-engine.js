// MyEngineJS - New Game Engine

var MyEngineJS = function (_box, _layers) {
    'use strict'
    var MyEngineJS = this;

    // Globals //
    //var canvas = null;
    var size = null;
    var layer = null;
    //var context = null;
    var canvas_offset = null;
    // Global flags //
    var running = false;
    var active_scene = null;

    // CONFIGURATION //
    var config = {
        font_size: 50,
        font_name: 'serif',
        //властивість яка відповідає за вирівнювання
        font_base_line: 'top'
    }

    // Initial //
    var _INIT = function () {
        if (typeof _box !== 'object')
            _box = document.getElementById(_box);
        
        
        
        
        var box = _box.getBoundingClientRect();
        canvas_offset = vector2(box.left, box.top);
        size = vector2(box.width, box.height);
        
        if (typeof _layers === 'object') {
            var i, j = 0;
            for (i in _layers) {
                MyEngineJS.create_layer(i, j, _layers[i].auto_clear);
                j++;

            }

        } else {
            MyEngineJS.create_layer('main', 0, true);
            MyEngineJS.select_layer('main');
        }

        

                
    };

    // Math //
    var int = function (num) {
        return isNumber(num) ? num : 0;
    }


    // слої LAYERS //
    var layers = {};
    var clear_layers = [];
    class Layer {
        constructor(index) {
            var cnv = document.createElement('canvas');
            cnv.style.cssText = 'position: absolute; left: ' + canvas_offset.x + 'px; top: ' + canvas_offset.y + 'px;';
            cnv.width = size.x;
            cnv.height = size.y;
            cnv.style.zIndex = 100 + index;
            document.body.appendChild(cnv);
            
            this.canvas = cnv;
            this.ctx = cnv.getContext('2d');
        }

        clear() {
            this.ctx.clearRect(0, 0, size.x, size.y);
        }

        draw_rect(p) {
            var dp = vp(p.x, p.y);
            if (p.color) {
                this.ctx.fillStyle = p.color;
                this.ctx.fillRect(dp.x, dp.y, p.width, p.height);
            }
            
            

            if (p.border) {
                this.ctx.strokeStyle = p.border;
                this.ctx.strokeRect(dp.x, dp.y, p.width, p.height);
                
            }
        }

        draw_circle(p) {
            var dp = vp(p.x, p.y);

            //this.ctx.fillStyle = p.color;
            
            this.ctx.beginPath();
            this.ctx.arc(dp.x + p.radius, dp.y + p.radius, p.radius, 0, 2 * Math.PI, false);
            //this.ctx.fill();

            if (p.color) {
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
            }
            

            if (p.border) {
                this.ctx.strokeStyle = p.border;
                this.ctx.stroke();
                
                
            }
        }

        draw_text(p) {

            if (p.font || p.size) 
                this.ctx.font =(p.size || config.font_size) +  'px '+ (p.font || config.font_name);
            
            this.ctx.textBaseline = config.font_base_line;
            
            if (p.color) {
                this.ctx.fillStyle = p.color;
                this.ctx.fillText(p.text, p.x, p.y);
            }
        }
        

    }
    MyEngineJS.create_layer = function (id, index, is_auto_clear) {
        if (layers[id]) return;
        layers[id] = new Layer(index);
        if (is_auto_clear) clear_layers.push(layers[id]);
    }

    MyEngineJS.select_layer = function (id) {
        if (!layers[id]) return;
        layer = layers[id];
        
        
    }

    MyEngineJS.get_layer = function (id) {
        if (!layers[id]) return;
        return layers[id];
    }

    // vectors
    class Vector2 {
        constructor(x, y) {
            this.x = x || 0;
            this.y = y || 0;
        }
        plus(p) {
            this.x += p.x;
            this.y += p.y;
            return this;
        }
        minus(v) {
            this.x -= v.x;
            this.y -= v.y;
            return this;
        }
    };

    

    var vector2 = this.vector2 = function (x, y) {
        return new Vector2(x, y);
    };
    // ENGINE //

    var _update = function () {
        
        active_scene.update_nodes();
        active_scene.update();

        var i = clear_layers.length - 1;
        for (; i >= 0; i--){
            clear_layers[i].clear();
        }

        active_scene.draw_nodes();
        active_scene.draw();

        if (running) requestAnimationFrame(_update);
    }

    this.start = function (name) {
        if (running) return;
        running = MyEngineJS.set_scene(name);
        if (running) {
            _update();
        }
        
    }
    //scenes//
    let scenes = {};

    class Scene {
        constructor(scn) {
            this.scene = scn;
            this.count_nodes = 0;
            
        }
        init() {
            this.scene.init();
            //var count_nodes = this.scene.nodes.length;
        }

        update_nodes() {
            var i = 0;
            let len = this.scene.nodes.length;
            
            for (; i < len; i++) {
                if (typeof this.scene.nodes[i].draw !== 'undefined') {
                    this.scene.nodes[i].update();
                }
            }
        }

        update() {
            this.scene.update();
        }
        draw() {
            this.scene.draw();
        }
        exit() {
            this.scene.exit();
        }
        draw_nodes() {
            var i = 0;
            let len = this.scene.nodes.length;
            
            for (; i < len; i++) {
                if (typeof this.scene.nodes[i].draw !== 'undefined') {
                    this.scene.nodes[i].draw();
                }
            }
        }
    }

    this.create_scene = function (name, Construct) {
        //  array of nodes
        if (scenes[name]) return;
        scenes[name] = new Scene(new Construct());

    }
    this.set_scene = function (name) {
        if (!name || !scenes[name]) return false;
        
        
        if (active_scene) {
            active_scene.exit();

        }
        active_scene = scenes[name];
        active_scene.init();

        return true;

    }

    //NODES
    class Node {
        constructor(p) {
            this.position = p.position;
            this.size = p.size;
            this.type = 'Node';
            this.layer = p.layer || 'main';
            
        }
        move(p) {
            this.position.plus(p);
        }
        draw_box(color) {
            layers[this.layer].draw_rect({
                x: this.position.x,
                y: this.position.y,
                width: this.size.x,
                height: this.size.y,
                border: color || 'red'

            });

            layers[this.layer].draw_text({
                x: this.position.x + this.size.x,
                y: this.position.y+ this.size.y,
                text: this.size.x + ' x ' + this.size.y,
                size: 40,
                color: 'green'
            });

        }
    };
    // rectangle
    class RectNode extends Node {
        constructor(p) {
            super(p);
            this.type = 'RectNode';
            this.color = p.color;

            
        }
        draw() {
            layers[this.layer].draw_rect({
                x : this.position.x,
                y : this.position.y,
                width : this.size.x,
                height : this.size.y,
                color: this.color
                

            })
            log(1);
            
        }

    }
    // circle

    class CircleNode extends Node {
        constructor(p) {
            super(p);
            this.type = 'CircleNode';
            this.color = p.color;
            this.radius = p.radius;
            this.size = vector2();

            
        }

        update() {
            this.size.x = this.size.y = this.radius * 2;
            log(1);
            
            
            
        }

        draw() {
            layers[this.layer].draw_circle({
                x: this.position.x,
                y: this.position.y,
                radius: this.radius,
                color: this.color

            });
            
        }

    }
    // p - like param
    var create_node = function (p) {
        if (p.type === 'rectangle')
            return new RectNode(p);
        else if (p.type === 'circle')
            return new CircleNode(p);
    }

    
    MyEngineJS.create_node = function (scene, params) {
        if (typeof scene.nodes === 'undefined') {
            var nds = scene.nodes = [];
        }
        // створює ноду
        var n = create_node(params);
        nds.push(n);
        return n;

    };

    // viewPort - камера //
    var view = MyEngineJS.view = new function () {
        this.position = vector2();
        this.scale = vector2(1, 1);

        this.move = function (v) {
            this.position.plus(v);
        }
        
    };
    var vp = function (x, y) {
        return vector2(x, y).minus(view.position);
    };



    // Start engine
    _INIT();
    window.MyEngineJSGlobal = MyEngineJS;
};

let log = console.log;