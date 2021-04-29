// Examples

var mejs = new MyEngineJS('my-game', {
    
    back: {
        'auto_clear' : false
    },

    main: {
        'auto_clear' : true
    }
});



mejs.create_scene('my_scene',function () {

    var rect = mejs.create_node(this, {
        type: 'rectangle',
        position: mejs.vector2(50, 50),
        size: mejs.vector2(100, 100),
        color: 'blue',
        layer: 'main'

    });
    
    // Визветься тоді коли буде загружена або перехід на сцену
    this.init = function () {
        console.log('inited');

        mejs.get_layer('back').draw_rect({
            x: 10, y: 10,
            width: 500, height: 300,
            color: '#402727'
        });
        
        
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