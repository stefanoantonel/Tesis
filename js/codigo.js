var counter;
var soundsArray = [];
var score = 100;

function dragAndDrop(idImg, idBoxes, functions) {
	$(idImg).each(function(ind, part) {
		$(this).draggable({
			revert : true,
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
	$.getJSON("js/configGroups.json", function(result, callBack) {
		c = result["act" + numAct];
	}).done(function() {
		callBack(c.act);
		loadDescription(c.description);
		getStyle();
		loadTutorialVoice(numAct);
		loadCounter(c.repeat);
		loadSounds();
	});
}

function getConfig(numAct) {
	saveArticle();
	$.getJSON("js/configGroups.json", function(result) {
		c = result["act" + numAct];
	}).done(function() {
		loadDescription(c.description);
		getStyle();
		loadTutorialVoice(numAct);
		loadCounter(c.repeat);
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
		// getStyle();
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

function getConfigByElementWithOne(type, level, quantity, callBack,
		elementExcept) {
	$.getJSON("js/configGroups.json", function(config, callBack) {
		element_config = config[type][level];
		element_config = removeOneElement(element_config, elementExcept);
		element_config = disorder(element_config);
		result_disorder = element_config.slice(0, quantity);
		result_disorder.push(elementExcept);
		result = disorder(result_disorder);
		// result = result_disorder.slice(0,quantity);

	}).done(function() {
		// console.log("result:",result);
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
	}
}

function disorder(o) {
	for ( var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x)
		;
	return o;
};

function congratulations() {

	$("body").append(
			"<div id=\"alertOk\" class=\"clipped-box\">"
					+ "<div class=\"content\">" + "<h1>FELICITACIONES</h1>"
					+ "</div>" + "</div>");

	
	window.setTimeout(function() {
		explote();
	}, 500);
	
	
	
	// $("body").append('<div id="alertOk" class="alert-box success
	// hidden="true">'
	// +'<span>Felicitaciones </span>'
	// +'</br><img class="imagenSucced" src="images/caraContenta.jpg">'
	// +'</br>Has completado muy bien tu ejercicio'
	// +'</div>');

	explosion();
	
	$("#alertOk").delay(100).fadeIn(200);
}

function passActivity() {
	$("article").delay(400).hide();

	$("body").append(
			'<div id="alertOk" class="alert-box success">'
					+ '<span>Pasaste el nivel!</span>'
					+ '<div><a id="next">Siguiente</a></div>' + '</div>');

	$("#next").click(function() {
		var base_url = document.URL.slice(0, document.URL.lastIndexOf("/"));
		// actividad.end("incomplete");
		window.parent.document.getElementById("nav_next-button").click();
	});

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
	// debugger;
	$.get("popUp.html", function(result) {
		modal = result;
	}).done(function() {
		$("article").append(modal);
		$(".modal-body").html(descrip);
		$(".modal-title").html(title);
	});
}

function loadSounds() {
	setTimeout(function() {
		/* In order to make an asyncronous task */
		$(soundsArray).each(function(index, value) {
			var aud = document.createElement('audio');
			$(aud).attr('id', 'sound' + value);
			$(aud).attr('src', 'audio/' + value + '.mp3');
			$(aud).attr('type', 'audio/mp3');
			$(aud).appendTo('body');
		});
	}, 3000);
}

function loadTutorialVoice(actNum) {
	if (counter == null) {
		try {
			var aud = document.createElement('audio');
			$(aud).attr('id', 'tutorial' + actNum);
			$(aud).attr('src', 'audio/tutorial/' + actNum + '.mp3');
			$(aud).attr('type', 'audio/mp3');
			$(aud).appendTo('body');
			window.setTimeout(function() {
				playTutorial(actNum);
			}, 1000);
		} catch (e) {
			console.error("Tutorial sound not found")
		}
	}

}

function playSound(soundName) {
	try {
		$('#sound' + soundName)[0].play();
	} catch (e) {
		console.error('Sonido no encontrado')
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

function sessionCounter() {
	counter = counter - 1;
	if (counter == 0) {
		passed();
		window.setTimeout(function() {
			$(".deleted").remove();
		}, 1000);
		window.setTimeout(passActivity, 1000);

	}

	else {
		window.setTimeout(function() {
			$(".deleted").remove();
			$("article").remove();

		}, 1000);
		window.setTimeout(function() {
			congratulations();
		}, 1000);
		window.setTimeout(function() {
			$("body").append(originTemplateHTML);
			$('#alertOk').remove();
			functionInit();
		}, 3000);
	}

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

function addSound(elem) {
	if (elem.constructor == Array) {
		soundsArray.push(elem.join(""));
	} else {
		soundsArray.push(elem);
	}
}

function changeScore(value) {
	score = score + value;
}



/**********************************CONGRATULATIONS*******************************************/
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
		
		for(var z = 0; z <= (amount*width); z = z+width) { 
		
			$('<div class="clipped" style="clip: rect('+y+'px, '+(z+width)+'px, '+(y+height)+'px, '+z+'px)">'+html+'</div>').appendTo($t);
			
			if(z === (amount*width)-width) {
			
				y = y + height;
				z = -width;
			
			}
			
			if(y === (amount*height)) {
				z = 9999999;
			}
			
		}
		
	})();
	
	// A quick random function for selecting random numbers
	function rand(min, max) {
		
		return Math.floor(Math.random() * (max - min + 1)) + min;
		
	}
	
	// A variable check for when the animation is mostly over
	var first = false,
		clicked = false;
	
	// On click
	//$('.clipped-box div').on('click', function() {
	
}

function explote(){	
		
		$('.clipped-box .content').css({'display' : 'none'});	

		// Apply to each clipped-box div.
		$('.clipped-box div:not(.content)').each(function() {
			
			// So the speed is a random speed between 90m/s and 120m/s. I know that seems like a lot
			// But otherwise it seems too slow. That's due to how I handled the timeout.
			var v = rand(120, 90),
				angle = rand(80, 89), // The angle (the angle of projection) is a random number between 80 and 89 degrees.
				theta = (angle * Math.PI) / 180, // Theta is the angle in radians
				g = -9.8; // And gravity is -9.8. If you live on another planet feel free to change
				
			// $(this) as self
			var self = $(this);
			
			// time is initially zero, also set some random variables. It's higher than the total time for the projectile motion
			// because we want the squares to go off screen. 
			var t = 0,
				z, r, nx, ny,
				totalt =  10;
			
			// The direction can either be left (1), right (-1) or center (0). This is the horizontal direction.
			var negate = [1, -1, 0],
				direction = negate[ Math.floor(Math.random() * negate.length) ];
			
			// Some random numbers for altering the shapes position
			var randDeg = rand(-5, 10), 
				randScale = rand(0.9, 1.1),
				randDeg2 = rand(30, 5);
			
			// Because box shadows are a bit laggy (by a bit I mean 'box shadows will not work on individual clipped divs at all') 
			// we're altering the background colour slightly manually, in order to give the divs differentiation when they are
			// hovering around in the air.
			//var color = $(this).css('backgroundColor').split('rgb(')[1].split(')')[0].split(', '),
			var color = [120,188,215];
				colorR = rand(-20, 20),  // You might want to alter these manually if you change the color
				colorGB = rand(-20, 20),  // To get the right consistency.
				newColor = 'rgb('+(parseFloat(color[0])+colorR)+', '+(parseFloat(color[1])+colorGB)+', '+(parseFloat(color[2])+colorGB)+')';
			
			
			// And apply those
			$(this).css({
				'transform' : 'scale('+randScale+') skew('+randDeg+'deg) rotateZ('+randDeg2+'deg)', 
				'background' : newColor
			});
			 
			// Set an interval
			z = setInterval(function() { 	
				
				// Horizontal speed is constant (no wind resistance on the internet)
				var ux = ( Math.cos(theta) * v ) * direction;
				
				// Vertical speed decreases as time increases before reaching 0 at its peak
				var uy = ( Math.sin(theta) * v ) - ( (-g) * t);
				
				// The horizontal position
				nx = (ux * t);
						
				// s = ut + 0.5at^2
				ny = (uy * t) + (0.5 * (g) * Math.pow(t, 2));
				
				// Apply the positions	
				$(self).css({'bottom' : (ny)+'px', 'left' : (nx)+'px'});
				
				// Increase the time by 0.10
				t = t + 0.10;
				
				// If the time is greater than the total time clear the interval
				if(t > totalt) {
					
					clicked = false;
					first = true;
					
					
					$('.clipped-box').css({'top' : '-1000px', 'transition' : 'none'});
					$(self).css({'left' : '0', 'bottom' : '0', 'opacity' : '1', 'transition' : 'none', 'transform' : 'none'});
					clearInterval(z);
							
				}
				
			}, 10); // Run this interval every 10ms. Changing this will change the pace of the animation
			
		});
}
function stopExplosion(){
	
	//Start Again
	$('#alertOk').remove();
	$("body").append(originTemplateHTML);
	functionInit();
}

// A quick random function for selecting random numbers
function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**********************************CONGRATULATIONS END *******************************************/
