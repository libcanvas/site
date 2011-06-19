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

	Context2d_property: function(context) {
		context.set({globalAlpha: 0.5}).fillAll('black');
	},

	Context2d_rectangle: function(context) {
		var rect = context.rectangle;
		trace(rect);
	},

	Context2d_getClone: function(context) {
		var smallCircle = context.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415').getClone(50, 50);
		context.drawImage(smallCircle);
	},

	Context2d_fillAll: function(context) {
		context.fillAll('#E60415');
	},

	Context2d_strokeAll: function(context) {
		context.strokeAll('rgb(0, 0, 0)');
	},

	Context2d_clearAll: function(context) {
		context.fillAll('red').clearAll();
	},

	Context2d_save_n_restore: function(context) {
		context.set({ fillStyle: 'blue' });
		context.save();

		context.set({ fillStyle: 'red' });
		context.fillAll();

		context.restore();
		context.fillAll();
	},

	Context2d_begin_n_close_path_1: function(context) {
		context.set({fillStyle: '#0086b3'})

			.beginPath()

			.moveTo(30, 30).lineTo(60, 30).lineTo(60, 60).lineTo(30, 30)

			.closePath()
			.fill();
	},

	Context2d_begin_n_close_path_2: function(context) {
		context
			.beginPath(30, 30)

			.lineTo(60, 30).lineTo(60, 60)

			.closePath(30, 30)
			.fill('#0086b3');
	},

	Context2d_arc_1 : function(context) {
		context.set({strokeStyle: '#0086b3', lineWidth: 2});

		var radius = 25, startAngle = 0;
		for (var i = 0; i < 2; i++) {
			for (var j = 0; j < 2; j++) {
				var x = 40 + j * 65, y = 40 + i * 65;
				var endAngle = (180 + (90 * j)).degree();

				var clockwise = i % 2 == 0;

				context.beginPath()
					.arc(x, y, radius, startAngle, endAngle, clockwise)
					.stroke();
			}
		}
	},

	Context2d_arc_2 : function(context) {
		context.set({strokeStyle: '#0086b3', lineWidth: 2}).beginPath()
			.arc({
				circle: new LibCanvas.Shapes.Circle(75, 75, 30),
				angle : {start: (30).degree(), size: (260).degree()}
			})
			.stroke();

		context.beginPath()
			.arc({
				circle: new LibCanvas.Shapes.Circle(75, 75, 30),
				angle : {start: (300).degree(), end: (380).degree()}
			})
			.stroke();


	},

	Context2d_arc_3 : function(context) {
		context.set({strokeStyle: '#0086b3', lineWidth: 2}).beginPath()
			.arc({
				circle: new LibCanvas.Shapes.Circle(75, 75, 30),
				angle : [(0).degree(), (230).degree()]
			})
			.stroke();

	},

	Context2d_arcTo: function(context) {
		context
			.set({strokeStyle: 'black', lineWidth: 1})
			.beginPath(40.5, 50.5).lineTo(120.5, 50.5).moveTo(100.5, 30.5).lineTo(100.5, 110.5)
			.stroke()

			.set({strokeStyle: '#0086b3', lineWidth: 5}).beginPath(60.5, 50.5).lineTo(90.5, 50.5)
			.arcTo(100, 50, 100.5, 60, 10).lineTo(100.5, 90.5)
			.stroke()
	},

	Context2d_clearRect: function(context) {
		context
			.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415')
			.fill(new LibCanvas.Shapes.Rectangle(75, 75, 55, 55), '#0086b3')
			.clearRect(new LibCanvas.Shapes.Rectangle(40, 40, 80, 80));
	},

	Context2d_clip: function(context) {
		context
			.clip(new LibCanvas.Shapes.Rectangle(40, 40, 80, 80))
			.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415')
			.fill(new LibCanvas.Shapes.Circle(105, 105, 30), '#0086b3')
	},

	Context2d_imageData_1: function(context) {
        var imageData = context.createImageData(50, 50);

		for (var i = 0; i < imageData.data.length; i += 4) {
			imageData.data[i    ] = 255;
			imageData.data[i + 3] = 125;
		}

		context.putImageData(imageData, 10, 10);
	},

	Context2d_imageData_2: function(context) {
		context.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415');

		var imageData = context.getImageData(40, 40, 80, 80);

		context.clearAll().putImageData(imageData, 0, 0);
	},

	Context2d_imageData_3: function(context) {
		context.fill(new LibCanvas.Shapes.Circle(45, 45, 30), '#E60415');

		var imageData = context.getImageData(40, 40, 80, 80);

		context.clearAll().putImageData({image: imageData, from: [0, 0], crop: [10, 10, 50, 15]});
	},

	Context2d_gradients_1: function(context) {
		var gradient = context.createLinearGradient(0, 0, 0, 150);

		gradient.addColorStop(0, '#00ABEB');
		gradient.addColorStop(0.5, '#fff');
		gradient.addColorStop(0.5, '#66CC00');
		gradient.addColorStop(1, '#fff');

		context.set('fillStyle', gradient).fillRect(10, 10, 130, 130);
	},

	Context2d_gradients_2: function(context) {
		var gradient = context.createRadialGradient(55, 55, 20, 70, 70, 50);

		gradient.addColorStop(0, '#FF5F98');
		gradient.addColorStop(0.75, '#FF0188');
		gradient.addColorStop(1, 'rgba(255,1,136,0)');

		context.set('fillStyle', gradient).fillAll();
	}



};