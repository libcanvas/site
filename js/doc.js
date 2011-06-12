var Doc = {
    init: function() {
        var samples = atom.dom('div.sample').elems;
        while (samples.length) {

            var sample = atom.dom(samples.shift());
            var name = sample.attr('id');

            if (name && Doc[name]) {
                Doc._createSample(sample)
                   ._attachCode(sample, name)
                   ._attachRunHandler(sample, name)
            }
        }
    },

    _createSample: function(sample) {
        sample.html('<canvas></canvas><pre><code></code></pre><a href="javascript:void(0);" class="run">Выполнить</a>');

        return Doc;
    },

    _attachCode: function(sample, name) {
        var codeView = sample.find('code');

        codeView.text(Doc._fetchCode(name));
        codeView.addClass('javascript');

        return Doc;
    },

    _fetchCode: function(name) {
        var code = Doc[name].toString().replace(/ {8}/g, "\t").split("\n");

        code.shift();
        code.pop();

        return code.join("\n");
    },

    _attachRunHandler: function(sample, name) {
        var runButton = sample.find('a.run');

        runButton.bind({click:function() {
            var canvas = atom.dom('#' + name + ' canvas');
            canvas.attr({
                width  : 150,
                height : 150
            });

            var context = canvas.first.getContext('2d-libcanvas');
            context.clearAll();

            Doc[name](context);
        }});

        return Doc;
    },


    helloCanvas: function() {
        var canvas = atom.dom('#hello_canvas').first;
        var context = canvas.getContext('2d-libcanvas');

        context
            .clearAll()
            .fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415')
            .fill(new LibCanvas.Shapes.Rectangle(75, 75, 55, 55), '#0086b3');

    },

    Context2d_property: function(context2d) {
        context2d.set({globalAlpha: 0.5}).fillAll('black');
    },

    Context2d_rectangle: function(context2d) {
        var rect = context2d.rectangle;
        trace(rect);
    },

    Context2d_getClone: function(context2d) {
        var smallCircle = context2d.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415').getClone(50, 50);
        context2d.drawImage(smallCircle);
    },

    Context2d_fillAll: function(context2d) {
        context2d.fillAll('#E60415');
    },

    Context2d_strokeAll: function(context2d) {
        context2d.strokeAll('rgb(0, 0, 0)');
    },

    Context2d_clearAll: function(context2d) {
        context2d.fillAll('red').clearAll();
    },

    Context2d_save_n_restore: function(context2d) {
        context2d.set({ fillStyle: 'blue' });
        context2d.save();

        context2d.set({ fillStyle: 'red' });
        context2d.fillAll();

        context2d.restore();
        context2d.fillAll();
    },

    Context2d_begin_n_close_path_1: function(context2d) {
        context2d.set({fillStyle: '#0086b3'})

            .beginPath()

            .moveTo(30, 30).lineTo(60, 30).lineTo(60, 60).lineTo(30, 30)

            .closePath()
            .fill();
    },

    Context2d_begin_n_close_path_2: function(context2d) {
        context2d.set('fillStyle', '#0086b3')
            .beginPath(30, 30)

            .lineTo(60, 30).lineTo(60, 60)

            .closePath(30, 30)
            .fill();
    },

    Context2d_arc_1 : function(context2d) {
        context2d.set({strokeStyle: '#0086b3', lineWidth: 2});

        var radius = 25, startAngle = 0;
        for(var i = 0; i < 2; i++) {
            for(var j = 0; j < 2; j++) {
                var x = 40 + j * 65, y = 40 + i * 65;
                var endAngle = Math.PI + (Math.PI * j) / 2;
                var clockwise = i % 2 == 0;

                context2d.beginPath()
                    .arc(x, y, radius, startAngle, endAngle, clockwise)
                    .stroke();
            }
        }
    },

    Context2d_arc_2 : function(context2d) {
        context2d.set({strokeStyle: '#0086b3', lineWidth: 2}).beginPath()
            .arc({
                    circle: new LibCanvas.Shapes.Circle(75, 75, 30),
                    angle : {start: (30).degree(), size: (260).degree()}
            })
            .stroke();

        context2d.beginPath()
            .arc({
                    circle: new LibCanvas.Shapes.Circle(75, 75, 30),
                    angle : {start: (300).degree(), end: (380).degree()}
            })
            .stroke();


    },

    Context2d_arc_3 : function(context2d) {
        context2d.set({strokeStyle: '#0086b3', lineWidth: 2}).beginPath()
            .arc({
                    circle: new LibCanvas.Shapes.Circle(75, 75, 30),
                    angle : [(0).degree(), (230).degree()]
            })
            .stroke();

    },

    Context2d_arcTo: function(context2d) {
        context2d
            .set({strokeStyle: 'black', lineWidth: 1})
            .beginPath(40, 50).lineTo(120, 50).moveTo(100, 30).lineTo(100, 110)
            .stroke()

            .set({strokeStyle: '#0086b3', lineWidth: 5}).beginPath(60, 50).lineTo(90, 50)
            .arcTo(100, 50, 100, 60, 10).lineTo(100,90)
            .stroke()
    }


};