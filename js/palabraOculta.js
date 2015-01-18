var leftArray=0
var rightArray=0
var numParts=0;
var resultWord = '';

function functionsDD(context,currElem){
	checkReplace(context,currElem);
	isCorrect=checkCorrect(currElem);
	if (isCorrect==true){sessionCounter();}
}

function readyOk(idObj,left,right){
	 
	functionInit();
	
	// conf=getConfig("4",randomGroup);
}
function functionInit() {
	
	getConfigByElement("act4","act",1,functionCallback);
	getConfig(4);
	// var distractors=getConfigByElement("distractors","lev_1",2,functionCallback);
}


function functionCallback(conf){
	var conf = conf[0];
	var syllableToSelect = conf["target"] - 1;
	var values = conf["values"];

	var firstWord = values[0];
	var secondWord = values[1];
	resultWord = ([ firstWord[syllableToSelect], secondWord[syllableToSelect] ]).join('').replace(',','');

	var wordArrayLeft = [[firstWord],[secondWord]] 

	functLeft(wordArrayLeft,syllableToSelect); //paso el array solamente 

// 	getConfigByElement("distractors","lev_1",2,functRight);
	getConfigByElementWithOne("distractors","words",2,functRight,resultWord);
	// functInit2(right); //paso el array solamente para desordenar
	
	//loadDescription(conf.description);
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
	$('#leftContainer').append("<br>");
	$('#leftContainer').append(elementsWithName);
}

function putImageName(imageNameParts, syllableToSelect) {
	var labelContainer = $("#leftLabelContainerTemp").clone();
	$(labelContainer).removeClass("hidden");
	$(labelContainer).attr("id","labelImage");
	elements=[];
	$(imageNameParts).each(function(ind,elem){
		var d=document.createElement('label');
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
		$(t).addClass("deleted");
		$(t).prop('num',index);
		$(t).attr('src','images/activities/' + name + '.jpg');
		$(t).mousedown(function(){
			playSound(this.name);
		});
		imgs.push(t);
	});
	disorder(imgs);
	$("#rightContainer").append(imgs);
	contRight=$('#rightContainer').children();
	idObj=$('#target');
	dragAndDrop(contRight,idObj,functionsDD);
}

function checkCorrect(part) {
	name = $(part).attr("name");
	
	if(name.valueOf() == resultWord.valueOf()){
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