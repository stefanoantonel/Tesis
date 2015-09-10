var level = null;
var finalSentence = "";
function functionInit() {
	getConfig('22');
	if(level == null)
		level = "lev_1";
	getConfigByElement("sentence",level,1,functionCallback);
	rightBoxTemp = $('#rightboxTemp');
	rightContainer = $('#rightContainer');
}

function functionCallback(conf){
	/*letter = conf[0];
	getConfigByElementWithFirstLetter("distractors","words",3,functInitWords,letter);*/
	functInitWords(conf);
}

function functionsDD(context,currElem){
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true) { sessionCounter(); }
}

function functInitWords(conf){
	var originalArray = conf[0]["values"];
	var numParts = originalArray.length;
	var numSpaces = numParts - 1;
	var rightArray = [];
	finalSentence = originalArray.toString().replace(/,/g," " );
	var stringLetters = finalSentence.replace(/\s+/g, '');

	//Adding the amount of spaces necessary 
	for(var i=0; i<numSpaces; i++) {
		stringLetters += " ";
	}

	//Words
	var letters=[];
	for (var i=0; i<stringLetters.length; i++) {
    	t=$(rightBoxTemp).clone();
		$(t).attr('id','right'+i);
		$(t).removeAttr('hidden');
		name=stringLetters[i];
		addSound(name);
		$(t).attr('name',name);
		$(t).prop('num',i);
		$(t).html(name);
		$(t).hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).attr("name")); 
	        }, this), 500));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
		letters.push(t);
	};
	
	$(rightContainer).append(letters);
	$( rightContainer ).sortable();
	$( rightContainer ).disableSelection();
}

function firstImg(conf){
	//-------------------------show image
	t1=$('#rightboxTemp').clone();
	$(t1).attr('id','firstImage');
	$(t1).addClass('firstImage');
	$(t1).attr('src','images/activities/' + conf + '.jpg');	
	$(t1).removeAttr('hidden');
	$("#leftContainer").append(t1);
}

function checkCorrect(part) {
	var name = $(part).attr("name");
	if(name == letter) {
		window.setTimeout(function(){$(part).addClass("animateToFront");},0);
		window.setTimeout(function(){
			$(part).addClass("deleted");
			$("#counterLeft").html(countSameLetters);
		},700);
		countSameLetters = countSameLetters - 1;
		if (countSameLetters == 0) {
			window.setTimeout(sessionCounter(), 2000);
		}

		return true;
	}
	else {
		$(".img").css("pointer-events", "none");
		playSound("wrong");
		$(part).removeClass('normal');
		$(part).addClass('wrong');
		window.setTimeout(function() {
			$(part).removeClass('wrong');
			$(part).addClass('normal');
			changeScore(-10);
			$(".img").css("pointer-events", "auto");
		}, 500);
		return false;
	}
}
