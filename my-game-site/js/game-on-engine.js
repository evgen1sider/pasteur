// Examples

let mejs = new MyEngineJS('engine-canvas');

mejs.create_scene('my_scene',function () {

    var rect = mejs.create_node(this, {
        type: 'rectangle',
        position: mejs.vector2(50, 50),
        size: mejs.vector2(100, 100),
        color: 'blue'

    });
    
    // Визветься тоді коли буде загружена або перехід на сцену
    this.init = function () {
        console.log('init');
        
    };
    // dt - delta time
    this.update = function (dt) {
        rect.move(mejs.vector2(1, 0))

    };
    
    // ctx- context

    this.draw = function (ctx) {

    };
    // покидання сцени
    this.exit = function () {
        
    };
});


mejs.start('my_scene');