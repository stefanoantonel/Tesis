var level = null;
var finalSentence = "";
var actNum = 22;

function functionInit() {
	getConfig('22');
	if(level == null)
		level = "lev_1";
	getConfigByElement("sentence",level,1,functionCallback);
	rightBoxTemp = $('#rightboxTemp');
	rightContainer = $('#rightContainer');
	$("#finish").click(checkCorrect);
	return new Promise(function(resolve, reject) {
		resolve();
	});
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
		$(t).hover(function() {
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).attr("name")); 
	        }, this), 500));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);

		/*$(t).click(function() {
			moveLeft(rightContainer,this);
		});
		$(t).dblclick(function() {
			moveRight(rightContainer,this);
		});*/
		letters.push(t);
	};
	
	$(rightContainer).append(letters);
	/* Remove the class in order that allow the spaces to be moved*/
	$( "li:contains(' ')").removeClass("ui-state-disabled");
	/* This makes the letters not to be moved*/
	$(rightContainer).sortable({
		cancel: ".ui-state-disabled"
	});
	$( rightContainer ).disableSelection();
}

function checkCorrect() {
	var textInContainer = $(rightContainer).text();
	if(textInContainer == finalSentence) {
		window.setTimeout(sessionCounter(), 2000);
		return true;
	}
	else {
		playSound("wrong");
		changeScore(-10);
		return false;		
	}
}
function moveLeft(container, element) {
	var elementToMove = $(element).clone();
	var previousElement = $(element).prev();
	var toLeft = $(previousElement).replaceWith($(elementToMove));
	var toRight = $(element).replaceWith($(previousElement));
	/*var toRight = $(element).insertAfter($(element).prev());*/
	/*$(elementToMove).remove();*/
	
}
function moveRight(container, element) {
	console.log("dble")
}