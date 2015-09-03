/// <reference path="../typings/jquery/jquery.d.ts"/>
var counter;
var soundsArray = [];
var score = 100;
var actNum;

function dragAndDrop(idImg, idBoxes, functions,moveToTarget) {
	$(idImg).each(function(ind, part) {
		$(this).draggable({
			//stop: function( event, ui ) {
			//	event.stopPropagation();
				//alert();
			//},
			start: function(event, ui) {
            	ui.helper.bind("click.prevent",
	        	function(event) { event.preventDefault(); });
	        },
	        stop: function(event, ui) {
				setTimeout(function(){ui.helper.unbind("click.prevent");}, 300);
	        },
			revert : true,
		});

		//$(this).mouseup(function() {
		$(this).click(function() {
			moveToTarget(this);
		});
	});

	$(idBoxes).each(function(ind, box) {
		$(this).droppable({
			drop : function(event, ui) {
				$(ui.draggable).css({
					top : 0,
					left : 0
				});
				$(this).addClass("ui-state-highlight").append(ui.draggable);
				functions(this, ui.draggable);
			}
		});
	});
}

function getConfig(numAct, callBack) {
	actNum = numAct;
	$.getJSON("js/configGroups.json", function(result, callBack) {
		c = result["act" + numAct];
	}).done(function() {
		callBack(c.act);
		loadDescription(c.description);
		getStyle();
		loadTutorialVoice(numAct);
		loadCounter(c.repeat);
		addSound("wrong");
		loadSounds();
	});
}

function getConfig(numAct) {
	actNum = numAct;
	saveArticle();
	$.getJSON("js/configGroups.json", function(result) {
		c = result["act" + numAct];
	}).done(function() {
		loadDescription(c.description);
		getStyle();
		loadTutorialVoice(numAct);
		loadCounter(c.repeat);
		addSound("wrong");
		loadSounds();

	});
}

function getConfigByElement(element, level, quantity, callBack) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		var element_config = config[element][level];
		var result_disorder = disorder(element_config);
		result = result_disorder.slice(0, quantity);
	}).done(function() {
		console.log("result:", result);
		callBack(result);
	});
}

function getRhymes(element, level, quantity, callBack) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		var element_config = config[element][level];
		var result_disorder = disorder(element_config);
		result = result_disorder.slice(0, quantity);
		$(result).each(function(ind, value) {
			val = disorder(value);
			result[ind] = val.slice(0, 2);
		});
	}).done(function() {
		console.log("result:", result);
		callBack(result);
	});
}

function getConfigByElementWithOne (type, level, quantity, callBack,elementExcept) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		element_config = config[type][level];
		element_config = removeOneElement(element_config, elementExcept);
		element_config = disorder(element_config);
		result_disorder = element_config.slice(0, quantity);
		result_disorder.push(elementExcept);
		result = disorder(result_disorder);

	}).done(function() {
		callBack(result);
	});
}

function getConfigByElementWithOne(type, level, quantity, callBack,
		elementExcept, firstLetter) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		element_config = config[type][level];
		element_config = removeOneElement(element_config, elementExcept);
		element_config = removeFirstLetter(element_config, firstLetter);
		element_config = disorder(element_config);
		result_disorder = element_config.slice(0, quantity);
		result_disorder.push(elementExcept);
		result = disorder(result_disorder);

	}).done(function() {
		callBack(result);
	});
}

function saveArticle() {
	originTemplateHTML = $("article").clone();
}

function getStyle() {
	$.getJSON("js/configGroups.json", function(result) {
		c = result["skin"];
	}).done(
			function() {
				skin = disorder(c);
				console.log("skinks", skin);
				$('head').append(
						'<link rel="stylesheet" href="css/skin/' + skin[0]
								+ '.css" type="text/css" />');
			});
}

function loadCounter(count) {
	if (counter == null) {
		counter = parseInt(count);
		counterOriginal = counter; 
	}
}

