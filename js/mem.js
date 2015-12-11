function request_full_screen() {
    var
      el = document.documentElement
    , rfs =
           el.requestFullScreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
    ;
    rfs.call(el);
}



	var canvas = oCanvas.create({ canvas: "#canvas", background: "#000000" });

	var image_full_screen = canvas.display.image({
    	x:  document.documentElement.clientWidth - 20 ,
        y: document.documentElement.clientHeight - 20,

    	width : 30,
    	height: 30,
    	opacity: 1,
    	origin: { x: "right", y: "bottom" },

    	image: "fullscreen.svg"
    });

    image_full_screen.bind("click tap", function() { request_full_screen(); } );
    canvas.addChild(image_full_screen);



        var jscanvas = document.getElementById('canvas');
        if (jscanvas.getContext) {
          var ctx = jscanvas.getContext("2d");

          window.addEventListener('resize', resizeCanvas, false);
          window.addEventListener('orientationchange', resizeCanvas, false);
          resizeCanvas();
        }


      function resizeCanvas() {
//          document.documentElement.clientWidth and .clientHeight

      /*
        var element = document.getElementsByName("body")
    var style = window.getComputedStyle(element);
    var h = style.getPropertyValue('height');
        */
        canvas.width = document.documentElement.clientWidth ;
        canvas.height = document.documentElement.clientHeight ;
        image_full_screen.x = document.documentElement.clientWidth ;
        image_full_screen.y = document.documentElement.clientHeight;



        canvas.redraw();
      }


var image_base_url = 'https://raw.githubusercontent.com/semisided1/pydoit/master/src/lists/feelings/';
var img_files = ['boss/boss.png', 'doh/doh.png', 'freezing/freezing.png', 'hot/hot.png',
     'party/party.png', 'relaxed/relaxed.png', 'scared/scared.png', 'whatever/whatever.png'
 ];


function Card(pos, r, i, f) {
    this.position = pos;
    this.mrect = r;
    this.image = i;
    this.flipped = f;
    this.matched = false;
}

var cards = [];

var dims = [];
for (var i = 0, l = 8; i < l; i++) {
 dims[i] =  { center:75 + ( 130  * i ), top:50 };
 dims[i+8] = { center:75 + (130 * i), top:270 };
}

var remixed = [ 0,1,3,2,4,5,1,7,0,6,2,3,4,5,6,7];

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

shuffle(remixed);

function n_cards_flipped() {
    var toret = 0;
     for(var i=0; i<cards.length; i++) {
            if (cards[i].flipped == true) toret++;
        }
    return toret;
}

function n_cards_matched() {
    var toret = 0;
     for(var i=0; i<cards.length; i++) {
            if (cards[i].matched == true) toret++;
        }
    return toret;
}

function get_unmatched_flipped() {
    var atoret = [];
    for (var i=0; i<cards.length; i++) {
            if ( cards[i].matched == false && cards[i].flipped == true ) atoret.push(cards[i]);
    }
    return atoret;
}

function image_clicked(obj_this) {

    var c = getCardfromImg(obj_this);
    if ( c.matched == true ) return;
    c.flipped = false;

    obj_this.animate({width: 1}, { // i want to do zero here
                                    // but there is some kind of issue, the
                                    // center mode is shifting on the base
                                    // image
		duration: 80,
		easing: "ease-in-out-cubic",
		callback: function () {
		//	this.fill = "#f00";
		    c.image.height = 1; c.image.opacity = 0; // groan
			c.mrect.animate({width: 120}, {
	    duration:80,
	    easing: "ease-in-out-cubic",
		callback: function () {
		//	this.fill = "#f00";
		//	canvas.redraw();
		}
	});
	//		canvas.redraw();
		}
	});

}

function rect_clicked(obj_this) {



    var umf =  get_unmatched_flipped();

    if ( umf.length > 1 ) {
               return;
    }
    var c = getCardfromRect(obj_this);
    c.flipped = true;

    umf =  get_unmatched_flipped();
    if (umf.length > 1) {
        if (umf[0].image.image == umf[1].image.image) {
            umf[0].matched = true;
            umf[1].matched = true;
        }
    }

    obj_this.animate( {width: 0}, {
		duration: 80,
		easing: "ease-in-out-cubic",
		callback: function () {

	c.image.x = c.mrect.x;
	c.image.y = c.mrect.y;
	c.image.width = 1;
	c.image.height = c.mrect.height;
	c.image.opacity = 1;

   c.image.animate( {width: 120}, {
		duration: 80,
		easing: "ease-in-out-cubic",
	});
		}
	});
}

function drag_end(obj_this) {
     var c = getCardfromImg(obj_this);
     c.mrect.x = obj_this.x;
     c.mrect.y = obj_this.y;
}

for (var i = 0, l = 16; i < l; i++) {
    var rectangle = canvas.display.rectangle({
        position: i,
        x: dims[i].center,
        y: dims[i].top,
        width: 120,
        height: 170,
        fill: "#00ccaa",
        origin: { x: "center", y: "top" }
    });

    rectangle.bind("click tap", function() { rect_clicked(this); } );
    rectangle.dragAndDrop({ changeZindex: true });
    canvas.addChild(rectangle);

    var ifile = image_base_url + img_files[remixed[i]];
/*
    var sprite_1 = canvas.display.sprite({
	x: 144,
	y: 137,
	image: "img/sprite.png",
	frames: [
		{ x: 0, y: 0 },
		{ x: 80, y: 0 },
		{ x: 140, y: 0 }
	],
	width: 20,
	height: 20,
	frame: 1
});

var sprite_2 = sprite_1.clone({
	x: 167,
	frame: 2
});
var sprite_3 = sprite_1.clone({
	x: 190,
	frame: 3
});

canvas.addChild(sprite_1);
canvas.addChild(sprite_2);
canvas.addChild(sprite_3);
*/












    var image_to_add = canvas.display.sprite({
    	x:1, // mumble mumbe groan
    	y: 1,
    	width : 10,
    	height: 10,
    	opacity: 0,
    	origin: { x: "center", y: "top" },
    	image: ifile,
        frames: [
		    { x: 0, y: 0 },
		    { x: 20, y: 20  },
	],
	frame: 2

    });

   canvas.addChild(image_to_add);

    var dragOptions = { changeZindex: true, end: function() { drag_end(this);}};
   image_to_add.dragAndDrop(dragOptions);
   image_to_add.bind("click tap", function() { image_clicked(this); } );

   cards.push( new Card(i,rectangle,image_to_add,false));

}

   function getCardfromRect(robj) {
        for(var i=0; i<cards.length; i++) {
            if (cards[i].mrect.x == robj.x && cards[i].mrect.y == robj.y ) return cards[i];
        }
        return null;
    }

    function getCardfromImg(iobj) {
        for(var i=0; i<cards.length; i++) {

            if (cards[i].image.x == iobj.x && cards[i].image.y == iobj.y) return cards[i];
        }
        return null;
    }

    function are_all_cards_onscreen() {
        for(var i=0; i<cards.length; i++) {

        }
        return null;
    }

    function is_card_onscreen(c) {
    /*    if c.rectangle.b    canvas.width
        canvas.height  */
    }
