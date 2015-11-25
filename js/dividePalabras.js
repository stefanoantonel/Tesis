var level = null;
var finalSentence = "";
var actNum = 22;

function functionInit() {
	return new Promise(function(resolve, reject) {
		getConfig('22').then(function() {
			return getConfigByElement("sentence",level,1,null);
		}).then(function(conf) {
			functionCallback(conf);
			removeLoading();
			playTutorial(actNum);
			resolve();
		});

		if(level == null)
			level = "lev_1";
		rightBoxTemp = $('#rightboxTemp');
		rightContainer = $('#rightContainer');
		$("#finish").click(checkCorrect);
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
		$(rightContainer).removeClass("animated shake");
		$(rightContainer).addClass("animated rubberBand");
		return true;
	}
	else {
		playSound("wrong").then(function() {
			playSound("coloque_los_espacios_en_el_lugar_correcto");
		});
		changeScore(-10);
		$(rightContainer).removeClass("animated rubberBand");
		$(rightContainer).addClass("animated shake");
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