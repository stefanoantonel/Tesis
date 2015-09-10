var level = null;
var finalSentence = "";
function functionInit() {
	getConfig('22');
	if(level == null)
		level = "lev_1";
	getConfigByElement("sentence",level,1,functionCallback);
	rightBoxTemp = $('#rightboxTemp');
	rightContainer = $('#rightContainer');
	$("#finish").click(checkCorrect)
}

function functionCallback(conf){
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

function checkCorrect() {
	var textInContainer = $(rightContainer).text();
	if(textInContainer == finalSentence) {
		window.setTimeout(sessionCounter(), 2000);
		return true;
	}
	else {
		/*$(".img").css("pointer-events", "none");*/
		playSound("wrong");
		changeScore(-10);
		return false;

		/*$(part).removeClass('normal');
		$(part).addClass('wrong');
		window.setTimeout(function() {
			$(part).removeClass('wrong');
			$(part).addClass('normal');
			changeScore(-10);
			$(".img").css("pointer-events", "auto");
		}, 500);*/
		
	}
}
