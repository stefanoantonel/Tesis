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
		contador = 3;
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
		getConfig("5")
		.then(function() {
			return getConfigByElement("rhymes",level,3,null);
		})
		.then(function(conf) {
			return fillTemplate(conf);
		})
		.then(function() {
			resolve();
		});
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

	} else {
		deactivateMoves(".imgButton");
		img2 = currElem;
		contOriginal2 = $(currElem).attr("column");
		if($(img1).attr("name") != $(img2).attr("name")){
			if ($(img1).attr("id") == $(img2).attr("id")) {
				imageOk($("#target").find(".imgButton"));
				window.setTimeout(function() {
					$("#target").html("");
				}, 1500);
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
	
			}
			window.setTimeout(function() {
				activateMoves(".imgButton");
				img1 = null;
				img2 = null;
			}, 1500);
			
		}
	}
}

function imageOk(target) {
	window.setTimeout(function() {
		$(target[0]).addClass("animateToFrontSmaller");
	}, 500);
	window.setTimeout(function() {
		$(target[1]).addClass("animateToFrontRigth");
	}, 500);

}

function moveToTarget(elem) {
	$(target).append(elem);
	functionsDD(null, elem);
}



function fillTemplate(conf) {
	var left = [];
	var right = [];
	$(conf).each(function(index, element) {
		left.push(element[0]);
		right.push(element[1]);
	});
	fillElements(left, "left"); // adds elements disorderly
	fillElements(right, "right");
	contRight = $('#rightContainer').children();
	contLeft = $('#leftContainer').children();
	target = $('#target');
	$( "button" ).draggable({
        cancel: false
    });
	dragAndDrop(contRight, target, functionsDD,moveToTarget);
	dragAndDrop(contLeft, target, functionsDD,moveToTarget);
	return new Promise(function(resolve, reject) {
		resolve();
	});
}

function fillElements(conf, place) {
	imgs = [];
	$(conf).each(function(index, e) {
		t = $('#' + place + 'boxTemp').clone();
		$(t).attr('id', index);
		$(t).removeClass('hidden');
		name = conf[index];
		addSound(name);
		$(t).attr('name', name);
		$(t).prop('num', index);
		$(t).css({backgroundImage : 'url(images/activities/' + name + '.jpg)'});
		$(t).hover(function(){
			var elem = this;
			var elemName = $(elem).attr("name")
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound(elemName); 
	        }, this), 500));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
		imgs.push(t);
	});
	disorder(imgs);
	$("#" + place + "Container").append(imgs);

}
