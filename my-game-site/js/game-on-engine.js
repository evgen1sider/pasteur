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

        
        
        
        
        // RECTANGLE //
        type: 'circle',
        // type: 'rectangle',
        position: mejs.vector2(50, 50),
        radius: 25,
        // size: mejs.vector2(200, 100),
        color: '#ffff00',
        layer: 'main'
    });
    // // CIRCLE //
    // var circle = mejs.create_node(this, {
        
    //     type: 'circle',
    //     position: mejs.vector2(50, 50),
    //     radius: 25,
    //     //size: mejs.vector2(100, 100),
    //     color: 'blue',
    //     layer: 'main'

    // })
       
        

    
    
    // Визветься тоді коли буде загружена або перехід на сцену
    this.init = function () {
        console.log('inited');

        mejs.get_layer('back').draw_rect({
            x: 10, y: 10,
            width: 500, height: 300,
            color: '#221111'
        });
        
        
    };
    // dt - delta time
    this.update = function (dt) {
        //rect.move(mejs.vector2(1, 0))
        
        //mejs.view.move(mejs.vector2(-1, 1))
        rect.radius += 0.01;
        

        

    };
    
    // ctx- context

    this.draw = function (ctx) {
        rect.draw_box();
        
        

    };
    // покидання сцени
    this.exit = function () {
        
    };
});


mejs.start('my_scene');