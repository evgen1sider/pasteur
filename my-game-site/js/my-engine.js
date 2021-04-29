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


    // слої
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
            this.ctx.fillStyle = p.color;
            this.ctx.fillRect(p.x, p.y, p.width, p.height);
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
        }
    };

    

    var vector2 = this.vector2 = function (x, y) {
        return new Vector2(x, y);
    };
    // ENGINE //

    var _update = function () {

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
    //scenes
    let scenes = {};

    class Scene {
        constructor(scn) {
            this.scene = scn;
        }
        init() {
            this.scene.init();
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
            var len = this.scene.nodes.length;
            for (; i < len; i++) {
                if (typeof this.scene.nodes[i].draw !== 'undefined') {
                    this.scene.nodes[i].draw();
                }
            }
        }
    }

    this.create_scene = function (name, Construct) {
        //  array of nodes
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
    }
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
                color : this.color

            })
            
        }

    }
    // p - like param
    let create_node = function (p) {
        if (p.type === 'rectangle')
            return new RectNode(p);
    }

    
    this.create_node = function (scene, params) {
        if (typeof scene.nodes === 'undefined') {
            var nds = scene.nodes = [];
        }
        // створює ноду
        var n = create_node(params);
        nds.push(n);
        return n;

    };



    // Start engine
    _INIT();
    window.MyEngineJSGlobal = MyEngineJS;
};

let log = console.log;