var leftArray=0
var rightArray=0
var numParts=0;
var resultWord = '';

function functionInit() {
	return new Promise(function(resolve, reject) {
		getConfig(4).then(function() {
			return getConfigByElement("act4","act",1,null);	
		}).then(function(conf) {
			return functionCallback(conf);
		}).then(function() {
			removeLoading();
			playTutorial(actNum);
			resolve();	
		});		
	});
}

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){sessionCounter();}
}

function readyOk(idObj,left,right){
	 
	functionInit();
}

function moveToTarget(elem) {
	var box = $("#target");
	box.append(elem);
	checkReplace(box,elem);
	///$('#rightContainer').append(prevDiv);
		//$(box).append(newDiv);
	functionsDD(null,elem);
}
function functionCallback(conf){
	return new Promise(function(resolve, reject) {
		conf = conf[0];
		var syllableToSelect = conf["target"] - 1;
		var values = conf["values"];

		var firstWord = values[0];
		var secondWord = values[1];
		resultWord = ([ firstWord[syllableToSelect], secondWord[syllableToSelect] ]).join('').replace(',','');

		var wordArrayLeft = [[firstWord],[secondWord]]; 

		functLeft(wordArrayLeft,syllableToSelect); //only the Array. 

		getConfigByElementWithOne("distractors","words",2,
			functRight,resultWord).then(function() {
				resolve();
		});
	});

	
}

//sin desordenar
// function functLeft(wordArray){	
function functLeft(wordArrayLeft,syllableToSelect) {
	var elementsWithName = [];
	$(wordArrayLeft).each(function(index,elem){
		var t = $('#leftboxTemp').clone();
		$(t).attr('id','left'+index);
		var label = putImageName(elem[0],syllableToSelect);
		name = elem.join('').replace(/,/g, "");
		addSound(name);
		$(t).attr('name',name);
		$(t).attr('alt', name);
		$(t).addClass("deleted");
		$(t).removeAttr('hidden');
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			playSound($(this).attr('name'));
		});
		$('#leftContainer').append(t);
		//elementsWithName.push(t);
		elementsWithName.push(label);
	});
	//$('#leftContainer').append("<div display='block'></div>");
	$('#leftContainer').append(elementsWithName);
}

function putImageName(imageNameParts, syllableToSelect) {
	var labelContainer = $("#leftLabelContainerTemp").clone();
	$(labelContainer).removeClass("hidden");
	$(labelContainer).attr("id","labelImage");
	elements=[];
	$(imageNameParts).each(function(ind,elem){
		var d=document.createElement('label');
		elem = elem.toUpperCase();
		$(d).html(elem);
		var a=$(d).addClass('inline');
		elements.push(a);
	});
	syllableToChange=$(elements[syllableToSelect]);
	$(syllableToChange).addClass('syllableBig');
	labelContainer.append(elements);
	return labelContainer;
}

function functRight(conf){
// 	conf.unshift(result);
	imgs=[];
	$(conf).each(function(index,e){
    	t=$('#rightboxTemp').clone();
		$(t).attr('id',index);
		$(t).removeAttr('hidden');
		name=conf[index];
		addSound(name);
		$(t).attr('name',name);
		$(t).attr('alt', name);
		$(t).addClass("deleted");
		$(t).prop('num',index);
		$(t).attr('src','images/activities/' + name + '.jpg');
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
	$("#rightContainer").append(imgs);
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD,moveToTarget);
}

function checkCorrect(part) {
	name = $(part).attr("name");
	
	if(name.valueOf() == resultWord.valueOf()){
		playSound(resultWord);
		return true;
	}
	else{
		$(part).effect('shake');

		$(part).removeClass('normal');
		$(part).addClass('wrong');
		// console.log($(part));
		window.setTimeout(moveOrigin, 1000, part, "#rightContainer");
		return false;
	}
}

function checkReplace(box,newDiv){
	if( $(box).has('img') ){
		prevDiv=$(box).children();
		$(prevDiv).removeClass('wrong');
		$(prevDiv).addClass('normal');
		$('#rightContainer').append(prevDiv);
		$(box).append(newDiv);
	}
}