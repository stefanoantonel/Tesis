var target;
var syllableTemp;
var syllableContainer;
var completeWord;
var part;

function readyOk(){
	target=$('#target');
	syllableTemp=$('#syllableBlock');
	completeWord1 = $('#completeWord1');
	completeWord2 = $('#completeWord2');
	syllableContainer=$('#syllableContainer');
	completeWord=$('#completeWord');
}

function functionInit() {
	return new Promise(function(resolve, reject) {
		getConfig(14).then(function() {
			return getConfigByElement("act14","act",1,null);	
		}).then(function(c) {
			return functionCallback(c);
		}).then(function() {
			rotateEfect();
			removeLoading();
			playTutorial(actNum);
			resolve();
		})
		readyOk();			
	});
}

function rotateEfect(){
	// var labels = syllableTemp.find("label");
	waitInterval(1000).then( function () {
		$("label.star:last-child").addClass("animated flipInY");
	});
	
} 

function functionCallback(conf){
	return new Promise(function(resolve, reject) {
		conf = conf[0];
		syllableResult  = conf["target"];
		resultFirstWord = conf["values"][0];
		resultsecondWord = conf["values"][1];
		fillTemplateWord(completeWord1,resultFirstWord);
		fillTemplateWord(completeWord2,resultsecondWord);
		getConfigByElementWithOne("distractors","syllables",
			2,functionCallback2,syllableResult).then(function() {
				resolve();
			})
	});	
}

function moveToTarget(elem) {
	$(target).append(elem);
	functionsDD(null,elem);
}

function functionCallback2(conf) {
	fillTemplateImages(conf);
	images=syllableContainer.children().find("div#syllableTemp");
	dragAndDrop(images,target,functionsDD,moveToTarget);
}

function fillTemplateWord(word, part){
	$(word).attr('name',part);
	addSound(part);
	$(word).css({backgroundImage : 'url(images/activities/' + part + '.jpg)'});
	$(word).hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).attr("name")); 
				$(this).css('background-image', 'none');
				$(this).html("<b>"+part.toString().toUpperCase()+"</b>");
				window.setTimeout(function(){
					$(word).css({backgroundImage : 'url(images/activities/' + part + '.jpg)'});
					$(word).html(" ");
				}, 1000);
	        }, this), 300));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
}

function fillTemplateImages(syllables){
	var syllablesArray=[];
	
	$(syllables).each(function(index,e){
    	t=$(syllableTemp).clone();
    	var content= $(t).find("#syllableTemp");
		name=e;
		addSound(name);
		$(t).attr('name',name);
		$(t).attr('alt', name);
		content.attr('name',name);
		content.attr('num',index);
		/*Change to make effect*/
		name = name.toUpperCase();
		content.html(name);
		content.hover(function(){
			var elem = this;
			$.data(this, "timer", setTimeout($.proxy(function() {
				playSound($(elem).html()); 
	        }, this), 300));
	        }, function() { clearTimeout($.data(this, "timer")); }
		);
		$(t).removeClass('hidden');
		$(t).hover(function(){
					var labels = $(this).find("label");
					$(labels).addClass("partialRot");
					},
				function(){
						var labels = $(this).find("label");
						$(labels).removeClass("partialRot");
		});
		syllablesArray.push(t);
	});
	disorder(syllablesArray);
	$(syllableContainer).append(syllablesArray);
}

function setRotEfect(syllableCont){
	var labels = syllableCont.find("label");
	$(labels).addClass("partialRot");
	console.log("over");
}

function removeRotEfect(syllableCont){
	var labels = syllableCont.find("label");
	$(labels).removeClass("partialRot");
	console.log("out");
}

function functionsDD(context,currElem){
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){sessionCounter();}
}

function checkCorrect(syllable) {
	var name = $(syllable).attr("name");
	if(name == syllableResult){
		$(syllable).animate({
		    // width: "20%",
			// height: "20%",
		    // opacity: 1.4,
		    // marginLeft: "0.6in",
		    fontSize: "3em",
		    // borderWidth: "10px",
			// borderColor: "green"
			color: "green"
	  	}, 500 );
		  return true;
	}
	else{
		$(syllable).find("label").removeClass('rot');
		var origin = $("#syllableBlock[name='"+$(syllable).attr("name")+"']");
		wrong(syllable,origin.find("label").last())
		window.setTimeout(function(){
			$(syllable).find("label").addClass('rot');
		}, 1000);
		return false;
	}
}
