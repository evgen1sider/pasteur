// MyEngineJS - New Game Engine

let MyEngineJS = function (_canvas) {
    'use strict'
    let MyEngineJS = this;

    // Globals //
    var canvas = null;
    var size = null;
    var context = null;
    var canvas_offset = null;
    // Global flags //
    var running = false;
    var active_scene = null;

    // Initial //
    var _INIT = function () {
        if (typeof _canvas !== 'object')
            canvas = document.getElementById(_canvas);
        else
            canvas = _canvas;
        context = canvas.getContext('2d');
        size = vector2(canvas.width, canvas.height);

        var pos = canvas.getBoundingClientRect();
        canvas_offset = vector2(pos.left, pos.right);
        context.fillText('Hy There', 100, 100)
        

                
    };

    // Math //
    var int = function (num) {
        return isNumber(num) ? num : 0;
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

    

    let vector2 = this.vector2 = function (x, y) {
        return new Vector2(x, y);
    };
    //engine 

    let _update = function () {

        active_scene.update();
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
            context.clearRect(0, 0, size.x, size.y);
            context.fillStyle = this.color;
            context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
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