function disorder(o) {
	try {
		var original = o.slice(0);
		do {
			for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);	
		}
		while(o[0] == original[0]);	
	}
	catch(e) {
		for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);	
	}
	return o;
};

function congratulations() {

	$("#activity-container").append(
			"<article id=\"congratulations\" class=\"clipped-box congratulations\">"
					+ "<div class=\"content\">" + "<h1>FELICITACIONES</h1>"
					+ "</div>" + "</article>");
	playSound("congratulations");
	waitInterval(600).then(function() {
		explote();
	});

	explosion();

	$("#alertOk").delay(100).fadeIn(200);
}

function passActivity() {
	$("article").delay(400).hide();

	if($(window.parent.document.getElementById("nav_next-button")).attr("disabled")==null){
		$("#activity-container").append(
				'<div id="alertOk" class="alert-box success rainbow">'
						+ '<span>&#161&#161GANASTE!!</span>'
						+ '<div><a id="next">Siguiente</a></div>' 
						+ '<div class="bubble x1"></div><div class="bubble x2"></div><div class="bubble x3"></div><div class="bubble x4"></div><div class="bubble x5"></div>'
				+ '</div>');
		playSound("win");
		$("#next").click(function() {
			window.parent.document.getElementById("nav_next-button").click();
		});
		return;
	}
	$("#activity-container").append(
			'<div id="alertOk" class="alert-box success rainbow">'
					+ '<span>&#161&#161GANASTE!!</span>'
					+ '<div class="bubble x1"></div><div class="bubble x2"></div><div class="bubble x3"></div><div class="bubble x4"></div><div class="bubble x5"></div>'
			+ '</div>');
	playSound("win");
}

function setNextAction() {
	$("#next-activity").click(function() {
		var base_url = document.URL.slice(0, document.URL.lastIndexOf("/"));
		window.parent.document.getElementById("nav_next-button").click();
	});
}

function setPrevAction() {
	$("#prev-activity").click(function() {
		var base_url = document.URL.slice(0, document.URL.lastIndexOf("/"));
		window.parent.document.getElementById("nav_prev-button").click();
	});
}

function passed() {
	actividad.end("passed", score);
}

function loadDescription(descrip) {
	title = $("title").text();
	$.get("popUp.html", function(result) {
		modal = result;
	}).done(function() {
		$("article").append(modal);
		$(".modal-body").html(descrip);
		$(".modal-title").html(title);
	});
}

function loadSounds() {
	waitInterval(2000).then(function() {
		soundsArray = soundsArray.filter (function (v, i, a) { return a.indexOf (v) == i });
		/* In order to make an asyncronous task */
		$(soundsArray).each(function(index, value) {
			var aud = document.createElement('audio');
			$(aud).attr('id', 'sound' + value);
			$(aud).attr('src', 'audio/' + value + '.mp3');
			$(aud).attr('type', 'audio/mp3');
			$(aud).appendTo('body');
		});
	});
}

function loadTutorialVoice(actNum) {
	if (counter == null) {
		try {
			var aud = document.createElement('audio');
			$(aud).attr('id', 'tutorial' + actNum);
			$(aud).attr('src', 'audio/tutorial/' + actNum + '.mp3');
			$(aud).attr('type', 'audio/mp3');
			$(aud).appendTo('body');
			
		} catch (e) {
			console.error("Tutorial sound not found");
		}
		$("#kittyTeacher").click(function(){
			playTutorial(actNum);
		});
	}

}

function playSound(soundName) {
	try {
		soundName = soundName.toString().toLowerCase();
		$('#sound' + soundName)[0].play();
	} catch (e) {
		console.error('Sonido no encontrado');
	}

}

function playTutorial(actNumb) {
	try {
		$('#tutorial' + actNumb)[0].play();
	} catch (e) {
		console.error('Tutorial no encontrado');
	}
}
function moveOrigin(target, origin) {
	$(target).removeClass('wrong');
	$(target).addClass('normal');
	$(target).appendTo(origin);
	changeScore(-10);
}

