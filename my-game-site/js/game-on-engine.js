document.addEventListener('DOMContentLoaded', function () {
  var mejs = new MyEngineJS('my-game', {
    back: {
      'auto_clear': false
    },
    main: {
      'auto_clear': true
    }
  });

  mejs.create_scene('my_scene', function () {
    var circle = mejs.create_node(this, {
      type: 'circle',
      position: mejs.vector2(100, 100),
      radius: 50,
      color: '#ff0000',
      layer: 'main'
    });

    this.init = function () {
      console.log('Scene initialized');
    };

    this.update = function (dt) {
      circle.radius += 0.5;
    };

    this.draw = function (ctx) {
      if (circle && typeof circle.draw === 'function') {
        circle.draw();
      } else {
        console.error('Circle draw method not found');
      }
    };

    this.exit = function () {
      console.log('Scene exited');
    };
  });

  mejs.start('my_scene');
});