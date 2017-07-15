function addBaseSVG() {
  var bgColor =  document.getElementById("bgColor").value || '#0000ff'
	var bg = SVG('bg').attr({'id':'bg_svg', 'width': '100%', 'height': '100%'});
	bg.rect('100%', '100%').attr({'id': 'bg_solid', 'fill': '#ffffff'})

	bg.rect('100%', '100%').attr({'id': 'bg_layer'})
	svg();
}

function svg() {
var bg = SVG.get('bg_svg');
var bg_rect = SVG.get('bg_layer');


var radius =  document.getElementById("radius").value;
var thickness =  document.getElementById("thickness").value;
var spacing =  document.getElementById("spacing").value;
var bgColor =  document.getElementById("bgColor").value;
var circColor =  document.getElementById("circColor").value;
var fillColor =  document.getElementById("circFill").value; 

var bgOpacity =  document.getElementById("bgOpacity").value/10; 
var borderOpacity =  document.getElementById("borderOpacity").value/10;
var shapeOpacity =  document.getElementById("shapeOpacity").value/10; 


var gradient1 =  document.getElementById("gradient1").value;
var gradient2 =  document.getElementById("gradient2").value;

console.log('g1: '+gradient1+ ' g2: '+gradient2)
var direction = $("input[name=gradientRadio]:checked").val();


var shape = $("input[name=shapeRadio]:checked").val();

var sizing =  document.getElementById("sizing").value;
var rotation =  document.getElementById("rotation").value;
var ovalY =  document.getElementById("ovalY").value;
var ovalX =  document.getElementById("ovalX").value;

var radiusY = parseInt(ovalY)+parseInt(radius);
var radiusX = parseInt(ovalX)+parseInt(radius);


var bgFill = document.getElementById('bgBox');
var borderFill = document.getElementById('borderBox');
var shapeFill = document.getElementById('shapeBox');



if (radiusY < 0) {
	radiusY = 0;
}
if (radiusX < 0) {
	radiusX = 0;
}


if (bgFill.checked) bgColor = 'none';
if (borderFill.checked) circColor = 'none';
if (shapeFill.checked) fillColor = 'none';


var shapeValue;

var current_pattern = SVG.get('current_pattern')
if (current_pattern) {
	current_pattern.remove();
};

if (shape == 'triangle') {
//	50 15, 100 100, 0 100
	shapeValue = '<polygon transform="rotate('+rotation+ ' '+sizing/2 + ' '+sizing/2+')"  points="'+radiusX/2+' '+(radius/5+5)+','+radiusX+' '+radiusX+',0 '+radiusX+'" stroke-width="'+thickness+'"  stroke="'+circColor+'" fill="'+fillColor+'" id="circ" /><use xlink:href="#circ" />'
}
if (shape == 'line') {
shapeValue = '<line transform="rotate('+rotation+ ' '+sizing/2 + ' '+sizing/2+')" x1="'+(sizing/2)+'" x2="'+(sizing/2)+'" y1="'+radiusX+'" y2="'+radiusY+'"  stroke-width="'+thickness+'" stroke="'+circColor+'" fill="'+fillColor+'" id="circ" /><use xlink:href="#circ" />'
}
if (shape == 'square') {
// shapeValue = '<rect  transform="rotate('+rotation+ ' '+sizing/2 + ' '+sizing/2+')" x="'+(sizing/2)+'" y="'+(sizing/2)+'" width="'+radiusX+'" height="'+radiusY+'"  stroke-width="'+thickness+'" stroke="'+circColor+'" fill="'+fillColor+'" id="circ" /><use xlink:href="#circ" />'


var pattern = bg.pattern(sizing,sizing, function(add) {

    //add.path(path1).opacity(.3).fill('#999999')  
      add.rect(radiusX,radiusY).attr({'x':spacing, 'y': spacing, 'width':radiusX, 'height': radiusY, 'stroke-opacity': borderOpacity, 'stroke-width':thickness,'opacity':shapeOpacity, 'stroke':circColor, 'fill':fillColor})
        //.transform({'rotation':rotation}) 
 })
  pattern.transform({ rotation: rotation}).attr('id', 'current_pattern')
  bg_rect.fill(pattern)



}
if (shape == 'circle') {
// shapeValue = '<ellipse  transform="rotate('+rotation+ ' '+sizing/2 + ' '+sizing/2+')" cx="'+(sizing/2)+'" cy="'+(sizing/2)+'" rx="'+radiusX+'" ry="'+radiusY+'" stroke-width="'+thickness+'" stroke="'+circColor+'" fill="'+fillColor+'" id="circ" /><use xlink:href="#circ" />'

	var pattern = bg.pattern(sizing,sizing, function(add) {
//add.path(path1).opacity(.3).fill('#999999')  
  add.ellipse(radiusX,radiusX).attr({'cx':spacing, 'cy': spacing, 'rx':radiusX, 'ry': radiusY, 'stroke-opacity': borderOpacity, 'stroke-width':thickness,'opacity':shapeOpacity, 'stroke':circColor, 'fill':fillColor})
    //.transform({'rotation':rotation}) 
 })

  pattern.transform({ rotation: rotation,x:spacing/sizing,y:spacing/sizing}).attr('id', 'current_pattern')
  bg_rect.fill(pattern)
}

 function saveJSON() {
 	var json = {
 		shape:shape,
 		radius:radius,
 		thickness: thickness,
 		spacing: spacing,
 		bgColor: bgColor,
 		lineColor:circColor,
 		fillColor:fillColor,
 		direction:direction,
 		gradient1: gradient1,
 		gradient2: gradient2,
 		sizing: sizing,
 		rotation:rotation,
 		ovalY: ovalY,
 		ovalX: ovalX,
 		radiusY: radiusY,
 		radiusX: radiusX,
 		bgOpacity: bgOpacity,
 		borderOpacity: borderOpacity,
 		shapeOpacity: shapeOpacity,
 		bgFill: bgFill.checked,
 		borderFill:	borderFill.checked,
 		shapeFill: shapeFill.checked
 	}
 	console.log('json is '+JSON.stringify(json))
 } // end saveJSON()

  var bg_solid = SVG.get('bg_solid');
	//bg_solid.fill(bgColor);
	bg_solid.opacity(bgOpacity);
	applyGradient('bg_solid',gradient1,gradient2)
	saveJSON()
} // end svg()