function wrong(target,origin){
	playSound("wrong");
	$(target).effect('shake');
	$(target).removeClass('normal');
	$(target).addClass('wrong');
	window.setTimeout(moveOrigin, 1000,target,origin);
}

function sessionCounter() {
	playSound("bells");
	$(".target").addClass("targetWin");
	counter = counter - 1;
	if (counter == 0) {
		passed();
		waitInterval(1000).then(function() {
			$(".deleted").remove();
		});
		waitInterval(1000).then(passActivity);
	}
	else {
		
		waitInterval(2000).then(function() {
			$( "article" ).hide( 200, function() {
				$( this ).remove();
				$(".deleted").remove();
			});
		})
		waitInterval(2200).then(function() {
			congratulations();
		});
		waitInterval(5000).then(function() {
			$("#activity-container").removeClass("congratulations");
			$("#activity-container").append(originTemplateHTML);
			$('#congratulations').remove();
			level="lev_1";
			if(counter<= counterOriginal/2){
				level="lev_2";
			}
			functionInit(counter,level);
		});
	}

}

function waitInterval(time) {
	return new Promise (function(done) {
		setTimeout(done,time);	
	});
}


function translate(target) {
	$(target).addClass("animateUpperCorner");
}

function removeOneElement(array, element) {
	var index = array.indexOf(element.toString());
	if (index != -1) {
		array.splice(index, 1);
	}
	return array;
}

function removeFirstLetter(element_config, firstLetter) {
	var arrayWithoutLetter = [];
	var arrayLength = element_config.length;
	for ( var i = 0; i < arrayLength; i++) {
		var eachFirstLetter = element_config[i].substring(0, 1);
		if (eachFirstLetter != firstLetter) {
			arrayWithoutLetter.push(element_config[i]);
		};
	}
	return arrayWithoutLetter;
}

function getConfigByElementWithFirstLetter(type, level, quantity, callBack, firstLetter) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		element_config = config[type][level];
		element_config = getFirstLetter(element_config, firstLetter);
		element_config = disorder(element_config);
		result_disorder = element_config.slice(0, quantity);
		result = disorder(result_disorder);

	}).done(function() {
		callBack(result);
	});
}

function getFirstLetter(element_config, firstLetter) {
	var arrayWithLetter = [];
	var arrayLength = element_config.length;
	for ( var i = 0; i < arrayLength; i++) {
		var eachFirstLetter = element_config[i].substring(0, 1);
		if (eachFirstLetter == firstLetter) {
			arrayWithLetter.push(element_config[i]);
		};
	}
	return arrayWithLetter;
}

function getAllIndexes(arr, val) {
	var indexes = [], i = -1;
	while ((i = arr.indexOf(val, i + 1)) != -1) {
		indexes.push(i);
	}
	return indexes;
}

function addSound(elem) {
	if (elem.constructor == Array) {
		elem = elem.join("");
	}
	elem = elem.toLowerCase();
	soundsArray.push(elem);
}

function changeScore(value) {
	score = score + value;
}

/** ********************************CONGRATULATIONS****************************************** */
function explosion() {

	(genClips = function() {

		// For easy use
		$t = $('.clipped-box');

		// Like I said, we're using 5!
		var amount = 5;

		// Get the width of each clipped rectangle.
		var width = $t.width() / amount;
		var height = $t.height() / amount;

		// The total is the square of the amount
		var totalSquares = Math.pow(amount, 2);

		// The HTML of the content
		var html = $t.find('.content').html();

		var y = 0;

		for ( var z = 0; z <= (amount * width); z = z + width) {

			$(
					'<div class="clipped" style="clip: rect(' + y + 'px, '
							+ (z + width) + 'px, ' + (y + height) + 'px, ' + z
							+ 'px)">' + html + '</div>').appendTo($t);

			if (z === (amount * width) - width) {

				y = y + height;
				z = -width;

			}

			if (y === (amount * height)) {
				z = 9999999;
			}

		}

	})();

	// A quick random function for selecting random numbers
	function rand(min, max) {

		return Math.floor(Math.random() * (max - min + 1)) + min;

	}

	// A variable check for when the animation is mostly over
	var first = false, clicked = false;

	// On click
	// $('.clipped-box div').on('click', function() {

}

