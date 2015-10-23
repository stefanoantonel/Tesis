/// <reference path="../typings/jquery/jquery.d.ts"/>
var counter;
var soundsArray = [];
var score = 100;
var actNum;
var configLoaded = null;
var tutorialWasPlayed = false;

function dragAndDrop(idImg, idBoxes, functions,moveToTarget) {
	$(idImg).each(function(ind, part) {
		$(this).draggable({
	       /* cursorAt: { cursor: "move", top: 56, left: 56 },*/
	        //cursorAt: { cursor: "crosshair", top: -5, left: -5 },
			revert : true
		});

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
	getJsonConfig().then(function(result) {
		var c = result["act" + numAct];
		callBack(c.act);
		loadDescription(c.description);
		getStyle();
		loadTutorialVoice(numAct);
		loadCounter(c.repeat);
	});
}

function getConfig(numAct) {
	return new Promise(function(resolve, reject) {
		actNum = numAct;
		saveArticle();
		getJsonConfig().then(function(result) {
			var c = result["act" + actNum];
			loadDescription(c.description);
			getStyle().then(function() {
				resolve();
			});
			loadTutorialVoice(actNum);
			loadCounter(c.repeat);
		});
	});	
}

function getJsonConfig() {
	return new Promise(function(resolve, reject) {
		if (!configLoaded) {
			$.getJSON("http://raw.githubusercontent.com/stefanoantonel/Tesis/master/js/configGroups.json")
			.done(function(result) {
				configLoaded = result;
				resolve(configLoaded);
			})
			.fail(function(err) {
				$.getJSON("js/configGroups.json")
				.done(function(result) {
					configLoaded = result;
					resolve(configLoaded);
				});
			});
			
		}
		else {
			resolve(configLoaded);
		}
	});	
}

function getConfigByElement(element, level, quantity, callback) {
	return new Promise(function(resolve, reject) {
		getJsonConfig().then(function(config) {
			var element_config = config[element][level];
			var result_disorder = disorder(element_config);
			var result = result_disorder.slice(0, quantity);
			var result2 = result;

			resolve(result2);
			if(callback) {
				callback(result);
			}
		});
	});
}

function getRhymes(element, level, quantity, callBack) {
	getJsonConfig().then(function(config) {
		var element_config = config[element][level];
		var result_disorder = disorder(element_config);
		var result = result_disorder.slice(0, quantity);
		$(result).each(function(ind, value) {
			val = disorder(value);
			result[ind] = val.slice(0, 2);
		});
		callBack(result);
	});
}

function getConfigByElementWithOne (type, level, quantity, callBack, elementExcept) {
	return new Promise(function(resolve, reject) {
		getJsonConfig().then(function(config) {
			var element_config = config[type][level];
			element_config = removeOneElement(element_config, elementExcept);
			element_config = disorder(element_config);
			var result_disorder = element_config.slice(0, quantity);
			result_disorder.push(elementExcept);
			var result = disorder(result_disorder);
			callBack(result);
			resolve(result);
		});
	})
}

function getConfigByElementWithOne(type, level, quantity, callBack, 
	elementExcept, firstLetter) {
	return new Promise(function(resolve, reject) {
		getJsonConfig().then(function(config) {
			var element_config = config[type][level];
			element_config = removeOneElement(element_config, elementExcept);
			element_config = removeFirstLetter(element_config, firstLetter);
			element_config = disorder(element_config);
			var result_disorder = element_config.slice(0, quantity);
			result_disorder.push(elementExcept);
			var result = disorder(result_disorder);
			callBack(result);
			resolve(result);
		});	
	});	
}

function saveArticle() {
	originTemplateHTML = $("article").clone();
}

function getStyle() {
	return new Promise(function(resolve, reject) {
		getJsonConfig().then(function(result) {
			var c = result["skin"];
			skin = disorder(c);
			$('head').append(
				'<link rel="stylesheet" type="text/css" '
				+ 'href="css/skin/' 
				+ skin[0] + '.css" />');
			resolve();
		});	
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
	return new Promise(function(resolve) {
		$("#activity-container").append(
			"<article id='congratulations' class='clipped-box congratulations animated flipInX'>"
				+ "<div class='content '>" 
				+ "<h1>FELICITACIONES</h1>"
				+ "</div>" 
			+ "</article>");
		playSound("congratulations").then(function () {
			/*explosion();
			explote();*/
			$("article#congratulations")
			.removeClass("flipInX")
			.addClass("fadeOutDown");
			
			waitInterval(200).then(function() {
				resolve();		
			});
			
		});

		$("#alertOk").delay(100).fadeIn(200);
	});
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

function loadTutorialVoice(actNum) {
	if (counter == null) {
		$("#kittyTeacher").click(function(){
			playTutorial(actNum);
		});
	}
}

function playSound(soundName) {
	var soundName = soundName.toLowerCase();
	return new Promise(function(resolve) {
		new Howl({
			urls: ['audio/' + soundName + '.mp3'],
			autoplay: true,
			onend: function() {
				resolve();		
			}
		});
	});	
}

function playTutorial(actNumb,callback) {
	return new Promise(function(callback) {
		if(!tutorialWasPlayed) {
			tutorialWasPlayed = true;
			new Howl({
				urls: ['audio/tutorial/' + actNum + '.mp3'],
				autoplay: true,
				onend: function() {
					callback();		
				}
			});	
		}
		
	});
}

function moveOrigin(target, origin) {
	$(target).removeClass('wrong animated shake');
	$(target).addClass('normal');
	$(target).appendTo(origin);
	changeScore(-10);
}

function wrong(target,origin){
	playSound("wrong");
	//$(target).effect('shake');
	$(target).addClass('animated shake');
	$(target).removeClass('normal');
	$(target).addClass('wrong');
	window.setTimeout(moveOrigin, 1000,target,origin);
}

function sessionCounter() {
	$(".target").addClass("targetWin");	
	counter = counter - 1;
	playSound("bells").then(function() {		
		if (counter == 0) {
			passed();
			waitInterval(1000).then(function() {
				$(".deleted").remove();
			});
			waitInterval(1000).then(passActivity);
		}
		else {
			$( "article" ).addClass("animated bounceOut")
			waitInterval(600).then(function() {
				$( "article" ).remove();
				$(".deleted").remove();
			

				congratulations().then(function() {
					waitInterval(1000).then(function() {
						$( "html" ).addClass( "loading" );
										
						level="lev_1";
						if(counter<= counterOriginal/2){
							level="lev_2";
						}
						
						waitInterval(500).then(function() {
							$("#activity-container").hide();
							$("#activity-container").removeClass("congratulations");
							$("#activity-container").append(originTemplateHTML);
							$('#congratulations').remove();
							$("#activity-container").fadeIn(400).show();
							
							functionInit(counter,level).then(function() {
								waitInterval(200).then(function() {
									removeLoading();	
								});
							});
							
						});					
					});
				});
			});
		}
	});	
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
	return new Promise(function(resolve, reject) {
		getJsonConfig().then(function(config) {
			var element_config = config[type][level];
			element_config = getFirstLetter(element_config, firstLetter);
			element_config = disorder(element_config);
			var result_disorder = element_config.slice(0, quantity);
			var result = disorder(result_disorder);
			resolve(result);
			if(callBack)
				callBack(result);					
		});		
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

function deactivateMoves(obj) {
	$(obj).css("pointer-events", "none");
	$(obj).css("touch-events", "none");
} 
function activateMoves(obj) {
	$(obj).css("pointer-events", "auto");
	$(obj).css("touch-events", "auto");
}

function removeLoading() {
	
	$("html").removeClass("loading");
	$("article").addClass("animated bounceInUp");
	$("#titulo").addClass("animated bounceInDown");

}