//svg();
addBaseSVG();

$('input').change(function(){
    svg();
})


function applyGradient(id,gradient1,gradient2) {
	var element = SVG.get(id);
	var direction = $("input[name=gradientRadio]:checked").val();
	console.log('dir is '+direction)	

	var gradient = addGradient('bg_svg',direction,gradient2,gradient1);
  
    element.fill(gradient);

}

function addGradient(id,direction,color2,color1) {
	 var element = SVG.get(id);
	 console.log('element is '+element)

    var direction0 = direction[0];
    var direction1 = direction[1];
    var direction2 = direction[2];
    var direction3 = direction[3]


    console.log('col 1,2 is '+color1+ ' '+color2)
    var cur_grad = SVG.get('gradient_'+id);
    if (cur_grad) {
    	cur_grad.remove();
    };

    var gradientStops = [color1, color2];
    var offset = [0, 100]

     var gradient = element.gradient('linear', function(stop) {
        for (var j = 0; j < 2; j++) {
            var stopcolor = gradientStops[j];
            var s = stop.at(gradientStops[j]);
            s.update({opacity: 1, color: stopcolor, offset: offset[j]});
            s.data('stoptype', stopcolor);
        };
    });
        gradient.attr({cx:0});
        gradient.attr({cy:0});
        gradient.attr({r:15});
        gradient.attr('id', 'gradient_'+id)
        gradient.from(direction0, direction1).to(direction2, direction3)
		return gradient
 }