function explote() {

	$('.clipped-box .content').css({
		'display' : 'none'
	});

	// Apply to each clipped-box div.
	$('.clipped-box div:not(.content)')
			.each(
					function() {

						// So the speed is a random speed between 90m/s and
						// 120m/s. I know that seems like a lot
						// But otherwise it seems too slow. That's due to how I
						// handled the timeout.
						var v = rand(120, 90), angle = rand(80, 89), // The
						// angle
						// (the
						// angle
						// of
						// projection)
						// is a
						// random
						// number
						// between
						// 80
						// and
						// 89
						// degrees.
						theta = (angle * Math.PI) / 180, // Theta is the
						// angle in radians
						g = -9.8; // And gravity is -9.8. If you live on
						// another planet feel free to change

						// $(this) as self
						var self = $(this);

						// time is initially zero, also set some random
						// variables. It's higher than the total time for the
						// projectile motion
						// because we want the squares to go off screen.
						var t = 0, z, r, nx, ny, totalt = 10;

						// The direction can either be left (1), right (-1) or
						// center (0). This is the horizontal direction.
						var negate = [ 1, -1, 0 ], direction = negate[Math
								.floor(Math.random() * negate.length)];

						// Some random numbers for altering the shapes position
						var randDeg = rand(-5, 10), randScale = rand(0.9, 1.1), randDeg2 = rand(
								30, 5);

						// Because box shadows are a bit laggy (by a bit I mean
						// 'box shadows will not work on individual clipped divs
						// at all')
						// we're altering the background colour slightly
						// manually, in order to give the divs differentiation
						// when they are
						// hovering around in the air.
						// var color =
						// $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(',
						// '),
						var color = [ 120, 188, 215 ];
						colorR = rand(-20, 20), // You might want to alter these
						// manually if you change the
						// color
						colorGB = rand(-20, 20), // To get the right
						// consistency.
						newColor = 'rgb(' + (parseFloat(color[0]) + colorR)
								+ ', ' + (parseFloat(color[1]) + colorGB)
								+ ', ' + (parseFloat(color[2]) + colorGB) + ')';

						// And apply those
						$(this).css(
								{
									'transform' : 'scale(' + randScale
											+ ') skew(' + randDeg
											+ 'deg) rotateZ(' + randDeg2
											+ 'deg)',
									'background' : newColor
								});

						// Set an interval
						z = setInterval(function() {

							// Horizontal speed is constant (no wind resistance
							// on the internet)
							var ux = (Math.cos(theta) * v) * direction;

							// Vertical speed decreases as time increases before
							// reaching 0 at its peak
							var uy = (Math.sin(theta) * v) - ((-g) * t);

							// The horizontal position
							nx = (ux * t);

							// s = ut + 0.5at^2
							ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));

							// Apply the positions
							$(self).css({
								'bottom' : (ny) + 'px',
								'left' : (nx) + 'px'
							});

							// Increase the time by 0.10
							t = t + 0.10;

							// If the time is greater than the total time clear
							// the interval
							if (t > totalt) {

								clicked = false;
								first = true;

								$('.clipped-box').css({
									'top' : '-1000px',
									'transition' : 'none'
								});
								$(self).css({
									'left' : '0',
									'bottom' : '0',
									'opacity' : '1',
									'transition' : 'none',
									'transform' : 'none'
								});
								clearInterval(z);

							}

						}, 10); // Run this interval every 10ms. Changing this
						// will change the pace of the animation

					});
}
function stopExplosion() {

	$('#alertOk').remove();
	$("#activity-container").append(originTemplateHTML);
	functionInit();
}

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * ********************************CONGRATULATIONS END
 * ******************************************
 */
