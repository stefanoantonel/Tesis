var leftArray = 0;
var rightArray = 0;
var numParts = 0;
var contOriginal;
var contSegundo;

function functionInit(counter) {
	return new Promise(function(resolve, reject) {
		level = "lev_1";
		if(counter==1){
			level="lev_2";
		}
		contador = 5;
		target = $('#target');
		readyOk(target, 'leftbox', 'rightbox',level)
		.then(function() {
			removeLoading();
			playTutorial(actNum);
			resolve();
		});		
	});
}

function readyOk(idObj, left, right,level) {
	return new Promise(function(resolve, reject) {
		getConfig("20")
		.then(function() {
			return getConfigByElement("consonants",level,5,null);
		})
		.then(function(conf) {
			return fillTemplate(conf);
		})
		.then(function() {
			resolve();
		});
		place = "left";
	});
	
}

function imgWrong(img1, img2, contOriginal1, contOriginal2) {
	moveOrigin(img1, contOriginal1);
	moveOrigin(img2, contOriginal2);
}

function functionsDD(context, currElem) {
	if (img1 == null) {
		img1 = currElem;
		contOriginal1 = $(currElem).attr("column");
	}
	else {
		deactivateMoves(".imgButton");
		img2 = currElem;
		contOriginal2 = $(currElem).attr("column");
		var img1Name = $(img1).attr("name");
		var img2Name = $(img2).attr("name");
		//if(img1Name != $(img2).attr("name")){
			if ($(img1).attr("column") < $(img2).attr("column")) {
				imageOk($("#target").find(".imgButton"))
				.then(function() {
					// reproduce the sound of the syllable
					return playSound(img1Name+img2Name);	
					//END reproduce sound	
				})
				.then(function() {
					waitInterval(1500).then(function() {
						$("#target").html("");
						activateMoves(".imgButton");
						img1 = null;
						img2 = null;
					});
				});
				contador = contador - 1;
				if (contador == 0) {
					window.setTimeout(sessionCounter(), 2000);
				}
			} else {
				var img_target1 = $("#target").find("#" + $(img1).attr("id"));
				var img_target2 = $("#target").find("#" + $(img2).attr("id"));
				img_target1.removeClass('normal');
				img_target2.removeClass('normal');
				img_target1.addClass('wrong');
				img_target2.addClass('wrong');
				playSound("wrong");
				window.setTimeout(imgWrong, 1000, img_target1, img_target2, $("#"
						+ contOriginal1), $("#" + contOriginal2));
				waitInterval(1500).then(function() {
					activateMoves(".imgButton");
					img1 = null;
					img2 = null;
				});
	
			}
			
		//}	
	}
}

function imageOk(target) {
	return new Promise(function(resolve,reject) {
		/*window.setTimeout(function() {
			$(target[0]).addClass("animateToFrontSmaller");
		}, 500);
		window.setTimeout(function() {
			$(target[1]).addClass("animateToFrontRigth");
		}, 500);*/

		waitInterval(500).then(function() {
			$(target[0]).addClass("animateToFrontSmaller");
			$(target[1]).addClass("animateToFrontRigth");
		}).then(function() {
			resolve();
		});
	});
	
}

function moveToTarget(elem) {
	$(target).append(elem);
	functionsDD(null, elem);
}

function fillTemplate(conf) {
	var array = [];
	$(conf).each(function(index, element) {
		array.push(element[0]);
	});
	fillElements(array, place); // adds elements disorderly
	children = $('#'+place+'Container').children();
	target = $('#target');
	$( "button" ).draggable({
        cancel: false
    });
	dragAndDrop(children, target, functionsDD,moveToTarget);
	if(place == "left") {
		place = "right";
		config = getConfigByElement("distractors","vocals",5,fillTemplate);	
	}	
	return new Promise(function(resolve, reject) {
		resolve();
	});
}

function fillElements(conf, place) {
	imgs = [];
	$(conf).each(function(index, e) {
		t = $('#' + place + 'boxTemp').clone();
		$(t).attr('id', place + index );
		$(t).removeClass('hidden');
		name = conf[index].toUpperCase();
		addSound(name);
		$(t).attr('name', name);
		$(t).attr('alt', name);
		$(t).prop('num', index);
		$(t).html(name);
		//$(t).css({backgroundImage : 'url(images/activities/' + name + '.jpg)'});
		$(t).hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).attr("name")); 
	        }, this), 500));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
		imgs.push(t);
	});
	disorder(imgs);
	$("#" + place + "Container").append(imgs);

}
function checkReplace(elem) {
	
}
